import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // The default `test` script runs the source suite (lib/). The dist smoke
    // suite (test/dist-smoke.test.ts) requires a prior build and is run
    // separately via the `test:dist` script, so it is excluded here.
    exclude: ["**/node_modules/**", "**/dist/**", "test/**"],
  },
});
