import * as React from "react"

import { NavDocuments } from "@/components/admin/nav-documents"
import { NavMain } from "@/components/admin/nav-main"
import { NavSecondary } from "@/components/admin/nav-secondary"
import { NavUser } from "@/components/admin/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboardIcon, SquareArrowRightExit, FolderIcon, CameraIcon, FileTextIcon, GraduationCapIcon, HandPlatterIcon, BriefcaseBusinessIcon } from "lucide-react"

const data = {
  user: {
    name: "Luis",
    email: "correo@ejemplo.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Formación",
      url: "/admin/Formacion",
      icon: (
        <GraduationCapIcon
        />
      ),
    },
    {
      title: "Servicios",
      url: "/admin/Servicios",
      icon: (
        <HandPlatterIcon
        />
      ),
    },
    {
      title: "Trabajos",
      url: "/admin/Trabajos",
      icon: (
        <BriefcaseBusinessIcon
        />
      ),
    },
    {
      title: "Cursos",
      url: "/admin/Cursos",
      icon: (
        <FolderIcon
        />
      ),
    },
    // {
    //   title: "Team",
    //   url: "#",
    //   icon: (
    //     <UsersIcon
    //     />
    //   ),
    // },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: ( 
        <CameraIcon
        />
      ),
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: (
        <FileTextIcon
        />
      ),
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: (
        <FileTextIcon
        />
      ),
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    // {
    //   title: "Ajustes",
    //   url: "#",
    //   icon: (
    //     <Settings2Icon
    //     />
    //   ),
    // },
    // {
    //   title: "Ayuda",
    //   url: "#",
    //   icon: (
    //     <CircleHelpIcon
    //     />
    //   ),
    // },
    // {
    //   title: "Buscar",
    //   url: "#",
    //   icon: (
    //     <SearchIcon
    //     />
    //   ),
    // },
    {
      title: "Salir",
      url: "/",
      icon: (
        <SquareArrowRightExit
        />
      ),
      className: "bg-red-500/10 hover:bg-red-500/20 text-red-600 hover:text-red-700",
    },
  ],
  documents: [
    // {
    //   name: "Database",
    //   url: "#",
    //   icon: (
    //     <DatabaseIcon
    //     />
    //   ),
    // },
    // {
    //   name: "Reportes",
    //   url: "#",
    //   icon: (
    //     <FileChartColumnIcon
    //     />
    //   ),
    // },
    // {
    //   name: "Word Assistant",
    //   url: "#",
    //   icon: (
    //     <FileIcon
    //     />
    //   ),
    // },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-5! bg-black/80 text-white"
              render={<a href="/admin" />}
            >
              <LayoutDashboardIcon className="size-7!" />
              <span className="text-xl font-semibold">Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Dashboard"
                  className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
                  asChild
                >
                  <a href="/admin" className="flex items-center gap-2">
                    <GaugeIcon className="size-6" />
                    <span className="text-base">Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
