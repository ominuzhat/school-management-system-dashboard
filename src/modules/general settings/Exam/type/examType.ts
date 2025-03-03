export interface IGetExam {
  name: string;
}
export interface ICreateExam {
  name: string;
  session: number;
  grade_level: number;
  section: number[];
  term: number;
  start_date: string; // Format: YYYY-MM-DD
  end_date: string; // Format: YYYY-MM-DD
  comment: string;
  timetables: IExamTimetable[];
}

export interface IExamTimetable {
  subject: number;
  exam_date: string; // Format: YYYY-MM-DD
  start_time: string; // Format: HH:mm:ss
  end_time: string; // Format: HH:mm:ss
  mcq_marks: number;
  written_marks: number;
  total_marks: number;
  passing_marks: number;
}
