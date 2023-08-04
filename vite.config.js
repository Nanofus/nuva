import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { NgmiPolyfill } from "vite-plugin-ngmi-polyfill";

export default defineConfig({
  build: {
    target: "esnext",
  },
  plugins: [
    sveltekit(),
    NgmiPolyfill()
  ],
});
