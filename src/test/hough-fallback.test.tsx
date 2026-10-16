import { act } from "react";
import { cleanup, render } from "@testing-library/react";
import HoughBackground from "../components/HoughBackground";
import { drawScene } from "../components/houghScene";

vi.mock("../components/houghScene", () => ({
  buildClusterParams: vi.fn(() => []),
  drawScene: vi.fn(),
}));

let failure: "construct" | "post" | undefined;
let reducedMotion = false;
let transferred: HTMLCanvasElement[];
let workers: TestWorker[];
const originalTransfer = Object.getOwnPropertyDescriptor(HTMLCanvasElement.prototype, "transferControlToOffscreen");
const originalScroll = Object.getOwnPropertyDescriptor(window, "scrollY")!;

class TestWorker {
  onerror: ((event: ErrorEvent) => void) | null = null;
  onmessageerror: (() => void) | null = null;
  terminate = vi.fn();
  postMessage = vi.fn(() => {
    if (failure === "post") throw new DOMException("Canvas transfer failed", "DataCloneError");
  });
  constructor() {
    if (failure === "construct") throw new DOMException("Worker unavailable", "SecurityError");
    workers.push(this);
  }
}

beforeEach(() => {
  vi.useFakeTimers();
  failure = undefined;
  reducedMotion = false;
  transferred = [];
  workers = [];
  vi.mocked(drawScene).mockClear();
  vi.stubGlobal("Worker", TestWorker);
  Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
  Object.defineProperty(HTMLCanvasElement.prototype, "transferControlToOffscreen", {
    configurable: true,
    value: function (this: HTMLCanvasElement) {
      transferred.push(this);
      return {};
    },
  });
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(function (this: HTMLCanvasElement) {
    if (transferred.includes(this)) throw new DOMException("Canvas already transferred", "InvalidStateError");
    return { canvas: this } as CanvasRenderingContext2D;
  });
  vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
    media: query, matches: reducedMotion, onchange: null,
    addEventListener: vi.fn(), removeEventListener: vi.fn(),
    addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: vi.fn(),
  }));
  vi.spyOn(document, "hidden", "get").mockReturnValue(false);
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.useRealTimers();
  if (originalTransfer) Object.defineProperty(HTMLCanvasElement.prototype, "transferControlToOffscreen", originalTransfer);
  else delete HTMLCanvasElement.prototype.transferControlToOffscreen;
  Object.defineProperty(window, "scrollY", originalScroll);
});

const scroll = () => {
  act(() => {
    Object.defineProperty(window, "scrollY", { configurable: true, value: 120 });
    window.dispatchEvent(new Event("scroll"));
    vi.advanceTimersByTime(80);
  });
};

it.each(["construct", "post"] as const)("keeps the background animated when worker %s fails", (mode) => {
  failure = mode;
  const { container } = render(<HoughBackground />);
  const canvas = container.querySelector("canvas")!;
  expect(transferred).not.toContain(canvas);
  expect(drawScene).toHaveBeenCalledTimes(1);
  scroll();
  const frames = vi.mocked(drawScene).mock.calls;
  expect(frames.length).toBeGreaterThan(1);
  expect(frames[frames.length - 1][2]).toBeGreaterThan(0);
  expect(workers).toHaveLength(mode === "post" ? 1 : 0);
});

it.each([false, true])("recovers from a later worker error with reduced motion=%s", (reduce) => {
  reducedMotion = reduce;
  const { container } = render(<HoughBackground />);
  const originalCanvas = container.querySelector("canvas");
  const worker = workers[0];
  expect(drawScene).not.toHaveBeenCalled();
  const error = new ErrorEvent("error", { cancelable: true });
  act(() => worker.onerror!(error));

  expect(error.defaultPrevented).toBe(true);
  expect(worker.terminate).toHaveBeenCalled();
  expect(container.querySelector("canvas")).not.toBe(originalCanvas);
  expect(drawScene).toHaveBeenCalledTimes(1);
  scroll();
  if (reduce) expect(drawScene).toHaveBeenCalledTimes(1);
  else expect(vi.mocked(drawScene).mock.calls.length).toBeGreaterThan(1);
  expect(workers).toHaveLength(1);
});

it("keeps healthy drawing in the worker and terminates it when unmounted", () => {
  const { unmount } = render(<HoughBackground />);
  scroll();
  expect(workers[0].postMessage).toHaveBeenLastCalledWith({ type: "scroll", delta: 120 });
  expect(drawScene).not.toHaveBeenCalled();
  unmount();
  expect(workers[0].terminate).toHaveBeenCalled();
  expect(workers[0].onerror).toBeNull();
});
