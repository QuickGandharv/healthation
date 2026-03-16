// app/schedules/page.tsx - COMPLETE VERSION WITH ALL DATA
"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Plus, Video, Stethoscope, Users, Phone, Clock, CalendarIcon, MapPin, Edit, Mail, MoreVertical } from "lucide-react";
import { ScheduleCard } from "@/components/custom/ScheduleCard";
import { AppointmentCard } from "@/components/custom/AppointmentCard";

// Doctor Schedule Interface
interface DoctorSchedule {
  id: string;
  day: string;
  date: string;
  timeSlot: string;
  type: "Telehealth" | "In-Person";
  location: string;
  platform?: string;
  appointments: number;
  totalCapacity: number;
  hasBookings: boolean;
  doctorName?: string;
  doctorSpecialization?: string;
  doctorAvatar?: string;
}

// Patient Appointment Interface
interface PatientAppointment {
  id: string;
  name: string;
  age: number;
  phone: string;
  email: string;
  appointmentTime: string;
  reason: string;
  bookedOn: string;
  status: "confirmed" | "pending" | "cancelled";
  doctorName?: string;
  doctorAvatar?: string;
}

// OPD Slot Interface
interface OPDSlot {
  timeSlot: string;
  type: "Telehealth" | "In-Person";
  platform?: string;
  location: string;
  appointments: number;
  totalCapacity: number;
  patients: PatientAppointment[];
  doctorName?: string;
  doctorSpecialization?: string;
  doctorAvatar?: string;
}

export default function Schedules() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 14)); // March 14, 2026
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2026, 2, 14));
  const [selectedSchedule, setSelectedSchedule] = useState<DoctorSchedule | null>(null);
  const [selectedDaySlots, setSelectedDaySlots] = useState<OPDSlot[]>([]);
  const [isDayDialogOpen, setIsDayDialogOpen] = useState(false);
  const [isAppointmentsDialogOpen, setIsAppointmentsDialogOpen] = useState(false);
  const [selectedSlotForAppointments, setSelectedSlotForAppointments] = useState<OPDSlot | null>(null);
  const [weekOffset, setWeekOffset] = useState(0);
  const [dayOffset, setDayOffset] = useState(0);
  const [selectedMonthSlot, setSelectedMonthSlot] = useState<OPDSlot | null>(null);

  // Get current day date based on offset
  const getCurrentDayDate = () => {
    const date = new Date(2026, 2, 14);
    date.setDate(date.getDate() + dayOffset);
    return date;
  };

  const currentDayDate = getCurrentDayDate();

  const formatDayHeader = () => {
    return currentDayDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    setDayOffset(prev => direction === 'next' ? prev + 1 : prev - 1);
  };

  // Doctor Schedules Data for Day View (Saturday, March 14)
  const dayDoctorSchedules: DoctorSchedule[] = [
    {
      id: "sat-1",
      day: "Sat",
      date: "14 Mar",
      timeSlot: "09:00 - 12:00",
      type: "Telehealth",
      location: "Community Health Center, 456 Medical Plaza",
      platform: "Microsoft Teams",
      appointments: 4,
      totalCapacity: 10,
      hasBookings: true,
      doctorName: "Dr. Amit Sharma",
      doctorSpecialization: "Cardiology, Neurology",
      doctorAvatar: "AS"
    },
    {
      id: "sat-2",
      day: "Sat",
      date: "14 Mar",
      timeSlot: "14:00 - 18:00",
      type: "In-Person",
      location: "City General Hospital, 123 Healthcare Ave",
      platform: "Microsoft Teams",
      appointments: 3,
      totalCapacity: 12,
      hasBookings: true,
      doctorName: "Dr. Priya Patel",
      doctorSpecialization: "General Medicine",
      doctorAvatar: "PP"
    }
  ];

  // Doctor Schedules Data for Week View (COMPLETE DATA)
  const weekDoctorSchedules: DoctorSchedule[] = [
    // Monday, March 9
    {
      id: "mon-1",
      day: "Mon",
      date: "09 Mar",
      timeSlot: "09:00 - 12:00",
      type: "Telehealth",
      location: "Telehealth Video Consultation",
      platform: "Telehealth Video Consultation",
      appointments: 0,
      totalCapacity: 10,
      hasBookings: false,
      doctorName: "Dr. Rajesh Kumar",
      doctorSpecialization: "Internal Medicine",
      doctorAvatar: "RK"
    },
    {
      id: "mon-2",
      day: "Mon",
      date: "09 Mar",
      timeSlot: "14:00 - 18:00",
      type: "In-Person",
      location: "Community Health Center, 456 Medical Plaza",
      platform: "Microsoft Teams",
      appointments: 7,
      totalCapacity: 12,
      hasBookings: true,
      doctorName: "Dr. Amit Sharma",
      doctorSpecialization: "Cardiology, Neurology",
      doctorAvatar: "AS"
    },

    // Tuesday, March 10
    {
      id: "tue-1",
      day: "Tue",
      date: "10 Mar",
      timeSlot: "09:00 - 12:00",
      type: "In-Person",
      location: "Zoom Meeting Platform",
      platform: "Zoom Meeting Platform",
      appointments: 1,
      totalCapacity: 10,
      hasBookings: true,
      doctorName: "Dr. Priya Patel",
      doctorSpecialization: "General Medicine",
      doctorAvatar: "PP"
    },
    {
      id: "tue-2",
      day: "Tue",
      date: "10 Mar",
      timeSlot: "14:00 - 18:00",
      type: "Telehealth",
      location: "Downtown Clinic, 789 Wellness Street",
      platform: "Microsoft Teams",
      appointments: 4,
      totalCapacity: 12,
      hasBookings: true,
      doctorName: "Dr. Sanjay Gupta",
      doctorSpecialization: "Neurology",
      doctorAvatar: "SG"
    },

    // Wednesday, March 11
    {
      id: "wed-1",
      day: "Wed",
      date: "11 Mar",
      timeSlot: "09:00 - 12:00",
      type: "Telehealth",
      location: "Google Meet",
      platform: "Google Meet",
      appointments: 1,
      totalCapacity: 10,
      hasBookings: true,
      doctorName: "Dr. Amit Sharma",
      doctorSpecialization: "Cardiology, Neurology",
      doctorAvatar: "AS"
    },
    {
      id: "wed-2",
      day: "Wed",
      date: "11 Mar",
      timeSlot: "14:00 - 18:00",
      type: "Telehealth",
      location: "Suburban Medical Center, 321 Care Boulevard",
      platform: "Microsoft Teams",
      appointments: 6,
      totalCapacity: 12,
      hasBookings: true,
      doctorName: "Dr. Priya Patel",
      doctorSpecialization: "General Medicine",
      doctorAvatar: "PP"
    },
    {
      id: "wed-3",
      day: "Wed",
      date: "11 Mar",
      timeSlot: "18:30 - 21:00",
      type: "Telehealth",
      location: "Zoom Meeting Platform",
      platform: "Zoom Meeting Platform",
      appointments: 2,
      totalCapacity: 8,
      hasBookings: true,
      doctorName: "Dr. Rajesh Kumar",
      doctorSpecialization: "Internal Medicine",
      doctorAvatar: "RK"
    },

    // Thursday, March 12
    {
      id: "thu-1",
      day: "Thu",
      date: "12 Mar",
      timeSlot: "09:00 - 12:00",
      type: "In-Person",
      location: "City Medical Center, 789 Health Blvd",
      platform: "Microsoft Teams",
      appointments: 4,
      totalCapacity: 10,
      hasBookings: true,
      doctorName: "Dr. Sanjay Gupta",
      doctorSpecialization: "Neurology",
      doctorAvatar: "SG"
    },
    {
      id: "thu-2",
      day: "Thu",
      date: "12 Mar",
      timeSlot: "14:00 - 18:00",
      type: "Telehealth",
      location: "Wellness Clinic, 456 Care Street",
      platform: "Microsoft Teams",
      appointments: 5,
      totalCapacity: 12,
      hasBookings: true,
      doctorName: "Dr. Amit Sharma",
      doctorSpecialization: "Cardiology, Neurology",
      doctorAvatar: "AS"
    },

    // Friday, March 13
    {
      id: "fri-1",
      day: "Fri",
      date: "13 Mar",
      timeSlot: "09:00 - 12:00",
      type: "Telehealth",
      location: "Virtual Consultation",
      platform: "Zoom Meeting Platform",
      appointments: 3,
      totalCapacity: 10,
      hasBookings: true,
      doctorName: "Dr. Priya Patel",
      doctorSpecialization: "General Medicine",
      doctorAvatar: "PP"
    },
    {
      id: "fri-2",
      day: "Fri",
      date: "13 Mar",
      timeSlot: "14:00 - 18:00",
      type: "In-Person",
      location: "Community Health Center, 456 Medical Plaza",
      platform: "Microsoft Teams",
      appointments: 8,
      totalCapacity: 12,
      hasBookings: true,
      doctorName: "Dr. Rajesh Kumar",
      doctorSpecialization: "Internal Medicine",
      doctorAvatar: "RK"
    },

    // Saturday, March 14
    {
      id: "sat-1-week",
      day: "Sat",
      date: "14 Mar",
      timeSlot: "09:00 - 12:00",
      type: "Telehealth",
      location: "Community Health Center, 456 Medical Plaza",
      platform: "Microsoft Teams",
      appointments: 4,
      totalCapacity: 10,
      hasBookings: true,
      doctorName: "Dr. Amit Sharma",
      doctorSpecialization: "Cardiology, Neurology",
      doctorAvatar: "AS"
    },
    {
      id: "sat-2-week",
      day: "Sat",
      date: "14 Mar",
      timeSlot: "14:00 - 18:00",
      type: "In-Person",
      location: "City General Hospital, 123 Healthcare Ave",
      platform: "Microsoft Teams",
      appointments: 3,
      totalCapacity: 12,
      hasBookings: true,
      doctorName: "Dr. Priya Patel",
      doctorSpecialization: "General Medicine",
      doctorAvatar: "PP"
    },

    // Sunday, March 15
    {
      id: "sun-1",
      day: "Sun",
      date: "15 Mar",
      timeSlot: "10:00 - 13:00",
      type: "Telehealth",
      location: "Virtual Consultation",
      platform: "Google Meet",
      appointments: 2,
      totalCapacity: 8,
      hasBookings: true,
      doctorName: "Dr. Sanjay Gupta",
      doctorSpecialization: "Neurology",
      doctorAvatar: "SG"
    }
  ];

  // Group schedules by day for week view
  const schedulesByDay = weekDoctorSchedules.reduce((acc, schedule) => {
    if (!acc[schedule.day]) {
      acc[schedule.day] = [];
    }
    acc[schedule.day].push(schedule);
    return acc;
  }, {} as Record<string, DoctorSchedule[]>);

  // Days of week in order
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Week dates
  const weekDates = {
    "Mon": "09 Mar",
    "Tue": "10 Mar",
    "Wed": "11 Mar",
    "Thu": "12 Mar",
    "Fri": "13 Mar",
    "Sat": "14 Mar",
    "Sun": "15 Mar"
  };

  // Patient Appointments Data (COMPLETE DATA - ALL 30 PATIENTS)
  const patientAppointments: Record<string, PatientAppointment[]> = {
    "sat-1": [
      {
        id: "p1",
        name: "Maria Rodriguez",
        age: 57,
        phone: "+1 (555) 231-7715",
        email: "patient0@email.com",
        appointmentTime: "09:00",
        reason: "Blood Pressure Monitoring",
        bookedOn: "Mar 8, 2026 at 11:26 AM",
        status: "confirmed",
        doctorName: "Dr. Amit Sharma",
        doctorAvatar: "AS"
      },
      {
        id: "p2",
        name: "Sarah Davis",
        age: 43,
        phone: "+1 (555) 136-9944",
        email: "patient1@email.com",
        appointmentTime: "09:30",
        reason: "Respiratory Issues",
        bookedOn: "Mar 10, 2026 at 11:26 AM",
        status: "confirmed",
        doctorName: "Dr. Amit Sharma",
        doctorAvatar: "AS"
      },
      {
        id: "p3",
        name: "Robert Chen",
        age: 45,
        phone: "+1 (555) 234-5678",
        email: "robert.chen@email.com",
        appointmentTime: "10:00",
        reason: "Follow-up Consultation",
        bookedOn: "Mar 10, 2026 at 9:30 AM",
        status: "confirmed",
        doctorName: "Dr. Amit Sharma",
        doctorAvatar: "AS"
      },
      {
        id: "p4",
        name: "Sarah Wilson",
        age: 28,
        phone: "+1 (555) 345-6789",
        email: "sarah.wilson@email.com",
        appointmentTime: "10:30",
        reason: "Initial Consultation",
        bookedOn: "Mar 9, 2026 at 2:15 PM",
        status: "confirmed",
        doctorName: "Dr. Amit Sharma",
        doctorAvatar: "AS"
      },
      {
        id: "p5",
        name: "Michael Brown",
        age: 52,
        phone: "+1 (555) 456-7890",
        email: "michael.brown@email.com",
        appointmentTime: "11:00",
        reason: "Prescription Renewal",
        bookedOn: "Mar 8, 2026 at 10:45 AM",
        status: "confirmed",
        doctorName: "Dr. Amit Sharma",
        doctorAvatar: "AS"
      },
      {
        id: "p6",
        name: "Emily Davis",
        age: 33,
        phone: "+1 (555) 567-8901",
        email: "emily.davis@email.com",
        appointmentTime: "11:30",
        reason: "Follow-up",
        bookedOn: "Mar 7, 2026 at 3:20 PM",
        status: "confirmed",
        doctorName: "Dr. Amit Sharma",
        doctorAvatar: "AS"
      }
    ],
    "sat-2": [
      {
        id: "p7",
        name: "James Wilson",
        age: 48,
        phone: "+1 (555) 678-9012",
        email: "james.wilson@email.com",
        appointmentTime: "14:00",
        reason: "Cardiology Check",
        bookedOn: "Mar 12, 2026 at 11:30 AM",
        status: "confirmed",
        doctorName: "Dr. Priya Patel",
        doctorAvatar: "PP"
      },
      {
        id: "p8",
        name: "Patricia Garcia",
        age: 52,
        phone: "+1 (555) 789-0123",
        email: "patricia.garcia@email.com",
        appointmentTime: "15:00",
        reason: "Follow-up",
        bookedOn: "Mar 11, 2026 at 10:15 AM",
        status: "confirmed",
        doctorName: "Dr. Priya Patel",
        doctorAvatar: "PP"
      },
      {
        id: "p9",
        name: "John Taylor",
        age: 61,
        phone: "+1 (555) 890-1234",
        email: "john.taylor@email.com",
        appointmentTime: "16:00",
        reason: "Medication Review",
        bookedOn: "Mar 10, 2026 at 2:45 PM",
        status: "confirmed",
        doctorName: "Dr. Priya Patel",
        doctorAvatar: "PP"
      }
    ],
    "mon-2": [
      {
        id: "p10",
        name: "Linda Anderson",
        age: 57,
        phone: "+1 (555) 961-1198",
        email: "patient0@email.com",
        appointmentTime: "09:00",
        reason: "Anxiety Management",
        bookedOn: "Mar 6, 2026 at 11:09 AM",
        status: "confirmed",
        doctorName: "Dr. Amit Sharma",
        doctorAvatar: "AS"
      },
      {
        id: "p11",
        name: "Robert Chen",
        age: 45,
        phone: "+1 (555) 234-5678",
        email: "robert.chen@email.com",
        appointmentTime: "14:30",
        reason: "Follow-up Consultation",
        bookedOn: "Mar 7, 2026 at 10:30 AM",
        status: "confirmed",
        doctorName: "Dr. Amit Sharma",
        doctorAvatar: "AS"
      },
      {
        id: "p12",
        name: "Sarah Wilson",
        age: 32,
        phone: "+1 (555) 345-6789",
        email: "sarah.wilson@email.com",
        appointmentTime: "15:15",
        reason: "General Checkup",
        bookedOn: "Mar 5, 2026 at 2:15 PM",
        status: "confirmed",
        doctorName: "Dr. Amit Sharma",
        doctorAvatar: "AS"
      },
      {
        id: "p13",
        name: "Michael Brown",
        age: 52,
        phone: "+1 (555) 456-7890",
        email: "michael.brown@email.com",
        appointmentTime: "16:00",
        reason: "Prescription Renewal",
        bookedOn: "Mar 4, 2026 at 9:45 AM",
        status: "confirmed",
        doctorName: "Dr. Amit Sharma",
        doctorAvatar: "AS"
      },
      {
        id: "p14",
        name: "Jennifer Lee",
        age: 38,
        phone: "+1 (555) 567-8901",
        email: "jennifer.lee@email.com",
        appointmentTime: "16:45",
        reason: "Anxiety Management",
        bookedOn: "Mar 8, 2026 at 11:02 AM",
        status: "confirmed",
        doctorName: "Dr. Amit Sharma",
        doctorAvatar: "AS"
      },
      {
        id: "p15",
        name: "David Kim",
        age: 41,
        phone: "+1 (555) 678-9012",
        email: "david.kim@email.com",
        appointmentTime: "17:30",
        reason: "Follow-up Consultation",
        bookedOn: "Mar 3, 2026 at 3:20 PM",
        status: "confirmed",
        doctorName: "Dr. Amit Sharma",
        doctorAvatar: "AS"
      },
      {
        id: "p16",
        name: "Lisa Thompson",
        age: 29,
        phone: "+1 (555) 789-0123",
        email: "lisa.thompson@email.com",
        appointmentTime: "18:15",
        reason: "Initial Consultation",
        bookedOn: "Mar 2, 2026 at 1:45 PM",
        status: "confirmed",
        doctorName: "Dr. Amit Sharma",
        doctorAvatar: "AS"
      }
    ],
    "tue-1": [
      {
        id: "p17",
        name: "Linda Anderson",
        age: 57,
        phone: "+1 (555) 961-1198",
        email: "patient0@email.com",
        appointmentTime: "09:00",
        reason: "Anxiety Management",
        bookedOn: "Mar 6, 2026 at 11:09 AM",
        status: "confirmed",
        doctorName: "Dr. Priya Patel",
        doctorAvatar: "PP"
      }
    ],
    "tue-2": [
      {
        id: "p18",
        name: "Emily Davis",
        age: 34,
        phone: "+1 (555) 890-1234",
        email: "emily.davis@email.com",
        appointmentTime: "14:00",
        reason: "General Checkup",
        bookedOn: "Mar 8, 2026 at 10:15 AM",
        status: "confirmed",
        doctorName: "Dr. Sanjay Gupta",
        doctorAvatar: "SG"
      },
      {
        id: "p19",
        name: "James Wilson",
        age: 48,
        phone: "+1 (555) 901-2345",
        email: "james.wilson@email.com",
        appointmentTime: "15:30",
        reason: "Follow-up Consultation",
        bookedOn: "Mar 7, 2026 at 11:30 AM",
        status: "confirmed",
        doctorName: "Dr. Sanjay Gupta",
        doctorAvatar: "SG"
      },
      {
        id: "p20",
        name: "Patricia Garcia",
        age: 52,
        phone: "+1 (555) 012-3456",
        email: "patricia.garcia@email.com",
        appointmentTime: "16:45",
        reason: "Prescription Renewal",
        bookedOn: "Mar 5, 2026 at 2:00 PM",
        status: "confirmed",
        doctorName: "Dr. Sanjay Gupta",
        doctorAvatar: "SG"
      },
      {
        id: "p21",
        name: "John Taylor",
        age: 61,
        phone: "+1 (555) 123-4567",
        email: "john.taylor@email.com",
        appointmentTime: "17:30",
        reason: "Cardiology Follow-up",
        bookedOn: "Mar 4, 2026 at 9:20 AM",
        status: "confirmed",
        doctorName: "Dr. Sanjay Gupta",
        doctorAvatar: "SG"
      }
    ],
    "wed-1": [
      {
        id: "p22",
        name: "Maria Santos",
        age: 43,
        phone: "+1 (555) 234-5678",
        email: "maria.santos@email.com",
        appointmentTime: "09:00",
        reason: "Thyroid Check",
        bookedOn: "Mar 8, 2026 at 3:45 PM",
        status: "confirmed",
        doctorName: "Dr. Amit Sharma",
        doctorAvatar: "AS"
      }
    ],
    "wed-2": [
      {
        id: "p23",
        name: "Kevin Zhang",
        age: 37,
        phone: "+1 (555) 345-6789",
        email: "kevin.zhang@email.com",
        appointmentTime: "14:00",
        reason: "Follow-up Consultation",
        bookedOn: "Mar 6, 2026 at 11:20 AM",
        status: "confirmed",
        doctorName: "Dr. Priya Patel",
        doctorAvatar: "PP"
      },
      {
        id: "p24",
        name: "Nancy Taylor",
        age: 55,
        phone: "+1 (555) 456-7890",
        email: "nancy.taylor@email.com",
        appointmentTime: "15:15",
        reason: "Blood Pressure Check",
        bookedOn: "Mar 7, 2026 at 10:45 AM",
        status: "confirmed",
        doctorName: "Dr. Priya Patel",
        doctorAvatar: "PP"
      },
      {
        id: "p25",
        name: "Steven Harris",
        age: 49,
        phone: "+1 (555) 567-8901",
        email: "steven.harris@email.com",
        appointmentTime: "16:30",
        reason: "Medication Review",
        bookedOn: "Mar 5, 2026 at 1:30 PM",
        status: "confirmed",
        doctorName: "Dr. Priya Patel",
        doctorAvatar: "PP"
      },
      {
        id: "p26",
        name: "Carol Martinez",
        age: 58,
        phone: "+1 (555) 678-9012",
        email: "carol.martinez@email.com",
        appointmentTime: "17:45",
        reason: "Follow-up",
        bookedOn: "Mar 4, 2026 at 9:15 AM",
        status: "confirmed",
        doctorName: "Dr. Priya Patel",
        doctorAvatar: "PP"
      },
      {
        id: "p27",
        name: "George Robinson",
        age: 62,
        phone: "+1 (555) 789-0123",
        email: "george.robinson@email.com",
        appointmentTime: "18:30",
        reason: "Consultation",
        bookedOn: "Mar 3, 2026 at 2:50 PM",
        status: "confirmed",
        doctorName: "Dr. Priya Patel",
        doctorAvatar: "PP"
      },
      {
        id: "p28",
        name: "Betty Clark",
        age: 44,
        phone: "+1 (555) 890-1234",
        email: "betty.clark@email.com",
        appointmentTime: "19:15",
        reason: "Anxiety Management",
        bookedOn: "Mar 2, 2026 at 4:10 PM",
        status: "confirmed",
        doctorName: "Dr. Priya Patel",
        doctorAvatar: "PP"
      }
    ],
    "wed-3": [
      {
        id: "p29",
        name: "Thomas Moore",
        age: 39,
        phone: "+1 (555) 901-2345",
        email: "thomas.moore@email.com",
        appointmentTime: "18:30",
        reason: "Follow-up",
        bookedOn: "Mar 8, 2026 at 12:30 PM",
        status: "confirmed",
        doctorName: "Dr. Rajesh Kumar",
        doctorAvatar: "RK"
      },
      {
        id: "p30",
        name: "Susan Miller",
        age: 47,
        phone: "+1 (555) 012-3456",
        email: "susan.miller@email.com",
        appointmentTime: "19:45",
        reason: "Consultation",
        bookedOn: "Mar 7, 2026 at 3:20 PM",
        status: "confirmed",
        doctorName: "Dr. Rajesh Kumar",
        doctorAvatar: "RK"
      }
    ]
  };

  // Complete OPD data for March 2026 (COMPLETE DATA)
  const marchOPDData: Record<number, OPDSlot[]> = {
    1: [{
      timeSlot: "09:00 - 12:00",
      type: "In-Person",
      platform: "Microsoft Teams",
      location: "Community Health Center",
      appointments: 4,
      totalCapacity: 10,
      patients: patientAppointments["sat-1"]?.slice(0, 4) || [],
      doctorName: "Dr. Amit Sharma",
      doctorSpecialization: "Cardiology, Neurology",
      doctorAvatar: "AS"
    }],
    7: [{
      timeSlot: "09:00 - 12:00",
      type: "In-Person",
      platform: "Microsoft Teams",
      location: "Community Health Center",
      appointments: 3,
      totalCapacity: 10,
      patients: patientAppointments["sat-1"]?.slice(0, 3) || [],
      doctorName: "Dr. Amit Sharma",
      doctorSpecialization: "Cardiology, Neurology",
      doctorAvatar: "AS"
    }],
    9: [
      {
        timeSlot: "09:00 - 12:00",
        type: "In-Person",
        platform: "Microsoft Teams",
        location: "Community Health Center",
        appointments: 4,
        totalCapacity: 10,
        patients: patientAppointments["sat-1"]?.slice(0, 4) || [],
        doctorName: "Dr. Amit Sharma",
        doctorSpecialization: "Cardiology, Neurology",
        doctorAvatar: "AS"
      },
      {
        timeSlot: "14:00 - 18:00",
        type: "In-Person",
        platform: "Microsoft Teams",
        location: "City General Hospital",
        appointments: 3,
        totalCapacity: 12,
        patients: patientAppointments["sat-2"] || [],
        doctorName: "Dr. Priya Patel",
        doctorSpecialization: "General Medicine",
        doctorAvatar: "PP"
      }
    ],
    10: [
      {
        timeSlot: "09:00 - 12:00",
        type: "In-Person",
        platform: "Microsoft Teams",
        location: "Zoom Meeting Platform",
        appointments: 5,
        totalCapacity: 10,
        patients: patientAppointments["tue-1"] || [],
        doctorName: "Dr. Priya Patel",
        doctorSpecialization: "General Medicine",
        doctorAvatar: "PP"
      },
      {
        timeSlot: "14:00 - 18:00",
        type: "Telehealth",
        platform: "Microsoft Teams",
        location: "Downtown Clinic",
        appointments: 4,
        totalCapacity: 12,
        patients: patientAppointments["tue-2"]?.slice(0, 4) || [],
        doctorName: "Dr. Sanjay Gupta",
        doctorSpecialization: "Neurology",
        doctorAvatar: "SG"
      }
    ],
    11: [
      {
        timeSlot: "09:00 - 12:00",
        type: "Telehealth",
        platform: "Google Meet",
        location: "Google Meet",
        appointments: 1,
        totalCapacity: 10,
        patients: patientAppointments["wed-1"] || [],
        doctorName: "Dr. Amit Sharma",
        doctorSpecialization: "Cardiology, Neurology",
        doctorAvatar: "AS"
      },
      {
        timeSlot: "14:00 - 18:00",
        type: "Telehealth",
        platform: "Microsoft Teams",
        location: "Suburban Medical Center",
        appointments: 6,
        totalCapacity: 12,
        patients: patientAppointments["wed-2"]?.slice(0, 6) || [],
        doctorName: "Dr. Priya Patel",
        doctorSpecialization: "General Medicine",
        doctorAvatar: "PP"
      },
      {
        timeSlot: "18:30 - 21:00",
        type: "Telehealth",
        platform: "Zoom Meeting Platform",
        location: "Zoom Meeting Platform",
        appointments: 2,
        totalCapacity: 8,
        patients: patientAppointments["wed-3"] || [],
        doctorName: "Dr. Rajesh Kumar",
        doctorSpecialization: "Internal Medicine",
        doctorAvatar: "RK"
      }
    ],
    12: [{
      timeSlot: "09:00 - 12:00",
      type: "In-Person",
      platform: "Microsoft Teams",
      location: "City Medical Center",
      appointments: 3,
      totalCapacity: 10,
      patients: patientAppointments["thu-1"]?.slice(0, 3) || [],
      doctorName: "Dr. Sanjay Gupta",
      doctorSpecialization: "Neurology",
      doctorAvatar: "SG"
    }],
    13: [
      {
        timeSlot: "09:00 - 12:00",
        type: "Telehealth",
        platform: "Zoom Meeting Platform",
        location: "Virtual Consultation",
        appointments: 7,
        totalCapacity: 10,
        patients: patientAppointments["fri-1"]?.slice(0, 7) || [],
        doctorName: "Dr. Priya Patel",
        doctorSpecialization: "General Medicine",
        doctorAvatar: "PP"
      },
      {
        timeSlot: "14:00 - 18:00",
        type: "In-Person",
        platform: "Microsoft Teams",
        location: "Community Health Center",
        appointments: 6,
        totalCapacity: 12,
        patients: patientAppointments["fri-2"]?.slice(0, 6) || [],
        doctorName: "Dr. Rajesh Kumar",
        doctorSpecialization: "Internal Medicine",
        doctorAvatar: "RK"
      }
    ],
    14: [
      {
        timeSlot: "09:00 - 12:00",
        type: "Telehealth",
        platform: "Microsoft Teams",
        location: "Community Health Center",
        appointments: 4,
        totalCapacity: 10,
        patients: patientAppointments["sat-1"] || [],
        doctorName: "Dr. Amit Sharma",
        doctorSpecialization: "Cardiology, Neurology",
        doctorAvatar: "AS"
      },
      {
        timeSlot: "14:00 - 18:00",
        type: "In-Person",
        platform: "Microsoft Teams",
        location: "City General Hospital",
        appointments: 3,
        totalCapacity: 12,
        patients: patientAppointments["sat-2"] || [],
        doctorName: "Dr. Priya Patel",
        doctorSpecialization: "General Medicine",
        doctorAvatar: "PP"
      }
    ],
    15: [
      {
        timeSlot: "10:00 - 13:00",
        type: "Telehealth",
        platform: "Google Meet",
        location: "Virtual Consultation",
        appointments: 2,
        totalCapacity: 8,
        patients: patientAppointments["sun-1"] || [],
        doctorName: "Dr. Sanjay Gupta",
        doctorSpecialization: "Neurology",
        doctorAvatar: "SG"
      }
    ],
    16: [
      {
        timeSlot: "09:00 - 12:00",
        type: "In-Person",
        platform: "Microsoft Teams",
        location: "Community Health Center",
        appointments: 6,
        totalCapacity: 10,
        patients: patientAppointments["mon-2"]?.slice(0, 6) || [],
        doctorName: "Dr. Amit Sharma",
        doctorSpecialization: "Cardiology, Neurology",
        doctorAvatar: "AS"
      },
      {
        timeSlot: "14:00 - 18:00",
        type: "In-Person",
        platform: "Microsoft Teams",
        location: "City General Hospital",
        appointments: 5,
        totalCapacity: 12,
        patients: patientAppointments["tue-2"]?.slice(0, 5) || [],
        doctorName: "Dr. Sanjay Gupta",
        doctorSpecialization: "Neurology",
        doctorAvatar: "SG"
      }
    ],
    17: [{
      timeSlot: "09:00 - 12:00",
      type: "In-Person",
      platform: "Microsoft Teams",
      location: "Community Health Center",
      appointments: 4,
      totalCapacity: 10,
      patients: patientAppointments["wed-1"] || [],
      doctorName: "Dr. Amit Sharma",
      doctorSpecialization: "Cardiology, Neurology",
      doctorAvatar: "AS"
    }],
    18: [{
      timeSlot: "14:00 - 18:00",
      type: "In-Person",
      platform: "Microsoft Teams",
      location: "City General Hospital",
      appointments: 5,
      totalCapacity: 12,
      patients: patientAppointments["thu-2"]?.slice(0, 5) || [],
      doctorName: "Dr. Amit Sharma",
      doctorSpecialization: "Cardiology, Neurology",
      doctorAvatar: "AS"
    }],
    19: [
      {
        timeSlot: "09:00 - 12:00",
        type: "In-Person",
        platform: "Microsoft Teams",
        location: "Community Health Center",
        appointments: 6,
        totalCapacity: 10,
        patients: patientAppointments["fri-1"]?.slice(0, 6) || [],
        doctorName: "Dr. Priya Patel",
        doctorSpecialization: "General Medicine",
        doctorAvatar: "PP"
      },
      {
        timeSlot: "14:00 - 18:00",
        type: "In-Person",
        platform: "Microsoft Teams",
        location: "City General Hospital",
        appointments: 5,
        totalCapacity: 12,
        patients: patientAppointments["sat-2"]?.slice(0, 5) || [],
        doctorName: "Dr. Priya Patel",
        doctorSpecialization: "General Medicine",
        doctorAvatar: "PP"
      }
    ],
    20: [{
      timeSlot: "09:00 - 12:00",
      type: "In-Person",
      platform: "Microsoft Teams",
      location: "Community Health Center",
      appointments: 7,
      totalCapacity: 10,
      patients: patientAppointments["mon-2"]?.slice(0, 7) || [],
      doctorName: "Dr. Amit Sharma",
      doctorSpecialization: "Cardiology, Neurology",
      doctorAvatar: "AS"
    }],
    21: [
      {
        timeSlot: "09:00 - 12:00",
        type: "In-Person",
        platform: "Microsoft Teams",
        location: "Community Health Center",
        appointments: 8,
        totalCapacity: 10,
        patients: patientAppointments["tue-2"]?.slice(0, 8) || [],
        doctorName: "Dr. Sanjay Gupta",
        doctorSpecialization: "Neurology",
        doctorAvatar: "SG"
      },
      {
        timeSlot: "14:00 - 18:00",
        type: "In-Person",
        platform: "Microsoft Teams",
        location: "City General Hospital",
        appointments: 7,
        totalCapacity: 12,
        patients: patientAppointments["wed-2"]?.slice(0, 7) || [],
        doctorName: "Dr. Priya Patel",
        doctorSpecialization: "General Medicine",
        doctorAvatar: "PP"
      }
    ],
    22: [
      {
        timeSlot: "09:00 - 12:00",
        type: "In-Person",
        platform: "Microsoft Teams",
        location: "Community Health Center",
        appointments: 6,
        totalCapacity: 10,
        patients: patientAppointments["thu-1"]?.slice(0, 6) || [],
        doctorName: "Dr. Sanjay Gupta",
        doctorSpecialization: "Neurology",
        doctorAvatar: "SG"
      },
      {
        timeSlot: "14:00 - 18:00",
        type: "In-Person",
        platform: "Microsoft Teams",
        location: "City General Hospital",
        appointments: 5,
        totalCapacity: 12,
        patients: patientAppointments["fri-2"]?.slice(0, 5) || [],
        doctorName: "Dr. Rajesh Kumar",
        doctorSpecialization: "Internal Medicine",
        doctorAvatar: "RK"
      }
    ],
    23: [{
      timeSlot: "14:00 - 18:00",
      type: "In-Person",
      platform: "Microsoft Teams",
      location: "City General Hospital",
      appointments: 7,
      totalCapacity: 12,
      patients: patientAppointments["sat-2"]?.slice(0, 7) || [],
      doctorName: "Dr. Priya Patel",
      doctorSpecialization: "General Medicine",
      doctorAvatar: "PP"
    }],
    24: [
      {
        timeSlot: "09:00 - 12:00",
        type: "In-Person",
        platform: "Microsoft Teams",
        location: "Community Health Center",
        appointments: 8,
        totalCapacity: 10,
        patients: patientAppointments["mon-2"]?.slice(0, 8) || [],
        doctorName: "Dr. Amit Sharma",
        doctorSpecialization: "Cardiology, Neurology",
        doctorAvatar: "AS"
      },
      {
        timeSlot: "14:00 - 18:00",
        type: "In-Person",
        platform: "Microsoft Teams",
        location: "City General Hospital",
        appointments: 6,
        totalCapacity: 12,
        patients: patientAppointments["tue-2"]?.slice(0, 6) || [],
        doctorName: "Dr. Sanjay Gupta",
        doctorSpecialization: "Neurology",
        doctorAvatar: "SG"
      }
    ],
    25: [{
      timeSlot: "09:00 - 12:00",
      type: "In-Person",
      platform: "Microsoft Teams",
      location: "Community Health Center",
      appointments: 5,
      totalCapacity: 10,
      patients: patientAppointments["wed-1"] || [],
      doctorName: "Dr. Amit Sharma",
      doctorSpecialization: "Cardiology, Neurology",
      doctorAvatar: "AS"
    }],
    26: [
      {
        timeSlot: "09:00 - 12:00",
        type: "In-Person",
        platform: "Microsoft Teams",
        location: "Community Health Center",
        appointments: 7,
        totalCapacity: 10,
        patients: patientAppointments["thu-1"]?.slice(0, 7) || [],
        doctorName: "Dr. Sanjay Gupta",
        doctorSpecialization: "Neurology",
        doctorAvatar: "SG"
      },
      {
        timeSlot: "14:00 - 18:00",
        type: "In-Person",
        platform: "Microsoft Teams",
        location: "City General Hospital",
        appointments: 6,
        totalCapacity: 12,
        patients: patientAppointments["fri-2"]?.slice(0, 6) || [],
        doctorName: "Dr. Rajesh Kumar",
        doctorSpecialization: "Internal Medicine",
        doctorAvatar: "RK"
      }
    ],
    27: [
      {
        timeSlot: "09:00 - 12:00",
        type: "In-Person",
        platform: "Microsoft Teams",
        location: "Community Health Center",
        appointments: 8,
        totalCapacity: 10,
        patients: patientAppointments["sat-1"]?.slice(0, 8) || [],
        doctorName: "Dr. Amit Sharma",
        doctorSpecialization: "Cardiology, Neurology",
        doctorAvatar: "AS"
      },
      {
        timeSlot: "14:00 - 18:00",
        type: "In-Person",
        platform: "Microsoft Teams",
        location: "City General Hospital",
        appointments: 7,
        totalCapacity: 12,
        patients: patientAppointments["sun-1"]?.slice(0, 7) || [],
        doctorName: "Dr. Sanjay Gupta",
        doctorSpecialization: "Neurology",
        doctorAvatar: "SG"
      }
    ],
    28: [{
      timeSlot: "09:00 - 12:00",
      type: "In-Person",
      platform: "Microsoft Teams",
      location: "Community Health Center",
      appointments: 6,
      totalCapacity: 10,
      patients: patientAppointments["mon-2"]?.slice(0, 6) || [],
      doctorName: "Dr. Amit Sharma",
      doctorSpecialization: "Cardiology, Neurology",
      doctorAvatar: "AS"
    }],
    29: [
      {
        timeSlot: "09:00 - 12:00",
        type: "In-Person",
        platform: "Microsoft Teams",
        location: "Community Health Center",
        appointments: 5,
        totalCapacity: 10,
        patients: patientAppointments["tue-1"] || [],
        doctorName: "Dr. Priya Patel",
        doctorSpecialization: "General Medicine",
        doctorAvatar: "PP"
      },
      {
        timeSlot: "14:00 - 18:00",
        type: "In-Person",
        platform: "Microsoft Teams",
        location: "City General Hospital",
        appointments: 4,
        totalCapacity: 12,
        patients: patientAppointments["wed-2"]?.slice(0, 4) || [],
        doctorName: "Dr. Priya Patel",
        doctorSpecialization: "General Medicine",
        doctorAvatar: "PP"
      }
    ]
  };

  // Month calculations
  const monthTotal = Object.values(marchOPDData).reduce((total, slots) => total + slots.length, 0);
  const appointmentDays = Object.keys(marchOPDData).map(Number);

  // Helper functions for month view
  const getOPDSlotsForDate = (date: Date) => {
    return marchOPDData[date.getDate()] || [];
  };

  const getOPDCount = (date: Date) => {
    return getOPDSlotsForDate(date).length;
  };

  const hasAppointments = (date: Date) => {
    return getOPDCount(date) > 0;
  };

  const isToday = (date: Date) => {
    return date.getDate() === 14 && date.getMonth() === 2 && date.getFullYear() === 2026;
  };

  const handleDateClick = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      const slots = getOPDSlotsForDate(date);
      if (slots.length > 0) {
        setSelectedMonthSlot(slots[0]);
      } else {
        setSelectedMonthSlot(null);
      }
    }
  };

  const handleScheduleClick = (schedule: DoctorSchedule) => {
    setSelectedSchedule(schedule);
    setIsAppointmentsDialogOpen(true);
  };

  const handleSlotAppointmentsClick = (slot: OPDSlot) => {
    setSelectedSlotForAppointments(slot);
    setIsAppointmentsDialogOpen(true);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setWeekOffset(prev => direction === 'next' ? prev + 1 : prev - 1);
  };

  // Get week start date based on offset
  const getWeekStartDate = () => {
    const date = new Date(2026, 2, 9);
    date.setDate(date.getDate() + (weekOffset * 7));
    return date;
  };

  const weekStartDate = getWeekStartDate();
  const weekEndDate = new Date(weekStartDate);
  weekEndDate.setDate(weekEndDate.getDate() + 6);

  const formatWeekRange = () => {
    return `Week of ${weekStartDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEndDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  // Get patients for selected slot
  const getPatientsForSelectedSlot = () => {
    if (!selectedMonthSlot) return [];
    return selectedMonthSlot.patients;
  };

  // Set default selected slot on mount
  useEffect(() => {
    const slots = getOPDSlotsForDate(new Date(2026, 2, 14));
    if (slots.length > 0) {
      setSelectedMonthSlot(slots[0]);
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Doctor's Schedule</h1>
          <p className="text-muted-foreground">Manage your OPD appointments and availability</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          New Appointment
        </Button>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="month" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="day">Today</TabsTrigger>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
        </TabsList>

        {/* ==================== DAY VIEW ==================== */}
        <TabsContent value="day" className="space-y-6">
          {/* Header with Date and Navigation */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">{formatDayHeader()}</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => navigateDay('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => navigateDay('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Doctor Schedules */}
          <div className="grid grid-cols-1 gap-4">
            {dayDoctorSchedules.map((schedule) => (
              <Card key={schedule.id} className="border-border hover:shadow-md transition-all">
                <CardContent className="p-5">
                  {/* Doctor Info */}
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary">{schedule.doctorAvatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{schedule.doctorName}</h3>
                      <p className="text-xs text-muted-foreground">{schedule.doctorSpecialization}</p>
                    </div>
                  </div>

                  {/* Schedule Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-semibold">{schedule.timeSlot}</span>
                      <Badge className={schedule.type === "Telehealth" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}>
                        {schedule.type}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                  </div>

                  {/* Platform */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Video className="h-4 w-4" />
                    <span>{schedule.platform}</span>
                  </div>

                  {/* Appointments Info - Clickable */}
                  <div
                    className="flex items-center justify-between p-3 bg-accent/20 rounded-lg cursor-pointer hover:bg-accent/30 transition-colors"
                    onClick={() => handleScheduleClick(schedule)}
                  >
                    <span className="text-sm font-medium">Appointments:</span>
                    <Badge variant="outline" className="text-base font-semibold">
                      {schedule.appointments} / {schedule.totalCapacity}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ==================== WEEK VIEW ==================== */}
        <TabsContent value="week" className="space-y-6">
          {/* Week Header with Navigation */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">{formatWeekRange()}</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => navigateWeek('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => navigateWeek('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Week Schedule - Day by Day */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {weekDays.map((day) => {
              const isToday = day === "Sat" && weekDates[day as keyof typeof weekDates] === "14 Mar";
              const daySchedules = schedulesByDay[day] || [];
              const totalSlots = daySchedules.length;

              return (
                <Card key={day} className={`border-border pt-0 h-full ${isToday ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
                  <CardHeader className={`py-2 border-b border-border ${isToday ? 'bg-primary/5' : ''}`}>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {day}
                        {isToday && (
                          <Badge className="bg-primary text-primary-foreground text-xs">Today</Badge>
                        )}
                      </CardTitle>
                      {totalSlots > 0 && (
                        <Badge variant="outline" className="bg-primary/5">
                          {totalSlots} {totalSlots === 1 ? 'Slot' : 'Slots'}
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{weekDates[day as keyof typeof weekDates]}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    {daySchedules.map((schedule) => (
                      <div key={schedule.id} className="border border-border rounded-lg p-3 hover:shadow-md transition-all">
                        {/* Doctor Info */}
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">{schedule.doctorAvatar}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-xs">{schedule.doctorName}</span>
                        </div>

                        {/* Time Slot and Type */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium text-sm">{schedule.timeSlot}</span>
                          </div>
                          <Badge className={schedule.type === "Telehealth" ? "bg-blue-100 text-blue-800 text-xs" : "bg-purple-100 text-purple-800 text-xs"}>
                            {schedule.type}
                          </Badge>
                        </div>

                        {/* Platform */}
                        <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                          <Video className="h-3 w-3" />
                          {schedule.platform}
                        </p>

                        {/* Booked Info and Edit Button */}
                        <div className="flex items-center justify-between mt-2">
                          {/* Booked Badge - Clickable */}
                          <div
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => handleScheduleClick(schedule)}
                          >
                            <Badge variant="outline" className="text-xs font-normal">
                              {schedule.appointments}/{schedule.totalCapacity} booked
                            </Badge>
                          </div>
                          <Button variant="ghost" size="sm" className="h-7 px-2">
                            <Edit className="h-3 w-3 mr-1" />
                            <span className="text-xs">Edit</span>
                          </Button>
                        </div>
                      </div>
                    ))}

                    {/* No schedules for this day */}
                    {daySchedules.length === 0 && (
                      <div className="text-center py-6 text-muted-foreground text-sm border border-dashed border-border rounded-lg">
                        No schedules
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* ==================== MONTH VIEW - THREE GRID LAYOUT ==================== */}
        <TabsContent value="month" className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>March 2026</CardTitle>
                  <CardDescription>
                    <span className="font-semibold text-primary">{monthTotal} OPD sessions</span> this month
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const newDate = new Date(currentDate);
                      newDate.setMonth(newDate.getMonth() - 1);
                      setCurrentDate(newDate);
                    }}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const newDate = new Date(currentDate);
                      newDate.setMonth(newDate.getMonth() + 1);
                      setCurrentDate(newDate);
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {/* Three Column Grid Inside Month Tab */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

                {/* ========== LEFT COLUMN - CALENDAR ========== */}
                <div className="lg:col-span-1">
                  <Card className="border-border h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-primary" />
                        Calendar
                      </CardTitle>
                      <CardDescription>Click on a date to view OPD details</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateClick}
                        month={currentDate}
                        onMonthChange={setCurrentDate}
                        className="rounded-lg border gap-1 w-full"
                        components={{
                          DayButton: ({ day, ...props }) => {
                            const date = day.date;
                            const slots = getOPDSlotsForDate(date);
                            const count = slots.length;
                            const isSelected = selectedDate?.toDateString() === date.toDateString();
                            const isTodayDate = isToday(date);
                            const hasAppt = hasAppointments(date);

                            return (
                              <button
                                {...props}
                                className={`
                                  relative flex items-center justify-center
                                  aspect-square w-full
                                  text-sm font-normal rounded-md transition-all duration-200
                                  h-auto mx-auto z-10
                                  ${isSelected
                                    ? 'bg-primary text-primary-foreground shadow-sm scale-105'
                                    : ''
                                  }
                                  ${isTodayDate && !isSelected
                                    ? 'bg-primary/5 text-primary hover:bg-primary/10 font-bold border border-primary'
                                    : ''
                                  }
                                  ${hasAppt && !isSelected && !isTodayDate
                                    ? 'bg-primary/5 text-primary hover:bg-primary/10 cursor-pointer'
                                    : ''
                                  }
                                  ${!hasAppt && !isTodayDate && !isSelected
                                    ? 'text-muted-foreground'
                                    : ''
                                  }
                                `}
                              >
                                <div className="flex flex-col items-center justify-center">
                                  <span>{date.getDate()}</span>
                                  {count > 0 && (
                                    <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                                      <Badge variant="outline" className="h-4 px-1 text-[8px] bg-primary/10">
                                        {count} OPD's
                                      </Badge>
                                    </span>
                                  )}
                                  {isTodayDate && !isSelected && (
                                    <span className="absolute top-0 right-0 h-3 w-3 bg-primary rounded-full" />
                                  )}
                                </div>
                              </button>
                            );
                          }
                        }}
                      />

                      <div className="mt-4 pt-3 border-t border-border">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Total OPD</span>
                          <Badge variant="outline" className="font-semibold">{monthTotal}</Badge>
                        </div>
                        <div className="flex justify-between items-center mt-1 text-sm">
                          <span className="text-muted-foreground">Active Days</span>
                          <Badge variant="outline" className="font-semibold">{appointmentDays.length}</Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs">
                          <div className="flex items-center gap-1">
                            <div className="h-3 w-3 bg-primary/20 border border-primary rounded-full"></div>
                            <span>Today</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="h-3 w-3 bg-primary/5 rounded-full"></div>
                            <span>Has OPD</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* ========== MIDDLE COLUMN - DOCTOR OPD SCHEDULE ========== */}
                <div className="lg:col-span-1">
                  <ScheduleCard
                    title="Doctor OPD Schedule"
                    date={selectedDate
                      ? selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
                      : 'Select a date'}
                    count={selectedDate ? getOPDCount(selectedDate) : 0}
                    countLabel="Doctors"
                    viewAllText="View All Doctors"
                    viewAllCount={selectedDate ? getOPDCount(selectedDate) : 0}
                    onViewAll={() => {
                      if (selectedDate && hasAppointments(selectedDate)) {
                        setSelectedDaySlots(getOPDSlotsForDate(selectedDate));
                        setIsDayDialogOpen(true);
                      }
                    }}
                    emptyIcon={<Stethoscope className="h-8 w-8 mx-auto mb-2 opacity-30" />}
                    emptyMessage="No doctor OPD scheduled"
                    emptySubMessage="Select a date with OPD sessions"
                  >
                    {selectedDate && getOPDSlotsForDate(selectedDate).map((slot, index) => (
                      <div
                        key={index}
                        className={`border rounded-lg p-3 hover:shadow-md transition-all mb-2 cursor-pointer ${selectedMonthSlot === slot ? 'border-primary bg-primary/5' : 'border-border'
                          }`}
                        onClick={() => setSelectedMonthSlot(slot)}
                      >
                        {/* Doctor Info */}
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary">{slot.doctorAvatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-sm">{slot.doctorName}</h4>
                            <p className="text-xs text-muted-foreground">{slot.doctorSpecialization}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">{slot.timeSlot}</span>
                          <Badge className={slot.type === "Telehealth" ? "bg-blue-100 text-blue-800 text-xs" : "bg-purple-100 text-purple-800 text-xs"}>
                            {slot.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <Video className="h-3 w-3" />
                          <span>{slot.platform}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          {/* Booked Badge - Click to show patients in right column */}
                          <div
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMonthSlot(slot);
                            }}
                          >
                            <Badge variant="outline" className="text-xs font-normal">
                              {slot.appointments}/{slot.totalCapacity} booked
                            </Badge>
                          </div>
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <Edit className="h-3 w-3 mr-1" />
                            <span className="text-xs">Edit</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </ScheduleCard>
                </div>

                {/* ========== RIGHT COLUMN - BOOKED APPOINTMENTS ========== */}
                <div className="lg:col-span-1">
                  <ScheduleCard
                    title="Booked Appointments"
                    date={selectedMonthSlot
                      ? `${selectedMonthSlot.timeSlot}`
                      : selectedDate
                        ? selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
                        : 'Select a date'}
                    count={selectedMonthSlot ? selectedMonthSlot.appointments : 0}
                    countLabel="Patients"
                    viewAllText="View All Patients"
                    viewAllCount={selectedMonthSlot ? selectedMonthSlot.appointments : 0}
                    onViewAll={() => {
                      if (selectedMonthSlot) {
                        setSelectedSlotForAppointments(selectedMonthSlot);
                        setIsAppointmentsDialogOpen(true);
                      }
                    }}
                    emptyIcon={<Users className="h-8 w-8 mx-auto mb-2 opacity-30" />}
                    emptyMessage="No patient appointments"
                    emptySubMessage="Select a doctor OPD slot"
                  >
                    {/* Show patients for selected slot */}
                    {selectedMonthSlot && getPatientsForSelectedSlot().map((patient) => (
                      <AppointmentCard
                        key={patient.id}
                        type="patient"
                        title={patient.name}
                        avatar={patient.name.split(' ').map(n => n[0]).join('')}
                        doctor={patient.doctorName || ""}
                        time={patient.appointmentTime}
                        appointmentType={patient.appointmentTime.includes('09') ? "Video" : "In-Person"}
                        status="Confirmed"
                        onClick={() => {
                          setSelectedSlotForAppointments(selectedMonthSlot);
                          setIsAppointmentsDialogOpen(true);
                        }}
                      />
                    ))}
                  </ScheduleCard>
                </div>
              </div>

              {/* Month Summary Section */}
              <div className="mt-6 border-t border-border pt-4">
                <div className="grid grid-cols-4 gap-3 mb-4">
                  <div className="text-center p-2 bg-accent/20 rounded-lg">
                    <p className="text-2xl font-bold text-primary">{monthTotal}</p>
                    <p className="text-xs text-muted-foreground">Total OPD</p>
                  </div>
                  <div className="text-center p-2 bg-accent/20 rounded-lg">
                    <p className="text-2xl font-bold text-primary">{appointmentDays.length}</p>
                    <p className="text-xs text-muted-foreground">Active Days</p>
                  </div>
                  <div className="text-center p-2 bg-accent/20 rounded-lg">
                    <p className="text-2xl font-bold text-primary">
                      {(monthTotal / appointmentDays.length).toFixed(1)}
                    </p>
                    <p className="text-xs text-muted-foreground">Avg/Day</p>
                  </div>
                  <div className="text-center p-2 bg-accent/20 rounded-lg">
                    <p className="text-2xl font-bold text-primary">
                      {Math.max(...Object.values(marchOPDData).map(slots => slots.length))}
                    </p>
                    <p className="text-xs text-muted-foreground">Peak Day</p>
                  </div>
                </div>

                <div className="mt-2">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>0</span>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-accent/30 overflow-hidden">
                    <div
                      className="h-2 rounded-full bg-primary transition-all duration-300"
                      style={{ width: `${(monthTotal / 3) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* First Dialog - All OPD Slots for Selected Day */}
      <Dialog open={isDayDialogOpen} onOpenChange={setIsDayDialogOpen}>
        <DialogContent className="max-w-4xl! max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>OPD Schedule</DialogTitle>
            <DialogDescription>
              {selectedDate && (
                <span>{selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {selectedDaySlots.map((slot, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-4">
                  {/* Doctor Info */}
                  <div className="flex items-center gap-2 mb-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary">{slot.doctorAvatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-sm">{slot.doctorName}</h4>
                      <p className="text-xs text-muted-foreground">{slot.doctorSpecialization}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{slot.timeSlot}</span>
                    <Badge className={slot.type === "Telehealth" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}>
                      {slot.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Video className="h-4 w-4" />
                    <span>{slot.platform}</span>
                  </div>

                  {/* Appointments - Clickable */}
                  <div
                    className="mt-2 flex items-center justify-between p-3 bg-accent/20 rounded-lg cursor-pointer hover:bg-accent/30 transition-colors"
                    onClick={() => {
                      setIsDayDialogOpen(false);
                      setSelectedSlotForAppointments(slot);
                      setIsAppointmentsDialogOpen(true);
                    }}
                  >
                    <span className="text-sm font-medium">Appointments:</span>
                    <Badge variant="outline" className="text-base font-semibold">
                      {slot.appointments} / {slot.totalCapacity}
                    </Badge>
                  </div>

                  {/* Edit Button */}
                  <Button variant="ghost" size="sm" className="w-full mt-2 gap-2">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Second Dialog - Booked Appointments */}
      <Dialog open={isAppointmentsDialogOpen} onOpenChange={setIsAppointmentsDialogOpen}>
        <DialogContent className="max-w-4xl! w-full max-h-[80vh] overflow-y-auto mx-4">
          <DialogHeader>
            <DialogTitle>Booked Appointments</DialogTitle>
            <DialogDescription>
              {selectedSlotForAppointments && (
                <span>
                  {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} • {selectedSlotForAppointments.timeSlot} • {selectedSlotForAppointments.doctorName}
                </span>
              )}
              {selectedSchedule && !selectedSlotForAppointments && (
                <span>{selectedSchedule.day}, {selectedSchedule.date} • {selectedSchedule.timeSlot} • {selectedSchedule.doctorName}</span>
              )}
            </DialogDescription>
          </DialogHeader>

          {(selectedSlotForAppointments || selectedSchedule) && (
            <div className="space-y-4">
              {/* Schedule Info */}
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">
                      OPD Time: {selectedSlotForAppointments ? selectedSlotForAppointments.timeSlot : selectedSchedule?.timeSlot}
                    </span>
                    <Badge className={
                      (selectedSlotForAppointments?.type || selectedSchedule?.type) === "Telehealth"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-purple-100 text-purple-800"
                    }>
                      {selectedSlotForAppointments?.type || selectedSchedule?.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Video className="h-4 w-4" />
                    <span>{selectedSlotForAppointments?.platform || selectedSchedule?.platform}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Stethoscope className="h-4 w-4" />
                    <span>{selectedSlotForAppointments?.doctorName || selectedSchedule?.doctorName}</span>
                  </div>
                  <div className="mt-3 p-2 bg-accent/20 rounded-lg flex items-center justify-between">
                    <span className="text-sm font-medium">Total Appointments:</span>
                    <Badge variant="outline" className="font-semibold">
                      {selectedSlotForAppointments?.appointments || selectedSchedule?.appointments}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Patient Appointments List */}
              <div className="space-y-3">
                <h3 className="font-semibold">Patient Appointments</h3>

                {selectedSlotForAppointments ? (
                  // Show patients from the selected slot
                  selectedSlotForAppointments.patients.map((patient) => (
                    <Card key={patient.id} className="border-border hover:shadow-md transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-lg">{patient.name}</h4>
                            <p className="text-sm text-muted-foreground">{patient.age} years old</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">confirmed</Badge>
                        </div>
                        <div className="space-y-2 mb-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{patient.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{patient.email}</span>
                          </div>
                        </div>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-medium">Appointment Time:</span> {patient.appointmentTime}</p>
                          <p><span className="font-medium">Reason:</span> {patient.reason}</p>
                          <p className="text-xs text-muted-foreground">Booked on: {patient.bookedOn}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : selectedSchedule && (
                  // Show patients from the selected schedule
                  patientAppointments[selectedSchedule.id]?.map((patient) => (
                    <Card key={patient.id} className="border-border hover:shadow-md transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-lg">{patient.name}</h4>
                            <p className="text-sm text-muted-foreground">{patient.age} years old</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">confirmed</Badge>
                        </div>
                        <div className="space-y-2 mb-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{patient.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{patient.email}</span>
                          </div>
                        </div>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-medium">Appointment Time:</span> {patient.appointmentTime}</p>
                          <p><span className="font-medium">Reason:</span> {patient.reason}</p>
                          <p className="text-xs text-muted-foreground">Booked on: {patient.bookedOn}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}