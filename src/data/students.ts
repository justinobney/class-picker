import type { Student } from "@/types";

export const defaultStudents: Student[] = [
  {
    id: "riley",
    name: "Riley",
    grade: "3rd",
    band: "2-5",
    homeCoverage: {
      literacy: 5,
      math: 5,
      socialStudies: 2,
      creativeArts: 2,
    },
    homeCurriculumLabel: "TGATB Level 4",
    previousClasses: ["LEGOs", "Dogs", "Art"],
    selectedClasses: [],
    maxPicks: 3,
  },
  {
    id: "rowan",
    name: "Rowan",
    grade: "1st",
    band: "K-2",
    homeCoverage: {
      literacy: 3,
      math: 4,
    },
    homeCurriculumLabel: "TGATB Level 1",
    previousClasses: ["LEGOs", "Cooking/Baking", "Maker's Space"],
    selectedClasses: [],
    maxPicks: 3,
  },
];
