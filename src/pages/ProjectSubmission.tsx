import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Upload, Check, FileVideo, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DashboardLayout from "@/components/DashboardLayout";

const steps = ["Project Details", "Upload Footage", "Confirm & Submit"];

export default function ProjectSubmission() {
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const simulateUpload = () => {
    setFiles(["brand_anthem_raw_v2.mp4", "b-roll_outdoor_4k.mov"]);
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setUploadProgress(p);
      if (p >= 100) clearInterval(interval);
    }, 200);
  };

  return (
    <DashboardLayout role="client">
      <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-2">Submit New Project</h1>
        <p className="text-muted-foreground text-sm mb-8">Fill out the brief, upload your footage, and confirm minutes.</p>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 transition-colors ${
                i < step ? "bg-success text-primary-foreground" : i === step ? "gradient-violet text-primary-foreground" : "bg-secondary text-muted-foreground"
              }`}>
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-sm hidden sm:block ${i === step ? "text-foreground font-medium" : "text-muted-foreground"}`}>{s}</span>
              {i < steps.length - 1 && <div className="flex-1 h-px bg-white/10 mx-2" />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="glass-card p-6 space-y-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Project Title</label>
                  <Input placeholder="e.g. Q2 Brand Campaign — Nike" className="bg-secondary border-white/10" defaultValue="Q1 Brand Anthem — Nike Running" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Description</label>
                  <Textarea placeholder="Describe your video project..." className="bg-secondary border-white/10 min-h-[120px]" defaultValue="60-second anthem video for Nike Running's spring campaign. Need dynamic pacing, cinematic color grade, and on-screen text overlays. Music track provided." />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Desired Style</label>
                  <div className="flex flex-wrap gap-2">
                    {["Cinematic", "Fast-paced", "Minimal", "Documentary", "Social-first"].map((style) => (
                      <button key={style} className="px-3 py-1.5 rounded-full text-sm border border-white/10 text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors data-[selected=true]:bg-primary/10 data-[selected=true]:border-primary/40 data-[selected=true]:text-primary" data-selected={style === "Cinematic"}>
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button variant="hero" onClick={() => setStep(1)}>Continue <ArrowRight className="w-4 h-4" /></Button>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div
                onClick={simulateUpload}
                className="glass-card p-12 border-dashed border-2 border-white/10 hover:border-primary/40 transition-colors cursor-pointer text-center"
              >
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-foreground font-medium mb-1">Drag & drop your raw footage here</p>
                <p className="text-sm text-muted-foreground">MP4, MOV, ProRes — up to 10GB per file</p>
              </div>
              {files.length > 0 && (
                <div className="space-y-3">
                  {files.map((f) => (
                    <div key={f} className="glass-card p-4 flex items-center gap-3">
                      <FileVideo className="w-5 h-5 text-primary" />
                      <span className="text-sm text-foreground flex-1">{f}</span>
                      <button className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
                    </div>
                  ))}
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <motion.div className="h-full gradient-violet" initial={{ width: 0 }} animate={{ width: `${uploadProgress}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground text-right">{uploadProgress}% uploaded</p>
                </div>
              )}
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(0)}><ArrowLeft className="w-4 h-4" /> Back</Button>
                <Button variant="hero" onClick={() => setStep(2)}>Continue <ArrowRight className="w-4 h-4" /></Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="glass-card p-6 space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Project Summary</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-muted-foreground">Title:</span><p className="text-foreground font-medium">Q1 Brand Anthem — Nike Running</p></div>
                  <div><span className="text-muted-foreground">Style:</span><p className="text-foreground font-medium">Cinematic</p></div>
                  <div><span className="text-muted-foreground">Files:</span><p className="text-foreground font-medium">2 files uploaded</p></div>
                  <div><span className="text-muted-foreground">Estimated Length:</span><p className="text-foreground font-medium">~60 seconds</p></div>
                </div>
                <div className="border-t border-white/5 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground font-medium">Minutes to Deduct</span>
                    <span className="text-2xl font-bold text-accent">15 min</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">You'll have 58 minutes remaining this month after submission.</p>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}><ArrowLeft className="w-4 h-4" /> Back</Button>
                <Button variant="hero" size="lg">Submit Project <Check className="w-4 h-4" /></Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
