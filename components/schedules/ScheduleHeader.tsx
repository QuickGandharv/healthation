import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ScheduleHeaderProps {
  title: string;
  description: string;
  onNewAppointment: () => void;
}

export const ScheduleHeader = ({ title, description, onNewAppointment }: ScheduleHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Button className="bg-primary hover:bg-primary/90" onClick={onNewAppointment}>
        <Plus className="mr-2 h-4 w-4" />
        New Appointment
      </Button>
    </div>
  );
};