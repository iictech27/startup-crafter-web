import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ["tailwindcss"],
  },
  server: {
    proxy: {
      // "/api/v1": "https://startup-crafter-web-server.onrender.com",
      "/api/v1": "http://localhost:8000",
    },
  },
});
