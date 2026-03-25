import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, MessageSquare, Clock, CheckCircle, XCircle, Eye, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";

const disputes = [
  {
    id: "D-001",
    project: "Tutorial Series Ep.3 — Figma Variables",
    client: "Acme Corp",
    editor: "Alex Morgan",
    reason: "Quality below expectations — color grading doesn't match brief",
    amount: "$180",
    filed: "Mar 16, 2026",
    status: "Open",
    priority: "High",
    messages: 4,
  },
  {
    id: "D-002",
    project: "Instagram Reels — Summer Collection",
    client: "Bolt Commerce",
    editor: "Yuki Tanaka",
    reason: "Missed deadline by 3 days, no communication",
    amount: "$320",
    filed: "Mar 14, 2026",
    status: "Under Review",
    priority: "Medium",
    messages: 8,
  },
  {
    id: "D-003",
    project: "Product Demo — TechFlow SaaS",
    client: "TechFlow Inc",
    editor: "Marcus Rivera",
    reason: "Scope disagreement — client requested extra work not in brief",
    amount: "$450",
    filed: "Mar 10, 2026",
    status: "Resolved",
    priority: "Low",
    resolution: "Split — $225 released to editor",
    messages: 12,
  },
  {
    id: "D-004",
    project: "Brand Video — Organic Harvest",
    client: "Organic Harvest",
    editor: "Sofia Petrov",
    reason: "Watermarked stock footage used without permission",
    amount: "$280",
    filed: "Mar 8, 2026",
    status: "Resolved",
    priority: "High",
    resolution: "Full refund to client, editor warning issued",
    messages: 6,
  },
];

const priorityColors: Record<string, string> = {
  High: "bg-destructive/10 text-destructive",
  Medium: "bg-accent/10 text-accent",
  Low: "bg-info/10 text-info",
};

const statusColors: Record<string, string> = {
  Open: "bg-destructive/10 text-destructive",
  "Under Review": "bg-accent/10 text-accent",
  Resolved: "bg-success/10 text-success",
};

export default function AdminDisputes() {
  const [selectedDispute, setSelectedDispute] = useState<typeof disputes[0] | null>(null);

  const open = disputes.filter((d) => d.status !== "Resolved").length;
  const resolved = disputes.filter((d) => d.status === "Resolved").length;

  return (
    <DashboardLayout role="admin">
      <div className="page-padding">
        <div className="page-header">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <h1 className="page-title">Disputes</h1>
              <p className="page-subtitle">{open} open · {resolved} resolved</p>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Disputes List */}
          <div className="flex-1 space-y-4">
            {disputes.map((dispute, i) => (
              <motion.div
                key={dispute.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedDispute(dispute)}
                className={`glass-card-interactive p-5 ${selectedDispute?.id === dispute.id ? "border-primary/40" : ""}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-muted-foreground">{dispute.id}</span>
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${priorityColors[dispute.priority]}`}>
                        {dispute.priority}
                      </span>
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[dispute.status]}`}>
                        {dispute.status}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">{dispute.project}</h3>
                  </div>
                  <span className="text-sm font-medium text-foreground">{dispute.amount}</span>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{dispute.reason}</p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span>Client: {dispute.client}</span>
                    <span>Editor: {dispute.editor}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {dispute.messages}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {dispute.filed}</span>
                  </div>
                </div>

                {dispute.resolution && (
                  <div className="mt-3 pt-3 border-t border-white/5">
                    <p className="text-xs text-success flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> {dispute.resolution}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Detail Panel */}
          {selectedDispute && selectedDispute.status !== "Resolved" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-80 shrink-0"
            >
              <div className="glass-card p-5 sticky top-8 space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Resolution Actions</h3>

                <Button variant="success" className="w-full">
                  <CheckCircle className="w-4 h-4" /> Refund Client
                </Button>
                <Button variant="hero" className="w-full">
                  <DollarSignIcon /> Release to Editor
                </Button>
                <Button variant="outline" className="w-full">
                  Split Payment
                </Button>
                <Button variant="outline" className="w-full border-destructive/30 text-destructive hover:bg-destructive/10">
                  <XCircle className="w-4 h-4" /> Suspend Editor
                </Button>

                <div className="border-t border-white/5 pt-4">
                  <p className="text-xs text-muted-foreground">
                    Review all messages and evidence before making a decision. All actions are logged and irreversible.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

function DollarSignIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
}