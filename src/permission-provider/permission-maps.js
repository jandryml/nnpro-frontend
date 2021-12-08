export const ROLES = {
    user: "ROLE_USER",
    moderator: "ROLE_MODERATOR",
    admin: "ROLE_ADMIN"
};

export const SCOPES = {
    user: "user",
    moderator: "moderator",
    admin: "admin",
};

export const PERMISSIONS = {
    [ROLES.user]: [SCOPES.user],
    [ROLES.moderator]: [SCOPES.moderator],
    [ROLES.admin]: [SCOPES.admin, SCOPES.moderator]
};