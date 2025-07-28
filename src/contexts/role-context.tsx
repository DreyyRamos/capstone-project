"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type UserRole = "admin" | "student" | "editor" | "moderator";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface RoleContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  hasPermission: (permission: string) => boolean;
  logout: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

// Define permissions for roles
const rolePermissions = {
  admin: [
    "view_analytics",
    "manage_users",
    "create_publication",
    "edit_any_publication",
    "delete_any_publication",
    "moderate_forum",
    "manage_categories",
    "view_all_sections",
  ],
  editor: [
    "create_publication",
    "edit_own_publication",
    "edit_others_publication",
    "moderate_forum",
    "view_analytics_limited",
    "manage_categories",
  ],
  moderator: [
    "create_publication",
    "edit_own_publication",
    "moderate_forum",
    "view_analytics_limited",
    "manage_forum_categories",
  ],
  student: [
    "create_publication",
    "edit_own_publication",
    "participate_forum",
    "view_publications",
  ],
};

export function RoleProvider({ children }: { children: ReactNode }) {
  // Start with no user (unauthenticated) - need mag-login ng users
  const [user, setUser] = useState<User | null>(null);

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return rolePermissions[user.role]?.includes(permission) || false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <RoleContext.Provider value={{ user, setUser, hasPermission, logout }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}
