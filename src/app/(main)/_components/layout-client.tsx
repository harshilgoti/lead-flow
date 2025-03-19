"use client";

import { TUser } from "@/app/db/schema/user";
import { useAuthStore } from "@/app/store/auth";
import { useEffect } from "react";

export default function LayoutClient({
  user,
  children,
}: {
  user: TUser | null;
  children: React.ReactNode;
}) {
  //   const setUser = useUserStore((state) => state.setUser);
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    if (user) {
      setAuth(user);
    }
  }, [user, setAuth]);

  return <>{children}</>;
}
