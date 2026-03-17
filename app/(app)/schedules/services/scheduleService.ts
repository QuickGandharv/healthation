// import api from "@/lib/axios";
// import {
//   FilterType,
//   DayScheduleResponse,
//   WeekScheduleResponse,
//   MonthScheduleResponse,
//   ApiResponse,
//   PatientAppointment,
//   OPDSlot
// } from "../types";

// class ScheduleService {
//   private readonly baseUrl = "/v1/doctor/schedule"; // Adjust endpoint as needed

//   /**
//    * Get schedule based on filter type (day, week, month)
//    */
//   async getSchedule(filter: FilterType, date?: Date) {
//     try {
//       const params: any = { filter };

//       // Add date parameter if provided (format: YYYY-MM-DD)
//       if (date) {
//         params.date = this.formatDate(date);
//       }

//       const response = await api.get<ApiResponse<any>>(this.baseUrl, { params });

//       // Handle different response structures (success or status)
//       const responseData = response.data;

//       if (responseData.success === false) {
//         throw new Error(responseData.message || "Failed to fetch schedule");
//       }

//       return responseData;
//     } catch (error) {
//       console.error(`Error fetching ${filter} schedule:`, error);
//       throw error;
//     }
//   }

//   /**
//    * Get day schedule
//    */
//   async getDaySchedule(date: Date = new Date()) {
//     const response = await this.getSchedule("day", date);
//     return {
//       ...response,
//       data: response.data as DayScheduleResponse
//     };
//   }

//   /**
//    * Get week schedule
//    */
//   async getWeekSchedule(date: Date = new Date()) {
//     const response = await this.getSchedule("week", date);
//     return {
//       ...response,
//       data: response.data as WeekScheduleResponse
//     };
//   }

//   /**
//    * Get month schedule
//    */
//   async getMonthSchedule(date: Date = new Date()) {
//     const response = await this.getSchedule("month", date);
//     return {
//       ...response,
//       data: response.data as MonthScheduleResponse
//     };
//   }

//   /**
//    * Format date to YYYY-MM-DD
//    */
//   private formatDate(date: Date): string {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   }

//   /**
//    * Transform API slot to UI OPDSlot format
//    */
//   transformToOPDSlot(slot: any, doctorInfo?: any): OPDSlot {
//     return {
//       ...slot,
//       // For UI compatibility
//       timeSlot: slot.time_range || `${slot.start_time} - ${slot.end_time}`,
//       type: slot.consultation_type === "video" ? "Telehealth" : "In-Person",
//       platform: slot.consultation_type === "video" ? "Video Consultation" : "In-Person Visit",
//       location: slot.doctor_room || (slot.consultation_type === "video" ? "Virtual Consultation" : "Clinic"),
//       totalCapacity: slot.capacity || slot.slot_capacity,
//       appointments: slot.booked_count || 0,
//       // Add doctor info if available
//       doctorName: doctorInfo?.name || "Dr. Amit Sharma", // Fallback
//       doctorSpecialization: doctorInfo?.specialization || "General Medicine",
//       doctorAvatar: doctorInfo?.avatar || "DR",
//     };
//   }

//   /**
//    * Transform API appointment to UI PatientAppointment format
//    */
//   transformToPatientAppointment(appt: any): PatientAppointment {
//     return {
//       id: appt.id,
//       name: appt.patient_name || "Unknown Patient",
//       age: appt.patient_age,
//       phone: appt.patient_phone,
//       email: appt.patient_email,
//       appointmentTime: appt.start_time || "",
//       reason: appt.reason,
//       bookedOn: appt.booked_on,
//       status: appt.status || "confirmed",
//       status_label: appt.status_label,
//       doctorName: appt.doctor_name,
//       doctorAvatar: appt.doctor_avatar,
//       patient_name: appt.patient_name,
//       patient_avatar: appt.patient_avatar,
//       consultation_type: appt.consultation_type,
//       start_time: appt.start_time,
//       end_time: appt.end_time,
//     };
//   }
// }

// export const scheduleService = new ScheduleService();

// app/(app)/schedules/services/scheduleService.ts
// app/(app)/schedules/services/scheduleService.ts
import api from "@/lib/axios"
import {
  FilterType,
  DayScheduleResponse,
  WeekScheduleResponse,
  MonthScheduleResponse,
  ApiResponse,
  OPDSlot,
  PatientAppointment,
} from "../types"

class ScheduleService {
  private readonly baseUrl = "/doctor/schedule"

  private extractSlots(
    input: unknown,
    parentDate?: string
  ): Array<Record<string, unknown>> {
    if (!input) return []
    if (Array.isArray(input)) {
      return input.flatMap((item) => this.extractSlots(item, parentDate))
    }
    if (typeof input !== "object") return []

    const obj = input as Record<string, unknown>
    const currentDate =
      (typeof obj.date === "string" && obj.date) ||
      (typeof parentDate === "string" && parentDate) ||
      undefined

    const slots = obj.slots
    if (Array.isArray(slots)) {
      return slots.map((s) => ({
        ...(typeof s === "object" && s ? (s as Record<string, unknown>) : { value: s }),
        date:
          (typeof (s as any)?.date === "string" && (s as any).date) ||
          currentDate,
      }))
    }

    const availability = obj.availability
    if (Array.isArray(availability)) {
      return this.extractSlots(availability, currentDate)
    }

    for (const key of ["list", "items", "data"] as const) {
      if (obj[key]) return this.extractSlots(obj[key], currentDate)
    }

    // Fallback: handle objects keyed by YYYY-MM-DD
    let results: Array<Record<string, unknown>> = []
    for (const key of Object.keys(obj)) {
      const val = obj[key]
      if (val && typeof val === "object") {
        const nextDate =
          /^\d{4}-\d{2}-\d{2}$/.test(key) ? key : currentDate
        results = results.concat(this.extractSlots(val, nextDate))
      }
    }
    return results
  }

  private normalizeScheduleData(
    filter: FilterType,
    raw: unknown,
    requestedDate?: Date
  ): DayScheduleResponse | WeekScheduleResponse | MonthScheduleResponse {
    const baseDate = requestedDate || new Date()
    const baseDateStr = this.formatDate(baseDate)

    // If backend already matches expected shapes, keep it.
    if (raw && typeof raw === "object") {
      const o = raw as any
      if (filter === "day" && typeof o.date === "string" && Array.isArray(o.slots)) {
        return o as DayScheduleResponse
      }
      if ((filter === "week" || filter === "month") && Array.isArray(o.days)) {
        return o as WeekScheduleResponse | MonthScheduleResponse
      }
    }

    const extracted = this.extractSlots(raw, baseDateStr)
    const slots = extracted.map((s) => s as any)

    if (filter === "day") {
      const date = (typeof (raw as any)?.date === "string" && (raw as any).date) || baseDateStr
      return {
        date,
        day_name: new Date(date).toLocaleDateString("en-US", { weekday: "long" }),
        slots: slots as any,
      }
    }

    const grouped = new Map<string, any[]>()
    for (const slot of slots) {
      const d = (typeof slot.date === "string" && slot.date) || baseDateStr
      if (!grouped.has(d)) grouped.set(d, [])
      grouped.get(d)!.push(slot)
    }

    const days = Array.from(grouped.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, daySlots]) => ({
        date,
        day_name: new Date(date).toLocaleDateString("en-US", { weekday: "long" }),
        slots: daySlots,
      }))

    const start_date = days[0]?.date || baseDateStr
    const end_date = days[days.length - 1]?.date || baseDateStr

    if (filter === "week") {
      return { start_date, end_date, days } as WeekScheduleResponse
    }
    return { start_date, end_date, days } as MonthScheduleResponse
  }

  /**
   * Get schedule based on filter type (day, week, month)
   */
  async getSchedule(filter: FilterType, date?: Date) {
    try {
      const params: any = { filter }

      if (date) {
        params.date = this.formatDate(date)
      }

      console.log(
        "Making API request to:",
        `${api.defaults.baseURL}${this.baseUrl}`
      )
      console.log("With params:", params)

      const response = await api.get<ApiResponse<any>>(this.baseUrl, { params })

      console.log("API Response:", response.data)

      const responseData = response.data

      if (responseData.code === "VALIDATION_ERROR") {
        throw new Error(responseData.message || "Validation failed")
      }

      if (responseData.success === false || responseData.status === false) {
        throw new Error(responseData.message || "Failed to fetch schedule")
      }

      return {
        ...responseData,
        data: this.normalizeScheduleData(filter, responseData.data, date),
      }
    } catch (error: any) {
      console.error(`Error fetching ${filter} schedule:`, {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          baseURL: error.config?.baseURL,
          url: error.config?.url,
          method: error.config?.method,
          params: error.config?.params,
        },
      })

      throw error
    }
  }

  /**
   * Get day schedule
   */
  async getDaySchedule(date: Date = new Date()) {
    try {
      const response = await this.getSchedule("day", date)
      return {
        ...response,
        data: response.data as DayScheduleResponse,
      }
    } catch (error) {
      console.error("Error in getDaySchedule:", error)
      throw error
    }
  }

  /**
   * Get week schedule
   */
  async getWeekSchedule(date: Date = new Date()) {
    try {
      const response = await this.getSchedule("week", date)
      return {
        ...response,
        data: response.data as WeekScheduleResponse,
      }
    } catch (error) {
      console.error("Error in getWeekSchedule:", error)
      throw error
    }
  }

  /**
   * Get month schedule
   */
  async getMonthSchedule(date: Date = new Date()) {
    try {
      const response = await this.getSchedule("month", date)
      return {
        ...response,
        data: response.data as MonthScheduleResponse,
      }
    } catch (error) {
      console.error("Error in getMonthSchedule:", error)
      throw error
    }
  }

  /**
   * Format date to YYYY-MM-DD
   */
  formatDate(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  /**
   * Transform API slot to UI OPDSlot format
   */
  transformToOPDSlot(slot: any, doctorInfo?: any): OPDSlot {
    return {
      ...slot,
      // For UI compatibility
      timeSlot: slot.time_range || `${slot.start_time} - ${slot.end_time}`,
      type: slot.consultation_type === "video" ? "Telehealth" : "In-Person",
      platform:
        slot.consultation_type === "video"
          ? "Video Consultation"
          : "In-Person Visit",
      location:
        slot.doctor_room ||
        (slot.consultation_type === "video"
          ? "Virtual Consultation"
          : "Clinic"),
      totalCapacity: slot.capacity || slot.slot_capacity || 10,
      // Ensure we don't overwrite the appointments array if it exists
      booked_count: slot.booked_count || (Array.isArray(slot.appointments) ? slot.appointments.length : 0),
      appointments: Array.isArray(slot.appointments) 
        ? slot.appointments.map((appt: any) => this.transformToPatientAppointment(appt))
        : [],
      // Add doctor info if available
      doctorName: doctorInfo?.name || "Dr. Amit Sharma",
      doctorSpecialization: doctorInfo?.specialization || "General Medicine",
      doctorAvatar: doctorInfo?.avatar || "DR",
    }
  }

  /**
   * Transform API appointment to UI PatientAppointment format
   */
  transformToPatientAppointment(appt: any): PatientAppointment {
    return {
      id: appt.id,
      name: appt.patient_name || "Unknown Patient",
      age: appt.patient_age,
      phone: appt.patient_phone,
      email: appt.patient_email,
      appointmentTime: appt.start_time || "",
      reason: appt.reason,
      bookedOn: appt.booked_on,
      status: appt.status || "confirmed",
      status_label: appt.status_label,
      doctorName: appt.doctor_name,
      doctorAvatar: appt.doctor_avatar,
      patient_name: appt.patient_name,
      patient_avatar: appt.patient_avatar,
      consultation_type: appt.consultation_type,
      start_time: appt.start_time,
      end_time: appt.end_time,
    }
  }
}

export const scheduleService = new ScheduleService()