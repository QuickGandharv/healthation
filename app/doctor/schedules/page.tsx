"use client"

import { useMemo, useState } from "react"
import { TabsContent } from "@/components/ui/tabs"
import { useScheduleData } from "@/app/(app)/schedules/hooks/useScheduleData"
import { ScheduleHeader } from "@/components/schedules/ScheduleHeader"
import { ScheduleTabs } from "@/components/schedules/ScheduleTabs"
import { DayView } from "@/components/schedules/DayView"
import { WeekView } from "@/components/schedules/WeekView"
import { MonthView } from "@/components/schedules/MonthView"
import { DayScheduleDialog } from "@/app/(app)/schedules/dialogs/DayScheduleDialog"
import { AppointmentsDialog } from "@/app/(app)/schedules/dialogs/AppointmentsDialog"
import { getMyAllAppointments } from "@/queries/doctor/getAllAppointments"

export const filterAppointmentsByDate = (
  appointments: any[],
  selectedDate?: Date
) => {
  if (!selectedDate) return [];

  const formattedDate = selectedDate.toLocaleDateString("en-CA"); 
  // ✅ gives YYYY-MM-DD in LOCAL timezone

  return appointments.filter(
    (apt) => apt.appointment_date === formattedDate
  );
};

export default function Schedules() {

  const [isDayDialogOpen, setIsDayDialogOpen] = useState(false)
  const [isAppointmentsDialogOpen, setIsAppointmentsDialogOpen] = useState(false)
  const {
    currentDate,
    selectedDate,
    selectedSchedule,
    selectedDaySlots,
    selectedSlotForAppointments,
    selectedMonthSlot,
    isLoadingDay,
    isLoadingWeek,
    isLoadingMonth,
    dayError,
    weekError,
    monthError,
    dayDoctorSchedules,
    schedulesByDay,
    weekDays,
    monthTotal,
    appointmentDays,
    peakDayValue,
    setCurrentDate,
    setSelectedSchedule,
    setSelectedDaySlots,
    setSelectedSlotForAppointments,
    setSelectedMonthSlot,
    navigateDay,
    navigateWeek,
    formatDayHeader,
    formatWeekRange,
    handleDateClick,
    handleSlotAppointmentsClick,
    getOPDSlotsForDate,
    getOPDCount,
    hasAppointments,
    isToday,
    getPatientsForSelectedSlot,
  } = useScheduleData()

  const { data: appointmentData } = getMyAllAppointments();

  console.log('data', appointmentData);

  const filteredAppointments = useMemo(() => {
    return filterAppointmentsByDate(
      appointmentData?.data || [],
      selectedDate
    );
  }, [appointmentData, selectedDate]);

  const isTodayWeek = useMemo(() => {
    const today = new Date()
    const todayDay = today.toLocaleDateString("en-US", { weekday: "short" })
    const todayDate = today.toLocaleDateString("en-US", { day: "numeric", month: "short" })
    return (day: string, date: string) => day === todayDay && date === todayDate
  }, [])

  return (
    <div className="space-y-6">
      <ScheduleHeader
        title="Doctor's Schedule"
        description="Manage your OPD appointments and availability"
        onNewAppointment={() => {}}
      />

      <ScheduleTabs defaultValue="month">
        <TabsContent value="day">
          <DayView
            dayDoctorSchedules={dayDoctorSchedules}
            formatDayHeader={formatDayHeader}
            onPrevDay={() => navigateDay("prev")}
            onNextDay={() => navigateDay("next")}
            onScheduleClick={(schedule) => {
              setSelectedSchedule(schedule)
              setIsAppointmentsDialogOpen(true)
            }}
            isLoading={isLoadingDay}
            error={dayError}
          />
        </TabsContent>

        <TabsContent value="week">
          <WeekView
            weekDays={weekDays}
            schedulesByDay={schedulesByDay}
            formatWeekRange={formatWeekRange}
            onPrevWeek={() => navigateWeek("prev")}
            onNextWeek={() => navigateWeek("next")}
            onScheduleClick={(schedule) => {
              setSelectedSchedule(schedule)
              setIsAppointmentsDialogOpen(true)
            }}
            isToday={isTodayWeek}
            isLoading={isLoadingWeek}
            error={weekError}
          />
        </TabsContent>

        <TabsContent value="month">
          <MonthView
            currentDate={currentDate}
            selectedDate={selectedDate}
            selectedMonthSlot={selectedMonthSlot}
            monthTotal={monthTotal}
            appointmentDays={appointmentDays}
            peakDayValue={peakDayValue}
            isLoading={isLoadingMonth}
            isLoadingDay={isLoadingDay}
            onMonthChange={(date) => setCurrentDate(date)}
            onDateClick={(date) => handleDateClick(date)}
            onSlotClick={(slot) => setSelectedMonthSlot(slot)}
            onViewAllSlots={(slots) => {
              setSelectedDaySlots(slots)
              setIsDayDialogOpen(true)
            }}
            onViewAllPatients={(slot) => {
              handleSlotAppointmentsClick(slot)
              setIsAppointmentsDialogOpen(true)
            }}
            getOPDSlotsForDate={getOPDSlotsForDate}
            getOPDCount={getOPDCount}
            hasAppointments={hasAppointments}
            isToday={isToday}
            getPatientsForSelectedSlot={getPatientsForSelectedSlot}
          />
        </TabsContent>
      </ScheduleTabs>

      <DayScheduleDialog
        open={isDayDialogOpen}
        onOpenChange={setIsDayDialogOpen}
        selectedDate={selectedDate}
        slots={selectedDaySlots}
        onSlotClick={(slot) => {
          setSelectedMonthSlot(slot)
          handleSlotAppointmentsClick(slot)
          setIsAppointmentsDialogOpen(true)
        }}
      />

      <AppointmentsDialog
        open={isAppointmentsDialogOpen}
        onOpenChange={setIsAppointmentsDialogOpen}
        selectedDate={selectedDate}
        slot={selectedSlotForAppointments}
        schedule={selectedSchedule}
        patientAppointments={filteredAppointments}
      />

      {(monthError || weekError || dayError) && (
        <div className="text-sm text-red-500">
          {monthError || weekError || dayError}
        </div>
      )}
    </div>
  )
}