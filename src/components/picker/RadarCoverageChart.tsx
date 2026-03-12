import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { Student, DomainKey } from "@/types";
import { domains } from "@/data/domains";
import { classes } from "@/data/classes";
import { DOMAIN_KEYS } from "@/types";

interface RadarCoverageChartProps {
  student: Student;
}

export function RadarCoverageChart({ student }: RadarCoverageChartProps) {
  const selectedClassData = classes.filter((c) =>
    student.selectedClasses.includes(c.name)
  );
  const previousClassData = classes.filter((c) =>
    student.previousClasses.includes(c.name)
  );

  const data = DOMAIN_KEYS.map((key) => {
    const domain = domains.find((d) => d.key === key)!;
    const home = student.homeCoverage[key] ?? 0;
    const selected = Math.max(0, ...selectedClassData.map((c) => c.domains[key] ?? 0), 0);
    const previous = Math.max(0, ...previousClassData.map((c) => c.domains[key] ?? 0), 0);

    return {
      domain: domain.label,
      home,
      selected: Math.min(5, home + selected),
      previous,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={320}>
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
        <PolarGrid stroke="hsl(var(--border))" />
        <PolarAngleAxis
          dataKey="domain"
          tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 5]}
          tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
          tickCount={6}
        />
        <Radar
          name="Previous Semester"
          dataKey="previous"
          stroke="hsl(var(--chart-previous))"
          fill="transparent"
          strokeWidth={1.5}
          strokeDasharray="4 3"
        />
        <Radar
          name="Home Curriculum"
          dataKey="home"
          stroke="hsl(var(--chart-home))"
          fill="hsl(var(--chart-home))"
          fillOpacity={0.15}
          strokeWidth={2}
        />
        <Radar
          name="With Selected"
          dataKey="selected"
          stroke="hsl(var(--chart-selected))"
          fill="hsl(var(--chart-selected))"
          fillOpacity={0.2}
          strokeWidth={2}
        />
        <Legend
          wrapperStyle={{ fontSize: 12 }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
