import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Play, LayoutDashboard, FolderPlus, Search, DollarSign,
  ShoppingBag, Users, Briefcase, Settings, LogOut, Coins,
  Bell, ChevronDown, Shield, BarChart3, AlertTriangle,
  CreditCard, UserCheck, Menu,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarProvider, SidebarTrigger, useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

const clientNav = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Submit Project", url: "/submit-project", icon: FolderPlus },
  { title: "Select Editor", url: "/select-editor", icon: UserCheck },
  { title: "Workspace", url: "/workspace", icon: Briefcase },
  { title: "Settings", url: "/settings", icon: Settings },
];

const editorNav = [
  { title: "Job Board", url: "/marketplace", icon: Search },
  { title: "Workspace", url: "/editor-workspace", icon: Briefcase },
  { title: "Earnings", url: "/earnings", icon: DollarSign },
  { title: "Points Shop", url: "/points-shop", icon: ShoppingBag },
  { title: "Settings", url: "/editor-settings", icon: Settings },
];

const adminNav = [
  { title: "Overview", url: "/admin", icon: LayoutDashboard },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Projects", url: "/admin/projects", icon: Briefcase },
  { title: "Editor Review", url: "/admin/editor-review", icon: UserCheck },
  { title: "Disputes", url: "/admin/disputes", icon: AlertTriangle },
  { title: "Payouts", url: "/admin/payouts", icon: CreditCard },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

const roleConfig = {
  client: { nav: clientNav, label: "Client", avatar: "SC", name: "Sarah Chen", badge: null },
  editor: { nav: editorNav, label: "Editor", avatar: "MR", name: "Marcus Rivera", badge: "2,450 pts" },
  admin: { nav: adminNav, label: "Admin", avatar: "AD", name: "Admin", badge: null },
};

function NotificationBell() {
  const [hasNotifications] = useState(true);

  return (
    <button className="relative p-2 rounded-lg hover:bg-secondary/50 transition-colors">
      <Bell className="w-4.5 h-4.5 text-muted-foreground" />
      {hasNotifications && (
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive animate-pulse" />
      )}
    </button>
  );
}

function AppSidebar({ role }: { role: "client" | "editor" | "admin" }) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const config = roleConfig[role];
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-white/5">
      {/* Logo */}
      <div className="h-16 flex items-center px-4 gap-2 border-b border-white/5">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-violet flex items-center justify-center shrink-0">
            <Play className="w-4 h-4 text-primary-foreground fill-current" />
          </div>
          {!collapsed && <span className="font-bold text-foreground">FrameCut</span>}
        </Link>
      </div>

      <SidebarContent className="py-4">
        {/* Role Badge */}
        {!collapsed && (
          <div className="px-4 mb-2">
            <span className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
              role === "admin" ? "bg-destructive/10 text-destructive border border-destructive/20" :
              role === "editor" ? "bg-accent/10 text-accent border border-accent/20" :
              "bg-primary/10 text-primary border border-primary/20"
            )}>
              {role === "admin" && <Shield className="w-3 h-3" />}
              {config.label} Portal
            </span>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {config.nav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={collapsed ? item.title : undefined}>
                    <NavLink
                      to={item.url}
                      end={item.url === "/admin"}
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

      {/* User + Logout */}
      <div className="mt-auto border-t border-white/5">
        {!collapsed && (
          <div className="p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full gradient-violet flex items-center justify-center text-xs font-semibold text-primary-foreground shrink-0">
              {config.avatar}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{config.name}</p>
              <p className="text-xs text-muted-foreground">{config.label}</p>
            </div>
          </div>
        )}
        <div className="p-4 pt-0">
          <button onClick={async () => {
              const { supabase } = await import("@/lib/supabase");
              await supabase.auth.signOut();
              window.location.href = "/login";
            }}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full p-2 rounded-md hover:bg-secondary/50">
            <LogOut className="w-4 h-4" />
           {!collapsed && <span>Log out</span>}
          </button>
        </div>
      </div>
    </Sidebar>
  );
}

export default function DashboardLayout({
  children,
  role = "client",
}: {
  children: ReactNode;
  role?: "client" | "editor" | "admin";
}) {
  const config = roleConfig[role];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar role={role} />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 flex items-center justify-between border-b border-white/5 px-4 md:px-6 shrink-0">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            <div className="flex items-center gap-3">
              {role === "editor" && config.badge && (
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-sm font-medium text-accent">
                  <Coins className="w-3.5 h-3.5" />
                  {config.badge}
                </div>
              )}
              <NotificationBell />
              <div className="w-8 h-8 rounded-full gradient-violet flex items-center justify-center text-xs font-semibold text-primary-foreground">
                {config.avatar}
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}