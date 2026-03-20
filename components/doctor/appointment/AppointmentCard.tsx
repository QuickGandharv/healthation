// // "use client";

// // import { Card, CardContent } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Badge } from "@/components/ui/badge";
// // import { Calendar, CheckCircle, Clock, FileText, MoreVertical, Phone, Trash2, User, Video, Edit } from "lucide-react";
// // import { Appointment } from "@/types/doctor/appointment";
// // import { getStatusColor } from "@/utils/appointment-helpers";
// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuSeparator,
// //   DropdownMenuTrigger,
// // } from "@/components/ui/dropdown-menu";
// // import { useRouter } from "next/navigation";

// // interface AppointmentCardProps {
// //   appointment: Appointment;
// //   variant?: "all" | "today" | "upcoming" | "past";
// //   onCardClick?: () => void;
// // }

// // export default function AppointmentCard({
// //   appointment,
// //   variant = "all",
// //   onCardClick,
// // }: AppointmentCardProps) {
// //   const router = useRouter();
// //   return (
// //     <Card
// //       className={`rounded-xl border border-gray-200 ${variant === "all" || variant === "past"
// //         ? "cursor-pointer transition hover:border-primary/50 hover:shadow-md"
// //         : ""
// //         } ${variant === "past" ? "bg-gray-50/50 opacity-75" : ""}`}
// //       onClick={onCardClick}
// //     >
// //       <CardContent className="p-5">
// //         <div className="mb-4 flex items-start justify-between">
// //           <div className="flex items-center gap-3">
// //             <img
// //               src={(appointment.patient as any)?.avatar || appointment.avatar || "/placeholder-avatar.png"}
// //               className="h-10 w-10 rounded-full object-cover"
// //               alt={typeof appointment.patient === "string" ? appointment.patient : (appointment.patient as any)?.name || "Patient"}
// //             />
// //             <div>
// //               <h3 className="font-semibold text-primary">{typeof appointment.patient === "string" ? appointment.patient : (appointment.patient as any)?.name}</h3>
// //             </div>
// //           </div>

// //           {variant !== "all" && (
// //             <div className="mt-1 flex items-center gap-2">
// //               <Badge className={getStatusColor(appointment.status)}>
// //                 {appointment.status}
// //               </Badge>
// //             </div>
// //           )}
// //         </div>

// //         <div className="mb-4 space-y-1 text-sm text-gray-600">
// //           <div className="flex items-center gap-2">
// //             <Calendar className="h-4 w-4" />
// //             {(appointment as any).appointment_date_formatted || appointment.date}
// //           </div>
// //           <div className="flex items-center gap-2">
// //             <Clock className="h-4 w-4" />
// //             {(appointment as any).appointment_time_formatted || appointment.time}
// //           </div>
// //         </div>

// //         {variant === "all" && (
// //           <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
// //             <Button
// //               size="sm"
// //               className="flex-1 bg-primary text-white"
// //               onClick={(e) => {
// //                 e.stopPropagation();
// //                 console.log("Call now:", typeof appointment.patient === "string" ? appointment.patient : (appointment.patient as any)?.name);
// //               }}
// //             >
// //               Call Now
// //             </Button>

// //             <Button
// //               size="sm"
// //               variant="outline"
// //               className="flex-1 border-gray-300"
// //               onClick={(e) => {
// //                 e.stopPropagation();
// //                 console.log("Reschedule:", typeof appointment.patient === "string" ? appointment.patient : (appointment.patient as any)?.name);
// //               }}
// //             >
// //               Reschedule
// //             </Button>
// //           </div>
// //         )}

// //         {(variant === "today" || variant === "upcoming") && (
// //           <div className="flex gap-3">
// //             {appointment.status === "pending" && (
// //               <Button
// //                 size="sm"
// //                 variant="outline"
// //                 className="flex-1 border-success text-success hover:bg-success/10"
// //                 onClick={(e) => {
// //                   e.stopPropagation();
// //                   console.log("Confirm:", typeof appointment.patient === "string" ? appointment.patient : (appointment.patient as any)?.name);
// //                 }}
// //               >
// //                 <CheckCircle className="mr-1 h-4 w-4" />
// //                 Confirm
// //               </Button>
// //             )}

// //             {appointment.status === "confirmed" && appointment.type === "video" && (
// //               <Button
// //                 size="sm"
// //                 className="flex-1 bg-primary text-white"
// //                 onClick={(e) => {
// //                   e.stopPropagation();
// //                   console.log("Join:", typeof appointment.patient === "string" ? appointment.patient : (appointment.patient as any)?.name);
// //                 }}
// //               >
// //                 <Video className="mr-1 h-4 w-4" />
// //                 Join
// //               </Button>
// //             )}

// //             {appointment.status === "confirmed" &&
// //               appointment.consultation_type === "video" && (
// //                 <Button
// //                   size="sm"
// //                   className="flex-1 bg-primary text-white"
// //                   onClick={() => {
// //                     const url = appointment?.video_consultation?.join_url;
// //                     if (url) {
// //                       window.open(url, "_blank", "noopener,noreferrer");
// //                     }
// //                   }}
// //                 >
// //                   <Phone className="mr-1 h-4 w-4" />
// //                   Call Now
// //                 </Button>
// //             )}

// //             {/* <DropdownMenu>
// //               <DropdownMenuTrigger asChild>
// //                 <Button variant="ghost" size="icon" className="h-9 w-9">
// //                   <MoreVertical className="h-4 w-4" />
// //                 </Button>
// //               </DropdownMenuTrigger>
// //               <DropdownMenuContent align="end">
// //                 <DropdownMenuItem>
// //                   <User className="mr-2 h-4 w-4" />
// //                   View Patient
// //                 </DropdownMenuItem>
// //                 <DropdownMenuItem>
// //                   <FileText className="mr-2 h-4 w-4" />
// //                   View Notes
// //                 </DropdownMenuItem>
// //                 <DropdownMenuItem>
// //                   <Edit className="mr-2 h-4 w-4" />
// //                   Edit Appointment
// //                 </DropdownMenuItem>
// //                 <DropdownMenuSeparator />
// //                 <DropdownMenuItem className="text-danger">
// //                   <Trash2 className="mr-2 h-4 w-4" />
// //                   Cancel Appointment
// //                 </DropdownMenuItem>
// //               </DropdownMenuContent>
// //             </DropdownMenu> */}
// //           </div>
// //         )}

// //         {variant === "past" && (
// //           <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
// //             <Button
// //               size="sm"
// //               variant="outline"
// //               className="flex-1"
// //               onClick={(e) => {
// //                 e.stopPropagation();
// //                 console.log("View details:", typeof appointment.patient === "string" ? appointment.patient : (appointment.patient as any)?.name);
// //               }}
// //             >
// //               <FileText className="mr-1 h-4 w-4" />
// //               View Details
// //             </Button>

// //             <DropdownMenu>
// //               <DropdownMenuTrigger asChild>
// //                 <Button variant="ghost" size="icon" className="h-9 w-9">
// //                   <MoreVertical className="h-4 w-4" />
// //                 </Button>
// //               </DropdownMenuTrigger>
// //               <DropdownMenuContent align="end">
// //                 <DropdownMenuItem>
// //                   <User className="mr-2 h-4 w-4" />
// //                   View Patient
// //                 </DropdownMenuItem>
// //                 <DropdownMenuItem>
// //                   <FileText className="mr-2 h-4 w-4" />
// //                   View Notes
// //                 </DropdownMenuItem>
// //               </DropdownMenuContent>
// //             </DropdownMenu>
// //           </div>
// //         )}

// //         <Button
// //           onClick={(e) => {
// //             e.stopPropagation();
// //             const id = (appointment as any).appointment_id || appointment.id || (appointment as any)._id;
// //             sessionStorage.setItem(`appointment_${id}`, JSON.stringify(appointment));
// //             router.push(`/doctor/appointments/${id}`);
// //           }}
// //           className="[&]:py-2 max-w-32 mt-2"
// //         >
// //           View Details
// //         </Button>

// //         <span
// //           className={`rounded-full px-3 py-1 text-xs font-medium ${appointment.type === "video" || appointment.type === "phone"
// //             ? "bg-primary text-white"
// //             : "bg-gray-100 text-gray-700"
// //             }`}
// //           onClick={(e) => e.stopPropagation()}
// //         >
// //           {appointment.type === "video" || appointment.type === "phone"
// //             ? "Telehealth"
// //             : "In-Person"}
// //         </span>
// //       </CardContent>
// //     </Card>
// //   );
// // }

// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Calendar,
//   CheckCircle,
//   Clock,
//   FileText,
//   MoreVertical,
//   Phone,
//   Trash2,
//   User,
//   Video,
//   Edit,
//   MapPin,
//   ArrowRight
// } from "lucide-react";
// import { Appointment } from "@/types/doctor/appointment";
// import { getStatusColor } from "@/utils/appointment-helpers";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// interface AppointmentCardProps {
//   appointment: Appointment;
//   variant?: "all" | "today" | "upcoming" | "past";
//   onCardClick?: () => void;
//   onStatusChange?: (appointmentId: string, newStatus: string) => void;
//   onCancel?: (appointmentId: string) => void;
// }

// // Helper function to safely get patient info
// const getPatientInfo = (appointment: Appointment) => {
//   const patient = appointment.patient as any;
//   return {
//     id: typeof patient === "string" ? patient : patient?.id || patient?._id,
//     name: typeof patient === "string" ? patient : patient?.name || "Unknown Patient",
//     avatar: patient?.avatar || "/placeholder-avatar.png",
//   };
// };

// // Helper function to get appointment ID
// const getAppointmentId = (appointment: Appointment): string => {
//   return (appointment as any).appointment_id || appointment.id || (appointment as any)._id || "";
// };

// export default function AppointmentCard({
//   appointment,
//   variant = "all",
//   onCardClick,
//   onStatusChange,
//   onCancel,
// }: AppointmentCardProps) {
//   console.log("Appointment : ", appointment);
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);

//   const patientInfo = getPatientInfo(appointment);
//   const appointmentId = getAppointmentId(appointment);

//   const isPastVariant = variant === "past";
//   const isInteractive = variant === "all" || variant === "past";
//   const isDisabled = isPastVariant;

//   const handleAction = async (action: () => void | Promise<void>) => {
//     setIsLoading(true);
//     try {
//       await action();
//     } catch (error) {
//       console.error("Action failed:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleViewDetails = () => {
//     sessionStorage.setItem(`appointment_${appointmentId}`, JSON.stringify(appointment));
//     router.push(`/doctor/appointments/${appointmentId}`);
//   };

//   const renderStatusBadge = () => (
//     <Badge className={`${getStatusColor(appointment.status_label)} capitalize`}>
//       {appointment.status_label}
//     </Badge>
//   );

//   const renderAppointmentType = () => {
//     const isTelehealth = appointment.consultation_type === "video" || appointment.consultation_type === "in-person";
//     const Icon = isTelehealth ? Video : MapPin;

//     return (
//       <Badge
//         variant="outline"
//         className={`flex items-center gap-1 ${isTelehealth ? "border-primary/30 bg-primary/5 text-primary" : "border-gray-300 bg-gray-50"}`}
//       >
//         <Icon className="h-3 w-3" />
//         <span>{appointment.consultation_type_label}</span>
//       </Badge>
//     );
//   };

//   const renderHeader = () => (
//     <div className="mb-4 flex items-start justify-between">
//       <div className="flex items-center gap-3">
//         <div className="relative">
//           <img
//             src={patientInfo.avatar}
//             className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-100"
//             alt={patientInfo.name}
//           />
//           {appointment.status === "confirmed" && (
//             <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success ring-2 ring-white" />
//           )}
//         </div>
//         <div>
//           <h3 className="font-semibold text-gray-900">{patientInfo.name}</h3>
//           {variant !== "all" && (
//             <div className="mt-1">
//               {renderStatusBadge()}
//             </div>
//           )}
//         </div>
//       </div>

//       {variant !== "all" && variant !== "today" && variant !== "upcoming" && (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" size="icon" className="h-8 w-8">
//               <MoreVertical className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuItem onClick={() => handleAction(() => console.log("View patient"))}>
//               <User className="mr-2 h-4 w-4" />
//               View Patient
//             </DropdownMenuItem>
//             <DropdownMenuItem onClick={() => handleAction(() => console.log("View notes"))}>
//               <FileText className="mr-2 h-4 w-4" />
//               View Notes
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       )}
//     </div>
//   );

//   const renderDateTime = () => (
//     <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
//       <div className="flex items-center gap-2">
//         <Calendar className="h-4 w-4 text-gray-400" />
//         <span>{(appointment as any).appointment_date_formatted || appointment.date}</span>
//       </div>
//       <div className="flex items-center gap-2">
//         <Clock className="h-4 w-4 text-gray-400" />
//         <span>{(appointment as any).appointment_time_formatted || appointment.time}</span>
//       </div>
//     </div>
//   );

//   const renderActionButtons = () => {
//     if (isPastVariant) {
//       return (
//         <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
//           <Button
//             size="sm"
//             variant="outline"
//             className="flex-1"
//             onClick={() => handleAction(() => console.log("View details"))}
//             disabled={isLoading}
//           >
//             <FileText className="mr-2 h-4 w-4" />
//             View Details
//           </Button>
//         </div>
//       );
//     }

//     if (variant === "all") {
//       return (
//         <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
//           <Button
//             size="sm"
//             className="flex-1 bg-primary text-white hover:bg-primary/90"
//             onClick={() => handleAction(() => console.log("Call now:", patientInfo.name))}
//             disabled={isLoading}
//           >
//             <Phone className="mr-2 h-4 w-4" />
//             Call Now
//           </Button>

//           <Button
//             size="sm"
//             variant="outline"
//             className="flex-1"
//             onClick={() => handleAction(() => console.log("Reschedule:", patientInfo.name))}
//             disabled={isLoading}
//           >
//             <Calendar className="mr-2 h-4 w-4" />
//             Reschedule
//           </Button>
//         </div>
//       );
//     }

//     // Today/Upcoming variant actions
//     return (
//       <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
//         {appointment.status === "pending" && (
//           <Button
//             size="sm"
//             variant="outline"
//             className="flex-1 border-success text-success hover:bg-success/10"
//             onClick={() => handleAction(() => onStatusChange?.(appointmentId, "confirmed"))}
//             disabled={isLoading}
//           >
//             <CheckCircle className="mr-2 h-4 w-4" />
//             Confirm
//           </Button>
//         )}

//         {appointment.status === "confirmed" && (
//           <Button
//             size="sm"
//             className="flex-1 bg-primary text-white hover:bg-primary/90"
//             onClick={() => {
//               const joinUrl = (appointment as any)?.video_consultation?.join_url;
//               if (joinUrl) {
//                 window.open(joinUrl, "_blank", "noopener,noreferrer");
//               } else {
//                 handleAction(() => console.log("Join call:", patientInfo.name));
//               }
//             }}
//             disabled={isLoading}
//           >
//             {appointment.type === "video" ? (
//               <Video className="mr-2 h-4 w-4" />
//             ) : (
//               <Phone className="mr-2 h-4 w-4" />
//             )}
//             {appointment.type === "video" ? "Join" : "Call Now"}
//           </Button>
//         )}
//       </div>
//     );
//   };

//   return (
//     <Card
//       className={`
//         group rounded-xl border border-gray-200 transition-all duration-200 p-5
//         ${isInteractive && !isDisabled ? "cursor-pointer hover:border-primary/50 hover:shadow-md hover:scale-[1.02]" : ""}
//         ${isDisabled ? "bg-gray-50/50 opacity-75" : "bg-white"}
//       `}
//       onClick={() => isInteractive && !isDisabled && onCardClick?.()}
//     >
//       <CardContent className="p-0">
//         {renderHeader()}
//         {renderDateTime()}
//         <div className="mb-4 flex items-center justify-between">
//           {renderAppointmentType()}
//           {variant !== "all" && variant !== "today" && variant !== "upcoming" && (
//             <span className="text-xs text-gray-500">
//               ID: {appointmentId.slice(-6)}
//             </span>
//           )}
//         </div>

// <<<<<<< Updated upstream
//         {variant === "all" && (
//           <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
//             <Button
//               size="sm"
//               className="flex-1 bg-primary text-white"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 console.log("Call now:", typeof appointment.patient === "string" ? appointment.patient : (appointment.patient as any)?.name);
//               }}
//             >
//               Call Now
//             </Button>

//             {/* <Button
//               size="sm"
//               variant="outline"
//               className="flex-1 border-gray-300"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 console.log("Reschedule:", typeof appointment.patient === "string" ? appointment.patient : (appointment.patient as any)?.name);
//               }}
//             >
//               Reschedule
//             </Button> */}
// =======
//         <div className="grid grid-cols-2 gap-5">
//           <div>
//             {renderActionButtons()}
// >>>>>>> Stashed changes
//           </div>

// <<<<<<< Updated upstream
//         {(variant === "today" || variant === "upcoming") && (
//           <div className="flex gap-3">
//             {appointment.status === "pending" && (
//               <Button
//                 size="sm"
//                 variant="outline"
//                 className="flex-1 border-success text-success hover:bg-success/10"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   console.log("Confirm:", typeof appointment.patient === "string" ? appointment.patient : (appointment.patient as any)?.name);
//                 }}
//               >
//                 <CheckCircle className="mr-1 h-4 w-4" />
//                 Confirm
//               </Button>
//             )}

//             {appointment.status === "confirmed" && appointment.type === "video" && (
//               <Button
//                 size="sm"
//                 className="flex-1 bg-primary text-white"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   console.log("Join:", typeof appointment.patient === "string" ? appointment.patient : (appointment.patient as any)?.name);
//                 }}
//               >
//                 <Video className="mr-1 h-4 w-4" />
//                 Join
//               </Button>
//             )}

//             {appointment.status === "confirmed" &&
//               appointment.consultation_type === "video" && (
//                 <Button
//                   size="sm"
//                   className="flex-1 bg-primary text-white"
//                   onClick={() => {
//                     const url = appointment?.video_consultation?.join_url;
//                     if (url) {
//                       window.open(url, "_blank", "noopener,noreferrer");
//                     }
//                   }}

//                 >
//                   <Phone className="mr-1 h-4 w-4" />
//                   Call Now
//                 </Button>
//               )}

//             {/* <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" size="icon" className="h-9 w-9">
//                   <MoreVertical className="h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuItem>
//                   <User className="mr-2 h-4 w-4" />
//                   View Patient
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <FileText className="mr-2 h-4 w-4" />
//                   View Notes
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <Edit className="mr-2 h-4 w-4" />
//                   Edit Appointment
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem className="text-danger">
//                   <Trash2 className="mr-2 h-4 w-4" />
//                   Cancel Appointment
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu> */}
//           </div>
//         )}

//         {variant === "past" && (
//           <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
//             <Button
//               size="sm"
//               variant="outline"
//               className="flex-1"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 console.log("View details:", typeof appointment.patient === "string" ? appointment.patient : (appointment.patient as any)?.name);
//               }}
//             >
//               <FileText className="mr-1 h-4 w-4" />
//               View Details
//             </Button>

//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" size="icon" className="h-9 w-9">
//                   <MoreVertical className="h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuItem>
//                   <User className="mr-2 h-4 w-4" />
//                   View Patient
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <FileText className="mr-2 h-4 w-4" />
//                   View Notes
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         )}

//         <Button
//           onClick={(e) => {
//             e.stopPropagation();
//             const id = (appointment as any).appointment_id || appointment.id || (appointment as any)._id;
//             sessionStorage.setItem(`appointment_${id}`, JSON.stringify(appointment));
//             router.push(`/doctor/appointments/${id}`);
//           }}
//           className="[&]:py-2 max-w-32 mt-2"
//         >
//           View Details
//         </Button>

//         <span
//           className={`rounded-full px-3 py-1 text-xs font-medium ${appointment.type === "video" || appointment.type === "phone"
//             ? "bg-primary text-white"
//             : "bg-gray-100 text-gray-700"
//             }`}
//           onClick={(e) => e.stopPropagation()}
//         >
//           {appointment.type === "video" || appointment.type === "phone"
//             ? "Telehealth"
//             : "In-Person"}
//         </span>
// =======
//           <Button
//             onClick={(e) => {
//               e.stopPropagation();
//               handleViewDetails();
//             }}
//             variant="ghost"
//             className="w-full justify-between text-primary hover:bg-primary/5"
//             disabled={isLoading}
//           >
//             <span>View Details</span>
//             <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
//           </Button>
//         </div>
// >>>>>>> Stashed changes
//       </CardContent>
//     </Card>
//   );
// }


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