import { useMemo } from "react";
import type { Band, DomainKey, InterestKey, CoopClass } from "@/types";
import { classes } from "@/data/classes";

export function interestOverlap(classInterests: InterestKey[], studentInterests: InterestKey[]): number {
  return classInterests.filter((i) => studentInterests.includes(i)).length;
}

export function useFilteredClasses(band: Band, domainFilter: DomainKey | null, studentInterests: InterestKey[] = []) {
  return useMemo(() => {
    let filtered = classes.filter((c) => c.bands.includes(band));

    if (domainFilter) {
      filtered = filtered.filter(
        (c) => c.primaryDomain === domainFilter || (c.domains[domainFilter] ?? 0) >= 2
      );
    }

    // Sort: interest overlap first, then domain relevance, then alphabetical
    filtered.sort((a, b) => {
      const aMatch = interestOverlap(a.interests, studentInterests);
      const bMatch = interestOverlap(b.interests, studentInterests);
      if (aMatch !== bMatch) return bMatch - aMatch;

      if (domainFilter) {
        const aPrimary = a.primaryDomain === domainFilter ? 1 : 0;
        const bPrimary = b.primaryDomain === domainFilter ? 1 : 0;
        if (aPrimary !== bPrimary) return bPrimary - aPrimary;
        const aScore = a.domains[domainFilter] ?? 0;
        const bScore = b.domains[domainFilter] ?? 0;
        if (aScore !== bScore) return bScore - aScore;
      }

      return a.name.localeCompare(b.name);
    });

    return filtered;
  }, [band, domainFilter, studentInterests]);
}
