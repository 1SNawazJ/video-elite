import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Film, Tag, ArrowRight, Filter, Coins, Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/DashboardLayout";
import EditorApplicationModal from "@/components/EditorApplicationModal";

const jobs = [
  { id: 1, title: "Q1 Brand Anthem — Nike Running", industry: "Sportswear", length: "60s", minutes: 15, posted: "2 hours ago", points: 50, budget: "$300–500", image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=200&fit=crop" },
  { id: 2, title: "Product Launch Reel — Sonos Era 500", industry: "Consumer Electronics", length: "90s", minutes: 22, posted: "5 hours ago", points: 50, budget: "$400–600", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=200&fit=crop" },
  { id: 3, title: "Social Cutdowns — Allbirds Spring '26", industry: "Fashion / DTC", length: "30s × 4", minutes: 30, posted: "8 hours ago", points: 75, budget: "$500–800", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=200&fit=crop" },
  { id: 4, title: "CEO Keynote Highlights — Stripe Sessions", industry: "Fintech", length: "3 min", minutes: 45, posted: "1 day ago", points: 100, budget: "$600–1000", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop" },
  { id: 5, title: "Event Recap — Web Summit 2026", industry: "Tech Events", length: "5 min", minutes: 60, posted: "1 day ago", points: 100, budget: "$800–1200", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=200&fit=crop" },
  { id: 6, title: "Tutorial Series Ep.4 — Figma Plugins", industry: "SaaS / Design", length: "8 min", minutes: 90, posted: "2 days ago", points: 75, budget: "$400–700", image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=200&fit=crop" },
];

const filterOptions = {
  length: ["< 60s", "1–3 min", "3–5 min", "5+ min"],
  style: ["Cinematic", "Fast-paced", "Minimal", "Documentary", "Social-first"],
  points: ["50 pts", "75 pts", "100 pts"],
};

export default function EditorMarketplace() {
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="editor">
      <div className="page-padding">
        <div className="page-header">
          <h1 className="page-title">Job Board</h1>
          <p className="page-subtitle">Browse available projects and apply to ones that match your skills.</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="glass-card p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search projects by title or industry..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-secondary border-white/10"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "border-primary/40 text-primary" : ""}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilters.length > 0 && (
              <span className="ml-1 w-5 h-5 rounded-full gradient-violet text-primary-foreground text-xs flex items-center justify-center">
                {activeFilters.length}
              </span>
            )}
          </Button>
        </div>

        {/* Active Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="glass-card p-5 mb-6 overflow-hidden"
            >
              {Object.entries(filterOptions).map(([key, values]) => (
                <div key={key} className="mb-4 last:mb-0">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    {key === "length" ? "Video Length" : key === "points" ? "Point Cost" : "Style"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {values.map((v) => (
                      <button
                        key={v}
                        onClick={() => toggleFilter(v)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                          activeFilters.includes(v)
                            ? "bg-primary/20 border-primary/40 text-primary"
                            : "border-white/10 text-muted-foreground hover:border-white/20 hover:text-foreground"
                        }`}
                      >
                        {v}
                        {activeFilters.includes(v) && <X className="w-3 h-3 ml-1 inline" />}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              {activeFilters.length > 0 && (
                <button
                  onClick={() => setActiveFilters([])}
                  className="text-xs text-primary hover:underline mt-2"
                >
                  Clear all filters
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-4">{filteredJobs.length} projects available</p>

        {/* Job Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredJobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card-interactive overflow-hidden flex flex-col group"
            >
              {/* Thumbnail */}
              <div className="relative h-36 overflow-hidden">
                <img
                  src={job.image}
                  alt={job.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-background/80 backdrop-blur-sm text-xs text-accent font-medium">
                    <Coins className="w-3 h-3" /> {job.points} pts
                  </span>
                  <span className="text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    {job.budget}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-foreground font-semibold leading-tight mb-3">{job.title}</h3>
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
                  <span className="text-xs text-muted-foreground">{job.posted}</span>
                  <Button variant="default" size="sm" onClick={() => setSelectedJob(job)}>
                    Apply <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="glass-card p-12 text-center">
            <Search className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-foreground font-medium">No projects found</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedJob && <EditorApplicationModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
      </AnimatePresence>
    </DashboardLayout>
  );
}