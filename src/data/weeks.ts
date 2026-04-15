export interface WeekData {
  id: string;
  dates: string;
  phase: string;
  topic: string;
  target: string;
  type: "normal" | "blackout" | "buffer";
}

export const WEEKS: WeekData[] = [
  { id: "W1", dates: "Mar 1–8", phase: "P1", topic: "Java Intro + Git/GitHub", target: "5", type: "normal" },
  { id: "W2", dates: "Mar 9–15", phase: "P1", topic: "Control Flow + Methods + Strings", target: "15–17", type: "normal" },
  { id: "W3", dates: "Mar 16–22", phase: "P1", topic: "Arrays + Memory Management", target: "12–15", type: "normal" },
  { id: "TEST1", dates: "Mar 23–31", phase: "—", topic: "TEST 1 BLACKOUT", target: "0–5", type: "blackout" },
  { id: "W4", dates: "Apr 3–12", phase: "P1", topic: "OOPs", target: "8–12", type: "normal" },
  { id: "W5", dates: "Apr 13–19", phase: "P1", topic: "Exceptions + Collections", target: "10–13", type: "normal" },
  { id: "W6", dates: "Apr 20–26", phase: "P1", topic: "Java 8+ + Maven + JUnit", target: "5–8", type: "normal" },
  { id: "BUF1", dates: "Apr 27–May 3", phase: "—", topic: "BUFFER WEEK 1", target: "5", type: "buffer" },
  { id: "W7", dates: "May 4–10", phase: "P2", topic: "Complexity + Math + Bit Manipulation", target: "16–20", type: "normal" },
  { id: "W8", dates: "May 11–17", phase: "P2", topic: "Recursion (The Gatekeeper)", target: "18–22", type: "normal" },
  { id: "TEST2", dates: "May 18–25", phase: "—", topic: "TEST 2 BLACKOUT", target: "0–5", type: "blackout" },
  { id: "W9", dates: "May 26–Jun 1", phase: "P2", topic: "Sorting + Searching + Design Patterns", target: "18–22", type: "normal" },
  { id: "W10", dates: "Jun 2–8", phase: "P2", topic: "Linked Lists", target: "18–22", type: "normal" },
  { id: "W11", dates: "Jun 9–15", phase: "P2", topic: "Stacks + Queues + Sliding Window + Spring Boot", target: "20–24", type: "normal" },
  { id: "BUF2", dates: "Jun 12–15", phase: "—", topic: "BUFFER WEEK 2", target: "5", type: "buffer" },
  { id: "FINALS", dates: "Jun 15–Jul 15", phase: "—", topic: "FINALS BLACKOUT", target: "0–10", type: "blackout" },
  { id: "W12", dates: "Jul 21–27", phase: "P3", topic: "Binary Trees + BST + First OSS Contributions", target: "28–32", type: "normal" },
  { id: "W13", dates: "Jul 28–Aug 3", phase: "P3", topic: "Heaps + Hashing + OSS Bug Fixes", target: "25–28", type: "normal" },
  { id: "W14", dates: "Aug 4–10", phase: "P3", topic: "Graphs BFS/DFS + Advanced Graphs", target: "28–32", type: "normal" },
  { id: "W15", dates: "Aug 11–17", phase: "P3", topic: "Dynamic Programming + OSS Consistency", target: "28–32", type: "normal" },
  { id: "W16", dates: "Aug 18–24", phase: "P3", topic: "Trie + Spring Boot REST API + CI/CD + Docker", target: "10–12", type: "normal" },
  { id: "BUF3", dates: "Aug 25–31", phase: "—", topic: "BUFFER WEEK 3", target: "5", type: "buffer" },
  { id: "W17", dates: "Sep 1–7", phase: "P4", topic: "Build + Open Source Your Project", target: "8–10", type: "normal" },
  { id: "W18", dates: "Sep 8–14", phase: "P4", topic: "System Design + SQL + Resume + GSoC Idea Finding", target: "10–15", type: "normal" },
  { id: "W19", dates: "Sep 15–28", phase: "P4", topic: "THE GRIND — Striver SDE Sheet", target: "50–55", type: "normal" },
];

export const TOPICS = [
  "Arrays", "Strings", "OOPs", "Recursion", "Sorting", "Binary Search",
  "Linked Lists", "Stacks/Queues", "Trees/BST", "Heaps", "Graphs", "DP",
  "Trie", "Bit Manipulation", "Design Patterns", "Math/Number Theory",
  "Hashing", "Two Pointers", "Sliding Window", "Greedy", "Backtracking",
  "DSU", "Monotonic Stack", "Other"
] as const;

export const PLATFORMS = ["LeetCode", "Codeforces", "CSES", "HackerRank", "CodeChef", "Custom"] as const;
export const DIFFICULTIES = ["Easy", "Medium", "Hard"] as const;

export const PR_ORGS = ["Checkstyle", "Jenkins", "OpenMRS", "Apache Commons", "CERN HSF", "52North", "Other"] as const;
export const PR_TYPES = ["Test Coverage", "Documentation", "Bug Fix", "Feature", "Refactor", "Other"] as const;
export const PR_STATUSES = ["Draft", "Submitted", "Changes Requested", "Merged", "Rejected"] as const;

export const PHASE_TARGETS: Record<string, [number, number]> = {
  "Phase 1": [55, 65],
  "Phase 2": [170, 210],
  "Phase 3": [290, 350],
  "Phase 4": [350, 430],
  "Phase 5": [430, 500],
};

export const BLOGS_DATA = [
  { id: 1, topic: "How JVM Works — Stack Heap and Why Strings Are Immutable", draftBy: "Week 3 Sat", publishBy: "Week 3 Sun" },
  { id: 2, topic: "OOPs in Java Explained With Real-World Analogies", draftBy: "Buffer W1 Wed", publishBy: "Buffer W1 Sat" },
  { id: 3, topic: "Recursion Finally Clicked — Here's How I Think About It", draftBy: "Week 9 Wed", publishBy: "Week 9 Sat" },
  { id: 4, topic: "How I Made My First Open Source Contribution to [Org]", draftBy: "Week 13 Wed", publishBy: "Week 13 Sat" },
  { id: 5, topic: "Graph Algorithms in Java — BFS DFS Dijkstra with Code", draftBy: "Buffer W3 Wed", publishBy: "Buffer W3 Sat" },
  { id: 6, topic: "I Open-Sourced My Project — Here's the Architecture", draftBy: "Week 19 Wed", publishBy: "Week 19 Sat" },
  { id: 7, topic: "How I'm Preparing for GSoC 2027 as a 2nd Year Student", draftBy: "Nov 2026", publishBy: "Nov 2026" },
  { id: 8, topic: "My GSoC Proposal Process — What I Learned", draftBy: "Feb 2027", publishBy: "Feb 2027" },
];
