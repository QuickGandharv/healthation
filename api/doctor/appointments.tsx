import api from "@/lib/axios";
import { Appointment } from "@/types/doctor/appointment";

export const fetchAppointments = async (
    filter: "today" | "upcoming" | "past",
    token: string
): Promise<Appointment[]> => {
    try {
        const res = await api.get<any>(`/appointments/my?filter=${filter}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const extract = (obj: any): Appointment[] => {
            if (!obj) return [];

            if (Array.isArray(obj)) return obj;

            const dataKeys = ["data", "list", "items", "appointments"];
            for (const key of dataKeys) {
                if (obj[key] && Array.isArray(obj[key])) {
                    return obj[key];
                }
            }

            if (
                obj.data &&
                typeof obj.data === "object" &&
                obj.data.data &&
                Array.isArray(obj.data.data)
            ) {
                return obj.data.data;
            }

            for (const key in obj) {
                if (obj[key] && typeof obj[key] === "object" && !Array.isArray(obj[key])) {
                    const nested = extract(obj[key]);
                    if (nested.length > 0) return nested;
                }
            }

            return [];
        };

        return extract(res.data);
    } catch (error: any) {
        if (error.response) {
            console.error(
                `[API] ${error.response.status} error fetching ${filter} appointments:`,
                JSON.stringify(error.response.data, null, 2)
            );
        } else {
            console.error(`[API] Error fetching ${filter} appointments:`, error.message);
        }
        return [];
    }
};

export const fetchAppointmentDetail = async (
    appointmentId: string,
    token: string
): Promise<any> => {
    try {
        const response = await api.get(`/appointments/${appointmentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });

        return response.data?.data || null;
    } catch (error: any) {
        if (error.response) {
            console.error(
                `[API] ${error.response.status} error fetching appointment detail:`,
                JSON.stringify(error.response.data, null, 2)
            );
        } else {
            console.error(`[API] Error fetching appointment detail:`, error.message);
        }
        throw error;
    }
};

export const markAppointmentAsCompleted = async (
    appointmentId: string,
    token: string
): Promise<any> => {
    const response = await api.post(
        `/appointments/${appointmentId}/mark-as-completed`,
        {
            status: "completed",
            is_complete: true,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }
    );

    return response.data;
};