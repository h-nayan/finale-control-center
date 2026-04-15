import { useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { Menu, ChevronLeft } from "lucide-react"; 
import { Button } from "@/components/ui/button";

export function AppLayout({ children }: { children: React.ReactNode }) {
  // This is your manual control state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen w-full bg-background overflow-x-hidden">
      
      {/* 1. THE SIDEBAR CONTAINER */}
      <aside 
        className={`transition-all duration-300 ease-in-out border-r bg-card flex-shrink-0 ${
          isSidebarOpen ? "w-64" : "w-0"
        }`}
      >
        <div className={`w-64 h-full ${!isSidebarOpen && "invisible"}`}>
          <AppSidebar />
        </div>
      </aside>

      {/* 2. THE MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP BAR WITH TOGGLE BUTTON */}
        <header className="h-14 border-b flex items-center px-4 bg-background/95 backdrop-blur sticky top-0 z-40">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hover:bg-accent transition-colors"
          >
            {isSidebarOpen ? (
              <ChevronLeft className="h-5 w-5" /> 
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
          
          <span className="ml-4 font-bold text-xs uppercase tracking-widest text-primary">
            Finale v2.0
          </span>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
