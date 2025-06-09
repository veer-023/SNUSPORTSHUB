
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import AboutPage from "./pages/AboutPage";
import PerformanceAnalysis from "./pages/PerformanceAnalysis";
import RegistrationForm from "./pages/RegistrationForm";
import FeaturesPage from "./pages/FeaturesPage";
import AwardsPage from "./pages/AwardsPage";
import Basketball from "./pages/Basketball";
import Cricket from "./pages/Cricket";
import Football from "./pages/Football";
import Badminton from "./pages/Badminton";
import RealTimeTracker from "./pages/RealTimeTracker";
import GameArchive from "./pages/GameArchive";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/about" element={
              <ProtectedRoute>
                <AboutPage />
              </ProtectedRoute>
            } />
            <Route path="/performance" element={
              <ProtectedRoute>
                <PerformanceAnalysis />
              </ProtectedRoute>
            } />
            <Route path="/registration" element={
              <ProtectedRoute>
                <RegistrationForm />
              </ProtectedRoute>
            } />
            <Route path="/features" element={
              <ProtectedRoute>
                <FeaturesPage />
              </ProtectedRoute>
            } />
            <Route path="/awards" element={
              <ProtectedRoute>
                <AwardsPage />
              </ProtectedRoute>
            } />
            <Route path="/basketball" element={
              <ProtectedRoute>
                <Basketball />
              </ProtectedRoute>
            } />
            <Route path="/cricket" element={
              <ProtectedRoute>
                <Cricket />
              </ProtectedRoute>
            } />
            <Route path="/football" element={
              <ProtectedRoute>
                <Football />
              </ProtectedRoute>
            } />
            <Route path="/badminton" element={
              <ProtectedRoute>
                <Badminton />
              </ProtectedRoute>
            } />
            <Route path="/live-tracker" element={
              <ProtectedRoute>
                <RealTimeTracker />
              </ProtectedRoute>
            } />
            <Route path="/game-archive" element={
              <ProtectedRoute>
                <GameArchive />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
