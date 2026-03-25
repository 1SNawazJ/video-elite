import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, CreditCard, Shield, Camera, Save, Mail, Link2, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DashboardLayout from "@/components/DashboardLayout";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "portfolio", label: "Portfolio", icon: Link2 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "payout", label: "Payout", icon: CreditCard },
  { id: "security", label: "Security", icon: Shield },
];

const skills = ["Color Grading", "Motion Graphics", "Sound Design", "Social Media", "Cinematic", "Documentary", "Fast-paced", "Typography"];

export default function EditorSettings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedSkills, setSelectedSkills] = useState(["Color Grading", "Cinematic", "Motion Graphics"]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  return (
    <DashboardLayout role="editor">
      <div className="page-padding">
        <div className="page-header">
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Manage your editor profile, portfolio, and payouts.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-56 shrink-0">
            <div className="glass-card p-2 flex lg:flex-col gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors w-full text-left ${
                    activeTab === tab.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            {activeTab === "profile" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Profile Photo</h3>
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face"
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover border-2 border-white/10"
                      />
                      <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full gradient-violet flex items-center justify-center">
                        <Camera className="w-3.5 h-3.5 text-primary-foreground" />
                      </button>
                    </div>
                    <div>
                      <p className="text-sm text-foreground font-medium">Marcus Rivera</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Award className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs text-primary font-medium">Level 3 Editor</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">First Name</label>
                      <Input defaultValue="Marcus" className="bg-secondary border-white/10" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Last Name</label>
                      <Input defaultValue="Rivera" className="bg-secondary border-white/10" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input defaultValue="marcus@riverflow.co" className="bg-secondary border-white/10 pl-9" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Bio</label>
                    <Textarea
                      defaultValue="Freelance video editor specializing in cinematic brand content. 5+ years experience with Nike, Apple, and Sony."
                      className="bg-secondary border-white/10 min-h-[80px]"
                    />
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Skills & Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                          selectedSkills.includes(skill)
                            ? "bg-primary/10 border-primary/40 text-primary"
                            : "border-white/10 text-muted-foreground hover:border-white/20"
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="hero"><Save className="w-4 h-4" /> Save Changes</Button>
                </div>
              </motion.div>
            )}

            {activeTab === "portfolio" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Portfolio Links</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Website / Reel</label>
                      <div className="relative">
                        <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input defaultValue="https://marcusrivera.com/reel" className="bg-secondary border-white/10 pl-9" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">YouTube Channel</label>
                      <div className="relative">
                        <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input defaultValue="https://youtube.com/@marcusrivera" className="bg-secondary border-white/10 pl-9" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Vimeo</label>
                      <div className="relative">
                        <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input placeholder="https://vimeo.com/..." className="bg-secondary border-white/10 pl-9" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Showcase Projects</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { title: "Nike Air Max Campaign", image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=300&h=200&fit=crop" },
                      { title: "Sonos Product Launch", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=200&fit=crop" },
                    ].map((project) => (
                      <div key={project.title} className="rounded-xl overflow-hidden border border-white/10">
                        <img src={project.image} alt={project.title} className="w-full h-32 object-cover" />
                        <div className="p-3 bg-secondary/50">
                          <p className="text-sm font-medium text-foreground">{project.title}</p>
                        </div>
                      </div>
                    ))}
                    <button className="rounded-xl border-2 border-dashed border-white/10 hover:border-primary/40 transition-colors h-32 flex items-center justify-center text-muted-foreground hover:text-primary">
                      <span className="text-sm">+ Add Project</span>
                    </button>
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
                  <h3 className="text-lg font-semibold text-foreground mb-4">Notification Preferences</h3>
                  <div className="space-y-4">
                    {[
                      { label: "New job postings", description: "Get notified when matching projects are posted", enabled: true },
                      { label: "Application updates", description: "When clients respond to your applications", enabled: true },
                      { label: "Chat messages", description: "Real-time notifications for workspace chat", enabled: true },
                      { label: "Payout updates", description: "Payment releases and balance changes", enabled: true },
                      { label: "Level promotions", description: "When you advance to the next editor level", enabled: false },
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

            {activeTab === "payout" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Payout Method</h3>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-success/5 border border-success/20">
                    <CreditCard className="w-8 h-8 text-success" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Stripe Connected</p>
                      <p className="text-xs text-muted-foreground">marcus@riverflow.co · Last payout: Mar 15</p>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-auto">Manage</Button>
                  </div>
                </div>
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Tax Information</h3>
                  <p className="text-sm text-muted-foreground mb-4">Required for payouts over $600/year.</p>
                  <Button variant="outline">Submit W-9 / W-8BEN</Button>
                </div>
              </motion.div>
            )}

            {activeTab === "security" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Change Password</h3>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Current Password</label>
                      <Input type="password" className="bg-secondary border-white/10" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">New Password</label>
                      <Input type="password" className="bg-secondary border-white/10" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Confirm New Password</label>
                      <Input type="password" className="bg-secondary border-white/10" />
                    </div>
                    <Button variant="hero">Update Password</Button>
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