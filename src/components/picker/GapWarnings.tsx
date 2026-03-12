import type { Student, DomainKey } from "@/types";
import { domains } from "@/data/domains";
import { classes } from "@/data/classes";
import { DOMAIN_KEYS } from "@/types";
import { AlertTriangle } from "lucide-react";

interface GapWarningsProps {
  student: Student;
}

export function GapWarnings({ student }: GapWarningsProps) {
  const selectedClassData = classes.filter((c) =>
    student.selectedClasses.includes(c.name)
  );

  const gaps: string[] = [];
  for (const key of DOMAIN_KEYS) {
    const home = student.homeCoverage[key] ?? 0;
    const selected = Math.max(0, ...selectedClassData.map((c) => c.domains[key] ?? 0), 0);
    if (home + selected === 0) {
      const domain = domains.find((d) => d.key === key);
      if (domain) gaps.push(domain.label);
    }
  }

  if (gaps.length === 0) return null;

  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/20 p-3">
      <div className="flex items-center gap-2 mb-1.5">
        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <span className="text-sm font-medium text-amber-800 dark:text-amber-300">
          Uncovered Domains
        </span>
      </div>
      <ul className="ml-6 text-sm text-amber-700 dark:text-amber-400">
        {gaps.map((g) => (
          <li key={g} className="list-disc">{g}</li>
        ))}
      </ul>
    </div>
  );
}
