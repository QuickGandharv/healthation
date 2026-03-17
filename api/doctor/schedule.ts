import api from "@/lib/axios"
import type { ApiResponse, ScheduleData } from "@/types/doctor/schedule"

export const fetchDoctorSchedule = async ({
  date,
  filter,
  signal,
}: {
  date: string
  filter: string
  token?: string // Kept for compatibility but unused (axios interceptor attaches token)
  signal?: AbortSignal
}): Promise<ScheduleData> => {
  const res = await api.get<ApiResponse<ScheduleData>>("/doctor/schedule", {
    params: {
      filter,
      date,
    },
    signal,
  })

  return res.data.data
}

