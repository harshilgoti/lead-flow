import { PropsWithChildren } from "react";
import { AppSidebar } from "@/app/(main)/_components/app-sidebar";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
// import { useAuthStore } from "@/app/store/auth";
import { getUser } from "@/server/actions/auth";
import LayoutClient from "./_components/layout-client";
import { User } from "@prisma/client";
// import PageHeaderClient from "./_components/pag-header-client";

export default async function Page({ children }: PropsWithChildren) {
  // const user = useAuthStore((state) => state);
  const user = (await getUser()) as User;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 sticky top-0 z-10 bg-background">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {/* <PageHeaderClient /> */}
          </div>
        </header>
        <LayoutClient user={user}>{children}</LayoutClient>
      </SidebarInset>
    </SidebarProvider>
  );
}
