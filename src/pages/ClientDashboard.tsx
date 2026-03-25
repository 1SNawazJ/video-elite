import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Film, FolderOpen, Eye, Plus, Search, ArrowUpRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";

const metrics = [
  { label: "Minutes Used", value: "127", max: "200", icon: Clock, color: "text-primary", trend: "+12 this week" },
  { label: "Minutes Remaining", value: "73", max: "200", icon: Film, color: "text-accent", trend: null },
  { label: "Active Projects", value: "4", icon: FolderOpen, color: "text-info", trend: "+1 new" },
  { label: "Pending Reviews", value: "2", icon: Eye, color: "text-amber", trend: "2 awaiting" },
];

const projects = [
  { name: "Q1 Brand Anthem — Nike Running", status: "Open", date: "Mar 18, 2026", editor: "—", progress: 0 },
  { name: "Product Launch Reel — Sonos Era", status: "Assigned", date: "Mar 15, 2026", editor: "Marcus Rivera", progress: 35 },
  { name: "Social Cutdowns — Allbirds Spring", status: "In Review", date: "Mar 12, 2026", editor: "Yuki Tanaka", progress: 85 },
  { name: "CEO Keynote Highlight — Stripe", status: "Completed", date: "Mar 8, 2026", editor: "Alex Morgan", progress: 100 },
  { name: "Event Recap — Web Summit 2026", status: "Assigned", date: "Mar 5, 2026", editor: "Sofia Petrov", progress: 60 },
  { name: "Tutorial Series Ep.4 — Figma", status: "Open", date: "Mar 3, 2026", editor: "—", progress: 0 },
];

const statusStyles: Record<string, string> = {
  Open: "status-open",
  Assigned: "status-assigned",
  "In Review": "status-review",
  Completed: "status-completed",
};

const recentActivity = [
  { text: "Marcus Rivera submitted a revision for Sonos Era", time: "2 hours ago", type: "info" },
  { text: "New application received for Nike Running", time: "4 hours ago", type: "primary" },
  { text: "Yuki Tanaka completed Allbirds cutdowns", time: "Yesterday", type: "success" },
  { text: "Payment released for Stripe Keynote", time: "2 days ago", type: "accent" },
];

export default function ClientDashboard() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const statuses = ["All", "Open", "Assigned", "In Review", "Completed"];

  const filtered = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout role="client">
      <div className="page-padding">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 page-header">
          <div>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">Welcome back, Sarah. Here's your project overview.</p>
          </div>
          <Button variant="hero" asChild>
            <Link to="/submit-project"><Plus className="w-4 h-4" /> Submit New Project</Link>
          </Button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-secondary flex items-center justify-center`}>
                  <m.icon className={`w-5 h-5 ${m.color}`} />
                </div>
                {m.trend && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> {m.trend}
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold text-foreground">{m.value}</p>
              <p className="text-sm text-muted-foreground">{m.label}</p>
              {m.max && (
                <div className="mt-3 h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full rounded-full gradient-violet transition-all duration-500" style={{ width: `${(parseInt(m.value) / parseInt(m.max)) * 100}%` }} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Projects Table */}
          <div className="lg:col-span-2 glass-card">
            <div className="p-5 border-b border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-foreground">Projects</h2>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-48">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 bg-secondary border-white/10 h-9"
                  />
                </div>
                <div className="flex gap-1">
                  {statuses.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                        statusFilter === s
                          ? "bg-primary/20 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Project</th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Status</th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3 hidden md:table-cell">Progress</th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3 hidden sm:table-cell">Editor</th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3 hidden lg:table-cell">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="table-row-hover cursor-pointer"
                    >
                      <td className="px-5 py-4">
                        <Link to="/workspace" className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1">
                          {p.name}
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                        </Link>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[p.status]}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 rounded-full bg-secondary overflow-hidden">
                            <div
                              className={`h-full rounded-full ${p.progress === 100 ? "gradient-success" : "gradient-violet"}`}
                              style={{ width: `${p.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{p.progress}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-muted-foreground hidden sm:table-cell">{p.editor}</td>
                      <td className="px-5 py-4 text-sm text-muted-foreground hidden lg:table-cell">{p.date}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="p-12 text-center text-muted-foreground text-sm">
                  No projects found matching your criteria.
                </div>
              )}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="glass-card">
            <div className="p-5 border-b border-white/5">
              <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
            </div>
            <div className="p-4 space-y-4">
              {recentActivity.map((activity, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                    activity.type === "success" ? "bg-success" :
                    activity.type === "primary" ? "bg-primary" :
                    activity.type === "accent" ? "bg-accent" :
                    "bg-info"
                  }`} />
                  <div>
                    <p className="text-sm text-foreground">{activity.text}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}