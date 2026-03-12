import { useState, useEffect, useCallback } from "react";
import type { Student, DomainKey } from "@/types";
import { defaultStudents } from "@/data/students";

const STORAGE_KEY = "class-picker-students";

function loadStudents(): Student[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore parse errors
  }
  return defaultStudents;
}

export function useStudents() {
  const [students, setStudents] = useState<Student[]>(loadStudents);
  const [activeStudentId, setActiveStudentId] = useState<string>(
    () => loadStudents()[0]?.id ?? ""
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  const activeStudent = students.find((s) => s.id === activeStudentId) ?? students[0];

  const toggleClass = useCallback(
    (className: string) => {
      setStudents((prev) =>
        prev.map((s) => {
          if (s.id !== activeStudentId) return s;
          const has = s.selectedClasses.includes(className);
          if (has) {
            return { ...s, selectedClasses: s.selectedClasses.filter((c) => c !== className) };
          }
          if (s.selectedClasses.length >= s.maxPicks) return s;
          return { ...s, selectedClasses: [...s.selectedClasses, className] };
        })
      );
    },
    [activeStudentId]
  );

  const addStudent = useCallback((student: Omit<Student, "id" | "selectedClasses">) => {
    const id = crypto.randomUUID();
    setStudents((prev) => [...prev, { ...student, id, selectedClasses: [], interests: student.interests ?? [] }]);
    setActiveStudentId(id);
  }, []);

  const updateStudent = useCallback(
    (id: string, updates: Partial<Pick<Student, "name" | "grade" | "band" | "homeCoverage" | "homeCurriculumLabel" | "maxPicks" | "previousClasses" | "interests">>) => {
      setStudents((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
      );
    },
    []
  );

  const removeStudent = useCallback(
    (id: string) => {
      setStudents((prev) => {
        const next = prev.filter((s) => s.id !== id);
        if (activeStudentId === id && next.length > 0) {
          setActiveStudentId(next[0].id);
        }
        return next;
      });
    },
    [activeStudentId]
  );

  const resetToDefaults = useCallback(() => {
    setStudents(defaultStudents);
    setActiveStudentId(defaultStudents[0].id);
  }, []);

  return {
    students,
    activeStudent,
    activeStudentId,
    setActiveStudentId,
    toggleClass,
    addStudent,
    updateStudent,
    removeStudent,
    resetToDefaults,
  };
}

export function computeCoverage(
  student: Student,
  selectedClasses: { domains: Partial<Record<DomainKey, number>> }[]
): Record<DomainKey, { home: number; selected: number; total: number }> {
  const keys: DomainKey[] = [
    "literacy", "math", "science", "socialStudies",
    "creativeArts", "lifeSkills", "physical", "communication",
  ];

  const result = {} as Record<DomainKey, { home: number; selected: number; total: number }>;
  for (const key of keys) {
    const home = student.homeCoverage[key] ?? 0;
    const selected = Math.max(
      0,
      ...selectedClasses.map((c) => c.domains[key] ?? 0)
    );
    result[key] = { home, selected, total: Math.min(5, home + selected) };
  }
  return result;
}
