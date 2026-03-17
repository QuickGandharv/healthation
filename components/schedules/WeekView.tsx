import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { DoctorSchedule } from "@/app/(app)/schedules/types";
import { NavigationHeader } from "@/components/schedules/NavigationHeader";
import { DoctorScheduleCard } from "@/components/schedules/DoctorScheduleCard";

interface WeekViewProps {
  weekDays: string[];
  schedulesByDay: Record<string, DoctorSchedule[]>;
  formatWeekRange: () => string;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onScheduleClick: (schedule: DoctorSchedule) => void;
  isToday: (day: string, date: string) => boolean;
  isLoading?: boolean;
  error?: string | null;
}

export const WeekView = ({ 
  weekDays,
  schedulesByDay,
  formatWeekRange,
  onPrevWeek,
  onNextWeek,
  onScheduleClick,
  isToday,
  isLoading = false,
  error
}: WeekViewProps) => {
  // Generate week dates dynamically
  const getWeekDate = (day: string) => {
    const today = new Date();
    const dayIndex = weekDays.indexOf(day);
    const date = new Date(today);
    date.setDate(today.getDate() - today.getDay() + 1 + dayIndex);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="space-y-6">
      <NavigationHeader 
        title={formatWeekRange()} 
        onPrev={onPrevWeek} 
        onNext={onNextWeek} 
      />

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">
          <p>{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {weekDays.map((day) => {
            const daySchedules = schedulesByDay[day] || [];
            const totalSlots = daySchedules.length;
            const isTodayDay = isToday(day, getWeekDate(day));

            return (
              <Card key={day} className={`border-border pt-0 h-full ${isTodayDay ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
                <CardHeader className={`py-2 border-b border-border ${isTodayDay ? 'bg-primary/5' : ''}`}>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {day}
                      {isTodayDay && (
                        <Badge className="bg-primary text-primary-foreground text-xs">Today</Badge>
                      )}
                    </CardTitle>
                    {totalSlots > 0 && (
                      <Badge variant="outline" className="bg-primary/5">
                        {totalSlots} {totalSlots === 1 ? 'Slot' : 'Slots'}
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{getWeekDate(day)}</CardDescription>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  {daySchedules.map((schedule) => (
                    <DoctorScheduleCard
                      key={schedule.id}
                      schedule={schedule}
                      variant="week"
                      onClick={() => onScheduleClick(schedule)}
                      onEdit={() => console.log("Edit schedule", schedule.id)}
                    />
                  ))}

                  {daySchedules.length === 0 && (
                    <div className="text-center py-6 text-muted-foreground text-sm border border-dashed border-border rounded-lg">
                      No schedules
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};