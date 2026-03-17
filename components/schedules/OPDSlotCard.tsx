import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Video, Edit } from "lucide-react";
import { OPDSlot } from "@/app/(app)/schedules/types";


interface OPDSlotCardProps {
  slot: OPDSlot;
  isSelected: boolean;
  onClick: () => void;
  onBookedClick: () => void;
  onEdit?: () => void;
}

export const OPDSlotCard = ({ 
  slot, 
  isSelected, 
  onClick, 
  onBookedClick,
  onEdit 
}: OPDSlotCardProps) => {
  return (
    <div
      className={`border rounded-lg p-3 hover:shadow-md transition-all mb-2 cursor-pointer ${
        isSelected ? 'border-primary bg-primary/5' : 'border-border'
      }`}
      onClick={onClick}
    >
      {/* Doctor Info */}
      <div className="flex items-center gap-2 mb-2">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary/10 text-primary">{slot.doctorAvatar}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-semibold text-sm">{slot.doctorName}</h4>
          <p className="text-xs text-muted-foreground">{slot.doctorSpecialization}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-sm">{slot.timeSlot}</span>
        <Badge className={slot.type === "Telehealth" ? "bg-blue-100 text-blue-800 text-xs" : "bg-purple-100 text-purple-800 text-xs"}>
          {slot.type}
        </Badge>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
        <Video className="h-3 w-3" />
        <span>{slot.platform}</span>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            onBookedClick();
          }}
        >
          <Badge variant="outline" className="text-xs font-normal">
            {slot.appointments?.length || 0}/{slot.totalCapacity} booked
          </Badge>
        </div>
        {onEdit && (
          <Button variant="ghost" size="sm" className="h-6 px-2">
            <Edit className="h-3 w-3 mr-1" />
            <span className="text-xs">Edit</span>
          </Button>
        )}
      </div>
    </div>
  );
};