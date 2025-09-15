"use client"

import { useState } from "react";
import Cookies from "js-cookie";

export function useAuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState("");
  const [redirectTo, setRedirectTo] = useState("");

  const token = Cookies.get("token") || "";

  const requireAuth = (actionDescription: string, redirect?: string) => {
    if (!token) {
      setAction(actionDescription);
      setRedirectTo(redirect || "");
      setIsOpen(true);
      return false;
    }
    return true;
  };

  const closeModal = () => {
    setIsOpen(false);
    setAction("");
    setRedirectTo("");
  };

  return {
    isOpen,
    action,
    redirectTo,
    requireAuth,
    closeModal,
    isAuthenticated: !!token,
  };
}
