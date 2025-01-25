export interface ICreateEmployee {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  hire_date: string;
  position: string;
  department: number;
  is_active: boolean;
  user: IEmployeeUser;
}

interface IEmployeeUser {
  password: string;
  username: string;
  role: number;
}
