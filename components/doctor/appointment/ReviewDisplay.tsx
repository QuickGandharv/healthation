import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Calendar } from "lucide-react";
import { type AppointmentReview } from "@/api/doctor/appointmentReviews";

interface ReviewDisplayProps {
  review: AppointmentReview;
  patientName: string;
}

export default function ReviewDisplay({ review, patientName }: ReviewDisplayProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg">Patient Review</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Patient Info and Rating */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              {review.patient_avatar ? (
                <img src={review.patient_avatar} alt={patientName} className="object-cover" />
              ) : (
                <AvatarFallback className="bg-primary/10 text-primary">
                  {getInitials(patientName)}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <h3 className="font-semibold">{patientName}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(review.created_at)}
              </div>
            </div>
          </div>

          {/* Rating Stars */}
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < review.rating
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Review Comment */}
        <div className="bg-muted/30 rounded-lg p-4 border border-border">
          <p className="text-sm leading-relaxed">{review.comment}</p>
        </div>

        {/* Doctor Response (if any) */}
        {review.doctor_response && (
          <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-medium text-sm text-blue-900 mb-2">Doctor Response</h4>
            <p className="text-sm text-blue-800 leading-relaxed">
              {review.doctor_response.response}
            </p>
            <p className="text-xs text-blue-600 mt-2">
              Responded on {formatDate(review.doctor_response.responded_on)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
