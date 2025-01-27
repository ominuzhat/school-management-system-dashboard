import { IRole } from "../../../members/students/types/studentsType";
import { IGetTeacher } from "../../../members/teachers/types/teacherType";

// type Institution = {
//   id: number;
//   name: string;
//   code: string;
//   city: string;
//   contact_email: string;
//   is_active: boolean;
// };

type User = {
  id: number;
  username: string;
  role: IRole;
  date_joined: string;
  last_login: string;
  is_active: boolean;
};

type Department = {
  id: number;
  name: string;
  description: string | null;
  institution: number;
};

type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  user: User;
  hire_date: string;
  base_salary: number;
  position: string;
  department: Department;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export interface IGetPayroll {
  id: number;
  employee: Employee;
  teacher: IGetTeacher;
  period_start: string;
  period_end: string;
  gross_salary: number;
  net_salary: number;
  paid_Amount: number;
  due_Amount: number;
}
