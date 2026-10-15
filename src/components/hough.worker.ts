import { buildClusterParams, drawScene, type ClusterParams } from "./houghScene";

type Message =
  | { type: "init"; canvas: OffscreenCanvas; seed: number; width: number; height: number; color: string; isDark: boolean; reducedMotion: boolean }
  | { type: "scroll"; delta: number }
  | { type: "resize"; width: number; height: number }
  | { type: "theme"; color: string; isDark: boolean }
  | { type: "motion"; reducedMotion: boolean }
  | { type: "visibility"; hidden: boolean };

let canvas: OffscreenCanvas;
let context: OffscreenCanvasRenderingContext2D;
let clusters: ClusterParams[];
let color = "";
let isDark = false;
let reducedMotion = false;
let hidden = false;
let time = 0;
let targetTime = 0;
let rafId = 0;
let previousFrame = 0;

const draw = () => drawScene(context, clusters, time, color, isDark);
const requestFrame = (callback: (now: number) => void) =>
  typeof self.requestAnimationFrame === "function"
    ? self.requestAnimationFrame(callback)
    : self.setTimeout(() => callback(performance.now()), 16);
const cancelFrame = (id: number) => {
  if (typeof self.cancelAnimationFrame === "function") self.cancelAnimationFrame(id);
  else self.clearTimeout(id);
};

const animate = (now: number) => {
  rafId = 0;
  if (hidden || reducedMotion) return;
  const elapsed = previousFrame ? Math.min(now - previousFrame, 64) : 16.67;
  previousFrame = now;
  const difference = targetTime - time;
  time += difference * (1 - Math.exp(-elapsed / 70));
  if (Math.abs(difference) < 0.0005) time = targetTime;
  draw();
  if (time !== targetTime) rafId = requestFrame(animate);
  else previousFrame = 0;
};

const schedule = () => {
  if (!rafId && !hidden && !reducedMotion) rafId = requestFrame(animate);
};

self.onmessage = ({ data }: MessageEvent<Message>) => {
  switch (data.type) {
    case "init":
      canvas = data.canvas;
      context = canvas.getContext("2d")!;
      clusters = buildClusterParams(data.seed);
      canvas.width = data.width;
      canvas.height = data.height;
      color = data.color;
      isDark = data.isDark;
      reducedMotion = data.reducedMotion;
      draw();
      break;
    case "scroll":
      if (!reducedMotion && !hidden) {
        targetTime += data.delta * 0.002;
        schedule();
      }
      break;
    case "resize":
      canvas.width = data.width;
      canvas.height = data.height;
      draw();
      break;
    case "theme":
      color = data.color;
      isDark = data.isDark;
      draw();
      break;
    case "motion":
      reducedMotion = data.reducedMotion;
      if (reducedMotion) {
        cancelFrame(rafId);
        rafId = 0;
        previousFrame = 0;
      } else if (time !== targetTime) schedule();
      break;
    case "visibility":
      hidden = data.hidden;
      if (hidden) {
        cancelFrame(rafId);
        rafId = 0;
        previousFrame = 0;
      } else if (time !== targetTime) schedule();
      break;
  }
};
