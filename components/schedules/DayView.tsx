import { DoctorSchedule } from "@/app/(app)/schedules/types";
import { NavigationHeader } from "@/components/schedules/NavigationHeader";
import { DoctorScheduleCard } from "@/components/schedules/DoctorScheduleCard";
import { Loader2 } from "lucide-react";

interface DayViewProps {
  dayDoctorSchedules: DoctorSchedule[];
  formatDayHeader: () => string;
  onPrevDay: () => void;
  onNextDay: () => void;
  onScheduleClick: (schedule: DoctorSchedule) => void;
  isLoading?: boolean;
  error?: string | null;
}

export const DayView = ({ 
  dayDoctorSchedules, 
  formatDayHeader, 
  onPrevDay, 
  onNextDay,
  onScheduleClick,
  isLoading = false,
  error
}: DayViewProps) => {
  return (
    <div className="space-y-6">
      <NavigationHeader 
        title={formatDayHeader()} 
        onPrev={onPrevDay} 
        onNext={onNextDay} 
      />

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">
          <p>{error}</p>
        </div>
      ) : dayDoctorSchedules.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>No schedules available for this day</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {dayDoctorSchedules.map((schedule) => (
            <DoctorScheduleCard
              key={schedule.id}
              schedule={schedule}
              variant="day"
              onClick={() => onScheduleClick(schedule)}
              onEdit={() => console.log("Edit schedule", schedule.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};