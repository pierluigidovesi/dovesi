import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

/** Vite plugin: auto-generate llms.txt and pre-render HTML from src/data.ts at build time */
function generateBuildAssets(): Plugin {
  return {
    name: "generate-build-assets",
    async writeBundle() {
      // Dynamic import so it works with TS via Vite's pipeline
      const data = await import("./src/data.ts");

      // llms.txt
      const txt = data.generateLlmsTxt();
      fs.writeFileSync(path.resolve(__dirname, "dist/llms.txt"), txt, "utf-8");
      console.log("✓ Generated llms.txt");

      // Pre-rendered HTML for SEO (inject content into <div id="root">)
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
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    generateBuildAssets(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
