"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { logout } from "@/server/actions/auth";
import { useAuthStore } from "@/app/store/auth";

export function NavUser() {
  const user = useAuthStore((state) => state.user);
  console.log("🚀 ~ user1:", user);

  const router = useRouter();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user?.fullName} alt={user?.fullName} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user?.fullName}</span>
            <span className="truncate text-xs">{user?.email}</span>
          </div>
          <LogOut
            className="cursor-pointer"
            onClick={async () => {
              await logout();
              router.push("/login");
            }}
          />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
