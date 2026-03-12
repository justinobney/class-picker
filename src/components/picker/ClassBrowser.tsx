import { useState } from "react";
import type { Student, DomainKey } from "@/types";
import { useFilteredClasses } from "@/hooks/useFilteredClasses";
import { DomainFilterBar } from "./DomainFilterBar";
import { ClassCard } from "./ClassCard";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ClassBrowserProps {
  student: Student;
  onToggleClass: (name: string) => void;
}

export function ClassBrowser({ student, onToggleClass }: ClassBrowserProps) {
  const [domainFilter, setDomainFilter] = useState<DomainKey | null>(null);
  const filtered = useFilteredClasses(student.band, domainFilter, student.interests);
  const atMax = student.selectedClasses.length >= student.maxPicks;

  return (
    <div className="flex flex-col gap-4 h-full">
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Browse by Domain
        </h3>
        <DomainFilterBar active={domainFilter} onSelect={setDomainFilter} />
      </div>
      {student.interests.length > 0 && (
        <p className="text-xs text-muted-foreground -mt-2">
          Sorted by interest match. Classes matching {student.name}'s interests appear first.
        </p>
      )}
      <ScrollArea className="flex-1 -mx-1 px-1">
        <div className="flex flex-col gap-2 pb-4">
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">
              No classes found for {student.band} band in this domain.
            </p>
          ) : (
            filtered.map((c) => (
              <ClassCard
                key={c.name}
                coopClass={c}
                selected={student.selectedClasses.includes(c.name)}
                disabled={atMax}
                isPrevious={student.previousClasses.includes(c.name)}
                studentInterests={student.interests}
                onToggle={() => onToggleClass(c.name)}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
