// components/patients/patients-columns.tsx
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Eye,
    Mail,
    Phone,
    Video,
    MoreVertical,
    Trash2,
    User,
} from "lucide-react";
import { Column } from "@/components/custom/data-table";
import { Patient } from "@/types/doctor/allPatients";

const getInitials = (name: string) => {
    if (!name || typeof name !== "string") return "NA";
    return name
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .join("")
        .toUpperCase();
};

export const getPatientColumns = (
    onViewDetails: (patient: Patient) => void,
    onSendEmail: (email: string) => void,
    onCallPatient: (phone: string) => void,
    onDelete: (patient: Patient) => void
): Column<Patient>[] => [
        {
            key: "id",
            header: "Patient ID",
            className: "font-medium w-25",
        },
        {
            key: "name",
            header: "Patient Name",
            cell: (patient) => (
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={patient.avatar} alt={patient.name} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {getInitials(patient.name)}
                        </AvatarFallback>
                    </Avatar>
                    <span>{patient.name}</span>
                </div>
            ),
        },
        {
            key: "email",
            header: "Email",
        },
        {
            key: "phone",
            header: "Phone Number",
        },
        {
            key: "lastConsultation",
            header: "Last Consultation",
        },
        {
            key: "consultationType",
            header: "Consultation Type",
            cell: (patient) => (
                <Badge
                    variant="outline"
                    className={
                        patient.consultationType === "In-Person"
                            ? "bg-purple-100 text-purple-800 border-purple-200 flex items-center gap-1 w-fit"
                            : "bg-blue-100 text-blue-800 border-blue-200 flex items-center gap-1 w-fit"
                    }
                >
                    {patient.consultationType === "In-Person" ? (
                        <>
                            <User className="h-3 w-3" />
                            <span>clinic-visit</span>
                        </>
                    ) : (
                        <>
                            <Video className="h-3 w-3" />
                            <span>video</span>
                        </>
                    )}
                </Badge>
            ),
        },
        {
            key: "appointments",
            header: "Total Appointments",
            cell: (patient) => (
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                        <Badge variant="outline" className="bg-green-50">
                            {patient.clinic_visit} clinic-visit
                        </Badge>
                        <Badge variant="outline" className="bg-blue-50">
                            {patient.video_consultation} video
                        </Badge>
                    </div>
                </div>
            ),
        },
        {
            key: "address",
            header: "Address",
            className: "max-w-50 truncate",
            cell: (patient) => <span title={patient.address}>{patient.address}</span>,
        },
        {
            key: "actions",
            header: "",
            className: "text-right",
            cell: (patient) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem onClick={() => onViewDetails(patient)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onSendEmail(patient.email)}>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onCallPatient(patient.phone)}>
                            <Phone className="mr-2 h-4 w-4" />
                            Call Patient
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onDelete(patient)} className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];