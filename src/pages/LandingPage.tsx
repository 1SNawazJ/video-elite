import { motion } from "framer-motion";
import { ArrowRight, Play, Star, Zap, Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroDashboard from "@/assets/hero-dashboard.jpg";

const pricingTiers = [
  {
    name: "Starter",
    price: 49,
    minutes: 60,
    features: ["60 editing minutes/mo", "2 active projects", "48h turnaround", "1 revision round", "720p–1080p delivery"],
    popular: false,
  },
  {
    name: "Growth",
    price: 149,
    minutes: 200,
    features: ["200 editing minutes/mo", "10 active projects", "24h turnaround", "3 revision rounds", "Up to 4K delivery", "Priority matching"],
    popular: true,
  },
  {
    name: "Agency",
    price: 399,
    minutes: 600,
    features: ["600 editing minutes/mo", "Unlimited projects", "12h turnaround", "Unlimited revisions", "Up to 4K + HDR", "Dedicated editor team", "API access"],
    popular: false,
  },
];

const testimonials = [
  { name: "Sarah Chen", role: "Head of Content, Nexus Media", quote: "We cut our post-production timeline by 70%. The quality of editors on FrameCut is unreal.", avatar: "SC" },
  { name: "Marcus Rivera", role: "Founder, RiverFlow Studios", quote: "As an editor, I doubled my monthly income within 3 months. The point system keeps things fair.", avatar: "MR" },
  { name: "Emily Tanaka", role: "Marketing Director, Bolt Commerce", quote: "We ship 40 videos per month now. FrameCut handles everything from rough cut to color grade.", avatar: "ET" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-violet flex items-center justify-center">
              <Play className="w-4 h-4 text-primary-foreground fill-current" />
            </div>
            <span className="text-lg font-bold text-foreground">FrameCut</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">Testimonials</a>
            <Link to="/role-select">
              <Button variant="outline" size="sm">Log in</Button>
            </Link>
            <Link to="/role-select">
              <Button variant="hero" size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden gradient-mesh">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
                <Zap className="w-3.5 h-3.5" />
                Now in public beta — 500+ editors onboarded
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-6">
                Where Elite Video Editors Meet{" "}
                <span className="text-gradient-violet">Ambitious Brands</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Submit your raw footage, get back polished content. A marketplace of vetted editors competing to deliver your vision — on time, every time.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/role-select">
                  <Button variant="hero" size="xl">
                    Start Free Trial <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="xl">Watch Demo</Button>
              </div>
              <div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-success" /> SOC 2 Compliant</span>
                <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-accent" /> 4.9/5 Rating</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="animate-float">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <img src={heroDashboard} alt="FrameCut Dashboard Preview" width={1280} height={800} className="w-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-primary/20 blur-3xl animate-pulse-glow" />
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-accent/20 blur-3xl animate-pulse-glow" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Simple, Minute-Based Pricing</h2>
            <p className="text-muted-foreground max-w-md mx-auto">Choose the plan that matches your content velocity. Upgrade anytime.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass-card p-8 flex flex-col ${tier.popular ? "border-primary/40 glow-violet relative" : ""}`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-violet text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-semibold text-foreground mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold text-foreground">${tier.price}</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">{tier.minutes} editing minutes included</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/role-select">
                  <Button variant={tier.popular ? "hero" : "outline"} className="w-full">
                    Get Started
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-16">Trusted by Content Teams Worldwide</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-accent fill-current" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-violet flex items-center justify-center text-sm font-semibold text-primary-foreground">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md gradient-violet flex items-center justify-center">
              <Play className="w-3 h-3 text-primary-foreground fill-current" />
            </div>
            <span className="font-semibold text-foreground">FrameCut</span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Support</a>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 FrameCut. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
