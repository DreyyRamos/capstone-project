// "use client"

// import type React from "react"

// import { useRole } from "@/contexts/role-context"
// import { useRouter } from "next/navigation"
// import { useEffect } from "react"

// interface ProtectedRouteProps {
//   children: React.ReactNode
//   permission?: string
//   roles?: string[]
//   fallback?: React.ReactNode
// }

// export function ProtectedRoute({
//   children,
//   permission,
//   roles,
//   fallback = <div>Access Denied</div>,
// }: ProtectedRouteProps) {
//   const { user, hasPermission } = useRole()
//   const router = useRouter()

//   useEffect(() => {
//     if (!user) {
//       router.push("/login")
//       return
//     }

//     if (permission && !hasPermission(permission)) {
//       router.push("/unauthorized")
//       return
//     }

//     if (roles && !roles.includes(user.role)) {
//       router.push("/unauthorized")
//       return
//     }
//   }, [user, permission, roles, hasPermission, router])

//   if (!user) return null

//   if (permission && !hasPermission(permission)) {
//     return <>{fallback}</>
//   }

//   if (roles && !roles.includes(user.role)) {
//     return <>{fallback}</>
//   }

//   return <>{children}</>
// }
