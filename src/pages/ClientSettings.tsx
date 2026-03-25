import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, CreditCard, Shield, Camera, Save, Mail, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DashboardLayout from "@/components/DashboardLayout";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "security", label: "Security", icon: Shield },
];

export default function ClientSettings() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <DashboardLayout role="client">
      <div className="page-padding">
        <div className="page-header">
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Manage your account preferences and billing.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Tabs */}
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

          {/* Content */}
          <div className="flex-1">
            {activeTab === "profile" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                {/* Avatar */}
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Profile Photo</h3>
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face"
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover border-2 border-white/10"
                      />
                      <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full gradient-violet flex items-center justify-center">
                        <Camera className="w-3.5 h-3.5 text-primary-foreground" />
                      </button>
                    </div>
                    <div>
                      <p className="text-sm text-foreground font-medium">Sarah Chen</p>
                      <p className="text-xs text-muted-foreground">Max file size: 5MB. JPG, PNG</p>
                    </div>
                  </div>
                </div>

                {/* Personal Info */}
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">First Name</label>
                      <Input defaultValue="Sarah" className="bg-secondary border-white/10" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Last Name</label>
                      <Input defaultValue="Chen" className="bg-secondary border-white/10" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input defaultValue="sarah@nexusmedia.com" className="bg-secondary border-white/10 pl-9" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Company</label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input defaultValue="Nexus Media" className="bg-secondary border-white/10 pl-9" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Bio</label>
                    <Textarea
                      defaultValue="Head of Content at Nexus Media. We produce brand videos for Fortune 500 companies."
                      className="bg-secondary border-white/10 min-h-[80px]"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="hero">
                    <Save className="w-4 h-4" /> Save Changes
                  </Button>
                </div>
              </motion.div>
            )}

            {activeTab === "notifications" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Notification Preferences</h3>
                  <div className="space-y-4">
                    {[
                      { label: "New editor applications", description: "Get notified when editors apply to your projects", enabled: true },
                      { label: "Delivery notifications", description: "When an editor submits a deliverable", enabled: true },
                      { label: "Chat messages", description: "Real-time notifications for workspace chat", enabled: true },
                      { label: "Payment confirmations", description: "Receipts and payment status updates", enabled: false },
                      { label: "Weekly digest", description: "Summary of your projects and activity", enabled: false },
                    ].map((notif) => (
                      <div key={notif.label} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-foreground">{notif.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{notif.description}</p>
                        </div>
                        <button
                          className={`relative w-11 h-6 rounded-full transition-colors ${
                            notif.enabled ? "bg-primary" : "bg-secondary"
                          }`}
                        >
                          <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                            notif.enabled ? "left-[22px]" : "left-0.5"
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "billing" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Current Plan</h3>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <div>
                      <p className="text-foreground font-semibold">Growth Plan</p>
                      <p className="text-sm text-muted-foreground">200 minutes/month · $149/mo</p>
                    </div>
                    <Button variant="outline" size="sm">Upgrade Plan</Button>
                  </div>
                </div>
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Payment Method</h3>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 border border-white/5">
                    <CreditCard className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">•••• •••• •••• 4242</p>
                      <p className="text-xs text-muted-foreground">Expires 12/27</p>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-auto">Update</Button>
                  </div>
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
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground mb-4">Add an extra layer of security to your account.</p>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}