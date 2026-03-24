import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, ExternalLink, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";

const applicants = [
  { id: 1, name: "Marcus Rivera", level: 3, score: 92, price: 350, portfolio: "https://marcusrivera.com/reel" },
  { id: 2, name: "Yuki Tanaka", level: 2, score: 78, price: 280, portfolio: "https://yukitanaka.dev" },
  { id: 3, name: "Sofia Petrov", level: 2, score: 84, price: 320, portfolio: "https://sofiapetrov.film" },
  { id: 4, name: "Alex Morgan", level: 1, score: 65, price: 200, portfolio: "https://alexmorgan.co" },
];

export default function AdminSelection() {
  const [accepted, setAccepted] = useState<number | null>(null);
  const [rejected, setRejected] = useState<Set<number>>(new Set());

  const handleReject = (id: number) => setRejected((prev) => new Set(prev).add(id));

  return (
    <DashboardLayout role="client">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Select an Editor</h1>
          <p className="text-muted-foreground text-sm">Review applications for "Q1 Brand Anthem — Nike Running"</p>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {["Editor", "Level", "Grading Score", "Price Offer", "Portfolio", "Action"].map((h) => (
                    <th key={h} className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {applicants.map((a) => {
                  const isAccepted = accepted === a.id;
                  const isRejected = rejected.has(a.id);
                  return (
                    <motion.tr
                      key={a.id}
                      className={`border-b border-white/5 transition-colors ${isAccepted ? "bg-success/5" : isRejected ? "opacity-40" : "hover:bg-secondary/30"}`}
                      animate={isAccepted ? { boxShadow: "inset 0 0 40px -10px hsl(142 71% 45% / 0.1)" } : {}}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full gradient-violet flex items-center justify-center text-xs font-semibold text-primary-foreground">
                            {a.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <span className="text-sm font-medium text-foreground">{a.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-xs text-primary font-medium">
                          <Award className="w-3 h-3" /> Level {a.level}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-1.5 rounded-full bg-secondary overflow-hidden">
                            <div className="h-full rounded-full gradient-violet" style={{ width: `${a.score}%` }} />
                          </div>
                          <span className="text-sm text-foreground">{a.score}/100</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm font-medium text-foreground">${a.price}</td>
                      <td className="px-5 py-4">
                        <a href={a.portfolio} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
                          View <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <Button
                            variant="success"
                            size="sm"
                            disabled={!!accepted || isRejected}
                            onClick={() => setAccepted(a.id)}
                          >
                            <Check className="w-3.5 h-3.5" /> Accept
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={!!accepted || isRejected}
                            onClick={() => handleReject(a.id)}
                          >
                            <X className="w-3.5 h-3.5" /> Reject
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
