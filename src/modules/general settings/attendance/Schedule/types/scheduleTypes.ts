
export interface ICreateSchedule {
  name: string;
  leave_type: string;
  duration: string;
  reason: string;
  start_date: string;
  end_date: string;
  is_approved: boolean;
}
export interface IGetSchedule {
  name: string;
  leave_type: string;
  duration: string;
  reason: string;
  start_date: string;
  end_date: string;
  is_approved: boolean;
}
