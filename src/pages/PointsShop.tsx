import { motion } from "framer-motion";
import { Coins, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";

const packages = [
  { points: 100, price: 5, popular: false },
  { points: 500, price: 20, popular: false },
  { points: 1200, price: 40, popular: true },
  { points: 3000, price: 90, popular: false },
  { points: 5000, price: 130, popular: false },
  { points: 10000, price: 220, popular: false },
];

export default function PointsShop() {
  return (
    <DashboardLayout role="editor">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Points Shop</h1>
          <p className="text-muted-foreground text-sm">Purchase points to apply to more projects and grow your client base.</p>
        </div>

        <div className="glass-card p-5 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <Coins className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Balance</p>
              <p className="text-xl font-bold text-accent">2,450 points</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Zap className="w-3.5 h-3.5" /> Points never expire
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.points}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`glass-card p-6 flex flex-col items-center text-center relative ${pkg.popular ? "border-accent/40 glow-amber" : ""}`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 px-3 py-1 rounded-full gradient-amber text-xs font-semibold text-accent-foreground flex items-center gap-1">
                  <Star className="w-3 h-3" /> Most Popular
                </div>
              )}
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 mt-2">
                <Coins className="w-6 h-6 text-accent" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">{pkg.points.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mb-4">points</p>
              <p className="text-2xl font-bold text-foreground mb-1">${pkg.price}</p>
              <p className="text-xs text-muted-foreground mb-6">${(pkg.price / pkg.points * 100).toFixed(1)}¢ per point</p>
              <Button variant={pkg.popular ? "amber" : "outline"} className="w-full">
                Purchase
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
