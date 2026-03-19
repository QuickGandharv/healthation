import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Video, Stethoscope, Phone, Mail } from "lucide-react"
import {
  OPDSlot,
  DoctorSchedule,
  PatientAppointment,
} from "@/app/(app)/schedules/types"
import { PatientAppointmentCard } from "@/components/schedules/PatientAppointmentCard"

interface AppointmentsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedDate?: Date
  slot?: OPDSlot | null
  schedule?: DoctorSchedule | null
  // patientAppointments: Record<string, PatientAppointment[]>
  patientAppointments: PatientAppointment[];
}

export const AppointmentsDialog = ({
  open,
  onOpenChange,
  selectedDate,
  slot,
  schedule,
  patientAppointments,
}: AppointmentsDialogProps) => {
  console.log('patientAppointments', patientAppointments)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="mx-4 max-h-[80vh] w-full max-w-4xl! overflow-y-auto">
        
        <DialogHeader>
          <DialogTitle>Booked Appointments</DialogTitle>
          <DialogDescription>
            {slot && (
              <span>
                {selectedDate?.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                • {slot.timeSlot} • {slot.doctorName}
              </span>
            )}
            {schedule && !slot && (
              <span>
                {schedule.day}, {schedule.date} • {schedule.timeSlot} •{" "}
                {schedule.doctorName}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>


        {(slot || schedule) && (
          <div className="space-y-4">
            {/* Schedule Info */}
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold">
                    OPD Time: {slot ? slot.timeSlot : schedule?.timeSlot}
                  </span>
                  <Badge
                    className={
                      (slot?.type || schedule?.type) === "Telehealth"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-purple-100 text-purple-800"
                    }
                  >
                    {slot?.type || schedule?.type}
                  </Badge>
                </div>
                <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Video className="h-4 w-4" />
                  <span>{slot?.platform || schedule?.platform}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Stethoscope className="h-4 w-4" />
                  <span>{slot?.doctorName || schedule?.doctorName}</span>
                </div>
                <div className="mt-3 flex items-center justify-between rounded-lg bg-accent/20 p-2">
                  <span className="text-sm font-medium">
                    Total Appointments:
                  </span>
                  <Badge variant="outline" className="font-semibold">
                    {slot ? slot.appointments?.length || 0 : schedule?.appointments}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Patient Appointments List */}
            <div className="space-y-3">
              <h3 className="font-semibold">Patient Appointments</h3>
              {slot
                ? slot.appointments?.map((patient) => (
                    <PatientAppointmentCard
                      key={patient.id}
                      patient={patient}
                      onClick={() => {
                        if (patient.id) {
                          window.location.href = `/doctor/appointments/${patient.id}`;
                        }
                      }}
                    />
                  ))
                : schedule &&
                    patientAppointments?.map((patient) => (
                    <PatientAppointmentCard
                      key={patient.appointment_id}
                      patient={patient}
                      onClick={() => {
                        window.location.href = `/doctor/appointments/${patient.appointment_id}`;
                      }}
                    />
                  ))
                  }
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
