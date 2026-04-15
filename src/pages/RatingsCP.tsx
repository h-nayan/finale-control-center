import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

interface RatingEntry { date: string; rating: string; }
interface Contest { id: string; date: string; platform: string; name: string; rank: string; solved: string; ratingChange: string; }

const MILESTONES = [
  { label: "CF 800+ by Week 8", key: "cf800", target: 800, type: "cf" },
  { label: "CF 1000+ by Aug 31", key: "cf1000", target: 1000, type: "cf" },
  { label: "CF 1200+ by Oct 2026", key: "cf1200", target: 1200, type: "cf" },
  { label: "LC 1400+ by Sep 28", key: "lc1400", target: 1400, type: "lc" },
];

const CP_LADDER = [
  { range: "0→800", topics: "Implementation brute force basic math simulation", tags: 'CF tag "implementation" rating 800' },
  { range: "800→1000", topics: "Prefix sums frequency counting sorting tricks basic greedy", tags: 'CF tags "greedy"+"sortings" rating 900–1000' },
  { range: "1000→1200", topics: "Binary search on answer greedy proofs two pointers basic combinatorics", tags: 'CF tag "binary search" rating 1100–1200' },
];

export default function RatingsCP() {
  const [cfRating, setCfRating] = useLocalStorage("finale-cf-rating", "0");
  const [lcRating, setLcRating] = useLocalStorage("finale-lc-rating", "0");
  const [cfHistory, setCfHistory] = useLocalStorage<RatingEntry[]>("finale-cf-history", []);
  const [lcHistory, setLcHistory] = useLocalStorage<RatingEntry[]>("finale-lc-history", []);
  const [milestones, setMilestones] = useLocalStorage<Record<string, boolean>>("finale-milestones", {});
  const [contests, setContests] = useLocalStorage<Contest[]>("finale-contests", []);

  const [cfInput, setCfInput] = useState("");
  const [lcInput, setLcInput] = useState("");

  // Contest form
  const [cDate, setCDate] = useState("");
  const [cPlatform, setCPlatform] = useState("Codeforces");
  const [cName, setCName] = useState("");
  const [cRank, setCRank] = useState("");
  const [cSolved, setCSolved] = useState("");
  const [cChange, setCChange] = useState("");

  const updateCf = () => {
    if (!cfInput) return;
    setCfRating(cfInput);
    setCfHistory(prev => [...prev, { date: new Date().toISOString().split("T")[0], rating: cfInput }]);
    setCfInput("");
  };
  const updateLc = () => {
    if (!lcInput) return;
    setLcRating(lcInput);
    setLcHistory(prev => [...prev, { date: new Date().toISOString().split("T")[0], rating: lcInput }]);
    setLcInput("");
  };

  const addContest = () => {
    if (!cName) return;
    setContests(prev => [...prev, { id: Date.now().toString(), date: cDate || new Date().toISOString().split("T")[0], platform: cPlatform, name: cName, rank: cRank, solved: cSolved, ratingChange: cChange }]);
    setCName(""); setCRank(""); setCSolved(""); setCChange("");
  };

  return (
    <div className="max-w-5xl space-y-3">
      <h1 className="text-lg font-bold">Ratings & CP</h1>

      {/* Rating Displays */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Codeforces", rating: cfRating, input: cfInput, setInput: setCfInput, update: updateCf, history: cfHistory },
          { label: "LeetCode", rating: lcRating, input: lcInput, setInput: setLcInput, update: updateLc, history: lcHistory },
        ].map(r => (
          <div key={r.label} className="bg-card border border-border rounded p-3">
            <div className="text-xs text-muted-foreground">{r.label} Rating</div>
            <div className="text-3xl font-bold text-primary my-2">{r.rating}</div>
            <div className="flex gap-2 mb-2">
              <Input value={r.input} onChange={e => r.setInput(e.target.value)} placeholder="New rating" className="h-7 text-xs w-24" type="number" />
              <Button size="sm" className="text-xs h-7" onClick={r.update}>Update</Button>
            </div>
            <div className="max-h-20 overflow-y-auto">
              {r.history.slice().reverse().map((h, i) => (
                <div key={i} className="text-[10px] text-muted-foreground">{h.date}: {h.rating}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Milestones */}
      <div className="bg-card border border-border rounded p-3">
        <div className="text-xs font-medium mb-2">Rating Milestones</div>
        <div className="grid grid-cols-4 gap-2">
          {MILESTONES.map(m => {
            const current = parseInt(m.type === "cf" ? cfRating : lcRating) || 0;
            const pct = Math.min(100, (current / m.target) * 100);
            return (
              <div key={m.key} className="border border-border rounded p-2">
                <label className="flex items-center gap-2 text-xs cursor-pointer mb-1">
                  <input type="checkbox" checked={!!milestones[m.key]}
                    onChange={() => setMilestones(prev => ({ ...prev, [m.key]: !prev[m.key] }))} className="accent-primary" />
                  <span className={milestones[m.key] ? "text-success line-through" : ""}>{m.label}</span>
                </label>
                <div className="w-full bg-secondary rounded-full h-1"><div className="bg-primary rounded-full h-1" style={{ width: `${pct}%` }} /></div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{current}/{m.target}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CP Topic Ladder */}
      <div className="bg-card border border-border rounded p-3">
        <div className="text-xs font-medium mb-2">CP Topic Ladder</div>
        <table className="w-full text-xs">
          <thead><tr className="border-b border-border">
            <th className="p-1.5 text-left w-24">Range</th><th className="p-1.5 text-left">Topics</th><th className="p-1.5 text-left w-48">Practice Tags</th>
          </tr></thead>
          <tbody>
            {CP_LADDER.map(l => (
              <tr key={l.range} className="border-b border-border"><td className="p-1.5 text-primary font-medium">{l.range}</td><td className="p-1.5 text-muted-foreground">{l.topics}</td><td className="p-1.5 text-muted-foreground">{l.tags}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Contest Log */}
      <div className="bg-card border border-border rounded p-3">
        <div className="text-xs font-medium mb-2">Contest Log</div>
        <div className="grid grid-cols-6 gap-2 mb-2">
          <div><Label className="text-xs">Date</Label><Input value={cDate} onChange={e => setCDate(e.target.value)} type="date" className="h-7 text-xs" /></div>
          <div><Label className="text-xs">Platform</Label>
            <Select value={cPlatform} onValueChange={setCPlatform}><SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>{["Codeforces", "LeetCode", "CodeChef"].map(p => <SelectItem key={p} value={p} className="text-xs">{p}</SelectItem>)}</SelectContent></Select></div>
          <div><Label className="text-xs">Contest</Label><Input value={cName} onChange={e => setCName(e.target.value)} className="h-7 text-xs" /></div>
          <div><Label className="text-xs">Rank</Label><Input value={cRank} onChange={e => setCRank(e.target.value)} className="h-7 text-xs" /></div>
          <div><Label className="text-xs">Solved</Label><Input value={cSolved} onChange={e => setCSolved(e.target.value)} className="h-7 text-xs" /></div>
          <div><Label className="text-xs">Δ Rating</Label><Input value={cChange} onChange={e => setCChange(e.target.value)} className="h-7 text-xs" /></div>
        </div>
        <Button size="sm" className="text-xs h-7 mb-2" onClick={addContest}>Log Contest</Button>
        <table className="w-full text-xs">
          <thead><tr className="border-b border-border">
            <th className="p-1.5 text-left">Date</th><th className="p-1.5 text-left">Platform</th><th className="p-1.5 text-left">Contest</th>
            <th className="p-1.5 text-left">Rank</th><th className="p-1.5 text-left">Solved</th><th className="p-1.5 text-left">Δ</th><th className="p-1.5 w-6"></th>
          </tr></thead>
          <tbody>
            {contests.map(c => (
              <tr key={c.id} className="border-b border-border">
                <td className="p-1.5 text-muted-foreground">{c.date}</td><td className="p-1.5">{c.platform}</td><td className="p-1.5">{c.name}</td>
                <td className="p-1.5">{c.rank}</td><td className="p-1.5">{c.solved}</td>
                <td className={`p-1.5 ${parseInt(c.ratingChange) > 0 ? "text-success" : parseInt(c.ratingChange) < 0 ? "text-destructive" : ""}`}>{c.ratingChange}</td>
                <td className="p-1.5"><button onClick={() => setContests(prev => prev.filter(x => x.id !== c.id))} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-3 w-3" /></button></td>
              </tr>
            ))}
            {contests.length === 0 && <tr><td colSpan={7} className="p-3 text-center text-muted-foreground">No contests logged</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
