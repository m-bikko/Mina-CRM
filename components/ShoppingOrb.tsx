"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactElement, RefObject } from "react";
import { SiriSheetOrb, useReducedMotion, type OrbState } from "@/components/SiriSheetOrb";
import {
  createOrbLineGenerator,
  orbButtonLabel,
  orbLineLabel,
  type OrbLine,
  type OrbLineGenerator,
  type OrbLineProduct,
  type OrbLocale,
} from "@/components/orbLines";
import { cn } from "@/lib/utils";

export type ShoppingOrbProduct = OrbLineProduct;

interface ShoppingOrbProps<T extends ShoppingOrbProduct> {
  products: T[];
  catalogRef: RefObject<HTMLElement | null>;
  hidden: boolean;
  activeProductId: string | null;
  locale?: OrbLocale;
  onFocusChange: (id: string | null) => void;
  onOpen: (product: T) => void;
}

type SpeechKind = "greeting" | "idle" | "comment" | "flick";

type SpeechPhase = "thinking" | "typing" | "done";

interface Speech {
  id: number;
  kind: SpeechKind;
  line: OrbLine;
  phase: SpeechPhase;
}

interface QueuedLine {
  kind: SpeechKind;
  line: OrbLine;
}

interface CardBox {
  id: string;
  left: number;
  top: number;
  width: number;
  height: number;
}

interface LayoutCache {
  valid: boolean;
  cards: CardBox[];
  catalogTop: number;
  catalogBottom: number;
  homeX: number;
  homeY: number;
}

interface Point {
  x: number;
  y: number;
}

interface Spring {
  k: number;
  zeta: number;
}

interface TouchSample {
  x: number;
  y: number;
  t: number;
}

const IDLE_DELAY_MS = 2000;
const GREETING_QUIET_MS = 700;
const FOLLOW_UP_DELAY_MS = 450;
const THINK_MS = 350;
const TYPE_INTERVAL_MS = 28;
const HOLD_MS: Readonly<Record<SpeechKind, number>> = { greeting: 3200, idle: 4200, comment: 4600, flick: 1800 };
const CHAIN_LIMIT = 3;
const FLICK_COOLDOWN_MS = 25000;
const FLICK_TOUCH_SPEED = 1500;
const FLICK_SCROLL_SPEED = 3000;
const DWELL_MS = 450;
const DWELL_SLOP_PX = 40;
const LEAVE_GRACE_MS = 350;
const SETTLE_STABLE_FRAMES = 5;
const SETTLE_MAX_MS = 1600;
const NAV_OFFSET = 72;
const EDGE = 12;
const MIN_VISIBLE_SHARE = 0.25;
const BUBBLE_ROOM = 80;
const SCROLL_BUBBLE_ROOM = 100;
const BUBBLE_TOP_MIN = 68;
const TAP_SLOP_PX = 10;
const TAP_MAX_MS = 600;
const TOUCH_OFFSET_X = 92;
const TOUCH_OFFSET_Y = 104;
const MOUSE_OFFSET_X = 80;
const MOUSE_OFFSET_Y = 72;
const SPRING_HOME: Spring = { k: 55, zeta: 1 };
const SPRING_TOUCH: Spring = { k: 34, zeta: 0.72 };
const SPRING_MOUSE: Spring = { k: 9, zeta: 0.9 };
const MAX_STRETCH = 0.12;
const STRETCH_SPEED = 900;
const ORB_SIZE_MOBILE = 92;
const ORB_SIZE_DESKTOP = 116;
const SCRIM_SCALE = 1.3;
const OFFSCREEN = "translate3d(-400px, -400px, 0)";
const DESKTOP_QUERY = "(min-width: 768px)";
const COARSE_QUERY = "(pointer: coarse)";
const GREETING_STORAGE_KEY = "minawear-orb-greeting";
const CARD_SELECTOR = "[data-product-id]";
const ACTIVITY_EVENTS = ["pointermove", "pointerdown", "touchstart", "touchmove", "wheel", "scroll", "keydown"] as const;
const TOUCH_FOLLOW_IGNORE = "nav, input, textarea, select, [role='dialog'], [data-orb-ignore]";
const TAP_IGNORE =
  "a, button, input, textarea, select, label, nav, [role='dialog'], [data-product-id], [data-orb-ignore]";

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), Math.max(min, max));

const approach = (current: number, target: number, rate: number, dt: number): number =>
  current + (target - current) * (1 - Math.exp(-rate * dt));

const visibleShare = (box: CardBox, scrollY: number, viewportHeight: number): number => {
  if (box.height <= 0) return 0;
  const top = box.top - scrollY;
  const visible = Math.min(top + box.height, viewportHeight) - Math.max(top, NAV_OFFSET);
  return visible / box.height;
};

const boxAt = (cards: readonly CardBox[], x: number, y: number, scrollY: number): CardBox | null =>
  cards.find((box) => {
    const top = box.top - scrollY;
    return x >= box.left && x <= box.left + box.width && y >= top && y <= top + box.height;
  }) ?? null;

const nearestBox = (
  cards: readonly CardBox[],
  x: number,
  y: number,
  scrollY: number,
  viewportHeight: number,
): CardBox | null => {
  let best: CardBox | null = null;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const box of cards) {
    if (visibleShare(box, scrollY, viewportHeight) < MIN_VISIBLE_SHARE) continue;
    const top = box.top - scrollY;
    const dx = Math.max(box.left - x, 0, x - (box.left + box.width));
    const dy = Math.max(top - y, 0, y - (top + box.height));
    const distance = dx * dx + dy * dy;
    if (distance < bestDistance) {
      bestDistance = distance;
      best = box;
    }
  }
  return best;
};

const attachPoint = (box: CardBox, scrollY: number, r: number, viewportWidth: number, viewportHeight: number): Point => ({
  x: clamp(box.left + box.width - r * 0.4, r + 4, viewportWidth - r - 4),
  y: clamp(box.top - scrollY - r * 0.2, NAV_OFFSET + r * 0.5, viewportHeight - r - EDGE),
});

const fitsForFocus = (box: CardBox, scrollY: number, r: number, viewportHeight: number): boolean => {
  const top = box.top - scrollY;
  return top >= NAV_OFFSET + r * 1.05 + BUBBLE_ROOM && top + box.width <= viewportHeight - EDGE;
};

const scrollTopFor = (box: CardBox, r: number, viewportHeight: number): number => {
  let top = Math.max(NAV_OFFSET + r * 1.05 + SCROLL_BUBBLE_ROOM, (viewportHeight - box.height) / 2);
  if (top + box.width > viewportHeight - EDGE) {
    top = Math.max(NAV_OFFSET + r * 1.05 + BUBBLE_ROOM, viewportHeight - EDGE - box.width);
  }
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - viewportHeight);
  return clamp(Math.round(box.top - top), 0, maxScroll);
};

const fingerSpeed = (samples: readonly TouchSample[]): number => {
  if (samples.length < 2) return 0;
  const last = samples[samples.length - 1];
  const windowed = samples.find((sample) => sample !== last && last.t - sample.t <= 150);
  const previous = samples[samples.length - 2];
  const first = windowed ?? (last.t - previous.t <= 300 ? previous : null);
  if (!first) return 0;
  const dt = last.t - first.t;
  return dt > 0 ? (Math.hypot(last.x - first.x, last.y - first.y) / dt) * 1000 : 0;
};

const readSessionFlag = (key: string): boolean => {
  try {
    return window.sessionStorage.getItem(key) === "1";
  } catch {
    return false;
  }
};

const writeSessionFlag = (key: string): void => {
  try {
    window.sessionStorage.setItem(key, "1");
  } catch {
    return;
  }
};

interface TypedTextProps {
  text: string;
  instant: boolean;
  onDone: () => void;
}

const TypedText = ({ text, instant, onDone }: TypedTextProps): ReactElement => {
  const [count, setCount] = useState(instant ? text.length : 0);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (instant) {
      setCount(text.length);
      onDoneRef.current();
      return;
    }
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= text.length) {
        clearInterval(timer);
        onDoneRef.current();
      }
    }, TYPE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [text, instant]);

  return (
    <span aria-hidden="true">
      {text.slice(0, count)}
      {count < text.length && (
        <span className="ml-0.5 inline-block h-[1em] w-px translate-y-[0.15em] bg-rose-200/80 animate-pulse motion-reduce:animate-none" />
      )}
    </span>
  );
};

const ThinkingDots = (): ReactElement => (
  <span aria-hidden="true" className="flex h-5 items-center gap-1.5 px-1">
    {[0, 160, 320].map((delay) => (
      <span
        key={delay}
        className="h-1.5 w-1.5 rounded-full bg-rose-200/90 animate-pulse motion-reduce:animate-none"
        style={{ animationDelay: `${delay}ms` }}
      />
    ))}
  </span>
);

export const ShoppingOrb = <T extends ShoppingOrbProduct>({
  products,
  catalogRef,
  hidden,
  activeProductId,
  locale = "ru",
  onFocusChange,
  onOpen,
}: ShoppingOrbProps<T>): ReactElement => {
  const reduced = useReducedMotion();
  const [size, setSize] = useState(ORB_SIZE_MOBILE);
  const [speech, setSpeech] = useState<Speech | null>(null);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [following, setFollowing] = useState(false);
  const [travelling, setTravelling] = useState(false);

  const hoverRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const orbLayerRef = useRef<HTMLDivElement>(null);
  const squashRef = useRef<HTMLDivElement>(null);
  const orbButtonRef = useRef<HTMLButtonElement>(null);
  const bubbleLayerRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLButtonElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);

  const productsRef = useRef(products);
  const onOpenRef = useRef(onOpen);
  const onFocusChangeRef = useRef(onFocusChange);
  const hiddenRef = useRef(hidden);
  const reducedRef = useRef(reduced);
  const sizeRef = useRef(size);
  const coarseRef = useRef(false);
  const localeRef = useRef<OrbLocale>(locale);
  const linesRef = useRef<OrbLineGenerator | null>(null);
  const layoutRef = useRef<LayoutCache>({ valid: false, cards: [], catalogTop: 0, catalogBottom: 0, homeX: 0, homeY: 0 });
  const targetIdRef = useRef<string | null>(null);
  const pendingIdRef = useRef<string | null>(null);
  const settleRafRef = useRef(0);
  const speechRef = useRef<Speech | null>(null);
  const speechIdRef = useRef(0);
  const queueRef = useRef<QueuedLine[]>([]);
  const chainRef = useRef(0);
  const thinkTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const followUpTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const lastActivityRef = useRef(0);
  const lastFlickRef = useRef(Number.NEGATIVE_INFINITY);
  const lastTouchAtRef = useRef(Number.NEGATIVE_INFINITY);
  const scrollPeakRef = useRef(0);
  const shownAtRef = useRef(0);
  const greetedRef = useRef(true);
  const activeRef = useRef(activeProductId);
  const followUpIdRef = useRef<string | null>(null);
  const followRef = useRef({ active: false, device: "touch" as "touch" | "mouse", x: 0, y: 0, side: 1 as 1 | -1 });
  const touchRef = useRef({
    id: null as number | null,
    startX: 0,
    startY: 0,
    startT: 0,
    lastX: 0,
    lastY: 0,
    moved: false,
    onOrb: false,
    target: null as EventTarget | null,
    samples: [] as TouchSample[],
  });
  const mouseRef = useRef({ x: 0, y: 0, inside: false, overOwn: false, dwellId: null as string | null, dwellX: 0, dwellY: 0 });
  const hoverIdRef = useRef<string | null>(null);
  const bubbleSizeRef = useRef({ width: 0, height: 0 });
  const requestFrameRef = useRef<() => void>(() => undefined);
  const releaseFocusRef = useRef<() => void>(() => undefined);
  const motionRef = useRef({
    ready: false,
    key: "",
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    tx: 0,
    ty: 0,
    svx: 0,
    svy: 0,
    stretch: 0,
    last: 0,
  });

  useEffect(() => {
    productsRef.current = products;
    onOpenRef.current = onOpen;
    onFocusChangeRef.current = onFocusChange;
  }, [products, onOpen, onFocusChange]);

  useEffect(() => {
    reducedRef.current = reduced;
  }, [reduced]);

  useEffect(() => {
    localeRef.current = locale;
  }, [locale]);

  useEffect(() => {
    greetedRef.current = readSessionFlag(GREETING_STORAGE_KEY);
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const coarse = window.matchMedia(COARSE_QUERY);
    const sync = (): void => {
      setSize(desktop.matches ? ORB_SIZE_DESKTOP : ORB_SIZE_MOBILE);
      coarseRef.current = coarse.matches;
    };
    sync();
    desktop.addEventListener("change", sync);
    coarse.addEventListener("change", sync);
    return () => {
      desktop.removeEventListener("change", sync);
      coarse.removeEventListener("change", sync);
    };
  }, []);

  const requestFrame = useCallback(() => requestFrameRef.current(), []);

  const lines = useCallback((): OrbLineGenerator => {
    if (linesRef.current === null || linesRef.current.locale !== localeRef.current) {
      linesRef.current = createOrbLineGenerator(localeRef.current);
    }
    return linesRef.current;
  }, []);

  const readLayout = useCallback((): LayoutCache => {
    const cache = layoutRef.current;
    if (cache.valid) return cache;
    const root = catalogRef.current;
    const scrollY = window.scrollY;
    cache.cards = root
      ? Array.from(root.querySelectorAll<HTMLElement>(CARD_SELECTOR)).flatMap((element) => {
          const id = element.dataset.productId;
          if (!id) return [];
          const rect = element.getBoundingClientRect();
          return [{ id, left: rect.left, top: rect.top + scrollY, width: rect.width, height: rect.height }];
        })
      : [];
    if (root) {
      const rect = root.getBoundingClientRect();
      cache.catalogTop = rect.top + scrollY;
      cache.catalogBottom = rect.bottom + scrollY;
    }
    const home = homeRef.current?.getBoundingClientRect();
    cache.homeX = home ? home.left : window.innerWidth - 16;
    cache.homeY = home ? home.top : window.innerHeight - 20;
    cache.valid = true;
    return cache;
  }, [catalogRef]);

  const invalidateLayout = useCallback(() => {
    layoutRef.current.valid = false;
  }, []);

  const findProduct = useCallback(
    (id: string | null): T | null => (id === null ? null : productsRef.current.find((item) => item._id === id) ?? null),
    [],
  );

  const visibleIds = useCallback((): Set<string> => {
    const layout = readLayout();
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    return new Set(
      layout.cards.filter((box) => visibleShare(box, scrollY, viewportHeight) >= MIN_VISIBLE_SHARE).map((box) => box.id),
    );
  }, [readLayout]);

  const clearSpeechTimers = useCallback(() => {
    clearTimeout(thinkTimerRef.current);
    clearTimeout(holdTimerRef.current);
    thinkTimerRef.current = undefined;
    holdTimerRef.current = undefined;
  }, []);

  const startLine = useCallback(
    (queued: QueuedLine) => {
      clearSpeechTimers();
      speechIdRef.current += 1;
      const next: Speech = {
        id: speechIdRef.current,
        kind: queued.kind,
        line: queued.line,
        phase: reducedRef.current ? "typing" : "thinking",
      };
      speechRef.current = next;
      setSpeech(next);
      setBubbleVisible(true);
      requestFrame();
      if (next.phase === "thinking") {
        thinkTimerRef.current = setTimeout(() => {
          if (speechRef.current?.id !== next.id) return;
          const typing: Speech = { ...next, phase: "typing" };
          speechRef.current = typing;
          setSpeech(typing);
        }, THINK_MS);
      }
    },
    [clearSpeechTimers, requestFrame],
  );

  const speak = useCallback(
    (queue: readonly QueuedLine[], chain: number) => {
      if (queue.length === 0) return;
      queueRef.current = queue.slice(1);
      chainRef.current = chain;
      startLine(queue[0]);
    },
    [startLine],
  );

  const hideSpeech = useCallback(() => {
    clearSpeechTimers();
    queueRef.current = [];
    chainRef.current = 0;
    if (speechRef.current === null) return;
    speechRef.current = null;
    setBubbleVisible(false);
  }, [clearSpeechTimers]);

  const cancelTravel = useCallback(() => {
    if (settleRafRef.current !== 0) cancelAnimationFrame(settleRafRef.current);
    settleRafRef.current = 0;
    pendingIdRef.current = null;
    setTravelling(false);
  }, []);

  const watchScroll = useCallback((targetTop: number | null, done: () => void) => {
    if (settleRafRef.current !== 0) cancelAnimationFrame(settleRafRef.current);
    const startedAt = performance.now();
    let lastY = window.scrollY;
    let stableFrames = 0;
    const tick = (): void => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 0.5) {
        stableFrames += 1;
      } else {
        stableFrames = 0;
        lastY = y;
      }
      const elapsed = performance.now() - startedAt;
      const arrived = targetTop !== null && Math.abs(y - targetTop) < 1.5;
      const calm = stableFrames >= SETTLE_STABLE_FRAMES && elapsed > (targetTop === null ? 60 : 180);
      if (arrived || calm || elapsed > SETTLE_MAX_MS) {
        settleRafRef.current = 0;
        done();
        return;
      }
      settleRafRef.current = requestAnimationFrame(tick);
    };
    settleRafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => cancelTravel, [cancelTravel]);

  const releaseFocus = useCallback(() => {
    if (targetIdRef.current === null && pendingIdRef.current === null) return;
    cancelTravel();
    targetIdRef.current = null;
    const kind = speechRef.current?.kind;
    if (kind === "comment" || kind === "flick") hideSpeech();
    onFocusChangeRef.current(null);
    requestFrame();
  }, [cancelTravel, hideSpeech, requestFrame]);

  useEffect(() => {
    releaseFocusRef.current = releaseFocus;
  }, [releaseFocus]);

  const endFollow = useCallback(() => {
    const follow = followRef.current;
    if (!follow.active) return;
    follow.active = false;
    setFollowing(false);
    requestFrame();
  }, [requestFrame]);

  const markGreeted = useCallback(() => {
    if (greetedRef.current) return;
    greetedRef.current = true;
    writeSessionFlag(GREETING_STORAGE_KEY);
  }, []);

  const deviceKind = useCallback(
    (): "touch" | "mouse" => (coarseRef.current || Number.isFinite(lastTouchAtRef.current) ? "touch" : "mouse"),
    [],
  );

  const focusCard = useCallback(
    (id: string, talk: "comment" | "followup", flick = false) => {
      const product = findProduct(id);
      if (!product) {
        releaseFocus();
        return;
      }
      cancelTravel();
      endFollow();
      targetIdRef.current = id;
      onFocusChangeRef.current(id);
      const queue: QueuedLine[] = [];
      const now = performance.now();
      if (!greetedRef.current) {
        markGreeted();
        queue.push({ kind: "greeting", line: lines().greeting(deviceKind()) });
      } else if (flick && now - lastFlickRef.current > FLICK_COOLDOWN_MS) {
        lastFlickRef.current = now;
        queue.push({ kind: "flick", line: lines().flick() });
      }
      const line =
        talk === "followup"
          ? lines().followUp(product, productsRef.current)
          : lines().comment(product, productsRef.current);
      queue.push({ kind: "comment", line });
      speak(queue, CHAIN_LIMIT - 1);
      requestFrame();
    },
    [cancelTravel, deviceKind, endFollow, findProduct, lines, markGreeted, releaseFocus, requestFrame, speak],
  );

  const beginFollow = useCallback(
    (device: "touch" | "mouse", x: number, y: number) => {
      const follow = followRef.current;
      if (!follow.active) {
        cancelTravel();
        if (targetIdRef.current !== null) releaseFocus();
        if (speechRef.current && speechRef.current.kind !== "flick") hideSpeech();
        follow.active = true;
        follow.device = device;
        follow.side = x > document.documentElement.clientWidth * 0.5 ? -1 : 1;
        setFollowing(true);
      }
      follow.x = x;
      follow.y = y;
      requestFrame();
    },
    [cancelTravel, hideSpeech, releaseFocus, requestFrame],
  );

  const goToProduct = useCallback(
    (id: string) => {
      if (hiddenRef.current) return;
      const layout = readLayout();
      const box = layout.cards.find((card) => card.id === id);
      if (!box) return;
      markGreeted();
      hideSpeech();
      endFollow();
      const r = sizeRef.current / 2;
      const viewportHeight = window.innerHeight;
      if (fitsForFocus(box, window.scrollY, r, viewportHeight)) {
        focusCard(id, "comment");
        return;
      }
      cancelTravel();
      onFocusChangeRef.current(null);
      targetIdRef.current = id;
      pendingIdRef.current = id;
      setTravelling(true);
      const top = scrollTopFor(box, r, viewportHeight);
      window.scrollTo({ top, behavior: reducedRef.current ? "instant" : "smooth" });
      watchScroll(top, () => {
        if (pendingIdRef.current === id) focusCard(id, "comment");
      });
      requestFrame();
    },
    [cancelTravel, endFollow, focusCard, hideSpeech, markGreeted, readLayout, requestFrame, watchScroll],
  );

  const stepToNext = useCallback(() => {
    if (hiddenRef.current) return;
    const cards = readLayout().cards;
    if (cards.length === 0) return;
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const currentId = targetIdRef.current;
    let start = currentId === null ? -1 : cards.findIndex((box) => box.id === currentId);
    if (start === -1) start = cards.findIndex((box) => visibleShare(box, scrollY, viewportHeight) >= MIN_VISIBLE_SHARE);
    if (start === -1) start = cards.reduce((last, box, index) => (box.top + box.height - scrollY <= NAV_OFFSET ? index : last), -1);
    goToProduct(cards[(start + 1) % cards.length].id);
  }, [goToProduct, readLayout]);

  const settleFromTouch = useCallback(
    (x: number, y: number, flick: boolean) => {
      watchScroll(null, () => {
        if (hiddenRef.current) return;
        const box = nearestBox(readLayout().cards, x, y, window.scrollY, window.innerHeight);
        endFollow();
        if (box) focusCard(box.id, "comment", flick || scrollPeakRef.current > FLICK_SCROLL_SPEED);
      });
    },
    [endFollow, focusCard, readLayout, watchScroll],
  );

  const continueChain = useCallback((): boolean => {
    if (chainRef.current <= 0 || hiddenRef.current || touchRef.current.id !== null || followRef.current.active) return false;
    if (performance.now() - lastActivityRef.current < IDLE_DELAY_MS) return false;
    chainRef.current -= 1;
    const focused = pendingIdRef.current === null ? findProduct(targetIdRef.current) : null;
    if (focused) {
      startLine({ kind: "comment", line: lines().comment(focused, productsRef.current) });
      return true;
    }
    if (targetIdRef.current !== null) return false;
    const line = lines().idle(productsRef.current, visibleIds());
    if (!line) return false;
    startLine({ kind: "idle", line });
    return true;
  }, [findProduct, lines, startLine, visibleIds]);

  const onHoldEnd = useCallback(() => {
    holdTimerRef.current = undefined;
    const current = speechRef.current;
    if (!current) return;
    const queued = queueRef.current.shift();
    if (queued) {
      startLine(queued);
      return;
    }
    if (continueChain()) return;
    if (targetIdRef.current !== null && current.line.productId !== null) return;
    hideSpeech();
  }, [continueChain, hideSpeech, startLine]);

  const handleTyped = useCallback(() => {
    const current = speechRef.current;
    if (!current || current.phase === "done") return;
    const done: Speech = { ...current, phase: "done" };
    speechRef.current = done;
    setSpeech(done);
    clearTimeout(holdTimerRef.current);
    holdTimerRef.current = setTimeout(onHoldEnd, HOLD_MS[current.kind]);
  }, [onHoldEnd]);

  const onIdle = useCallback(() => {
    if (hiddenRef.current || document.visibilityState !== "visible") return;
    if (speechRef.current !== null || touchRef.current.id !== null || pendingIdRef.current !== null) return;
    if (!greetedRef.current) {
      markGreeted();
      speak([{ kind: "greeting", line: lines().greeting(deviceKind()) }], CHAIN_LIMIT - 1);
      return;
    }
    const focused = findProduct(targetIdRef.current);
    if (focused) {
      speak([{ kind: "comment", line: lines().comment(focused, productsRef.current) }], CHAIN_LIMIT - 1);
      return;
    }
    const line = lines().idle(productsRef.current, visibleIds());
    if (line) speak([{ kind: "idle", line }], CHAIN_LIMIT - 1);
  }, [deviceKind, findProduct, lines, markGreeted, speak, visibleIds]);

  useEffect(() => {
    invalidateLayout();
    const id = targetIdRef.current;
    if (id !== null && !products.some((product) => product._id === id)) releaseFocus();
  }, [products, invalidateLayout, releaseFocus]);

  useEffect(() => {
    const root = catalogRef.current;
    const onResize = (): void => {
      invalidateLayout();
      requestFrame();
    };
    window.addEventListener("resize", onResize);
    const observer = root && typeof ResizeObserver !== "undefined" ? new ResizeObserver(onResize) : null;
    if (root) observer?.observe(root);
    return () => {
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
    };
  }, [catalogRef, invalidateLayout, requestFrame]);

  useEffect(() => {
    const previous = activeRef.current;
    activeRef.current = activeProductId;
    followUpIdRef.current = previous !== null && activeProductId === null ? previous : null;
  }, [activeProductId]);

  useEffect(() => {
    hiddenRef.current = hidden;
    if (!hidden) shownAtRef.current = performance.now();
    invalidateLayout();
    clearTimeout(followUpTimerRef.current);
    if (hidden) {
      touchRef.current.id = null;
      mouseRef.current.dwellId = null;
      endFollow();
      releaseFocus();
      hideSpeech();
    } else if (followUpIdRef.current !== null) {
      const id = followUpIdRef.current;
      followUpIdRef.current = null;
      followUpTimerRef.current = setTimeout(() => {
        const product = findProduct(id);
        if (hiddenRef.current || !product || followRef.current.active || targetIdRef.current !== null) return;
        const box = readLayout().cards.find((card) => card.id === id);
        if (box && visibleShare(box, window.scrollY, window.innerHeight) >= MIN_VISIBLE_SHARE) {
          focusCard(id, "followup");
          return;
        }
        speak([{ kind: "idle", line: lines().followUp(product, productsRef.current) }], 0);
      }, FOLLOW_UP_DELAY_MS);
    }
    requestFrame();
    return () => clearTimeout(followUpTimerRef.current);
  }, [hidden, endFollow, findProduct, focusCard, hideSpeech, invalidateLayout, lines, readLayout, releaseFocus, requestFrame, speak]);

  useEffect(() => {
    const motion = motionRef.current;
    let raf = 0;

    const hideHover = (): void => {
      if (hoverIdRef.current === null) return;
      hoverIdRef.current = null;
      if (hoverRef.current) hoverRef.current.style.opacity = "0";
    };

    const showHover = (box: CardBox | null, scrollY: number): void => {
      const hover = hoverRef.current;
      if (!hover || !box) {
        hideHover();
        return;
      }
      if (hoverIdRef.current !== box.id) {
        hoverIdRef.current = box.id;
        hover.style.width = `${box.width}px`;
        hover.style.height = `${box.width}px`;
        hover.style.opacity = "1";
      }
      hover.style.transform = `translate3d(${box.left.toFixed(1)}px, ${(box.top - scrollY).toFixed(1)}px, 0)`;
    };

    const placeBubble = (cx: number, cy: number, r: number, viewportWidth: number, viewportHeight: number): void => {
      const layer = bubbleLayerRef.current;
      if (!layer) return;
      const { width, height } = bubbleSizeRef.current;
      const x = clamp(cx + r * 0.6 - width, EDGE, viewportWidth - width - EDGE);
      let y = cy - r * 0.85 - height;
      if (y < BUBBLE_TOP_MIN) y = cy - r * 0.4 - height >= BUBBLE_TOP_MIN ? BUBBLE_TOP_MIN : cy + r * 0.85;
      y = clamp(y, BUBBLE_TOP_MIN, viewportHeight - height - EDGE);
      layer.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    };

    const step = (now: number): void => {
      raf = 0;
      if (hiddenRef.current) {
        motion.ready = false;
        motion.last = 0;
        hideHover();
        return;
      }
      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const layout = readLayout();
      const r = sizeRef.current / 2;
      const dt = motion.last === 0 ? 1 / 60 : Math.min((now - motion.last) / 1000, 1 / 30);
      motion.last = now;

      let key = "home";
      let tx = layout.homeX - r;
      let ty = layout.homeY - r;
      let rigid = false;
      let spring = SPRING_HOME;

      const id = targetIdRef.current;
      if (id !== null) {
        const box = layout.cards.find((card) => card.id === id);
        if (box && (pendingIdRef.current === id || visibleShare(box, scrollY, viewportHeight) >= MIN_VISIBLE_SHARE)) {
          const point = attachPoint(box, scrollY, r, viewportWidth, viewportHeight);
          key = id;
          tx = point.x;
          ty = point.y;
          rigid = true;
        } else {
          releaseFocusRef.current();
        }
      }

      const follow = followRef.current;
      if (key === "home" && follow.active) {
        key = "follow";
        if (follow.device === "touch") {
          if (follow.side === 1 && follow.x > viewportWidth * 0.62) follow.side = -1;
          else if (follow.side === -1 && follow.x < viewportWidth * 0.38) follow.side = 1;
          tx = clamp(follow.x + follow.side * TOUCH_OFFSET_X, r + 4, viewportWidth - r - 4);
          ty = clamp(follow.y - TOUCH_OFFSET_Y, NAV_OFFSET + r * 0.5, viewportHeight - r - EDGE);
          spring = SPRING_TOUCH;
        } else {
          const mouse = mouseRef.current;
          const near = motion.ready && Math.hypot(mouse.x - motion.x, mouse.y - motion.y) < r * 1.5;
          if (near || (mouse.overOwn && motion.ready)) {
            tx = motion.x;
            ty = motion.y;
          } else {
            tx = clamp(follow.x + MOUSE_OFFSET_X, r + 4, viewportWidth - r - 4);
            ty = clamp(follow.y + MOUSE_OFFSET_Y, NAV_OFFSET + r * 0.5, viewportHeight - r - EDGE);
          }
          spring = SPRING_MOUSE;
        }
      }

      if (!motion.ready || reducedRef.current) {
        motion.x = tx;
        motion.y = ty;
        motion.vx = 0;
        motion.vy = 0;
        motion.ready = true;
      } else {
        if (rigid && key === motion.key) {
          motion.x += tx - motion.tx;
          motion.y += ty - motion.ty;
        }
        const damping = 2 * spring.zeta * Math.sqrt(spring.k);
        motion.vx += (-spring.k * (motion.x - tx) - damping * motion.vx) * dt;
        motion.vy += (-spring.k * (motion.y - ty) - damping * motion.vy) * dt;
        motion.x += motion.vx * dt;
        motion.y += motion.vy * dt;
      }
      motion.key = key;
      motion.tx = tx;
      motion.ty = ty;

      motion.svx = approach(motion.svx, motion.vx, 14, dt);
      motion.svy = approach(motion.svy, motion.vy, 14, dt);
      const speed = Math.hypot(motion.svx, motion.svy);
      const stretchTarget = reducedRef.current ? 0 : MAX_STRETCH * (1 - Math.exp(-speed / STRETCH_SPEED));
      motion.stretch = approach(motion.stretch, stretchTarget, 12, dt);

      const settled =
        Math.abs(motion.x - tx) < 0.3 &&
        Math.abs(motion.y - ty) < 0.3 &&
        Math.hypot(motion.vx, motion.vy) < 2 &&
        motion.stretch < 0.002;
      if (settled) {
        motion.x = tx;
        motion.y = ty;
        motion.vx = 0;
        motion.vy = 0;
        motion.svx = 0;
        motion.svy = 0;
        motion.stretch = 0;
      }

      const orbLayer = orbLayerRef.current;
      if (orbLayer) {
        orbLayer.style.transform = `translate3d(${(motion.x - r).toFixed(1)}px, ${(motion.y - r).toFixed(1)}px, 0)`;
      }
      const scrim = scrimRef.current;
      if (scrim) {
        const s = (sizeRef.current * SCRIM_SCALE) / 2;
        scrim.style.transform = `translate3d(${(motion.x - s).toFixed(1)}px, ${(motion.y - s).toFixed(1)}px, 0)`;
      }
      const squash = squashRef.current;
      if (squash) {
        const angle = Math.atan2(motion.svy, motion.svx);
        squash.style.transform =
          motion.stretch > 0.002
            ? `rotate(${angle.toFixed(3)}rad) scale(${(1 + motion.stretch).toFixed(3)}, ${(1 - motion.stretch * 0.7).toFixed(3)}) rotate(${(-angle).toFixed(3)}rad)`
            : "";
      }
      placeBubble(motion.x, motion.y, r, viewportWidth, viewportHeight);
      if (key === "follow") showHover(boxAt(layout.cards, motion.x, motion.y, scrollY), scrollY);
      else hideHover();

      if (settled) motion.last = 0;
      else raf = requestAnimationFrame(step);
    };

    const request = (): void => {
      if (raf === 0) raf = requestAnimationFrame(step);
    };

    requestFrameRef.current = request;
    window.addEventListener("scroll", request, { passive: true });
    request();

    return () => {
      if (raf !== 0) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", request);
      requestFrameRef.current = () => undefined;
    };
  }, [readLayout]);

  useEffect(() => {
    const bubble = bubbleRef.current;
    if (!bubble || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => {
      bubbleSizeRef.current = { width: bubble.offsetWidth, height: bubble.offsetHeight };
      requestFrame();
    });
    observer.observe(bubble);
    return () => observer.disconnect();
  }, [speech, requestFrame]);

  useEffect(() => {
    const touch = touchRef.current;

    const isOn = (element: HTMLElement | null, target: EventTarget | null): boolean =>
      element !== null && target instanceof Node && element.contains(target);

    const pointOf = (list: TouchList): Touch | null => {
      for (let index = 0; index < list.length; index += 1) {
        if (list[index].identifier === touch.id) return list[index];
      }
      return null;
    };

    const onStart = (event: TouchEvent): void => {
      if (hiddenRef.current) return;
      if (event.touches.length > 1) {
        touch.id = null;
        endFollow();
        return;
      }
      const point = event.changedTouches[0];
      if (!point) return;
      const target = event.target;
      const ignored = target instanceof Element && target.closest(TOUCH_FOLLOW_IGNORE) !== null;
      if (isOn(bubbleRef.current, target) || ignored) {
        touch.id = null;
        return;
      }
      lastTouchAtRef.current = performance.now();
      scrollPeakRef.current = 0;
      touch.id = point.identifier;
      touch.startX = point.clientX;
      touch.startY = point.clientY;
      touch.lastX = point.clientX;
      touch.lastY = point.clientY;
      touch.startT = event.timeStamp;
      touch.moved = false;
      touch.onOrb = isOn(orbButtonRef.current, target);
      touch.target = target;
      touch.samples = [{ x: point.clientX, y: point.clientY, t: event.timeStamp }];
      if (!touch.onOrb) beginFollow("touch", point.clientX, point.clientY);
    };

    const onMove = (event: TouchEvent): void => {
      if (touch.id === null || hiddenRef.current) return;
      const point = pointOf(event.changedTouches);
      if (!point) return;
      lastTouchAtRef.current = performance.now();
      touch.lastX = point.clientX;
      touch.lastY = point.clientY;
      touch.samples.push({ x: point.clientX, y: point.clientY, t: event.timeStamp });
      if (touch.samples.length > 8) touch.samples.shift();
      if (!touch.moved && Math.hypot(point.clientX - touch.startX, point.clientY - touch.startY) > TAP_SLOP_PX) {
        touch.moved = true;
      }
      if (touch.moved || followRef.current.active) beginFollow("touch", point.clientX, point.clientY);
    };

    const onEnd = (event: TouchEvent): void => {
      if (touch.id === null) return;
      const point = pointOf(event.changedTouches);
      if (!point) return;
      touch.id = null;
      lastTouchAtRef.current = performance.now();
      if (hiddenRef.current) {
        endFollow();
        return;
      }
      if (!touch.moved) {
        const target = touch.target;
        const quick = event.timeStamp - touch.startT <= TAP_MAX_MS;
        if (touch.onOrb) return;
        if (!quick || (target instanceof Element && target.closest(TAP_IGNORE) !== null)) {
          endFollow();
          return;
        }
        settleFromTouch(touch.lastX, touch.lastY, false);
        return;
      }
      settleFromTouch(touch.lastX, touch.lastY, fingerSpeed(touch.samples) > FLICK_TOUCH_SPEED);
    };

    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    window.addEventListener("touchcancel", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
      window.removeEventListener("touchcancel", onEnd);
    };
  }, [beginFollow, endFollow, settleFromTouch]);

  useEffect(() => {
    const mouse = mouseRef.current;
    let dwellTimer: ReturnType<typeof setTimeout> | undefined;
    let leaveTimer: ReturnType<typeof setTimeout> | undefined;
    let origin: { x: number; y: number; t: number } | null = null;

    const isOwn = (target: EventTarget | null): boolean =>
      target instanceof Node &&
      (Boolean(bubbleRef.current?.contains(target)) || Boolean(orbButtonRef.current?.contains(target)));

    const clearDwell = (): void => {
      clearTimeout(dwellTimer);
      dwellTimer = undefined;
    };

    const fireDwell = (): void => {
      dwellTimer = undefined;
      if (hiddenRef.current || !mouse.inside || mouse.dwellId === null || pendingIdRef.current !== null) return;
      if (speechRef.current?.kind === "flick") {
        dwellTimer = setTimeout(fireDwell, DWELL_MS);
        return;
      }
      const box = boxAt(readLayout().cards, mouse.x, mouse.y, window.scrollY);
      if (!box || box.id !== mouse.dwellId || targetIdRef.current === box.id) return;
      focusCard(box.id, "comment");
    };

    const evaluate = (): void => {
      if (hiddenRef.current || !mouse.inside) return;
      const layout = readLayout();
      const scrollY = window.scrollY;
      const box = boxAt(layout.cards, mouse.x, mouse.y, scrollY);
      const focusId = targetIdRef.current;
      if (focusId !== null && pendingIdRef.current === null) {
        if (box?.id === focusId || mouse.overOwn) {
          clearTimeout(leaveTimer);
          leaveTimer = undefined;
        } else if (leaveTimer === undefined) {
          leaveTimer = setTimeout(() => {
            leaveTimer = undefined;
            const again = boxAt(readLayout().cards, mouse.x, mouse.y, window.scrollY);
            if (targetIdRef.current !== null && again?.id !== targetIdRef.current && !mouse.overOwn) {
              releaseFocus();
              evaluate();
            }
          }, LEAVE_GRACE_MS);
        }
      }
      if (targetIdRef.current === null && pendingIdRef.current === null) {
        const overCatalog = mouse.y >= layout.catalogTop - scrollY && mouse.y <= layout.catalogBottom - scrollY;
        if (overCatalog) beginFollow("mouse", mouse.x, mouse.y);
        else endFollow();
      }
      if (box && !mouse.overOwn) {
        const drifted = Math.hypot(mouse.x - mouse.dwellX, mouse.y - mouse.dwellY) > DWELL_SLOP_PX;
        if (box.id !== mouse.dwellId || drifted) {
          mouse.dwellId = box.id;
          mouse.dwellX = mouse.x;
          mouse.dwellY = mouse.y;
          clearDwell();
          dwellTimer = setTimeout(fireDwell, DWELL_MS);
        }
      } else {
        mouse.dwellId = null;
        clearDwell();
      }
    };

    const onMove = (event: PointerEvent): void => {
      if (event.pointerType !== "mouse") return;
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.inside = true;
      mouse.overOwn = isOwn(event.target);
      evaluate();
    };

    const onLeave = (): void => {
      mouse.inside = false;
      mouse.dwellId = null;
      clearDwell();
      clearTimeout(leaveTimer);
      leaveTimer = undefined;
      if (targetIdRef.current !== null) releaseFocus();
      endFollow();
    };

    const onScroll = (): void => {
      if (mouse.inside && !coarseRef.current) evaluate();
    };

    const onDown = (event: PointerEvent): void => {
      origin =
        event.pointerType === "mouse" && event.button === 0 && event.isPrimary
          ? { x: event.clientX, y: event.clientY, t: event.timeStamp }
          : null;
    };

    const onUp = (event: PointerEvent): void => {
      const start = origin;
      origin = null;
      if (!start || event.pointerType !== "mouse" || hiddenRef.current) return;
      if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > TAP_SLOP_PX) return;
      if (event.timeStamp - start.t > TAP_MAX_MS) return;
      const target = event.target;
      if (!(target instanceof Element) || !target.isConnected || target.closest(TAP_IGNORE)) return;
      const selection = window.getSelection();
      if (selection && !selection.isCollapsed) return;
      const box = nearestBox(readLayout().cards, event.clientX, event.clientY, window.scrollY, window.innerHeight);
      if (box) focusCard(box.id, "comment");
    };

    const root = document.documentElement;
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    root.addEventListener("mouseleave", onLeave);
    return () => {
      clearDwell();
      clearTimeout(leaveTimer);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("scroll", onScroll);
      root.removeEventListener("mouseleave", onLeave);
    };
  }, [beginFollow, endFollow, focusCard, readLayout, releaseFocus]);

  useEffect(() => {
    let lastY = window.scrollY;
    let lastT = performance.now();
    const onScroll = (): void => {
      const now = performance.now();
      const y = window.scrollY;
      const dt = now - lastT;
      const jump = Math.abs(y - lastY);
      const speed = dt > 0 && dt < 200 ? (jump / Math.max(dt, 8)) * 1000 : jump > 900 ? FLICK_SCROLL_SPEED * 2 : 0;
      lastY = y;
      lastT = now;
      if (pendingIdRef.current === null) scrollPeakRef.current = Math.max(scrollPeakRef.current, speed);
      const touchDriven = coarseRef.current || now - lastTouchAtRef.current < 1500;
      const justShown = now - shownAtRef.current < 1200;
      if (speed < FLICK_SCROLL_SPEED || touchDriven || justShown || hiddenRef.current || pendingIdRef.current !== null) return;
      if (now - lastFlickRef.current < FLICK_COOLDOWN_MS || speechRef.current?.kind === "flick") return;
      lastFlickRef.current = now;
      releaseFocus();
      speak([{ kind: "flick", line: lines().flick() }], 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lines, releaseFocus, speak]);

  useEffect(() => {
    if (hidden) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    lastActivityRef.current = performance.now();

    const isOwn = (target: EventTarget | null): boolean =>
      target instanceof Node &&
      (Boolean(bubbleRef.current?.contains(target)) || Boolean(orbButtonRef.current?.contains(target)));

    const quietNeeded = (): number => (greetedRef.current ? IDLE_DELAY_MS : GREETING_QUIET_MS);

    const check = (): void => {
      timer = undefined;
      const wait = quietNeeded() - (performance.now() - lastActivityRef.current);
      if (wait > 0) {
        timer = setTimeout(check, wait);
        return;
      }
      onIdle();
    };

    const onActivity = (event: Event): void => {
      if (isOwn(event.target)) return;
      lastActivityRef.current = performance.now();
      chainRef.current = 0;
      const kind = speechRef.current?.kind;
      if (kind === "idle" || kind === "greeting") hideSpeech();
      if (timer === undefined) timer = setTimeout(check, quietNeeded());
    };

    for (const name of ACTIVITY_EVENTS) window.addEventListener(name, onActivity, { passive: true });
    document.addEventListener("visibilitychange", onActivity);
    timer = setTimeout(check, quietNeeded());

    return () => {
      clearTimeout(timer);
      for (const name of ACTIVITY_EVENTS) window.removeEventListener(name, onActivity);
      document.removeEventListener("visibilitychange", onActivity);
    };
  }, [hidden, hideSpeech, onIdle]);

  useEffect(
    () => () => {
      clearSpeechTimers();
      clearTimeout(followUpTimerRef.current);
    },
    [clearSpeechTimers],
  );

  const handleBubbleClick = (): void => {
    const line = speech?.line;
    if (!line) return;
    if (line.action === "next") {
      stepToNext();
      return;
    }
    if (line.action === "focus") {
      if (line.productId) goToProduct(line.productId);
      return;
    }
    const product = findProduct(line.productId);
    if (product) onOpenRef.current(product);
  };

  const phase = bubbleVisible && speech ? speech.phase : null;
  const orbState: OrbState =
    phase === "thinking" || travelling
      ? "thinking"
      : phase === "typing"
        ? "speaking"
        : following || phase === "done"
          ? "listening"
          : "idle";
  const scrimSize = Math.round(size * SCRIM_SCALE);

  return (
    <>
      <div
        ref={homeRef}
        aria-hidden="true"
        className="pointer-events-none fixed bottom-[calc(env(safe-area-inset-bottom,0px)_+_1.25rem)] right-[calc(env(safe-area-inset-right,0px)_+_1rem)] h-px w-px"
      />
      <div
        ref={hoverRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-20 rounded-lg opacity-0 shadow-[0_0_26px_2px_rgba(251,113,133,0.22)] ring-1 ring-rose-300/35 transition-opacity duration-200 motion-reduce:transition-none"
        style={{ width: 0, height: 0, transform: OFFSCREEN }}
      />
      <div
        ref={scrimRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-20 rounded-full bg-[radial-gradient(closest-side,rgba(76,5,25,0.62),rgba(76,5,25,0.34)_55%,transparent)] transition-opacity duration-500 motion-reduce:transition-none",
          hidden ? "opacity-0" : "opacity-100",
        )}
        style={{ width: scrimSize, height: scrimSize, transform: OFFSCREEN }}
      />
      <div
        ref={orbLayerRef}
        inert={hidden}
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-20 mix-blend-screen transition-opacity duration-500 will-change-transform motion-reduce:transition-none",
          hidden ? "opacity-0" : "opacity-100",
        )}
        style={{ width: size, height: size, transform: OFFSCREEN }}
      >
        <div ref={squashRef} className="h-full w-full">
          <div className="relative h-full w-full animate-orb-float motion-reduce:animate-none">
            <span aria-hidden="true" className="absolute -inset-1/3 rounded-full bg-rose-500/35 blur-2xl" />
            <button
              ref={orbButtonRef}
              type="button"
              aria-label={orbButtonLabel(locale)}
              onClick={stepToNext}
              className={cn(
                "relative block rounded-full transition-transform duration-200 ease-out active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200/80 motion-reduce:transition-none motion-reduce:active:scale-100",
                hidden ? "pointer-events-none" : "pointer-events-auto cursor-pointer",
              )}
              style={{ width: size, height: size }}
            >
              <SiriSheetOrb state={orbState} size={size} colorFrom="#fda4af" colorTo="#9f1239" paused={hidden} />
            </button>
          </div>
        </div>
      </div>
      <div
        ref={bubbleLayerRef}
        className="pointer-events-none fixed left-0 top-0 z-30"
        style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
      >
        {speech && (
          <button
            ref={bubbleRef}
            type="button"
            inert={!bubbleVisible}
            aria-label={orbLineLabel(speech.line)}
            onClick={handleBubbleClick}
            className={cn(
              "relative block w-max max-w-[min(18rem,calc(100vw_-_2rem))] rounded-2xl border border-rose-300/20 bg-neutral-900/90 px-4 py-2.5 text-left text-sm leading-snug text-rose-50 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-md transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/70 motion-reduce:transition-none",
              bubbleVisible ? "pointer-events-auto translate-y-0 opacity-100" : "translate-y-1 opacity-0",
            )}
          >
            {speech.phase === "thinking" ? (
              <ThinkingDots />
            ) : (
              <>
                <span className="relative block">
                  <span aria-hidden="true" className="invisible block">
                    {speech.line.text}
                  </span>
                  <span className="absolute inset-0">
                    <TypedText
                      key={speech.id}
                      text={speech.line.text}
                      instant={reduced}
                      onDone={handleTyped}
                    />
                  </span>
                </span>
                {speech.line.cta && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-1 block text-xs text-rose-200/70 transition-opacity duration-300 motion-reduce:transition-none",
                      speech.phase === "done" ? "opacity-100" : "opacity-0",
                    )}
                  >
                    {speech.line.cta}
                  </span>
                )}
              </>
            )}
          </button>
        )}
      </div>
    </>
  );
};
