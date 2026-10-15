import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

/** Vite plugin: auto-generate feeds and pre-render HTML from src/data.ts at build time */
function generateBuildAssets(): Plugin {
  return {
    name: "generate-build-assets",
    // Regenerate llms.txt into public/ before the build copies public/ → dist/,
    // so the committed file can never drift from src/data.ts (single source of truth).
    // Also runs on dev-server start, keeping /llms.txt fresh in development.
    async buildStart() {
      const data = await import("./src/data.ts");
      fs.writeFileSync(
        path.resolve(__dirname, "public/llms.txt"),
        data.generateLlmsTxt(),
        "utf-8",
      );
      fs.writeFileSync(
        path.resolve(__dirname, "public/rss.xml"),
        data.generateRssXml(),
        "utf-8",
      );
      console.log("✓ Generated public/llms.txt and public/rss.xml");
    },
    // After the bundle is written, inject pre-rendered HTML for crawlers/no-JS.
    async writeBundle() {
      const data = await import("./src/data.ts");
      const htmlPath = path.resolve(__dirname, "dist/index.html");
      let html = fs.readFileSync(htmlPath, "utf-8");
      const prerendered = data.generatePrerenderedHtml();
      html = html.replace(
        '<div id="root"></div>',
        `<div id="root">${prerendered}</div>`,
      );
      fs.writeFileSync(htmlPath, html, "utf-8");
      console.log("✓ Injected pre-rendered HTML");
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8090,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), generateBuildAssets()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
