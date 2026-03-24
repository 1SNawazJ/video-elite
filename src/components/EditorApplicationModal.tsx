import { motion } from "framer-motion";
import { AlertTriangle, Coins, Link2, Award, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Job {
  id: number;
  title: string;
  points: number;
}

export default function EditorApplicationModal({ job, onClose }: { job: Job; onClose: () => void }) {
  const level = 2;
  const progressToNext = 68;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative w-full max-w-md bg-card border-l border-white/5 p-6 overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Apply to Project</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
        </div>

        <p className="text-sm text-muted-foreground mb-6">{job.title}</p>

        {/* Level Badge */}
        <div className="glass-card p-4 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative w-14 h-14">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="24" fill="none" stroke="hsl(228 20% 18%)" strokeWidth="4" />
                <circle cx="28" cy="28" r="24" fill="none" stroke="hsl(263 70% 58%)" strokeWidth="4" strokeDasharray={`${2 * Math.PI * 24}`} strokeDashoffset={`${2 * Math.PI * 24 * (1 - progressToNext / 100)}`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Award className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div>
              <p className="text-foreground font-semibold">Level {level} Editor</p>
              <p className="text-xs text-muted-foreground">{progressToNext}% to Level {level + 1}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Grading Score: <span className="text-foreground font-medium">78 / 100</span></p>
        </div>

        {/* Form */}
        <div className="space-y-5 mb-6">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Your Price Offer ($)</label>
            <Input type="number" placeholder="250" className="bg-secondary border-white/10" defaultValue="350" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Portfolio URL</label>
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="https://your-portfolio.com" className="bg-secondary border-white/10 pl-9" defaultValue="https://marcusrivera.com/reel" />
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="rounded-xl bg-accent/10 border border-accent/20 p-4 flex items-start gap-3 mb-6">
          <AlertTriangle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-accent">Points Deduction Notice</p>
            <p className="text-xs text-muted-foreground mt-1">Applying will deduct <strong className="text-accent">{job.points} points</strong> from your balance. Points are non-refundable if your application is declined.</p>
          </div>
        </div>

        <Button variant="hero" className="w-full" size="lg">
          <Coins className="w-4 h-4" /> Submit Application ({job.points} pts)
        </Button>
      </motion.div>
    </div>
  );
}
