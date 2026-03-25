import { useState } from "react";
import { motion } from "framer-motion";
import { Award, CheckCircle, XCircle, ExternalLink, Star, Eye, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";

const pendingEditors = [
  {
    id: 1,
    name: "James Wilson",
    email: "james@wilson.edit",
    applied: "Mar 18, 2026",
    portfolio: "https://jameswilson.co/reel",
    experience: "3 years",
    specializations: ["Motion Graphics", "Social Media", "Fast-paced"],
    sampleWork: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=250&fit=crop",
    bio: "Freelance editor specializing in motion graphics and social media content. Previously worked with startups and DTC brands.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@sharmaedits.com",
    applied: "Mar 17, 2026",
    portfolio: "https://priyasharma.film",
    experience: "5 years",
    specializations: ["Cinematic", "Documentary", "Color Grading"],
    sampleWork: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400&h=250&fit=crop",
    bio: "Documentary filmmaker turned commercial editor. Award-winning work in branded content and cinematic storytelling.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Liam O'Brien",
    email: "liam@obrien.video",
    applied: "Mar 16, 2026",
    portfolio: "https://liamobrien.tv",
    experience: "1 year",
    specializations: ["Social Media", "Minimal"],
    sampleWork: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=250&fit=crop",
    bio: "Recent film school graduate passionate about minimalist editing and clean visual storytelling.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face",
  },
];

export default function AdminEditorReview() {
  const [reviewed, setReviewed] = useState<Set<number>>(new Set());
  const [selectedEditor, setSelectedEditor] = useState<typeof pendingEditors[0] | null>(pendingEditors[0]);

  const handleApprove = (id: number) => setReviewed((prev) => new Set(prev).add(id));
  const handleReject = (id: number) => setReviewed((prev) => new Set(prev).add(id));

  return (
    <DashboardLayout role="admin">
      <div className="page-padding">
        <div className="page-header">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Award className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="page-title">Editor Review</h1>
              <p className="page-subtitle">{pendingEditors.length - reviewed.size} applications pending review.</p>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Application List */}
          <div className="w-80 shrink-0 space-y-3">
            {pendingEditors.map((editor) => (
              <motion.div
                key={editor.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: reviewed.has(editor.id) ? 0.4 : 1, x: 0 }}
                onClick={() => !reviewed.has(editor.id) && setSelectedEditor(editor)}
                className={`glass-card p-4 cursor-pointer transition-all ${
                  selectedEditor?.id === editor.id ? "border-primary/40" : "hover:border-white/20"
                } ${reviewed.has(editor.id) ? "pointer-events-none" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={editor.image}
                    alt={editor.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{editor.name}</p>
                    <p className="text-xs text-muted-foreground">{editor.experience} experience</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" /> Applied {editor.applied}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Detail Panel */}
          {selectedEditor && !reviewed.has(selectedEditor.id) && (
            <motion.div
              key={selectedEditor.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1"
            >
              <div className="glass-card overflow-hidden">
                {/* Sample Work */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={selectedEditor.sampleWork}
                    alt="Sample work"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>

                <div className="p-6 space-y-6">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <img
                      src={selectedEditor.image}
                      alt={selectedEditor.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white/10"
                    />
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-foreground">{selectedEditor.name}</h2>
                      <p className="text-sm text-muted-foreground">{selectedEditor.email}</p>
                      <p className="text-sm text-muted-foreground mt-1">{selectedEditor.experience} experience</p>
                    </div>
                    <a
                      href={selectedEditor.portfolio}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      Portfolio <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Bio */}
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-2">About</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{selectedEditor.bio}</p>
                  </div>

                  {/* Specializations */}
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-2">Specializations</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEditor.specializations.map((s) => (
                        <span
                          key={s}
                          className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-white/5">
                    <Button
                      variant="success"
                      className="flex-1"
                      size="lg"
                      onClick={() => handleApprove(selectedEditor.id)}
                    >
                      <CheckCircle className="w-4 h-4" /> Approve Editor
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-destructive/30 text-destructive hover:bg-destructive/10"
                      size="lg"
                      onClick={() => handleReject(selectedEditor.id)}
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {(!selectedEditor || reviewed.has(selectedEditor.id)) && (
            <div className="flex-1 glass-card p-12 flex items-center justify-center">
              <div className="text-center">
                <Award className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-foreground font-medium">Select an application to review</p>
                <p className="text-sm text-muted-foreground mt-1">Click on an editor from the list to see their details.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}