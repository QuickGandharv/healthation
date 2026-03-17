// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Card, CardContent } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "lucide-react";

// // import { appointments } from "../_data/appointments-data";
// import { Appointment } from "@/types/doctor/appointment";

// import AppointmentCard from "@/components/doctor/appointment/AppointmentCard";
// // import PaginationControls from "./PaginationControls";
// // import AppointmentFilters from "./AppointmentFilters";
// import NewAppointmentDialog from "@/components/doctor/appointment/NewAppointmentDialog";

// export default function AppointmentsContent({ today, upcoming, past }: { today: Appointment[]; upcoming: Appointment[]; past: Appointment[] }) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedFilter, setSelectedFilter] = useState("all");
//   const [selectedType, setSelectedType] = useState("all");
//   const [activeTab, setActiveTab] = useState("today");

//   const [currentPage, setCurrentPage] = useState(1);
//   const [pastPage, setPastPage] = useState(1);
//   const [todayPage, setTodayPage] = useState(1);
//   const [upcomingPage, setUpcomingPage] = useState(1);

//   const itemsPerPage = 9;

//   useEffect(() => {
//     const tab = searchParams.get("tab");
//     if (tab) setActiveTab(tab);
//   }, [searchParams]);

//   const filteredAppointments = appointments.filter((apt: Appointment) => {
//     const matchesSearch =
//       apt.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       apt.reason.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesFilter =
//       selectedFilter === "all" || apt.status === selectedFilter;

//     return matchesSearch && matchesFilter;
//   });

//   const upcomingAppointments = filteredAppointments.filter(
//     (apt) => apt.status === "confirmed" || apt.status === "pending"
//   );

//   const pastAppointments = filteredAppointments.filter(
//     (apt) => apt.status === "completed" || apt.status === "cancelled"
//   );

//   const todayAppointments = filteredAppointments.filter(
//     (apt) =>
//       apt.date === "March 11, 2026" &&
//       (apt.status === "confirmed" || apt.status === "pending")
//   );

//   const filteredByType = filteredAppointments.filter((apt) => {
//     if (selectedType === "in-person") return apt.type === "in-person";
//     if (selectedType === "telehealth") {
//       return apt.type === "video" || apt.type === "phone";
//     }
//     return true;
//   });

//   const totalAllPages = Math.ceil(filteredByType.length / itemsPerPage);
//   const totalPastPages = Math.ceil(pastAppointments.length / itemsPerPage);
//   const totalTodayPages = Math.ceil(todayAppointments.length / itemsPerPage);
//   const totalUpcomingPages = Math.ceil(upcomingAppointments.length / itemsPerPage);

//   const paginatedAll = filteredByType.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const paginatedPast = pastAppointments.slice(
//     (pastPage - 1) * itemsPerPage,
//     pastPage * itemsPerPage
//   );

//   const paginatedToday = todayAppointments.slice(
//     (todayPage - 1) * itemsPerPage,
//     todayPage * itemsPerPage
//   );

//   const paginatedUpcoming = upcomingAppointments.slice(
//     (upcomingPage - 1) * itemsPerPage,
//     upcomingPage * itemsPerPage
//   );

//   const renderEmptyState = (title: string, subtitle: string) => (
//     <Card className="border-border">
//       <CardContent className="flex flex-col items-center justify-center py-12 text-center">
//         <Calendar className="mb-3 h-12 w-12 text-muted-foreground/40" />
//         <p className="mb-1 font-medium">{title}</p>
//         <p className="text-sm text-muted-foreground">{subtitle}</p>
//       </CardContent>
//     </Card>
//   );

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//         <div>
//           <h1 className="mb-2 text-primary">Appointments</h1>
//           <p className="text-muted-foreground">
//             Manage all patient appointments
//           </p>
//         </div>

//         <NewAppointmentDialog />
//       </div>

//       <AppointmentFilters
//         searchQuery={searchQuery}
//         selectedFilter={selectedFilter}
//         setSearchQuery={setSearchQuery}
//         setSelectedFilter={setSelectedFilter}
//       />

//       <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//         <TabsList>
//           <TabsTrigger value="past">Past</TabsTrigger>
//           <TabsTrigger value="today">Today</TabsTrigger>
//           <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
//           <TabsTrigger value="all">All Appointments</TabsTrigger>
//         </TabsList>

//         <TabsContent value="all" className="mt-6 space-y-6">
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
//                   setSelectedType("all");
//                   setCurrentPage(1);
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
//                   setSelectedType("in-person");
//                   setCurrentPage(1);
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
//                   setSelectedType("telehealth");
//                   setCurrentPage(1);
//                 }}
//               >
//                 Video
//               </Button>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
//             {paginatedAll.map((appointment) => (
//               <AppointmentCard
//                 key={appointment.id}
//                 appointment={appointment}
//                 variant="all"
//                 onCardClick={() => {
//                   try {
//                     const dataString = encodeURIComponent(
//                       JSON.stringify(appointment)
//                     );
//                     router.push(`/appointments/${appointment.id}?data=${dataString}`);
//                   } catch (error) {
//                     console.error("Error encoding data:", error);
//                     router.push(`/appointments/${appointment.id}`);
//                   }
//                 }}
//               />
//             ))}
//           </div>

//           <PaginationControls
//             currentPage={currentPage}
//             totalPages={totalAllPages}
//             totalItems={filteredByType.length}
//             itemsPerPage={itemsPerPage}
//             onPageChange={setCurrentPage}
//           />
//         </TabsContent>

//         <TabsContent value="today" className="mt-6 space-y-6">
//           {todayAppointments.length === 0 ? (
//             renderEmptyState("No appointments for today", "Your schedule is clear")
//           ) : (
//             <>
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
//                 {paginatedToday.map((appointment) => (
//                   <AppointmentCard
//                     key={appointment.id}
//                     appointment={appointment}
//                     variant="today"
//                   />
//                 ))}
//               </div>

//               <PaginationControls
//                 currentPage={todayPage}
//                 totalPages={totalTodayPages}
//                 totalItems={todayAppointments.length}
//                 itemsPerPage={itemsPerPage}
//                 onPageChange={setTodayPage}
//               />
//             </>
//           )}
//         </TabsContent>

//         <TabsContent value="upcoming" className="mt-6 space-y-6">
//           {upcomingAppointments.length === 0 ? (
//             renderEmptyState(
//               "No upcoming appointments",
//               "Schedule new appointments to get started"
//             )
//           ) : (
//             <>
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
//                 {paginatedUpcoming.map((appointment) => (
//                   <AppointmentCard
//                     key={appointment.id}
//                     appointment={appointment}
//                     variant="upcoming"
//                   />
//                 ))}
//               </div>

//               <PaginationControls
//                 currentPage={upcomingPage}
//                 totalPages={totalUpcomingPages}
//                 totalItems={upcomingAppointments.length}
//                 itemsPerPage={itemsPerPage}
//                 onPageChange={setUpcomingPage}
//               />
//             </>
//           )}
//         </TabsContent>

//         <TabsContent value="past" className="mt-6 space-y-6">
//           {pastAppointments.length === 0 ? (
//             renderEmptyState(
//               "No past appointments",
//               "Past appointments will appear here"
//             )
//           ) : (
//             <>
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
//                 {paginatedPast.map((appointment) => (
//                   <AppointmentCard
//                     key={appointment.id}
//                     appointment={appointment}
//                     variant="past"
//                   />
//                 ))}
//               </div>

//               <PaginationControls
//                 currentPage={pastPage}
//                 totalPages={totalPastPages}
//                 totalItems={pastAppointments.length}
//                 itemsPerPage={itemsPerPage}
//                 onPageChange={setPastPage}
//               />
//             </>
//           )}
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

import { Appointment } from "@/types/doctor/appointment"

import AppointmentCard from "@/components/doctor/appointment/AppointmentCard"
import PaginationControls from "@/components/doctor/appointment/PaginationControls"
import AppointmentFilters from "@/components/doctor/appointment/AppointmentFilters"
import NewAppointmentDialog from "@/components/doctor/appointment/NewAppointmentDialog"

interface AppointmentsContentProps {
  today: Appointment[]
  upcoming: Appointment[]
  past: Appointment[]
}

export default function AppointmentsContent({
  today,
  upcoming,
  past,
}: AppointmentsContentProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [activeTab, setActiveTab] = useState("today")

  const [currentPage, setCurrentPage] = useState(1)
  const [pastPage, setPastPage] = useState(1)
  const [todayPage, setTodayPage] = useState(1)
  const [upcomingPage, setUpcomingPage] = useState(1)

  const itemsPerPage = 9

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const allAppointments = useMemo(() => {
    return [...today, ...upcoming, ...past]
  }, [today, upcoming, past])

  const applySearchAndStatusFilter = (appointmentsList: Appointment[]) => {
    return appointmentsList.filter((apt) => {
      const matchesSearch =
        (typeof apt.patient === "string" ? apt.patient.toLowerCase() : (apt.patient as any)?.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (apt.reason?.toLowerCase() || "").includes(searchQuery.toLowerCase())

      const matchesFilter =
        selectedFilter === "all" || apt.status === selectedFilter

      return matchesSearch && matchesFilter
    })
  }

  const applyTypeFilter = (appointmentsList: Appointment[]) => {
    return appointmentsList.filter((apt) => {
      if (selectedType === "in-person") return apt.type === "in-person"
      if (selectedType === "telehealth") {
        return apt.type === "video" || apt.type === "phone"
      }
      return true
    })
  }

  const filteredAllAppointments = applyTypeFilter(
    applySearchAndStatusFilter(allAppointments)
  )

  const filteredTodayAppointments = applySearchAndStatusFilter(today)
  const filteredUpcomingAppointments = applySearchAndStatusFilter(upcoming)
  const filteredPastAppointments = applySearchAndStatusFilter(past)

  const totalAllPages = Math.ceil(filteredAllAppointments.length / itemsPerPage)
  const totalTodayPages = Math.ceil(
    filteredTodayAppointments.length / itemsPerPage
  )
  const totalUpcomingPages = Math.ceil(
    filteredUpcomingAppointments.length / itemsPerPage
  )
  const totalPastPages = Math.ceil(
    filteredPastAppointments.length / itemsPerPage
  )

  const paginatedAll = filteredAllAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const paginatedToday = filteredTodayAppointments.slice(
    (todayPage - 1) * itemsPerPage,
    todayPage * itemsPerPage
  )

  const paginatedUpcoming = filteredUpcomingAppointments.slice(
    (upcomingPage - 1) * itemsPerPage,
    upcomingPage * itemsPerPage
  )

  const paginatedPast = filteredPastAppointments.slice(
    (pastPage - 1) * itemsPerPage,
    pastPage * itemsPerPage
  )

  const renderEmptyState = (title: string, subtitle: string) => (
    <Card className="border-border">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <Calendar className="mb-3 h-12 w-12 text-muted-foreground/40" />
        <p className="mb-1 font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  )


  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="mb-2 text-primary">Appointments</h1>
          <p className="text-muted-foreground">
            Manage all patient appointments
          </p>
        </div>

        <NewAppointmentDialog />
      </div>

      <AppointmentFilters
        searchQuery={searchQuery}
        selectedFilter={selectedFilter}
        setSearchQuery={setSearchQuery}
        setSelectedFilter={setSelectedFilter}
      />

      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value)
          if (value === "all") setCurrentPage(1)
          if (value === "today") setTodayPage(1)
          if (value === "upcoming") setUpcomingPage(1)
          if (value === "past") setPastPage(1)
        }}
        className="w-full"
      >
        <TabsList>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="all">All Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6 space-y-6">
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
                Video
              </Button>
            </div>
          </div>

          {filteredAllAppointments.length === 0 ? (
            renderEmptyState(
              "No appointments found",
              "Try adjusting your search or filter"
            )
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {paginatedAll.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    variant="all"
                    onCardClick={() => {
                      try {
                        const id = appointment.id || (appointment as any)._id || (appointment as any).appointment_id;
                        sessionStorage.setItem(`appointment_${id}`, JSON.stringify(appointment));
                        router.push(`/doctor/appointments/${id}`)
                      } catch (error) {
                        console.error("Error setting session storage:", error)
                        const id = appointment.id || (appointment as any)._id || (appointment as any).appointment_id;
                        router.push(`/doctor/appointments/${id}`)
                      }
                    }}
                  />
                ))}
              </div>

              <PaginationControls
                currentPage={currentPage}
                totalPages={totalAllPages}
                totalItems={filteredAllAppointments.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </TabsContent>

        <TabsContent value="today" className="mt-6 space-y-6">
          {filteredTodayAppointments.length === 0 ? (
            renderEmptyState(
              "No appointments for today",
              "Your schedule is clear"
            )
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {paginatedToday.map((appointment, index) => (
                  <AppointmentCard
                    key={appointment.id || (appointment as any)._id || index}
                    appointment={appointment}
                    variant="today"
                  />
                ))}
              </div>

              <PaginationControls
                currentPage={todayPage}
                totalPages={totalTodayPages}
                totalItems={filteredTodayAppointments.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setTodayPage}
              />
            </>
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6 space-y-6">
          {filteredUpcomingAppointments.length === 0 ? (
            renderEmptyState(
              "No upcoming appointments",
              "Schedule new appointments to get started"
            )
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {paginatedUpcoming.map((appointment, index) => (
                  <AppointmentCard
                    key={appointment.id || (appointment as any)._id || index}
                    appointment={appointment}
                    variant="upcoming"
                  />
                ))}
              </div>

              <PaginationControls
                currentPage={upcomingPage}
                totalPages={totalUpcomingPages}
                totalItems={filteredUpcomingAppointments.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setUpcomingPage}
              />
            </>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-6 space-y-6">
          {filteredPastAppointments.length === 0 ? (
            renderEmptyState(
              "No past appointments",
              "Past appointments will appear here"
            )
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {paginatedPast.map((appointment, index) => (
                  <AppointmentCard
                    key={appointment.id || (appointment as any)._id || index}
                    appointment={appointment}
                    variant="past"
                  />
                ))}
              </div>

              <PaginationControls
                currentPage={pastPage}
                totalPages={totalPastPages}
                totalItems={filteredPastAppointments.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setPastPage}
              />
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
