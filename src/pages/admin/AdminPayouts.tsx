import { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Clock, CheckCircle, AlertTriangle, Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/DashboardLayout";

const payouts = [
  { id: "PAY-001", editor: "Marcus Rivera", project: "Sonos Era 500 Launch", amount: 350, status: "Released", date: "Mar 15, 2026", method: "Stripe" },
  { id: "PAY-002", editor: "Yuki Tanaka", project: "Allbirds Spring Cutdowns", amount: 280, status: "Pending", date: "Mar 22, 2026", method: "Stripe" },
  { id: "PAY-003", editor: "Alex Morgan", project: "Stripe Keynote Highlights", amount: 450, status: "Released", date: "Mar 10, 2026", method: "Stripe" },
  { id: "PAY-004", editor: "Sofia Petrov", project: "Web Summit Recap", amount: 550, status: "Pending", date: "Mar 25, 2026", method: "Stripe" },
  { id: "PAY-005", editor: "Marcus Rivera", project: "Nike Running Campaign", amount: 500, status: "On Hold", date: "Mar 28, 2026", method: "Stripe" },
  { id: "PAY-006", editor: "Alex Morgan", project: "Figma Tutorial Ep.3", amount: 180, status: "Flagged", date: "Mar 5, 2026", method: "Stripe" },
];

const metrics = [
  { label: "Total Released", value: "$33,124", icon: CheckCircle, color: "text-success" },
  { label: "Pending Payouts", value: "$830", icon: Clock, color: "text-accent" },
  { label: "On Hold", value: "$500", icon: AlertTriangle, color: "text-destructive" },
  { label: "Avg Payout", value: "$385", icon: DollarSign, color: "text-primary" },
];

const statusColors: Record<string, string> = {
  Released: "bg-success/10 text-success",
  Pending: "bg-accent/10 text-accent",
  "On Hold": "bg-destructive/10 text-destructive",
  Flagged: "bg-destructive/10 text-destructive",
};

export default function AdminPayouts() {
  const [search, setSearch] = useState("");

  const filtered = payouts.filter((p) =>
    p.editor.toLowerCase().includes(search.toLowerCase()) ||
    p.project.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="admin">
      <div className="page-padding">
        <div className="flex items-center justify-between page-header">
          <div>
            <h1 className="page-title">Payouts</h1>
            <p className="page-subtitle">Manage editor payments and releases.</p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4" /> Export CSV
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
              <m.icon className={`w-5 h-5 ${m.color} mb-3`} />
              <p className="text-2xl font-bold text-foreground">{m.value}</p>
              <p className="text-sm text-muted-foreground">{m.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Search */}
        <div className="glass-card p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by editor or project..."
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
                  {["ID", "Editor", "Project", "Amount", "Status", "Date", "Action"].map((h) => (
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
                    <td className="px-5 py-4 text-sm text-muted-foreground">{p.id}</td>
                    <td className="px-5 py-4 text-sm font-medium text-foreground">{p.editor}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{p.project}</td>
                    <td className="px-5 py-4 text-sm font-medium text-foreground">${p.amount}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[p.status]}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{p.date}</td>
                    <td className="px-5 py-4">
                      {p.status === "Pending" && (
                        <Button variant="success" size="sm">Release</Button>
                      )}
                      {p.status === "On Hold" && (
                        <div className="flex gap-2">
                          <Button variant="success" size="sm">Release</Button>
                          <Button variant="outline" size="sm">Review</Button>
                        </div>
                      )}
                      {p.status === "Flagged" && (
                        <Button variant="outline" size="sm" className="border-destructive/30 text-destructive">
                          Investigate
                        </Button>
                      )}
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