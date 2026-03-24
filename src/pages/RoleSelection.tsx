import { motion } from "framer-motion";
import { Video, Palette, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const roles = [
  {
    id: "client",
    icon: Video,
    title: "I'm a Client",
    subtitle: "I need videos made",
    description: "Submit raw footage, set your brief, and get polished content back from vetted professionals.",
    path: "/dashboard",
  },
  {
    id: "editor",
    icon: Palette,
    title: "I'm an Editor",
    subtitle: "I want to earn",
    description: "Browse open projects, apply with your portfolio, and build a reputation on the platform.",
    path: "/marketplace",
  },
];

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background gradient-mesh flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to FrameCut</h1>
          <p className="text-muted-foreground">How would you like to use the platform?</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {roles.map((role, i) => (
            <motion.button
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              onClick={() => navigate(role.path)}
              className="glass-card p-8 text-left group cursor-pointer hover:border-primary/40 hover:glow-violet transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl gradient-violet flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <role.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-1">{role.title}</h2>
              <p className="text-sm font-medium text-primary mb-3">{role.subtitle}</p>
              <p className="text-sm text-muted-foreground mb-4">{role.description}</p>
              <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                Continue <ArrowRight className="w-4 h-4" />
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
