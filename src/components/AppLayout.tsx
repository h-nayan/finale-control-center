import { useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { Menu, ChevronLeft } from "lucide-react"; 
import { Button } from "@/components/ui/button";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen w-full bg-background overflow-x-hidden">
      
      {/* SIDEBAR: Relative positioning so it pushes the main content */}
      <aside 
        className={`transition-all duration-300 ease-in-out border-r bg-card flex-shrink-0 relative ${
          isSidebarOpen ? "w-64" : "w-0"
        }`}
      >
        {/* We keep the inner div at 64 so the content doesn't 'squish' while sliding */}
        <div className={`w-64 h-full ${!isSidebarOpen && "invisible"}`}>
          <AppSidebar />
        </div>
      </aside>

      {/* MAIN CONTENT: flex-1 makes it take up all remaining space */}
      <div className="flex-1 flex flex-col min-w-0">
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
            Finale v2.0
          </span>
        </header>

        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
