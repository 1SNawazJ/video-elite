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
import EditorWorkspace from "./pages/EditorWorkspace";
import EditorEarnings from "./pages/EditorEarnings";
import PointsShop from "./pages/PointsShop";
import ClientSettings from "./pages/ClientSettings";
import EditorSettings from "./pages/EditorSettings";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminDisputes from "./pages/admin/AdminDisputes";
import AdminPayouts from "./pages/admin/AdminPayouts";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminEditorReview from "./pages/admin/AdminEditorReview";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/role-select" element={<RoleSelection />} />

          {/* Client */}
          <Route path="/dashboard" element={<ClientDashboard />} />
          <Route path="/submit-project" element={<ProjectSubmission />} />
          <Route path="/select-editor" element={<AdminSelection />} />
          <Route path="/workspace" element={<ProjectWorkspace />} />
          <Route path="/settings" element={<ClientSettings />} />

          {/* Editor */}
          <Route path="/marketplace" element={<EditorMarketplace />} />
          <Route path="/editor-workspace" element={<EditorWorkspace />} />
          <Route path="/earnings" element={<EditorEarnings />} />
          <Route path="/points-shop" element={<PointsShop />} />
          <Route path="/editor-settings" element={<EditorSettings />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/disputes" element={<AdminDisputes />} />
          <Route path="/admin/payouts" element={<AdminPayouts />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/editor-review" element={<AdminEditorReview />} />
          <Route path="/admin/settings" element={<AdminSettings />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;