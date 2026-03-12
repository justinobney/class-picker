export const DOMAIN_KEYS = [
  "literacy",
  "math",
  "science",
  "socialStudies",
  "creativeArts",
  "lifeSkills",
  "physical",
  "communication",
] as const;

export type DomainKey = (typeof DOMAIN_KEYS)[number];

export interface Domain {
  key: DomainKey;
  label: string;
  icon: string;
}

export interface CoopClass {
  name: string;
  bands: Band[];
  domains: Partial<Record<DomainKey, number>>; // 1-5 per domain
  primaryDomain: DomainKey;
  style: string;
  description: string;
  stepsUpFrom?: string[];
}

export type Band = "K-2" | "2-5";

export interface Student {
  id: string;
  name: string;
  grade: string;
  band: Band;
  homeCoverage: Partial<Record<DomainKey, number>>; // 0-5 per domain
  homeCurriculumLabel: string;
  previousClasses: string[]; // last semester
  selectedClasses: string[]; // user picks
  maxPicks: number;
}
