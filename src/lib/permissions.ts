export interface Permission {
  id: string
  name: string
  description: string
  resource: string
  action: string
}

export interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  hierarchy: number // For role hierarchy
}

export const PERMISSIONS: Record<string, Permission> = {
  // Publications
  "publications.create": {
    id: "publications.create",
    name: "Create Publications",
    description: "Can create new publications",
    resource: "publications",
    action: "create",
  },
  "publications.edit.own": {
    id: "publications.edit.own",
    name: "Edit Own Publications",
    description: "Can edit their own publications",
    resource: "publications",
    action: "edit:own",
  },
  "publications.edit.any": {
    id: "publications.edit.any",
    name: "Edit Any Publication",
    description: "Can edit any publication",
    resource: "publications",
    action: "edit:any",
  },
  "publications.delete.own": {
    id: "publications.delete.own",
    name: "Delete Own Publications",
    description: "Can delete their own publications",
    resource: "publications",
    action: "delete:own",
  },
  "publications.delete.any": {
    id: "publications.delete.any",
    name: "Delete Any Publication",
    description: "Can delete any publication",
    resource: "publications",
    action: "delete:any",
  },
  // Users
  "users.view": {
    id: "users.view",
    name: "View Users",
    description: "Can view user list",
    resource: "users",
    action: "view",
  },
  "users.manage": {
    id: "users.manage",
    name: "Manage Users",
    description: "Can create, edit, delete users",
    resource: "users",
    action: "manage",
  },
  // Analytics
  "analytics.view": {
    id: "analytics.view",
    name: "View Analytics",
    description: "Can view analytics dashboard",
    resource: "analytics",
    action: "view",
  },
  // Moderation
  "moderation.reports": {
    id: "moderation.reports",
    name: "Handle Reports",
    description: "Can view and resolve reports",
    resource: "moderation",
    action: "reports",
  },
  "moderation.users": {
    id: "moderation.users",
    name: "Moderate Users",
    description: "Can warn, suspend, ban users",
    resource: "moderation",
    action: "users",
  },
}

export const ROLES: Record<string, Role> = {
  student: {
    id: "student",
    name: "Student",
    description: "Regular student user",
    hierarchy: 1,
    permissions: ["publications.create", "publications.edit.own", "publications.delete.own"],
  },
  moderator: {
    id: "moderator",
    name: "Moderator",
    description: "Community moderator",
    hierarchy: 2,
    permissions: [
      "publications.create",
      "publications.edit.own",
      "publications.delete.own",
      "moderation.reports",
      "moderation.users",
      "analytics.view",
    ],
  },
  editor: {
    id: "editor",
    name: "Editor",
    description: "Content editor",
    hierarchy: 3,
    permissions: [
      "publications.create",
      "publications.edit.own",
      "publications.edit.any",
      "publications.delete.own",
      "moderation.reports",
      "analytics.view",
    ],
  },
  admin: {
    id: "admin",
    name: "Administrator",
    description: "System administrator",
    hierarchy: 4,
    permissions: [
      "publications.create",
      "publications.edit.any",
      "publications.delete.any",
      "users.view",
      "users.manage",
      "analytics.view",
      "moderation.reports",
      "moderation.users",
    ],
  },
}
