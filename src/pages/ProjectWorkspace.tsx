import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Paperclip, RotateCcw, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/DashboardLayout";

const breadcrumbs = ["Brief Submitted", "Editor Assigned", "Delivery", "In Review", "Approved"];
const currentStep = 3;

const messages = [
  { sender: "editor", name: "Marcus Rivera", text: "Hey Sarah! First cut is uploaded. Went with a more cinematic grade as you requested.", time: "10:32 AM", isFile: false },
  { sender: "client", name: "Sarah Chen", text: "This looks amazing! Can we tighten the pacing in the first 15 seconds though?", time: "10:45 AM", isFile: false },
  { sender: "editor", name: "Marcus Rivera", text: "Sure thing, I'll have a revised cut by end of day.", time: "10:47 AM", isFile: false },
  { sender: "editor", name: "Marcus Rivera", text: "nike_anthem_v2_revised.mp4", time: "4:15 PM", isFile: true },
  { sender: "client", name: "Sarah Chen", text: "Perfect — reviewing now!", time: "4:22 PM", isFile: false },
];

export default function ProjectWorkspace() {
  const [newMessage, setNewMessage] = useState("");

  return (
    <DashboardLayout role="client">
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        {/* Breadcrumb */}
        <div className="px-8 py-4 border-b border-white/5">
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
          {/* Video Side */}
          <div className="flex-1 border-r border-white/5 p-6 flex flex-col">
            <div className="flex-1 rounded-xl bg-secondary/50 border border-white/5 flex items-center justify-center mb-6 overflow-hidden">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <div className="w-0 h-0 border-l-[12px] border-l-primary border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
                </div>
                <p className="text-sm text-muted-foreground">nike_anthem_v2_revised.mp4</p>
                <p className="text-xs text-muted-foreground mt-1">1:02 · 1080p · 48MB</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 border-accent/30 text-accent hover:bg-accent/10">
                <RotateCcw className="w-4 h-4" /> Request Revision
              </Button>
              <Button variant="success" className="flex-1">
                <CheckCircle className="w-4 h-4" /> Approve & Release Payment
              </Button>
            </div>
          </div>

          {/* Chat Side */}
          <div className="w-full max-w-md flex flex-col">
            <div className="p-4 border-b border-white/5">
              <h3 className="text-sm font-semibold text-foreground">Project Chat</h3>
              <p className="text-xs text-muted-foreground">Q1 Brand Anthem — Nike Running</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex ${m.sender === "client" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] ${m.sender === "client" ? "bg-primary/20 border-primary/20" : "bg-secondary border-white/5"} border rounded-2xl px-4 py-2.5`}>
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
