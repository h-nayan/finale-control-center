import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import Login from "./pages/Login"; // Ensure this file exists in src/pages/Login.tsx
import Dashboard from "./pages/Dashboard";
import WeeklyTracker from "./pages/WeeklyTracker";
import ProblemLog from "./pages/ProblemLog";
import OSSTracker from "./pages/OSSTracker";
import Protocols from "./pages/Protocols";
import Checkpoints from "./pages/Checkpoints";
import BlogTracker from "./pages/BlogTracker";
import RatingsCP from "./pages/RatingsCP";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Check if the user is already authenticated in this browser
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("finale_auth") === "true"
  );

  // If NOT authenticated, show the Login screen only
  if (!isAuthenticated) {
    return <Login onAuth={() => setIsAuthenticated(true)} />;
  }

  // If authenticated, show the dashboard
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

export default App;
