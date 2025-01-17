export interface ISubjects {
  id: number;
  name: string;
  marks: number;
  grade_level: IGrade_Level;
}

export interface IGrade_Level {
  id: 1;
  name: string;
  description: string;
  class_teacher: string | null;
}
