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

      return responseData
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
      totalCapacity: slot.capacity || slot.slot_capacity,
      appointments: slot.booked_count || 0,
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