// API Response Types
export interface ApiResponse<T> {
  success?: boolean
  status?: boolean
  message: string
  filter?: string
  path?: string
  timestamp: string
  data: T
  code?: string
  errors?: any
}

// Doctor Schedule Types
export interface DoctorSchedule {
  id: string,
  appointment_id?: string,
  day: string
  date: string
  timeSlot: string
  type: "Telehealth" | "In-Person"
  consultation_type?: "video" | "in-person"
  consultation_type_label?: string
  location: string
  platform?: string
  appointments: number
  totalCapacity: number
  booked_count?: number
  available_slots?: number
  hasBookings: boolean
  doctorName?: string
  doctorSpecialization?: string
  doctorAvatar?: string
}

export interface PatientAppointment {
  id: string,
  appointment_id?: string
  name: string
  age?: number
  phone?: string
  email?: string
  appointmentTime: string
  reason?: string
  bookedOn?: string
  status: "confirmed" | "pending" | "cancelled" | "completed"
  status_label?: string
  doctorName?: string
  doctorAvatar?: string
  patient_name?: string
  patient_avatar?: string | null
  consultation_type?: string
  start_time?: string
  end_time?: string
}

export interface OPDSlot {
  id: string | null
  startTime: string
  appointment_id?: string | null
  date: string
  day_name: string
  start_time: string
  end_time: string
  time_range: string
  consultation_type: "video" | "in-person"
  consultation_type_label: string
  capacity: number
  slot_capacity: number
  booked_count: number
  available_slots: number
  is_recurring?: boolean
  doctor_room?: string | null
  is_available?: boolean
  appointments: PatientAppointment[]
  // For UI compatibility
  timeSlot?: string
  type?: "Telehealth" | "In-Person"
  platform?: string
  location?: string
  totalCapacity?: number
  doctorName?: string
  doctorSpecialization?: string
  doctorAvatar?: string
}

export interface DayScheduleResponse {
  date: string
  day_name: string
  slots: OPDSlot[]
}

export interface WeekScheduleResponse {
  start_date: string
  end_date: string
  days: DayScheduleResponse[]
}

export interface MonthScheduleResponse {
  start_date: string
  end_date: string
  days: DayScheduleResponse[]
}

export type FilterType = "day" | "week" | "month"
