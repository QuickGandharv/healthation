// types/patient.ts

// types/doctor/allPatients.ts
export interface Patient {
    id: string;
    patientId: string;
    appointment_id: string;
    name: string;
    email: string;
    phone: string;
    lastConsultation: string;
    consultationType: "In-Person" | "Telehealth";
    clinic_visit: number;
    video_consultation: number;
    address: string;
    avatar?: string;
}

export interface ApiPatient {
    id: string;
    patient_id: string;
    appointment_id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    lastConsultationDate: string;
    appointments: Array<{
        type: "in-person" | "telehealth";
        date: string;
    }>;
    address: {
        street: string;
        city: string;
        state: string;
        pincode: string;
    };
    profilePicture?: string;
}

export interface GetAppointmentsResponse {
    data: any[];
    page?: number;
    per_page?: number;
    total?: number;
    [key: string]: any;
}