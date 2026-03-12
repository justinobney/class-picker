import { useState } from "react";
import type { Student, Band, DomainKey } from "@/types";
import { domains } from "@/data/domains";
import { DOMAIN_KEYS } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StudentEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student?: Student;
  onSave: (data: Omit<Student, "id" | "selectedClasses">) => void;
}

export function StudentEditor({ open, onOpenChange, student, onSave }: StudentEditorProps) {
  const [name, setName] = useState(student?.name ?? "");
  const [grade, setGrade] = useState(student?.grade ?? "");
  const [band, setBand] = useState<Band>(student?.band ?? "K-2");
  const [curriculumLabel, setCurriculumLabel] = useState(student?.homeCurriculumLabel ?? "");
  const [coverage, setCoverage] = useState<Partial<Record<DomainKey, number>>>(
    student?.homeCoverage ?? {}
  );
  const [maxPicks, setMaxPicks] = useState(student?.maxPicks ?? 3);

  function handleSave() {
    if (!name.trim()) return;
    onSave({
      name: name.trim(),
      grade: grade.trim(),
      band,
      homeCoverage: coverage,
      homeCurriculumLabel: curriculumLabel.trim(),
      previousClasses: student?.previousClasses ?? [],
      maxPicks,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{student ? "Edit Student" : "Add Student"}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="grade">Grade</Label>
              <Input id="grade" value={grade} onChange={(e) => setGrade(e.target.value)} placeholder="e.g. 3rd" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Band</Label>
              <Select value={band} onValueChange={(v) => setBand(v as Band)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="K-2">K-2</SelectItem>
                  <SelectItem value="2-5">2-5</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Max Picks</Label>
              <Select value={String(maxPicks)} onValueChange={(v) => setMaxPicks(Number(v))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="curriculum">Home Curriculum</Label>
            <Input
              id="curriculum"
              value={curriculumLabel}
              onChange={(e) => setCurriculumLabel(e.target.value)}
              placeholder="e.g. TGATB Level 4"
            />
          </div>
          <div>
            <Label className="mb-2 block">Home Coverage (0-5 per domain)</Label>
            <div className="flex flex-col gap-3">
              {DOMAIN_KEYS.map((key) => {
                const domain = domains.find((d) => d.key === key)!;
                const value = coverage[key] ?? 0;
                return (
                  <div key={key} className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground w-28 shrink-0">
                      {domain.label}
                    </span>
                    <Slider
                      value={[value]}
                      min={0}
                      max={5}
                      step={1}
                      onValueChange={([v]) =>
                        setCoverage((prev) => ({ ...prev, [key]: v }))
                      }
                      className="flex-1"
                    />
                    <span className="text-xs font-mono w-4 text-right">{value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={!name.trim()}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
