import { useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { Menu, ChevronLeft } from "lucide-react"; // Nice icons for the toggle
import { Button } from "@/components/ui/button";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar Container */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 transition-all duration-300 ${
          isOpen ? "w-40" : "w-0 -left-40"
        }`}
      >
        <AppSidebar />
      </div>

      {/* Main Content */}
      <main 
        className={`flex-1 transition-all duration-300 p-4 min-h-screen ${
          isOpen ? "ml-40" : "ml-0"
        }`}
      >
        {/* Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 bg-background border shadow-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>

        <div className="mt-12">
          {children}
        </div>
      </main>
    </div>
  );
}
