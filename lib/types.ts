export enum WebhookEventType {
  organizationCreated = "organization.created",
  organizationUpdated = "organization.updated",
  userCreated = "user.created",
  userUpdated = "user.updated",
  userDeleted = "user.deleted",
  userAuthenticationFailed = "user.authentication_failed",
  userAuthenticated = "user.authenticated",
  organizationDeleted = "organization.deleted",
  roleCreated = "role.created",
  roleUpdated = "role.updated",
  roleDeleted = "role.deleted",
  permissionCreated = "permission.created",
  permissionUpdated = "permission.updated",
  permissionDeleted = "permission.deleted",
  subscriberCreated = "subscriber.created",
  accessRequestCreated = "access_request.created",
}

export type WebhookSource = "admin" | "api" | "user";

export type WebhookBase = {
  event_id: string;
  source: WebhookSource;
  timestamp: string;
};

export type WebhookEvent =
  | UserCreatedWebhookEvent
  | UserUpdatedWebhookEvent
  | UserDeletedWebhookEvent
  | UserAuthenticatedWebhookEvent
  | UserAuthenticationFailedWebhookEvent
  | AccessRequestCreatedWebhookEvent
  | OrganizationCreatedWebhookEvent
  | OrganizationUpdatedWebhookEvent
  | OrganizationDeletedWebhookEvent
  | PermissionCreatedWebhookEvent
  | PermissionUpdatedWebhookEvent
  | PermissionDeletedWebhookEvent
  | RoleCreatedWebhookEvent
  | RoleUpdatedWebhookEvent
  | RoleDeletedWebhookEvent
  | SubscriberCreatedWebhookEvent;

type UserEvent = {
  email: string;
  first_name: string;
  id: string;
  is_password_reset_requested: boolean;
  is_suspended: boolean;
  last_name: string;
  organizations: Array<{
    roles: { id: string; key: string }[] | null;
    code: string;
    permissions: Array<{
      id: string;
      key: string;
    }> | null;
  }>;
  phone: string | null;
  username: string;
};

export type UserCreatedWebhookEvent = WebhookBase & {
  data: {
    user: UserEvent;
  };
  type: WebhookEventType.userCreated;
};

export type UserUpdatedWebhookEvent = WebhookBase & {
  data: {
    user: UserEvent;
  };
  type: WebhookEventType.userUpdated;
};

export type UserDeletedWebhookEvent = WebhookBase & {
  data: {
    user: {
      id: string;
    };
  };
  type: WebhookEventType.userDeleted;
};

export type UserAuthenticatedWebhookEvent = WebhookBase & {
  data: {
    user: {
      id: string;
    };
  };
  type: WebhookEventType.userAuthenticated;
};

export type UserAuthenticationFailedWebhookEvent = WebhookBase & {
  data: {
    user: {
      id: string;
    };
  };
  type: WebhookEventType.userAuthenticationFailed;
};

export type AccessRequestCreatedWebhookEvent = WebhookBase & {
  data: {
    access_request: {
      email: string;
      first_name: string;
      last_name: string;
      user_id: string;
    };
  };
  type: WebhookEventType.accessRequestCreated;
};

export type OrganizationCreatedWebhookEvent = WebhookBase & {
  data: {
    organization: {
      code: string;
      external_id?: string | null;
      handle: string;
      name: string;
    };
  };
  type: WebhookEventType.organizationCreated;
};

export type OrganizationUpdatedWebhookEvent = WebhookBase & {
  data: {
    organization: {
      code: string;
      external_id: string | null;
      handle: string;
      is_allow_registrations: boolean;
      name: string;
    };
  };
  type: WebhookEventType.organizationUpdated;
};

export type OrganizationDeletedWebhookEvent = WebhookBase & {
  data: {
    organization: {
      code: string;
    };
  };
  type: WebhookEventType.organizationDeleted;
};

export type PermissionCreatedWebhookEvent = WebhookBase & {
  data: {
    permission: {
      description: string;
      id: string;
      key: string;
      name: string;
    };
  };
  type: WebhookEventType.permissionCreated;
};

export type PermissionUpdatedWebhookEvent = WebhookBase & {
  data: {
    permission: {
      description: string;
      id: string;
      key: string;
      name: string;
    };
  };
  type: WebhookEventType.permissionUpdated;
};

export type PermissionDeletedWebhookEvent = WebhookBase & {
  data: {
    permission: {
      id: string;
    };
  };
  type: WebhookEventType.permissionDeleted;
};

export type RoleCreatedWebhookEvent = WebhookBase & {
  data: {
    role: {
      description: string;
      id: string;
      is_default_role: boolean;
      key: string;
      name: string;
    };
  };
  type: WebhookEventType.roleCreated;
};

export type RoleUpdatedWebhookEvent = WebhookBase & {
  data: {
    role: {
      description: string;
      id: string;
      is_default_role: boolean;
      key: string;
      name: string;
    };
  };
  type: WebhookEventType.roleUpdated;
};

export type RoleDeletedWebhookEvent = WebhookBase & {
  data: {
    role: {
      id: string;
    };
  };
  type: WebhookEventType.roleDeleted;
};

export type SubscriberCreatedWebhookEvent = WebhookBase & {
  data: {
    subscriber: {
      email: string;
      first_name: string;
      id: string;
      last_name: string;
      user_id: string;
    };
  };
  type: WebhookEventType.subscriberCreated;
};
