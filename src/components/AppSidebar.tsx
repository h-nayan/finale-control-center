import { NavLink } from "@/components/NavLink";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  GitPullRequest,
  Shield,
  Flag,
  BookOpen,
  TrendingUp,
} from "lucide-react";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/weekly", label: "Weekly Tracker", icon: Calendar },
  { to: "/problems", label: "Problem Log", icon: FileText },
  { to: "/oss", label: "OSS / PRs", icon: GitPullRequest },
  { to: "/protocols", label: "Protocols", icon: Shield },
  { to: "/checkpoints", label: "Checkpoints", icon: Flag },
  { to: "/blogs", label: "Blogs", icon: BookOpen },
  { to: "/ratings", label: "Ratings & CP", icon: TrendingUp },
];

export function AppSidebar() {
  return (
    // Removed 'fixed', 'top-0', 'left-0', 'z-50', and 'w-40'
    // Added 'h-full' and 'w-full' so it fills the container provided by AppLayout
    <div className="h-full w-full border-r border-border bg-card flex flex-col">
      <div className="p-3 border-b border-border">
        <span className="text-xs font-bold tracking-widest text-primary">FINALE</span>
        <span className="text-xs text-muted-foreground ml-1">v2.0</span>
      </div>
      <nav className="flex-1 overflow-y-auto py-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            activeClassName="bg-secondary text-primary font-medium"
          >
            <link.icon className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
