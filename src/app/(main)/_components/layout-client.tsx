"use client";

import { useAuthStore } from "@/app/store/auth";
import { User } from "@prisma/client";
import { useEffect } from "react";

export default function LayoutClient({
  user,
  children,
}: {
  user: User | null;
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
