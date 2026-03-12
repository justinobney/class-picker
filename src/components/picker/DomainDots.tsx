import { cn } from "@/lib/utils";

interface DomainDotsProps {
  score: number;
  max?: number;
  className?: string;
}

export function DomainDots({ score, max = 5, className }: DomainDotsProps) {
  return (
    <span className={cn("inline-flex gap-0.5", className)}>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-2 w-2 rounded-full",
            i < score ? "bg-primary" : "bg-muted"
          )}
        />
      ))}
    </span>
  );
}
