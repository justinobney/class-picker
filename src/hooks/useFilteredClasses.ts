import { useMemo } from "react";
import type { Band, DomainKey, CoopClass } from "@/types";
import { classes } from "@/data/classes";

export function useFilteredClasses(band: Band, domainFilter: DomainKey | null) {
  return useMemo(() => {
    let filtered = classes.filter((c) => c.bands.includes(band));

    if (domainFilter) {
      filtered = filtered.filter(
        (c) => c.primaryDomain === domainFilter || (c.domains[domainFilter] ?? 0) >= 2
      );
      // Sort: primary domain match first, then by score descending, then alphabetical
      filtered.sort((a, b) => {
        const aPrimary = a.primaryDomain === domainFilter ? 1 : 0;
        const bPrimary = b.primaryDomain === domainFilter ? 1 : 0;
        if (aPrimary !== bPrimary) return bPrimary - aPrimary;
        const aScore = a.domains[domainFilter] ?? 0;
        const bScore = b.domains[domainFilter] ?? 0;
        if (aScore !== bScore) return bScore - aScore;
        return a.name.localeCompare(b.name);
      });
    } else {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [band, domainFilter]);
}
