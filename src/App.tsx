import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Public pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthCallback from "./pages/AuthCallback";
import RoleSelection from "./pages/RoleSelection";
import NotFound from "./pages/NotFound";

// Client pages
import ClientDashboard from "./pages/ClientDashboard";
import ProjectSubmission from "./pages/ProjectSubmission";
import AdminSelection from "./pages/AdminSelection";
import ProjectWorkspace from "./pages/ProjectWorkspace";
import ClientSettings from "./pages/ClientSettings";

// Editor pages
import EditorMarketplace from "./pages/EditorMarketplace";
import EditorWorkspace from "./pages/EditorWorkspace";
import EditorEarnings from "./pages/EditorEarnings";
import PointsShop from "./pages/PointsShop";
import EditorSettings from "./pages/EditorSettings";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminDisputes from "./pages/admin/AdminDisputes";
import AdminPayouts from "./pages/admin/AdminPayouts";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminEditorReview from "./pages/admin/AdminEditorReview";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/callback" element={<AuthCallback />} />

            {/* Client Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={["client"]}>
                <ClientDashboard />
              </ProtectedRoute>
            } />
            <Route path="/submit-project" element={
              <ProtectedRoute allowedRoles={["client"]}>
                <ProjectSubmission />
              </ProtectedRoute>
            } />
            <Route path="/select-editor" element={
              <ProtectedRoute allowedRoles={["client"]}>
                <AdminSelection />
              </ProtectedRoute>
            } />
            <Route path="/workspace" element={
              <ProtectedRoute allowedRoles={["client"]}>
                <ProjectWorkspace />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute allowedRoles={["client"]}>
                <ClientSettings />
              </ProtectedRoute>
            } />

            {/* Editor Routes */}
            <Route path="/marketplace" element={
              <ProtectedRoute allowedRoles={["editor"]}>
                <EditorMarketplace />
              </ProtectedRoute>
            } />
            <Route path="/editor-workspace" element={
              <ProtectedRoute allowedRoles={["editor"]}>
                <EditorWorkspace />
              </ProtectedRoute>
            } />
            <Route path="/earnings" element={
              <ProtectedRoute allowedRoles={["editor"]}>
                <EditorEarnings />
              </ProtectedRoute>
            } />
            <Route path="/points-shop" element={
              <ProtectedRoute allowedRoles={["editor"]}>
                <PointsShop />
              </ProtectedRoute>
            } />
            <Route path="/editor-settings" element={
              <ProtectedRoute allowedRoles={["editor"]}>
                <EditorSettings />
              </ProtectedRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminUsers />
              </ProtectedRoute>
            } />
            <Route path="/admin/projects" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminProjects />
              </ProtectedRoute>
            } />
            <Route path="/admin/disputes" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDisputes />
              </ProtectedRoute>
            } />
            <Route path="/admin/payouts" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminPayouts />
              </ProtectedRoute>
            } />
            <Route path="/admin/analytics" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminAnalytics />
              </ProtectedRoute>
            } />
            <Route path="/admin/editor-review" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminEditorReview />
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminSettings />
              </ProtectedRoute>
            } />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;