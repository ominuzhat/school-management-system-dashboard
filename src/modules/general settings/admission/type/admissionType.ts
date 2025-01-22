import { ISubjects } from "../../subjects/type/subjectsType";

export interface GradeLevel {
  id: number;
  name: string;
  description: string;
  class_teacher: string | null;
}

export interface Session {
  id: number;
  name: string;
  institution: number;
}

export interface IAdmission {
  id: number;
  student: number;
  subjects: ISubjects[];
  admission_date: string;
  registration_number: string;
  fee_type: "class" | "other";
  one_time_fee: number;
  monthly_fee: number;
  session: Session;
  grade_level: GradeLevel | null;
}
