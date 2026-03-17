// Centralized schedule types (shared by API + UI)

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

export interface PatientAppointment {
  id: string
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
  // For UI compatibility (some screens expect these names)
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

export type ScheduleData = DayScheduleResponse | WeekScheduleResponse | MonthScheduleResponse

