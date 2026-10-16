import { useEffect, useRef, useState } from "react";
import { buildClusterParams, drawScene } from "./houghScene";

const HoughBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [seed] = useState(() => Math.floor(Math.random() * 10000));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isDark = document.documentElement.classList.contains("dark");
    const themeColor = () => `hsl(${getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim()})`;
    let color = themeColor();
    let lastScrollY = window.scrollY;
    let worker: Worker | undefined;
    let drawOnMainThread: ((time: number) => void) | undefined;
    let time = 0;
    let targetTime = 0;
    let rafId = 0;
    let previousFrame = 0;

    const dimensions = () => {
      const scale = Math.min(1, 1400 / window.innerWidth);
      return {
        width: Math.round(window.innerWidth * scale),
        height: Math.round(window.innerHeight * scale),
      };
    };

    // Curve drawing runs in a worker where supported, leaving native scrolling
    // free to run on the page's main thread.
    if (typeof canvas.transferControlToOffscreen === "function") {
      try {
        worker = new Worker(new URL("./hough.worker.ts", import.meta.url), { type: "module" });
        const surface = canvas.transferControlToOffscreen();
        worker.postMessage({
          type: "init", canvas: surface, seed, ...dimensions(), color, isDark,
          reducedMotion: reducedMotion.matches,
        }, [surface]);
      } catch {
        worker?.terminate();
        worker = undefined;
      }
    }

    if (!worker) {
      const context = canvas.getContext("2d");
      if (!context) return;
      const clusters = buildClusterParams(seed);
      drawOnMainThread = (value) => drawScene(context, clusters, value, color, isDark);
      const { width, height } = dimensions();
      canvas.width = width;
      canvas.height = height;
      drawOnMainThread(time);
    }

    const animate = (now: number) => {
      rafId = 0;
      const elapsed = previousFrame ? Math.min(now - previousFrame, 64) : 16.67;
      previousFrame = now;
      const difference = targetTime - time;
      time += difference * (1 - Math.exp(-elapsed / 70));
      if (Math.abs(difference) < 0.0005) time = targetTime;
      drawOnMainThread?.(time);
      if (time !== targetTime) rafId = requestAnimationFrame(animate);
      else previousFrame = 0;
    };

    const onScroll = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY;
      lastScrollY = scrollY;
      if (reducedMotion.matches || document.hidden || delta === 0) return;
      if (worker) worker.postMessage({ type: "scroll", delta });
      else {
        targetTime += delta * 0.002;
        if (!rafId) rafId = requestAnimationFrame(animate);
      }
    };

    const resize = () => {
      const { width, height } = dimensions();
      if (worker) worker.postMessage({ type: "resize", width, height });
      else {
        canvas.width = width;
        canvas.height = height;
        drawOnMainThread?.(time);
      }
    };

    const onThemeChange = () => {
      isDark = document.documentElement.classList.contains("dark");
      color = themeColor();
      if (worker) worker.postMessage({ type: "theme", color, isDark });
      else drawOnMainThread?.(time);
    };

    const onMotionChange = () => {
      if (worker) worker.postMessage({ type: "motion", reducedMotion: reducedMotion.matches });
      else if (reducedMotion.matches) {
        cancelAnimationFrame(rafId);
        rafId = 0;
        previousFrame = 0;
      } else if (time !== targetTime && !rafId) rafId = requestAnimationFrame(animate);
    };

    const onVisibilityChange = () => {
      if (worker) worker.postMessage({ type: "visibility", hidden: document.hidden });
      else if (document.hidden) {
        cancelAnimationFrame(rafId);
        rafId = 0;
        previousFrame = 0;
      } else if (time !== targetTime && !rafId) rafId = requestAnimationFrame(animate);
    };

    const themeObserver = new MutationObserver(onThemeChange);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotion.addEventListener("change", onMotionChange);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotion.removeEventListener("change", onMotionChange);
      themeObserver.disconnect();
      cancelAnimationFrame(rafId);
      worker?.terminate();
    };
  }, [seed]);

  return <canvas ref={canvasRef} aria-hidden="true" className="hough-background" />;
};

export default HoughBackground;
