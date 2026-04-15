import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { PR_ORGS, PR_TYPES, PR_STATUSES } from "@/data/weeks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Trash2, ExternalLink } from "lucide-react";

interface PR { id: string; org: string; title: string; type: string; status: string; url: string; date: string; }

const LADDER = [
  { range: "PRs 1–2", desc: "Test coverage additions", threshold: 2 },
  { range: "PRs 3–4", desc: "Docs + minor bug fixes", threshold: 4 },
  { range: "PRs 5–7", desc: "Bug fixes with tests", threshold: 7 },
  { range: "PRs 8–10", desc: "Small features", threshold: 10 },
];

const COMMUNITY_ORGS = ["Checkstyle", "Jenkins", "OpenMRS"];
const COMMUNITY_ITEMS = ["Joined Slack/Discord", "Introduced yourself", "Built locally with Maven", "Read 3–5 merged PRs", "Domain learning started"];

export default function OSSTracker() {
  const [prs, setPRs] = useLocalStorage<PR[]>("finale-prs", []);
  const [ladderOverride, setLadderOverride] = useLocalStorage<number>("finale-ladder-override", -1);
  const [community, setCommunity] = useLocalStorage<Record<string, Record<string, boolean>>>("finale-community", {});

  const [org, setOrg] = useState("Checkstyle");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Test Coverage");
  const [status, setStatus] = useState("Draft");
  const [url, setUrl] = useState("");

  const mergedCount = prs.filter(p => p.status === "Merged").length;
  const activeLadderRung = ladderOverride >= 0 ? ladderOverride : LADDER.findIndex(l => mergedCount <= l.threshold);

  const handleAdd = () => {
    if (!title.trim()) return;
    setPRs(prev => [...prev, { id: Date.now().toString(), org, title, type, status, url, date: new Date().toISOString().split("T")[0] }]);
    setTitle(""); setUrl("");
  };

  return (
    <div className="max-w-6xl space-y-3">
      <h1 className="text-lg font-bold">OSS / PR Tracker</h1>

      {/* Add Form */}
      <div className="bg-card border border-border rounded p-3">
        <div className="grid grid-cols-6 gap-2">
          <div><Label className="text-xs">Org</Label>
            <Select value={org} onValueChange={setOrg}><SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>{PR_ORGS.map(o => <SelectItem key={o} value={o} className="text-xs">{o}</SelectItem>)}</SelectContent></Select></div>
          <div className="col-span-2"><Label className="text-xs">PR Title</Label><Input value={title} onChange={e => setTitle(e.target.value)} className="h-7 text-xs" /></div>
          <div><Label className="text-xs">Type</Label>
            <Select value={type} onValueChange={setType}><SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>{PR_TYPES.map(t => <SelectItem key={t} value={t} className="text-xs">{t}</SelectItem>)}</SelectContent></Select></div>
          <div><Label className="text-xs">Status</Label>
            <Select value={status} onValueChange={setStatus}><SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>{PR_STATUSES.map(s => <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>)}</SelectContent></Select></div>
          <div><Label className="text-xs">GitHub URL</Label><Input value={url} onChange={e => setUrl(e.target.value)} className="h-7 text-xs" placeholder="https://..." /></div>
        </div>
        <Button size="sm" className="text-xs h-7 mt-2" onClick={handleAdd}>Add PR</Button>
      </div>

      {/* Table */}
      <div className="border border-border rounded overflow-hidden">
        <table className="w-full text-xs">
          <thead><tr className="bg-secondary/50 border-b border-border">
            <th className="p-2 text-left w-8">#</th><th className="p-2 text-left w-24">Org</th><th className="p-2 text-left">Title</th>
            <th className="p-2 text-left w-24">Type</th><th className="p-2 text-left w-28">Status</th><th className="p-2 text-left w-20">Date</th>
            <th className="p-2 w-8">URL</th><th className="p-2 w-8"></th>
          </tr></thead>
          <tbody>
            {prs.map((pr, i) => (
              <tr key={pr.id} className={`border-b border-border hover:bg-secondary/30 ${pr.status === "Merged" ? "row-done" : ""}`}>
                <td className="p-2 text-muted-foreground">{i + 1}</td>
                <td className="p-2">{pr.org}</td>
                <td className="p-2">{pr.title}</td>
                <td className="p-2 text-muted-foreground">{pr.type}</td>
                <td className="p-2">
                  <Select value={pr.status} onValueChange={(v) => setPRs(prev => prev.map(p => p.id === pr.id ? { ...p, status: v } : p))}>
                    <SelectTrigger className="h-6 text-xs border-none bg-transparent"><SelectValue /></SelectTrigger>
                    <SelectContent>{PR_STATUSES.map(s => <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>)}</SelectContent>
                  </Select>
                </td>
                <td className="p-2 text-muted-foreground">{pr.date}</td>
                <td className="p-2">{pr.url && <a href={pr.url} target="_blank" rel="noreferrer" className="text-primary hover:underline"><ExternalLink className="h-3 w-3" /></a>}</td>
                <td className="p-2"><button onClick={() => setPRs(prev => prev.filter(p => p.id !== pr.id))} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-3 w-3" /></button></td>
              </tr>
            ))}
            {prs.length === 0 && <tr><td colSpan={8} className="p-4 text-center text-muted-foreground">No PRs logged yet</td></tr>}
          </tbody>
        </table>
      </div>

      {/* PR Quality Ladder */}
      <div className="bg-card border border-border rounded p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium">PR Quality Ladder</span>
          <span className="text-xs text-muted-foreground">{mergedCount}/10 merged</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2 mb-3">
          <div className="bg-primary rounded-full h-2 transition-all" style={{ width: `${Math.min(100, (mergedCount / 10) * 100)}%` }} />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {LADDER.map((rung, i) => {
            const isActive = ladderOverride >= 0 ? i <= ladderOverride : mergedCount >= (i === 0 ? 1 : LADDER[i - 1].threshold + 1);
            return (
              <button key={i} onClick={() => setLadderOverride(ladderOverride === i ? -1 : i)}
                className={`text-left p-2 rounded border text-xs transition-colors ${isActive ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}>
                <div className="font-medium">{rung.range}</div>
                <div className="text-[10px] mt-0.5">{rung.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Community Status */}
      <div className="bg-card border border-border rounded p-3">
        <div className="text-xs font-medium mb-2">Org Community Status</div>
        <div className="grid grid-cols-3 gap-4">
          {COMMUNITY_ORGS.map(orgName => (
            <div key={orgName}>
              <div className="text-xs font-medium text-primary mb-1">{orgName}</div>
              {COMMUNITY_ITEMS.map(item => (
                <label key={item} className="flex items-center gap-2 text-xs cursor-pointer py-0.5">
                  <input type="checkbox" checked={!!community[orgName]?.[item]}
                    onChange={() => setCommunity(prev => ({
                      ...prev, [orgName]: { ...prev[orgName], [item]: !prev[orgName]?.[item] }
                    }))} className="accent-primary" />
                  <span className={community[orgName]?.[item] ? "text-success" : "text-muted-foreground"}>{item}</span>
                </label>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
