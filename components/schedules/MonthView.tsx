import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, CalendarIcon, Stethoscope, Users, Loader2 } from "lucide-react";
import { OPDSlot, PatientAppointment } from "@/app/(app)/schedules/types";
import { ScheduleCard } from "@/components/custom/ScheduleCard";
import { OPDSlotCard } from "@/components/schedules/OPDSlotCard";
import { AppointmentCard } from "@/components/custom/AppointmentCard";
import { MonthStats } from "@/components/schedules/MonthStats";

interface MonthViewProps {
  currentDate: Date;
  selectedDate?: Date;
  selectedMonthSlot: OPDSlot | null;
  monthTotal: number;
  appointmentDays: number[];
  peakDayValue: number;
  isLoading?: boolean;
  isLoadingDay?: boolean;
  onMonthChange: (date: Date) => void;
  onDateClick: (date: Date | undefined) => void;
  onSlotClick: (slot: OPDSlot) => void;
  onViewAllSlots: (slots: OPDSlot[]) => void;
  onViewAllPatients: (slot: OPDSlot) => void;
  getOPDSlotsForDate: (date: Date) => OPDSlot[];
  getOPDCount: (date: Date) => number;
  hasAppointments: (date: Date) => boolean;
  isToday: (date: Date) => boolean;
  getPatientsForSelectedSlot: () => any[];
  patientAppointments: PatientAppointment[];
}

export const MonthView = ({
  currentDate,
  selectedDate,
  selectedMonthSlot,
  monthTotal,
  appointmentDays,
  peakDayValue,
  isLoading = false,
  isLoadingDay = false,
  onMonthChange,
  onDateClick,
  onSlotClick,
  onViewAllSlots,
  onViewAllPatients,
  getOPDSlotsForDate,
  getOPDCount,
  hasAppointments,
  isToday,
  getPatientsForSelectedSlot,
  patientAppointments,
}: MonthViewProps) => {

  // console.log('selectedMonthSlot', selectedMonthSlot)
  // console.log('patientAppointments', patientAppointments)

  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </CardTitle>
            <CardDescription>
              <span className="font-semibold text-primary">{monthTotal} OPD sessions</span> this month
            </CardDescription>
          </div>
          {/* <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const newDate = new Date(currentDate);
                newDate.setMonth(newDate.getMonth() - 1);
                onMonthChange(newDate);
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
                onMonthChange(newDate);
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div> */}
        </div>
      </CardHeader>

      <CardContent>
        {/* Three Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Left Column - Calendar */}
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
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={onDateClick}
                      month={currentDate}
                      onMonthChange={onMonthChange}
                      className="rounded-lg border gap-1 w-full"
                      components={{
                        DayButton: ({ day, ...props }) => {
                          const date = day.date;
                          const count = getOPDCount(date);
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
                                  // <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                                  //   <Badge variant="outline" className="h-4 px-1 text-[8px] bg-primary/10">
                                  //     {/* {count} {count === 1 ? 'OPD' : "OPD's"} */}
                                  //     {count}
                                  //   </Badge>
                                  // </span>
                                  <span className="relative bottom-2 right-0.2 h-1 w-1 bg-primary rounded-full"></span>
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
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Doctor OPD Schedule */}
          <div className="lg:col-span-1">
            <ScheduleCard
              title="Doctor OPD Schedule"
              date={selectedDate
                ? selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
                : 'Select a date'}
              count={selectedDate ? getOPDCount(selectedDate) : 0}
              countLabel={(selectedDate ? getOPDCount(selectedDate) : 0) <= 1 ? "OPD" : "OPDs"}
              viewAllText="View All OPD"
              viewAllCount={selectedDate ? getOPDCount(selectedDate) : 0}
              onViewAll={() => {
                if (selectedDate && hasAppointments(selectedDate)) {
                  onViewAllSlots(getOPDSlotsForDate(selectedDate));
                }
              }}
              emptyIcon={<Stethoscope className="h-8 w-8 mx-auto mb-2 opacity-30" />}
              emptyMessage="No doctor OPD scheduled"
              emptySubMessage="Select a date with OPD sessions"
            >
              {isLoading || isLoadingDay ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : (
                selectedDate && getOPDSlotsForDate(selectedDate).map((slot, index) => (
                  <OPDSlotCard
                    key={slot.id || index}
                    slot={slot}
                    isSelected={selectedMonthSlot === slot}
                    onClick={() => onSlotClick(slot)}
                    onBookedClick={() => onSlotClick(slot)}
                  />
                ))
              )}
            </ScheduleCard>
          </div>

          {/* Right Column - Booked Appointments */}
          <div className="lg:col-span-1">
            <ScheduleCard
              title="Booked Appointments"
              date={selectedMonthSlot
                ? `${selectedMonthSlot.time_range || selectedMonthSlot.timeSlot}`
                : selectedDate
                  ? selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
                  : 'Select a date'}
              count={selectedMonthSlot ? selectedMonthSlot.booked_count || 0 : 0}
              countLabel={(selectedMonthSlot ? selectedMonthSlot.booked_count || 0 : 0) <= 1 ? "Appointment" : "Appointments"}
              viewAllText="View All Appointments"
              viewAllCount={selectedMonthSlot ? selectedMonthSlot.booked_count || 0 : 0}
              onViewAll={() => {
                if (selectedMonthSlot) {
                  onViewAllPatients(selectedMonthSlot);
                }
              }}
              emptyIcon={<Users className="h-8 w-8 mx-auto mb-2 opacity-30" />}
              emptyMessage="No patient appointments"
              emptySubMessage="Select a doctor OPD slot"
            >
              {isLoading || isLoadingDay ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : (
                // selectedMonthSlot && getPatientsForSelectedSlot().map((patient) => (
                //   <AppointmentCard
                //     key={patient.id}
                //     type="patient"
                //     title={patient.name || patient.patient_name}
                //     avatar={patient.patient_avatar || patient.name?.split(' ').map((n: string) => n[0]).join('') || "PT"}
                //     doctor={selectedMonthSlot.doctorName || ""}
                //     time={patient.start_time || patient.appointmentTime}
                //     appointmentType={patient.consultation_type === "video" ? "Video" : "In-Person"}
                //     status={patient.status_label || "Scheduled"}
                //     onClick={() => {
                //       if (patient.id) {
                //         window.location.href = `/doctor/appointments/${patient.id}`;
                //       }
                //     }}
                //   />
                // ))
                selectedMonthSlot && patientAppointments.map((appointment) => {
                  return (
                    <AppointmentCard
                      key={appointment.appointment_id}
                      type="patient"
                      // title={appointment.patient.name || appointment.patient.patient_name}
                      title={
                        appointment.patient.name ||
                        appointment.patient.patient_name ||
                        "Unknown Patient"
                      }
                      // avatar={appointment.patient.avatar || appointment.patient.name?.split(' ').map((n: string) => n[0]).join('') || "PT"}
                      avatar={appointment.patient.avatar || ""}
                      doctor={selectedMonthSlot.doctorName || ""}
                      time={appointment.appointment_time_formatted || appointment.appointmentTime}
                      appointmentType={appointment.consultation_type === "video" ? "Video" : "In-Person"}
                      status={(appointment.status_label as any) || "Scheduled"}
                      onClick={() => {
                        if (appointment.appointment_id) {
                          window.location.href = `/doctor/appointments/${appointment.appointment_id}`;
                        }
                      }}
                    />
                  )
                })
              )}
            </ScheduleCard>
          </div>
        </div>

        {/* Month Summary */}
        {/* <MonthStats
          monthTotal={monthTotal}
          appointmentDays={appointmentDays}
          peakDayValue={peakDayValue}
          isLoading={isLoading}
        /> */}
      </CardContent>
    </Card>
  );
};