"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { isTokenExpired } from "@/app/api/(middlware)/auth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Cookies from "js-cookie";

type Ctx = { token: string | null; setToken: (t: string | null) => void };
const TokenCtx = createContext<Ctx | undefined>(undefined);

export function TokenProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      const t = Cookies.get("token"); // ← read it every time
      if (t && isTokenExpired(t)) {
        setOpen(true);
        Cookies.remove("token");
      }
    }, 2000);

    return () => clearInterval(id);
  }, []);

  /* optional: expose token/setToken if other components need them */
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    setToken(Cookies.get("token") ?? null);
  }, []);

  return (
    <TokenCtx.Provider value={{ token, setToken }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Session expired</DialogTitle>
            <DialogDescription>
              Your token has expired. Please log in again.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setOpen(false);
                window.location.href = "/login";
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Log in
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </TokenCtx.Provider>
  );
}

export const useToken = () => {
  const ctx = useContext(TokenCtx);
  if (!ctx) throw new Error("useToken must be used inside TokenProvider");
  return ctx;
};
