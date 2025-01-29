import { IRole } from "../../../members/students/types/studentsType";

interface User {
  id: number;
  username: string;
  role: IRole;
  date_joined: string;
  last_login: string;
  is_active: boolean;
}

export interface IGetDepartmentWithDescriptions {
  id: number;
  name: string;
  description: string | null;
  institution: number;
}

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  user: User;
  hire_date: string;
  base_salary: number;
  position: string;
  department: IGetDepartmentWithDescriptions;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface Deduction {
  id: number;
  payroll: number;
  remarks: string;
  amount: number;
}

interface Payment {
  id: number;
  payroll: number;
  payment_method: string;
  amount_paid: number;
  payment_date: string;
}

interface Payroll {
  id: number;
  employee: Employee;
  period_start: string;
  period_end: string;
  attendance_days: number;
  gross_salary: number;
  net_salary: number;
  teacher: string | null;
  deductions: Deduction[];
  payments: Payment[];
  advance_salary: number;
  provident_fund: number;
  mobile_bill: number;
  feed_allowance: number;
  performance_bonus: number;
  festival_bonus: number;
  travel_allowance: number;
  health_allowance: number;
  incentive: number;
  house_rent: number;
  profit_share: number;
  sales_commission: number;
  other_allowance: number;
  paid_Amount: number;
  due_Amount: number;
}

export interface IGetPayment {
  id: number;
  payroll: Payroll;
  payment_method: string;
  amount_paid: number;
  payment_date: string;
}

export interface ICreatePayment {
  payroll: number;
  payment_method: string;
  amount_paid: number;
  payment_date: string;
}
