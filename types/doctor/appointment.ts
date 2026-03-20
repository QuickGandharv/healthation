export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  prescribed: string;
}

export interface Vitals {
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  respiratoryRate: string;
  oxygenSaturation?: string;
  weight?: string;
  height?: string;
  bmi?: string;
}

export interface LabResult {
  name: string;
  date: string;
  status: string;
  notes?: string;
}

export interface AppointmentHistory {
  date: string;
  type: string;
  doctor: string;
}

export interface Appointment {
  id: number;
  appointment_id: string;
  patient: string;
  avatar: string;
  age: number;
  gender: string;
  date: string;
  time: string;
  duration: string;
  type: string;
  consultation_type?: string;
  reason: string;
  status: string;
  notes?: string;
  email?: string;
  phone?: string;
  emergencyContact?: string;
  address?: string;
  chiefComplaint?: string;
  medicalHistory?: string;
  medications?: Medication[];
  vitals?: Vitals;
  labResults?: LabResult[];
  appointments?: AppointmentHistory[];
  video_consultation?: {
    join_url?: string;
  };

  prescription?: {
    prescribedBy: string;
    prescribedDate: string;
    validUntil: string;
    pharmacy?: {
      name: string;
      address: string;
      phone: string;
    };
    medications: Array<{
      name: string;
      dosage: string;
      frequency: string;
      prescribed: string;
      instructions?: string;
    }>;
  } | null;

  review?: {
    rating: number;
    comment: string;
    reviewedOn: string;
    isVerified: boolean;
    doctorResponse?: {
      response: string;
      respondedOn: string;
    };
  } | null;

  reviewStats?: {
    totalReviews: number;
    averageRating: number;
    wouldRecommend: number;
    responseRate: number;
    avgResponseTime: string;
    ratingBreakdown: {
      "5": number;
      "4": number;
      "3": number;
      "2": number;
      "1": number;
    };
  };
}