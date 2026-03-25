import { motion } from "framer-motion";
import { Home, ArrowLeft, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background gradient-mesh flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <div className="w-16 h-16 rounded-2xl gradient-violet flex items-center justify-center mx-auto mb-6">
          <Play className="w-8 h-8 text-primary-foreground fill-current" />
        </div>
        <h1 className="text-7xl font-bold text-foreground mb-2">404</h1>
        <p className="text-xl text-foreground font-medium mb-2">Page Not Found</p>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4" /> Go Back
            </Link>
          </Button>
          <Button variant="hero" asChild>
            <Link to="/">
              <Home className="w-4 h-4" /> Home
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}