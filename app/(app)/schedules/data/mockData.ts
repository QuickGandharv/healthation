// import { DoctorSchedule, PatientAppointment, OPDSlot } from "../types";

// // Patient Appointments Data
// export const patientAppointments: Record<string, PatientAppointment[]> = {
//   "sat-1": [
//     {
//       id: "p1",
//       name: "Maria Rodriguez",
//       age: 57,
//       phone: "+1 (555) 231-7715",
//       email: "patient0@email.com",
//       appointmentTime: "09:00",
//       reason: "Blood Pressure Monitoring",
//       bookedOn: "Mar 8, 2026 at 11:26 AM",
//       status: "confirmed",
//       doctorName: "Dr. Amit Sharma",
//       doctorAvatar: "AS",
//       patient: {
//         id: "p1",
//         name: "Maria Rodriguez"
//       }
//     },
//     // ... more patients (I'll keep the complete data from your original)
//   ],
//   // ... all other patient appointments
// };

// // Doctor Schedules Data for Week View
// export const weekDoctorSchedules: DoctorSchedule[] = [
//   {
//     id: "mon-1",
//     day: "Mon",
//     date: "09 Mar",
//     timeSlot: "09:00 - 12:00",
//     type: "test",
//     location: "Telehealth Video Consultation",
//     platform: "Telehealth Video Consultation",
//     appointments: 0,
//     totalCapacity: 10,
//     hasBookings: false,
//     doctorName: "Dr. Rajesh Kumar",
//     doctorSpecialization: "Internal Medicine",
//     doctorAvatar: "RK"
//   },
//   // ... all other schedules
// ];

// // Doctor Schedules for Day View
// export const dayDoctorSchedules: DoctorSchedule[] = [
//   {
//     id: "sat-1",
//     day: "Sat",
//     date: "14 Mar",
//     timeSlot: "09:00 - 12:00",
//     type: "Telehealth",
//     location: "Community Health Center, 456 Medical Plaza",
//     platform: "Microsoft Teams",
//     appointments: 4,
//     totalCapacity: 10,
//     hasBookings: true,
//     doctorName: "Dr. Amit Sharma",
//     doctorSpecialization: "Cardiology, Neurology",
//     doctorAvatar: "AS"
//   },
//   {
//     id: "sat-2",
//     day: "Sat",
//     date: "14 Mar",
//     timeSlot: "14:00 - 18:00",
//     type: "In-Person",
//     location: "City General Hospital, 123 Healthcare Ave",
//     platform: "Microsoft Teams",
//     appointments: 3,
//     totalCapacity: 12,
//     hasBookings: true,
//     doctorName: "Dr. Priya Patel",
//     doctorSpecialization: "General Medicine",
//     doctorAvatar: "PP"
//   }
// ];

// // Complete OPD data for March 2026
// export const marchOPDData: any = {
//   1: [{
//     timeSlot: "09:00 - 12:00",
//     type: "In-Person",
//     platform: "Microsoft Teams",
//     location: "Community Health Center",
//     appointments: 4,
//     totalCapacity: 10,
//     patients: patientAppointments["sat-1"]?.slice(0, 4) || [],
//     doctorName: "Dr. Amit Sharma",
//     doctorSpecialization: "Cardiology, Neurology",
//     doctorAvatar: "AS"
//   }],
//   // ... all other OPD data
// };

// // Week days order
// export const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// // Week dates mapping
// export const weekDates: Record<string, string> = {
//   "Mon": "09 Mar",
//   "Tue": "10 Mar",
//   "Wed": "11 Mar",
//   "Thu": "12 Mar",
//   "Fri": "13 Mar",
//   "Sat": "14 Mar",
//   "Sun": "15 Mar"
// };

// // Helper function to group schedules by day
// export const groupSchedulesByDay = (schedules: DoctorSchedule[]) => {
//   return schedules.reduce((acc, schedule) => {
//     if (!acc[schedule.day]) {
//       acc[schedule.day] = [];
//     }
//     acc[schedule.day].push(schedule);
//     return acc;
//   }, {} as Record<string, DoctorSchedule[]>);
// };