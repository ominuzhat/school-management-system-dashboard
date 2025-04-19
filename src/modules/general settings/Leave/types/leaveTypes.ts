import { IAdmission } from "../../admission/type/admissionType";

export interface ICreateLeave {
  name: string;
  leave_type: string;
  leave_duration: string;
  reason: string;
  start_date: string;
  end_date: string;
}
export interface IGetLeave {
  name: string;
  leave_type: string;
  leave_duration: string;
  reason: string;
  start_date: string;
  end_date: string;
  admission: IAdmission;
}
