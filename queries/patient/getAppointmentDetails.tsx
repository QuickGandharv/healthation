import { fetchAppointmentById } from "@/api/patient/appointment";
import { useQuery } from "@tanstack/react-query";

export const getAppointmentDetailsById = ( appointmentId?: string ) => {
    return useQuery({
        queryKey: ["appointment", appointmentId],
        queryFn: () => fetchAppointmentById(appointmentId!),
        enabled: !!appointmentId,          
        staleTime: 5 * 60 * 1000,           
        retry: 0,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
};