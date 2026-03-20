export type DoctorProfileGroup =
  | "personal_information"
  | "working_experience"
  | "education_info"
  | "certifications_info"
  | "awards_info"
  | "social_media"
  | "address";

export interface DoctorProfileResponse<T> {
  success: boolean;
  message: string;
  group: DoctorProfileGroup;
  path: string;
  timestamp: string;
  data: T;
}

export type PersonalInformationData = {
  first_name: string;
  last_name: string;
  bio: string;
  email: string;
  avatar: string | null;
  phone?: string | null;
  license?: string | null;
  doctor_departments?: Array<{
    department_id: string;
    department_name: string;
    role: string;
  }>;
};

// export type AddressItem = {
//   id?: string | number;
//   type?: string;
//   address_type?: string;
//   street?: string;
//   address_line_1?: string;
//   address_line_2?: string;
//   city?: string;
//   state?: string;
//   zip?: string;
//   pincode?: string;
//   is_primary?: boolean;
// };
export interface AddressItem {
  address_line1: string | null;
  address_line2: string | null;
  area: string | null;
  landmark: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  pincode: string | null;
}

export type ExperienceItem = {
  id?: string | number;
  title?: string;
  designation?: string;
  organization?: string;
  hospital_name?: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  current?: boolean;
  is_current?: boolean;
  description?: string;
};

export type EducationItem = {
  id?: string | number;
  degree?: string;
  institution?: string;
  institute_name?: string;
  location?: string;
  year?: string;
  passing_year?: string;
};

export type AwardItem = {
  id?: string | number;
  title?: string;
  issuer?: string;
  issued_by?: string;
  year?: string;
};

export type CertificateItem = {
  id?: string | number;
  name?: string;
  title?: string;
  issuer?: string;
  issue_date?: string;
  expiry_date?: string;
};

export type SocialMediaItem = {
  id?: string | number;
  platform?: string;
  url?: string;
  link?: string;
};