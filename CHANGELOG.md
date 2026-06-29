# Changelog


## 1.3.1

[compare changes](https://github.com/kinde-oss/webhook/compare/1.3.0...1.3.1)

### 🩹 Fixes

- **build:** Ship type declarations in the published package ([3c9d36f](https://github.com/kinde-oss/webhook/commit/3c9d36f))

### 🏡 Chore

- **deps:** Update pnpm to v11.9.0 ([15db0c8](https://github.com/kinde-oss/webhook/commit/15db0c8))
- **deps:** Update dependency vite to v8.1.0 ([ff59ebb](https://github.com/kinde-oss/webhook/commit/ff59ebb))
- **deps:** Update dependency vite-plugin-dts to v5.0.3 ([baa5818](https://github.com/kinde-oss/webhook/commit/baa5818))
- **deps:** Update vitest monorepo to v4.1.9 ([5e210f6](https://github.com/kinde-oss/webhook/commit/5e210f6))
- **deps:** Update dependency @types/node to v24.13.2 ([4b2179a](https://github.com/kinde-oss/webhook/commit/4b2179a))
- **deps:** Update codecov/codecov-action action to v7 ([ceedd45](https://github.com/kinde-oss/webhook/commit/ceedd45))
- **deps:** Update actions/cache action to v6 ([8ab63c3](https://github.com/kinde-oss/webhook/commit/8ab63c3))
- **deps:** Update actions/checkout action to v7 ([a58c7c5](https://github.com/kinde-oss/webhook/commit/a58c7c5))

### ✅ Tests

- **dist:** Add smoke tests for the published package artefacts ([51690d5](https://github.com/kinde-oss/webhook/commit/51690d5))
- **dist:** Make the dist smoke suite Windows-portable ([4c83f3f](https://github.com/kinde-oss/webhook/commit/4c83f3f))

### 🤖 CI

- Run the dist smoke suite to guard declaration packaging ([0537a9e](https://github.com/kinde-oss/webhook/commit/0537a9e))

### ❤️ Contributors

- Shaun McGrath ([@dipdapdop](https://github.com/dipdapdop))
- Koosha Owji <koosha.owji@gmail.com>
- renovate[bot] ([@renovate](https://github.com/apps/renovate))

## 1.3.0

[compare changes](https://github.com/kinde-oss/webhook/compare/1.2.0...1.3.0)

### 🩹 Fixes

- **deps:** Update dependency @kinde/jwt-decoder to ^0.2.0 ([e93673a](https://github.com/kinde-oss/webhook/commit/e93673a))
- **deps:** Update dependency @kinde/jwt-validator to v0.4.1 ([87345b0](https://github.com/kinde-oss/webhook/commit/87345b0))
- **ci:** Avoid pnpm version conflict in action-setup v6 ([61505a1](https://github.com/kinde-oss/webhook/commit/61505a1))
- Handle jwt validation fetch errors in decodeWebhook ([8edfaf8](https://github.com/kinde-oss/webhook/commit/8edfaf8))
- **build:** Use valid Vite 8 build target ([4983289](https://github.com/kinde-oss/webhook/commit/4983289))

### 🏡 Chore

- Add renovate configuration ([8ec59a8](https://github.com/kinde-oss/webhook/commit/8ec59a8))
- Upgrade from node 20 to 22 in CI ([85c081a](https://github.com/kinde-oss/webhook/commit/85c081a))
- Move pnpm pre-post-scripts config to workspace ([0e79bb4](https://github.com/kinde-oss/webhook/commit/0e79bb4))
- Update module resolution from Node to Bundler ([675176c](https://github.com/kinde-oss/webhook/commit/675176c))

### ❤️ Contributors

- Koosha Owji <koosha.owji@gmail.com>

## 1.2.0

[compare changes](https://github.com/kinde-oss/webhook/compare/1.1.0...1.2.0)

### 🚀 Enhancements

- Add ip_address to user authenticated and user authentication failed payloads ([353da29](https://github.com/kinde-oss/webhook/commit/353da29))

### 🏡 Chore

- Update CODEOWNERS for dependency files ([83cf85c](https://github.com/kinde-oss/webhook/commit/83cf85c))

### ❤️ Contributors

- Daniel Rivers <daniel@kinde.com>
- Andre Selton <andre@kinde.com>

## ...main


### 🚀 Enhancements

- Add decodeWebhook method ([39308a3](https://github.com/kinde-oss/webhook/commit/39308a3))
- Export types and add tests ([a54a81e](https://github.com/kinde-oss/webhook/commit/a54a81e))

### 🩹 Fixes

- Update UserEvent.roles type to match webhook structure ([99be4f8](https://github.com/kinde-oss/webhook/commit/99be4f8))

### 🏡 Chore

- Release v1.0.0 ([0bdd6f2](https://github.com/kinde-oss/webhook/commit/0bdd6f2))
- Prettier ignore readme ([b4226cb](https://github.com/kinde-oss/webhook/commit/b4226cb))
- Exclude not build ts files from build ([ecf5c55](https://github.com/kinde-oss/webhook/commit/ecf5c55))

### ❤️ Contributors

- Daniel Rivers ([@DanielRivers](https://github.com/DanielRivers))
- Abdelrahman Zaki <me@abdelrahmanzaki.com>

## ...main


### 🚀 Enhancements

- Add decodeWebhook method ([39308a3](https://github.com/kinde-oss/webhook/commit/39308a3))

### ❤️ Contributors

- Daniel Rivers ([@DanielRivers](http://github.com/DanielRivers))

