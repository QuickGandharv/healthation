import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail } from "lucide-react";
import { PatientAppointment } from "@/app/(app)/schedules/types";


interface PatientAppointmentCardProps {
  patient: PatientAppointment;
  onClick?: () => void;
}

export const PatientAppointmentCard = ({ patient, onClick }: PatientAppointmentCardProps) => {
  return (
    <Card className="border-border hover:shadow-md transition-all cursor-pointer" onClick={onClick}>
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
  );
};