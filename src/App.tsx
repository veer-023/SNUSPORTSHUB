
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Basketball from "./pages/Basketball";
import Cricket from "./pages/Cricket";
import Football from "./pages/Football";
import Badminton from "./pages/Badminton";
import RealTimeTracker from "./pages/RealTimeTracker";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/basketball" element={<Basketball />} />
          <Route path="/cricket" element={<Cricket />} />
          <Route path="/football" element={<Football />} />
          <Route path="/badminton" element={<Badminton />} />
          <Route path="/live-tracker" element={<RealTimeTracker />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
