import { useLocalStorage } from "@/hooks/useLocalStorage";
import { WEEKS, PHASE_TARGETS } from "@/data/weeks";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { TOPICS, PLATFORMS, DIFFICULTIES } from "@/data/weeks";
import { Plus } from "lucide-react";

interface Problem { id: string; name: string; platform: string; topic: string; difficulty: string; week: string; date: string; notes: string; }

const PHASES = ["Phase 1", "Phase 2", "Phase 3", "Phase 4", "Phase 5"];

const MILESTONES = [
  { label: "CF 800+ by Week 8", key: "cf800" },
  { label: "CF 1000+ by Aug 31", key: "cf1000" },
  { label: "CF 1200+ by Oct 2026", key: "cf1200" },
  { label: "LC 1400+ by Sep 28", key: "lc1400" },
];

export default function Dashboard() {
  const [phase, setPhase] = useLocalStorage("finale-phase", "Phase 1");
  const [problems] = useLocalStorage<Problem[]>("finale-problems", []);
  const [prs] = useLocalStorage<any[]>("finale-prs", []);
  const [cfRating] = useLocalStorage("finale-cf-rating", "0");
  const [lcRating] = useLocalStorage("finale-lc-rating", "0");
  const [blogs] = useLocalStorage<Record<number, string>>("finale-blog-statuses", {});
  const [milestones, setMilestones] = useLocalStorage<Record<string, boolean>>("finale-milestones", {});
  const [selectedWeek, setSelectedWeek] = useLocalStorage("finale-current-week", "W1");
  const [quickOpen, setQuickOpen] = useState(false);

  // Quick add form state
  const [qName, setQName] = useState("");
  const [qPlatform, setQPlatform] = useState("LeetCode");
  const [qTopic, setQTopic] = useState("Arrays");
  const [qDifficulty, setQDifficulty] = useState("Easy");
  const [qNotes, setQNotes] = useState("");
  const [, setProblems] = useLocalStorage<Problem[]>("finale-problems", []);

  const mergedPRs = prs.filter(p => p.status === "Merged").length;
  const publishedBlogs = Object.values(blogs).filter(s => s === "Published").length;
  const totalProblems = problems.length;

  const weekProblems = problems.filter(p => p.week === selectedWeek).length;
  const weekData = WEEKS.find(w => w.id === selectedWeek);
  const weekTarget = weekData ? parseInt(weekData.target.split("–").pop() || weekData.target) : 0;

  const phaseTarget = PHASE_TARGETS[phase] || [0, 0];
  const phaseProblems = totalProblems; // cumulative

  const handleQuickAdd = () => {
    if (!qName.trim()) return;
    const newProblem: Problem = {
      id: Date.now().toString(),
      name: qName, platform: qPlatform, topic: qTopic, difficulty: qDifficulty,
      week: selectedWeek, date: new Date().toISOString().split("T")[0], notes: qNotes,
    };
    setProblems(prev => [...prev, newProblem]);
    setQName(""); setQNotes("");
    setQuickOpen(false);
  };

  return (
    <div className="space-y-4 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-bold tracking-tight">FINALE v2.0</h1>
        <Select value={phase} onValueChange={setPhase}>
          <SelectTrigger className="w-28 h-7 text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>{PHASES.map(p => <SelectItem key={p} value={p} className="text-xs">{p}</SelectItem>)}</SelectContent>
        </Select>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-5 gap-2">
        {[
          { label: "Problems Solved", value: totalProblems },
          { label: "Merged PRs", value: mergedPRs },
          { label: "CF Rating", value: cfRating },
          { label: "LC Rating", value: lcRating },
          { label: "Blogs Published", value: publishedBlogs },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded p-3">
            <div className="text-xs text-muted-foreground">{s.label}</div>
            <div className="text-xl font-bold text-primary mt-1">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Progress Bars */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-card border border-border rounded p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">This Week Progress</span>
            <Select value={selectedWeek} onValueChange={setSelectedWeek}>
              <SelectTrigger className="w-24 h-6 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>{WEEKS.map(w => <SelectItem key={w.id} value={w.id} className="text-xs">{w.id}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="bg-primary rounded-full h-2 transition-all" style={{ width: `${Math.min(100, weekTarget > 0 ? (weekProblems / weekTarget) * 100 : 0)}%` }} />
          </div>
          <div className="text-xs text-muted-foreground mt-1">{weekProblems} / {weekTarget}</div>
        </div>
        <div className="bg-card border border-border rounded p-3">
          <div className="text-xs text-muted-foreground mb-2">Phase Cumulative ({phase})</div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="bg-primary rounded-full h-2 transition-all" style={{ width: `${Math.min(100, phaseTarget[1] > 0 ? (phaseProblems / phaseTarget[1]) * 100 : 0)}%` }} />
          </div>
          <div className="text-xs text-muted-foreground mt-1">{phaseProblems} / {phaseTarget[0]}–{phaseTarget[1]}</div>
        </div>
      </div>

      {/* Milestones */}
      <div className="bg-card border border-border rounded p-3">
        <div className="text-xs text-muted-foreground mb-2">Milestone Checklist</div>
        <div className="grid grid-cols-2 gap-1">
          {MILESTONES.map(m => (
            <label key={m.key} className="flex items-center gap-2 text-xs cursor-pointer hover:bg-secondary/50 p-1 rounded">
              <input
                type="checkbox"
                checked={!!milestones[m.key]}
                onChange={() => setMilestones(prev => ({ ...prev, [m.key]: !prev[m.key] }))}
                className="accent-primary"
              />
              <span className={milestones[m.key] ? "text-success line-through" : ""}>{m.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Quick Add */}
      <Dialog open={quickOpen} onOpenChange={setQuickOpen}>
        <DialogTrigger asChild>
          <Button size="sm" className="text-xs"><Plus className="h-3 w-3 mr-1" /> Log Problems Today</Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle className="text-sm">Quick Log Problem</DialogTitle></DialogHeader>
          <div className="space-y-2">
            <div><Label className="text-xs">Name</Label><Input value={qName} onChange={e => setQName(e.target.value)} className="h-8 text-xs" /></div>
            <div className="grid grid-cols-3 gap-2">
              <div><Label className="text-xs">Platform</Label>
                <Select value={qPlatform} onValueChange={setQPlatform}><SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>{PLATFORMS.map(p => <SelectItem key={p} value={p} className="text-xs">{p}</SelectItem>)}</SelectContent></Select></div>
              <div><Label className="text-xs">Topic</Label>
                <Select value={qTopic} onValueChange={setQTopic}><SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>{TOPICS.map(t => <SelectItem key={t} value={t} className="text-xs">{t}</SelectItem>)}</SelectContent></Select></div>
              <div><Label className="text-xs">Difficulty</Label>
                <Select value={qDifficulty} onValueChange={setQDifficulty}><SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>{DIFFICULTIES.map(d => <SelectItem key={d} value={d} className="text-xs">{d}</SelectItem>)}</SelectContent></Select></div>
            </div>
            <div><Label className="text-xs">Notes</Label><Input value={qNotes} onChange={e => setQNotes(e.target.value)} className="h-8 text-xs" /></div>
            <Button size="sm" className="text-xs w-full" onClick={handleQuickAdd}>Add Problem</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
