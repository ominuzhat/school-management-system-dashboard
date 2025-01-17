export interface IStudents {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  enrollment_date: Date;
  grade_levels: any[];
  is_active: boolean;
  user: IUserStudent;
}

export interface ICreateStudent {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  enrollment_date: Date;
  date_of_birth: Date;
  guardian_name: string;
  guardian_phone_number: string;
  address: string;
  grade_levels: number[];
  is_active: boolean;
  user: string;
}

export interface IUserStudent {
  id: number;
  username: string;
  role: IRole;
  date_joined: Date;
  last_login: Date;
  is_active: boolean;
}

export interface IRole {
  id: number;
  name: string;
  institution: IInstitution;
}

export interface IInstitution {
  id: number;
  name: string;
  code: string;
  city: string;
  contact_email: string;
  is_active: boolean;
}



