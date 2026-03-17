import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video, Edit } from "lucide-react";
import { OPDSlot } from "@/app/(app)/schedules/types";

interface DayScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate?: Date;
  slots: OPDSlot[];
  onSlotClick: (slot: OPDSlot) => void;
}

export const DayScheduleDialog = ({ 
  open, 
  onOpenChange, 
  selectedDate, 
  slots,
  onSlotClick 
}: DayScheduleDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl! max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>OPD Schedule</DialogTitle>
          <DialogDescription>
            {selectedDate && (
              <span>{selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {slots.map((slot, index) => (
            <Card key={index} className="border-border">
              <CardContent className="p-4">
                {/* Doctor Info */}
                <div className="flex items-center gap-2 mb-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary">{slot.doctorAvatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-sm">{slot.doctorName}</h4>
                    <p className="text-xs text-muted-foreground">{slot.doctorSpecialization}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{slot.timeSlot}</span>
                  <Badge className={slot.type === "Telehealth" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}>
                    {slot.type}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Video className="h-4 w-4" />
                  <span>{slot.platform}</span>
                </div>

                {/* Appointments - Clickable */}
                <div
                  className="mt-2 flex items-center justify-between p-3 bg-accent/20 rounded-lg cursor-pointer hover:bg-accent/30 transition-colors"
                  onClick={() => {
                    onOpenChange(false);
                    onSlotClick(slot);
                  }}
                >
                  <span className="text-sm font-medium">Appointments:</span>
                  <Badge variant="outline" className="text-base font-semibold">
                    {slot.appointments?.length || 0} / {slot.totalCapacity}
                  </Badge>
                </div>

                <Button variant="ghost" size="sm" className="w-full mt-2 gap-2">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};