import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Shield, Globe, Bell, Database, Save, Percent, Clock, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DashboardLayout from "@/components/DashboardLayout";

const tabs = [
  { id: "platform", label: "Platform", icon: Globe },
  { id: "pricing", label: "Pricing & Points", icon: Coins },
  { id: "moderation", label: "Moderation", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("platform");

  return (
    <DashboardLayout role="admin">
      <div className="page-padding">
        <div className="page-header">
          <h1 className="page-title">Platform Settings</h1>
          <p className="page-subtitle">Configure global platform behavior and policies.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-56 shrink-0">
            <div className="glass-card p-2 flex lg:flex-col gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors w-full text-left ${
                    activeTab === tab.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            {activeTab === "platform" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">General</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Platform Name</label>
                      <Input defaultValue="FrameCut" className="bg-secondary border-white/10" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Support Email</label>
                      <Input defaultValue="support@framecut.io" className="bg-secondary border-white/10" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Platform Description</label>
                      <Textarea
                        defaultValue="Where elite video editors meet ambitious brands."
                        className="bg-secondary border-white/10"
                      />
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Upload Limits</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Max File Size (GB)</label>
                      <Input type="number" defaultValue="10" className="bg-secondary border-white/10" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Allowed Formats</label>
                      <Input defaultValue="MP4, MOV, ProRes, MKV" className="bg-secondary border-white/10" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="hero"><Save className="w-4 h-4" /> Save Changes</Button>
                </div>
              </motion.div>
            )}

            {activeTab === "pricing" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Platform Commission</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        <span className="flex items-center gap-1"><Percent className="w-3.5 h-3.5" /> Commission Rate</span>
                      </label>
                      <Input type="number" defaultValue="30" className="bg-secondary border-white/10" />
                      <p className="text-xs text-muted-foreground mt-1">Percentage taken from each completed project payment.</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Payout Hold Period</span>
                      </label>
                      <Input type="number" defaultValue="7" className="bg-secondary border-white/10" />
                      <p className="text-xs text-muted-foreground mt-1">Days to hold payment after client approval.</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Points System</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Points per $1</label>
                      <Input type="number" defaultValue="20" className="bg-secondary border-white/10" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Min Application Cost</label>
                      <Input type="number" defaultValue="50" className="bg-secondary border-white/10" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Max Application Cost</label>
                      <Input type="number" defaultValue="200" className="bg-secondary border-white/10" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="hero"><Save className="w-4 h-4" /> Save Changes</Button>
                </div>
              </motion.div>
            )}

            {activeTab === "moderation" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Auto-Moderation Rules</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Auto-suspend after 3 disputes", description: "Automatically suspend editors with 3+ unresolved disputes", enabled: true },
                      { label: "Require portfolio for applications", description: "Editors must include a portfolio link when applying", enabled: true },
                      { label: "Auto-flag large payouts", description: "Flag payouts over $1,000 for manual review", enabled: false },
                      { label: "Content scanning", description: "Scan uploaded files for watermarks and copyrighted content", enabled: true },
                    ].map((rule) => (
                      <div key={rule.label} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-foreground">{rule.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{rule.description}</p>
                        </div>
                        <button className={`relative w-11 h-6 rounded-full transition-colors ${rule.enabled ? "bg-primary" : "bg-secondary"}`}>
                          <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${rule.enabled ? "left-[22px]" : "left-0.5"}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Editor Levels</h3>
                  <div className="space-y-3">
                    {[
                      { level: 1, name: "Newcomer", minScore: 0, maxProjects: 5 },
                      { level: 2, name: "Rising", minScore: 60, maxProjects: 15 },
                      { level: 3, name: "Pro", minScore: 80, maxProjects: "Unlimited" },
                      { level: 4, name: "Elite", minScore: 95, maxProjects: "Unlimited" },
                    ].map((level) => (
                      <div key={level.level} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30">
                        <div className="w-10 h-10 rounded-full gradient-violet flex items-center justify-center text-sm font-bold text-primary-foreground">
                          L{level.level}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{level.name}</p>
                          <p className="text-xs text-muted-foreground">Min score: {level.minScore} · Max projects: {level.maxProjects}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="hero"><Save className="w-4 h-4" /> Save Changes</Button>
                </div>
              </motion.div>
            )}

            {activeTab === "notifications" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Admin Notifications</h3>
                  <div className="space-y-4">
                    {[
                      { label: "New dispute opened", description: "Immediate notification when a dispute is filed", enabled: true },
                      { label: "Large payouts pending", description: "Payouts over $500 awaiting release", enabled: true },
                      { label: "New editor applications", description: "When an editor applies for platform access", enabled: true },
                      { label: "Daily summary", description: "Platform metrics delivered every morning at 9 AM", enabled: false },
                      { label: "System alerts", description: "Critical system errors and downtime warnings", enabled: true },
                    ].map((notif) => (
                      <div key={notif.label} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-foreground">{notif.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{notif.description}</p>
                        </div>
                        <button className={`relative w-11 h-6 rounded-full transition-colors ${notif.enabled ? "bg-primary" : "bg-secondary"}`}>
                          <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${notif.enabled ? "left-[22px]" : "left-0.5"}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}