import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Film, Tag, ArrowRight, Filter, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/DashboardLayout";
import EditorApplicationModal from "@/components/EditorApplicationModal";

const jobs = [
  { id: 1, title: "Q1 Brand Anthem — Nike Running", industry: "Sportswear", length: "60s", minutes: 15, posted: "2 hours ago", points: 50 },
  { id: 2, title: "Product Launch Reel — Sonos Era 500", industry: "Consumer Electronics", length: "90s", minutes: 22, posted: "5 hours ago", points: 50 },
  { id: 3, title: "Social Cutdowns — Allbirds Spring '26", industry: "Fashion / DTC", length: "30s × 4", minutes: 30, posted: "8 hours ago", points: 75 },
  { id: 4, title: "CEO Keynote Highlights — Stripe Sessions", industry: "Fintech", length: "3 min", minutes: 45, posted: "1 day ago", points: 100 },
  { id: 5, title: "Event Recap — Web Summit 2026", industry: "Tech Events", length: "5 min", minutes: 60, posted: "1 day ago", points: 100 },
  { id: 6, title: "Tutorial Series Ep.4 — Figma Plugins", industry: "SaaS / Design", length: "8 min", minutes: 90, posted: "2 days ago", points: 75 },
];

const filters = {
  length: ["< 60s", "1–3 min", "3–5 min", "5+ min"],
  style: ["Cinematic", "Fast-paced", "Minimal", "Documentary", "Social-first"],
};

export default function EditorMarketplace() {
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);

  return (
    <DashboardLayout role="editor">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Job Board</h1>
          <p className="text-muted-foreground text-sm">Browse available projects and apply to ones that match your skills.</p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="hidden lg:block w-64 shrink-0">
            <div className="glass-card p-5 sticky top-8 space-y-6">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <Filter className="w-4 h-4" /> Filters
              </div>
              {Object.entries(filters).map(([key, values]) => (
                <div key={key}>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">{key === "length" ? "Video Length" : "Style"}</p>
                  <div className="space-y-2">
                    {values.map((v) => (
                      <label key={v} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                        <input type="checkbox" className="rounded border-white/20 bg-secondary text-primary focus:ring-primary" />
                        {v}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Job Grid */}
          <div className="flex-1 grid md:grid-cols-2 gap-4">
            {jobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card-hover p-6 flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-foreground font-semibold leading-tight">{job.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary text-xs text-muted-foreground">
                    <Tag className="w-3 h-3" /> {job.industry}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary text-xs text-muted-foreground">
                    <Film className="w-3 h-3" /> {job.length}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10 text-xs text-accent font-medium">
                    <Clock className="w-3 h-3" /> {job.minutes} min
                  </span>
                </div>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{job.posted}</span>
                    <span className="inline-flex items-center gap-1 text-xs text-accent">
                      <Coins className="w-3 h-3" /> {job.points} pts to apply
                    </span>
                  </div>
                  <Button variant="default" size="sm" onClick={() => setSelectedJob(job)}>
                    Apply <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {selectedJob && <EditorApplicationModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </DashboardLayout>
  );
}
