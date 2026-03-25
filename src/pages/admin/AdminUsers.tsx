import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MoreHorizontal, Shield, Award, Ban, Mail, Eye, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/DashboardLayout";

const users = [
  { id: 1, name: "Sarah Chen", email: "sarah@nexusmedia.com", role: "Client", status: "Active", joined: "Jan 15, 2026", projects: 12, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face" },
  { id: 2, name: "Marcus Rivera", email: "marcus@riverflow.co", role: "Editor", status: "Active", joined: "Feb 2, 2026", projects: 28, level: 3, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" },
  { id: 3, name: "Yuki Tanaka", email: "yuki@tanaka.dev", role: "Editor", status: "Active", joined: "Feb 10, 2026", projects: 15, level: 2, image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=40&h=40&fit=crop&crop=face" },
  { id: 4, name: "Sofia Petrov", email: "sofia@petrov.film", role: "Editor", status: "Pending", joined: "Mar 5, 2026", projects: 0, level: 1, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" },
  { id: 5, name: "Alex Morgan", email: "alex@morgan.co", role: "Editor", status: "Suspended", joined: "Jan 20, 2026", projects: 5, level: 1, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" },
  { id: 6, name: "Emily Johnson", email: "emily@acmecorp.com", role: "Client", status: "Active", joined: "Dec 10, 2025", projects: 8, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face" },
  { id: 7, name: "James Wilson", email: "james@wilson.edit", role: "Editor", status: "Pending", joined: "Mar 18, 2026", projects: 0, level: 0, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face" },
];

const statusColors: Record<string, string> = {
  Active: "bg-success/10 text-success",
  Pending: "bg-accent/10 text-accent",
  Suspended: "bg-destructive/10 text-destructive",
};

const roleColors: Record<string, string> = {
  Client: "bg-primary/10 text-primary",
  Editor: "bg-accent/10 text-accent",
};

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "All" || u.role === roleFilter;
    const matchesStatus = statusFilter === "All" || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <DashboardLayout role="admin">
      <div className="page-padding">
        <div className="page-header">
          <h1 className="page-title">User Management</h1>
          <p className="page-subtitle">{users.length} total users on the platform.</p>
        </div>

        {/* Filters */}
        <div className="glass-card p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search users by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-secondary border-white/10"
            />
          </div>
          <div className="flex gap-2">
            {["All", "Client", "Editor"].map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  roleFilter === r ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {["All", "Active", "Pending", "Suspended"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  statusFilter === s ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {["User", "Role", "Status", "Joined", "Projects", "Actions"].map((h) => (
                    <th key={h} className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((user, i) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="table-row-hover"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover border border-white/10"
                        />
                        <div>
                          <p className="text-sm font-medium text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColors[user.role]}`}>
                        {user.role === "Editor" && user.level !== undefined && <Award className="w-3 h-3" />}
                        {user.role} {user.level !== undefined && `(L${user.level})`}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[user.status]}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{user.joined}</td>
                    <td className="px-5 py-4 text-sm text-foreground">{user.projects}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="Email">
                          <Mail className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-destructive" title="Suspend">
                          <Ban className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="p-12 text-center text-muted-foreground text-sm">No users found.</div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}