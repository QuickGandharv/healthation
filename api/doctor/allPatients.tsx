import axiosInstance from "@/lib/axios"; // change path if your axios file is somewhere else
import type { GetAppointmentsResponse } from "@/types/doctor/allPatients";

interface GetAppointmentsParams {
    page?: number;
    per_page?: number;
}

export const getAllPatients = async (
    params: GetAppointmentsParams = {}
): Promise<GetAppointmentsResponse> => {
    const { page = 1, per_page = 10 } = params;

    const response = await axiosInstance.get<GetAppointmentsResponse>(
        "/doctor/all-patients",
        {
            params: {
                page,
                per_page,
            },
        }
    );

    return response.data;
};