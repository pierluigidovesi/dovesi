import { useState, useEffect, useMemo, useRef } from "react";

const W = 1200, H = 700;

function makeRng(seed: number) {
  let s = Math.floor(Math.abs(seed)) || 1;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}
const rr = (rng: () => number, a: number, b: number) => a + (b - a) * rng();
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

interface Point { x: number; y: number; }
interface Curve { points: Point[]; widths: number[]; opacityMul: number; isGhost: boolean; strokeMul: number; }
interface PathData { d: string; width: number; opacity: number; }

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

function generateScene(seed: number, time: number, params: { clusters: number; linesPerCluster: number; spreadAmt: number; strokeVar: number }) {
  const { clusters: numClusters, linesPerCluster, spreadAmt, strokeVar } = params;
  const rng = makeRng(seed);
  const allCurves: Curve[] = [];

  for (let c = 0; c < numClusters; c++) {
    const srcX = rr(rng, -2.2, 2.2);
    const srcY = rr(rng, -2.2, 2.2);
    const spread = rr(rng, spreadAmt * 1.2, spreadAmt * 3.5);
    const rhoScale = rr(rng, 110, 220);
    const rhoOffset = rr(rng, -120, 120);
    const thetaStart = rr(rng, 0.1, 1.2);
    const thetaEnd = rr(rng, 4.8, 7.2);
    const tiltAngle = rr(rng, -0.7, 0.7);
    const cosTilt = Math.cos(tiltAngle);
    const sinTilt = Math.sin(tiltAngle);
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

    // Ghost depth layer
    const ghostPtX = srcX + rr(rng, -0.02, 0.02);
    const ghostPtY = srcY + rr(rng, -0.02, 0.02);
    {
      const animPhase = time * animSpeed1;
      const animAmp = 1 + Math.sin(time * 0.13 + c * 1.9) * animAmpMod;
      const animDrift = time * animDriftSpeed;
      const steps = 380;
      const points: Point[] = [];
      const widths: number[] = [];
      for (let i = 0; i <= steps; i++) {
        const rawT = i / steps;
        const theta = thetaStart + (thetaEnd - thetaStart) * rawT;
        const thetaAnim = theta + rr(rng, -0.03, 0.03) + animPhase;
        const rho = (ghostPtX * Math.cos(thetaAnim) + ghostPtY * Math.sin(thetaAnim) +
          h2amp * Math.sin(2 * thetaAnim + h2phase)) * animAmp;
        const rawX = W * 0.05 + W * 0.90 * rawT;
        const rawY = H * 0.5 + rho * rhoScale + rhoOffset +
          driftAmp * Math.sin(rawT * Math.PI * driftFreq + driftPhase + animDrift);
        const dx = rawX - W * 0.5, dy = rawY - H * 0.5;
        points.push({ x: W * 0.5 + dx * cosTilt - dy * sinTilt, y: H * 0.5 + dx * sinTilt + dy * cosTilt });
        widths.push(Math.max(0.3, 1.2 * Math.pow(Math.sin(clamp(rawT, 0.006, 0.994) * Math.PI), 0.25)));
      }
      smooth(points, 2);
      allCurves.push({ points, widths, opacityMul: 0.12, isGhost: true, strokeMul: 1 });
    }

    // Main lines
    for (let li = 0; li < linesPerCluster; li++) {
      const relPos = linesPerCluster === 1 ? 0 : (li / (linesPerCluster - 1)) - 0.5;
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
      const animPhase = (time - lineLag) * animSpeed1;
      const animAmp = 1 + Math.sin((time - lineLag) * 0.13 + c * 1.9) * animAmpMod;
      const animDrift = time * animDriftSpeed;
      const shortenFactor = 1 - Math.abs(relPos) * 0.1;
      const lineStart = (1 - shortenFactor) * 0.5;
      const lineEnd = 1 - (1 - shortenFactor) * 0.5;

      const steps = 380;
      const points: Point[] = [];
      const widths: number[] = [];
      for (let i = 0; i <= steps; i++) {
        const rawT = i / steps;
        const mappedT = lineStart + (lineEnd - lineStart) * rawT;
        const theta = thetaStart + (thetaEnd - thetaStart) * mappedT;
        const thetaAnim = theta + phaseOff + animPhase;
        const rhoBase = ptX * Math.cos(thetaAnim) + ptY * Math.sin(thetaAnim);
        const rho = (rhoBase + h2amp * Math.sin(2 * thetaAnim + h2phase) +
          h3amp * Math.sin(3 * thetaAnim + h3phase)) * ampMul * animAmp;
        const rawX = W * 0.05 + W * 0.90 * mappedT;
        const rawY = H * 0.5 + rho * rhoScale + rhoOffset +
          driftAmp * Math.sin(mappedT * Math.PI * driftFreq + driftPhase + animDrift);
        const dx = rawX - W * 0.5, dy = rawY - H * 0.5;
        points.push({ x: W * 0.5 + dx * cosTilt - dy * sinTilt, y: H * 0.5 + dx * sinTilt + dy * cosTilt });
        const endTaper = Math.pow(Math.sin(clamp(rawT, 0.005, 0.995) * Math.PI), 0.3);
        let pressure = 0.4;
        for (const bump of pressureBumps) {
          const d = (rawT - bump.pos) / bump.width;
          pressure += bump.amp * Math.exp(-0.5 * d * d);
        }
        widths.push(Math.max(0.12, pressure * endTaper));
      }
      smooth(points, 2);
      allCurves.push({ points, widths, opacityMul, isGhost: false, strokeMul });
    }
  }
  return allCurves;
}

function curveToPath(curve: Curve, baseStroke: number): PathData[] {
  const { points, widths, opacityMul, isGhost, strokeMul } = curve;
  if (points.length < 3) return [];
  const skip = isGhost ? 5 : 3;
  const sub: Point[] = [];
  for (let i = 0; i < points.length; i += skip) sub.push(points[i]);
  if (sub[sub.length - 1] !== points[points.length - 1]) sub.push(points[points.length - 1]);
  if (sub.length < 2) return [];
  let d = `M ${sub[0].x.toFixed(1)} ${sub[0].y.toFixed(1)}`;
  for (let j = 1; j < sub.length - 1; j++) {
    const cc = sub[j], n = sub[j + 1];
    d += ` Q ${cc.x.toFixed(1)} ${cc.y.toFixed(1)} ${((cc.x + n.x) / 2).toFixed(1)} ${((cc.y + n.y) / 2).toFixed(1)}`;
  }
  d += ` L ${sub[sub.length - 1].x.toFixed(1)} ${sub[sub.length - 1].y.toFixed(1)}`;
  const avgW = widths.reduce((a, b) => a + b, 0) / widths.length;
  return [{ d, width: avgW * baseStroke * strokeMul * (isGhost ? 3.5 : 1), opacity: opacityMul }];
}

const HoughBackground = () => {
  const [seed] = useState(() => Math.floor(Math.random() * 10000));
  const [time, setTime] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let currentTime = 0;

    const onScroll = () => {
      const newScrollY = window.scrollY;
      const delta = newScrollY - lastScrollY;
      lastScrollY = newScrollY;
      currentTime += delta * 0.002;
      
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setTime(currentTime);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const paths = useMemo(() => {
    const curves = generateScene(seed, time, {
      clusters: 2, linesPerCluster: 12, spreadAmt: 0.08, strokeVar: 0.6,
    });
    return curves.flatMap(c => curveToPath(c, 1.4));
  }, [seed, time]);

  return (
    <div
      style={{
        position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
        pointerEvents: "none", zIndex: 0,
      }}
    >
      <svg viewBox="0 0 1200 700" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g opacity="0.07" filter="url(#glow)">
          {paths.map((p, i) => (
            <path
              key={i}
              d={p.d}
              fill="none"
              stroke="currentColor"
              strokeWidth={p.width}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={p.opacity}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default HoughBackground;
