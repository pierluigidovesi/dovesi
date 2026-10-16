import { act } from "react";
import { render, cleanup } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { hydrateRoot, type Root } from "react-dom/client";
import NewsArchive from "../components/NewsArchive";
import { news, generateRssXml } from "../data";

const archivedId = news[news.length - 1].id;
const scrollIntoView = vi.fn();

beforeEach(() => {
  vi.useFakeTimers();
  Element.prototype.scrollIntoView = scrollIntoView;
  scrollIntoView.mockClear();
  window.history.replaceState(null, "", "/");
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  window.history.replaceState(null, "", "/");
});

it("hydrates an archived direct link, reveals its original row, and retains it in RSS", async () => {
  window.history.replaceState(null, "", `/#${archivedId}`);
  const container = document.createElement("div");
  container.innerHTML = renderToString(<NewsArchive />);
  document.body.append(container);
  const originalRow = container.querySelector(`#${archivedId}`);
  const archive = container.querySelector("details")!;
  expect(archive.open).toBe(false);
  const errors: unknown[] = [];
  let root: Root;
  await act(async () => {
    root = hydrateRoot(container, <NewsArchive />, { onRecoverableError: (error) => errors.push(error) });
  });
  await act(async () => vi.advanceTimersByTime(20));

  expect(errors).toEqual([]);
  expect(archive.open).toBe(true);
  expect(container.querySelector(`#${archivedId}`)).toBe(originalRow);
  expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "instant", block: "start" });
  expect(generateRssXml()).toContain(`https://dovesi.dev/#${archivedId}`);

  await act(async () => root.unmount());
  container.remove();
});

it("reopens the archive when navigating to an older update within the page", async () => {
  const { container } = render(<NewsArchive />);
  const archive = container.querySelector("details")!;
  expect(archive.open).toBe(false);
  window.history.replaceState(null, "", `/#${archivedId}`);
  await act(async () => {
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    vi.advanceTimersByTime(20);
  });
  expect(archive.open).toBe(true);
  expect(scrollIntoView).toHaveBeenCalledTimes(1);

  archive.open = false;
  window.history.replaceState(null, "", "/#%invalid");
  window.dispatchEvent(new HashChangeEvent("hashchange"));
  expect(archive.open).toBe(false);
});

it.each([false, true])("prints the full archive and restores open=%s afterwards", (open) => {
  const { container } = render(<NewsArchive />);
  const archive = container.querySelector("details")!;
  archive.open = open;
  window.dispatchEvent(new Event("beforeprint"));
  window.dispatchEvent(new Event("beforeprint"));
  expect(archive.open).toBe(true);
  expect(container.querySelectorAll(".news-item")).toHaveLength(news.length);
  window.dispatchEvent(new Event("afterprint"));
  expect(archive.open).toBe(open);
});
