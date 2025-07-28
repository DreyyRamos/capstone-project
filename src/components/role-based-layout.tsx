"use client"

import type React from "react"

import { useRole } from "@/contexts/role-context"
import { Header } from "@/components/header"
import { AdminNavigation } from "@/components/admin-navigation"
import { StudentNavigation } from "@/components/student-navigation"
import { EditorNavigation } from "@/components/editor-navigation"
import { ModeratorNavigation } from "@/components/moderator-navigation"

export function RoleBasedLayout({ children }: { children: React.ReactNode }) {
  const { user } = useRole()

  const getNavigationComponent = () => {
    switch (user?.role) {
      case "admin":
        return <AdminNavigation />
      case "editor":
        return <EditorNavigation />
      case "moderator":
        return <ModeratorNavigation />
      case "student":
      default:
        return <StudentNavigation />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {getNavigationComponent()}
      <main className="p-6">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  )
}
