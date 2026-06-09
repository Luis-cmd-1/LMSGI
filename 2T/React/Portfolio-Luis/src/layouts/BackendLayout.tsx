import { AppSidebar } from "@/components/admin/app-sidebar"
import { SiteHeader } from "@/components/admin/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Outlet, useLocation } from "react-router-dom"

export default function Page() {
  const transicion = useLocation();

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />

        <div key={transicion.pathname} className="page-enter-back">
          <Outlet/>
        </div>

      </SidebarInset>
    </SidebarProvider>
  )
}
