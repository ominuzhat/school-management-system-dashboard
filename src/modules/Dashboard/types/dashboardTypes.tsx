interface OwnerInfo {
  phone: string;
  support_email: string;
  owner_name: string;
  brand_name: string;
  bin: string;
  hotline: string;
  business_address: string;
  secondary_business_address: string;
  logo: string | null;
  secondary_logo: string | null;
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  secondary_link: string;
}

interface Institution {
  id: number;
  name: string;
  code: string;
  address: string;
  contact_email: string;
  phone_number: string;
  logo: string;
  established_date: string;
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
  created_at: string;
  updated_at: string;
}

interface InstitutionData {
  owner_info: OwnerInfo;
  institution: Institution;
  total_students: number;
  total_teachers: number;
  total_employees: number;
  total_admissions: number;
  notices: any[];
}

export interface InstitutionDashboardProps {
  data: InstitutionData;
}
