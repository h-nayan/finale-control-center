import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import Login from "./pages/Login";
// ... import all your other pages (Dashboard, WeeklyTracker, etc.)

const queryClient = new QueryClient();

// Use 'const App = ...' 
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("finale_auth") === "true"
  );

  if (!isAuthenticated) {
    return <Login onAuth={() => setIsAuthenticated(true)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/finale-control-center">
          <AppLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/weekly" element={<WeeklyTracker />} />
              <Route path="/problems" element={<ProblemLog />} />
              <Route path="/oss" element={<OSSTracker />} />
              <Route path="/protocols" element={<Protocols />} />
              <Route path="/checkpoints" element={<Checkpoints />} />
              <Route path="/blogs" element={<BlogTracker />} />
              <Route path="/ratings" element={<RatingsCP />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

// CRITICAL: This line fixes the error in your screenshot
export default App;
