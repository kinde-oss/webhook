import {
  WebhookEvent,
  WebhookEventType,
  WebhookSource,
  WebhookBase,
  UserCreatedWebhookEvent,
  UserUpdatedWebhookEvent,
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
import { jwtDecoder } from "@kinde/jwt-decoder";
import { validateToken } from "@kinde/jwt-validator";

/**
 * Decode a webhook events
 * @param token - The token to decode
 * @param domain - The domain to validate the token against
 * @returns The decoded webhook event or null if invalid token
 */
export const decodeWebhook = async <T = WebhookEvent>(
  token?: string,
  domain?: string,
): Promise<T | null> => {
  const tokenValid = await validateToken({ token, domain });
  if (!tokenValid.valid) {
    return null;
  }

  return jwtDecoder<T>(token);
};

// Export enum as value
export { WebhookEventType };

// Export types
export type {
  WebhookEvent,
  WebhookSource,
  WebhookBase,
  UserCreatedWebhookEvent,
  UserUpdatedWebhookEvent,
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
};
