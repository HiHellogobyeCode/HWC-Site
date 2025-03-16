import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import critical from "rollup-plugin-critical";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor';
            }
            if (id.includes('lodash') || id.includes('date-fns')) {
              return 'utils';
            }
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: "terser",
    cssCodeSplit: true,
    sourcemap: mode === 'development',
  },
  plugins: [
    react(),
    ViteImageOptimizer({
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      webp: {
        lossless: true,
      },
    }),
    critical({
      criticalUrl: "http://localhost:8080",
      criticalBase: "dist",
      criticalPages: [
        { uri: "/", template: "index" },
        { uri: "/founder", template: "founder" }
      ],
      criticalConfig: {
        inline: true,
        dimensions: [
          { width: 320, height: 568 },
          { width: 768, height: 1024 },
          { width: 1280, height: 800 }
        ],
      },
    }),
    mode === "analyze" && visualizer({ open: true }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components")
    },
  },
}));
