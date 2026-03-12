import { useState } from "react";
import { cn } from "@/lib/utils";
import { domains } from "@/data/domains";
import { interests as interestData } from "@/data/interests";
import type { CoopClass, InterestKey } from "@/types";
import { interestOverlap } from "@/hooks/useFilteredClasses";
import { DomainDots } from "./DomainDots";
import { ChevronDown, ChevronUp, ArrowUp, Heart } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface ClassCardProps {
  coopClass: CoopClass;
  selected: boolean;
  disabled: boolean;
  isPrevious: boolean;
  studentInterests: InterestKey[];
  onToggle: () => void;
}

export function ClassCard({ coopClass, selected, disabled, isPrevious, studentInterests, onToggle }: ClassCardProps) {
  const [expanded, setExpanded] = useState(false);

  const domainEntries = Object.entries(coopClass.domains)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 3);

  const matchCount = interestOverlap(coopClass.interests, studentInterests);
  const matchedInterests = coopClass.interests.filter((i) => studentInterests.includes(i));
  const unmatchedInterests = coopClass.interests.filter((i) => !studentInterests.includes(i));

  return (
    <div
      className={cn(
        "rounded-lg border p-3 transition-all",
        selected && "border-primary/50 bg-primary/5",
        isPrevious && !selected && "border-dashed border-muted-foreground/30 bg-muted/30",
        !selected && !isPrevious && "hover:border-muted-foreground/30"
      )}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={selected}
          disabled={disabled && !selected}
          onCheckedChange={onToggle}
          className="mt-0.5"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-sm">{coopClass.name}</span>
            {coopClass.bands.map((b) => (
              <Badge key={b} variant="outline" className="text-xs px-1.5 py-0">
                {b}
              </Badge>
            ))}
            {isPrevious && (
              <Badge variant="secondary" className="text-xs px-1.5 py-0">
                Previous
              </Badge>
            )}
            {matchCount > 0 && (
              <span className="inline-flex items-center gap-0.5 text-xs text-rose-500">
                <Heart className="h-3 w-3 fill-current" />
                {matchCount}
              </span>
            )}
          </div>
          {coopClass.interests.length > 0 && (
            <div className="flex items-center gap-1 mt-1 flex-wrap">
              {matchedInterests.map((key) => {
                const interest = interestData.find((i) => i.key === key);
                return interest ? (
                  <span key={key} className="inline-flex items-center gap-0.5 rounded-full bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 px-1.5 py-0 text-xs font-medium">
                    {interest.emoji} {interest.label}
                  </span>
                ) : null;
              })}
              {unmatchedInterests.map((key) => {
                const interest = interestData.find((i) => i.key === key);
                return interest ? (
                  <span key={key} className="inline-flex items-center gap-0.5 rounded-full bg-muted text-muted-foreground px-1.5 py-0 text-xs">
                    {interest.emoji} {interest.label}
                  </span>
                ) : null;
              })}
            </div>
          )}
          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
            {domainEntries.map(([key, score]) => {
              const domain = domains.find((d) => d.key === key);
              return (
                <span key={key} className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  {domain?.label}
                  <DomainDots score={score as number} />
                </span>
              );
            })}
          </div>
          {coopClass.stepsUpFrom && coopClass.stepsUpFrom.length > 0 && (
            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              <ArrowUp className="h-3 w-3" />
              Steps up from: {coopClass.stepsUpFrom.join(", ")}
            </div>
          )}
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-muted-foreground hover:text-foreground p-1"
        >
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>
      {expanded && (
        <div className="mt-2 ml-9 text-sm text-muted-foreground">
          <p>{coopClass.description}</p>
          <p className="mt-1 text-xs italic">{coopClass.style}</p>
        </div>
      )}
    </div>
  );
}
