import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Play, LayoutDashboard, FolderPlus, Search, DollarSign, ShoppingBag, Users, Briefcase, Settings, LogOut, Coins } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";

const clientNav = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Submit Project", url: "/submit-project", icon: FolderPlus },
  { title: "Admin Panel", url: "/admin", icon: Users },
  { title: "Workspace", url: "/workspace", icon: Briefcase },
  { title: "Settings", url: "/settings", icon: Settings },
];

const editorNav = [
  { title: "Job Board", url: "/marketplace", icon: Search },
  { title: "Earnings", url: "/earnings", icon: DollarSign },
  { title: "Points Shop", url: "/points-shop", icon: ShoppingBag },
  { title: "Workspace", url: "/workspace", icon: Briefcase },
  { title: "Settings", url: "/settings", icon: Settings },
];

function AppSidebar({ role }: { role: "client" | "editor" }) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const items = role === "client" ? clientNav : editorNav;
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-white/5">
      <div className="h-16 flex items-center px-4 gap-2 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg gradient-violet flex items-center justify-center shrink-0">
          <Play className="w-4 h-4 text-primary-foreground fill-current" />
        </div>
        {!collapsed && <span className="font-bold text-foreground">FrameCut</span>}
      </div>
      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-secondary/50"
                      activeClassName="bg-secondary text-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="mt-auto p-4 border-t border-white/5">
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full">
          <LogOut className="w-4 h-4" />
          {!collapsed && <span>Log out</span>}
        </button>
      </div>
    </Sidebar>
  );
}

export default function DashboardLayout({ children, role = "client" }: { children: ReactNode; role?: "client" | "editor" }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar role={role} />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 flex items-center justify-between border-b border-white/5 px-4">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            <div className="flex items-center gap-4">
              {role === "editor" && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-sm font-medium text-accent">
                  <Coins className="w-3.5 h-3.5" />
                  2,450 pts
                </div>
              )}
              <div className="w-8 h-8 rounded-full gradient-violet flex items-center justify-center text-xs font-semibold text-primary-foreground">
                SC
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
