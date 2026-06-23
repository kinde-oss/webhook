// Smoke tests against the BUILT package in dist/ (not the lib/ source).
//
// These guard the packaging regression fixed in #39: the published tarball
// shipped no type declarations despite "types": "dist/main.d.ts", and nothing
// in the source-level suite (lib/main.test.ts imports from ./main) could catch
// it. Here we assert the real shipped artefacts:
//   1. the JS bundles named by package.json main/module exist and import, and
//      the runtime export surface (decodeWebhook, WebhookEventType) works;
//   2. the declaration files exist where package.json "types" points, and a
//      consumer importing the event types from the package root type-checks.
//
// The suite requires a prior `pnpm build`; run via the `test:dist` script,
// which builds first.

import { describe, it, expect, beforeAll } from "vitest";
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..");
const distDir = join(repoRoot, "dist");

// Read package.json so the test follows whatever entry points the package
// advertises, rather than hard-coding filenames.
const pkg = JSON.parse(
  execFileSync("node", [
    "-e",
    `process.stdout.write(require("fs").readFileSync(${JSON.stringify(
      join(repoRoot, "package.json"),
    )}, "utf8"))`,
  ]).toString(),
) as { main: string; module: string; types: string };

beforeAll(() => {
  if (!existsSync(distDir)) {
    throw new Error(
      `dist/ not found at ${distDir}. Run \`pnpm build\` first (or use \`pnpm test:dist\`).`,
    );
  }
});

describe("dist runtime (built bundle)", () => {
  it("ships the JS entry points named by package.json", () => {
    expect(existsSync(join(repoRoot, pkg.module))).toBe(true); // ESM
    expect(existsSync(join(repoRoot, pkg.main))).toBe(true); // CJS
  });

  it("imports the built ESM bundle and exposes the runtime surface", async () => {
    const mod = await import(join(repoRoot, pkg.module));
    expect(typeof mod.decodeWebhook).toBe("function");
    expect(typeof mod.WebhookEventType).toBe("object");
    expect(mod.WebhookEventType.userCreated).toBe("user.created");
  });

  it("decodeWebhook from the bundle resolves null for an empty token", async () => {
    const mod = await import(join(repoRoot, pkg.module));
    await expect(mod.decodeWebhook("")).resolves.toBeNull();
  });
});

describe("dist declarations (#39)", () => {
  it("ships the declaration file named by package.json types", () => {
    expect(pkg.types).toBeTruthy();
    expect(existsSync(join(repoRoot, pkg.types))).toBe(true);
  });

  it("a consumer importing event types from the package root type-checks", () => {
    // Spawn tsc against a throwaway consumer that imports from the built
    // declarations. This reproduces #39's exact failure mode end to end:
    // before the fix, this import errored TS2307 (no declarations shipped).
    const work = mkdtempSync(join(tmpdir(), "kinde-webhooks-dts-"));
    try {
      writeFileSync(
        join(work, "consume.ts"),
        [
          `import type {`,
          `  UserUpdatedWebhookEvent,`,
          `  OrganizationCreatedWebhookEvent,`,
          `} from "@kinde/webhooks";`,
          `const a = (x: UserUpdatedWebhookEvent) => x;`,
          `const b = (y: OrganizationCreatedWebhookEvent) => y;`,
          `void a;`,
          `void b;`,
          ``,
        ].join("\n"),
      );
      writeFileSync(
        join(work, "tsconfig.json"),
        JSON.stringify({
          compilerOptions: {
            strict: true,
            moduleResolution: "Bundler",
            module: "ESNext",
            target: "ES2022",
            noEmit: true,
            skipLibCheck: false,
            ignoreDeprecations: "6.0",
            paths: {
              "@kinde/webhooks": [join(repoRoot, pkg.types)],
            },
          },
          include: ["consume.ts"],
        }),
      );

      const tscBin = join(repoRoot, "node_modules", ".bin", "tsc");
      // Throws (non-zero exit) if the import fails to resolve / type-check.
      execFileSync(tscBin, ["-p", join(work, "tsconfig.json")], {
        stdio: "pipe",
      });
    } finally {
      rmSync(work, { recursive: true, force: true });
    }
  });
});
