export interface ICreateExamMark {
  mcq_marks_obtained: number;
  written_marks_obtained: number;
  comment: string;
  exam: number;
  admission: number;
  subject: number;
}

type Subject = {
  id: number;
  name: string;
  mcq_marks_obtained: number;
  written_marks_obtained: number;
  total_marks: number;
  comment: string;
};

type GradeLevel = {
  id: number;
  name: string;
};

type Session = {
  id: number;
  name: string;
};

type Section = {
  id: number;
  name: string;
};

type Shift = {
  id: number;
  name: string;
};

export interface IGetMarkExam {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  grade_level: GradeLevel;
  session: Session;
  section: Section;
  shift: Shift;
  roll: string;
  registration_number: string;
  subjects: Subject[];
}
