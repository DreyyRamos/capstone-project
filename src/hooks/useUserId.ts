import { useMemo } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
}

// need to para sa pag-decode ng token para makuha yung userId if needed

export const useUserId = (token: string) => {
  return useMemo(() => {
    try {
      if (!token) return null;
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded.id;
    } catch (error) {
      return null;
    }
  }, [token]);
};
