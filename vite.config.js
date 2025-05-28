import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// vite.config.js
export default defineConfig({
  plugins: [
    tailwindcss(),
    // reactRouter(),
    tsconfigPaths(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://pse-camp-attendance-be.final25.psewmad.org',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
