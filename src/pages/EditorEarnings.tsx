import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Calendar, CreditCard, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const earningsData = [
  { month: "Oct", amount: 1200 },
  { month: "Nov", amount: 1800 },
  { month: "Dec", amount: 2400 },
  { month: "Jan", amount: 1900 },
  { month: "Feb", amount: 3100 },
  { month: "Mar", amount: 2650 },
];

const payouts = [
  { project: "CEO Keynote — Stripe Sessions", amount: 450, date: "Mar 15, 2026", status: "Released" },
  { project: "Product Launch — Sonos Era 500", amount: 320, date: "Mar 10, 2026", status: "Released" },
  { project: "Social Cutdowns — Allbirds Spring", amount: 280, date: "Mar 22, 2026", status: "Pending" },
  { project: "Event Recap — Web Summit", amount: 550, date: "Mar 25, 2026", status: "Pending" },
  { project: "Tutorial Ep.3 — Figma Variables", amount: 180, date: "Feb 28, 2026", status: "Flagged" },
];

const statusColors: Record<string, string> = {
  Released: "text-success",
  Pending: "text-accent",
  Flagged: "text-destructive",
};

const metrics = [
  { label: "Held Balance", value: "$830", icon: DollarSign, color: "text-accent" },
  { label: "Total Earned", value: "$13,070", icon: TrendingUp, color: "text-success" },
  { label: "Next Payout", value: "Mar 28", icon: Calendar, color: "text-primary" },
];

export default function EditorEarnings() {
  return (
    <DashboardLayout role="editor">
      <div className="p-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Earnings</h1>
        <p className="text-muted-foreground text-sm mb-8">Track your income and manage payouts.</p>

        {/* Stripe Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4 mb-8 flex items-center justify-between border-primary/20"
        >
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Connect your Stripe account</p>
              <p className="text-xs text-muted-foreground">Required to receive payouts. Set up takes 2 minutes.</p>
            </div>
          </div>
          <Button variant="hero" size="sm">
            Connect Stripe <ExternalLink className="w-3.5 h-3.5" />
          </Button>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-8">
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

        {/* Chart */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Monthly Earnings</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(228 20% 18%)" />
                <XAxis dataKey="month" stroke="hsl(215 20% 55%)" fontSize={12} />
                <YAxis stroke="hsl(215 20% 55%)" fontSize={12} tickFormatter={(v) => `$${v}`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(228 50% 11%)", border: "1px solid hsl(228 20% 18%)", borderRadius: "8px", color: "hsl(210 40% 97%)" }}
                  formatter={(value: number) => [`$${value}`, "Earnings"]}
                />
                <Bar dataKey="amount" fill="hsl(263 70% 58%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payouts Table */}
        <div className="glass-card overflow-hidden">
          <div className="p-5 border-b border-white/5">
            <h2 className="text-lg font-semibold text-foreground">Payout History</h2>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {["Project", "Amount", "Date", "Status"].map((h) => (
                  <th key={h} className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payouts.map((p, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-secondary/30 transition-colors">
                  <td className="px-5 py-4 text-sm font-medium text-foreground">{p.project}</td>
                  <td className="px-5 py-4 text-sm text-foreground">${p.amount}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{p.date}</td>
                  <td className="px-5 py-4">
                    <span className={`text-sm font-medium ${statusColors[p.status]}`}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
