import { motion } from "framer-motion";
import { TrendingUp, Users, DollarSign, Clock, Star, Target } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, AreaChart, Area } from "recharts";

const conversionData = [
  { month: "Oct", signups: 145, activated: 98 },
  { month: "Nov", signups: 180, activated: 125 },
  { month: "Dec", signups: 210, activated: 155 },
  { month: "Jan", signups: 195, activated: 140 },
  { month: "Feb", signups: 250, activated: 190 },
  { month: "Mar", signups: 290, activated: 225 },
];

const turnaroundData = [
  { month: "Oct", hours: 38 },
  { month: "Nov", hours: 32 },
  { month: "Dec", hours: 28 },
  { month: "Jan", hours: 25 },
  { month: "Feb", hours: 22 },
  { month: "Mar", hours: 20 },
];

const satisfactionData = [
  { month: "Oct", score: 4.5 },
  { month: "Nov", score: 4.6 },
  { month: "Dec", score: 4.7 },
  { month: "Jan", score: 4.7 },
  { month: "Feb", score: 4.8 },
  { month: "Mar", score: 4.9 },
];

const revenueByPlan = [
  { plan: "Starter", revenue: 8820, users: 180 },
  { plan: "Growth", revenue: 22350, users: 150 },
  { plan: "Agency", revenue: 15960, users: 40 },
];

const topEditors = [
  { name: "Marcus Rivera", projects: 28, rating: 4.9, earnings: "$12,400", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" },
  { name: "Yuki Tanaka", projects: 15, rating: 4.8, earnings: "$6,800", image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=40&h=40&fit=crop&crop=face" },
  { name: "Sofia Petrov", projects: 11, rating: 4.7, earnings: "$4,200", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" },
  { name: "Alex Morgan", projects: 5, rating: 3.8, earnings: "$1,800", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" },
];

const tooltipStyle = {
  contentStyle: {
    backgroundColor: "hsl(228 50% 11%)",
    border: "1px solid hsl(228 20% 18%)",
    borderRadius: "8px",
    color: "hsl(210 40% 97%)",
  },
};

const kpis = [
  { label: "Conversion Rate", value: "77.6%", change: "+4.2%", icon: Target, color: "text-primary" },
  { label: "Avg Turnaround", value: "20h", change: "-8h", icon: Clock, color: "text-success" },
  { label: "Satisfaction", value: "4.9/5", change: "+0.1", icon: Star, color: "text-accent" },
  { label: "MRR", value: "$47.1K", change: "+23%", icon: DollarSign, color: "text-info" },
];

export default function AdminAnalytics() {
  return (
    <DashboardLayout role="admin">
      <div className="page-padding">
        <div className="page-header">
          <h1 className="page-title">Analytics</h1>
          <p className="page-subtitle">Platform performance and insights.</p>
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
              <kpi.icon className={`w-5 h-5 ${kpi.color} mb-3`} />
              <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-muted-foreground">{kpi.label}</span>
                <span className="text-xs text-success font-medium">{kpi.change}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Conversion Funnel */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Signup → Activation</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conversionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(228 20% 18%)" />
                  <XAxis dataKey="month" stroke="hsl(215 20% 55%)" fontSize={12} />
                  <YAxis stroke="hsl(215 20% 55%)" fontSize={12} />
                  <Tooltip {...tooltipStyle} />
                  <Bar dataKey="signups" fill="hsl(228 40% 25%)" radius={[4, 4, 0, 0]} name="Signups" />
                  <Bar dataKey="activated" fill="hsl(263 70% 58%)" radius={[4, 4, 0, 0]} name="Activated" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Turnaround Trend */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Avg Turnaround Time</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={turnaroundData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(228 20% 18%)" />
                  <XAxis dataKey="month" stroke="hsl(215 20% 55%)" fontSize={12} />
                  <YAxis stroke="hsl(215 20% 55%)" fontSize={12} tickFormatter={(v) => `${v}h`} />
                  <Tooltip {...tooltipStyle} formatter={(value: number) => [`${value}h`, "Turnaround"]} />
                  <Area type="monotone" dataKey="hours" stroke="hsl(142 71% 45%)" fill="hsl(142 71% 45% / 0.1)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Revenue by Plan */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Revenue by Plan</h2>
            <div className="space-y-4">
              {revenueByPlan.map((plan) => (
                <div key={plan.plan} className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-foreground">{plan.plan}</div>
                  <div className="flex-1">
                    <div className="h-3 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full gradient-violet"
                        style={{ width: `${(plan.revenue / 25000) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-medium text-foreground">${(plan.revenue / 1000).toFixed(1)}K</p>
                    <p className="text-xs text-muted-foreground">{plan.users} users</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Editors */}
          <div className="glass-card">
            <div className="p-5 border-b border-white/5">
              <h2 className="text-lg font-semibold text-foreground">Top Editors</h2>
            </div>
            <div className="p-4 space-y-3">
              {topEditors.map((editor, i) => (
                <div key={editor.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/30 transition-colors">
                  <span className="text-sm font-bold text-muted-foreground w-6">#{i + 1}</span>
                  <img
                    src={editor.image}
                    alt={editor.name}
                    className="w-8 h-8 rounded-full object-cover border border-white/10"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{editor.name}</p>
                    <p className="text-xs text-muted-foreground">{editor.projects} projects</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{editor.earnings}</p>
                    <div className="flex items-center gap-0.5 justify-end">
                      <Star className="w-3 h-3 text-accent fill-current" />
                      <span className="text-xs text-muted-foreground">{editor.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}