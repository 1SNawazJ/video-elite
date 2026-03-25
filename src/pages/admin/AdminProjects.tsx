import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye, ExternalLink, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/DashboardLayout";

const projects = [
  { id: 1847, title: "Q1 Brand Anthem — Nike Running", client: "Sarah Chen", editor: "—", status: "Open", budget: "$300–500", minutes: 15, date: "Mar 18, 2026" },
  { id: 1846, title: "Product Launch Reel — Sonos Era", client: "Sarah Chen", editor: "Marcus Rivera", status: "Assigned", budget: "$350", minutes: 22, date: "Mar 15, 2026" },
  { id: 1845, title: "Social Cutdowns — Allbirds Spring", client: "Emily Johnson", editor: "Yuki Tanaka", status: "In Review", budget: "$280", minutes: 30, date: "Mar 12, 2026" },
  { id: 1844, title: "CEO Keynote — Stripe Sessions", client: "Sarah Chen", editor: "Alex Morgan", status: "Completed", budget: "$450", minutes: 45, date: "Mar 8, 2026" },
  { id: 1843, title: "Event Recap — Web Summit", client: "Emily Johnson", editor: "Sofia Petrov", status: "Assigned", budget: "$550", minutes: 60, date: "Mar 5, 2026" },
  { id: 1842, title: "Tutorial Ep.4 — Figma", client: "Acme Corp", editor: "—", status: "Disputed", budget: "$180", minutes: 90, date: "Mar 3, 2026" },
];

const statusStyles: Record<string, string> = {
  Open: "status-open",
  Assigned: "status-assigned",
  "In Review": "status-review",
  Completed: "status-completed",
  Disputed: "status-disputed",
};

export default function AdminProjects() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const statuses = ["All", "Open", "Assigned", "In Review", "Completed", "Disputed"];

  const filtered = projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.client.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout role="admin">
      <div className="page-padding">
        <div className="page-header">
          <h1 className="page-title">Projects</h1>
          <p className="page-subtitle">Monitor all projects across the platform.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {statuses.filter((s) => s !== "All").map((status) => {
            const count = projects.filter((p) => p.status === status).length;
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status === statusFilter ? "All" : status)}
                className={`glass-card p-4 text-center transition-all ${statusFilter === status ? "border-primary/40" : ""}`}
              >
                <p className="text-2xl font-bold text-foreground">{count}</p>
                <p className={`text-xs font-medium mt-1 ${statusStyles[status]?.split(" ")[1] || "text-muted-foreground"}`}>{status}</p>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="glass-card p-4 mb-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by project name or client..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-secondary border-white/10"
            />
          </div>
        </div>

        {/* Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {["ID", "Project", "Client", "Editor", "Status", "Budget", "Minutes", "Actions"].map((h) => (
                    <th key={h} className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="table-row-hover"
                  >
                    <td className="px-5 py-4 text-sm text-muted-foreground">#{p.id}</td>
                    <td className="px-5 py-4 text-sm font-medium text-foreground">{p.title}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{p.client}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{p.editor}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[p.status]}`}>{p.status}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-foreground">{p.budget}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-3 h-3" /> {p.minutes} min
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" /> View
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}