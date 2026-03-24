import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LandingPage from "./pages/LandingPage";
import RoleSelection from "./pages/RoleSelection";
import ClientDashboard from "./pages/ClientDashboard";
import ProjectSubmission from "./pages/ProjectSubmission";
import EditorMarketplace from "./pages/EditorMarketplace";
import AdminSelection from "./pages/AdminSelection";
import ProjectWorkspace from "./pages/ProjectWorkspace";
import EditorEarnings from "./pages/EditorEarnings";
import PointsShop from "./pages/PointsShop";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/role-select" element={<RoleSelection />} />
          <Route path="/dashboard" element={<ClientDashboard />} />
          <Route path="/submit-project" element={<ProjectSubmission />} />
          <Route path="/marketplace" element={<EditorMarketplace />} />
          <Route path="/admin" element={<AdminSelection />} />
          <Route path="/workspace" element={<ProjectWorkspace />} />
          <Route path="/earnings" element={<EditorEarnings />} />
          <Route path="/points-shop" element={<PointsShop />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
