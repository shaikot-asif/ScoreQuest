import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "dotenv";

config();

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [], // Leave this empty unless explicitly required
    },
    outDir: "dist",
  },
  define: {
    "process.env": Object.entries(process.env).reduce((env, [key, value]) => {
      env[key] = JSON.stringify(value);
      return env;
    }, {}),
  },
});
