"use client"

import type React from "react"

import { useRole } from "@/contexts/role-context"

interface PermissionGateProps {
  children: React.ReactNode
  permission: string
  fallback?: React.ReactNode
}

export function PermissionGate({ children, permission, fallback = null }: PermissionGateProps) {
  const { hasPermission } = useRole()

  if (!hasPermission(permission)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
