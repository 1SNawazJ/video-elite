import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Paperclip, Upload, CheckCircle, Clock, FileVideo, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/DashboardLayout";

const breadcrumbs = ["Brief Received", "In Progress", "Delivered", "Client Review", "Approved"];
const currentStep = 2;

const messages = [
  { sender: "client", name: "Sarah Chen", text: "Hi Marcus! Brief is attached. We want a cinematic feel with high energy pacing.", time: "9:00 AM", isFile: false },
  { sender: "client", name: "Sarah Chen", text: "nike_brief_v2.pdf", time: "9:01 AM", isFile: true },
  { sender: "editor", name: "Marcus Rivera", text: "Got it! I'll review the footage and brief, and have a first cut by tomorrow.", time: "9:15 AM", isFile: false },
  { sender: "editor", name: "Marcus Rivera", text: "Quick question — do you want the logo sting at the end or the beginning?", time: "11:30 AM", isFile: false },
  { sender: "client", name: "Sarah Chen", text: "End please! After the final shot.", time: "11:45 AM", isFile: false },
];

const deliverables = [
  { name: "nike_anthem_v1_draft.mp4", size: "245 MB", date: "Mar 19", status: "Delivered" },
];

export default function EditorWorkspace() {
  const [newMessage, setNewMessage] = useState("");
  const [uploadingDeliverable, setUploadingDeliverable] = useState(false);

  const handleUpload = () => {
    setUploadingDeliverable(true);
    setTimeout(() => setUploadingDeliverable(false), 2000);
  };

  return (
    <DashboardLayout role="editor">
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        {/* Project Header */}
        <div className="px-6 py-3 border-b border-white/5 bg-card/30">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Q1 Brand Anthem — Nike Running</h2>
              <p className="text-xs text-muted-foreground">Client: Sarah Chen · Due: Mar 22, 2026</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent/10 text-xs text-accent font-medium">
                <Clock className="w-3 h-3" /> 3 days left
              </span>
              <span className="text-sm font-medium text-foreground">$350</span>
            </div>
          </div>
          {/* Progress */}
          <div className="flex items-center gap-2 overflow-x-auto">
            {breadcrumbs.map((b, i) => (
              <div key={b} className="flex items-center gap-2 shrink-0">
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                  i < currentStep ? "bg-success/10 text-success" : i === currentStep ? "gradient-violet text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}>
                  {i < currentStep && <CheckCircle className="w-3 h-3" />}
                  {b}
                </div>
                {i < breadcrumbs.length - 1 && <div className="w-6 h-px bg-white/10" />}
              </div>
            ))}
          </div>
        </div>

        {/* Split Pane */}
        <div className="flex-1 flex min-h-0">
          {/* Deliverables + Upload */}
          <div className="flex-1 border-r border-white/5 p-6 flex flex-col">
            <h3 className="text-sm font-semibold text-foreground mb-4">Deliverables</h3>

            {/* Existing Deliverables */}
            <div className="space-y-3 mb-6">
              {deliverables.map((d) => (
                <div key={d.name} className="glass-card p-4 flex items-center gap-3">
                  <FileVideo className="w-5 h-5 text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{d.name}</p>
                    <p className="text-xs text-muted-foreground">{d.size} · {d.date}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/10 text-xs text-success font-medium">
                    <CheckCircle className="w-3 h-3" /> {d.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Upload Area */}
            <div
              onClick={handleUpload}
              className="flex-1 min-h-[200px] rounded-xl border-2 border-dashed border-white/10 hover:border-primary/40 transition-colors cursor-pointer flex flex-col items-center justify-center"
            >
              {uploadingDeliverable ? (
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 animate-pulse">
                    <Upload className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm text-foreground font-medium">Uploading...</p>
                  <div className="w-48 h-2 rounded-full bg-secondary mt-3 overflow-hidden">
                    <motion.div
                      className="h-full gradient-violet"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2 }}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-foreground font-medium">Upload your deliverable</p>
                  <p className="text-xs text-muted-foreground mt-1">MP4, MOV, ProRes — up to 10GB</p>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="hero" className="flex-1">
                <Upload className="w-4 h-4" /> Submit Delivery
              </Button>
            </div>

            {/* Tip */}
            <div className="mt-4 rounded-xl bg-info/5 border border-info/20 p-3 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-info shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                Once you submit your delivery, the client will be notified to review. Make sure your file matches the brief requirements.
              </p>
            </div>
          </div>

          {/* Chat Side */}
          <div className="w-full max-w-md flex flex-col">
            <div className="p-4 border-b border-white/5">
              <h3 className="text-sm font-semibold text-foreground">Project Chat</h3>
              <p className="text-xs text-muted-foreground">Communicate with the client</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex ${m.sender === "editor" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] ${
                    m.sender === "editor"
                      ? "bg-primary/20 border-primary/20"
                      : "bg-secondary border-white/5"
                  } border rounded-2xl px-4 py-2.5`}>
                    <p className="text-xs text-muted-foreground mb-1">{m.name}</p>
                    {m.isFile ? (
                      <div className="flex items-center gap-2 text-sm text-primary">
                        <Paperclip className="w-3.5 h-3.5" /> {m.text}
                      </div>
                    ) : (
                      <p className="text-sm text-foreground">{m.text}</p>
                    )}
                    <p className="text-[10px] text-muted-foreground mt-1 text-right">{m.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="p-4 border-t border-white/5">
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="shrink-0"><Paperclip className="w-4 h-4" /></Button>
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="bg-secondary border-white/10"
                />
                <Button variant="default" size="icon" className="shrink-0"><Send className="w-4 h-4" /></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}