import { act } from "react";
import { renderToString } from "react-dom/server";
import { hydrateRoot, type Root } from "react-dom/client";
import Index from "../pages/Index";

vi.mock("../components/HoughBackground", () => ({
  default: () => <canvas aria-hidden="true" className="hough-background" />,
}));

it.each([false, true])("hydrates the built layout in dark=%s without replacing content", async (dark) => {
  localStorage.clear();
  document.documentElement.classList.toggle("dark", dark);
  const container = document.createElement("div");
  container.innerHTML = renderToString(<Index />);
  document.body.append(container);
  const initialTree = container.firstElementChild;
  const initialNews = container.querySelector("#news-009");
  const errors: unknown[] = [];
  let root: Root;

  await act(async () => {
    root = hydrateRoot(container, <Index />, { onRecoverableError: (error) => errors.push(error) });
  });

  expect(errors).toEqual([]);
  expect(container.firstElementChild).toBe(initialTree);
  expect(container.querySelector("#news-009")).toBe(initialNews);
  expect(container.querySelectorAll(".news-item")).toHaveLength(38);
  expect(localStorage.getItem("theme")).toBeNull();
  const toggle = container.querySelector<HTMLButtonElement>(".theme-toggle")!;
  expect(toggle.getAttribute("aria-pressed")).toBe(String(dark));

  await act(async () => toggle.click());
  expect(document.documentElement.classList.contains("dark")).toBe(!dark);
  expect(localStorage.getItem("theme")).toBe(dark ? "light" : "dark");

  await act(async () => root.unmount());
  container.remove();
  document.documentElement.classList.remove("dark");
});
