export interface IInstituteProfile {
  name: string;
  address: string;
  contact_email: string;
  phone_number: string;
  logo: string | null;
  established_date: Date;
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
}

export interface IInstituteProfileWrapper {
  data: IInstituteProfile;
}
