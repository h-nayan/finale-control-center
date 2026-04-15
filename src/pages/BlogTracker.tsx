import { useLocalStorage } from "@/hooks/useLocalStorage";
import { BLOGS_DATA } from "@/data/weeks";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BLOG_STATUSES = ["Not Started", "Drafting", "Drafted", "Published"] as const;

export default function BlogTracker() {
  const [statuses, setStatuses] = useLocalStorage<Record<number, string>>("finale-blog-statuses", {});
  const [urls, setUrls] = useLocalStorage<Record<number, string>>("finale-blog-urls", {});

  const statusClass = (s: string) => {
    switch (s) {
      case "Drafting": return "status-drafting";
      case "Drafted": return "status-drafted";
      case "Published": return "status-published";
      default: return "status-not-started";
    }
  };

  return (
    <div className="max-w-5xl">
      <h1 className="text-lg font-bold mb-3">Blog Tracker</h1>
      <div className="border border-border rounded overflow-hidden">
        <table className="w-full text-xs">
          <thead><tr className="bg-secondary/50 border-b border-border">
            <th className="p-2 text-left w-8">#</th>
            <th className="p-2 text-left">Topic</th>
            <th className="p-2 text-left w-28">Draft By</th>
            <th className="p-2 text-left w-28">Publish By</th>
            <th className="p-2 text-left w-28">Status</th>
            <th className="p-2 text-left w-40">Hashnode URL</th>
          </tr></thead>
          <tbody>
            {BLOGS_DATA.map(blog => {
              const status = statuses[blog.id] || "Not Started";
              return (
                <tr key={blog.id} className={`border-b border-border hover:bg-secondary/30 ${status === "Published" ? "row-done" : ""}`}>
                  <td className="p-2 text-muted-foreground">{blog.id}</td>
                  <td className="p-2">{blog.topic}</td>
                  <td className="p-2 text-muted-foreground">{blog.draftBy}</td>
                  <td className="p-2 text-muted-foreground">{blog.publishBy}</td>
                  <td className={`p-2 ${statusClass(status)}`}>
                    <Select value={status} onValueChange={(v) => setStatuses(prev => ({ ...prev, [blog.id]: v }))}>
                      <SelectTrigger className="h-6 text-xs border-none bg-transparent"><SelectValue /></SelectTrigger>
                      <SelectContent>{BLOG_STATUSES.map(s => <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>)}</SelectContent>
                    </Select>
                  </td>
                  <td className="p-2">
                    <Input value={urls[blog.id] || ""} onChange={e => setUrls(prev => ({ ...prev, [blog.id]: e.target.value }))}
                      placeholder="https://..." className="h-6 text-xs border-none bg-transparent" />
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
