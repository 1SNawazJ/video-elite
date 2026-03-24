import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Film, FolderOpen, Eye, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/DashboardLayout";

const metrics = [
  { label: "Minutes Used", value: "127", max: "200", icon: Clock, color: "text-primary" },
  { label: "Minutes Remaining", value: "73", max: "200", icon: Film, color: "text-accent" },
  { label: "Active Projects", value: "4", icon: FolderOpen, color: "text-info" },
  { label: "Pending Reviews", value: "2", icon: Eye, color: "text-amber" },
];

const projects = [
  { name: "Q1 Brand Anthem — Nike Running", status: "Open", date: "Mar 18, 2026", editor: "—" },
  { name: "Product Launch Reel — Sonos Era", status: "Assigned", date: "Mar 15, 2026", editor: "Marcus Rivera" },
  { name: "Social Cutdowns — Allbirds Spring", status: "In Review", date: "Mar 12, 2026", editor: "Yuki Tanaka" },
  { name: "CEO Keynote Highlight — Stripe", status: "Completed", date: "Mar 8, 2026", editor: "Alex Morgan" },
  { name: "Event Recap — Web Summit 2026", status: "Assigned", date: "Mar 5, 2026", editor: "Sofia Petrov" },
  { name: "Tutorial Series Ep.4 — Figma", status: "Open", date: "Mar 3, 2026", editor: "—" },
];

const statusStyles: Record<string, string> = {
  Open: "status-open",
  Assigned: "status-assigned",
  "In Review": "status-review",
  Completed: "status-completed",
};

export default function ClientDashboard() {
  const [search, setSearch] = useState("");
  const filtered = projects.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout role="client">
      <div className="p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground text-sm">Welcome back, Sarah. Here's your project overview.</p>
          </div>
          <Button variant="hero" asChild>
            <a href="/submit-project"><Plus className="w-4 h-4" /> Submit New Project</a>
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
                <m.icon className={`w-5 h-5 ${m.color}`} />
                {m.max && (
                  <span className="text-xs text-muted-foreground">{m.value}/{m.max}</span>
                )}
              </div>
              <p className="text-2xl font-bold text-foreground">{m.value}</p>
              <p className="text-sm text-muted-foreground">{m.label}</p>
              {m.max && (
                <div className="mt-3 h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full rounded-full gradient-violet" style={{ width: `${(parseInt(m.value) / parseInt(m.max)) * 100}%` }} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Projects Table */}
        <div className="glass-card">
          <div className="p-5 border-b border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-foreground">Projects</h2>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-secondary border-white/10"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Project Name</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Submitted</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Editor</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-secondary/30 transition-colors cursor-pointer">
                    <td className="px-5 py-4 text-sm font-medium text-foreground">{p.name}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[p.status]}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{p.date}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{p.editor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
