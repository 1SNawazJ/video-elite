import { motion } from "framer-motion";
import { ArrowRight, Play, Star, Zap, Shield, Check, Users, Clock, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
  {
    name: "Sarah Chen",
    role: "Head of Content, Nexus Media",
    quote: "We cut our post-production timeline by 70%. The quality of editors on FrameCut is unreal.",
    avatar: "SC",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "Marcus Rivera",
    role: "Founder, RiverFlow Studios",
    quote: "As an editor, I doubled my monthly income within 3 months. The point system keeps things fair.",
    avatar: "MR",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "Emily Tanaka",
    role: "Marketing Director, Bolt Commerce",
    quote: "We ship 40 videos per month now. FrameCut handles everything from rough cut to color grade.",
    avatar: "ET",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
  },
];

const stats = [
  { value: "500+", label: "Vetted Editors", icon: Users },
  { value: "12K+", label: "Projects Delivered", icon: TrendingUp },
  { value: "<24h", label: "Avg Turnaround", icon: Clock },
  { value: "4.9★", label: "Client Rating", icon: Award },
];

const howItWorks = [
  {
    step: "01",
    title: "Submit Your Brief",
    description: "Upload raw footage, describe your vision, and set your timeline. Our system calculates the minutes needed.",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400&h=300&fit=crop",
  },
  {
    step: "02",
    title: "Get Matched",
    description: "Vetted editors apply to your project. Review portfolios, scores, and pricing — then pick your favorite.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
  },
  {
    step: "03",
    title: "Review & Approve",
    description: "Collaborate in real-time via our workspace. Request revisions, chat, and approve the final cut with one click.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

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
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
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
                  <img
                    src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1280&h=800&fit=crop"
                    alt="FrameCut Dashboard Preview - Video editing workspace"
                    className="w-full"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  {/* Floating UI overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="glass-card p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full gradient-violet flex items-center justify-center shrink-0">
                        <Play className="w-5 h-5 text-primary-foreground fill-current" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">Nike Brand Anthem — Final Cut</p>
                        <div className="w-full h-1.5 rounded-full bg-white/10 mt-2">
                          <div className="h-full rounded-full gradient-violet" style={{ width: "72%" }} />
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">72%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-primary/20 blur-3xl animate-pulse-glow" />
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-accent/20 blur-3xl animate-pulse-glow" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-white/5 py-12 bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                {...fadeInUp}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">How FrameCut Works</h2>
            <p className="text-muted-foreground max-w-md mx-auto">Three simple steps to go from raw footage to polished content.</p>
          </div>
          <div className="space-y-20">
            {howItWorks.map((item, i) => (
              <motion.div
                key={item.step}
                {...fadeInUp}
                transition={{ delay: i * 0.15 }}
                className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "md:direction-rtl" : ""}`}
              >
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  <span className="text-5xl font-bold text-primary/20">{item.step}</span>
                  <h3 className="text-2xl font-bold text-foreground mt-2 mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
                <div className={`relative ${i % 2 === 1 ? "md:order-1" : ""}`}>
                  <div className="rounded-2xl overflow-hidden border border-white/10">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Simple, Minute-Based Pricing</h2>
            <p className="text-muted-foreground max-w-md mx-auto">Choose the plan that matches your content velocity. Upgrade anytime.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                {...fadeInUp}
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
                {...fadeInUp}
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
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                    loading="lazy"
                  />
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

      {/* CTA */}
      <section className="py-24 border-t border-white/5 gradient-mesh">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl font-bold text-foreground mb-4">Ready to Transform Your Content Workflow?</h2>
            <p className="text-lg text-muted-foreground mb-8">Join 500+ brands and editors already on FrameCut.</p>
            <Link to="/role-select">
              <Button variant="hero" size="xl">
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-md gradient-violet flex items-center justify-center">
                  <Play className="w-3 h-3 text-primary-foreground fill-current" />
                </div>
                <span className="font-semibold text-foreground">FrameCut</span>
              </div>
              <p className="text-sm text-muted-foreground">The marketplace where elite video editors meet ambitious brands.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a></li>
                <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">For Editors</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 text-center">
            <p className="text-sm text-muted-foreground">© 2026 FrameCut. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}