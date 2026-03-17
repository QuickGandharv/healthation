import { Calendar, MapPin, Phone, Video } from "lucide-react";

export const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-success/10 text-success hover:bg-success/20";
    case "pending":
      return "bg-warning/10 text-warning hover:bg-warning/20";
    case "completed":
      return "bg-info/10 text-info hover:bg-info/20";
    case "cancelled":
      return "bg-danger/10 text-danger hover:bg-danger/20";
    default:
      return "bg-primary/10 text-primary hover:bg-primary/20";
  }
};

export const getTypeIcon = (type: string) => {
  switch (type) {
    case "video":
      return <Video className="h-4 w-4" />;
    case "phone":
      return <Phone className="h-4 w-4" />;
    case "in-person":
      return <MapPin className="h-4 w-4" />;
    default:
      return <Calendar className="h-4 w-4" />;
  }
};