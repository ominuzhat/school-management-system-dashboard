import { ISession } from "../../../Finance Management/Fees/Collect Fee/type/collectFeeType";
import { IStudents } from "../../../members/students/types/studentsType";
import { IGetSection } from "../../Section/types/sectionTypes";
import { IGrade_Level, ISubjects } from "../../subjects/type/subjectsType";

export type IAdmissionStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "passed"
  | "withdrawn"
  | "failed"
  | "on_hold";

export interface IAdmission {
  id: number;
  student: number;
  roll: number;
  subjects: ISubjects[];
  admission_date: string;
  status: IAdmissionStatus;
  registration_number: string;
  discount_value: number;
  fee_type: "class" | "other";
  discount_type: "amount" | "percent";
  one_time_fee: number;
  monthly_fee: number;
  shift: "day" | "noon";
  session: ISession;
  section: IGetSection;
  grade_level: IGrade_Level | null;
  optional_subject: ISubjects | null;
}

export interface ISingleAdmission {
  id: number;
  roll: number;
  student: IStudents;
  subjects: ISubjects[];
  admission_date: string;
  fee_type: string;
  registration_number: string;
  previous_registration_number: string | null;
  discount_type: string;
  discount_value: number;
  one_time_fee: number;
  monthly_fee: number;
  session: ISession;
  grade_level: string;
}
