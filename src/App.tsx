
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Basketball from "./pages/Basketball";
import Cricket from "./pages/Cricket";
import Football from "./pages/Football";
import Badminton from "./pages/Badminton";
import RealTimeTracker from "./pages/RealTimeTracker";
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
                <Index />
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
