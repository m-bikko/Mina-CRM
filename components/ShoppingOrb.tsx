"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactElement, RefObject } from "react";
import { SiriSheetOrb, useReducedMotion, type OrbState } from "@/components/SiriSheetOrb";
import { cn } from "@/lib/utils";

export interface ShoppingOrbProduct {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  sizes: ReadonlyArray<{ quantity: number }>;
}

interface ShoppingOrbProps<T extends ShoppingOrbProduct> {
  products: T[];
  catalogRef: RefObject<HTMLElement | null>;
  hidden: boolean;
  onFocusChange: (id: string | null) => void;
  onOpen: (product: T) => void;
}

type BubbleKind = "hint" | "tip" | "focus";

interface BubbleMessage {
  id: number;
  kind: BubbleKind;
  productId: string | null;
  text: string;
}

interface Point {
  x: number;
  y: number;
}

interface OrbTarget extends Point {
  key: string;
}

const IDLE_DELAY_MS = 2000;
const TYPE_INTERVAL_MS = 30;
const TIP_HOLD_MS = 4500;
const HINT_HOLD_MS = 3500;
const TIPS_PER_PAUSE = 3;
const NAV_OFFSET = 72;
const EDGE = 12;
const MIN_VISIBLE_SHARE = 0.25;
const BUBBLE_ROOM = 64;
const SCROLL_BUBBLE_ROOM = 88;
const SCROLL_STABLE_FRAMES = 5;
const SCROLL_MIN_MS = 180;
const SCROLL_MAX_MS = 1800;
const TAP_SLOP_PX = 10;
const TAP_MAX_MS = 600;
const SPRING_K = 55;
const SPRING_C = 2 * Math.sqrt(SPRING_K);
const ORB_SIZE_MOBILE = 92;
const ORB_SIZE_DESKTOP = 116;
const SCRIM_SCALE = 1.3;
const OFFSCREEN = "translate3d(-300px, -300px, 0)";
const DESKTOP_QUERY = "(min-width: 768px)";
const HINT_STORAGE_KEY = "minawear-orb-hint";
const HINT_TEXT = "Нажмите на меня — покажу товары";
const ORB_BUTTON_LABEL = "Помощник: показать следующий товар";
const CARD_SELECTOR = "[data-product-id]";
const ACTIVITY_EVENTS = ["pointermove", "pointerdown", "touchstart", "wheel", "scroll", "keydown"] as const;
const IGNORE_SELECTOR =
  "a, button, input, textarea, select, label, nav, [role='dialog'], [data-product-id], [data-orb-ignore]";

const TIP_TEMPLATES: ReadonlyArray<(name: string, price: string) => string> = [
  (name, price) => `Загляните: «${name}» — ${price}`,
  (name, price) => `Обратите внимание: «${name}» — ${price}`,
  (name, price) => `Как вам «${name}»? ${price}`,
];

const formatPrice = (product: ShoppingOrbProduct): string =>
  `${(product.discountPrice || product.price).toLocaleString()} ₸`;

const focusText = (product: ShoppingOrbProduct): string =>
  `«${product.name}» — ${formatPrice(product)} · нажмите, чтобы открыть`;

const isInStock = (product: ShoppingOrbProduct): boolean =>
  product.sizes.some((size) => size.quantity > 0);

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), Math.max(min, max));

const visibleShare = (rect: DOMRect, viewportHeight: number): number => {
  if (rect.height <= 0) return 0;
  const visible = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, NAV_OFFSET);
  return visible / rect.height;
};

const attachPoint = (rect: DOMRect, r: number, viewportWidth: number, viewportHeight: number): Point => ({
  x: clamp(rect.right - r * 0.4, r + 4, viewportWidth - r - 4),
  y: clamp(rect.top - r * 0.2, NAV_OFFSET + r * 0.5, viewportHeight - r - EDGE),
});

const fitsForFocus = (rect: DOMRect, r: number, viewportHeight: number): boolean =>
  rect.top >= NAV_OFFSET + r * 1.05 + BUBBLE_ROOM && rect.top + rect.width <= viewportHeight - EDGE;

const scrollTopFor = (rect: DOMRect, r: number, viewportHeight: number): number => {
  let top = Math.max(NAV_OFFSET + r * 1.05 + SCROLL_BUBBLE_ROOM, (viewportHeight - rect.height) / 2);
  if (top + rect.width > viewportHeight - EDGE) {
    top = Math.max(NAV_OFFSET + r * 1.05 + BUBBLE_ROOM, viewportHeight - EDGE - rect.width);
  }
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - viewportHeight);
  return clamp(Math.round(window.scrollY + rect.top - top), 0, maxScroll);
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

export const ShoppingOrb = <T extends ShoppingOrbProduct>({
  products,
  catalogRef,
  hidden,
  onFocusChange,
  onOpen,
}: ShoppingOrbProps<T>): ReactElement => {
  const reduced = useReducedMotion();
  const [size, setSize] = useState(ORB_SIZE_MOBILE);
  const [message, setMessage] = useState<BubbleMessage | null>(null);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [typed, setTyped] = useState(false);
  const [travelling, setTravelling] = useState(false);

  const scrimRef = useRef<HTMLDivElement>(null);
  const orbLayerRef = useRef<HTMLDivElement>(null);
  const orbButtonRef = useRef<HTMLButtonElement>(null);
  const bubbleLayerRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLButtonElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);

  const productsRef = useRef(products);
  const onOpenRef = useRef(onOpen);
  const onFocusChangeRef = useRef(onFocusChange);
  const targetIdRef = useRef<string | null>(null);
  const pendingIdRef = useRef<string | null>(null);
  const settleRafRef = useRef(0);
  const hiddenRef = useRef(hidden);
  const reducedRef = useRef(reduced);
  const sizeRef = useRef(size);
  const hintShownRef = useRef(false);
  const activeKindRef = useRef<BubbleKind | null>(null);
  const messageIdRef = useRef(0);
  const tipTurnRef = useRef(0);
  const tipsLeftRef = useRef(0);
  const tippedIdsRef = useRef(new Set<string>());
  const bubbleSizeRef = useRef({ width: 0, height: 0 });
  const requestFrameRef = useRef<() => void>(() => undefined);
  const motionRef = useRef({ ready: false, key: "", x: 0, y: 0, ox: 0, oy: 0, vx: 0, vy: 0, last: 0 });

  useEffect(() => {
    productsRef.current = products;
    onOpenRef.current = onOpen;
    onFocusChangeRef.current = onFocusChange;
  }, [products, onOpen, onFocusChange]);

  useEffect(() => {
    reducedRef.current = reduced;
  }, [reduced]);

  useEffect(() => {
    hintShownRef.current = readSessionFlag(HINT_STORAGE_KEY);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const sync = (): void => setSize(mq.matches ? ORB_SIZE_DESKTOP : ORB_SIZE_MOBILE);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    sizeRef.current = size;
    requestFrameRef.current();
  }, [size]);

  const showText = useCallback((kind: BubbleKind, text: string, productId: string | null) => {
    messageIdRef.current += 1;
    activeKindRef.current = kind;
    setMessage({ id: messageIdRef.current, kind, productId, text });
    setTyped(false);
    setBubbleVisible(true);
    requestFrameRef.current();
  }, []);

  const hideMessage = useCallback(() => {
    if (activeKindRef.current === null) return;
    activeKindRef.current = null;
    setBubbleVisible(false);
  }, []);

  const cancelTravel = useCallback(() => {
    if (settleRafRef.current !== 0) cancelAnimationFrame(settleRafRef.current);
    settleRafRef.current = 0;
    pendingIdRef.current = null;
    setTravelling(false);
  }, []);

  useEffect(() => cancelTravel, [cancelTravel]);

  const releaseFocus = useCallback(() => {
    if (targetIdRef.current === null && pendingIdRef.current === null) return;
    cancelTravel();
    targetIdRef.current = null;
    if (activeKindRef.current === "focus") hideMessage();
    onFocusChangeRef.current(null);
    requestFrameRef.current();
  }, [cancelTravel, hideMessage]);

  const releaseFocusRef = useRef(releaseFocus);

  useEffect(() => {
    releaseFocusRef.current = releaseFocus;
  }, [releaseFocus]);

  const focusCard = useCallback(
    (id: string) => {
      const product = productsRef.current.find((item) => item._id === id);
      if (!product) {
        releaseFocus();
        return;
      }
      cancelTravel();
      tipsLeftRef.current = 0;
      targetIdRef.current = id;
      onFocusChangeRef.current(id);
      showText("focus", focusText(product), id);
    },
    [cancelTravel, releaseFocus, showText],
  );

  const collectVisibleIds = useCallback((): Set<string> => {
    const ids = new Set<string>();
    const root = catalogRef.current;
    if (!root) return ids;
    const viewportHeight = window.innerHeight;
    for (const card of Array.from(root.querySelectorAll<HTMLElement>(CARD_SELECTOR))) {
      const id = card.dataset.productId;
      if (id && visibleShare(card.getBoundingClientRect(), viewportHeight) >= MIN_VISIBLE_SHARE) {
        ids.add(id);
      }
    }
    return ids;
  }, [catalogRef]);

  const pickTipProduct = useCallback((): ShoppingOrbProduct | null => {
    const list = productsRef.current;
    const inStock = list.filter(isInStock);
    const pool = inStock.length > 0 ? inStock : list;
    if (pool.length === 0) return null;
    const visibleIds = collectVisibleIds();
    const onScreen = pool.filter((product) => visibleIds.has(product._id));
    const candidates = onScreen.length > 0 ? onScreen : pool;
    const tipped = tippedIdsRef.current;
    let next = candidates.find((product) => !tipped.has(product._id));
    if (!next) {
      for (const product of candidates) tipped.delete(product._id);
      next = candidates[0];
    }
    tipped.add(next._id);
    return next;
  }, [collectVisibleIds]);

  const showNextTip = useCallback(() => {
    if (tipsLeftRef.current <= 0 || targetIdRef.current !== null || hiddenRef.current) {
      hideMessage();
      return;
    }
    const product = pickTipProduct();
    if (!product) {
      hideMessage();
      return;
    }
    tipsLeftRef.current -= 1;
    const text = TIP_TEMPLATES[tipTurnRef.current % TIP_TEMPLATES.length](product.name, formatPrice(product));
    tipTurnRef.current += 1;
    showText("tip", text, product._id);
  }, [hideMessage, pickTipProduct, showText]);

  const focusNearest = useCallback(
    (x: number, y: number) => {
      const root = catalogRef.current;
      if (!root || hiddenRef.current) return;
      const viewportHeight = window.innerHeight;
      let bestId: string | null = null;
      let bestDistance = Number.POSITIVE_INFINITY;
      for (const card of Array.from(root.querySelectorAll<HTMLElement>(CARD_SELECTOR))) {
        const id = card.dataset.productId;
        if (!id) continue;
        const rect = card.getBoundingClientRect();
        if (visibleShare(rect, viewportHeight) < MIN_VISIBLE_SHARE) continue;
        const dx = Math.max(rect.left - x, 0, x - rect.right);
        const dy = Math.max(rect.top - y, 0, y - rect.bottom);
        const distance = dx * dx + dy * dy;
        if (distance < bestDistance) {
          bestDistance = distance;
          bestId = id;
        }
      }
      if (bestId !== null) focusCard(bestId);
    },
    [catalogRef, focusCard],
  );

  const stepToNext = useCallback(() => {
    const root = catalogRef.current;
    if (!root || hiddenRef.current) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>(CARD_SELECTOR));
    if (cards.length === 0) return;
    const viewportHeight = window.innerHeight;
    const rects = cards.map((card) => card.getBoundingClientRect());
    const currentId = targetIdRef.current;
    let start = currentId === null ? -1 : cards.findIndex((card) => card.dataset.productId === currentId);
    if (start === -1) {
      start = rects.findIndex((rect) => visibleShare(rect, viewportHeight) >= MIN_VISIBLE_SHARE);
    }
    if (start === -1) {
      start = rects.reduce((last, rect, index) => (rect.bottom <= NAV_OFFSET ? index : last), -1);
    }
    const index = (start + 1) % cards.length;
    const id = cards[index].dataset.productId;
    if (!id) return;
    const rect = rects[index];
    const r = sizeRef.current / 2;
    if (!hintShownRef.current) {
      hintShownRef.current = true;
      writeSessionFlag(HINT_STORAGE_KEY);
    }
    tipsLeftRef.current = 0;
    hideMessage();
    if (fitsForFocus(rect, r, viewportHeight)) {
      focusCard(id);
      return;
    }
    cancelTravel();
    onFocusChangeRef.current(null);
    targetIdRef.current = id;
    pendingIdRef.current = id;
    setTravelling(true);
    const top = scrollTopFor(rect, r, viewportHeight);
    window.scrollTo({ top, behavior: reducedRef.current ? "instant" : "smooth" });
    const startedAt = performance.now();
    let lastY = window.scrollY;
    let stableFrames = 0;
    const watch = (): void => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 0.5) {
        stableFrames += 1;
      } else {
        stableFrames = 0;
        lastY = y;
      }
      const elapsed = performance.now() - startedAt;
      const arrived = Math.abs(y - top) < 1.5;
      if (arrived || (stableFrames >= SCROLL_STABLE_FRAMES && elapsed > SCROLL_MIN_MS) || elapsed > SCROLL_MAX_MS) {
        settleRafRef.current = 0;
        if (pendingIdRef.current === id) focusCard(id);
        return;
      }
      settleRafRef.current = requestAnimationFrame(watch);
    };
    settleRafRef.current = requestAnimationFrame(watch);
    requestFrameRef.current();
  }, [catalogRef, cancelTravel, focusCard, hideMessage]);

  useEffect(() => {
    hiddenRef.current = hidden;
    if (hidden) {
      tipsLeftRef.current = 0;
      releaseFocus();
      hideMessage();
    }
    requestFrameRef.current();
  }, [hidden, releaseFocus, hideMessage]);

  useEffect(() => {
    const id = targetIdRef.current;
    if (id !== null && !products.some((product) => product._id === id)) releaseFocus();
  }, [products, releaseFocus]);

  useEffect(() => {
    const motion = motionRef.current;
    let raf = 0;

    const findCard = (id: string): HTMLElement | null =>
      catalogRef.current?.querySelector<HTMLElement>(`[data-product-id="${CSS.escape(id)}"]`) ?? null;

    const resolveTarget = (viewportWidth: number, viewportHeight: number): OrbTarget | null => {
      const r = sizeRef.current / 2;
      const id = targetIdRef.current;
      if (id !== null) {
        const rect = findCard(id)?.getBoundingClientRect();
        if (rect && (pendingIdRef.current === id || visibleShare(rect, viewportHeight) >= MIN_VISIBLE_SHARE)) {
          return { key: id, ...attachPoint(rect, r, viewportWidth, viewportHeight) };
        }
        releaseFocusRef.current();
      }
      const home = homeRef.current?.getBoundingClientRect();
      if (!home) return null;
      return { key: "home", x: home.left - r, y: home.top - r };
    };

    const placeBubble = (cx: number, cy: number, r: number, viewportWidth: number, viewportHeight: number): void => {
      const layer = bubbleLayerRef.current;
      if (!layer) return;
      const { width, height } = bubbleSizeRef.current;
      const x = clamp(cx + r * 0.6 - width, EDGE, viewportWidth - width - EDGE);
      let y = cy - r * 0.85 - height;
      if (y < NAV_OFFSET) y = cy + r * 0.85;
      y = clamp(y, NAV_OFFSET, viewportHeight - height - EDGE);
      layer.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    };

    const step = (now: number): void => {
      raf = 0;
      if (hiddenRef.current) {
        motion.ready = false;
        motion.last = 0;
        return;
      }
      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = window.innerHeight;
      const target = resolveTarget(viewportWidth, viewportHeight);
      if (!target) return;
      const dt = motion.last === 0 ? 1 / 60 : Math.min((now - motion.last) / 1000, 1 / 30);
      motion.last = now;

      if (!motion.ready || reducedRef.current) {
        motion.ox = 0;
        motion.oy = 0;
        motion.vx = 0;
        motion.vy = 0;
        motion.ready = true;
      } else if (target.key !== motion.key) {
        motion.ox = motion.x - target.x;
        motion.oy = motion.y - target.y;
      }
      motion.key = target.key;

      motion.vx += (-SPRING_K * motion.ox - SPRING_C * motion.vx) * dt;
      motion.vy += (-SPRING_K * motion.oy - SPRING_C * motion.vy) * dt;
      motion.ox += motion.vx * dt;
      motion.oy += motion.vy * dt;

      const settled =
        Math.abs(motion.ox) < 0.25 &&
        Math.abs(motion.oy) < 0.25 &&
        Math.abs(motion.vx) < 1 &&
        Math.abs(motion.vy) < 1;
      if (settled) {
        motion.ox = 0;
        motion.oy = 0;
        motion.vx = 0;
        motion.vy = 0;
      }

      motion.x = target.x + motion.ox;
      motion.y = target.y + motion.oy;
      const r = sizeRef.current / 2;
      const orbLayer = orbLayerRef.current;
      if (orbLayer) {
        orbLayer.style.transform = `translate3d(${(motion.x - r).toFixed(1)}px, ${(motion.y - r).toFixed(1)}px, 0)`;
      }
      const scrim = scrimRef.current;
      if (scrim) {
        const s = (sizeRef.current * SCRIM_SCALE) / 2;
        scrim.style.transform = `translate3d(${(motion.x - s).toFixed(1)}px, ${(motion.y - s).toFixed(1)}px, 0)`;
      }
      placeBubble(motion.x, motion.y, r, viewportWidth, viewportHeight);

      if (settled) motion.last = 0;
      else raf = requestAnimationFrame(step);
    };

    const request = (): void => {
      if (raf === 0) raf = requestAnimationFrame(step);
    };

    requestFrameRef.current = request;
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    request();

    return () => {
      if (raf !== 0) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      requestFrameRef.current = () => undefined;
    };
  }, [catalogRef]);

  useEffect(() => {
    const bubble = bubbleRef.current;
    if (!bubble || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => {
      bubbleSizeRef.current = { width: bubble.offsetWidth, height: bubble.offsetHeight };
      requestFrameRef.current();
    });
    observer.observe(bubble);
    return () => observer.disconnect();
  }, [message]);

  useEffect(() => {
    if (hidden) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let lastActivity = performance.now();

    const isOwnTarget = (target: EventTarget | null): boolean =>
      target instanceof Node &&
      (Boolean(bubbleRef.current?.contains(target)) || Boolean(orbButtonRef.current?.contains(target)));

    const startTips = (): void => {
      if (document.visibilityState !== "visible" || targetIdRef.current !== null) return;
      tipsLeftRef.current = TIPS_PER_PAUSE;
      if (!hintShownRef.current) {
        hintShownRef.current = true;
        writeSessionFlag(HINT_STORAGE_KEY);
        showText("hint", HINT_TEXT, null);
        return;
      }
      showNextTip();
    };

    const check = (): void => {
      timer = undefined;
      const wait = IDLE_DELAY_MS - (performance.now() - lastActivity);
      if (wait > 0) {
        timer = setTimeout(check, wait);
        return;
      }
      startTips();
    };

    const onActivity = (event: Event): void => {
      if (isOwnTarget(event.target)) return;
      lastActivity = performance.now();
      tipsLeftRef.current = 0;
      if (activeKindRef.current === "tip" || activeKindRef.current === "hint") hideMessage();
      if (timer === undefined) timer = setTimeout(check, IDLE_DELAY_MS);
    };

    for (const name of ACTIVITY_EVENTS) window.addEventListener(name, onActivity, { passive: true });
    document.addEventListener("visibilitychange", onActivity);
    timer = setTimeout(check, IDLE_DELAY_MS);

    return () => {
      if (timer !== undefined) clearTimeout(timer);
      for (const name of ACTIVITY_EVENTS) window.removeEventListener(name, onActivity);
      document.removeEventListener("visibilitychange", onActivity);
    };
  }, [hidden, hideMessage, showNextTip, showText]);

  useEffect(() => {
    if (!message || message.kind === "focus" || !bubbleVisible || !typed) return;
    const timer = setTimeout(showNextTip, message.kind === "hint" ? HINT_HOLD_MS : TIP_HOLD_MS);
    return () => clearTimeout(timer);
  }, [message, bubbleVisible, typed, showNextTip]);

  useEffect(() => {
    let raf = 0;
    let origin: { id: number; x: number; y: number; time: number } | null = null;

    const onDown = (event: PointerEvent): void => {
      const primary = event.isPrimary && (event.pointerType !== "mouse" || event.button === 0);
      origin = primary
        ? { id: event.pointerId, x: event.clientX, y: event.clientY, time: event.timeStamp }
        : null;
    };

    const onCancel = (): void => {
      origin = null;
    };

    const onUp = (event: PointerEvent): void => {
      const start = origin;
      origin = null;
      if (!start || start.id !== event.pointerId || hiddenRef.current) return;
      const moved = Math.hypot(event.clientX - start.x, event.clientY - start.y);
      if (moved > TAP_SLOP_PX || event.timeStamp - start.time > TAP_MAX_MS) return;
      const target = event.target;
      if (!(target instanceof Element) || !target.isConnected) return;
      if (target.closest(IGNORE_SELECTOR)) return;
      const selection = window.getSelection();
      if (selection && !selection.isCollapsed) return;
      const { clientX, clientY } = event;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => focusNearest(clientX, clientY));
    };

    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onCancel, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onCancel);
    };
  }, [focusNearest]);

  const handleTyped = useCallback(() => setTyped(true), []);

  const handleBubbleClick = (): void => {
    if (!message) return;
    if (message.kind === "hint") {
      stepToNext();
      return;
    }
    const product = productsRef.current.find((item) => item._id === message.productId);
    if (product) onOpenRef.current(product);
  };

  const orbState: OrbState = travelling
    ? "thinking"
    : bubbleVisible
      ? typed
        ? "listening"
        : "speaking"
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
        <div className="relative h-full w-full animate-orb-float motion-reduce:animate-none">
          <span aria-hidden="true" className="absolute -inset-1/3 rounded-full bg-rose-500/35 blur-2xl" />
          <button
            ref={orbButtonRef}
            type="button"
            aria-label={ORB_BUTTON_LABEL}
            onClick={stepToNext}
            className={cn(
              "relative block rounded-full transition-transform duration-200 ease-out active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200/80 motion-reduce:transition-none motion-reduce:active:scale-100",
              hidden ? "pointer-events-none" : "pointer-events-auto cursor-pointer",
            )}
            style={{ width: size, height: size }}
          >
            <SiriSheetOrb
              state={orbState}
              size={size}
              colorFrom="#fda4af"
              colorTo="#9f1239"
              paused={hidden}
            />
          </button>
        </div>
      </div>
      <div
        ref={bubbleLayerRef}
        className="pointer-events-none fixed left-0 top-0 z-30"
        style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
      >
        {message && (
          <button
            ref={bubbleRef}
            type="button"
            inert={!bubbleVisible}
            aria-label={message.text}
            onClick={handleBubbleClick}
            className={cn(
              "relative block w-max max-w-[min(18rem,calc(100vw_-_2rem))] rounded-2xl border border-rose-300/20 bg-neutral-900/90 px-4 py-2.5 text-left text-sm leading-snug text-rose-50 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-md transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/70 motion-reduce:transition-none",
              bubbleVisible
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "translate-y-1 opacity-0",
            )}
          >
            <span aria-hidden="true" className="invisible block">
              {message.text}
            </span>
            <span className="absolute inset-0 px-4 py-2.5">
              <TypedText key={message.id} text={message.text} instant={reduced} onDone={handleTyped} />
            </span>
          </button>
        )}
      </div>
    </>
  );
};
