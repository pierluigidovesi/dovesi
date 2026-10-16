import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const html = readFileSync("index.html", "utf8");
const script = html.match(/<script>([\s\S]*?)<\/script>/)![1];

function initialTheme(preference: string | null, hour: number, storageBlocked = false) {
  const toggle = vi.fn();
  const setItem = vi.fn();
  runInNewContext(script, {
    document: { documentElement: { classList: { toggle } } },
    localStorage: {
      getItem: () => { if (storageBlocked) throw new Error("Storage blocked"); return preference; },
      setItem,
    },
    Date: class extends Date { getHours() { return hour; } },
  });
  expect(setItem).not.toHaveBeenCalled();
  return toggle.mock.calls[0][1];
}

it.each([
  ["light", 23, false], ["dark", 12, true],
  [null, 12, false], [null, 23, true], [null, 5, true], [null, 6, false],
  ["invalid", 12, false],
])("resolves %s at hour %i before paint", (preference, hour, dark) => {
  expect(initialTheme(preference, hour)).toBe(dark);
});

it("uses the automatic theme when storage is unavailable", () => {
  expect(initialTheme(null, 23, true)).toBe(true);
});
