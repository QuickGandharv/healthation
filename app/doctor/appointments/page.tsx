"use client"

import { Suspense } from "react"
import AppointmentsContent from "@/components/doctor/appointment/AppointmentsContent"
import AppointmentsLoading from "@/components/doctor/appointment/AppointmentsLoading"
import { useAuth } from "@/context/AuthContext"
import { useAppointments } from "@/queries/doctor/useAppointments"

export default function Appointments() {
  const { token } = useAuth()
  const todayQuery = useAppointments("today", token!)
  const upcomingQuery = useAppointments("upcoming", token!)
  const pastQuery = useAppointments("past", token!)
  const isLoading =
    todayQuery.isLoading || upcomingQuery.isLoading || pastQuery.isLoading
  const isError =
    todayQuery.isError || upcomingQuery.isError || pastQuery.isError


    if (isLoading) return <p>Loading appointments...</p>;

    if (isError) {
        return (
            <div className="flex-1 items-center justify-center">
                <p className="text-red-500">Failed to load appointments</p>
            </div>
        );
    }

    console.log("Today Appointments:", todayQuery.data);
    console.log("Upcoming Appointments:", upcomingQuery.data);
    console.log("Past Appointments:", pastQuery.data);

  return (
    <Suspense fallback={<AppointmentsLoading />}>
      <AppointmentsContent today={todayQuery.data || []} upcoming={upcomingQuery.data || []} past={pastQuery.data || []} />
    </Suspense>
  )
}
