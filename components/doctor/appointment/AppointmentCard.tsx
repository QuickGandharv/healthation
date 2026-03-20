"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle, Clock, FileText, MoreVertical, Phone, Trash2, User, Video, Edit } from "lucide-react";
import { Appointment } from "@/types/doctor/appointment";
import { getStatusColor } from "@/utils/appointment-helpers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface AppointmentCardProps {
  appointment: Appointment;
  variant?: "all" | "today" | "upcoming" | "past";
  onCardClick?: () => void;
}

export default function AppointmentCard({
  appointment,
  variant = "all",
  onCardClick,
}: AppointmentCardProps) {
  const router = useRouter();
  return (
    <Card
      className={`rounded-xl border border-gray-200 ${variant === "all" || variant === "past"
        ? "cursor-pointer transition hover:border-primary/50 hover:shadow-md"
        : ""
        } ${variant === "past" ? "bg-gray-50/50 opacity-75" : ""}`}
      onClick={onCardClick}
    >
      <CardContent className="p-5">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src={(appointment.patient as any)?.avatar || appointment.avatar || "/placeholder-avatar.png"}
              className="h-10 w-10 rounded-full object-cover"
              alt={typeof appointment.patient === "string" ? appointment.patient : (appointment.patient as any)?.name || "Patient"}
            />
            <div>
              <h3 className="font-semibold text-primary">{typeof appointment.patient === "string" ? appointment.patient : (appointment.patient as any)?.name}</h3>
            </div>
          </div>

          {variant !== "all" && (
            <div className="mt-1 flex items-center gap-2">
              <Badge className={getStatusColor(appointment.status)}>
                {appointment.status}
              </Badge>
            </div>
          )}
        </div>

        <div className="mb-4 space-y-1 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {(appointment as any).appointment_date_formatted || appointment.date}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {(appointment as any).appointment_time_formatted || appointment.time}
          </div>
        </div>

        {variant === "all" && (
          <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
            <Button
              size="sm"
              className="flex-1 bg-primary text-white"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Call now:", typeof appointment.patient === "string" ? appointment.patient : (appointment.patient as any)?.name);
              }}
            >
              Call Now
            </Button>

            {/* <Button
              size="sm"
              variant="outline"
              className="flex-1 border-gray-300"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Reschedule:", typeof appointment.patient === "string" ? appointment.patient : (appointment.patient as any)?.name);
              }}
            >
              Reschedule
            </Button> */}
          </div>
        )}

        {(variant === "today" || variant === "upcoming") && (
          <div className="flex gap-3">
            {appointment.status === "pending" && (
              <Button
                size="sm"
                variant="outline"
                className="flex-1 border-success text-success hover:bg-success/10"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Confirm:", typeof appointment.patient === "string" ? appointment.patient : (appointment.patient as any)?.name);
                }}
              >
                <CheckCircle className="mr-1 h-4 w-4" />
                Confirm
              </Button>
            )}

            {appointment.status === "confirmed" && appointment.type === "video" && (
              <Button
                size="sm"
                className="flex-1 bg-primary text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Join:", typeof appointment.patient === "string" ? appointment.patient : (appointment.patient as any)?.name);
                }}
              >
                <Video className="mr-1 h-4 w-4" />
                Join
              </Button>
            )}

            {appointment.status === "confirmed" &&
              appointment.consultation_type === "video" && (
                <Button
                  size="sm"
                  className="flex-1 bg-primary text-white"
                  onClick={() => {
                    const url = appointment?.video_consultation?.join_url;
                    if (url) {
                      window.open(url, "_blank", "noopener,noreferrer");
                    }
                  }}

                >
                  <Phone className="mr-1 h-4 w-4" />
                  Call Now
                </Button>
              )}

            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
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
            </DropdownMenu> */}
          </div>
        )}

        {variant === "past" && (
          <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
            <Button
              size="sm"
              variant="outline"
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                console.log("View details:", typeof appointment.patient === "string" ? appointment.patient : (appointment.patient as any)?.name);
              }}
            >
              <FileText className="mr-1 h-4 w-4" />
              View Details
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
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
        )}

        <Button
          onClick={(e) => {
            e.stopPropagation();
            const id = (appointment as any).appointment_id || appointment.id || (appointment as any)._id;
            sessionStorage.setItem(`appointment_${id}`, JSON.stringify(appointment));
            router.push(`/doctor/appointments/${id}`);
          }}
          className="[&]:py-2 max-w-32 mt-2"
        >
          View Details
        </Button>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${appointment.type === "video" || appointment.type === "phone"
            ? "bg-primary text-white"
            : "bg-gray-100 text-gray-700"
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          {appointment.type === "video" || appointment.type === "phone"
            ? "Telehealth"
            : "In-Person"}
        </span>
      </CardContent>
    </Card>
  );
}