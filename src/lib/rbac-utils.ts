import { ROLES } from "./permissions"

export function checkPermission(
  userRole: string,
  permission: string,
  context?: {
    resourceOwnerId?: string
    userId?: string
  },
): boolean {
  const role = ROLES[userRole]
  if (!role) return false

  // Check if user has the permission
  if (!role.permissions.includes(permission)) return false

  // Handle ownership-based permissions
  if (permission.includes(".own") && context) {
    return context.resourceOwnerId === context.userId
  }

  return true
}

export function checkRoleHierarchy(userRole: string, requiredRole: string): boolean {
  const user = ROLES[userRole]
  const required = ROLES[requiredRole]

  if (!user || !required) return false

  return user.hierarchy >= required.hierarchy
}

export function getUserPermissions(userRole: string): string[] {
  const role = ROLES[userRole]
  return role ? role.permissions : []
}
