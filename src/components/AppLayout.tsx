import { useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { Menu, ChevronLeft } from "lucide-react"; 
import { Button } from "@/components/ui/button";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    // min-h-screen ensures the background stays dark top to bottom
    <div className="flex min-h-screen w-full bg-background text-foreground">
      
      {/* 1. SIDEBAR: No fixed positioning here so it pushes the content naturally */}
      <aside 
        className={`transition-all duration-300 ease-in-out border-r bg-card flex-shrink-0 ${
          isSidebarOpen ? "w-64" : "w-0"
        }`}
      >
        {/* Overflow-hidden prevents the sidebar text from 'leaking' out while closing */}
        <div className="w-64 h-full overflow-hidden">
          <AppSidebar />
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* HEADER */}
        <header className="h-14 border-b flex items-center px-4 bg-background/95 backdrop-blur sticky top-0 z-40">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hover:bg-accent"
          >
            {isSidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <span className="ml-4 font-bold text-xs uppercase tracking-widest text-primary">
            FINALE V2.0
          </span>
        </header>

        {/* PAGE CONTENT: Removed large margins to fill the space */}
        <main className="p-4 md:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
