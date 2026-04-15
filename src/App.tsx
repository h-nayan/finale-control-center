import { useState } from "react";
import Login from "./pages/Login";
// ... (keep your existing imports)

const App = () => {
  // Check if the user already "unlocked" it in this browser
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
              {/* ... keep your existing routes here */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/weekly" element={<WeeklyTracker />} />
              {/* etc... */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};
