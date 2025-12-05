import { Calendar, Home, Icon, IdCard, Inbox, LayoutDashboard, Megaphone, Search, Settings, User,} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router"

// Menu items.
const items = [
 
  {
    title: "Employee",
    url: "/users",
    icon: IdCard,
  },
  {
    title: "Notice",
    url: "Notice",
    icon: Megaphone,
  },
  {
    title: "Add Notice",
    url: "/addNotice",
    icon: Megaphone,
  }
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel><LayoutDashboard></LayoutDashboard> <span className="px-4 font-semibold">Dashboard</span></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}