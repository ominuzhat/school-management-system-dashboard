type TInstitution = {
  id: number;
  name: string;
  code: string;
  city: string;
  contact_email: string;
  is_active: boolean;
};

export type TGetPermission = {
  id: number;
  name: string;
  codename: string;
};

export type TGetRolePermission = {
  id: number;
  name: string;
  institution: TInstitution;
};

export interface IUpdateRolePermission {
  users: number[];
  permissions: number[];
  has_grand_access: boolean;
}

export interface IGetSingleRolePermission {
  id: number;
  name: string;
  institution: WelcomeInstitution;
  users: IUser[];
  permissions: Permission[];
}

export interface WelcomeInstitution {
  id: number;
  name: string;
  code: string;
  address: string;
  contact_email: string;
  phone_number: string;
  logo: null;
  established_date: Date;
  is_active: boolean;
  institution_type: string;
  website_url: string;
  founder: string;
  description: string;
  facebook_url: string;
  twitter_url: string;
  linkedin_url: string;
  city: string;
  campus_size: number;
  num_students: number;
  accreditations: string;
  ownership_type: string;
  latitude: number;
  longitude: number;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface Permission {
  id: number;
  name: string;
  codename?: string;
}

export interface IUser {
  id: number;
  username: string;
  role: IRole;
  date_joined: Date;
  last_login: Date;
  is_active: boolean;
  teacher: null;
}

export interface IRole {
  id: number;
  name: string;
  institution: IRoleInstitution;
}

export interface IRoleInstitution {
  id: number;
  name: string;
  code: string;
  city: string;
  contact_email: string;
  is_active: boolean;
}
