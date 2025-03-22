export interface IGradeMarks {
  id: number;
  grade: string;
  mark_from: number;
  mark_upto: number;
  status: string;
  institution_id: number;
}

export interface IFailCriteria {
  overall: number;
  subject: number;
  min_subject: number;
}
