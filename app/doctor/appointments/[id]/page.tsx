"use client";

import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Calendar,
    Clock,
    Video,
    Phone,
    MapPin,
    ArrowLeft,
    Edit,
    FileText,
    User,
    Mail,
    Phone as PhoneIcon,
    Activity,
    Heart,
    Download,
    Share2,
    AlertCircle,
    CheckCircle,
    XCircle,
    MessageSquare,
    ClipboardList,
    Thermometer,
    Eye,
    ChevronDown,
    Droplet,
    Brain,
    IndianRupee,
} from "lucide-react";
import { useAppointmentDetail } from "@/queries/doctor/useAppointmentDetail";
import { useAuth } from "@/context/AuthContext"; // adjust path if your auth context path is different

export default function AppointmentDetailsPage() {

    const params = useParams();
    const router = useRouter();
    const { token } = useAuth();
    const appointmentId = Array.isArray(params.id) ? params.id[0] : params.id;

    const {
        data: appointment,
        isLoading: loading,
        isError,
    } = useAppointmentDetail(appointmentId || "", token || "");

    const getInitials = (value: any) => {
        const name =
            typeof value === "string"
                ? value
                : typeof value?.name === "string"
                    ? value.name
                    : "";

        if (!name.trim()) return "NA";

        return name
            .trim()
            .split(" ")
            .filter(Boolean)
            .map((n: string) => n[0])
            .join("")
            .toUpperCase();
    };

    const getTypeIcon = (type: string) => {
        switch ((type || "").toLowerCase()) {
            case "video":
                return <Video className="h-5 w-5" />;
            case "phone":
                return <Phone className="h-5 w-5" />;
            case "in-person":
            case "offline":
                return <MapPin className="h-5 w-5" />;
            default:
                return <Calendar className="h-5 w-5" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch ((status || "").toLowerCase()) {
            case "confirmed":
                return "bg-green-100 text-green-800 border-green-200";
            case "pending":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "completed":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "cancelled":
                return "bg-red-100 text-red-800 border-red-200";
            case "paid":
                return "bg-emerald-100 text-emerald-800 border-emerald-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getStatusIcon = (status: string) => {
        switch ((status || "").toLowerCase()) {
            case "confirmed":
                return <CheckCircle className="h-4 w-4" />;
            case "pending":
                return <Clock className="h-4 w-4" />;
            case "completed":
                return <CheckCircle className="h-4 w-4" />;
            case "cancelled":
                return <XCircle className="h-4 w-4" />;
            default:
                return <AlertCircle className="h-4 w-4" />;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading appointment details...</p>
                </div>
            </div>
        );
    }

    if (isError || !appointment) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardContent className="pt-6 text-center">
                        <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Appointment Not Found</h2>
                        <p className="text-muted-foreground mb-6">
                            Could not load this appointment. It may have been removed or the connection timed out.
                        </p>
                        <Button
                            onClick={() => router.push("/doctor/appointments")}
                            className="w-full"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Go to Appointments
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    console.log("....data : ", appointment);
    console.log("call_now:", appointment.call_now, "| can_start_consultation:", appointment.can_start_consultation, "| video_consultation:", appointment.video_consultation);

    const patient = appointment.patient || {};
    const doctor = appointment.doctor || {};
    const schedule = appointment.schedule || {};
    const payment = appointment.payment || {};

    const patientName = patient.name || "Unknown Patient";
    const patientAvatar = patient.avatar || "/default-avatar.png";
    const patientEmail = patient.email || "N/A";
    const patientPhone = patient.phone || "N/A";
    const patientAge = patient.age_formatted || (patient.age ? `${patient.age} Years` : "N/A");
    const patientGender = patient.gender_formatted || patient.gender || "N/A";

    // Appointment fields — works with both the full nested API format { schedule: { date_formatted, ... } }
    // and the flat format { appointment_date_formatted, appointment_time_formatted, ... }
    const appointmentStatus = appointment.status_label || appointment.status || "N/A";
    const appointmentDate = schedule.date_formatted || appointment.appointment_date_formatted || schedule.date || appointment.appointment_date || "N/A";
    const appointmentTime = schedule.time_formatted || appointment.appointment_time_formatted || schedule.time || appointment.appointment_time || "N/A";
    const consultationType = schedule.consultation_type_label || appointment.consultation_type_label || schedule.consultation_type || appointment.consultation_type || "N/A";
    const bookingType = schedule.booking_type || appointment.booking_type || "N/A";

    // Payment fields
    const consultationFee = payment.consultation_fee_formatted || appointment.fee_amount_formatted || (appointment.fee_amount ? `₹${appointment.fee_amount}` : null) || "N/A";
    const adminFee = payment.admin_fee_formatted || "N/A";
    const discount = payment.discount_formatted || "N/A";
    const totalPayment = payment.total_formatted || appointment.fee_amount_formatted || (appointment.fee_amount ? `₹${appointment.fee_amount}` : null) || "N/A";
    const paymentStatus = payment.status_label || payment.status || "N/A";
    const paymentMethod = payment.payment_method || "N/A";

    return (
        <div className="container mx-auto px-4 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <Button
                    variant="ghost"
                    // onClick={() => router.push("/doctor/appointments")}
                    onClick={() => router.back()}
                    className="w-fit"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Appointments
                </Button>

                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2">
                        <Share2 className="h-4 w-4" />
                        Share
                    </Button>
                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90 gap-2">
                        <Edit className="h-4 w-4" />
                        Edit
                    </Button>
                </div>
            </div>

            <Card className="border-border mb-6 overflow-hidden py-0">
                <div className="h-2 bg-primary"></div>
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20 border-4 border-primary/20">
                                <AvatarImage
                                    src={patientAvatar}
                                    alt={patientName}
                                    className="object-cover"
                                />
                                <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                                    {getInitials(patientName)}
                                </AvatarFallback>
                            </Avatar>

                            <div>
                                <h1 className="text-3xl font-bold mb-1">{patientName}</h1>
                                <div className="flex flex-wrap items-center gap-3">
                                    <Badge variant="outline" className="text-sm">
                                        {patientAge}, {patientGender}
                                    </Badge>

                                    <Badge className={getStatusColor(appointment.status || "")}>
                                        <span className="flex items-center gap-1">
                                            {getStatusIcon(appointment.status || "")}
                                            {appointmentStatus}
                                        </span>
                                    </Badge>

                                    <Badge variant="outline" className="text-sm">
                                        {consultationType}
                                    </Badge>

                                    <Badge variant="outline" className="text-sm">
                                        {bookingType}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            {/* Call Now / Join Consultation button */}
                            {appointment.call_now || appointment.join_url ? (
                                <Button
                                    size="lg"
                                    className="bg-primary hover:bg-primary/90 gap-2"
                                    onClick={() => {
                                        window.open(appointment.join_url, "_blank");
                                    }}
                                >
                                    <Video className="h-4 w-4" /> Join Consultation
                                </Button>
                            ) : (
                                <Button
                                    size="lg"
                                    className="bg-primary/50 gap-2 cursor-not-allowed"
                                    disabled
                                >
                                    {appointment.status_label}
                                </Button>
                            )}
                            <Button size="lg" variant="outline" className="gap-2">
                                <MessageSquare className="h-4 w-4" />
                                Message
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="overview" className="w-full">

                <TabsList className="w-full justify-start overflow-x-auto overflow-y-hidden">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="labs">Medical Reports</TabsTrigger>
                    <TabsTrigger value="history">Previous Appointments</TabsTrigger>
                    <TabsTrigger value="prescription">Prescription</TabsTrigger>
                    <TabsTrigger value="review">Review</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="border-border">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-primary" />
                                        Patient Problem / Chief Complaint
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-foreground leading-relaxed">
                                        {patient.problem || "No problem/complaint recorded"}
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-border">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-primary" />
                                        Appointment Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <p className="text-sm text-muted-foreground">Date</p>
                                            <p className="font-medium flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-primary" />
                                                {appointmentDate}
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-sm text-muted-foreground">Time</p>
                                            <p className="font-medium flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-primary" />
                                                {appointmentTime}
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-sm text-muted-foreground">Type</p>
                                            <p className="font-medium flex items-center gap-2">
                                                {getTypeIcon(schedule.consultation_type || appointment.consultation_type || "")}
                                                <span>{consultationType}</span>
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-sm text-muted-foreground">Status</p>
                                            <Badge className={getStatusColor(appointment.status || "")}>
                                                {appointmentStatus}
                                            </Badge>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-sm text-muted-foreground">Booking Type</p>
                                            <p className="font-medium">{bookingType}</p>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-sm text-muted-foreground">Can Reschedule</p>
                                            <p className="font-medium">
                                                {appointment.can_reschedule ? "Yes" : "No"}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {appointment.notes && (
                                <Card className="border-border">
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <ClipboardList className="h-5 w-5 text-primary" />
                                            Clinical Notes
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-foreground">{appointment.notes}</p>
                                    </CardContent>
                                </Card>
                            )}

                            <Card className="border-border">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <User className="h-5 w-5 text-primary" />
                                        Doctor Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-16 w-16">
                                            <AvatarImage src={doctor.avatar} alt={doctor.name} />
                                            <AvatarFallback>{getInitials(doctor.name)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-semibold text-lg">{doctor.name || "N/A"}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {doctor.department || "N/A"}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {doctor.years_experience || "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-6">

                            <Card className="border-border">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <User className="h-5 w-5 text-primary" />
                                        Contact Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span>{patientEmail}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                                        <span>{patientPhone}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Droplet className="h-4 w-4 text-muted-foreground" />
                                        <span>Blood Group: {patient.blood_group || "N/A"}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <span>Gender: {patientGender}</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-border">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <IndianRupee className="h-5 w-5 text-primary" />
                                        Payment Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Consultation Fee</span>
                                        <span className="font-medium">{consultationFee}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Admin Fee</span>
                                        <span className="font-medium">{adminFee}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Discount</span>
                                        <span className="font-medium">{discount}</span>
                                    </div>
                                    <div className="flex justify-between text-sm border-t pt-3">
                                        <span className="text-muted-foreground">Total</span>
                                        <span className="font-semibold">{totalPayment}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Payment Status</span>
                                        <Badge className={getStatusColor(payment.status || "")}>
                                            {paymentStatus}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Payment Method</span>
                                        <span className="font-medium uppercase">{paymentMethod}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="labs" className="space-y-6 w-full">
                    <div className="flex items-center justify-between w-full">
                        <h2 className="text-2xl font-semibold">Medical Reports</h2>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Download className="h-4 w-4" />
                            Download All
                        </Button>
                    </div>

                    {appointment.medical_reports && appointment.medical_reports.length > 0 ? (
                        <div className="space-y-4 w-full">
                            {appointment.medical_reports.map((report: any, index: number) => {
                                const isImage = report.file_url && /\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(report.file_url);
                                return (
                                    <Card key={report.id || index} className="border-border w-full overflow-hidden">
                                        {/* Header row */}
                                        <div
                                            className="p-5 cursor-pointer hover:bg-accent/30 transition-colors w-full"
                                            onClick={() => {
                                                const content = document.getElementById(`report-${index}`);
                                                if (content) content.classList.toggle("hidden");
                                            }}
                                        >
                                            <div className="flex items-start justify-between w-full">
                                                <div className="flex items-center gap-3 flex-1">
                                                    <div className="h-10 w-10 rounded-full flex items-center justify-center shrink-0 bg-blue-50">
                                                        <FileText className="h-5 w-5 text-blue-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <h3 className="text-base font-semibold">
                                                                {report.title || `Report ${index + 1}`}
                                                            </h3>
                                                            <Badge variant="secondary" className="text-xs">
                                                                {report.type_label || report.type || "Report"}
                                                            </Badge>
                                                            {report.status && (
                                                                <Badge className="text-xs bg-green-100 text-green-700 border border-green-200">
                                                                    {report.status}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                                                            <span className="flex items-center gap-1">
                                                                <Calendar className="h-3.5 w-3.5" />
                                                                {report.report_date_formatted || report.report_date || "N/A"}
                                                            </span>
                                                            <span className="text-muted-foreground/50">•</span>
                                                            <span className="flex items-center gap-1">
                                                                <User className="h-3.5 w-3.5" />
                                                                {report.doctor_name || "N/A"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                                            </div>
                                        </div>

                                        {/* Expandable body */}
                                        <div id={`report-${index}`} className="hidden border-t border-border w-full">
                                            <CardContent className="p-5 space-y-4 w-full">
                                                {isImage && (
                                                    <div className="rounded-lg overflow-hidden border border-border">
                                                        <img
                                                            src={report.file_url}
                                                            alt={report.title || "Report Preview"}
                                                            className="w-full max-h-64 object-cover"
                                                        />
                                                    </div>
                                                )}
                                                {report.file_url ? (
                                                    <Button
                                                        className="w-full gap-2"
                                                        onClick={() => window.open(report.file_url, "_blank")}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        View Full Report
                                                    </Button>
                                                ) : (
                                                    <p className="text-sm text-muted-foreground text-center py-2">
                                                        No file attached to this report.
                                                    </p>
                                                )}
                                            </CardContent>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    ) : (
                        <Card className="border-border w-full">
                            <CardContent className="flex flex-col items-center justify-center py-12 w-full">
                                <FileText className="h-12 w-12 text-muted-foreground/40 mb-3" />
                                <p className="font-medium mb-1">No medical reports available</p>
                                <p className="text-sm text-muted-foreground">
                                    Reports will appear here when uploaded
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                <TabsContent value="history" className="space-y-6">
                    <Card className="border-border">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-primary" />
                                Previous Appointments
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {appointment.previous_appointments && appointment.previous_appointments.length > 0 ? (
                                <div className="space-y-3">
                                    {appointment.previous_appointments.map((apt: any) => (
                                        <div
                                            key={apt.id}
                                            className="p-4 border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-all"
                                            onClick={() => {
                                                if (typeof window !== "undefined") {
                                                    sessionStorage.setItem(`appointment_${apt.id}`, JSON.stringify(apt));
                                                }
                                                router.push(`/doctor/appointments/${apt.id}`);
                                            }}
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                                        <p className="font-medium">{apt.title || "Consultation"}</p>
                                                        <Badge variant="secondary" className="text-xs">
                                                            {apt.consultation_type_label || apt.consultation_type || "N/A"}
                                                        </Badge>
                                                        <Badge className={`text-xs ${getStatusColor(apt.status || "")}`}>
                                                            {apt.status_label || apt.status || "N/A"}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="h-3.5 w-3.5" />
                                                            {apt.date || "N/A"}
                                                        </span>
                                                        <span className="text-muted-foreground/50">•</span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="h-3.5 w-3.5" />
                                                            {apt.time || "N/A"}
                                                        </span>
                                                    </div>
                                                    {apt.notes && (
                                                        <p className="text-sm text-muted-foreground mt-1 truncate">{apt.notes}</p>
                                                    )}
                                                </div>
                                                <ArrowLeft className="h-4 w-4 text-muted-foreground rotate-180 shrink-0 mt-1" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">No previous appointments</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="prescription" className="space-y-6">
                    {appointment.prescriptions ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-4">
                                {/* Header card */}
                                <Card className="border-border overflow-hidden">
                                    <div className="h-1.5 bg-primary" />
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                    <FileText className="h-6 w-6 text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold">Prescription</h3>
                                                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                                                        <User className="h-3.5 w-3.5" />
                                                        Dr. {appointment.prescriptions.doctor_name || "N/A"}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-muted-foreground">Date</p>
                                                <p className="text-sm font-medium flex items-center gap-1 mt-0.5">
                                                    <Calendar className="h-3.5 w-3.5 text-primary" />
                                                    {appointment.prescriptions.date || "N/A"}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Notes card */}
                                <Card className="border-border">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <ClipboardList className="h-4 w-4 text-primary" />
                                            Prescription Notes
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="bg-muted/40 rounded-lg p-4 border border-border">
                                            <p className="text-sm leading-relaxed text-foreground">
                                                {appointment.prescriptions.notes || "No notes provided."}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-4">
                                <Card className="border-border">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <ClipboardList className="h-4 w-4 text-primary" />
                                            Summary
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Prescribed By</span>
                                            <span className="font-medium">{appointment.prescriptions.doctor_name || "N/A"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Date</span>
                                            <span className="font-medium">{appointment.prescriptions.date || "N/A"}</span>
                                        </div>
                                        <div className="border-t pt-3">
                                            <Button className="w-full bg-primary hover:bg-primary/90 gap-2">
                                                <Download className="h-4 w-4" />
                                                Download Prescription
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    ) : (
                        <Card className="border-border">
                            <CardContent className="flex flex-col items-center justify-center py-16">
                                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                                    <FileText className="h-8 w-8 text-muted-foreground/50" />
                                </div>
                                <h3 className="text-lg font-semibold mb-1">No Prescription Available</h3>
                                <p className="text-sm text-muted-foreground text-center max-w-xs">
                                    No prescription has been issued for this appointment yet.
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                <TabsContent value="review" className="space-y-6">
                    <Card className="border-border">
                        <CardContent className="text-center py-12">
                            {appointment.can_add_review ? (
                                <>
                                    <MessageSquare className="h-12 w-12 mx-auto text-primary/50 mb-3" />
                                    <p className="font-medium mb-2">Review can be added for this appointment</p>
                                    <p className="text-muted-foreground">No review available yet</p>
                                </>
                            ) : (
                                <>
                                    <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
                                    <p className="text-muted-foreground">No review available for this appointment</p>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}