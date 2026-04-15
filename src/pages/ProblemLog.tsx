import { useState, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { WEEKS, TOPICS, PLATFORMS, DIFFICULTIES } from "@/data/weeks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

interface Problem { id: string; name: string; platform: string; topic: string; difficulty: string; week: string; date: string; notes: string; }

export default function ProblemLog() {
  const [problems, setProblems] = useLocalStorage<Problem[]>("finale-problems", []);
  const [showStats, setShowStats] = useState(false);

  // Form
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("LeetCode");
  const [topic, setTopic] = useState("Arrays");
  const [difficulty, setDifficulty] = useState("Easy");
  const [week, setWeek] = useState("W1");
  const [notes, setNotes] = useState("");

  // Filters
  const [search, setSearch] = useState("");
  const [filterTopic, setFilterTopic] = useState("All");
  const [filterPlatform, setFilterPlatform] = useState("All");
  const [filterDifficulty, setFilterDifficulty] = useState("All");

  const filtered = useMemo(() => {
    return problems.filter(p => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (filterTopic !== "All" && p.topic !== filterTopic) return false;
      if (filterPlatform !== "All" && p.platform !== filterPlatform) return false;
      if (filterDifficulty !== "All" && p.difficulty !== filterDifficulty) return false;
      return true;
    });
  }, [problems, search, filterTopic, filterPlatform, filterDifficulty]);

  const handleAdd = () => {
    if (!name.trim()) return;
    setProblems(prev => [...prev, { id: Date.now().toString(), name, platform, topic, difficulty, week, date: new Date().toISOString().split("T")[0], notes }]);
    setName(""); setNotes("");
  };

  const handleDelete = (id: string) => setProblems(prev => prev.filter(p => p.id !== id));

  // Stats
  const topicCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    problems.forEach(p => { counts[p.topic] = (counts[p.topic] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [problems]);

  const difficultyCounts = useMemo(() => {
    const counts = { Easy: 0, Medium: 0, Hard: 0 };
    problems.forEach(p => { if (p.difficulty in counts) counts[p.difficulty as keyof typeof counts]++; });
    return counts;
  }, [problems]);

  const revisionBank = useMemo(() => {
    const cutoff = Date.now() - 14 * 24 * 60 * 60 * 1000;
    return problems.filter(p => new Date(p.date).getTime() < cutoff);
  }, [problems]);

  return (
    <div className="max-w-6xl space-y-3">
      <h1 className="text-lg font-bold">Problem Log</h1>

      {/* Add Form */}
      <div className="bg-card border border-border rounded p-3 space-y-2">
        <div className="grid grid-cols-6 gap-2">
          <div className="col-span-2"><Label className="text-xs">Name</Label><Input value={name} onChange={e => setName(e.target.value)} className="h-7 text-xs" /></div>
          <div><Label className="text-xs">Platform</Label>
            <Select value={platform} onValueChange={setPlatform}><SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>{PLATFORMS.map(p => <SelectItem key={p} value={p} className="text-xs">{p}</SelectItem>)}</SelectContent></Select></div>
          <div><Label className="text-xs">Topic</Label>
            <Select value={topic} onValueChange={setTopic}><SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>{TOPICS.map(t => <SelectItem key={t} value={t} className="text-xs">{t}</SelectItem>)}</SelectContent></Select></div>
          <div><Label className="text-xs">Difficulty</Label>
            <Select value={difficulty} onValueChange={setDifficulty}><SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>{DIFFICULTIES.map(d => <SelectItem key={d} value={d} className="text-xs">{d}</SelectItem>)}</SelectContent></Select></div>
          <div><Label className="text-xs">Week</Label>
            <Select value={week} onValueChange={setWeek}><SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>{WEEKS.map(w => <SelectItem key={w.id} value={w.id} className="text-xs">{w.id}</SelectItem>)}</SelectContent></Select></div>
        </div>
        <div className="flex gap-2">
          <Input value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes (optional)" className="h-7 text-xs flex-1" />
          <Button size="sm" className="text-xs h-7" onClick={handleAdd}>Add</Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex gap-2 items-center">
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="h-7 text-xs w-48" />
        <Select value={filterTopic} onValueChange={setFilterTopic}><SelectTrigger className="h-7 text-xs w-32"><SelectValue placeholder="Topic" /></SelectTrigger>
          <SelectContent><SelectItem value="All" className="text-xs">All Topics</SelectItem>{TOPICS.map(t => <SelectItem key={t} value={t} className="text-xs">{t}</SelectItem>)}</SelectContent></Select>
        <Select value={filterPlatform} onValueChange={setFilterPlatform}><SelectTrigger className="h-7 text-xs w-28"><SelectValue placeholder="Platform" /></SelectTrigger>
          <SelectContent><SelectItem value="All" className="text-xs">All Platforms</SelectItem>{PLATFORMS.map(p => <SelectItem key={p} value={p} className="text-xs">{p}</SelectItem>)}</SelectContent></Select>
        <Select value={filterDifficulty} onValueChange={setFilterDifficulty}><SelectTrigger className="h-7 text-xs w-24"><SelectValue placeholder="Diff" /></SelectTrigger>
          <SelectContent><SelectItem value="All" className="text-xs">All</SelectItem>{DIFFICULTIES.map(d => <SelectItem key={d} value={d} className="text-xs">{d}</SelectItem>)}</SelectContent></Select>
        <Button variant="outline" size="sm" className="text-xs h-7 ml-auto" onClick={() => setShowStats(!showStats)}>{showStats ? "Hide Stats" : "Stats"}</Button>
      </div>

      {/* Stats */}
      {showStats && (
        <div className="bg-card border border-border rounded p-3 space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-muted-foreground mb-2">Problems by Topic</div>
              {topicCounts.map(([t, c]) => (
                <div key={t} className="flex items-center gap-2 text-xs mb-1">
                  <span className="w-24 truncate text-muted-foreground">{t}</span>
                  <div className="flex-1 bg-secondary rounded-full h-1.5"><div className="bg-primary rounded-full h-1.5" style={{ width: `${(c / problems.length) * 100}%` }} /></div>
                  <span className="w-6 text-right">{c}</span>
                </div>
              ))}
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-2">Difficulty Breakdown</div>
              {Object.entries(difficultyCounts).map(([d, c]) => (
                <div key={d} className="text-xs mb-1">
                  <span className={d === "Easy" ? "text-success" : d === "Medium" ? "text-warning" : "text-destructive"}>{d}: {c}</span>
                  <span className="text-muted-foreground ml-1">({problems.length > 0 ? ((c / problems.length) * 100).toFixed(0) : 0}%)</span>
                </div>
              ))}
              <div className="mt-3 text-xs text-muted-foreground">Revision Bank ({revisionBank.length} problems &gt;14 days old)</div>
              <div className="max-h-32 overflow-y-auto mt-1">
                {revisionBank.map(p => <div key={p.id} className="text-xs text-muted-foreground">{p.name} ({p.date})</div>)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="border border-border rounded overflow-hidden">
        <table className="w-full text-xs">
          <thead><tr className="bg-secondary/50 border-b border-border">
            <th className="p-2 text-left w-8">#</th><th className="p-2 text-left">Name</th><th className="p-2 text-left w-20">Platform</th>
            <th className="p-2 text-left w-24">Topic</th><th className="p-2 text-left w-16">Diff</th><th className="p-2 text-left w-12">Week</th>
            <th className="p-2 text-left w-20">Date</th><th className="p-2 w-8"></th>
          </tr></thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.id} className="border-b border-border hover:bg-secondary/30">
                <td className="p-2 text-muted-foreground">{i + 1}</td>
                <td className="p-2">{p.name}</td>
                <td className="p-2 text-muted-foreground">{p.platform}</td>
                <td className="p-2 text-muted-foreground">{p.topic}</td>
                <td className={`p-2 ${p.difficulty === "Easy" ? "text-success" : p.difficulty === "Medium" ? "text-warning" : "text-destructive"}`}>{p.difficulty}</td>
                <td className="p-2">{p.week}</td>
                <td className="p-2 text-muted-foreground">{p.date}</td>
                <td className="p-2"><button onClick={() => handleDelete(p.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-3 w-3" /></button></td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={8} className="p-4 text-center text-muted-foreground">No problems logged yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
