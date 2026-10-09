"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { CSSProperties, ReactElement, RefObject } from "react";

export type OrbState = "idle" | "connecting" | "listening" | "thinking" | "speaking";

type Rgb = [number, number, number];
type Vec3 = [number, number, number];
type StateWeights = Record<OrbState, number>;

const ORB_STATES: readonly OrbState[] = ["idle", "connecting", "listening", "thinking", "speaking"];

const hexToRgb = (hex: string): Rgb => {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const n = Number.parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const toLinear = (c: number): number => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};

const toSrgb = (v: number): number => {
  const c = v <= 0.0031308 ? v * 12.92 : 1.055 * v ** (1 / 2.4) - 0.055;
  return Math.min(255, Math.max(0, c * 255));
};

const mixRgb = (a: Rgb, b: Rgb, t: number): Rgb => [
  toSrgb(toLinear(a[0]) + (toLinear(b[0]) - toLinear(a[0])) * t),
  toSrgb(toLinear(a[1]) + (toLinear(b[1]) - toLinear(a[1])) * t),
  toSrgb(toLinear(a[2]) + (toLinear(b[2]) - toLinear(a[2])) * t),
];

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

const approach = (current: number, target: number, rate: number, dt: number): number =>
  current + (target - current) * (1 - Math.exp(-rate * dt));

const wave = (x: number): number => 0.5 - 0.5 * Math.cos(x);

const stateEnergy = (state: OrbState, t: number): number => {
  switch (state) {
    case "listening":
      return 0.4 + 0.32 * wave(t * 17) + 0.18 * wave(t * 8.2 + 3);
    case "speaking":
      return 0.3 + 0.24 * wave(t * 12.4) + 0.16 * wave(t * 6 + 1.2);
    case "thinking":
      return 0.24 + 0.2 * wave(t * 4.8);
    case "connecting":
      return 0.12 + 0.1 * wave(t * 3.2);
    default:
      return 0;
  }
};

const blendEnergy = (weights: StateWeights, t: number): number => {
  let energy = 0;
  for (const key of ORB_STATES) {
    if (weights[key] > 0) energy += weights[key] * stateEnergy(key, t);
  }
  return energy;
};

const ENTER_RATE = 14;
const SETTLE_RATE = 5;

const createStateMix = (
  initial: OrbState,
): { weights: StateWeights; update: (state: OrbState, dt: number) => void } => {
  const weights: StateWeights = { idle: 0, connecting: 0, listening: 0, thinking: 0, speaking: 0 };
  weights[initial] = 1;
  const update = (state: OrbState, dt: number): void => {
    const rate = state === "idle" ? SETTLE_RATE : ENTER_RATE;
    let total = 0;
    for (const key of ORB_STATES) {
      const target = key === state ? 1 : 0;
      const next = approach(weights[key], target, rate, dt);
      weights[key] = target === 0 && next < 0.001 ? 0 : next;
      total += weights[key];
    }
    if (total > 0) {
      for (const key of ORB_STATES) weights[key] /= total;
    }
  };
  return { weights, update };
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" && window.matchMedia(REDUCED_MOTION_QUERY).matches;

const subscribeReducedMotion = (onChange: () => void): (() => void) => {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

export const useReducedMotion = (): boolean =>
  useSyncExternalStore(subscribeReducedMotion, prefersReducedMotion, () => false);

let webglSupport: boolean | null = null;

const detectWebGL = (): boolean => {
  if (webglSupport !== null) return webglSupport;
  try {
    const canvas = document.createElement("canvas");
    const attributes: WebGLContextAttributes = { failIfMajorPerformanceCaveat: true };
    const probe = canvas.getContext("webgl", attributes);
    webglSupport = probe !== null;
    probe?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    webglSupport = false;
  }
  return webglSupport;
};

const subscribeNoop = (): (() => void) => () => undefined;

const useWebGLSupport = (): boolean | null =>
  useSyncExternalStore(subscribeNoop, detectWebGL, () => null);

const observeActivity = (el: Element, onChange: (active: boolean) => void): (() => void) => {
  let inView = true;
  let pageVisible = document.visibilityState === "visible";
  let active = inView && pageVisible;

  const sync = (): void => {
    const next = inView && pageVisible;
    if (next === active) return;
    active = next;
    onChange(next);
  };

  const observer =
    typeof IntersectionObserver === "undefined"
      ? null
      : new IntersectionObserver((entries) => {
          inView = entries[entries.length - 1]?.isIntersecting ?? true;
          sync();
        });
  observer?.observe(el);

  const onVisibility = (): void => {
    pageVisible = document.visibilityState === "visible";
    sync();
  };
  document.addEventListener("visibilitychange", onVisibility);

  return () => {
    observer?.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
  };
};

interface OrbFrame {
  phase: number;
  weights: StateWeights;
  level: number;
}

interface OrbAnimatorOptions {
  state: OrbState;
  speed: number;
  paused: boolean;
  onFrame: (frame: OrbFrame) => void;
}

const LEVEL_ATTACK_RATE = 14;
const LEVEL_RELEASE_RATE = 4;
const MAX_FRAME_DT = 0.1;

const useOrbAnimator = (
  hostRef: RefObject<HTMLElement | null>,
  { state, speed, paused, onFrame }: OrbAnimatorOptions,
): RefObject<OrbFrame> => {
  const optionsRef = useRef<OrbAnimatorOptions>({ state, speed, paused, onFrame });
  const syncRef = useRef<() => void>(() => undefined);
  const frameRef = useRef<OrbFrame>({
    phase: 0,
    weights: createStateMix(state).weights,
    level: 0,
  });

  useEffect(() => {
    optionsRef.current = { state, speed, paused, onFrame };
    syncRef.current();
  }, [state, speed, paused, onFrame]);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    const mix = createStateMix(optionsRef.current.state);
    const frame = frameRef.current;
    frame.weights = mix.weights;
    let reduced = prefersReducedMotion();
    let raf = 0;
    let last: number | null = null;
    let visible = true;

    const canRun = (): boolean => visible && !optionsRef.current.paused;

    const halt = (): void => {
      if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      last = null;
    };

    const tick = (now: number): void => {
      raf = 0;
      const dt = last === null ? 0 : Math.min((now - last) / 1000, MAX_FRAME_DT);
      last = now;
      const opts = optionsRef.current;
      mix.update(opts.state, dt);
      if (!reduced) frame.phase += dt * Math.max(0, opts.speed);
      const target = reduced ? 0 : blendEnergy(mix.weights, frame.phase);
      frame.level = approach(
        frame.level,
        target,
        target > frame.level ? LEVEL_ATTACK_RATE : LEVEL_RELEASE_RATE,
        dt,
      );
      opts.onFrame(frame);
      const settled = reduced && mix.weights[opts.state] > 0.999 && frame.level < 0.001;
      if (canRun() && !settled) raf = requestAnimationFrame(tick);
      else last = null;
    };

    const sync = (): void => {
      if (!canRun()) {
        halt();
        return;
      }
      if (raf === 0) raf = requestAnimationFrame(tick);
    };

    syncRef.current = sync;

    const unobserve = observeActivity(el, (next) => {
      visible = next;
      sync();
    });

    const unsubscribe = subscribeReducedMotion(() => {
      reduced = prefersReducedMotion();
      sync();
    });

    sync();

    return () => {
      halt();
      unobserve();
      unsubscribe();
      syncRef.current = () => undefined;
    };
  }, [hostRef]);

  return frameRef;
};

const SHEET_KEYS = [
  "speed",
  "warp",
  "ridge",
  "sharp",
  "zoom",
  "exposure",
  "mute",
  "glow",
  "rim",
  "hear",
  "voice",
] as const;

type SheetParams = Record<(typeof SHEET_KEYS)[number], number>;

const STATE_TABLE: Record<OrbState, SheetParams> = {
  idle: { speed: 0.3, warp: 0.52, ridge: 0.48, sharp: 0.9, zoom: 0.94, exposure: 0.74, mute: 0.12, glow: 0.16, rim: 0.6, hear: 0, voice: 0 },
  connecting: { speed: 0.5, warp: 0.78, ridge: 0.72, sharp: 0.95, zoom: 0.97, exposure: 0.84, mute: 0.08, glow: 0.22, rim: 0.7, hear: 0, voice: 0 },
  listening: { speed: 0.55, warp: 0.66, ridge: 0.7, sharp: 1, zoom: 1, exposure: 1.04, mute: 0, glow: 0.3, rim: 0.85, hear: 1, voice: 0 },
  thinking: { speed: 1, warp: 1, ridge: 1, sharp: 1, zoom: 1, exposure: 1, mute: 0, glow: 0.28, rim: 0.8, hear: 0, voice: 0 },
  speaking: { speed: 0.78, warp: 0.72, ridge: 0.9, sharp: 1, zoom: 1, exposure: 0.96, mute: 0, glow: 0.34, rim: 0.8, hear: 0, voice: 1 },
};

const blendSheet = (weights: StateWeights): SheetParams => {
  const out: SheetParams = { speed: 0, warp: 0, ridge: 0, sharp: 0, zoom: 0, exposure: 0, mute: 0, glow: 0, rim: 0, hear: 0, voice: 0 };
  for (const state of ORB_STATES) {
    const w = weights[state];
    if (w === 0) continue;
    const row = STATE_TABLE[state];
    for (const key of SHEET_KEYS) out[key] += row[key] * w;
  }
  return out;
};

const toUnit = ([r, g, b]: Rgb): Vec3 => [r / 255, g / 255, b / 255];

const rotateHue = ([r, g, b]: Rgb, degrees: number): Rgb => {
  const a = (degrees * Math.PI) / 180;
  const c = Math.cos(a);
  const s = Math.sin(a);
  const k = 1 / 3;
  const q = Math.sqrt(k);
  const m0 = c + (1 - c) * k;
  const m1 = k * (1 - c) - q * s;
  const m2 = k * (1 - c) + q * s;
  const clampC = (v: number): number => Math.min(255, Math.max(0, v));
  return [
    clampC(r * m0 + g * m1 + b * m2),
    clampC(r * m2 + g * m0 + b * m1),
    clampC(r * m1 + g * m2 + b * m0),
  ];
};

const muteRgb = (rgb: Rgb, amount: number): Rgb => {
  const lum = rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  return mixRgb(rgb, [lum, lum, lum], amount);
};

const WHITE: Rgb = [255, 255, 255];

interface Palette {
  a: Vec3;
  b: Vec3;
  c: Vec3;
  d: Vec3;
  hi: Vec3;
  cool: Vec3;
  warm: Vec3;
  glow: Vec3;
}

const buildPalette = (from: Rgb, to: Rgb, mute: number): Palette => {
  const a = muteRgb(from, mute);
  const b = muteRgb(to, mute);
  const c = muteRgb(rotateHue(mixRgb(from, to, 0.35), -38), mute);
  const d = muteRgb(rotateHue(mixRgb(from, to, 0.65), 42), mute);
  const mid = mixRgb(a, b, 0.5);
  return {
    a: toUnit(a),
    b: toUnit(b),
    c: toUnit(c),
    d: toUnit(d),
    hi: toUnit(mixRgb(mid, WHITE, 0.82)),
    cool: toUnit(mixRgb(a, WHITE, 0.15)),
    warm: toUnit(mixRgb(d, WHITE, 0.1)),
    glow: toUnit(mid),
  };
};

const VERT = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

uniform float uSize;
uniform float uPhase;
uniform float uLevel;
uniform float uWarp;
uniform float uRidge;
uniform float uSharp;
uniform float uZoom;
uniform float uExposure;
uniform float uGlow;
uniform float uRim;
uniform float uHear;
uniform vec3 uColA;
uniform vec3 uColB;
uniform vec3 uColC;
uniform vec3 uColD;
uniform vec3 uHi;
uniform vec3 uCool;
uniform vec3 uWarm;
uniform vec3 uGlowCol;

const float RAD = 0.86;
const float SOFT = 0.005;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}

float fbm(vec2 p) {
  float s = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    s += a * noise(p);
    p = mat2(0.8, 0.6, -0.6, 0.8) * p * 2.03;
    a *= 0.5;
  }
  return s / 0.9375;
}

vec2 band(vec2 q, float drift, float offset, float amp, float mainY, float env, float soft) {
  float y = amp * env * sin(q.x * 1.0 + drift + offset);
  float d = abs(q.y - y);
  float line = 0.018 / (sqrt(d * d + soft * soft) + 0.026);
  float bd = max(0.0, max(q.y - max(mainY, y), min(mainY, y) - q.y));
  float fillB = 0.014 / (bd * bd * 5.0 + 0.06);
  return vec2(line, fillB);
}

vec3 sheet(vec2 p, float t) {
  float scale = 0.74 + uZoom * 0.34;
  vec2 q = p / scale;
  vec2 w = vec2(fbm(q * 1.1 + vec2(0.0, t * 0.09)), fbm(q * 1.1 + vec2(7.7, -t * 0.07))) - 0.5;
  q += uWarp * 0.075 * w;
  float xn = q.x;
  float envB = cos(1.57079633 * min(abs(0.9 * xn), 1.0));
  float env = envB * envB;
  float low = 0.5 + 0.5 * cos(t * 0.37);
  float mid = 0.5 + 0.5 * sin(t * 0.51 + 1.2);
  float high = 0.5 + 0.5 * cos(t * 0.73 + 2.1);
  float drift = t * 2.4;
  float mainAmp = 0.1 + uRidge * 0.17 + low * 0.018;
  float bandAmp = mainAmp + mid * 0.025 + high * 0.018;
  float mainY = mainAmp * env * sin(q.x * 1.1 + drift);
  float sep = 1.85 + uWarp * 0.12 + mid * 0.28;
  float soft = 0.03 / max(uSharp, 0.2) + mid * 0.006;

  vec2 b0 = band(q, drift, -sep, bandAmp, mainY, env, soft);
  vec2 b1 = band(q, drift, -sep * 0.34, bandAmp, mainY, env, soft);
  vec2 b2 = band(q, drift, sep * 0.34, bandAmp, mainY, env, soft);
  vec2 b3 = band(q, drift, sep, bandAmp, mainY, env, soft);
  float w0 = b0.x + b0.y;
  float w1 = b1.x + b1.y;
  float w2 = b2.x + b2.y;
  float w3 = b3.x + b3.y;
  float total = w0 + w1 + w2 + w3;
  float d0 = w0 * w0;
  float d1 = w1 * w1;
  float d2 = w2 * w2;
  float d3 = w3 * w3;
  vec3 spectral = (uColA * d0 + uColC * d1 + uColB * d2 + uColD * d3) / max(d0 + d1 + d2 + d3, 0.0001);
  float energy = (1.0 - exp(-max(total - 0.12, 0.0) * 0.75)) * env;
  float md = abs(q.y - mainY);
  float core = exp(-md * md / (0.0028 / max(uSharp, 0.2))) * env;

  float haze = fbm(q * 1.6 + vec2(t * 0.05, -t * 0.03));
  vec3 atmos = mix(uColD, uColB, smoothstep(-0.7, 0.7, q.y)) * (0.012 + 0.022 * haze);
  atmos += mix(uColA, uColC, haze) * 0.035 * exp(-q.y * q.y * 7.0) * haze;

  vec3 col = atmos + spectral * energy * 1.14;
  col += uHi * core * (0.2 + 0.1 * low);
  col = col / (1.0 + col * 0.18);
  col = mix(col, uHi, 0.06 * smoothstep(0.15, 1.15, dot(p, vec2(-0.32, 0.78))));
  col *= 1.0 - 0.3 * smoothstep(-0.1, 1.2, dot(p, vec2(0.45, -0.62)));
  return col;
}

float profile(float t) {
  float d = clamp(t, 0.0, 1.0);
  return 1.0 - sqrt(max(1.0 - (1.0 - d) * (1.0 - d), 0.0));
}

float lobe(vec2 n, vec2 dir, float cut, float power) {
  return pow(clamp((dot(n, dir) - cut) / max(1.0 - cut, 0.001), 0.0, 1.0), power);
}

vec3 over(vec3 dst, vec3 src, float a) {
  float k = clamp(a, 0.0, 1.0);
  return src * k + dst * (1.0 - k);
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uSize) / uSize;
  float r = length(uv);
  float ang = atan(uv.y, uv.x);
  float t = uPhase;

  float contour = uHear * uLevel * (0.011 * sin(ang * 3.0 + t * 1.9) + 0.006 * sin(ang * 5.0 - t * 1.3 + 1.7));
  float rad = RAD * (1.0 + contour);
  vec3 glowCol = uGlowCol * (0.6 + 0.4 * uHear * uLevel);
  float glowAmt = uGlow * (1.0 + 0.9 * uHear * uLevel);

  if (r > rad * (1.01 + SOFT)) {
    vec3 halo = glowCol * glowAmt * exp(-(r - rad) * 11.0) * (1.0 - smoothstep(rad, 0.995, r));
    halo = clamp(halo, 0.0, 1.0);
    gl_FragColor = vec4(halo, max(halo.r, max(halo.g, halo.b)));
    return;
  }

  vec2 p = uv / rad;
  float pd = length(p);
  vec2 n = pd > 0.0001 ? p / pd : vec2(0.0);
  float edge = max(1.0 - pd, 0.0);
  float prof = pow(profile(edge / 0.3), 0.68);
  vec2 rp = p - n * prof * 0.5;

  vec3 fcol;
  if (prof > 0.002) {
    float split = 0.12 * prof;
    fcol = vec3(sheet(rp - n * split, t).r, sheet(rp, t).g, sheet(rp + n * split, t).b);
  } else {
    fcol = sheet(p, t);
  }

  float lum = dot(fcol, vec3(0.213, 0.715, 0.072));
  vec3 col = clamp(vec3(lum) + (fcol - vec3(lum)) * 1.18, 0.0, 1.0);

  float rimReact = uRim * (1.0 + 0.45 * uHear * uLevel);
  float surfW = 0.035 + 0.03 * uHear * uLevel;
  float surf = 1.0 - smoothstep(0.0, surfW, edge);
  float optical = pow(surf, 1.8);
  col = over(col, mix(uColA, uHi, 0.5) * 0.35, optical * 0.1 * rimReact);

  float coolS = lobe(n, normalize(vec2(0.84, 0.54)), 0.05, 1.6);
  float warmS = lobe(n, normalize(vec2(-0.62, -0.78)), 0.05, 1.8);
  float disp = optical * 0.5 * rimReact;
  col = over(col, uCool, disp * coolS);
  col = over(col, uWarm, disp * warmS);

  col *= 1.0 - optical * 0.12 * (0.15 + 0.85 * max(dot(n, vec2(0.45, -0.89)), 0.0));

  float key = optical * lobe(n, normalize(vec2(-0.68, 0.73)), 0.2, 2.8) * 0.6 * rimReact;
  float fillL = optical * lobe(n, normalize(vec2(0.74, -0.67)), 0.4, 3.6) * 0.4 * rimReact;
  col = over(col, mix(uHi, vec3(1.0), 0.35), key);
  col = over(col, mix(uColC, uHi, 0.55), fillL);

  col *= 1.0 - 0.4 * smoothstep(0.95, 1.0, pd);
  col += mix(uColA, uColB, 0.3 + 0.3 * sin(ang + t * 0.6)) * optical * 0.3 * uHear * uLevel;

  float spec = exp(-dot(p - vec2(-0.38, 0.46), p - vec2(-0.38, 0.46)) * 22.0);
  col += uHi * spec * 0.07 * uRim;

  float ballA = 1.0 - smoothstep(0.99 - SOFT, 1.01 + SOFT, pd);
  col = clamp(col * max(uExposure, 0.0), 0.0, 1.0) * ballA;
  float outside = smoothstep(rad - SOFT, rad + SOFT, r);
  col += glowCol * glowAmt * exp(-max(r - rad, 0.0) * 11.0) * (1.0 - smoothstep(rad, 0.995, r)) * outside;
  col = clamp(col, 0.0, 1.0);
  float a = clamp(max(ballA, max(col.r, max(col.g, col.b))), 0.0, 1.0);
  gl_FragColor = vec4(col, a);
}
`;

const UNIFORMS = [
  "uSize",
  "uPhase",
  "uLevel",
  "uWarp",
  "uRidge",
  "uSharp",
  "uZoom",
  "uExposure",
  "uGlow",
  "uRim",
  "uHear",
  "uColA",
  "uColB",
  "uColC",
  "uColD",
  "uHi",
  "uCool",
  "uWarm",
  "uGlowCol",
] as const;

type UniformName = (typeof UNIFORMS)[number];

const fallbackLayer = (from: string, to: string, size: number): CSSProperties => ({
  background: `radial-gradient(ellipse 70% 16% at 50% 50%, color-mix(in oklab, ${from} 45%, white) 0%, ${from} 30%, transparent 72%), radial-gradient(ellipse 85% 34% at 50% 52%, color-mix(in oklab, ${to} 70%, transparent) 0%, transparent 70%), radial-gradient(circle at 34% 28%, rgba(255, 255, 255, 0.18), transparent 38%), radial-gradient(circle at 50% 50%, color-mix(in oklab, ${to} 18%, #07060f) 55%, color-mix(in oklab, ${from} 40%, #07060f) 100%)`,
  boxShadow: `0 0 calc(${Math.round(size * 0.05)}px + var(--orb-level, 0) * ${Math.round(size * 0.14)}px) color-mix(in oklab, ${to} 50%, transparent), inset 0 0 ${Math.round(size * 0.04)}px color-mix(in oklab, ${from} 55%, transparent)`,
  transform: "scaleY(calc(1 + var(--orb-level, 0) * 0.05))",
});

interface SiriSheetOrbProps {
  state?: OrbState;
  size?: number;
  speed?: number;
  colorFrom?: string;
  colorTo?: string;
  paused?: boolean;
  label?: string;
  className?: string;
}

export const SiriSheetOrb = ({
  state = "idle",
  size = 168,
  speed = 1,
  colorFrom = "#82f4ff",
  colorTo = "#8e6cff",
  paused = false,
  label = "Siri Sheet orb",
  className,
}: SiriSheetOrbProps): ReactElement => {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorRef = useRef({ from: colorFrom, to: colorTo });
  const drawRef = useRef<((frame: OrbFrame) => void) | null>(null);
  const motionRef = useRef({ sheet: 1.7, lastPhase: 0 });
  const [lost, setLost] = useState(false);
  const support = useWebGLSupport();
  const showCanvas = support === true && !lost;
  const showCanvasRef = useRef(showCanvas);

  useEffect(() => {
    showCanvasRef.current = showCanvas;
  }, [showCanvas]);

  const onFrame = useCallback((frame: OrbFrame) => {
    if (!showCanvasRef.current) {
      hostRef.current?.style.setProperty("--orb-level", frame.level.toFixed(3));
    }
    drawRef.current?.(frame);
  }, []);

  const frameRef = useOrbAnimator(hostRef, { state, speed, paused, onFrame });

  useEffect(() => {
    if (!showCanvas) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      powerPreference: "low-power",
    });
    if (!gl) {
      setLost(true);
      return;
    }

    const compile = (type: number, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vert = compile(gl.VERTEX_SHADER, VERT);
    const frag = compile(gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    const dropResources = (): void => {
      if (vert) gl.deleteShader(vert);
      if (frag) gl.deleteShader(frag);
      if (program) gl.deleteProgram(program);
    };
    if (!vert || !frag || !program) {
      dropResources();
      setLost(true);
      return;
    }
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      dropResources();
      setLost(true);
      return;
    }
    gl.useProgram(program);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const px = Math.max(1, Math.round(size * dpr));
    canvas.width = px;
    canvas.height = px;
    gl.viewport(0, 0, px, px);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const loc = Object.fromEntries(
      UNIFORMS.map((name) => [name, gl.getUniformLocation(program, name)]),
    ) as Record<UniformName, WebGLUniformLocation | null>;
    gl.uniform1f(loc.uSize, px);

    const set3 = (name: UniformName, v: Vec3): void => gl.uniform3f(loc[name], v[0], v[1], v[2]);

    drawRef.current = (frame) => {
      const p = blendSheet(frame.weights);
      const level = clamp01(frame.level);
      const motion = motionRef.current;
      const dPhase = Math.max(0, frame.phase - motion.lastPhase);
      motion.lastPhase = frame.phase;
      const voice = p.voice * level;
      motion.sheet += dPhase * p.speed * (1 + 0.7 * voice);

      const pal = buildPalette(
        hexToRgb(colorRef.current.from),
        hexToRgb(colorRef.current.to),
        clamp01(p.mute),
      );

      gl.uniform1f(loc.uPhase, motion.sheet);
      gl.uniform1f(loc.uLevel, level);
      gl.uniform1f(loc.uWarp, p.warp * 3.2 + 0.85 * voice);
      gl.uniform1f(loc.uRidge, p.ridge + 0.35 * voice + 0.25 * p.hear * level);
      gl.uniform1f(loc.uSharp, p.sharp * 2.2);
      gl.uniform1f(loc.uZoom, p.zoom);
      gl.uniform1f(loc.uExposure, p.exposure * 1.9 * (1 + 0.12 * voice + 0.1 * p.hear * level));
      gl.uniform1f(loc.uGlow, p.glow * 0.45);
      gl.uniform1f(loc.uRim, p.rim);
      gl.uniform1f(loc.uHear, p.hear);
      set3("uColA", pal.a);
      set3("uColB", pal.b);
      set3("uColC", pal.c);
      set3("uColD", pal.d);
      set3("uHi", pal.hi);
      set3("uCool", pal.cool);
      set3("uWarm", pal.warm);
      set3("uGlowCol", pal.glow);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    drawRef.current(frameRef.current);

    const onLost = (event: Event): void => {
      event.preventDefault();
      drawRef.current = null;
      setLost(true);
    };
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      drawRef.current = null;
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.deleteBuffer(buffer);
      dropResources();
    };
  }, [size, showCanvas, frameRef]);

  useEffect(() => {
    colorRef.current = { from: colorFrom, to: colorTo };
    drawRef.current?.(frameRef.current);
  }, [colorFrom, colorTo, frameRef]);

  return (
    <div
      ref={hostRef}
      role="img"
      aria-label={label}
      data-state={state}
      className={`relative grid place-items-center ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      {showCanvas ? (
        <canvas ref={canvasRef} aria-hidden="true" style={{ width: size, height: size }} />
      ) : (
        <div
          aria-hidden="true"
          className={`absolute inset-[7%] rounded-full transition-opacity duration-300 ${state === "idle" ? "opacity-80" : "opacity-100"}`}
          style={fallbackLayer(colorFrom, colorTo, size)}
        />
      )}
    </div>
  );
};
