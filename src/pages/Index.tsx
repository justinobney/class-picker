import { useState } from "react";
import { useStudents } from "@/hooks/useStudents";
import { StudentSelector } from "@/components/picker/StudentSelector";
import { StudentEditor } from "@/components/picker/StudentEditor";
import { RadarCoverageChart } from "@/components/picker/RadarCoverageChart";
import { SelectionSummary } from "@/components/picker/SelectionSummary";
import { GapWarnings } from "@/components/picker/GapWarnings";
import { ClassBrowser } from "@/components/picker/ClassBrowser";
import { Button } from "@/components/ui/button";
import { Plus, HelpCircle, Pencil, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Index() {
  const {
    students,
    activeStudent,
    activeStudentId,
    setActiveStudentId,
    toggleClass,
    addStudent,
    updateStudent,
    removeStudent,
  } = useStudents();

  const [editorOpen, setEditorOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<typeof activeStudent | undefined>();
  const isMobile = useIsMobile();

  if (students.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-2">Homeschool Class Picker</h1>
          <p className="text-muted-foreground mb-6">
            Add a student to get started. You'll set their grade band and home curriculum coverage,
            then browse co-op classes to fill the gaps.
          </p>
          <Button onClick={() => { setEditingStudent(undefined); setEditorOpen(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
          <StudentEditor
            open={editorOpen}
            onOpenChange={setEditorOpen}
            onSave={addStudent}
          />
        </div>
      </div>
    );
  }

  const leftPanel = (
    <div className="flex flex-col gap-5">
      <StudentSelector
        students={students}
        activeId={activeStudentId}
        onSelect={setActiveStudentId}
      />
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">
          {activeStudent.homeCurriculumLabel} &middot; {activeStudent.band} band
        </span>
        <div className="ml-auto flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => {
              setEditingStudent(activeStudent);
              setEditorOpen(true);
            }}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          {students.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={() => removeStudent(activeStudentId)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
      <RadarCoverageChart student={activeStudent} />
      <SelectionSummary student={activeStudent} onToggleClass={toggleClass} />
      <GapWarnings student={activeStudent} />
    </div>
  );

  const rightPanel = (
    <ClassBrowser student={activeStudent} onToggleClass={toggleClass} />
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold">Homeschool Class Picker</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => { setEditingStudent(undefined); setEditorOpen(true); }}
          >
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Add Student
          </Button>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs text-sm">
              <p className="font-semibold mb-1">How to use</p>
              <p>
                Your home curriculum fills some learning domains (shown in blue on the chart).
                Browse co-op classes on the right and select up to {activeStudent.maxPicks} to
                fill the remaining gaps (shown in green). The chart updates live as you pick.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </header>

      {/* Main content */}
      {isMobile ? (
        <div className="p-4 flex flex-col gap-6">
          {leftPanel}
          {rightPanel}
        </div>
      ) : (
        <div className="grid grid-cols-[380px_1fr] h-[calc(100vh-57px)]">
          <div className="border-r p-5 overflow-y-auto">
            {leftPanel}
          </div>
          <div className="p-5 overflow-hidden flex flex-col">
            {rightPanel}
          </div>
        </div>
      )}

      {/* Editor dialog */}
      <StudentEditor
        key={editingStudent?.id ?? "new"}
        open={editorOpen}
        onOpenChange={setEditorOpen}
        student={editingStudent}
        onSave={(data) => {
          if (editingStudent) {
            updateStudent(editingStudent.id, data);
          } else {
            addStudent(data);
          }
        }}
      />
    </div>
  );
}
