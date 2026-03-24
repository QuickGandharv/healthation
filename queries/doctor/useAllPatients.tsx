import { useQuery } from "@tanstack/react-query";
import { getAllPatients } from "@/api/doctor/allPatients";

interface UseAppointmentsParams {
    page?: number;
    per_page?: number;
}

export const useAllPatients = ({
    page = 1,
    per_page = 10,
}: UseAppointmentsParams = {}) => {
    return useQuery({
        queryKey: ["doctor-all-patients", page, per_page],
        queryFn: () => getAllPatients({ page, per_page }),
    });
};