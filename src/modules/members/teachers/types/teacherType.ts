export interface ICreateTeacher {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  hire_date: Date;
  is_active: boolean;
  user: IUser;
  father_or_husband_name: string;
  national_id: string;
  education: string;
  gender: "Male" | "Female" | "Other";
  religion: string;
  bloodGroup?: TBloodGroup;
  experience: string;
  dateOfBirth: Date;
  home_address: string;
  image: string;
}

export type TBloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "O+"
  | "O-"
  | "AB+"
  | "AB-";

export interface IGetTeacher {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  hire_date: Date;
  is_active: boolean;
  user: IGetUser;
  base_salary?: any;
  attendance?: any;
}

export interface IGetUser {
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
  institution: IGetInstitution;
}

export interface IGetInstitution {
  id: number;
  name: string;
  code: string;
  city: string;
  contact_email: string;
  is_active: boolean;
}

export interface IUser {
  username: string;
  password: string;
}
