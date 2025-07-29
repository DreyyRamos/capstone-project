"use client";

import type React from "react";
import { Header } from "@/components/header";
import { AdminNavigation } from "@/components/admin-navigation";
import { StudentNavigation } from "@/components/student-navigation";
import { EditorNavigation } from "@/components/editor-navigation";
import { ModeratorNavigation } from "@/components/moderator-navigation";
import { useMemo } from "react";
import { useTokenUser } from "@/hooks/useTokenUser";

export function RoleBasedLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useTokenUser();

  console.log("Current user from token:", user); // Debug

  const navigationComponent = useMemo(() => {
    if (!isAuthenticated || !user) {
      return <StudentNavigation />;
    }

    // Get roles from token payload
    const userRoles = user.roles || user.role || [];

    console.log("Roles from token:", userRoles); // Debug

    // Handle array of roles
    if (Array.isArray(userRoles) && userRoles.length > 0) {
      if (userRoles.includes("ADMIN")) {
        return <AdminNavigation />;
      } else if (userRoles.includes("EDITOR")) {
        return <EditorNavigation />;
      } else if (userRoles.includes("MODERATOR")) {
        return <ModeratorNavigation />;
      } else {
        return <StudentNavigation />;
      }
    }

    return <StudentNavigation />;
  }, [user, isAuthenticated]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {navigationComponent}
      <main className="p-6">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
