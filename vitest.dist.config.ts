import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Dist smoke suite only. Runs against the BUILT dist/ (see test/), so it
    // must be preceded by a build (the `test:dist` script does this).
    include: ["test/**/*.test.ts"],
  },
});
