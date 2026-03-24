"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  MoreVertical,
  Phone,
  User,
  Video,
  MapPin,
  ArrowUpRight
} from "lucide-react";
import { Appointment } from "@/types/doctor/appointment";
import { getStatusColor } from "@/utils/appointment-helpers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Image from "next/image";

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

  const patientName =
    typeof appointment.patient === "string"
      ? appointment.patient
      : (appointment.patient as any)?.name || "Unknown Patient";

  const patientAvatar =
    (appointment.patient as any)?.avatar || appointment.avatar || "/placeholder-avatar.png";

  const appointmentDate = (appointment as any).appointment_date_formatted || appointment.date;
  const appointmentTime = (appointment as any).appointment_time_formatted || appointment.time;

  const isVideo = appointment.type === "video" || appointment.consultation_type === "video";
  const isPhone = appointment.type === "phone" || appointment.consultation_type === "phone";
  const isTelehealth = isVideo || isPhone;

  const appointmentId = (appointment as any).appointment_id || appointment.id || (appointment as any)._id;

  const handleViewDetails = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (appointmentId) {
      sessionStorage.setItem(`appointment_${appointmentId}`, JSON.stringify(appointment));
      router.push(`/doctor/appointments/${appointmentId}`);
    }
  };

  const isInteractive = variant === "all" || variant === "past";
  const isPast = variant === "past";

  return (
    <Card
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 p-0 ${isInteractive
        ? "cursor-pointer hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
        : "border-border/50"
        } ${isPast ? "bg-muted/30 opacity-80" : "bg-card"}`}
      onClick={isInteractive ? onCardClick : undefined}
    >
      {/* Soft gradient banner at the top */}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary/60 via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <CardContent className="p-4">
        {/* Header: Patient Info & Status */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/10 transition-transform duration-300 group-hover:scale-105">
              <Image
                src={patientAvatar}
                alt={patientName}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold text-foreground line-clamp-1">{patientName}</h3>
              {/* {appointmentId && (
                <span className="text-xs font-medium text-muted-foreground mt-0.5">
                  ID: <span className="uppercase">{String(appointmentId).slice(-6)}</span>
                </span>
              )} */}
            </div>
          </div>

          {variant !== "all" && (
            <Badge
              className={`capitalize px-2.5 py-0.5 whitespace-nowrap mt-1 ${getStatusColor(
                appointment.status
              )}`}
            >
              {appointment.status}
            </Badge>
          )}
        </div>

        {/* Middle: Details Card */}
        <div className="mt-5 rounded-xl bg-muted/20 p-3.5 transition-colors group-hover:bg-muted/40" onClick={(e) => {
          if (!isInteractive) { e.stopPropagation(); }
        }}>
          <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 shrink-0 text-primary/70" />
              <span className="font-medium text-foreground truncate">{appointmentDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 shrink-0 text-primary/70" />
              <span className="font-medium text-foreground truncate">{appointmentTime}</span>
            </div>
            <div className="col-span-2 flex items-center justify-between my-2">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-md ${isTelehealth ? 'bg-blue-500/10 text-blue-600' : 'bg-emerald-500/10 text-emerald-600'}`}>
                  {isVideo ? (
                    <Video className="h-3.5 w-3.5" />
                  ) : isPhone ? (
                    <Phone className="h-3.5 w-3.5" />
                  ) : (
                    <MapPin className="h-3.5 w-3.5" />
                  )}
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {isTelehealth ? "Video" : "Clinic"}
                </span>
              </div>

              {/* <button
                onClick={handleViewDetails}
                className="group/link flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors bg-transparent border-0 cursor-pointer"
              >
                View full
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </button> */}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-5 flex gap-2" onClick={(e) => e.stopPropagation()}>
          {variant === "all" && (
            <Button
              size="sm"
              className="flex-1 rounded-lg bg-primary text-white shadow-sm transition-all hover:bg-primary/90 hover:shadow"
              onClick={() => console.log("Call now:", patientName)}
            >
              <Phone className="mr-1.5 h-3.5 w-3.5" />
              Call Now
            </Button>
          )}

          {(variant === "today" || variant === "upcoming") && (
            <>
              {appointment.status === "pending" && (
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 rounded-lg border-emerald-500 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                  onClick={() => console.log("Confirm:", patientName)}
                >
                  <CheckCircle className="mr-1.5 h-3.5 w-3.5" />
                  Confirm
                </Button>
              )}

              {appointment.status === "confirmed" && isVideo && (
                <Button
                  size="sm"
                  className="flex-1 rounded-lg bg-primary text-white shadow-sm transition-all hover:bg-primary/90 hover:shadow"
                  onClick={() => {
                    const url = appointment?.video_consultation?.join_url;
                    if (url) {
                      window.open(url, "_blank", "noopener,noreferrer");
                    } else {
                      console.log("Join:", patientName);
                    }
                  }}
                >
                  <Video className="mr-1.5 h-3.5 w-3.5" />
                  {appointment?.video_consultation?.join_url ? "Call Now" : "Join Call"}
                </Button>
              )}
            </>
          )}

          {variant === "past" && (
            <Button
              size="sm"
              variant="outline"
              className="flex-1 rounded-lg"
              onClick={handleViewDetails}
            >
              <FileText className="mr-1.5 h-3.5 w-3.5" />
              View Notes
            </Button>
          )}

          {/* Quick Actions Dropdown */}
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg shrink-0">
                <MoreVertical className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg border-border/50">
              <DropdownMenuItem onClick={handleViewDetails} className="cursor-pointer">
                <User className="mr-2 h-4 w-4 text-muted-foreground shrink-0" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleViewDetails} className="cursor-pointer">
                <FileText className="mr-2 h-4 w-4 text-muted-foreground shrink-0" />
                View Notes
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </CardContent>
    </Card>
  );
}