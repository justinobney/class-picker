import { cn } from "@/lib/utils";
import type { Student } from "@/types";

interface StudentSelectorProps {
  students: Student[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function StudentSelector({ students, activeId, onSelect }: StudentSelectorProps) {
  return (
    <div className="flex gap-1 bg-secondary rounded-lg p-1">
      {students.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s.id)}
          className={cn(
            "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
            s.id === activeId
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {s.name}
          <span className="ml-1.5 text-xs text-muted-foreground">
            {s.grade} ({s.band})
          </span>
        </button>
      ))}
    </div>
  );
}
