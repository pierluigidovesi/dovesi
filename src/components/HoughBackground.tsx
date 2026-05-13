import { useEffect, useRef, useState } from "react";

const W = 1200, H = 700;

function makeRng(seed: number) {
  let s = Math.floor(Math.abs(seed)) || 1;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}
const rr = (rng: () => number, a: number, b: number) => a + (b - a) * rng();
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

interface Point { x: number; y: number; }

function smooth(points: Point[], passes: number) {
  for (let p = 0; p < passes; p++) {
    for (let j = 1; j < points.length - 1; j++) {
      points[j] = {
        x: 0.1 * points[j - 1].x + 0.8 * points[j].x + 0.1 * points[j + 1].x,
        y: 0.1 * points[j - 1].y + 0.8 * points[j].y + 0.1 * points[j + 1].y,
      };
    }
  }
}

interface ClusterParams {
  srcX: number; srcY: number; spread: number;
  rhoScale: number; rhoOffset: number;
  thetaStart: number; thetaEnd: number;
  cosTilt: number; sinTilt: number;
  driftAmp: number; driftFreq: number; driftPhase: number;
  h2amp: number; h3amp: number; h2phase: number; h3phase: number;
  animSpeed1: number; animAmpMod: number; animDriftSpeed: number;
  phaseLagPerLine: number;
  pressureBumps: { pos: number; amp: number; width: number }[];
  ghostPtX: number; ghostPtY: number;
  lines: {
    ptX: number; ptY: number; phaseOff: number; ampMul: number;
    strokeMul: number; opacityMul: number; lineLag: number;
    lineStart: number; lineEnd: number;
  }[];
}

/** Pre-compute all random cluster parameters once. */
function buildClusterParams(seed: number): ClusterParams[] {
  const rng = makeRng(seed);
  const clusters: ClusterParams[] = [];
  const numClusters = 3;
  const linesPerCluster = 8;
  const spreadAmt = 0.15;
  const strokeVar = 0.7;

  for (let c = 0; c < numClusters; c++) {
    const srcX = rr(rng, -2.2, 2.2);
    const srcY = rr(rng, -2.2, 2.2);
    const spread = rr(rng, spreadAmt * 1.2, spreadAmt * 3.5);
    const rhoScale = rr(rng, 110, 220);
    const rhoOffset = rr(rng, -120, 120);
    const thetaStart = rr(rng, 0.1, 1.2);
    const thetaEnd = rr(rng, 4.8, 7.2);
    const tiltAngle = rr(rng, -0.7, 0.7);
    const driftAmp = rr(rng, 20, 70);
    const driftFreq = rr(rng, 0.3, 2.2);
    const driftPhase = rr(rng, 0, Math.PI * 2);
    const h2amp = rr(rng, 0.06, 0.25);
    const h3amp = rr(rng, 0.02, 0.12);
    const h2phase = rr(rng, 0, Math.PI * 2);
    const h3phase = rr(rng, 0, Math.PI * 2);
    const animSpeed1 = rr(rng, 0.12, 0.35) * (rng() > 0.5 ? 1 : -1);
    const animAmpMod = rr(rng, 0.02, 0.08);
    const animDriftSpeed = rr(rng, 0.02, 0.08) * (rng() > 0.5 ? 1 : -1);
    const phaseLagPerLine = rr(rng, 0.04, 0.14);

    const numBumps = 2 + Math.floor(rng() * 1.5);
    const pressureBumps: { pos: number; amp: number; width: number }[] = [];
    for (let b = 0; b < numBumps; b++) {
      pressureBumps.push({ pos: rr(rng, 0.08, 0.92), amp: rr(rng, 0.4, 1.1), width: rr(rng, 0.08, 0.17) });
    }

    const ghostPtX = srcX + rr(rng, -0.02, 0.02);
    const ghostPtY = srcY + rr(rng, -0.02, 0.02);

    // consume rng for ghost line (keeps determinism)
    for (let i = 0; i <= 160; i++) rr(rng, -0.03, 0.03);

    const lines: ClusterParams["lines"] = [];
    for (let li = 0; li < linesPerCluster; li++) {
      const relPos = (linesPerCluster as number) === 1 ? 0 : (li / (linesPerCluster - 1)) - 0.5;
      const angle = rr(rng, 0, Math.PI * 2);
      const dist = rr(rng, 0, spread);
      const ptX = srcX + Math.cos(angle) * dist;
      const ptY = srcY + Math.sin(angle) * dist;
      const phaseOff = rr(rng, -0.07, 0.07);
      const ampMul = rr(rng, 0.92, 1.08);
      const baseThickMul = 0.45 + 0.55 * (1 - Math.abs(relPos) * 1.3);
      const randomThick = rr(rng, 1 - strokeVar, 1 + strokeVar);
      const strokeMul = baseThickMul * randomThick;
      const opacityMul = clamp(0.6 + 0.4 * (1 - Math.abs(relPos) * 1.1), 0.45, 1);
      const lineLag = li * phaseLagPerLine;
      const shortenFactor = 1 - Math.abs(relPos) * 0.1;
      const lineStart = (1 - shortenFactor) * 0.5;
      const lineEnd = 1 - (1 - shortenFactor) * 0.5;
      lines.push({ ptX, ptY, phaseOff, ampMul, strokeMul, opacityMul, lineLag, lineStart, lineEnd });
    }

    clusters.push({
      srcX, srcY, spread, rhoScale, rhoOffset,
      thetaStart, thetaEnd,
      cosTilt: Math.cos(tiltAngle), sinTilt: Math.sin(tiltAngle),
      driftAmp, driftFreq, driftPhase,
      h2amp, h3amp, h2phase, h3phase,
      animSpeed1, animAmpMod, animDriftSpeed, phaseLagPerLine,
      pressureBumps, ghostPtX, ghostPtY, lines,
    });
  }
  return clusters;
}

// Extend curves 20% beyond viewport on each side so convergence points are off-screen
const X_PAD = 0.20;
const X_START = -X_PAD;
const X_SPAN = 1 + X_PAD * 2;

/** Draw the full scene to a canvas context for the given time. */
function drawScene(ctx: CanvasRenderingContext2D, clusters: ClusterParams[], time: number, color: string, isDark: boolean) {
  const cw = ctx.canvas.width;
  const ch = ctx.canvas.height;
  ctx.clearRect(0, 0, cw, ch);

  const scaleX = cw / W;
  const scaleY = ch / H;
  const steps = 160;
  const baseStroke = 1.4;
  const baseOpacity = isDark ? 0.4 : 0.14;

  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  for (let ci = 0; ci < clusters.length; ci++) {
    const cl = clusters[ci];
    const cIdx = ci;

    // Ghost line
    {
      const animPhase = time * cl.animSpeed1;
      const animAmp = 1 + Math.sin(time * 0.13 + cIdx * 1.9) * cl.animAmpMod;
      const animDrift = time * cl.animDriftSpeed;
      const points: Point[] = [];
      for (let i = 0; i <= steps; i++) {
        const rawT = i / steps;
        const theta = cl.thetaStart + (cl.thetaEnd - cl.thetaStart) * rawT;
        const thetaAnim = theta + animPhase;
        const rho = (cl.ghostPtX * Math.cos(thetaAnim) + cl.ghostPtY * Math.sin(thetaAnim) +
          cl.h2amp * Math.sin(2 * thetaAnim + cl.h2phase)) * animAmp;
        const rawX = W * (X_START + X_SPAN * rawT);
        const rawY = H * 0.5 + rho * cl.rhoScale + cl.rhoOffset +
          cl.driftAmp * Math.sin(rawT * Math.PI * cl.driftFreq + cl.driftPhase + animDrift);
        const dx = rawX - W * 0.5, dy = rawY - H * 0.5;
        points.push({
          x: (W * 0.5 + dx * cl.cosTilt - dy * cl.sinTilt) * scaleX,
          y: (H * 0.5 + dx * cl.sinTilt + dy * cl.cosTilt) * scaleY,
        });
      }
      smooth(points, 2);
      ctx.globalAlpha = baseOpacity * 0.12;
      ctx.strokeStyle = color;
      ctx.lineWidth = baseStroke * 3.5 * Math.max(scaleX, scaleY);
      drawCurve(ctx, points, 8);
    }

    // Main lines
    for (const line of cl.lines) {
      const animPhase = (time - line.lineLag) * cl.animSpeed1;
      const animAmp = 1 + Math.sin((time - line.lineLag) * 0.13 + cIdx * 1.9) * cl.animAmpMod;
      const animDrift = time * cl.animDriftSpeed;

      const points: Point[] = [];
      const widths: number[] = [];
      for (let i = 0; i <= steps; i++) {
        const rawT = i / steps;
        const mappedT = line.lineStart + (line.lineEnd - line.lineStart) * rawT;
        const theta = cl.thetaStart + (cl.thetaEnd - cl.thetaStart) * mappedT;
        const thetaAnim = theta + line.phaseOff + animPhase;
        const rhoBase = line.ptX * Math.cos(thetaAnim) + line.ptY * Math.sin(thetaAnim);
        const rho = (rhoBase + cl.h2amp * Math.sin(2 * thetaAnim + cl.h2phase) +
          cl.h3amp * Math.sin(3 * thetaAnim + cl.h3phase)) * line.ampMul * animAmp;
        const rawX = W * (X_START + X_SPAN * mappedT);
        const rawY = H * 0.5 + rho * cl.rhoScale + cl.rhoOffset +
          cl.driftAmp * Math.sin(mappedT * Math.PI * cl.driftFreq + cl.driftPhase + animDrift);
        const dx = rawX - W * 0.5, dy = rawY - H * 0.5;
        points.push({
          x: (W * 0.5 + dx * cl.cosTilt - dy * cl.sinTilt) * scaleX,
          y: (H * 0.5 + dx * cl.sinTilt + dy * cl.cosTilt) * scaleY,
        });
        const endTaper = Math.pow(Math.sin(clamp(rawT, 0.005, 0.995) * Math.PI), 0.3);
        let pressure = 0.4;
        for (const bump of cl.pressureBumps) {
          const d = (rawT - bump.pos) / bump.width;
          pressure += bump.amp * Math.exp(-0.5 * d * d);
        }
        widths.push(Math.max(0.12, pressure * endTaper));
      }
      smooth(points, 2);

      const avgW = widths.reduce((a, b) => a + b, 0) / widths.length;
      ctx.globalAlpha = baseOpacity * line.opacityMul;
      ctx.strokeStyle = color;
      ctx.lineWidth = avgW * baseStroke * line.strokeMul * Math.max(scaleX, scaleY);
      drawCurve(ctx, points, 3);
    }
  }

  ctx.globalAlpha = 1;
}

function drawCurve(ctx: CanvasRenderingContext2D, points: Point[], skip: number) {
  const sub: Point[] = [];
  for (let i = 0; i < points.length; i += skip) sub.push(points[i]);
  if (sub[sub.length - 1] !== points[points.length - 1]) sub.push(points[points.length - 1]);
  if (sub.length < 2) return;

  ctx.beginPath();
  ctx.moveTo(sub[0].x, sub[0].y);
  for (let j = 1; j < sub.length - 1; j++) {
    const cc = sub[j], n = sub[j + 1];
    ctx.quadraticCurveTo(cc.x, cc.y, (cc.x + n.x) / 2, (cc.y + n.y) / 2);
  }
  ctx.lineTo(sub[sub.length - 1].x, sub[sub.length - 1].y);
  ctx.stroke();
}

const HoughBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [seed] = useState(() => Math.floor(Math.random() * 10000));
  const clustersRef = useRef<ClusterParams[]>();
  const timeRef = useRef(0);
  const lastScrollRef = useRef(0);

  // Pre-compute cluster params once
  if (!clustersRef.current) {
    clustersRef.current = buildClusterParams(seed);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const clusters = clustersRef.current!;

    // Size canvas to viewport
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      // Get stroke color from CSS
      const isDark = document.documentElement.classList.contains("dark");
      const color = getComputedStyle(document.body).getPropertyValue("color").trim() || (isDark ? "#e0dad1" : "#1a1a1a");
      drawScene(ctx, clusters, timeRef.current, color, isDark);
    };
    resize();

    let rafId = 0;
    lastScrollRef.current = window.scrollY;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const newScrollY = window.scrollY;
        const delta = newScrollY - lastScrollRef.current;
        lastScrollRef.current = newScrollY;
        timeRef.current += delta * 0.002;
        const isDark = document.documentElement.classList.contains("dark");
        const color = getComputedStyle(document.body).getPropertyValue("color").trim() || (isDark ? "#e0dad1" : "#1a1a1a");
        drawScene(ctx, clusters, timeRef.current, color, isDark);
      });
    };

    // Observe theme changes to update stroke color
    const themeObserver = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      const color = getComputedStyle(document.body).getPropertyValue("color").trim() || (isDark ? "#e0dad1" : "#1a1a1a");
      drawScene(ctx, clusters, timeRef.current, color, isDark);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      themeObserver.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 0,
        filter: "blur(1.5px)",
      }}
    />
  );
};

export default HoughBackground;
