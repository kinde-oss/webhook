import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      formats: ["es", "cjs"],
      name: "@kinde/webhooks",
      fileName: "webhooks",
    },
    target: "es2015",
    outDir: "dist",
    emptyOutDir: true,
  },
  base: "",
  plugins: [
    dts({
      insertTypesEntry: true,
      include: ["lib"],
      exclude: ["lib/**/*.test.ts", "lib/**/*.spec.ts"],
    }),
  ],
});
