export interface IGetExam {
  id: number;
  name: string;
}
export interface ICreateExam {
  name: string;
  session: number;
  grade_level: number;
  section: number[];
  term: number;
  start_date: string;
  end_date: string;
  comment: string;
  timetables: IExamTimetable[];
}

export interface IExamTimetable {
  subject: number;
  exam_date: string;
  start_time: string;
  end_time: string;
  mcq_marks: number;
  written_marks: number;
  total_marks: number;
  passing_marks: number;
}
