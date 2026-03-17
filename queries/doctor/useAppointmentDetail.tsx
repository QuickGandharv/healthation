import { fetchAppointmentDetail } from "@/api/doctor/appointments";
import { useQuery } from "@tanstack/react-query";

export const useAppointmentDetail = (
    appointmentId: string,
    token: string
) => {
    return useQuery({
        queryKey: ["appointment-detail", appointmentId],
        queryFn: () => fetchAppointmentDetail(appointmentId, token),
        enabled: !!appointmentId && !!token,
        staleTime: 3 * 60 * 1000,
        retry: 0,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
};