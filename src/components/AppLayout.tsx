import { useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* SIDEBAR CONTAINER */}
      <aside 
        className={`bg-card border-r transition-all duration-300 ease-in-out flex-shrink-0 relative overflow-hidden ${
          isOpen ? "w-64" : "w-0 border-none"
        }`}
      >
        {/* We keep this div at 64 (w-64) so the sidebar content doesn't squish while closing */}
        <div className="w-64 h-full">
          <AppSidebar />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b flex items-center px-4 bg-background/95 backdrop-blur sticky top-0 z-40">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="hover:bg-accent"
          >
            {/* If closed, show Menu; if open, show X */}
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
