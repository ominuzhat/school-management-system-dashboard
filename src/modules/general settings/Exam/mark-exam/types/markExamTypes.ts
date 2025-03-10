export interface ICreateExamMark {
  mcq_marks_obtained: number;
  written_marks_obtained: number;
  comment: string;
  exam: number;
  admission: number;
  subject: number;
}

export interface IGetExamMark {
    id: number
}