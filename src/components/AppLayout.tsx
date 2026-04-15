import { AppSidebar } from "./AppSidebar";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <AppSidebar />
      <main className="ml-40 p-4 min-h-screen">{children}</main>
    </div>
  );
}
