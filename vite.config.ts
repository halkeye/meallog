import { defineConfig } from "vite";

export default defineConfig({
  server: {
    cors: {
      // the origin you will be accessing via browser
      origin: "http://my-backend.example.com",
    },
  },
  build: {
    // generate .vite/manifest.json in outDir
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: "src/client/main.ts",
    },
  },
});
