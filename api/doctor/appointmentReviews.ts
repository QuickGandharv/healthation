import axiosInstance from "@/lib/axios";

export interface AppointmentReview {
  id: string;
  rating: number;
  comment: string;
  patient_name: string;
  patient_avatar?: string;
  created_at: string;
  doctor_response?: {
    response: string;
    responded_on: string;
  };
}

export interface AddAppointmentReviewRequest {
  appointment_id: string;
  rating: number;
  comment: string;
}

export interface AddAppointmentReviewResponse {
  success: boolean;
  message: string;
  data: AppointmentReview;
}

export const getAppointmentReview = async (appointmentId: string): Promise<{
  success: boolean;
  data: AppointmentReview | null;
}> => {
  const response = await axiosInstance.get(`/appointments/${appointmentId}/review`);
  return response.data;
};

export const addAppointmentReview = async ({
  appointment_id,
  rating,
  comment,
}: AddAppointmentReviewRequest): Promise<AddAppointmentReviewResponse> => {
  const response = await axiosInstance.post(`/appointments/${appointment_id}/review`, {
    rating,
    comment,
  });
  return response.data;
};
