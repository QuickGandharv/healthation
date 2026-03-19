import api from "@/lib/axios";

export const getMyAppointments = async (): Promise<any> => {
    const { data } = await api.get("/appointments/my?filter=all");
    return data;
};