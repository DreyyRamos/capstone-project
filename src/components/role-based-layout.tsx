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
    if (!isAuthenticated || !user) return <StudentNavigation />;

    // 1. read the role (string | undefined)
    const role = (user.role || "").toUpperCase(); // normalise case

    console.log("Role from token:", role);

    // 2. pick component
    switch (role) {
      case "ADMIN":
        return <AdminNavigation />;
      case "EDITOR":
        return <EditorNavigation />;
      case "MODERATOR":
        return <ModeratorNavigation />;
      default:
        return <StudentNavigation />;
    }
  }, [user, isAuthenticated]);

  return (
    <div id="role-based-layout-div-1" data-testId="role-based-layout-div-1" className="min-h-screen bg-background">
      <Header />
      {navigationComponent}
      <main className="p-6">
        <div id="role-based-layout-div-2" data-testId="role-based-layout-div-2" className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
