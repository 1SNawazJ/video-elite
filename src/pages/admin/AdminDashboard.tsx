import { motion } from "framer-motion";
import {
  Users, Briefcase, DollarSign, AlertTriangle, TrendingUp,
  ArrowUpRight, ArrowDownRight, Activity,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const kpis = [
  { label: "Total Users", value: "2,847", change: "+12%", up: true, icon: Users, color: "text-primary" },
  { label: "Active Projects", value: "184", change: "+8%", up: true, icon: Briefcase, color: "text-info" },
  { label: "Revenue (MTD)", value: "$47,320", change: "+23%", up: true, icon: DollarSign, color: "text-success" },
  { label: "Open Disputes", value: "7", change: "-3", up: false, icon: AlertTriangle, color: "text-destructive" },
];

const revenueData = [
  { month: "Oct", revenue: 28000, payouts: 19600 },
  { month: "Nov", revenue: 32000, payouts: 22400 },
  { month: "Dec", revenue: 38000, payouts: 26600 },
  { month: "Jan", revenue: 35000, payouts: 24500 },
  { month: "Feb", revenue: 42000, payouts: 29400 },
  { month: "Mar", revenue: 47320, payouts: 33124 },
];

const userGrowthData = [
  { month: "Oct", clients: 120, editors: 85 },
  { month: "Nov", clients: 145, editors: 110 },
  { month: "Dec", clients: 180, editors: 140 },
  { month: "Jan", clients: 210, editors: 165 },
  { month: "Feb", clients: 250, editors: 195 },
  { month: "Mar", clients: 290, editors: 230 },
];

const projectDistribution = [
  { name: "Open", value: 42, color: "hsl(263 70% 58%)" },
  { name: "Assigned", value: 65, color: "hsl(38 92% 50%)" },
  { name: "In Review", value: 38, color: "hsl(217 91% 60%)" },
  { name: "Completed", value: 120, color: "hsl(142 71% 45%)" },
  { name: "Disputed", value: 7, color: "hsl(0 84% 60%)" },
];

const recentActions = [
  { action: "New client registered", user: "Acme Corp", time: "5 min ago", type: "info" },
  { action: "Dispute raised", user: "Project #1847", time: "1 hour ago", type: "destructive" },
  { action: "Payout released", user: "$2,400 to Marcus Rivera", time: "2 hours ago", type: "success" },
  { action: "Editor verified", user: "Sofia Petrov (Level 2)", time: "3 hours ago", type: "primary" },
  { action: "Project completed", user: "Stripe Keynote Highlights", time: "5 hours ago", type: "success" },
  { action: "New editor application", user: "James Wilson", time: "6 hours ago", type: "accent" },
];

const tooltipStyle = {
  contentStyle: {
    backgroundColor: "hsl(228 50% 11%)",
    border: "1px solid hsl(228 20% 18%)",
    borderRadius: "8px",
    color: "hsl(210 40% 97%)",
  },
};

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin">
      <div className="page-padding">
        <div className="page-header">
          <h1 className="page-title">Admin Overview</h1>
          <p className="page-subtitle">Platform health and key metrics at a glance.</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-medium ${kpi.up ? "text-success" : "text-destructive"}`}>
                  {kpi.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {kpi.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
              <p className="text-sm text-muted-foreground">{kpi.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Revenue vs Payouts</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(228 20% 18%)" />
                  <XAxis dataKey="month" stroke="hsl(215 20% 55%)" fontSize={12} />
                  <YAxis stroke="hsl(215 20% 55%)" fontSize={12} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip {...tooltipStyle} formatter={(value: number) => [`$${value.toLocaleString()}`, ""]} />
                  <Bar dataKey="revenue" fill="hsl(263 70% 58%)" radius={[4, 4, 0, 0]} name="Revenue" />
                  <Bar dataKey="payouts" fill="hsl(142 71% 45%)" radius={[4, 4, 0, 0]} name="Payouts" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* User Growth Chart */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">User Growth</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(228 20% 18%)" />
                  <XAxis dataKey="month" stroke="hsl(215 20% 55%)" fontSize={12} />
                  <YAxis stroke="hsl(215 20% 55%)" fontSize={12} />
                  <Tooltip {...tooltipStyle} />
                  <Line type="monotone" dataKey="clients" stroke="hsl(263 70% 58%)" strokeWidth={2} dot={{ r: 4 }} name="Clients" />
                  <Line type="monotone" dataKey="editors" stroke="hsl(38 92% 50%)" strokeWidth={2} dot={{ r: 4 }} name="Editors" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Project Distribution */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Project Status</h2>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={projectDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                    {projectDistribution.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip {...tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-3 mt-2 justify-center">
              {projectDistribution.map((entry) => (
                <div key={entry.name} className="flex items-center gap-1.5 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-muted-foreground">{entry.name} ({entry.value})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="lg:col-span-2 glass-card">
            <div className="p-5 border-b border-white/5 flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
            </div>
            <div className="p-4 space-y-4">
              {recentActions.map((action, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-start gap-3 py-2"
                >
                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                    action.type === "success" ? "bg-success" :
                    action.type === "destructive" ? "bg-destructive" :
                    action.type === "primary" ? "bg-primary" :
                    action.type === "accent" ? "bg-accent" :
                    "bg-info"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{action.action}</p>
                    <p className="text-xs text-muted-foreground">{action.user}</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{action.time}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}