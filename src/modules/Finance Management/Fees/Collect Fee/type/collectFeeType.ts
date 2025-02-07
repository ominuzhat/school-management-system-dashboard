import { ISubjects } from "../../../../general settings/subjects/type/subjectsType";
import { IGetInstitution } from "../../../../members/teachers/types/teacherType";
import { IGetAdditionalFee } from "../../Additional Fee/type/additionalFeeTypes";

export interface ISession {
  id: number;
  name: string;
  status: string;
  institution: number;
}

export interface IStudent {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  enrollment_date: string;
  date_of_birth: string;
  guardian_name: string | null;
  guardian_phone_number: string | null;
  address: string;
  is_active: boolean;
  user: IUser;
  admissions: IAdmission[];
}

interface IUser {
  id: number;
  username: string;
  role: IRole;
  date_joined: string;
  last_login: string;
  is_active: boolean;
}

interface IRole {
  id: number;
  name: string;
  institution: IGetInstitution;
}

interface IAdmission {
  id: number;
  subjects: ISubjects[];
  admission_date: string;
  registration_number: string;
  fee_type: string;
  session: string;
  grade_level: string;
  attendance_percent: number;
  total_present: number;
  total_absent: number;
  total_leave: number;
  total_late: number;
  status: string;
  one_time_fee: number;
  monthly_fee: number;
}

export interface IFee {
  id: number;
  name: string;
  amount: number;
  one_time: boolean;
}

export interface IPayment {
  id: number;
  admission: IAdmission;
  month: string;
  paid_amount: number;
  payment_method: string;
  payment_date: string;
  add_ons: any[];
}

export interface CollectFee {
  id: number;
  admission: IAdmission;
  month: string;
  paid_amount: number;
  payment_method: string;
  payment_date: string;
  add_ons: any[];
}

export interface ICreateCollectFee {
  admission: number;
  month: string;
  paid_amount: number;
  payment_method: string;
  payment_date: string;
  add_ons: number[];
}

export interface IGetCollectFee {
  id: number;
  admission: IAdmission;
  month: string;
  paid_amount: number;
  payment_method: string;
  payment_date: string;
  add_ons: IGetAdditionalFee[];
}
