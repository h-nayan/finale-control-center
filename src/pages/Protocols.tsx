import { useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { WEEKS } from "@/data/weeks";

interface Problem { id: string; name: string; platform: string; topic: string; difficulty: string; week: string; date: string; notes: string; }

export default function Protocols() {
  const [alphaStatus, setAlphaStatus] = useLocalStorage("finale-alpha-status", "on-track");
  const [sundaySessions, setSundaySessions] = useLocalStorage<string[]>("finale-sunday-sessions", []);
  const [gammaWeeks, setGammaWeeks] = useLocalStorage<Record<string, boolean>>("finale-gamma-weeks", {});
  const [deltaWeeks, setDeltaWeeks] = useLocalStorage<string[]>("finale-delta-weeks", []);
  const [problems] = useLocalStorage<Problem[]>("finale-problems", []);
  const [blogStatuses] = useLocalStorage<Record<number, string>>("finale-blog-statuses", {});
  const [selectedWeek] = useLocalStorage("finale-current-week", "W1");

  const revisionBank = useMemo(() => {
    const cutoff = Date.now() - 14 * 24 * 60 * 60 * 1000;
    return problems.filter(p => new Date(p.date).getTime() < cutoff);
  }, [problems]);

  const logSunday = () => {
    const today = new Date().toISOString().split("T")[0];
    if (!sundaySessions.includes(today)) setSundaySessions(prev => [...prev, today]);
  };

  const logActiveWeek = () => {
    const today = new Date().toISOString().split("T")[0];
    if (!deltaWeeks.includes(today)) setDeltaWeeks(prev => [...prev, today]);
  };

  // Blog deadlines
  const BLOGS = [
    { id: 1, topic: "How JVM Works", publishBy: "Week 3 Sun" },
    { id: 2, topic: "OOPs in Java", publishBy: "Buffer W1 Sat" },
    { id: 3, topic: "Recursion Finally Clicked", publishBy: "Week 9 Sat" },
    { id: 4, topic: "First OSS Contribution", publishBy: "Week 13 Sat" },
    { id: 5, topic: "Graph Algorithms", publishBy: "Buffer W3 Sat" },
    { id: 6, topic: "Open-Sourced My Project", publishBy: "Week 19 Sat" },
    { id: 7, topic: "Preparing for GSoC 2027", publishBy: "Nov 2026" },
    { id: 8, topic: "GSoC Proposal Process", publishBy: "Feb 2027" },
  ];

  const overdue = BLOGS.filter(b => blogStatuses[b.id] !== "Published");

  return (
    <div className="max-w-4xl space-y-3">
      <h1 className="text-lg font-bold">Protocols</h1>

      <div className="grid grid-cols-2 gap-3">
        {/* Alpha */}
        <div className="bg-card border border-border rounded p-3">
          <div className="text-xs font-medium mb-2">Protocol Alpha — Schedule Status</div>
          {alphaStatus === "behind" && (
            <div className="bg-destructive/20 border border-destructive/50 rounded p-2 text-xs text-destructive mb-2">
              CATCH-UP MODE — No new topics. Revision only.
            </div>
          )}
          <Button size="sm" className="text-xs h-7" variant={alphaStatus === "on-track" ? "default" : "destructive"}
            onClick={() => setAlphaStatus(alphaStatus === "on-track" ? "behind" : "on-track")}>
            {alphaStatus === "on-track" ? "On Track ✓" : "Behind Schedule ✗"}
          </Button>
        </div>

        {/* Beta */}
        <div className="bg-card border border-border rounded p-3">
          <div className="text-xs font-medium mb-2">Protocol Beta — Sunday Revision</div>
          <div className="flex items-center gap-3 mb-2">
            <Button size="sm" className="text-xs h-7" onClick={logSunday}>Log Sunday Session</Button>
            <span className="text-xs text-primary font-medium">{sundaySessions.length} Sundays logged</span>
          </div>
          <div className="text-xs text-muted-foreground">Revision Bank: {revisionBank.length} problems</div>
          <div className="max-h-20 overflow-y-auto mt-1">
            {revisionBank.slice(0, 10).map(p => <div key={p.id} className="text-[10px] text-muted-foreground">{p.name}</div>)}
          </div>
        </div>

        {/* Gamma */}
        <div className="bg-card border border-border rounded p-3">
          <div className="text-xs font-medium mb-2">Protocol Gamma — CF Upsolve Rule</div>
          <div className="text-xs text-muted-foreground mb-2">After every CF contest, upsolve at least 1 problem you couldn't solve during the contest.</div>
          <div className="flex flex-wrap gap-1">
            {WEEKS.filter(w => w.type === "normal").slice(0, 12).map(w => (
              <button key={w.id} onClick={() => setGammaWeeks(prev => ({ ...prev, [w.id]: !prev[w.id] }))}
                className={`text-[10px] px-1.5 py-0.5 rounded border ${gammaWeeks[w.id] ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}>
                {w.id}
              </button>
            ))}
          </div>
        </div>

        {/* Delta */}
        <div className="bg-card border border-border rounded p-3">
          <div className="text-xs font-medium mb-2">Protocol Delta — Activity Streak</div>
          <div className="flex items-center gap-3 mb-2">
            <Button size="sm" className="text-xs h-7" onClick={logActiveWeek}>Log Active Week</Button>
            <span className="text-xs text-primary font-medium">{deltaWeeks.length} weeks logged</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {deltaWeeks.map(d => <span key={d} className="text-[10px] bg-primary/10 text-primary px-1 rounded">{d}</span>)}
          </div>
        </div>
      </div>

      {/* Epsilon */}
      <div className="bg-card border border-border rounded p-3">
        <div className="text-xs font-medium mb-2">Protocol Epsilon — Blog Deadlines</div>
        <div className="space-y-1">
          {overdue.map(b => (
            <div key={b.id} className="flex items-center gap-2 text-xs">
              <span className="text-warning">⚠</span>
              <span>{b.topic}</span>
              <span className="text-muted-foreground ml-auto">Due: {b.publishBy}</span>
              <span className="text-xs text-muted-foreground">{blogStatuses[b.id] || "Not Started"}</span>
            </div>
          ))}
          {overdue.length === 0 && <div className="text-xs text-success">All blogs published! 🎉</div>}
        </div>
      </div>
    </div>
  );
}
