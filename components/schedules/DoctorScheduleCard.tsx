import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Video, Clock, Edit } from "lucide-react"
import { DoctorSchedule } from "@/app/(app)/schedules/types"

interface DoctorScheduleCardProps {
  schedule: DoctorSchedule
  onClick: () => void
  onEdit?: () => void
  variant?: "day" | "week"
}

export const DoctorScheduleCard = ({
  schedule,
  onClick,
  onEdit,
  variant = "day",
}: DoctorScheduleCardProps) => {
  const isDayView = variant === "day"

  return (
    <Card className="border-border transition-all hover:shadow-md">
      <CardContent className={isDayView ? "p-5" : "p-3"}>
        {/* Doctor Info */}
        <div
          className={`flex items-center gap-${isDayView ? "3" : "2"} mb-${isDayView ? "3" : "2"}`}
        >
          <Avatar className={isDayView ? "h-10 w-10" : "h-6 w-6"}>
            <AvatarFallback className="bg-primary/10 text-xs text-primary">
              {schedule.doctorAvatar}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3
              className={`font-semibold ${isDayView ? "text-base" : "text-xs"}`}
            >
              {schedule.doctorName}
            </h3>
            {isDayView && (
              <p className="text-xs text-muted-foreground">
                {schedule.doctorSpecialization}
              </p>
            )}
          </div>
        </div>

        {/* Schedule Header */}
        {isDayView && (
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold">{schedule.timeSlot}</span>
              <Badge
                className={
                  schedule.type === "Telehealth"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-purple-100 text-purple-800"
                }
              >
                {schedule.type}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={onEdit}
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </div>
        )}

        {/* Time Slot and Type (for week view) */}
        {!isDayView && (
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{schedule.timeSlot}</span>
            </div>
            <Badge
              className={
                schedule.type === "Telehealth"
                  ? "bg-blue-100 text-xs text-blue-800"
                  : "bg-purple-100 text-xs text-purple-800"
              }
            >
              {schedule.type}
            </Badge>
          </div>
        )}

        {/* Platform */}
        <div
          className={`flex items-center gap-2 text-${isDayView ? "sm" : "xs"} text-muted-foreground mb-${isDayView ? "3" : "2"}`}
        >
          <Video
            className={`h-${isDayView ? "4" : "3"} w-${isDayView ? "4" : "3"}`}
          />
          <span>{schedule.platform}</span>
        </div>

        {/* Appointments Info - Clickable */}
        <div
          className={`flex items-center justify-between p-${isDayView ? "3" : "2"} cursor-pointer rounded-lg bg-accent/20 transition-colors hover:bg-accent/30`}
          onClick={onClick}
        >
          <span className={`text-${isDayView ? "sm" : "xs"} font-medium`}>
            Appointments:
          </span>
          <Badge
            variant="outline"
            className={`text-${isDayView ? "base" : "xs"} font-semibold`}
          >
            {schedule.appointments} / {schedule.totalCapacity}
          </Badge>
        </div>

        {/* Edit Button for week view */}
        {!isDayView && onEdit && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 h-7 w-full px-2"
            onClick={onEdit}
          >
            <Edit className="mr-1 h-3 w-3" />
            <span className="text-xs">Edit</span>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
