import { useQuery } from "@tanstack/react-query";
import { getMyAppointments } from "@/api/doctor/allAppointments";

export const getMyAllAppointments = () => {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: getMyAppointments,
  });
};