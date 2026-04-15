import { useLocalStorage } from "@/hooks/useLocalStorage";
import { WEEKS } from "@/data/weeks";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Problem { id: string; name: string; platform: string; topic: string; difficulty: string; week: string; date: string; notes: string; }

const STATUS_OPTIONS = ["Upcoming", "In Progress", "Done", "Skipped"] as const;

export default function WeeklyTracker() {
  const [statuses, setStatuses] = useLocalStorage<Record<string, string>>("finale-week-statuses", {});
  const [problems] = useLocalStorage<Problem[]>("finale-problems", []);

  const getRowClass = (week: typeof WEEKS[0], status: string) => {
    if (week.type === "blackout") return "row-blackout";
    if (week.type === "buffer") return "row-buffer";
    if (status === "In Progress") return "row-in-progress";
    if (status === "Done") return "row-done";
    if (status === "Skipped") return "row-skipped";
    return "";
  };

  const problemsForWeek = (weekId: string) => problems.filter(p => p.week === weekId).length;

  return (
    <div className="max-w-6xl">
      <h1 className="text-lg font-bold mb-3">Weekly Tracker</h1>
      <div className="border border-border rounded overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-secondary/50 border-b border-border">
              <th className="text-left p-2 w-16">Week</th>
              <th className="text-left p-2 w-28">Dates</th>
              <th className="text-left p-2 w-12">Phase</th>
              <th className="text-left p-2">Topic</th>
              <th className="text-left p-2 w-20">Target</th>
              <th className="text-left p-2 w-16">Logged</th>
              <th className="text-left p-2 w-28">Status</th>
            </tr>
          </thead>
          <tbody>
            {WEEKS.map((week) => {
              const status = statuses[week.id] || "Upcoming";
              return (
                <tr key={week.id} className={`border-b border-border ${getRowClass(week, status)} hover:bg-secondary/30 transition-colors`}>
                  <td className="p-2 font-medium">{week.id}</td>
                  <td className="p-2 text-muted-foreground">{week.dates}</td>
                  <td className="p-2">{week.phase}</td>
                  <td className="p-2">{week.topic}</td>
                  <td className="p-2 text-muted-foreground">{week.target}</td>
                  <td className="p-2 font-medium text-primary">{problemsForWeek(week.id)}</td>
                  <td className="p-2">
                    <Select value={status} onValueChange={(v) => setStatuses(prev => ({ ...prev, [week.id]: v }))}>
                      <SelectTrigger className="h-6 text-xs w-full border-none bg-transparent"><SelectValue /></SelectTrigger>
                      <SelectContent>{STATUS_OPTIONS.map(s => <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>)}</SelectContent>
                    </Select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
