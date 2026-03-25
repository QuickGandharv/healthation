import { useQuery } from "@tanstack/react-query";
import { getAppointmentReview } from "@/api/doctor/appointmentReviews";
import { useAuth } from "@/context/AuthContext";

export const useAppointmentReview = (appointmentId: string) => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["appointment-review", appointmentId],
    queryFn: () => getAppointmentReview(appointmentId),
    enabled: !!appointmentId && !!token,
  });
};
