import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";

export default function Login({ onAuth }: { onAuth: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace '2105' with whatever secret key you want
    if (password === "2105") {
      localStorage.setItem("finale_auth", "true");
      onAuth();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm space-y-6 rounded-xl border bg-card p-8 shadow-2xl">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="rounded-full bg-primary/10 p-3">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Finale v2.0</h1>
          <p className="text-sm text-muted-foreground">Enter access key to continue</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="password"
            placeholder="Access Key"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={error ? "border-destructive animate-shake" : ""}
          />
          <Button type="submit" className="w-full">
            Unlock Dashboard
          </Button>
        </form>
        
        {error && (
          <p className="text-center text-xs text-destructive animate-pulse">
            Invalid Access Key. Access Denied.
          </p>
        )}
      </div>
    </div>
  );
}
