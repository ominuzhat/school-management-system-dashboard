import { IAdmission } from "../../admission/type/admissionType";

export interface ICreateLeave {
  name: string;
  leave_type: string;
  duration: string;
  reason: string;
  start_date: string;
  end_date: string;
  is_approved: boolean;
}
export interface IGetLeave {
  name: string;
  leave_type: string;
  duration: string;
  reason: string;
  start_date: string;
  end_date: string;
  is_approved: boolean;
  admission: IAdmission;
}
