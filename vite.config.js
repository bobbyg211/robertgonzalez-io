import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
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
