// "use client"

// import { useEffect, useState } from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { useRouter, useSearchParams } from "next/navigation"
// import {
//   Calendar,
//   Clock,
//   Video,
//   Phone,
//   MapPin,
//   Search,
//   Filter,
//   Plus,
//   MoreVertical,
//   CheckCircle,
//   XCircle,
//   Edit,
//   Trash2,
//   FileText,
//   User,
//   ChevronLeft,
//   ChevronRight,
//   ChevronsLeft,
//   ChevronsRight,
// } from "lucide-react"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Router } from "next/router"

// interface Medication {
//   name: string
//   dosage: string
//   frequency: string
//   prescribed: string
// }

// interface Vitals {
//   bloodPressure: string
//   heartRate: string
//   temperature: string
//   respiratoryRate: string
//   oxygenSaturation?: string
//   weight?: string
//   height?: string
//   bmi?: string
// }

// interface LabResult {
//   name: string
//   date: string
//   status: string
//   notes?: string
// }

// interface AppointmentHistory {
//   date: string
//   type: string
//   doctor: string
// }

// interface Appointment {
//   id: number
//   patient: string
//   avatar: string
//   age: number
//   gender: string
//   date: string
//   time: string
//   duration: string
//   type: string
//   reason: string
//   status: string
//   notes?: string
//   email?: string
//   phone?: string
//   emergencyContact?: string
//   address?: string
//   chiefComplaint?: string
//   medicalHistory?: string
//   medications?: Medication[]
//   vitals?: Vitals
//   labResults?: LabResult[]
//   appointments?: AppointmentHistory[]
// }

// export default function Appointments() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const [searchQuery, setSearchQuery] = useState("")
//   const [selectedFilter, setSelectedFilter] = useState("all")
//   const [selectedType, setSelectedType] = useState("all")
//   const [activeTab, setActiveTab] = useState("all")
//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1)
//   const [pastPage, setPastPage] = useState(1)
//   const itemsPerPage = 9 // ✅ Changed from 5 to 9

//   useEffect(() => {
//     const tab = searchParams.get("tab")
//     if (tab) {
//       setActiveTab(tab)
//     }
//   }, [searchParams])

//   const appointments: Appointment[] = [
//     {
//       id: 1,
//       patient: "Michael Chen",
//       avatar: "",
//       age: 45,
//       gender: "Male",
//       date: "March 11, 2026",
//       time: "10:00 AM",
//       duration: "30 min",
//       type: "video",
//       reason:
//         "Follow-up Consultation - Patient requested to discuss recent lab results",
//       status: "confirmed",
//       notes: "Patient requested to discuss recent lab results",
//       email: "michael.chen@email.com",
//       phone: "(555) 123-4567",
//       emergencyContact: "Lisa Chen (Wife) - (555) 123-4568",
//       address: "123 Main St, Anytown, CA 12345",
//       chiefComplaint:
//         "Patient reports persistent headaches and elevated blood pressure readings at home. Wants to discuss medication adjustment and lifestyle changes.",
//       medicalHistory:
//         "Hypertension diagnosed 5 years ago. Currently on Lisinopril 10mg daily. No known allergies. Family history of heart disease.",
//       medications: [
//         {
//           name: "Lisinopril",
//           dosage: "10mg",
//           frequency: "Once daily",
//           prescribed: "2026-01-15",
//         },
//         {
//           name: "Aspirin",
//           dosage: "81mg",
//           frequency: "Once daily",
//           prescribed: "2026-01-15",
//         },
//       ],
//       vitals: {
//         bloodPressure: "128/82",
//         heartRate: "72",
//         temperature: "98.6°F",
//         respiratoryRate: "16",
//         oxygenSaturation: "98%",
//         weight: "175 lbs",
//         height: "5'10\"",
//         bmi: "25.1",
//       },
//       labResults: [
//         { name: "Complete Blood Count", date: "2026-03-10", status: "normal" },
//         {
//           name: "Lipid Panel",
//           date: "2026-03-10",
//           status: "abnormal",
//           notes: "Cholesterol slightly elevated",
//         },
//         { name: "Thyroid Panel", date: "2026-03-10", status: "normal" },
//       ],
//       appointments: [
//         { date: "2026-03-11", type: "Follow-up", doctor: "Dr. Sarah Johnson" },
//         {
//           date: "2026-02-15",
//           type: "Regular Checkup",
//           doctor: "Dr. Sarah Johnson",
//         },
//         {
//           date: "2026-01-20",
//           type: "Initial Consultation",
//           doctor: "Dr. Sarah Johnson",
//         },
//       ],
//     },
//     {
//       id: 2,
//       patient: "Emma Wilson",
//       avatar: "",
//       age: 32,
//       gender: "Female",
//       date: "March 11, 2026",
//       time: "11:30 AM",
//       duration: "45 min",
//       type: "phone",
//       reason:
//         "Lab Results Discussion - Review blood test results and next steps",
//       status: "confirmed",
//       notes: "Review blood test results and next steps",
//       email: "emma.wilson@email.com",
//       phone: "(555) 234-5678",
//       emergencyContact: "John Wilson (Husband) - (555) 234-5679",
//       address: "456 Oak Ave, Anytown, CA 12345",
//       chiefComplaint:
//         "Patient wants to discuss recent blood work results including cholesterol levels and thyroid function tests.",
//       medicalHistory:
//         "Hypothyroidism on Synthroid 50mcg. Family history of high cholesterol. Allergic to penicillin.",
//       medications: [
//         {
//           name: "Synthroid",
//           dosage: "50mcg",
//           frequency: "Once daily",
//           prescribed: "2025-11-20",
//         },
//         {
//           name: "Vitamin D",
//           dosage: "2000 IU",
//           frequency: "Once daily",
//           prescribed: "2025-11-20",
//         },
//       ],
//       vitals: {
//         bloodPressure: "118/76",
//         heartRate: "68",
//         temperature: "98.4°F",
//         respiratoryRate: "14",
//         oxygenSaturation: "99%",
//         weight: "145 lbs",
//         height: "5'6\"",
//         bmi: "23.4",
//       },
//       labResults: [
//         { name: "TSH", date: "2026-03-09", status: "normal" },
//         {
//           name: "Lipid Panel",
//           date: "2026-03-09",
//           status: "abnormal",
//           notes: "LDL cholesterol high",
//         },
//       ],
//       appointments: [
//         {
//           date: "2026-03-11",
//           type: "Phone Consultation",
//           doctor: "Dr. Sarah Johnson",
//         },
//         { date: "2026-02-10", type: "Follow-up", doctor: "Dr. Sarah Johnson" },
//         {
//           date: "2025-11-20",
//           type: "Initial Visit",
//           doctor: "Dr. Sarah Johnson",
//         },
//       ],
//     },
//     {
//       id: 3,
//       patient: "James Rodriguez",
//       avatar: "",
//       age: 28,
//       gender: "Male",
//       date: "March 11, 2026",
//       time: "2:00 PM",
//       duration: "60 min",
//       type: "video",
//       reason:
//         "Initial Consultation - New patient comprehensive assessment needed",
//       status: "pending",
//       notes: "New patient - comprehensive assessment needed",
//       email: "james.rodriguez@email.com",
//       phone: "(555) 345-6789",
//       emergencyContact: "Maria Rodriguez (Mother) - (555) 345-6790",
//       address: "789 Pine St, Anytown, CA 12345",
//       chiefComplaint:
//         "New patient seeking comprehensive evaluation for ongoing fatigue and occasional chest discomfort.",
//       medicalHistory:
//         "No significant past medical history. Occasional heartburn. No known allergies.",
//       medications: [],
//       vitals: {
//         bloodPressure: "122/78",
//         heartRate: "70",
//         temperature: "98.4°F",
//         respiratoryRate: "16",
//         oxygenSaturation: "99%",
//         weight: "165 lbs",
//         height: "5'9\"",
//         bmi: "24.3",
//       },
//       labResults: [],
//       appointments: [],
//     },
//     {
//       id: 4,
//       patient: "Sophia Lee",
//       avatar: "",
//       age: 56,
//       gender: "Female",
//       date: "March 11, 2026",
//       time: "3:30 PM",
//       duration: "30 min",
//       type: "video",
//       reason: "Prescription Renewal - Medication review for hypertension",
//       status: "confirmed",
//       notes: "Medication review for hypertension",
//       email: "sophia.lee@email.com",
//       phone: "(555) 456-7890",
//       emergencyContact: "David Lee (Husband) - (555) 456-7891",
//       address: "321 Cedar St, Anytown, CA 12345",
//       chiefComplaint:
//         "Routine medication review for hypertension. Patient reports good blood pressure control with current medications.",
//       medicalHistory:
//         "Hypertension for 8 years. Type 2 diabetes diagnosed 3 years ago. No known allergies.",
//       medications: [
//         {
//           name: "Lisinopril",
//           dosage: "20mg",
//           frequency: "Once daily",
//           prescribed: "2026-02-01",
//         },
//         {
//           name: "Metformin",
//           dosage: "500mg",
//           frequency: "Twice daily",
//           prescribed: "2026-02-01",
//         },
//       ],
//       vitals: {
//         bloodPressure: "124/80",
//         heartRate: "74",
//         temperature: "98.2°F",
//         respiratoryRate: "16",
//         oxygenSaturation: "98%",
//         weight: "160 lbs",
//         height: "5'4\"",
//         bmi: "27.5",
//       },
//       labResults: [
//         { name: "HbA1c", date: "2026-03-05", status: "normal", notes: "6.2%" },
//       ],
//       appointments: [
//         {
//           date: "2026-03-11",
//           type: "Medication Review",
//           doctor: "Dr. Sarah Johnson",
//         },
//       ],
//     },
//     {
//       id: 5,
//       patient: "David Park",
//       avatar: "",
//       age: 41,
//       gender: "Male",
//       date: "March 12, 2026",
//       time: "9:00 AM",
//       duration: "45 min",
//       type: "in-person",
//       reason: "Annual Physical - Complete physical examination required",
//       status: "confirmed",
//       notes: "Complete physical examination required",
//       email: "david.park@email.com",
//       phone: "(555) 567-8901",
//       emergencyContact: "Anna Park (Wife) - (555) 567-8902",
//       address: "654 Birch St, Anytown, CA 12345",
//       chiefComplaint:
//         "Annual physical examination. No specific complaints but wants general health assessment.",
//       medicalHistory:
//         "High cholesterol. Takes statin medication. No known allergies.",
//       medications: [
//         {
//           name: "Atorvastatin",
//           dosage: "20mg",
//           frequency: "Once daily",
//           prescribed: "2025-10-15",
//         },
//       ],
//       vitals: {
//         bloodPressure: "130/84",
//         heartRate: "72",
//         temperature: "98.4°F",
//         respiratoryRate: "16",
//         oxygenSaturation: "98%",
//         weight: "190 lbs",
//         height: "5'11\"",
//         bmi: "26.5",
//       },
//       labResults: [],
//       appointments: [],
//     },
//     {
//       id: 6,
//       patient: "Alice Johnson",
//       avatar: "",
//       age: 38,
//       gender: "Female",
//       date: "March 10, 2026",
//       time: "2:00 PM",
//       duration: "30 min",
//       type: "video",
//       reason: "Follow-up - Post-surgery follow-up healing well",
//       status: "completed",
//       notes: "Post-surgery follow-up - healing well",
//       email: "alice.johnson@email.com",
//       phone: "(555) 678-9012",
//       emergencyContact: "Mark Johnson (Husband) - (555) 678-9013",
//       address: "987 Elm St, Anytown, CA 12345",
//       chiefComplaint:
//         "Follow-up after laparoscopic cholecystectomy performed 2 weeks ago. Reports good recovery with minimal pain.",
//       medicalHistory: "Gallstones. Surgery on 02/24/2026. No known allergies.",
//       medications: [
//         {
//           name: "Ibuprofen",
//           dosage: "400mg",
//           frequency: "As needed",
//           prescribed: "2026-02-24",
//         },
//       ],
//       vitals: {
//         bloodPressure: "118/74",
//         heartRate: "68",
//         temperature: "98.2°F",
//         respiratoryRate: "14",
//         oxygenSaturation: "99%",
//         weight: "155 lbs",
//         height: "5'5\"",
//         bmi: "25.8",
//       },
//       labResults: [],
//       appointments: [
//         { date: "2026-02-24", type: "Surgery", doctor: "Dr. Williams" },
//         { date: "2026-03-10", type: "Follow-up", doctor: "Dr. Sarah Johnson" },
//       ],
//     },
//     {
//       id: 7,
//       patient: "Robert Martinez",
//       avatar: "",
//       age: 52,
//       gender: "Male",
//       date: "March 9, 2026",
//       time: "11:00 AM",
//       duration: "30 min",
//       type: "video",
//       reason: "Consultation - Patient requested to reschedule",
//       status: "cancelled",
//       notes: "Patient requested to reschedule",
//       email: "robert.martinez@email.com",
//       phone: "(555) 789-0123",
//       emergencyContact: "Linda Martinez (Wife) - (555) 789-0124",
//       address: "147 Spruce St, Anytown, CA 12345",
//       chiefComplaint:
//         "Initial consultation for back pain. Patient cancelled due to scheduling conflict.",
//       medicalHistory: "Chronic lower back pain. Occasional muscle spasms.",
//       medications: [
//         {
//           name: "Ibuprofen",
//           dosage: "400mg",
//           frequency: "As needed",
//           prescribed: "2026-01-10",
//         },
//       ],
//       vitals: {
//         bloodPressure: "126/80",
//         heartRate: "70",
//         temperature: "98.4°F",
//         respiratoryRate: "16",
//         oxygenSaturation: "98%",
//         weight: "185 lbs",
//         height: "5'8\"",
//         bmi: "28.1",
//       },
//       labResults: [],
//       appointments: [],
//     },
//     {
//       id: 8,
//       patient: "Sarah Johnson",
//       avatar: "",
//       age: 29,
//       gender: "Female",
//       date: "March 8, 2026",
//       time: "10:30 AM",
//       duration: "30 min",
//       type: "video",
//       reason: "General Checkup - Regular checkup all good",
//       status: "completed",
//       notes: "Regular checkup - all good",
//       email: "sarah.johnson2@email.com",
//       phone: "(555) 890-1234",
//       emergencyContact: "Tom Johnson (Father) - (555) 890-1235",
//       address: "258 Willow St, Anytown, CA 12345",
//       chiefComplaint:
//         "Annual wellness visit. No active complaints. Feels healthy.",
//       medicalHistory:
//         "No significant medical history. No medications. No known allergies.",
//       medications: [],
//       vitals: {
//         bloodPressure: "114/72",
//         heartRate: "66",
//         temperature: "98.2°F",
//         respiratoryRate: "14",
//         oxygenSaturation: "99%",
//         weight: "135 lbs",
//         height: "5'6\"",
//         bmi: "21.8",
//       },
//       labResults: [],
//       appointments: [],
//     },
//     {
//       id: 9,
//       patient: "Thomas Brown",
//       avatar: "",
//       age: 61,
//       gender: "Male",
//       date: "March 7, 2026",
//       time: "3:00 PM",
//       duration: "45 min",
//       type: "in-person",
//       reason: "Cardiology Follow-up - Blood pressure monitoring",
//       status: "completed",
//       notes: "Blood pressure monitoring",
//       email: "thomas.brown@email.com",
//       phone: "(555) 901-2345",
//       emergencyContact: "Mary Brown (Wife) - (555) 901-2346",
//       address: "369 Maple St, Anytown, CA 12345",
//       chiefComplaint:
//         "Follow-up for hypertension. Home BP readings averaging 135/85. Wants to discuss medication adjustment.",
//       medicalHistory:
//         "Hypertension for 12 years. High cholesterol. Takes Lisinopril and Atorvastatin.",
//       medications: [
//         {
//           name: "Lisinopril",
//           dosage: "20mg",
//           frequency: "Once daily",
//           prescribed: "2025-12-01",
//         },
//         {
//           name: "Atorvastatin",
//           dosage: "40mg",
//           frequency: "Once daily",
//           prescribed: "2025-12-01",
//         },
//       ],
//       vitals: {
//         bloodPressure: "138/86",
//         heartRate: "72",
//         temperature: "98.2°F",
//         respiratoryRate: "16",
//         oxygenSaturation: "97%",
//         weight: "210 lbs",
//         height: "5'9\"",
//         bmi: "31.0",
//       },
//       labResults: [
//         {
//           name: "Lipid Panel",
//           date: "2026-03-05",
//           status: "abnormal",
//           notes: "LDL slightly elevated",
//         },
//       ],
//       appointments: [
//         {
//           date: "2026-03-07",
//           type: "Cardiology Follow-up",
//           doctor: "Dr. Sarah Johnson",
//         },
//         {
//           date: "2026-01-15",
//           type: "Regular Checkup",
//           doctor: "Dr. Sarah Johnson",
//         },
//       ],
//     },
//     {
//       id: 10,
//       patient: "Lisa Garcia",
//       avatar: "",
//       age: 34,
//       gender: "Female",
//       date: "March 6, 2026",
//       time: "9:30 AM",
//       duration: "30 min",
//       type: "phone",
//       reason: "Medication Review - Patient cancelled due to emergency",
//       status: "cancelled",
//       notes: "Patient cancelled due to emergency",
//       email: "lisa.garcia@email.com",
//       phone: "(555) 012-3456",
//       emergencyContact: "Carlos Garcia (Husband) - (555) 012-3457",
//       address: "753 Oak St, Anytown, CA 12345",
//       chiefComplaint:
//         "Medication review for anxiety. Appointment cancelled due to family emergency.",
//       medicalHistory: "Generalized anxiety disorder. Takes Sertraline.",
//       medications: [
//         {
//           name: "Sertraline",
//           dosage: "50mg",
//           frequency: "Once daily",
//           prescribed: "2026-01-20",
//         },
//       ],
//       vitals: {
//         bloodPressure: "120/78",
//         heartRate: "72",
//         temperature: "98.4°F",
//         respiratoryRate: "16",
//         oxygenSaturation: "99%",
//         weight: "140 lbs",
//         height: "5'4\"",
//         bmi: "24.0",
//       },
//       labResults: [],
//       appointments: [],
//     },
//     {
//       id: 11,
//       patient: "Kevin Zhang",
//       avatar: "",
//       age: 47,
//       gender: "Male",
//       date: "March 5, 2026",
//       time: "11:00 AM",
//       duration: "60 min",
//       type: "video",
//       reason: "New Patient Consultation - Initial assessment completed",
//       status: "completed",
//       notes: "Initial assessment completed",
//       email: "kevin.zhang@email.com",
//       phone: "(555) 123-4567",
//       emergencyContact: "Mei Zhang (Wife) - (555) 123-4568",
//       address: "159 Pine St, Anytown, CA 12345",
//       chiefComplaint:
//         "New patient seeking evaluation for fatigue and occasional dizziness. Symptoms have been present for 3 months.",
//       medicalHistory:
//         "No significant past medical history. Occasional heartburn. No known allergies.",
//       medications: [],
//       vitals: {
//         bloodPressure: "118/76",
//         heartRate: "68",
//         temperature: "98.2°F",
//         respiratoryRate: "14",
//         oxygenSaturation: "99%",
//         weight: "170 lbs",
//         height: "5'10\"",
//         bmi: "24.4",
//       },
//       labResults: [
//         { name: "Complete Blood Count", date: "2026-03-05", status: "normal" },
//         {
//           name: "Comprehensive Metabolic Panel",
//           date: "2026-03-05",
//           status: "normal",
//         },
//       ],
//       appointments: [
//         {
//           date: "2026-03-05",
//           type: "New Patient Visit",
//           doctor: "Dr. Sarah Johnson",
//         },
//       ],
//     },
//     {
//       id: 12,
//       patient: "Maria Santos",
//       avatar: "",
//       age: 53,
//       gender: "Female",
//       date: "March 4, 2026",
//       time: "2:30 PM",
//       duration: "30 min",
//       type: "video",
//       reason: "Follow-up - Post-treatment review",
//       status: "completed",
//       notes: "Post-treatment review",
//       email: "maria.santos@email.com",
//       phone: "(555) 234-5678",
//       emergencyContact: "Jose Santos (Husband) - (555) 234-5679",
//       address: "753 Cedar St, Anytown, CA 12345",
//       chiefComplaint:
//         "Follow-up after completing physical therapy for rotator cuff injury. Reports significant improvement in shoulder mobility and reduced pain.",
//       medicalHistory:
//         "Rotator cuff injury diagnosed 3 months ago. Completed 8 weeks of PT. No known allergies.",
//       medications: [
//         {
//           name: "Naproxen",
//           dosage: "220mg",
//           frequency: "As needed",
//           prescribed: "2025-12-10",
//         },
//       ],
//       vitals: {
//         bloodPressure: "122/78",
//         heartRate: "70",
//         temperature: "98.4°F",
//         respiratoryRate: "16",
//         oxygenSaturation: "99%",
//         weight: "150 lbs",
//         height: "5'3\"",
//         bmi: "26.6",
//       },
//       labResults: [],
//       appointments: [
//         {
//           date: "2025-12-10",
//           type: "Initial Consultation",
//           doctor: "Dr. Sarah Johnson",
//         },
//         { date: "2026-03-04", type: "Follow-up", doctor: "Dr. Sarah Johnson" },
//       ],
//     },
//   ]

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "confirmed":
//         return "bg-success/10 text-success hover:bg-success/20"
//       case "pending":
//         return "bg-warning/10 text-warning hover:bg-warning/20"
//       case "completed":
//         return "bg-info/10 text-info hover:bg-info/20"
//       case "cancelled":
//         return "bg-danger/10 text-danger hover:bg-danger/20"
//       default:
//         return "bg-primary/10 text-primary hover:bg-primary/20"
//     }
//   }

//   const getTypeIcon = (type: string) => {
//     switch (type) {
//       case "video":
//         return <Video className="h-4 w-4" />
//       case "phone":
//         return <Phone className="h-4 w-4" />
//       case "in-person":
//         return <MapPin className="h-4 w-4" />
//       default:
//         return <Calendar className="h-4 w-4" />
//     }
//   }

//   // Filter by search and status
//   const filteredAppointments = appointments.filter((apt) => {
//     const matchesSearch =
//       apt.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       apt.reason.toLowerCase().includes(searchQuery.toLowerCase())
//     const matchesFilter =
//       selectedFilter === "all" || apt.status === selectedFilter
//     return matchesSearch && matchesFilter
//   })

//   const upcomingAppointments = filteredAppointments.filter(
//     (apt) => apt.status === "confirmed" || apt.status === "pending"
//   )
//   const pastAppointments = filteredAppointments.filter(
//     (apt) => apt.status === "completed" || apt.status === "cancelled"
//   )
//   const todayAppointments = filteredAppointments.filter(
//     (apt) =>
//       apt.date === "March 11, 2026" &&
//       (apt.status === "confirmed" || apt.status === "pending")
//   )

//   // Filter by type for All tab
//   const getFilteredAppointments = () => {
//     let filtered = filteredAppointments

//     // Filter by type
//     if (selectedType === "in-person") {
//       filtered = filtered.filter((apt) => apt.type === "in-person")
//     } else if (selectedType === "telehealth") {
//       filtered = filtered.filter(
//         (apt) => apt.type === "video" || apt.type === "phone"
//       )
//     }

//     return filtered
//   }

//   // Filtered by type for All tab
//   const filteredByType = getFilteredAppointments()

//   // Pagination calculations
//   const totalAllPages = Math.ceil(filteredByType.length / itemsPerPage)
//   const totalPastPages = Math.ceil(pastAppointments.length / itemsPerPage)

//   // Paginated data
//   const paginatedAll = filteredByType.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   )

//   const paginatedPast = pastAppointments.slice(
//     (pastPage - 1) * itemsPerPage,
//     pastPage * itemsPerPage
//   )

//   const stats = [
//     {
//       label: "Today's Appointments",
//       value: todayAppointments.length,
//       color: "text-primary",
//     },
//     {
//       label: "Upcoming",
//       value: upcomingAppointments.length,
//       color: "text-success",
//     },
//     {
//       label: "Pending",
//       value: appointments.filter((a) => a.status === "pending").length,
//       color: "text-warning",
//     },
//     {
//       label: "Completed",
//       value: appointments.filter((a) => a.status === "completed").length,
//       color: "text-info",
//     },
//   ]

//   // Pagination Component
//   const PaginationControls = ({
//     currentPage,
//     totalPages,
//     onPageChange,
//     totalItems,
//   }: {
//     currentPage: number
//     totalPages: number
//     onPageChange: (page: number) => void
//     totalItems: number
//   }) => {
//     if (totalPages <= 1) return null

//     return (
//       <div className="mt-6 flex items-center justify-between">
//         <p className="text-sm text-muted-foreground">
//           Showing{" "}
//           <span className="font-medium">
//             {(currentPage - 1) * itemsPerPage + 1}
//           </span>{" "}
//           to{" "}
//           <span className="font-medium">
//             {Math.min(currentPage * itemsPerPage, totalItems)}
//           </span>{" "}
//           of <span className="font-medium">{totalItems}</span> results
//         </p>
//         <div className="flex items-center gap-2">
//           <Button
//             variant="outline"
//             size="icon"
//             onClick={() => onPageChange(1)}
//             disabled={currentPage === 1}
//             className="h-8 w-8"
//           >
//             <ChevronsLeft className="h-4 w-4" />
//           </Button>
//           <Button
//             variant="outline"
//             size="icon"
//             onClick={() => onPageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="h-8 w-8"
//           >
//             <ChevronLeft className="h-4 w-4" />
//           </Button>
//           <span className="min-w-[80px] text-center text-sm text-muted-foreground">
//             Page {currentPage} of {totalPages}
//           </span>
//           <Button
//             variant="outline"
//             size="icon"
//             onClick={() => onPageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="h-8 w-8"
//           >
//             <ChevronRight className="h-4 w-4" />
//           </Button>
//           <Button
//             variant="outline"
//             size="icon"
//             onClick={() => onPageChange(totalPages)}
//             disabled={currentPage === totalPages}
//             className="h-8 w-8"
//           >
//             <ChevronsRight className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//         <div>
//           <h1 className="mb-2 text-primary">Appointments</h1>
//           <p className="text-muted-foreground">
//             Manage all patient appointments
//           </p>
//         </div>
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button className="bg-primary hover:bg-primary/90">
//               <Plus className="mr-2 h-4 w-4" />
//               New Appointment
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="max-w-2xl">
//             <DialogHeader>
//               <DialogTitle>Create New Appointment</DialogTitle>
//               <DialogDescription>
//                 Schedule a new appointment for a patient
//               </DialogDescription>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               <div className="grid gap-4 md:grid-cols-2">
//                 <div className="space-y-2">
//                   <Label htmlFor="patient">Patient Name</Label>
//                   <Input id="patient" placeholder="Search patient..." />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="apt-type">Appointment Type</Label>
//                   <Select>
//                     <SelectTrigger id="apt-type">
//                       <SelectValue placeholder="Select type" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="video">Video Consultation</SelectItem>
//                       <SelectItem value="phone">Phone Call</SelectItem>
//                       <SelectItem value="in-person">In-Person Visit</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//               <div className="grid gap-4 md:grid-cols-2">
//                 <div className="space-y-2">
//                   <Label htmlFor="date">Date</Label>
//                   <Input id="date" type="date" />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="time">Time</Label>
//                   <Input id="time" type="time" />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="duration">Duration</Label>
//                 <Select>
//                   <SelectTrigger id="duration">
//                     <SelectValue placeholder="Select duration" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="15">15 minutes</SelectItem>
//                     <SelectItem value="30">30 minutes</SelectItem>
//                     <SelectItem value="45">45 minutes</SelectItem>
//                     <SelectItem value="60">60 minutes</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="reason">Reason for Visit</Label>
//                 <Input id="reason" placeholder="e.g., Follow-up consultation" />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="notes">Notes (Optional)</Label>
//                 <Textarea
//                   id="notes"
//                   placeholder="Add any additional notes..."
//                   rows={3}
//                   className="resize-none"
//                 />
//               </div>
//             </div>
//             <DialogFooter>
//               <Button variant="outline">Cancel</Button>
//               <Button className="bg-primary hover:bg-primary/90">
//                 Schedule Appointment
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Stats */}
//       {/* <div className="grid gap-4 md:grid-cols-4">
//         {stats.map((stat) => (
//           <Card key={stat.label} className="border-border">
//             <CardContent className="pt-6">
//               <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
//               <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div> */}

//       {/* Filters */}
//       <Card className="border-border">
//         <CardContent className="pt-6">
//           <div className="flex flex-col gap-4 md:flex-row">
//             <div className="flex-1">
//               <div className="relative">
//                 <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                 <Input
//                   placeholder="Search by patient name or reason..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-9"
//                 />
//               </div>
//             </div>
//             <div className="flex gap-2">
//               <Select value={selectedFilter} onValueChange={setSelectedFilter}>
//                 <SelectTrigger className="w-[180px]">
//                   <Filter className="mr-2 h-4 w-4" />
//                   <SelectValue placeholder="Filter by status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Status</SelectItem>
//                   <SelectItem value="confirmed">Confirmed</SelectItem>
//                   <SelectItem value="pending">Pending</SelectItem>
//                   <SelectItem value="completed">Completed</SelectItem>
//                   <SelectItem value="cancelled">Cancelled</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Tabs */}
//       <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//         <TabsList>
//           <TabsTrigger value="past">Past</TabsTrigger>
//           <TabsTrigger value="today">Today</TabsTrigger>
//           <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
//           <TabsTrigger value="all">All Appointments</TabsTrigger>
//         </TabsList>

//         {/* All Appointments Tab */}
//         <TabsContent value="all" className="mt-6 space-y-6">
//           {/* Add useRouter at top of component */}
//           {/* const router = useRouter(); */}
//           {/* Filter Pills Container */}
//           <div className="mb-6 flex items-center justify-end">
//             <div className="inline-flex items-center rounded-full bg-muted p-1">
//               <Button
//                 size="sm"
//                 className={`rounded-full px-4 ${
//                   selectedType === "all"
//                     ? "bg-white text-foreground shadow"
//                     : "bg-transparent text-muted-foreground hover:bg-white/50"
//                 }`}
//                 onClick={() => {
//                   setSelectedType("all")
//                   setCurrentPage(1)
//                 }}
//               >
//                 All Type
//               </Button>

//               <Button
//                 size="sm"
//                 variant="ghost"
//                 className={`rounded-full px-4 ${
//                   selectedType === "in-person"
//                     ? "bg-white text-foreground shadow"
//                     : "text-muted-foreground hover:bg-white/50"
//                 }`}
//                 onClick={() => {
//                   setSelectedType("in-person")
//                   setCurrentPage(1)
//                 }}
//               >
//                 In-Person
//               </Button>

//               <Button
//                 size="sm"
//                 variant="ghost"
//                 className={`rounded-full px-4 ${
//                   selectedType === "telehealth"
//                     ? "bg-white text-foreground shadow"
//                     : "text-muted-foreground hover:bg-white/50"
//                 }`}
//                 onClick={() => {
//                   setSelectedType("telehealth")
//                   setCurrentPage(1)
//                 }}
//               >
//                 Telehealth
//               </Button>
//             </div>
//           </div>

//           {/* Cards Grid - 3 columns */}
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
//             {paginatedAll.map((appointment) => (
//               <Card
//                 key={appointment.id}
//                 className="cursor-pointer rounded-xl border border-gray-200 transition hover:border-primary/50 hover:shadow-md"
//                 onClick={() => {
//                   try {
//                     // ✅ Proper encoding
//                     const dataString = encodeURIComponent(
//                       JSON.stringify(appointment)
//                     )
//                     router.push(
//                       `/appointments/${appointment.id}?data=${dataString}`
//                     )
//                   } catch (error) {
//                     console.error("Error encoding data:", error)
//                     // Fallback - just go to ID
//                     router.push(`/appointments/${appointment.id}`)
//                   }
//                 }}
//               >
//                 <CardContent className="p-5">
//                   {/* Header */}
//                   <div className="mb-4 flex items-start justify-between">
//                     {/* Avatar + Info */}
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={appointment.avatar || "/placeholder-avatar.png"}
//                         className="h-10 w-10 rounded-full object-cover"
//                         alt={appointment.patient}
//                       />
//                       <div>
//                         <h3 className="font-semibold text-primary">
//                           {appointment.patient}
//                         </h3>
//                         <p className="text-sm text-muted-foreground">
//                           {appointment.age} years, {appointment.gender}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Badge - Prevent card click when clicking badge */}
//                     <span
//                       className={`rounded-full px-3 py-1 text-xs font-medium ${
//                         appointment.type === "video" ||
//                         appointment.type === "phone"
//                           ? "bg-primary text-white"
//                           : "bg-gray-100 text-gray-700"
//                       }`}
//                       onClick={(e) => e.stopPropagation()} // ✅ Prevent card click
//                     >
//                       {appointment.type === "video" ||
//                       appointment.type === "phone"
//                         ? "Telehealth"
//                         : "In-Person"}
//                     </span>
//                   </div>

//                   {/* Date + Time */}
//                   <div className="mb-4 space-y-1 text-sm text-gray-600">
//                     <div className="flex items-center gap-2">
//                       <Calendar className="h-4 w-4" />
//                       {appointment.date}
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Clock className="h-4 w-4" />
//                       {appointment.time}
//                     </div>
//                   </div>

//                   <div className="my-3 border-t border-gray-200"></div>

//                   {/* Complaint */}
//                   <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-gray-700">
//                     <span className="font-medium text-gray-900">
//                       Chief Complaint:
//                     </span>{" "}
//                     {appointment.reason}
//                   </p>

//                   {/* Buttons - Prevent card click when clicking buttons */}
//                   <div
//                     className="flex gap-3"
//                     onClick={(e) => e.stopPropagation()}
//                   >
//                     {" "}
//                     {/* ✅ Prevent card click */}
//                     <Button
//                       size="sm"
//                       className="flex-1 bg-primary text-white"
//                       onClick={(e) => {
//                         e.stopPropagation()
//                         // Add your call now logic here
//                         console.log("Call now:", appointment.patient)
//                       }}
//                     >
//                       Call Now
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       className="flex-1 border-gray-300"
//                       onClick={(e) => {
//                         e.stopPropagation()
//                         // Add your reschedule logic here
//                         console.log("Reschedule:", appointment.patient)
//                       }}
//                     >
//                       Reschedule
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Pagination */}
//           {filteredByType.length > itemsPerPage && (
//             <div className="mt-8">
//               <PaginationControls
//                 currentPage={currentPage}
//                 totalPages={totalAllPages}
//                 onPageChange={setCurrentPage}
//                 totalItems={filteredByType.length}
//               />
//             </div>
//           )}
//         </TabsContent>

//         {/* Today */}
//         <TabsContent value="today" className="mt-6 space-y-4">
//           {todayAppointments.length === 0 ? (
//             <Card className="border-border">
//               <CardContent className="flex flex-col items-center justify-center py-12 text-center">
//                 <Calendar className="mb-3 h-12 w-12 text-muted-foreground/40" />
//                 <p className="mb-1 font-medium">No appointments for today</p>
//                 <p className="text-sm text-muted-foreground">
//                   Your schedule is clear
//                 </p>
//               </CardContent>
//             </Card>
//           ) : (
//             todayAppointments.map((appointment) => (
//               <Card
//                 key={appointment.id}
//                 className="border-border transition-colors hover:border-primary/20"
//               >
//                 <CardContent className="pt-6">
//                   <div className="flex flex-col gap-4 md:flex-row md:items-center">
//                     <div className="flex flex-1 items-center gap-4">
//                       <Avatar className="h-12 w-12">
//                         <AvatarImage
//                           src={appointment.avatar}
//                           alt={appointment.patient}
//                         />
//                         <AvatarFallback className="bg-primary/10 text-primary">
//                           {appointment.patient
//                             .split(" ")
//                             .map((n) => n[0])
//                             .join("")}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div className="flex-1">
//                         <h4 className="mb-1 font-semibold">
//                           {appointment.patient}
//                         </h4>
//                         <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
//                           <span>
//                             {appointment.age}y, {appointment.gender}
//                           </span>
//                           <span>•</span>
//                           <span>{appointment.reason}</span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-6">
//                       <div className="min-w-[120px] text-center">
//                         <div className="flex items-center gap-2 text-sm font-medium">
//                           <Clock className="h-3 w-3" />
//                           <span>{appointment.time}</span>
//                           <span className="text-muted-foreground">
//                             ({appointment.duration})
//                           </span>
//                         </div>
//                       </div>
//                       <div className="flex min-w-[120px] flex-col gap-2">
//                         <div className="flex items-center gap-2">
//                           <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
//                             {getTypeIcon(appointment.type)}
//                           </div>
//                           <span className="text-sm capitalize">
//                             {appointment.type}
//                           </span>
//                         </div>
//                         <Badge className={getStatusColor(appointment.status)}>
//                           {appointment.status}
//                         </Badge>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         {appointment.status === "confirmed" &&
//                           appointment.type === "video" && (
//                             <Button
//                               size="sm"
//                               className="bg-primary hover:bg-primary/90"
//                             >
//                               <Video className="mr-1 h-4 w-4" />
//                               Join
//                             </Button>
//                           )}
//                         <DropdownMenu>
//                           <DropdownMenuTrigger asChild>
//                             <Button variant="ghost" size="icon">
//                               <MoreVertical className="h-4 w-4" />
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent align="end">
//                             <DropdownMenuItem>
//                               <User className="mr-2 h-4 w-4" />
//                               View Patient
//                             </DropdownMenuItem>
//                             <DropdownMenuItem>
//                               <FileText className="mr-2 h-4 w-4" />
//                               View Notes
//                             </DropdownMenuItem>
//                             <DropdownMenuItem>
//                               <Edit className="mr-2 h-4 w-4" />
//                               Edit Appointment
//                             </DropdownMenuItem>
//                             <DropdownMenuSeparator />
//                             <DropdownMenuItem className="text-danger">
//                               <Trash2 className="mr-2 h-4 w-4" />
//                               Cancel Appointment
//                             </DropdownMenuItem>
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       </div>
//                     </div>
//                   </div>
//                   {appointment.notes && (
//                     <div className="mt-4 rounded-lg bg-accent/30 p-3">
//                       <p className="text-sm text-muted-foreground">
//                         <span className="font-medium text-foreground">
//                           Notes:
//                         </span>{" "}
//                         {appointment.notes}
//                       </p>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             ))
//           )}
//         </TabsContent>

//         {/* Upcoming */}
//         <TabsContent value="upcoming" className="mt-6 space-y-4">
//           {upcomingAppointments.length === 0 ? (
//             <Card className="border-border">
//               <CardContent className="flex flex-col items-center justify-center py-12 text-center">
//                 <Calendar className="mb-3 h-12 w-12 text-muted-foreground/40" />
//                 <p className="mb-1 font-medium">No upcoming appointments</p>
//                 <p className="text-sm text-muted-foreground">
//                   Schedule new appointments to get started
//                 </p>
//               </CardContent>
//             </Card>
//           ) : (
//             upcomingAppointments.map((appointment) => (
//               <Card
//                 key={appointment.id}
//                 className="border-border transition-colors hover:border-primary/20"
//               >
//                 <CardContent className="pt-6">
//                   <div className="flex flex-col gap-4 md:flex-row md:items-center">
//                     <div className="flex flex-1 items-center gap-4">
//                       <Avatar className="h-12 w-12">
//                         <AvatarImage
//                           src={appointment.avatar}
//                           alt={appointment.patient}
//                         />
//                         <AvatarFallback className="bg-primary/10 text-primary">
//                           {appointment.patient
//                             .split(" ")
//                             .map((n) => n[0])
//                             .join("")}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div className="flex-1">
//                         <h4 className="mb-1 font-semibold">
//                           {appointment.patient}
//                         </h4>
//                         <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
//                           <span>
//                             {appointment.age}y, {appointment.gender}
//                           </span>
//                           <span>•</span>
//                           <span>{appointment.reason}</span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-6">
//                       <div className="min-w-[120px] text-center">
//                         <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
//                           <Calendar className="h-3 w-3" />
//                           <span>{appointment.date}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm font-medium">
//                           <Clock className="h-3 w-3" />
//                           <span>{appointment.time}</span>
//                           <span className="text-muted-foreground">
//                             ({appointment.duration})
//                           </span>
//                         </div>
//                       </div>
//                       <div className="flex min-w-[120px] flex-col gap-2">
//                         <div className="flex items-center gap-2">
//                           <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
//                             {getTypeIcon(appointment.type)}
//                           </div>
//                           <span className="text-sm capitalize">
//                             {appointment.type}
//                           </span>
//                         </div>
//                         <Badge className={getStatusColor(appointment.status)}>
//                           {appointment.status}
//                         </Badge>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         {appointment.status === "pending" && (
//                           <div className="flex gap-2">
//                             <Button
//                               size="sm"
//                               variant="outline"
//                               className="text-success border-success hover:bg-success/10"
//                             >
//                               <CheckCircle className="mr-1 h-4 w-4" />
//                               Confirm
//                             </Button>
//                           </div>
//                         )}
//                         <DropdownMenu>
//                           <DropdownMenuTrigger asChild>
//                             <Button variant="ghost" size="icon">
//                               <MoreVertical className="h-4 w-4" />
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent align="end">
//                             <DropdownMenuItem>
//                               <User className="mr-2 h-4 w-4" />
//                               View Patient
//                             </DropdownMenuItem>
//                             <DropdownMenuItem>
//                               <FileText className="mr-2 h-4 w-4" />
//                               View Notes
//                             </DropdownMenuItem>
//                             <DropdownMenuItem>
//                               <Edit className="mr-2 h-4 w-4" />
//                               Edit Appointment
//                             </DropdownMenuItem>
//                             <DropdownMenuSeparator />
//                             <DropdownMenuItem className="text-danger">
//                               <Trash2 className="mr-2 h-4 w-4" />
//                               Cancel Appointment
//                             </DropdownMenuItem>
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))
//           )}
//         </TabsContent>

//         {/* Past - WITH PAGINATION */}
//         <TabsContent value="past" className="mt-6 space-y-4">
//           {pastAppointments.length === 0 ? (
//             <Card className="border-border">
//               <CardContent className="flex flex-col items-center justify-center py-12 text-center">
//                 <Calendar className="mb-3 h-12 w-12 text-muted-foreground/40" />
//                 <p className="mb-1 font-medium">No past appointments</p>
//                 <p className="text-sm text-muted-foreground">
//                   Past appointments will appear here
//                 </p>
//               </CardContent>
//             </Card>
//           ) : (
//             <>
//               {paginatedPast.map((appointment) => (
//                 <Card key={appointment.id} className="border-border opacity-75">
//                   <CardContent className="pt-6">
//                     <div className="flex flex-col gap-4 md:flex-row md:items-center">
//                       <div className="flex flex-1 items-center gap-4">
//                         <Avatar className="h-12 w-12">
//                           <AvatarImage
//                             src={appointment.avatar}
//                             alt={appointment.patient}
//                           />
//                           <AvatarFallback className="bg-primary/10 text-primary">
//                             {appointment.patient
//                               .split(" ")
//                               .map((n) => n[0])
//                               .join("")}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div className="flex-1">
//                           <h4 className="mb-1 font-semibold">
//                             {appointment.patient}
//                           </h4>
//                           <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
//                             <span>
//                               {appointment.age}y, {appointment.gender}
//                             </span>
//                             <span>•</span>
//                             <span>{appointment.reason}</span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-6">
//                         <div className="min-w-[120px] text-center">
//                           <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
//                             <Calendar className="h-3 w-3" />
//                             <span>{appointment.date}</span>
//                           </div>
//                           <div className="flex items-center gap-2 text-sm font-medium">
//                             <Clock className="h-3 w-3" />
//                             <span>{appointment.time}</span>
//                           </div>
//                         </div>
//                         <div className="flex min-w-[120px] flex-col gap-2">
//                           <div className="flex items-center gap-2">
//                             <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
//                               {getTypeIcon(appointment.type)}
//                             </div>
//                             <span className="text-sm capitalize">
//                               {appointment.type}
//                             </span>
//                           </div>
//                           <Badge className={getStatusColor(appointment.status)}>
//                             {appointment.status}
//                           </Badge>
//                         </div>
//                         <DropdownMenu>
//                           <DropdownMenuTrigger asChild>
//                             <Button variant="ghost" size="icon">
//                               <MoreVertical className="h-4 w-4" />
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent align="end">
//                             <DropdownMenuItem>
//                               <User className="mr-2 h-4 w-4" />
//                               View Patient
//                             </DropdownMenuItem>
//                             <DropdownMenuItem>
//                               <FileText className="mr-2 h-4 w-4" />
//                               View Notes
//                             </DropdownMenuItem>
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}

//               {/* Pagination for Past Appointments */}
//               <PaginationControls
//                 currentPage={pastPage}
//                 totalPages={totalPastPages}
//                 onPageChange={setPastPage}
//                 totalItems={pastAppointments.length}
//               />
//             </>
//           )}
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

"use client"

import { Suspense, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Calendar,
  Clock,
  Video,
  Phone,
  MapPin,
  Search,
  Filter,
  Plus,
  MoreVertical,
  CheckCircle,
  Trash2,
  FileText,
  User,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Edit,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Medication {
  name: string
  dosage: string
  frequency: string
  prescribed: string
}

interface Vitals {
  bloodPressure: string
  heartRate: string
  temperature: string
  respiratoryRate: string
  oxygenSaturation?: string
  weight?: string
  height?: string
  bmi?: string
}

interface LabResult {
  name: string
  date: string
  status: string
  notes?: string
}

interface AppointmentHistory {
  date: string
  type: string
  doctor: string
}

interface Appointment {
  id: number
  patient: string
  avatar: string
  age: number
  gender: string
  date: string
  time: string
  duration: string
  type: string
  reason: string
  status: string
  notes?: string
  email?: string
  phone?: string
  emergencyContact?: string
  address?: string
  chiefComplaint?: string
  medicalHistory?: string
  medications?: Medication[]
  vitals?: Vitals
  labResults?: LabResult[]
  appointments?: AppointmentHistory[]
}

export default function AppointmentsPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading appointments...</div>}>
      <AppointmentsClient />
    </Suspense>
  )
}

function AppointmentsClient() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [pastPage, setPastPage] = useState(1)
  const itemsPerPage = 9

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const appointments: Appointment[] = [
    // keep your full appointments array here exactly as it is
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-success/10 text-success hover:bg-success/20"
      case "pending":
        return "bg-warning/10 text-warning hover:bg-warning/20"
      case "completed":
        return "bg-info/10 text-info hover:bg-info/20"
      case "cancelled":
        return "bg-danger/10 text-danger hover:bg-danger/20"
      default:
        return "bg-primary/10 text-primary hover:bg-primary/20"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "phone":
        return <Phone className="h-4 w-4" />
      case "in-person":
        return <MapPin className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.reason.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      selectedFilter === "all" || apt.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  const upcomingAppointments = filteredAppointments.filter(
    (apt) => apt.status === "confirmed" || apt.status === "pending"
  )

  const pastAppointments = filteredAppointments.filter(
    (apt) => apt.status === "completed" || apt.status === "cancelled"
  )

  const todayAppointments = filteredAppointments.filter(
    (apt) =>
      apt.date === "March 11, 2026" &&
      (apt.status === "confirmed" || apt.status === "pending")
  )

  const getFilteredAppointments = () => {
    let filtered = filteredAppointments

    if (selectedType === "in-person") {
      filtered = filtered.filter((apt) => apt.type === "in-person")
    } else if (selectedType === "telehealth") {
      filtered = filtered.filter(
        (apt) => apt.type === "video" || apt.type === "phone"
      )
    }

    return filtered
  }

  const filteredByType = getFilteredAppointments()
  const totalAllPages = Math.ceil(filteredByType.length / itemsPerPage)
  const totalPastPages = Math.ceil(pastAppointments.length / itemsPerPage)

  const paginatedAll = filteredByType.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const paginatedPast = pastAppointments.slice(
    (pastPage - 1) * itemsPerPage,
    pastPage * itemsPerPage
  )

  const PaginationControls = ({
    currentPage,
    totalPages,
    onPageChange,
    totalItems,
  }: {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    totalItems: number
  }) => {
    if (totalPages <= 1) return null

    return (
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium">
            {(currentPage - 1) * itemsPerPage + 1}
          </span>{" "}
          to{" "}
          <span className="font-medium">
            {Math.min(currentPage * itemsPerPage, totalItems)}
          </span>{" "}
          of <span className="font-medium">{totalItems}</span> results
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="h-8 w-8"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="min-w-[80px] text-center text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="h-8 w-8"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="mb-2 text-primary">Appointments</h1>
          <p className="text-muted-foreground">
            Manage all patient appointments
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Appointment</DialogTitle>
              <DialogDescription>
                Schedule a new appointment for a patient
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="patient">Patient Name</Label>
                  <Input id="patient" placeholder="Search patient..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apt-type">Appointment Type</Label>
                  <Select>
                    <SelectTrigger id="apt-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video Consultation</SelectItem>
                      <SelectItem value="phone">Phone Call</SelectItem>
                      <SelectItem value="in-person">In-Person Visit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Select>
                  <SelectTrigger id="duration">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Visit</Label>
                <Input id="reason" placeholder="e.g., Follow-up consultation" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any additional notes..."
                  rows={3}
                  className="resize-none"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button className="bg-primary hover:bg-primary/90">
                Schedule Appointment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      {/* <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div> */}

      {/* Filters */}
      <Card className="border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by patient name or reason..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="all">All Appointments</TabsTrigger>
        </TabsList>

        {/* All Appointments Tab */}
        <TabsContent value="all" className="mt-6 space-y-6">
          {/* Add useRouter at top of component */}
          {/* const router = useRouter(); */}
          {/* Filter Pills Container */}
          <div className="mb-6 flex items-center justify-end">
            <div className="inline-flex items-center rounded-full bg-muted p-1">
              <Button
                size="sm"
                className={`rounded-full px-4 ${
                  selectedType === "all"
                    ? "bg-white text-foreground shadow"
                    : "bg-transparent text-muted-foreground hover:bg-white/50"
                }`}
                onClick={() => {
                  setSelectedType("all")
                  setCurrentPage(1)
                }}
              >
                All Type
              </Button>

              <Button
                size="sm"
                variant="ghost"
                className={`rounded-full px-4 ${
                  selectedType === "in-person"
                    ? "bg-white text-foreground shadow"
                    : "text-muted-foreground hover:bg-white/50"
                }`}
                onClick={() => {
                  setSelectedType("in-person")
                  setCurrentPage(1)
                }}
              >
                In-Person
              </Button>

              <Button
                size="sm"
                variant="ghost"
                className={`rounded-full px-4 ${
                  selectedType === "telehealth"
                    ? "bg-white text-foreground shadow"
                    : "text-muted-foreground hover:bg-white/50"
                }`}
                onClick={() => {
                  setSelectedType("telehealth")
                  setCurrentPage(1)
                }}
              >
                Telehealth
              </Button>
            </div>
          </div>

          {/* Cards Grid - 3 columns */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {paginatedAll.map((appointment) => (
              <Card
                key={appointment.id}
                className="cursor-pointer rounded-xl border border-gray-200 transition hover:border-primary/50 hover:shadow-md"
                onClick={() => {
                  try {
                    // ✅ Proper encoding
                    const dataString = encodeURIComponent(
                      JSON.stringify(appointment)
                    )
                    router.push(
                      `/appointments/${appointment.id}?data=${dataString}`
                    )
                  } catch (error) {
                    console.error("Error encoding data:", error)
                    // Fallback - just go to ID
                    router.push(`/appointments/${appointment.id}`)
                  }
                }}
              >
                <CardContent className="p-5">
                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between">
                    {/* Avatar + Info */}
                    <div className="flex items-center gap-3">
                      <img
                        src={appointment.avatar || "/placeholder-avatar.png"}
                        className="h-10 w-10 rounded-full object-cover"
                        alt={appointment.patient}
                      />
                      <div>
                        <h3 className="font-semibold text-primary">
                          {appointment.patient}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {appointment.age} years, {appointment.gender}
                        </p>
                      </div>
                    </div>

                    {/* Badge - Prevent card click when clicking badge */}
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        appointment.type === "video" ||
                        appointment.type === "phone"
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                      onClick={(e) => e.stopPropagation()} // ✅ Prevent card click
                    >
                      {appointment.type === "video" ||
                      appointment.type === "phone"
                        ? "Telehealth"
                        : "In-Person"}
                    </span>
                  </div>

                  {/* Date + Time */}
                  <div className="mb-4 space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {appointment.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {appointment.time}
                    </div>
                  </div>

                  <div className="my-3 border-t border-gray-200"></div>

                  {/* Complaint */}
                  <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-gray-700">
                    <span className="font-medium text-gray-900">
                      Chief Complaint:
                    </span>{" "}
                    {appointment.reason}
                  </p>

                  {/* Buttons - Prevent card click when clicking buttons */}
                  <div
                    className="flex gap-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {" "}
                    {/* ✅ Prevent card click */}
                    <Button
                      size="sm"
                      className="flex-1 bg-primary text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        // Add your call now logic here
                        console.log("Call now:", appointment.patient)
                      }}
                    >
                      Call Now
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-gray-300"
                      onClick={(e) => {
                        e.stopPropagation()
                        // Add your reschedule logic here
                        console.log("Reschedule:", appointment.patient)
                      }}
                    >
                      Reschedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {filteredByType.length > itemsPerPage && (
            <div className="mt-8">
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalAllPages}
                onPageChange={setCurrentPage}
                totalItems={filteredByType.length}
              />
            </div>
          )}
        </TabsContent>

        {/* Today */}
        <TabsContent value="today" className="mt-6 space-y-4">
          {todayAppointments.length === 0 ? (
            <Card className="border-border">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Calendar className="mb-3 h-12 w-12 text-muted-foreground/40" />
                <p className="mb-1 font-medium">No appointments for today</p>
                <p className="text-sm text-muted-foreground">
                  Your schedule is clear
                </p>
              </CardContent>
            </Card>
          ) : (
            todayAppointments.map((appointment) => (
              <Card
                key={appointment.id}
                className="border-border transition-colors hover:border-primary/20"
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <div className="flex flex-1 items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={appointment.avatar}
                          alt={appointment.patient}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {appointment.patient
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="mb-1 font-semibold">
                          {appointment.patient}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          <span>
                            {appointment.age}y, {appointment.gender}
                          </span>
                          <span>•</span>
                          <span>{appointment.reason}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="min-w-[120px] text-center">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Clock className="h-3 w-3" />
                          <span>{appointment.time}</span>
                          <span className="text-muted-foreground">
                            ({appointment.duration})
                          </span>
                        </div>
                      </div>
                      <div className="flex min-w-[120px] flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                            {getTypeIcon(appointment.type)}
                          </div>
                          <span className="text-sm capitalize">
                            {appointment.type}
                          </span>
                        </div>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        {appointment.status === "confirmed" &&
                          appointment.type === "video" && (
                            <Button
                              size="sm"
                              className="bg-primary hover:bg-primary/90"
                            >
                              <Video className="mr-1 h-4 w-4" />
                              Join
                            </Button>
                          )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <User className="mr-2 h-4 w-4" />
                              View Patient
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Notes
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Appointment
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-danger">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Cancel Appointment
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                  {appointment.notes && (
                    <div className="mt-4 rounded-lg bg-accent/30 p-3">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">
                          Notes:
                        </span>{" "}
                        {appointment.notes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Upcoming */}
        <TabsContent value="upcoming" className="mt-6 space-y-4">
          {upcomingAppointments.length === 0 ? (
            <Card className="border-border">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Calendar className="mb-3 h-12 w-12 text-muted-foreground/40" />
                <p className="mb-1 font-medium">No upcoming appointments</p>
                <p className="text-sm text-muted-foreground">
                  Schedule new appointments to get started
                </p>
              </CardContent>
            </Card>
          ) : (
            upcomingAppointments.map((appointment) => (
              <Card
                key={appointment.id}
                className="border-border transition-colors hover:border-primary/20"
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <div className="flex flex-1 items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={appointment.avatar}
                          alt={appointment.patient}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {appointment.patient
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="mb-1 font-semibold">
                          {appointment.patient}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          <span>
                            {appointment.age}y, {appointment.gender}
                          </span>
                          <span>•</span>
                          <span>{appointment.reason}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="min-w-[120px] text-center">
                        <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Clock className="h-3 w-3" />
                          <span>{appointment.time}</span>
                          <span className="text-muted-foreground">
                            ({appointment.duration})
                          </span>
                        </div>
                      </div>
                      <div className="flex min-w-[120px] flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                            {getTypeIcon(appointment.type)}
                          </div>
                          <span className="text-sm capitalize">
                            {appointment.type}
                          </span>
                        </div>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        {appointment.status === "pending" && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-success border-success hover:bg-success/10"
                            >
                              <CheckCircle className="mr-1 h-4 w-4" />
                              Confirm
                            </Button>
                          </div>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <User className="mr-2 h-4 w-4" />
                              View Patient
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Notes
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Appointment
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-danger">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Cancel Appointment
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Past - WITH PAGINATION */}
        <TabsContent value="past" className="mt-6 space-y-4">
          {pastAppointments.length === 0 ? (
            <Card className="border-border">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Calendar className="mb-3 h-12 w-12 text-muted-foreground/40" />
                <p className="mb-1 font-medium">No past appointments</p>
                <p className="text-sm text-muted-foreground">
                  Past appointments will appear here
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {paginatedPast.map((appointment) => (
                <Card key={appointment.id} className="border-border opacity-75">
                  <CardContent className="pt-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                      <div className="flex flex-1 items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={appointment.avatar}
                            alt={appointment.patient}
                          />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {appointment.patient
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="mb-1 font-semibold">
                            {appointment.patient}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                            <span>
                              {appointment.age}y, {appointment.gender}
                            </span>
                            <span>•</span>
                            <span>{appointment.reason}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="min-w-[120px] text-center">
                          <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <Clock className="h-3 w-3" />
                            <span>{appointment.time}</span>
                          </div>
                        </div>
                        <div className="flex min-w-[120px] flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                              {getTypeIcon(appointment.type)}
                            </div>
                            <span className="text-sm capitalize">
                              {appointment.type}
                            </span>
                          </div>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <User className="mr-2 h-4 w-4" />
                              View Patient
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Notes
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Pagination for Past Appointments */}
              <PaginationControls
                currentPage={pastPage}
                totalPages={totalPastPages}
                onPageChange={setPastPage}
                totalItems={pastAppointments.length}
              />
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
