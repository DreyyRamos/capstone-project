// hooks/useTokenUser.ts
"use client";

import { useState, useEffect, useMemo } from "react";
import Cookies from "js-cookie";

// Utility function to decode JWT token
function decodeJWT(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}

export function useTokenUser() {
  const [token, setToken] = useState<string>("");
  const [forceRefresh, setForceRefresh] = useState(0);

  // Watch for token changes in cookies
  useEffect(() => {
    const checkToken = () => {
      const currentToken = Cookies.get("token") || "";
      if (currentToken !== token) {
        setToken(currentToken);
      }
    };

    // Check immediately
    checkToken();

    // Set up interval to check for token changes
    const interval = setInterval(checkToken, 1000);

    // Listen for storage events (in case token is updated in another tab)
    const handleStorageChange = () => {
      checkToken();
    };

    window.addEventListener("storage", handleStorageChange);

    // Custom event for manual token refresh
    const handleTokenRefresh = () => {
      setForceRefresh((prev) => prev + 1);
      checkToken();
    };

    window.addEventListener("tokenRefresh", handleTokenRefresh);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("tokenRefresh", handleTokenRefresh);
    };
  }, [token]);

  const user = useMemo(() => {
    if (!token) return null;

    const decoded = decodeJWT(token);
    if (!decoded) return null;

    // Check if token is expired
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      Cookies.remove("token");
      setToken("");
      return null;
    }

    return decoded;
  }, [token, forceRefresh]);

  const refreshUser = () => {
    // Dispatch custom event to trigger refresh
    window.dispatchEvent(new CustomEvent("tokenRefresh"));
  };

  return {
    user,
    isAuthenticated: !!user,
    refreshUser,
    token,
  };
}
