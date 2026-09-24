import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // GitHub Pages serves a project site from /<repo>/, not from the root, so
  // every asset URL has to be prefixed. Anywhere else this stays "/".
  base: process.env.BASE_PATH || "/",
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: { api: "modern-compiler" },
    },
  },
  server: {
    // Headless machine, viewed from a phone over Tailscale. A loopback-only
    // bind is reachable from nowhere.
    host: "0.0.0.0",
    port: 5177,
  },
});
