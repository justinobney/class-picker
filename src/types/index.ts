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

export const INTEREST_KEYS = [
  "animals",
  "building",
  "cooking",
  "art",
  "music",
  "outdoors",
  "sports",
  "reading",
  "history",
  "experiments",
  "games",
  "performing",
  "faith",
  "exploring",
] as const;

export type InterestKey = (typeof INTEREST_KEYS)[number];

export interface Interest {
  key: InterestKey;
  label: string;
  emoji: string;
}

export interface CoopClass {
  name: string;
  bands: Band[];
  domains: Partial<Record<DomainKey, number>>; // 1-5 per domain
  primaryDomain: DomainKey;
  style: string;
  description: string;
  stepsUpFrom?: string[];
  interests: InterestKey[];
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
  interests: InterestKey[];
}
