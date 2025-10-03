import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserQuery } from "@/hooks/useUser";

export type AllowedRole = "ADMIN" | "STUDENT" | "MODERATOR" | "EDITOR";

export function useRoleGate(allowedRoles: AllowedRole[], token: string) {
  const { data: user, isLoading } = useUserQuery(token);
  console.log("check for user role", user);
  const router = useRouter();

  const role = user?.userData?.role as AllowedRole | undefined;

  useEffect(() => {
    if (isLoading) return;
    if (!role || !allowedRoles.includes(role)) {
      router.replace("/unauthorized");
    }
  }, [isLoading, role, allowedRoles, router]);
}
