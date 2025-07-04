import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import removeConsole from "vite-plugin-remove-console";
import imagemin from "vite-plugin-imagemin";

export default defineConfig({
  plugins: [
    react(),
    removeConsole(),
    imagemin({
      pngquant: {
        quality: [0.6, 0.8],
      },
      webp: {
        quality: 75,
      },
    }),
  ], resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env": {},
  },
  server: {
    port: 3000,
    host: true,
  },
  preview: {
    port: 5173,
  },
  build: {
    minify: "esbuild",
    sourcemap: false,
    cssCodeSplit: true,
  },
});
