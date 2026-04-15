import { useLocalStorage } from "@/hooks/useLocalStorage";

const PHASE_CHECKLISTS: { phase: string; items: string[] }[] = [
  {
    phase: "Phase 1",
    items: [
      "55–65 problems solved",
      "Git: branching PRs rebasing conventional commits",
      "Can explain JVM Stack vs Heap String immutability",
      "Java 8+ Streams Lambdas Optional fluent use",
      "Maven can build OSS projects locally",
      "First JUnit tests written",
      "LinkedIn + 3 posts live",
      "2 blogs published on Hashnode",
      "CGPA ≥ 7.5 after Test 1",
    ],
  },
  {
    phase: "Phase 2",
    items: [
      "110–140 problems solved",
      "2–3 GSoC orgs selected Slack joined",
      "All 3 target orgs built locally with Maven",
      "Read 3–5 merged PRs per org",
      "Identified 1–2 issues to tackle in summer",
      "Know 5 design patterns can spot in code",
      "LinkedList + Stack built from scratch",
      "Spring Boot can run a REST API locally",
      "Navigate large codebase with IntelliJ shortcuts",
      "1st hackathon done",
      "CF 800+ rating",
      "3 blogs published",
      "CGPA ≥ 7.5 after Test 2",
    ],
  },
  {
    phase: "Phase 3",
    items: [
      "110–135 problems solved",
      "5–8 merged OSS PRs",
      "Known by name in 1–2 org communities",
      "Spring Boot REST API with CI/CD running",
      "Docker basics understood",
      "Trie mastered not skipped",
      "HashMap Heap BST LinkedList Stack built from scratch",
      "2nd hackathon done",
      "CF 1000+",
      "LC Weekly Contest participation started",
      "5 blogs published",
      "Reviewed 5+ PRs in GSoC org",
    ],
  },
  {
    phase: "Phase 4",
    items: [
      "350–430 problems solved total",
      "1 project open-sourced with CONTRIBUTING.md + CI/CD",
      "LC 1400+ CF 1200+",
      "5–10 merged OSS PRs",
      "Resume built 1 page reviewed PDF ready",
      "3+ hackathons done",
      "SIH registered",
      "Can explain solutions out loud in mock interviews",
      "GSoC project idea validated with mentor",
      "6+ blogs published",
      "CGPA ≥ 7.5",
    ],
  },
];

export default function Checkpoints() {
  const [checks, setChecks] = useLocalStorage<Record<string, Record<string, boolean>>>("finale-checkpoints", {});

  const toggle = (phase: string, item: string) => {
    setChecks(prev => ({
      ...prev,
      [phase]: { ...prev[phase], [item]: !prev[phase]?.[item] },
    }));
  };

  return (
    <div className="max-w-5xl">
      <h1 className="text-lg font-bold mb-3">Checkpoints</h1>
      <div className="grid grid-cols-2 gap-3">
        {PHASE_CHECKLISTS.map(({ phase, items }) => {
          const checked = items.filter(i => checks[phase]?.[i]).length;
          return (
            <div key={phase} className="bg-card border border-border rounded p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-primary">{phase}</span>
                <span className="text-xs text-muted-foreground">{checked}/{items.length}</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-1.5 mb-2">
                <div className="bg-primary rounded-full h-1.5 transition-all" style={{ width: `${(checked / items.length) * 100}%` }} />
              </div>
              <div className="space-y-0.5">
                {items.map(item => (
                  <label key={item} className="flex items-start gap-2 text-xs cursor-pointer hover:bg-secondary/30 p-1 rounded">
                    <input type="checkbox" checked={!!checks[phase]?.[item]} onChange={() => toggle(phase, item)} className="accent-primary mt-0.5" />
                    <span className={checks[phase]?.[item] ? "text-success line-through" : "text-muted-foreground"}>{item}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
