# Kinde Webhook

## Description

Decode and validate Kinde Webhook tokens

## Installation

```bash
# npm
npm install @kinde/webhook
# yarn
yarn add @kinde/webhook
# pnpm
pnpm add @kinde/webhook
```

## Usage

```js
import { decodeWebhook } from "@kinde/webhook";

// Not sure of the type at decode point
const decodedWebhook = decodeWebhook("eyJhbGc...");
if (decodedWebhook.type === WebhookEventType.userCreated) {
  // decodedWebhook is type safe userCreated event
}

// Know the event type at decode point
const decodedWebhook = decodeWebhook < UserCreatedWebhookEvent > "eyJhbGc...";
// decodedWebhook is type safe userCreated event
```

## Kinde documentation

[Kinde Documentation](https://kinde.com/docs/) - Explore the Kinde docs

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

## License

By contributing to Kinde, you agree that your contributions will be licensed under its MIT License.
