export interface ICreateSms {
  student_attendance_absent: boolean;
  student_attendance_absent_time_in_min: number;
  student_tuition_fee_paid: boolean;
  student_admission_approved: boolean;
  student_tuition_fee_default: true;
  student_tuition_fee_default_time_in_day: number;
  employee_attendance_absent: boolean;
  employee_attendance_absent_time: number;
  employee_salary_paid: boolean;
  is_active: boolean;
}
export interface IGetSms {
  id: number;
  student_attendance_absent: boolean;
  student_attendance_absent_time_in_min: number;
  student_tuition_fee_paid: boolean;
  student_admission_approved: boolean;
  student_tuition_fee_default: true;
  student_tuition_fee_default_time_in_day: number;
  employee_attendance_absent: boolean;
  employee_attendance_absent_time: number;
  employee_salary_paid: boolean;
  is_active: boolean;
}
