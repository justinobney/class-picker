import type { Student } from "@/types";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SelectionSummaryProps {
  student: Student;
  onToggleClass: (name: string) => void;
}

export function SelectionSummary({ student, onToggleClass }: SelectionSummaryProps) {
  const remaining = student.maxPicks - student.selectedClasses.length;

  return (
    <div>
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
        Selected ({student.selectedClasses.length}/{student.maxPicks})
      </h3>
      {student.selectedClasses.length === 0 ? (
        <p className="text-sm text-muted-foreground">No classes selected yet.</p>
      ) : (
        <div className="flex flex-col gap-1.5">
          {student.selectedClasses.map((name) => (
            <div
              key={name}
              className="flex items-center justify-between rounded-md bg-primary/5 border border-primary/20 px-3 py-1.5"
            >
              <span className="text-sm font-medium">{name}</span>
              <button
                onClick={() => onToggleClass(name)}
                className="text-muted-foreground hover:text-destructive p-0.5"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
      {remaining > 0 && student.selectedClasses.length > 0 && (
        <p className="text-xs text-muted-foreground mt-2">
          {remaining} {remaining === 1 ? "slot" : "slots"} remaining
        </p>
      )}
    </div>
  );
}
