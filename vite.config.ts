import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
   // 1. Set the output directory to 'docs'
  build: {
    outDir: 'docs',
    emptyOutDir: true, // Empties the docs folder before building
  },
});