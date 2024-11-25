import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "dotenv";

config();

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [], // Keep this empty unless you explicitly want to exclude dependencies
    },
    outDir: "dist", // Output directory for Vercel to serve
  },
  resolve: {
    alias: {
      // Add any necessary aliases for your project
    },
  },
  define: {
    // Use JSON.stringify to prevent Vite from replacing `process.env` entirely
    "process.env": Object.entries(process.env).reduce((env, [key, value]) => {
      env[key] = JSON.stringify(value);
      return env;
    }, {}),
  },
});
