
export interface ICreateSchedule {
  name: string,
  start_time: string,
  end_time:  string,
  is_active: boolean,
  flexible: number

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
