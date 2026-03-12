import { cn } from "@/lib/utils";
import { domains } from "@/data/domains";
import type { DomainKey } from "@/types";
import {
  BookOpen, Calculator, Microscope, Globe,
  Palette, Wrench, Activity, MessageCircle,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen, Calculator, Microscope, Globe,
  Palette, Wrench, Activity, MessageCircle,
};

interface DomainFilterBarProps {
  active: DomainKey | null;
  onSelect: (key: DomainKey | null) => void;
}

export function DomainFilterBar({ active, onSelect }: DomainFilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
          active === null
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        )}
      >
        All
      </button>
      {domains.map((d) => {
        const Icon = iconMap[d.icon];
        return (
          <button
            key={d.key}
            onClick={() => onSelect(active === d.key ? null : d.key)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
              active === d.key
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {Icon && <Icon className="h-3.5 w-3.5" />}
            {d.label}
          </button>
        );
      })}
    </div>
  );
}
