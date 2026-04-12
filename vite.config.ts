import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

/** Vite plugin: auto-generate public/llms.txt from src/data.ts at build time */
function generateLlmsTxt(): Plugin {
  return {
    name: "generate-llms-txt",
    async writeBundle() {
      // Dynamic import so it works with TS via Vite's pipeline
      const data = await import("./src/data.ts");
      const txt = data.generateLlmsTxt();
      const outPath = path.resolve(__dirname, "dist/llms.txt");
      fs.writeFileSync(outPath, txt, "utf-8");
      console.log("✓ Generated llms.txt");
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
    generateLlmsTxt(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
