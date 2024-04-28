// setToken.test.ts
import { describe, it, expect } from "vitest";
import { decodeWebhook } from "./main";
import { UserUpdatedWebhookEvent, WebhookEventType } from "./types";

const testWebhook =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6IjRjOmZhOjllOmQ2OjQ3OjIzOmI3OjM5OmM3OjhmOjk3OjI4OjQ1OmExOjg0OjM1IiwidHlwIjoiSldUIn0.eyJkYXRhIjp7InVzZXIiOnsiZW1haWwiOiJkYW5pZWxAa2luZGUuY29tIiwiZmlyc3RfbmFtZSI6IkRhbmllbCIsImlkIjoia3BfNjViMjhkNzFiYmExNGZhMzgwZDU2ZDJkOGQzNTAzZGEiLCJpc19wYXNzd29yZF9yZXNldF9yZXF1ZXN0ZWQiOmZhbHNlLCJpc19zdXNwZW5kZWQiOmZhbHNlLCJsYXN0X25hbWUiOiJSaXZlcnMiLCJvcmdhbml6YXRpb25zIjpbeyJjb2RlIjoib3JnXzU5MGQ3ZjFhODZhIiwicGVybWlzc2lvbnMiOm51bGwsInJvbGVzIjpudWxsfV0sInBob25lIjpudWxsLCJ1c2VybmFtZSI6ImRhbmllbCJ9fSwiZXZlbnRfaWQiOiJldmVudF8wMThmMzMxYTMxNzhmN2ZlZjI4NGI5NWZlNjc3MDM4NCIsInNvdXJjZSI6ImFkbWluIiwidGltZXN0YW1wIjoiMjAyNC0wNS0wMVQxNzo0MTo0NS41OTIxNDUrMTA6MDAiLCJ0eXBlIjoidXNlci51cGRhdGVkIn0.hAxfcxDNnzN8_U7sovti71NElh5pqVe6UEFKgVD1ZygVJUdEhmjYQOOSr6Aixj2ySs_hujZBvCRWeqG6jNPYbHRiV5kx0XaL6g3cW1DCoqpTpkxXtjf18HNYHCJmsUqMiSwfYpmVcI7kaIDfd0XwhWWH5gRdjAAMDneEwMKANklTzR_g_kIl5cVW5eVWntC4rFsSjRVvGSNb-OMsy2GJLWXUF8fc8Qru56VkJImeOE6ZOMi6wBhtx7HhOZEcEFgQjRvHeoQKdVmEE3BRUnO_LXTMMSjvP_kyfrS4JMaGWHc6mc8k1hZo_maASLSuXMF8882LZnr96cJFMHj8irRAug";
const invalidWebhook =
  "eyJhbGciOiJSUzI1sNiIsImtpZCI6IjRjOmZhOjllOmQ2OjQ3OjIzOmI3OjM5OmM3OjhmOjk3OjI4OjQ1OmExOjg0OjM1IiwidHlwIjoiSldUIn0.eyJkYXRhIjp7InVzZXIiOnsiZW1haWwiOiJkYW5pZWxAa2luZGUuY29tIiwiZmlyc3RfbmFtZSI6IkRhbmllbCIsImlkIjoia3BfNjViMjhkNzFiYmExNGZhMzgwZDU2ZDJkOGQzNTAzZGEiLCJpc19wYXNzd29yZF9yZXNldF9yZXF1ZXN0ZWQiOmZhbHNlLCJpc19zdXNwZW5kZWQiOmZhbHNlLCJsYXN0X25hbWUiOiJSaXZlcnMiLCJvcmdhbml6YXRpb25zIjpbeyJjb2RlIjoib3JnXzU5MGQ3ZjFhODZhIiwicGVybWlzc2lvbnMiOm51bGwsInJvbGVzIjpudWxsfV0sInBob25lIjpudWxsLCJ1c2VybmFtZSI6ImRhbmllbCJ9fSwiZXZlbnRfaWQiOiJldmVudF8wMThmMzMxYTMxNzhmN2ZlZjI4NGI5NWZlNjc3MDM4NCIsInNvdXJjZSI6ImFkbWluIiwidGltZXN0YW1wIjoiMjAyNC0wNS0wMVQxNzo0MTo0NS41OTIxNDUrMTA6MDAiLCJ0eXBlIjoidXNlci51cGRhdGVkIn0.hAxfcxDNnzN8_U7sovti71NElh5pqVe6UEFKgVD1ZygVJUdEhmjYQOOSr6Aixj2ySs_hujZBvCRWeqG6jNPYbHRiV5kx0XaL6g3cW1DCoqpTpkxXtjf18HNYHCJmsUqMiSwfYpmVcI7kaIDfd0XwhWWH5gRdjAAMDneEwMKANklTzR_g_kIl5cVW5eVWntC4rFsSjRVvGSNb-OMsy2GJLWXUF8fc8Qru56VkJImeOE6ZOMi6wBhtx7HhOZEcEFgQjRvHeoQKdVmEE3BRUnO_LXTMMSjvP_kyfrS4JMaGWHc6mc8k1hZo_maASLSuXMF8882LZnr96cJFMHj8irRAug";

describe("Validate token", () => {
  it("no token supplied", async () => {
    const isTokenValid = await decodeWebhook("");
    expect(isTokenValid).toEqual(null);
  });

  it("no domain supplied", async () => {
    const webhookEvent = await decodeWebhook(testWebhook);
    expect(webhookEvent).toEqual(null);
  });

  it("valid token supplied", async () => {
    const webhookEvent = await decodeWebhook(
      testWebhook,
      "https://danielkinde.kinde.com",
    );

    expect(webhookEvent?.type).toEqual(WebhookEventType.userUpdated);
  });

  it("valid token supplied and incorrect type does not resolve", async () => {
    const webhookEvent = await decodeWebhook<UserUpdatedWebhookEvent>(
      testWebhook,
      "https://danielkinde.kinde.com",
    );

    expect(webhookEvent?.type).not.equal(WebhookEventType.organizationCreated);
  });

  it("invalid token supplied", async () => {
    const webhookEvent = await decodeWebhook(
      invalidWebhook,
      "https://danielkinde.kinde.com",
    );
    expect(webhookEvent).toEqual(null);
  });

  it("invalid domain supplied", async () => {
    const webhookEvent = await decodeWebhook(
      testWebhook,
      "https://invaliddomain.kinde.com",
    );
    expect(webhookEvent).toEqual(null);
  });
});
