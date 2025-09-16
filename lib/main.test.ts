// setToken.test.ts
import { describe, it, expect } from "vitest";
import {
  decodeWebhook,
  WebhookEventType as ExportedWebhookEventType,
  WebhookEvent as ExportedWebhookEvent,
  WebhookSource as ExportedWebhookSource,
  WebhookBase as ExportedWebhookBase,
  UserCreatedWebhookEvent as ExportedUserCreatedWebhookEvent,
  UserUpdatedWebhookEvent as ExportedUserUpdatedWebhookEvent,
  UserDeletedWebhookEvent as ExportedUserDeletedWebhookEvent,
  UserAuthenticatedWebhookEvent as ExportedUserAuthenticatedWebhookEvent,
  UserAuthenticationFailedWebhookEvent as ExportedUserAuthenticationFailedWebhookEvent,
  AccessRequestCreatedWebhookEvent as ExportedAccessRequestCreatedWebhookEvent,
  OrganizationCreatedWebhookEvent as ExportedOrganizationCreatedWebhookEvent,
  OrganizationUpdatedWebhookEvent as ExportedOrganizationUpdatedWebhookEvent,
  OrganizationDeletedWebhookEvent as ExportedOrganizationDeletedWebhookEvent,
  PermissionCreatedWebhookEvent as ExportedPermissionCreatedWebhookEvent,
  PermissionUpdatedWebhookEvent as ExportedPermissionUpdatedWebhookEvent,
  PermissionDeletedWebhookEvent as ExportedPermissionDeletedWebhookEvent,
  RoleCreatedWebhookEvent as ExportedRoleCreatedWebhookEvent,
  RoleUpdatedWebhookEvent as ExportedRoleUpdatedWebhookEvent,
  RoleDeletedWebhookEvent as ExportedRoleDeletedWebhookEvent,
  SubscriberCreatedWebhookEvent as ExportedSubscriberCreatedWebhookEvent,
} from "./main";
import {
  UserUpdatedWebhookEvent,
  WebhookEventType,
  WebhookEvent,
  WebhookSource,
  WebhookBase,
  UserCreatedWebhookEvent,
  UserDeletedWebhookEvent,
  UserAuthenticatedWebhookEvent,
  UserAuthenticationFailedWebhookEvent,
  AccessRequestCreatedWebhookEvent,
  OrganizationCreatedWebhookEvent,
  OrganizationUpdatedWebhookEvent,
  OrganizationDeletedWebhookEvent,
  PermissionCreatedWebhookEvent,
  PermissionUpdatedWebhookEvent,
  PermissionDeletedWebhookEvent,
  RoleCreatedWebhookEvent,
  RoleUpdatedWebhookEvent,
  RoleDeletedWebhookEvent,
  SubscriberCreatedWebhookEvent,
} from "./types";

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

describe("Export types", () => {
  it("should export WebhookEventType enum", () => {
    expect(ExportedWebhookEventType).toEqual(WebhookEventType);
    expect(ExportedWebhookEventType.userCreated).toBe("user.created");
    expect(ExportedWebhookEventType.organizationUpdated).toBe(
      "organization.updated",
    );
  });

  it("should export all webhook event types", () => {
    // Test that all webhook event types are properly exported
    expect(typeof ExportedWebhookEvent).toBe("undefined"); // Type-only export
    expect(typeof ExportedWebhookSource).toBe("undefined"); // Type-only export
    expect(typeof ExportedWebhookBase).toBe("undefined"); // Type-only export
    expect(typeof ExportedUserCreatedWebhookEvent).toBe("undefined"); // Type-only export
    expect(typeof ExportedUserUpdatedWebhookEvent).toBe("undefined"); // Type-only export
    expect(typeof ExportedUserDeletedWebhookEvent).toBe("undefined"); // Type-only export
    expect(typeof ExportedUserAuthenticatedWebhookEvent).toBe("undefined"); // Type-only export
    expect(typeof ExportedUserAuthenticationFailedWebhookEvent).toBe(
      "undefined",
    ); // Type-only export
    expect(typeof ExportedAccessRequestCreatedWebhookEvent).toBe("undefined"); // Type-only export
    expect(typeof ExportedOrganizationCreatedWebhookEvent).toBe("undefined"); // Type-only export
    expect(typeof ExportedOrganizationUpdatedWebhookEvent).toBe("undefined"); // Type-only export
    expect(typeof ExportedOrganizationDeletedWebhookEvent).toBe("undefined"); // Type-only export
    expect(typeof ExportedPermissionCreatedWebhookEvent).toBe("undefined"); // Type-only export
    expect(typeof ExportedPermissionUpdatedWebhookEvent).toBe("undefined"); // Type-only export
    expect(typeof ExportedPermissionDeletedWebhookEvent).toBe("undefined"); // Type-only export
    expect(typeof ExportedRoleCreatedWebhookEvent).toBe("undefined"); // Type-only export
    expect(typeof ExportedRoleUpdatedWebhookEvent).toBe("undefined"); // Type-only export
    expect(typeof ExportedRoleDeletedWebhookEvent).toBe("undefined"); // Type-only export
    expect(typeof ExportedSubscriberCreatedWebhookEvent).toBe("undefined"); // Type-only export
  });

  it("should export decodeWebhook function", () => {
    expect(typeof decodeWebhook).toBe("function");
  });

  it("should have all WebhookEventType enum values", () => {
    const expectedValues = [
      "organization.created",
      "organization.updated",
      "user.created",
      "user.updated",
      "user.deleted",
      "user.authentication_failed",
      "user.authenticated",
      "organization.deleted",
      "role.created",
      "role.updated",
      "role.deleted",
      "permission.created",
      "permission.updated",
      "permission.deleted",
      "subscriber.created",
      "access_request.created",
    ];

    const actualValues = Object.values(ExportedWebhookEventType);
    expect(actualValues).toEqual(expect.arrayContaining(expectedValues));
    expect(actualValues.length).toBe(expectedValues.length);
  });

  it("should allow type checking for webhook events", () => {
    // This test ensures TypeScript can properly type-check the exported types
    const mockUserCreatedEvent: ExportedUserCreatedWebhookEvent = {
      event_id: "test-event-id",
      source: "admin" as ExportedWebhookSource,
      timestamp: "2024-01-01T00:00:00Z",
      type: ExportedWebhookEventType.userCreated,
      data: {
        user: {
          email: "test@example.com",
          first_name: "Test",
          id: "test-id",
          is_password_reset_requested: false,
          is_suspended: false,
          last_name: "User",
          organizations: [],
          phone: null,
          username: "testuser",
        },
      },
    };

    expect(mockUserCreatedEvent.type).toBe(
      ExportedWebhookEventType.userCreated,
    );
    expect(mockUserCreatedEvent.data.user.email).toBe("test@example.com");
  });
});
