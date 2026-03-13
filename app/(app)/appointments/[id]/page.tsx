"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
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
    Wind
} from "lucide-react";
import { useEffect, useState } from "react";

export default function AppointmentDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [appointment, setAppointment] = useState<any>(null);

    
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        try {
            const data = searchParams.get('data');

            if (data) {
                try {
                    // Method 1: Try with decode first
                    const decodedData = decodeURIComponent(data);
                    const parsedData = JSON.parse(decodedData);
                    setAppointment(parsedData);
                } catch (decodeError) {
                    console.log("Decode failed, trying direct parse...");

                    try {
                        // Method 2: Try without decoding (already decoded)
                        const parsedData = JSON.parse(data);
                        setAppointment(parsedData);
                    } catch (parseError) {
                        console.log("Direct parse failed, trying fallback...");

                        // Method 3: Try sessionStorage as fallback
                        const id = Number(params.id);
                        const storedData = sessionStorage.getItem(`appointment_${id}`);
                        if (storedData) {
                            setAppointment(JSON.parse(storedData));
                        }
                    }
                }
            } else {
                // If no data in URL, try sessionStorage
                const id = Number(params.id);
                const storedData = sessionStorage.getItem(`appointment_${id}`);
                if (storedData) {
                    setAppointment(JSON.parse(storedData));
                }
            }
        } catch (error) {
            console.error("Error loading appointment:", error);
        } finally {
            setLoading(false);
        }
    }, [searchParams, params.id]);




    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "video": return <Video className="h-5 w-5" />;
            case "phone": return <Phone className="h-5 w-5" />;
            case "in-person": return <MapPin className="h-5 w-5" />;
            default: return <Calendar className="h-5 w-5" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "confirmed": return "bg-green-100 text-green-800 border-green-200";
            case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "completed": return "bg-blue-100 text-blue-800 border-blue-200";
            case "cancelled": return "bg-red-100 text-red-800 border-red-200";
            default: return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "confirmed": return <CheckCircle className="h-4 w-4" />;
            case "pending": return <Clock className="h-4 w-4" />;
            case "completed": return <CheckCircle className="h-4 w-4" />;
            case "cancelled": return <XCircle className="h-4 w-4" />;
            default: return <AlertCircle className="h-4 w-4" />;
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

    if (!appointment) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardContent className="pt-6 text-center">
                        <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Appointment Not Found</h2>
                        <p className="text-muted-foreground mb-6">The appointment you're looking for doesn't exist or has been removed.</p>
                        <Button
                            onClick={() => router.push('/appointments?tab=all')}
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

    return (
        <div className="container mx-auto px-4 w-full">
            {/* Header with Back Button and Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <Button
                    variant="ghost"
                    onClick={() => router.push('/appointments?tab=all')}
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

            {/* Patient Header Card */}
            <Card className="border-border mb-6 overflow-hidden py-0">
                <div className="h-2 bg-primary"></div>
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20 border-4 border-primary/20">
                                <AvatarImage
                                    src={appointment.avatar || "/default-avatar.png"}
                                    alt={appointment.patient}
                                    className="object-cover"
                                />
                                <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                                    {getInitials(appointment.patient)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className="text-3xl font-bold mb-1">{appointment.patient}</h1>
                                <div className="flex flex-wrap items-center gap-3">
                                    <Badge variant="outline" className="text-sm">
                                        {appointment.age} years, {appointment.gender}
                                    </Badge>
                                    <Badge className={getStatusColor(appointment.status)}>
                                        <span className="flex items-center gap-1">
                                            {getStatusIcon(appointment.status)}
                                            {appointment.status}
                                        </span>
                                    </Badge>
                                    <Badge variant="outline" className="text-sm">
                                        {appointment.type === "video" ? "Telehealth" :
                                            appointment.type === "phone" ? "Phone Call" : "In-Person"}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2">
                                <Phone className="h-4 w-4" />
                                Call Now
                            </Button>
                            <Button size="lg" variant="outline" className="gap-2">
                                <MessageSquare className="h-4 w-4" />
                                Message
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Main Content Tabs */}
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full max-w-5xl grid-cols-6 mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="medical">Medical History</TabsTrigger>
                    <TabsTrigger value="labs">Medical Reports</TabsTrigger>
                    <TabsTrigger value="history">Previous Appointments</TabsTrigger>
                    <TabsTrigger value="prescription">Prescription</TabsTrigger>
                    <TabsTrigger value="review">Review</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Appointment Details */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Chief Complaint */}
                            <Card className="border-border">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-primary" />
                                        Chief Complaint
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-foreground leading-relaxed">{appointment.chiefComplaint}</p>
                                </CardContent>
                            </Card>

                            {/* Appointment Details */}
                            <Card className="border-border">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-primary" />
                                        Appointment Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <p className="text-sm text-muted-foreground">Date</p>
                                            <p className="font-medium flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-primary" />
                                                {appointment.date}
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm text-muted-foreground">Time</p>
                                            <p className="font-medium flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-primary" />
                                                {appointment.time} ({appointment.duration})
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm text-muted-foreground">Type</p>
                                            <p className="font-medium flex items-center gap-2">
                                                {getTypeIcon(appointment.type)}
                                                <span className="capitalize">{appointment.type} Consultation</span>
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm text-muted-foreground">Status</p>
                                            <Badge className={getStatusColor(appointment.status)}>
                                                {appointment.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Notes */}
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
                        </div>

                        {/* Right Column - Patient Info */}
                        <div className="space-y-6">
                            {/* Vitals Card */}
                            <Card className="border-border">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Activity className="h-5 w-5 text-primary" />
                                        Recent Vitals
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-muted-foreground">Blood Pressure</p>
                                            <p className="font-medium text-lg">{appointment.vitals?.bloodPressure || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Heart Rate</p>
                                            <p className="font-medium text-lg">
                                                {appointment.vitals?.heartRate || 'N/A'}
                                                {appointment.vitals?.heartRate && <span className="text-sm text-muted-foreground"> bpm</span>}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Temperature</p>
                                            <p className="font-medium text-lg">{appointment.vitals?.temperature || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">O2 Saturation</p>
                                            <p className="font-medium text-lg">{appointment.vitals?.oxygenSaturation || 'N/A'}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Contact Info */}
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
                                        <span>{appointment.email || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                                        <span>{appointment.phone || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <span>Emergency: {appointment.emergencyContact || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span>{appointment.address || 'N/A'}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Medical History Tab */}
                <TabsContent value="medical" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="border-border">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-primary" />
                                    Medical History
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground">{appointment.medicalHistory || 'No medical history recorded'}</p>
                            </CardContent>
                        </Card>

                        <Card className="border-border">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Heart className="h-5 w-5 text-primary" />
                                    Current Medications
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {appointment.medications && appointment.medications.length > 0 ? (
                                    <div className="space-y-3">
                                        {appointment.medications.map((med: any, index: number) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                                                <div>
                                                    <p className="font-medium">{med.name}</p>
                                                    <p className="text-sm text-muted-foreground">{med.dosage} - {med.frequency}</p>
                                                </div>
                                                <p className="text-xs text-muted-foreground">Since {med.prescribed}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground">No medications recorded</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Lab Results Tab */}
                <TabsContent value="labs" className="space-y-6">
                    <Card className="border-border">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Activity className="h-5 w-5 text-primary" />
                                Recent Lab Results
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {appointment.labResults && appointment.labResults.length > 0 ? (
                                <div className="space-y-3">
                                    {appointment.labResults.map((lab: any, index: number) => (
                                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                            <div>
                                                <p className="font-medium">{lab.name}</p>
                                                <p className="text-sm text-muted-foreground">Date: {lab.date}</p>
                                                {lab.notes && <p className="text-sm text-warning mt-1">{lab.notes}</p>}
                                            </div>
                                            {/* <Badge className={lab.status === "normal" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                                                {lab.status}
                                            </Badge> */}
                                            <Button>Veiw Report</Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">No lab results available</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Appointment History Tab */}
                <TabsContent value="history" className="space-y-6">
                    <Card className="border-border">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-primary" />
                                Previous Appointments
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {appointment.appointments && appointment.appointments.length > 0 ? (
                                <div className="space-y-3">
                                    {appointment.appointments.map((apt: any, index: number) => (
                                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                            <div>
                                                <p className="font-medium">{apt.type}</p>
                                                <p className="text-sm text-muted-foreground">with {apt.doctor}</p>
                                            </div>
                                            <p className="text-sm font-medium">{apt.date}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">No previous appointments</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Prescription Tab */}
                {/* Prescription Tab */}
                <TabsContent value="prescription" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Current Prescription */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="border-border">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-primary" />
                                        Current Prescription
                                    </CardTitle>
                                    <CardDescription>
                                        {appointment.prescription?.prescribedDate
                                            ? `Prescribed on ${appointment.prescription.prescribedDate}`
                                            : "No prescription available"}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {appointment.prescription?.medications && appointment.prescription.medications.length > 0 ? (
                                            appointment.prescription.medications.map((med: any, index: number) => (
                                                <div key={index} className="border rounded-lg p-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <h3 className="font-semibold text-lg">{med.name}</h3>
                                                            <p className="text-sm text-muted-foreground">{med.dosage}</p>
                                                        </div>
                                                        <Badge variant="outline" className="bg-primary/5">Active</Badge>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4 mt-3">
                                                        <div>
                                                            <p className="text-xs text-muted-foreground">Frequency</p>
                                                            <p className="font-medium">{med.frequency}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-muted-foreground">Prescribed Date</p>
                                                            <p className="font-medium">{med.prescribed}</p>
                                                        </div>
                                                    </div>
                                                    {med.instructions && (
                                                        <div className="mt-3">
                                                            <p className="text-xs text-muted-foreground">Instructions</p>
                                                            <p className="text-sm">{med.instructions}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-8">
                                                <FileText className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
                                                <p className="text-muted-foreground">No prescription available for this appointment</p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column - Prescription Info & Actions */}
                        <div className="space-y-6">
                            {/* Prescription Summary */}
                            <Card className="border-border">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <ClipboardList className="h-5 w-5 text-primary" />
                                        Prescription Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Total Medications</span>
                                        <Badge variant="outline">{appointment.prescription?.medications?.length || 0}</Badge>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Prescribed By</span>
                                        <span className="text-sm font-medium">{appointment.prescription?.prescribedBy || "—"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Valid Until</span>
                                        <span className="text-sm font-medium">{appointment.prescription?.validUntil || "—"}</span>
                                    </div>
                                    <div className="pt-3">
                                        <Button
                                            className="w-full bg-primary hover:bg-primary/90 gap-2"
                                            disabled={!appointment.prescription}
                                        >
                                            <Download className="h-4 w-4" />
                                            Download Prescription
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Pharmacy Info */}
                            {appointment.prescription?.pharmacy && (
                                <Card className="border-border">
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <MapPin className="h-5 w-5 text-primary" />
                                            Preferred Pharmacy
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="font-medium">{appointment.prescription.pharmacy.name}</p>
                                        <p className="text-sm text-muted-foreground">{appointment.prescription.pharmacy.address}</p>
                                        <p className="text-sm text-muted-foreground mt-2">{appointment.prescription.pharmacy.phone}</p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </TabsContent>

                {/* Review Tab */}
                <TabsContent value="review" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Patient Review */}
                        <div className="lg:col-span-2 space-y-6">
                            {appointment.review ? (
                                <>
                                    <Card className="border-border">
                                        <CardHeader>
                                            <CardTitle className="text-lg flex items-center gap-2">
                                                <MessageSquare className="h-5 w-5 text-primary" />
                                                Patient Review
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {/* Rating */}
                                                <div className="flex items-center gap-2">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <svg
                                                            key={star}
                                                            className={`w-6 h-6 ${star <= appointment.review!.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                    <span className="ml-2 text-sm text-muted-foreground">
                                                        {appointment.review.rating}.0 out of 5
                                                    </span>
                                                </div>

                                                {/* Review Text */}
                                                <div className="bg-accent/30 p-4 rounded-lg">
                                                    <p className="text-foreground">{appointment.review.comment}</p>
                                                </div>

                                                {/* Review Metadata */}
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <span>Reviewed on {appointment.review.reviewedOn}</span>
                                                    <span>•</span>
                                                    <span>{appointment.review.isVerified ? 'Verified Patient' : 'Patient'}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Doctor's Response */}
                                    {appointment.review.doctorResponse && (
                                        <Card className="border-border">
                                            <CardHeader>
                                                <CardTitle className="text-lg flex items-center gap-2">
                                                    <User className="h-5 w-5 text-primary" />
                                                    Doctor's Response
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-3">
                                                    <div className="flex items-start gap-3">
                                                        <Avatar className="h-10 w-10">
                                                            <AvatarFallback className="bg-primary/10 text-primary">
                                                                {appointment.prescription?.prescribedBy?.split(' ').map((n: string) => n[0]).join('') || 'DR'}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex-1">
                                                            <p className="font-medium">{appointment.prescription?.prescribedBy || "Dr. Sarah Johnson"}</p>
                                                            <p className="text-sm text-muted-foreground">Responded on {appointment.review.doctorResponse.respondedOn}</p>
                                                            <div className="mt-2 bg-accent/30 p-3 rounded-lg">
                                                                <p className="text-sm">{appointment.review.doctorResponse.response}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}
                                </>
                            ) : (
                                <Card className="border-border">
                                    <CardContent className="text-center py-12">
                                        <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
                                        <p className="text-muted-foreground">No review available for this appointment</p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Right Column - Review Stats */}
                        <div className="space-y-6">
                            {/* Overall Rating */}
                            <Card className="border-border">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Activity className="h-5 w-5 text-primary" />
                                        Overall Rating
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <p className="text-5xl font-bold text-primary">
                                        {appointment.reviewStats?.averageRating.toFixed(1) || '4.0'}
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-1">out of 5</p>
                                    <div className="flex justify-center gap-1 mt-3">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <svg
                                                key={star}
                                                className={`w-5 h-5 ${star <= Math.round(appointment.reviewStats?.averageRating || 4)
                                                    ? 'text-yellow-400'
                                                    : 'text-gray-300'
                                                    }`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Rating Breakdown */}
                            <Card className="border-border">
                                <CardHeader>
                                    <CardTitle className="text-lg">Rating Breakdown</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {appointment.reviewStats ? (
                                        <>
                                            <div>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span>5 stars</span>
                                                    <span className="font-medium">{appointment.reviewStats.ratingBreakdown["5"]}%</span>
                                                </div>
                                                <div className="h-2 w-full bg-accent/30 rounded-full overflow-hidden">
                                                    <div className="h-full bg-primary rounded-full" style={{ width: `${appointment.reviewStats.ratingBreakdown["5"]}%` }} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span>4 stars</span>
                                                    <span className="font-medium">{appointment.reviewStats.ratingBreakdown["4"]}%</span>
                                                </div>
                                                <div className="h-2 w-full bg-accent/30 rounded-full overflow-hidden">
                                                    <div className="h-full bg-primary rounded-full" style={{ width: `${appointment.reviewStats.ratingBreakdown["4"]}%` }} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span>3 stars</span>
                                                    <span className="font-medium">{appointment.reviewStats.ratingBreakdown["3"]}%</span>
                                                </div>
                                                <div className="h-2 w-full bg-accent/30 rounded-full overflow-hidden">
                                                    <div className="h-full bg-primary rounded-full" style={{ width: `${appointment.reviewStats.ratingBreakdown["3"]}%` }} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span>2 stars</span>
                                                    <span className="font-medium">{appointment.reviewStats.ratingBreakdown["2"]}%</span>
                                                </div>
                                                <div className="h-2 w-full bg-accent/30 rounded-full overflow-hidden">
                                                    <div className="h-full bg-primary rounded-full" style={{ width: `${appointment.reviewStats.ratingBreakdown["2"]}%` }} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span>1 star</span>
                                                    <span className="font-medium">{appointment.reviewStats.ratingBreakdown["1"]}%</span>
                                                </div>
                                                <div className="h-2 w-full bg-accent/30 rounded-full overflow-hidden">
                                                    <div className="h-full bg-primary rounded-full" style={{ width: `${appointment.reviewStats.ratingBreakdown["1"]}%` }} />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-center text-muted-foreground py-4">No rating data available</p>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Quick Stats */}
                            <Card className="border-border">
                                <CardHeader>
                                    <CardTitle className="text-lg">Review Stats</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {appointment.reviewStats ? (
                                        <>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-muted-foreground">Total Reviews</span>
                                                <Badge variant="outline">{appointment.reviewStats.totalReviews}</Badge>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-muted-foreground">Would Recommend</span>
                                                <Badge className="bg-green-100 text-green-800">{appointment.reviewStats.wouldRecommend}%</Badge>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-muted-foreground">Response Rate</span>
                                                <Badge className="bg-primary/10 text-primary">{appointment.reviewStats.responseRate}%</Badge>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-muted-foreground">Avg. Response Time</span>
                                                <span className="text-sm font-medium">{appointment.reviewStats.avgResponseTime}</span>
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-center text-muted-foreground py-4">No stats available</p>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

// "use client"

// import { Suspense, useEffect, useState } from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { useRouter, useSearchParams } from "next/navigation"
// import {
//     Calendar,
//     Clock,
//     Video,
//     Phone,
//     MapPin,
//     Search,
//     Filter,
//     Plus,
//     MoreVertical,
//     CheckCircle,
//     Trash2,
//     FileText,
//     User,
//     ChevronLeft,
//     ChevronRight,
//     ChevronsLeft,
//     ChevronsRight,
//     Edit,
// } from "lucide-react"
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog"
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// interface Medication {
//     name: string
//     dosage: string
//     frequency: string
//     prescribed: string
// }

// interface Vitals {
//     bloodPressure: string
//     heartRate: string
//     temperature: string
//     respiratoryRate: string
//     oxygenSaturation?: string
//     weight?: string
//     height?: string
//     bmi?: string
// }

// interface LabResult {
//     name: string
//     date: string
//     status: string
//     notes?: string
// }

// interface AppointmentHistory {
//     date: string
//     type: string
//     doctor: string
// }

// interface Appointment {
//     id: number
//     patient: string
//     avatar: string
//     age: number
//     gender: string
//     date: string
//     time: string
//     duration: string
//     type: string
//     reason: string
//     status: string
//     notes?: string
//     email?: string
//     phone?: string
//     emergencyContact?: string
//     address?: string
//     chiefComplaint?: string
//     medicalHistory?: string
//     medications?: Medication[]
//     vitals?: Vitals
//     labResults?: LabResult[]
//     appointments?: AppointmentHistory[]
// }

// export default function AppointmentsPage() {
//     return (
//         <Suspense fallback={<div className="p-6">Loading appointments...</div>}>
//             <AppointmentsClient />
//         </Suspense>
//     )
// }

// function AppointmentsClient() {
//     const router = useRouter()
//     const searchParams = useSearchParams()

//     const [searchQuery, setSearchQuery] = useState("")
//     const [selectedFilter, setSelectedFilter] = useState("all")
//     const [selectedType, setSelectedType] = useState("all")
//     const [activeTab, setActiveTab] = useState("all")
//     const [currentPage, setCurrentPage] = useState(1)
//     const [pastPage, setPastPage] = useState(1)
//     const itemsPerPage = 9

//     useEffect(() => {
//         const tab = searchParams.get("tab")
//         if (tab) {
//             setActiveTab(tab)
//         }
//     }, [searchParams])

//     const appointments: Appointment[] = [
//         {
//             id: 1,
//             patient: "Michael Chen",
//             avatar: "",
//             age: 45,
//             gender: "Male",
//             date: "March 11, 2026",
//             time: "10:00 AM",
//             duration: "30 min",
//             type: "video",
//             reason:
//                 "Follow-up Consultation - Patient requested to discuss recent lab results",
//             status: "confirmed",
//             notes: "Patient requested to discuss recent lab results",
//             email: "michael.chen@email.com",
//             phone: "(555) 123-4567",
//             emergencyContact: "Lisa Chen (Wife) - (555) 123-4568",
//             address: "123 Main St, Anytown, CA 12345",
//             chiefComplaint:
//                 "Patient reports persistent headaches and elevated blood pressure readings at home. Wants to discuss medication adjustment and lifestyle changes.",
//             medicalHistory:
//                 "Hypertension diagnosed 5 years ago. Currently on Lisinopril 10mg daily. No known allergies. Family history of heart disease.",
//             medications: [
//                 {
//                     name: "Lisinopril",
//                     dosage: "10mg",
//                     frequency: "Once daily",
//                     prescribed: "2026-01-15",
//                 },
//                 {
//                     name: "Aspirin",
//                     dosage: "81mg",
//                     frequency: "Once daily",
//                     prescribed: "2026-01-15",
//                 },
//             ],
//             vitals: {
//                 bloodPressure: "128/82",
//                 heartRate: "72",
//                 temperature: "98.6°F",
//                 respiratoryRate: "16",
//                 oxygenSaturation: "98%",
//                 weight: "175 lbs",
//                 height: "5'10\"",
//                 bmi: "25.1",
//             },
//             labResults: [
//                 { name: "Complete Blood Count", date: "2026-03-10", status: "normal" },
//                 {
//                     name: "Lipid Panel",
//                     date: "2026-03-10",
//                     status: "abnormal",
//                     notes: "Cholesterol slightly elevated",
//                 },
//                 { name: "Thyroid Panel", date: "2026-03-10", status: "normal" },
//             ],
//             appointments: [
//                 { date: "2026-03-11", type: "Follow-up", doctor: "Dr. Sarah Johnson" },
//                 {
//                     date: "2026-02-15",
//                     type: "Regular Checkup",
//                     doctor: "Dr. Sarah Johnson",
//                 },
//                 {
//                     date: "2026-01-20",
//                     type: "Initial Consultation",
//                     doctor: "Dr. Sarah Johnson",
//                 },
//             ],
//         },
//         {
//             id: 2,
//             patient: "Emma Wilson",
//             avatar: "",
//             age: 32,
//             gender: "Female",
//             date: "March 11, 2026",
//             time: "11:30 AM",
//             duration: "45 min",
//             type: "phone",
//             reason:
//                 "Lab Results Discussion - Review blood test results and next steps",
//             status: "confirmed",
//             notes: "Review blood test results and next steps",
//             email: "emma.wilson@email.com",
//             phone: "(555) 234-5678",
//             emergencyContact: "John Wilson (Husband) - (555) 234-5679",
//             address: "456 Oak Ave, Anytown, CA 12345",
//             chiefComplaint:
//                 "Patient wants to discuss recent blood work results including cholesterol levels and thyroid function tests.",
//             medicalHistory:
//                 "Hypothyroidism on Synthroid 50mcg. Family history of high cholesterol. Allergic to penicillin.",
//             medications: [
//                 {
//                     name: "Synthroid",
//                     dosage: "50mcg",
//                     frequency: "Once daily",
//                     prescribed: "2025-11-20",
//                 },
//                 {
//                     name: "Vitamin D",
//                     dosage: "2000 IU",
//                     frequency: "Once daily",
//                     prescribed: "2025-11-20",
//                 },
//             ],
//             vitals: {
//                 bloodPressure: "118/76",
//                 heartRate: "68",
//                 temperature: "98.4°F",
//                 respiratoryRate: "14",
//                 oxygenSaturation: "99%",
//                 weight: "145 lbs",
//                 height: "5'6\"",
//                 bmi: "23.4",
//             },
//             labResults: [
//                 { name: "TSH", date: "2026-03-09", status: "normal" },
//                 {
//                     name: "Lipid Panel",
//                     date: "2026-03-09",
//                     status: "abnormal",
//                     notes: "LDL cholesterol high",
//                 },
//             ],
//             appointments: [
//                 {
//                     date: "2026-03-11",
//                     type: "Phone Consultation",
//                     doctor: "Dr. Sarah Johnson",
//                 },
//                 { date: "2026-02-10", type: "Follow-up", doctor: "Dr. Sarah Johnson" },
//                 {
//                     date: "2025-11-20",
//                     type: "Initial Visit",
//                     doctor: "Dr. Sarah Johnson",
//                 },
//             ],
//         },
//         {
//             id: 3,
//             patient: "James Rodriguez",
//             avatar: "",
//             age: 28,
//             gender: "Male",
//             date: "March 11, 2026",
//             time: "2:00 PM",
//             duration: "60 min",
//             type: "video",
//             reason:
//                 "Initial Consultation - New patient comprehensive assessment needed",
//             status: "pending",
//             notes: "New patient - comprehensive assessment needed",
//             email: "james.rodriguez@email.com",
//             phone: "(555) 345-6789",
//             emergencyContact: "Maria Rodriguez (Mother) - (555) 345-6790",
//             address: "789 Pine St, Anytown, CA 12345",
//             chiefComplaint:
//                 "New patient seeking comprehensive evaluation for ongoing fatigue and occasional chest discomfort.",
//             medicalHistory:
//                 "No significant past medical history. Occasional heartburn. No known allergies.",
//             medications: [],
//             vitals: {
//                 bloodPressure: "122/78",
//                 heartRate: "70",
//                 temperature: "98.4°F",
//                 respiratoryRate: "16",
//                 oxygenSaturation: "99%",
//                 weight: "165 lbs",
//                 height: "5'9\"",
//                 bmi: "24.3",
//             },
//             labResults: [],
//             appointments: [],
//         },
//         {
//             id: 4,
//             patient: "Sophia Lee",
//             avatar: "",
//             age: 56,
//             gender: "Female",
//             date: "March 11, 2026",
//             time: "3:30 PM",
//             duration: "30 min",
//             type: "video",
//             reason: "Prescription Renewal - Medication review for hypertension",
//             status: "confirmed",
//             notes: "Medication review for hypertension",
//             email: "sophia.lee@email.com",
//             phone: "(555) 456-7890",
//             emergencyContact: "David Lee (Husband) - (555) 456-7891",
//             address: "321 Cedar St, Anytown, CA 12345",
//             chiefComplaint:
//                 "Routine medication review for hypertension. Patient reports good blood pressure control with current medications.",
//             medicalHistory:
//                 "Hypertension for 8 years. Type 2 diabetes diagnosed 3 years ago. No known allergies.",
//             medications: [
//                 {
//                     name: "Lisinopril",
//                     dosage: "20mg",
//                     frequency: "Once daily",
//                     prescribed: "2026-02-01",
//                 },
//                 {
//                     name: "Metformin",
//                     dosage: "500mg",
//                     frequency: "Twice daily",
//                     prescribed: "2026-02-01",
//                 },
//             ],
//             vitals: {
//                 bloodPressure: "124/80",
//                 heartRate: "74",
//                 temperature: "98.2°F",
//                 respiratoryRate: "16",
//                 oxygenSaturation: "98%",
//                 weight: "160 lbs",
//                 height: "5'4\"",
//                 bmi: "27.5",
//             },
//             labResults: [
//                 { name: "HbA1c", date: "2026-03-05", status: "normal", notes: "6.2%" },
//             ],
//             appointments: [
//                 {
//                     date: "2026-03-11",
//                     type: "Medication Review",
//                     doctor: "Dr. Sarah Johnson",
//                 },
//             ],
//         },
//         {
//             id: 5,
//             patient: "David Park",
//             avatar: "",
//             age: 41,
//             gender: "Male",
//             date: "March 12, 2026",
//             time: "9:00 AM",
//             duration: "45 min",
//             type: "in-person",
//             reason: "Annual Physical - Complete physical examination required",
//             status: "confirmed",
//             notes: "Complete physical examination required",
//             email: "david.park@email.com",
//             phone: "(555) 567-8901",
//             emergencyContact: "Anna Park (Wife) - (555) 567-8902",
//             address: "654 Birch St, Anytown, CA 12345",
//             chiefComplaint:
//                 "Annual physical examination. No specific complaints but wants general health assessment.",
//             medicalHistory:
//                 "High cholesterol. Takes statin medication. No known allergies.",
//             medications: [
//                 {
//                     name: "Atorvastatin",
//                     dosage: "20mg",
//                     frequency: "Once daily",
//                     prescribed: "2025-10-15",
//                 },
//             ],
//             vitals: {
//                 bloodPressure: "130/84",
//                 heartRate: "72",
//                 temperature: "98.4°F",
//                 respiratoryRate: "16",
//                 oxygenSaturation: "98%",
//                 weight: "190 lbs",
//                 height: "5'11\"",
//                 bmi: "26.5",
//             },
//             labResults: [],
//             appointments: [],
//         },
//         {
//             id: 6,
//             patient: "Alice Johnson",
//             avatar: "",
//             age: 38,
//             gender: "Female",
//             date: "March 10, 2026",
//             time: "2:00 PM",
//             duration: "30 min",
//             type: "video",
//             reason: "Follow-up - Post-surgery follow-up healing well",
//             status: "completed",
//             notes: "Post-surgery follow-up - healing well",
//             email: "alice.johnson@email.com",
//             phone: "(555) 678-9012",
//             emergencyContact: "Mark Johnson (Husband) - (555) 678-9013",
//             address: "987 Elm St, Anytown, CA 12345",
//             chiefComplaint:
//                 "Follow-up after laparoscopic cholecystectomy performed 2 weeks ago. Reports good recovery with minimal pain.",
//             medicalHistory: "Gallstones. Surgery on 02/24/2026. No known allergies.",
//             medications: [
//                 {
//                     name: "Ibuprofen",
//                     dosage: "400mg",
//                     frequency: "As needed",
//                     prescribed: "2026-02-24",
//                 },
//             ],
//             vitals: {
//                 bloodPressure: "118/74",
//                 heartRate: "68",
//                 temperature: "98.2°F",
//                 respiratoryRate: "14",
//                 oxygenSaturation: "99%",
//                 weight: "155 lbs",
//                 height: "5'5\"",
//                 bmi: "25.8",
//             },
//             labResults: [],
//             appointments: [
//                 { date: "2026-02-24", type: "Surgery", doctor: "Dr. Williams" },
//                 { date: "2026-03-10", type: "Follow-up", doctor: "Dr. Sarah Johnson" },
//             ],
//         },
//         {
//             id: 7,
//             patient: "Robert Martinez",
//             avatar: "",
//             age: 52,
//             gender: "Male",
//             date: "March 9, 2026",
//             time: "11:00 AM",
//             duration: "30 min",
//             type: "video",
//             reason: "Consultation - Patient requested to reschedule",
//             status: "cancelled",
//             notes: "Patient requested to reschedule",
//             email: "robert.martinez@email.com",
//             phone: "(555) 789-0123",
//             emergencyContact: "Linda Martinez (Wife) - (555) 789-0124",
//             address: "147 Spruce St, Anytown, CA 12345",
//             chiefComplaint:
//                 "Initial consultation for back pain. Patient cancelled due to scheduling conflict.",
//             medicalHistory: "Chronic lower back pain. Occasional muscle spasms.",
//             medications: [
//                 {
//                     name: "Ibuprofen",
//                     dosage: "400mg",
//                     frequency: "As needed",
//                     prescribed: "2026-01-10",
//                 },
//             ],
//             vitals: {
//                 bloodPressure: "126/80",
//                 heartRate: "70",
//                 temperature: "98.4°F",
//                 respiratoryRate: "16",
//                 oxygenSaturation: "98%",
//                 weight: "185 lbs",
//                 height: "5'8\"",
//                 bmi: "28.1",
//             },
//             labResults: [],
//             appointments: [],
//         },
//         {
//             id: 8,
//             patient: "Sarah Johnson",
//             avatar: "",
//             age: 29,
//             gender: "Female",
//             date: "March 8, 2026",
//             time: "10:30 AM",
//             duration: "30 min",
//             type: "video",
//             reason: "General Checkup - Regular checkup all good",
//             status: "completed",
//             notes: "Regular checkup - all good",
//             email: "sarah.johnson2@email.com",
//             phone: "(555) 890-1234",
//             emergencyContact: "Tom Johnson (Father) - (555) 890-1235",
//             address: "258 Willow St, Anytown, CA 12345",
//             chiefComplaint:
//                 "Annual wellness visit. No active complaints. Feels healthy.",
//             medicalHistory:
//                 "No significant medical history. No medications. No known allergies.",
//             medications: [],
//             vitals: {
//                 bloodPressure: "114/72",
//                 heartRate: "66",
//                 temperature: "98.2°F",
//                 respiratoryRate: "14",
//                 oxygenSaturation: "99%",
//                 weight: "135 lbs",
//                 height: "5'6\"",
//                 bmi: "21.8",
//             },
//             labResults: [],
//             appointments: [],
//         },
//         {
//             id: 9,
//             patient: "Thomas Brown",
//             avatar: "",
//             age: 61,
//             gender: "Male",
//             date: "March 7, 2026",
//             time: "3:00 PM",
//             duration: "45 min",
//             type: "in-person",
//             reason: "Cardiology Follow-up - Blood pressure monitoring",
//             status: "completed",
//             notes: "Blood pressure monitoring",
//             email: "thomas.brown@email.com",
//             phone: "(555) 901-2345",
//             emergencyContact: "Mary Brown (Wife) - (555) 901-2346",
//             address: "369 Maple St, Anytown, CA 12345",
//             chiefComplaint:
//                 "Follow-up for hypertension. Home BP readings averaging 135/85. Wants to discuss medication adjustment.",
//             medicalHistory:
//                 "Hypertension for 12 years. High cholesterol. Takes Lisinopril and Atorvastatin.",
//             medications: [
//                 {
//                     name: "Lisinopril",
//                     dosage: "20mg",
//                     frequency: "Once daily",
//                     prescribed: "2025-12-01",
//                 },
//                 {
//                     name: "Atorvastatin",
//                     dosage: "40mg",
//                     frequency: "Once daily",
//                     prescribed: "2025-12-01",
//                 },
//             ],
//             vitals: {
//                 bloodPressure: "138/86",
//                 heartRate: "72",
//                 temperature: "98.2°F",
//                 respiratoryRate: "16",
//                 oxygenSaturation: "97%",
//                 weight: "210 lbs",
//                 height: "5'9\"",
//                 bmi: "31.0",
//             },
//             labResults: [
//                 {
//                     name: "Lipid Panel",
//                     date: "2026-03-05",
//                     status: "abnormal",
//                     notes: "LDL slightly elevated",
//                 },
//             ],
//             appointments: [
//                 {
//                     date: "2026-03-07",
//                     type: "Cardiology Follow-up",
//                     doctor: "Dr. Sarah Johnson",
//                 },
//                 {
//                     date: "2026-01-15",
//                     type: "Regular Checkup",
//                     doctor: "Dr. Sarah Johnson",
//                 },
//             ],
//         },
//         {
//             id: 10,
//             patient: "Lisa Garcia",
//             avatar: "",
//             age: 34,
//             gender: "Female",
//             date: "March 6, 2026",
//             time: "9:30 AM",
//             duration: "30 min",
//             type: "phone",
//             reason: "Medication Review - Patient cancelled due to emergency",
//             status: "cancelled",
//             notes: "Patient cancelled due to emergency",
//             email: "lisa.garcia@email.com",
//             phone: "(555) 012-3456",
//             emergencyContact: "Carlos Garcia (Husband) - (555) 012-3457",
//             address: "753 Oak St, Anytown, CA 12345",
//             chiefComplaint:
//                 "Medication review for anxiety. Appointment cancelled due to family emergency.",
//             medicalHistory: "Generalized anxiety disorder. Takes Sertraline.",
//             medications: [
//                 {
//                     name: "Sertraline",
//                     dosage: "50mg",
//                     frequency: "Once daily",
//                     prescribed: "2026-01-20",
//                 },
//             ],
//             vitals: {
//                 bloodPressure: "120/78",
//                 heartRate: "72",
//                 temperature: "98.4°F",
//                 respiratoryRate: "16",
//                 oxygenSaturation: "99%",
//                 weight: "140 lbs",
//                 height: "5'4\"",
//                 bmi: "24.0",
//             },
//             labResults: [],
//             appointments: [],
//         },
//         {
//             id: 11,
//             patient: "Kevin Zhang",
//             avatar: "",
//             age: 47,
//             gender: "Male",
//             date: "March 5, 2026",
//             time: "11:00 AM",
//             duration: "60 min",
//             type: "video",
//             reason: "New Patient Consultation - Initial assessment completed",
//             status: "completed",
//             notes: "Initial assessment completed",
//             email: "kevin.zhang@email.com",
//             phone: "(555) 123-4567",
//             emergencyContact: "Mei Zhang (Wife) - (555) 123-4568",
//             address: "159 Pine St, Anytown, CA 12345",
//             chiefComplaint:
//                 "New patient seeking evaluation for fatigue and occasional dizziness. Symptoms have been present for 3 months.",
//             medicalHistory:
//                 "No significant past medical history. Occasional heartburn. No known allergies.",
//             medications: [],
//             vitals: {
//                 bloodPressure: "118/76",
//                 heartRate: "68",
//                 temperature: "98.2°F",
//                 respiratoryRate: "14",
//                 oxygenSaturation: "99%",
//                 weight: "170 lbs",
//                 height: "5'10\"",
//                 bmi: "24.4",
//             },
//             labResults: [
//                 { name: "Complete Blood Count", date: "2026-03-05", status: "normal" },
//                 {
//                     name: "Comprehensive Metabolic Panel",
//                     date: "2026-03-05",
//                     status: "normal",
//                 },
//             ],
//             appointments: [
//                 {
//                     date: "2026-03-05",
//                     type: "New Patient Visit",
//                     doctor: "Dr. Sarah Johnson",
//                 },
//             ],
//         },
//         {
//             id: 12,
//             patient: "Maria Santos",
//             avatar: "",
//             age: 53,
//             gender: "Female",
//             date: "March 4, 2026",
//             time: "2:30 PM",
//             duration: "30 min",
//             type: "video",
//             reason: "Follow-up - Post-treatment review",
//             status: "completed",
//             notes: "Post-treatment review",
//             email: "maria.santos@email.com",
//             phone: "(555) 234-5678",
//             emergencyContact: "Jose Santos (Husband) - (555) 234-5679",
//             address: "753 Cedar St, Anytown, CA 12345",
//             chiefComplaint:
//                 "Follow-up after completing physical therapy for rotator cuff injury. Reports significant improvement in shoulder mobility and reduced pain.",
//             medicalHistory:
//                 "Rotator cuff injury diagnosed 3 months ago. Completed 8 weeks of PT. No known allergies.",
//             medications: [
//                 {
//                     name: "Naproxen",
//                     dosage: "220mg",
//                     frequency: "As needed",
//                     prescribed: "2025-12-10",
//                 },
//             ],
//             vitals: {
//                 bloodPressure: "122/78",
//                 heartRate: "70",
//                 temperature: "98.4°F",
//                 respiratoryRate: "16",
//                 oxygenSaturation: "99%",
//                 weight: "150 lbs",
//                 height: "5'3\"",
//                 bmi: "26.6",
//             },
//             labResults: [],
//             appointments: [
//                 {
//                     date: "2025-12-10",
//                     type: "Initial Consultation",
//                     doctor: "Dr. Sarah Johnson",
//                 },
//                 { date: "2026-03-04", type: "Follow-up", doctor: "Dr. Sarah Johnson" },
//             ],
//         },
//     ]

//     const getStatusColor = (status: string) => {
//         switch (status) {
//             case "confirmed":
//                 return "bg-success/10 text-success hover:bg-success/20"
//             case "pending":
//                 return "bg-warning/10 text-warning hover:bg-warning/20"
//             case "completed":
//                 return "bg-info/10 text-info hover:bg-info/20"
//             case "cancelled":
//                 return "bg-danger/10 text-danger hover:bg-danger/20"
//             default:
//                 return "bg-primary/10 text-primary hover:bg-primary/20"
//         }
//     }

//     const getTypeIcon = (type: string) => {
//         switch (type) {
//             case "video":
//                 return <Video className="h-4 w-4" />
//             case "phone":
//                 return <Phone className="h-4 w-4" />
//             case "in-person":
//                 return <MapPin className="h-4 w-4" />
//             default:
//                 return <Calendar className="h-4 w-4" />
//         }
//     }

//     const filteredAppointments = appointments.filter((apt) => {
//         const matchesSearch =
//             apt.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             apt.reason.toLowerCase().includes(searchQuery.toLowerCase())
//         const matchesFilter =
//             selectedFilter === "all" || apt.status === selectedFilter
//         return matchesSearch && matchesFilter
//     })

//     const upcomingAppointments = filteredAppointments.filter(
//         (apt) => apt.status === "confirmed" || apt.status === "pending"
//     )

//     const pastAppointments = filteredAppointments.filter(
//         (apt) => apt.status === "completed" || apt.status === "cancelled"
//     )

//     const todayAppointments = filteredAppointments.filter(
//         (apt) =>
//             apt.date === "March 11, 2026" &&
//             (apt.status === "confirmed" || apt.status === "pending")
//     )

//     const getFilteredAppointments = () => {
//         let filtered = filteredAppointments

//         if (selectedType === "in-person") {
//             filtered = filtered.filter((apt) => apt.type === "in-person")
//         } else if (selectedType === "telehealth") {
//             filtered = filtered.filter(
//                 (apt) => apt.type === "video" || apt.type === "phone"
//             )
//         }

//         return filtered
//     }

//     const filteredByType = getFilteredAppointments()
//     const totalAllPages = Math.ceil(filteredByType.length / itemsPerPage)
//     const totalPastPages = Math.ceil(pastAppointments.length / itemsPerPage)

//     const paginatedAll = filteredByType.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//     )

//     const paginatedPast = pastAppointments.slice(
//         (pastPage - 1) * itemsPerPage,
//         pastPage * itemsPerPage
//     )

//     const PaginationControls = ({
//         currentPage,
//         totalPages,
//         onPageChange,
//         totalItems,
//     }: {
//         currentPage: number
//         totalPages: number
//         onPageChange: (page: number) => void
//         totalItems: number
//     }) => {
//         if (totalPages <= 1) return null

//         return (
//             <div className="mt-6 flex items-center justify-between">
//                 <p className="text-sm text-muted-foreground">
//                     Showing{" "}
//                     <span className="font-medium">
//                         {(currentPage - 1) * itemsPerPage + 1}
//                     </span>{" "}
//                     to{" "}
//                     <span className="font-medium">
//                         {Math.min(currentPage * itemsPerPage, totalItems)}
//                     </span>{" "}
//                     of <span className="font-medium">{totalItems}</span> results
//                 </p>
//                 <div className="flex items-center gap-2">
//                     <Button
//                         variant="outline"
//                         size="icon"
//                         onClick={() => onPageChange(1)}
//                         disabled={currentPage === 1}
//                         className="h-8 w-8"
//                     >
//                         <ChevronsLeft className="h-4 w-4" />
//                     </Button>
//                     <Button
//                         variant="outline"
//                         size="icon"
//                         onClick={() => onPageChange(currentPage - 1)}
//                         disabled={currentPage === 1}
//                         className="h-8 w-8"
//                     >
//                         <ChevronLeft className="h-4 w-4" />
//                     </Button>
//                     <span className="min-w-[80px] text-center text-sm text-muted-foreground">
//                         Page {currentPage} of {totalPages}
//                     </span>
//                     <Button
//                         variant="outline"
//                         size="icon"
//                         onClick={() => onPageChange(currentPage + 1)}
//                         disabled={currentPage === totalPages}
//                         className="h-8 w-8"
//                     >
//                         <ChevronRight className="h-4 w-4" />
//                     </Button>
//                     <Button
//                         variant="outline"
//                         size="icon"
//                         onClick={() => onPageChange(totalPages)}
//                         disabled={currentPage === totalPages}
//                         className="h-8 w-8"
//                     >
//                         <ChevronsRight className="h-4 w-4" />
//                     </Button>
//                 </div>
//             </div>
//         )
//     }
//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//                 <div>
//                     <h1 className="mb-2 text-primary">Appointments</h1>
//                     <p className="text-muted-foreground">
//                         Manage all patient appointments
//                     </p>
//                 </div>
//                 <Dialog>
//                     <DialogTrigger asChild>
//                         <Button className="bg-primary hover:bg-primary/90">
//                             <Plus className="mr-2 h-4 w-4" />
//                             New Appointment
//                         </Button>
//                     </DialogTrigger>
//                     <DialogContent className="max-w-2xl">
//                         <DialogHeader>
//                             <DialogTitle>Create New Appointment</DialogTitle>
//                             <DialogDescription>
//                                 Schedule a new appointment for a patient
//                             </DialogDescription>
//                         </DialogHeader>
//                         <div className="grid gap-4 py-4">
//                             <div className="grid gap-4 md:grid-cols-2">
//                                 <div className="space-y-2">
//                                     <Label htmlFor="patient">Patient Name</Label>
//                                     <Input id="patient" placeholder="Search patient..." />
//                                 </div>
//                                 <div className="space-y-2">
//                                     <Label htmlFor="apt-type">Appointment Type</Label>
//                                     <Select>
//                                         <SelectTrigger id="apt-type">
//                                             <SelectValue placeholder="Select type" />
//                                         </SelectTrigger>
//                                         <SelectContent>
//                                             <SelectItem value="video">Video Consultation</SelectItem>
//                                             <SelectItem value="phone">Phone Call</SelectItem>
//                                             <SelectItem value="in-person">In-Person Visit</SelectItem>
//                                         </SelectContent>
//                                     </Select>
//                                 </div>
//                             </div>
//                             <div className="grid gap-4 md:grid-cols-2">
//                                 <div className="space-y-2">
//                                     <Label htmlFor="date">Date</Label>
//                                     <Input id="date" type="date" />
//                                 </div>
//                                 <div className="space-y-2">
//                                     <Label htmlFor="time">Time</Label>
//                                     <Input id="time" type="time" />
//                                 </div>
//                             </div>
//                             <div className="space-y-2">
//                                 <Label htmlFor="duration">Duration</Label>
//                                 <Select>
//                                     <SelectTrigger id="duration">
//                                         <SelectValue placeholder="Select duration" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value="15">15 minutes</SelectItem>
//                                         <SelectItem value="30">30 minutes</SelectItem>
//                                         <SelectItem value="45">45 minutes</SelectItem>
//                                         <SelectItem value="60">60 minutes</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </div>
//                             <div className="space-y-2">
//                                 <Label htmlFor="reason">Reason for Visit</Label>
//                                 <Input id="reason" placeholder="e.g., Follow-up consultation" />
//                             </div>
//                             <div className="space-y-2">
//                                 <Label htmlFor="notes">Notes (Optional)</Label>
//                                 <Textarea
//                                     id="notes"
//                                     placeholder="Add any additional notes..."
//                                     rows={3}
//                                     className="resize-none"
//                                 />
//                             </div>
//                         </div>
//                         <DialogFooter>
//                             <Button variant="outline">Cancel</Button>
//                             <Button className="bg-primary hover:bg-primary/90">
//                                 Schedule Appointment
//                             </Button>
//                         </DialogFooter>
//                     </DialogContent>
//                 </Dialog>
//             </div>

//             {/* Stats */}
//             {/* <div className="grid gap-4 md:grid-cols-4">
//         {stats.map((stat) => (
//           <Card key={stat.label} className="border-border">
//             <CardContent className="pt-6">
//               <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
//               <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div> */}

//             {/* Filters */}
//             <Card className="border-border">
//                 <CardContent className="pt-6">
//                     <div className="flex flex-col gap-4 md:flex-row">
//                         <div className="flex-1">
//                             <div className="relative">
//                                 <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                                 <Input
//                                     placeholder="Search by patient name or reason..."
//                                     value={searchQuery}
//                                     onChange={(e) => setSearchQuery(e.target.value)}
//                                     className="pl-9"
//                                 />
//                             </div>
//                         </div>
//                         <div className="flex gap-2">
//                             <Select value={selectedFilter} onValueChange={setSelectedFilter}>
//                                 <SelectTrigger className="w-[180px]">
//                                     <Filter className="mr-2 h-4 w-4" />
//                                     <SelectValue placeholder="Filter by status" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="all">All Status</SelectItem>
//                                     <SelectItem value="confirmed">Confirmed</SelectItem>
//                                     <SelectItem value="pending">Pending</SelectItem>
//                                     <SelectItem value="completed">Completed</SelectItem>
//                                     <SelectItem value="cancelled">Cancelled</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         </div>
//                     </div>
//                 </CardContent>
//             </Card>

//             {/* Tabs */}
//             <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//                 <TabsList>
//                     <TabsTrigger value="past">Past</TabsTrigger>
//                     <TabsTrigger value="today">Today</TabsTrigger>
//                     <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
//                     <TabsTrigger value="all">All Appointments</TabsTrigger>
//                 </TabsList>

//                 {/* All Appointments Tab */}
//                 <TabsContent value="all" className="mt-6 space-y-6">
//                     {/* Add useRouter at top of component */}
//                     {/* const router = useRouter(); */}
//                     {/* Filter Pills Container */}
//                     <div className="mb-6 flex items-center justify-end">
//                         <div className="inline-flex items-center rounded-full bg-muted p-1">
//                             <Button
//                                 size="sm"
//                                 className={`rounded-full px-4 ${selectedType === "all"
//                                     ? "bg-white text-foreground shadow"
//                                     : "bg-transparent text-muted-foreground hover:bg-white/50"
//                                     }`}
//                                 onClick={() => {
//                                     setSelectedType("all")
//                                     setCurrentPage(1)
//                                 }}
//                             >
//                                 All Type
//                             </Button>

//                             <Button
//                                 size="sm"
//                                 variant="ghost"
//                                 className={`rounded-full px-4 ${selectedType === "in-person"
//                                     ? "bg-white text-foreground shadow"
//                                     : "text-muted-foreground hover:bg-white/50"
//                                     }`}
//                                 onClick={() => {
//                                     setSelectedType("in-person")
//                                     setCurrentPage(1)
//                                 }}
//                             >
//                                 In-Person
//                             </Button>

//                             <Button
//                                 size="sm"
//                                 variant="ghost"
//                                 className={`rounded-full px-4 ${selectedType === "telehealth"
//                                     ? "bg-white text-foreground shadow"
//                                     : "text-muted-foreground hover:bg-white/50"
//                                     }`}
//                                 onClick={() => {
//                                     setSelectedType("telehealth")
//                                     setCurrentPage(1)
//                                 }}
//                             >
//                                 Telehealth
//                             </Button>
//                         </div>
//                     </div>

//                     {/* Cards Grid - 3 columns */}
//                     <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
//                         {paginatedAll.map((appointment) => (
//                             <Card
//                                 key={appointment.id}
//                                 className="cursor-pointer rounded-xl border border-gray-200 transition hover:border-primary/50 hover:shadow-md"
//                                 onClick={() => {
//                                     try {
//                                         // ✅ Proper encoding
//                                         const dataString = encodeURIComponent(
//                                             JSON.stringify(appointment)
//                                         )
//                                         router.push(
//                                             `/appointments/${appointment.id}?data=${dataString}`
//                                         )
//                                     } catch (error) {
//                                         console.error("Error encoding data:", error)
//                                         // Fallback - just go to ID
//                                         router.push(`/appointments/${appointment.id}`)
//                                     }
//                                 }}
//                             >
//                                 <CardContent className="p-5">
//                                     {/* Header */}
//                                     <div className="mb-4 flex items-start justify-between">
//                                         {/* Avatar + Info */}
//                                         <div className="flex items-center gap-3">
//                                             <img
//                                                 src={appointment.avatar || "/placeholder-avatar.png"}
//                                                 className="h-10 w-10 rounded-full object-cover"
//                                                 alt={appointment.patient}
//                                             />
//                                             <div>
//                                                 <h3 className="font-semibold text-primary">
//                                                     {appointment.patient}
//                                                 </h3>
//                                                 <p className="text-sm text-muted-foreground">
//                                                     {appointment.age} years, {appointment.gender}
//                                                 </p>
//                                             </div>
//                                         </div>

//                                         {/* Badge - Prevent card click when clicking badge */}
//                                         <span
//                                             className={`rounded-full px-3 py-1 text-xs font-medium ${appointment.type === "video" ||
//                                                 appointment.type === "phone"
//                                                 ? "bg-primary text-white"
//                                                 : "bg-gray-100 text-gray-700"
//                                                 }`}
//                                             onClick={(e) => e.stopPropagation()} // ✅ Prevent card click
//                                         >
//                                             {appointment.type === "video" ||
//                                                 appointment.type === "phone"
//                                                 ? "Telehealth"
//                                                 : "In-Person"}
//                                         </span>
//                                     </div>

//                                     {/* Date + Time */}
//                                     <div className="mb-4 space-y-1 text-sm text-gray-600">
//                                         <div className="flex items-center gap-2">
//                                             <Calendar className="h-4 w-4" />
//                                             {appointment.date}
//                                         </div>
//                                         <div className="flex items-center gap-2">
//                                             <Clock className="h-4 w-4" />
//                                             {appointment.time}
//                                         </div>
//                                     </div>

//                                     <div className="my-3 border-t border-gray-200"></div>

//                                     {/* Complaint */}
//                                     <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-gray-700">
//                                         <span className="font-medium text-gray-900">
//                                             Chief Complaint:
//                                         </span>{" "}
//                                         {appointment.reason}
//                                     </p>

//                                     {/* Buttons - Prevent card click when clicking buttons */}
//                                     <div
//                                         className="flex gap-3"
//                                         onClick={(e) => e.stopPropagation()}
//                                     >
//                                         {" "}
//                                         {/* ✅ Prevent card click */}
//                                         <Button
//                                             size="sm"
//                                             className="flex-1 bg-primary text-white"
//                                             onClick={(e) => {
//                                                 e.stopPropagation()
//                                                 // Add your call now logic here
//                                                 console.log("Call now:", appointment.patient)
//                                             }}
//                                         >
//                                             Call Now
//                                         </Button>
//                                         <Button
//                                             size="sm"
//                                             variant="outline"
//                                             className="flex-1 border-gray-300"
//                                             onClick={(e) => {
//                                                 e.stopPropagation()
//                                                 // Add your reschedule logic here
//                                                 console.log("Reschedule:", appointment.patient)
//                                             }}
//                                         >
//                                             Reschedule
//                                         </Button>
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                         ))}
//                     </div>

//                     {/* Pagination */}
//                     {filteredByType.length > itemsPerPage && (
//                         <div className="mt-8">
//                             <PaginationControls
//                                 currentPage={currentPage}
//                                 totalPages={totalAllPages}
//                                 onPageChange={setCurrentPage}
//                                 totalItems={filteredByType.length}
//                             />
//                         </div>
//                     )}
//                 </TabsContent>

//                 {/* Today */}
//                 <TabsContent value="today" className="mt-6 space-y-4">
//                     {todayAppointments.length === 0 ? (
//                         <Card className="border-border">
//                             <CardContent className="flex flex-col items-center justify-center py-12 text-center">
//                                 <Calendar className="mb-3 h-12 w-12 text-muted-foreground/40" />
//                                 <p className="mb-1 font-medium">No appointments for today</p>
//                                 <p className="text-sm text-muted-foreground">
//                                     Your schedule is clear
//                                 </p>
//                             </CardContent>
//                         </Card>
//                     ) : (
//                         todayAppointments.map((appointment) => (
//                             <Card
//                                 key={appointment.id}
//                                 className="border-border transition-colors hover:border-primary/20"
//                             >
//                                 <CardContent className="pt-6">
//                                     <div className="flex flex-col gap-4 md:flex-row md:items-center">
//                                         <div className="flex flex-1 items-center gap-4">
//                                             <Avatar className="h-12 w-12">
//                                                 <AvatarImage
//                                                     src={appointment.avatar}
//                                                     alt={appointment.patient}
//                                                 />
//                                                 <AvatarFallback className="bg-primary/10 text-primary">
//                                                     {appointment.patient
//                                                         .split(" ")
//                                                         .map((n) => n[0])
//                                                         .join("")}
//                                                 </AvatarFallback>
//                                             </Avatar>
//                                             <div className="flex-1">
//                                                 <h4 className="mb-1 font-semibold">
//                                                     {appointment.patient}
//                                                 </h4>
//                                                 <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
//                                                     <span>
//                                                         {appointment.age}y, {appointment.gender}
//                                                     </span>
//                                                     <span>•</span>
//                                                     <span>{appointment.reason}</span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="flex items-center gap-6">
//                                             <div className="min-w-[120px] text-center">
//                                                 <div className="flex items-center gap-2 text-sm font-medium">
//                                                     <Clock className="h-3 w-3" />
//                                                     <span>{appointment.time}</span>
//                                                     <span className="text-muted-foreground">
//                                                         ({appointment.duration})
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <div className="flex min-w-[120px] flex-col gap-2">
//                                                 <div className="flex items-center gap-2">
//                                                     <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
//                                                         {getTypeIcon(appointment.type)}
//                                                     </div>
//                                                     <span className="text-sm capitalize">
//                                                         {appointment.type}
//                                                     </span>
//                                                 </div>
//                                                 <Badge className={getStatusColor(appointment.status)}>
//                                                     {appointment.status}
//                                                 </Badge>
//                                             </div>
//                                             <div className="flex items-center gap-2">
//                                                 {appointment.status === "confirmed" &&
//                                                     appointment.type === "video" && (
//                                                         <Button
//                                                             size="sm"
//                                                             className="bg-primary hover:bg-primary/90"
//                                                         >
//                                                             <Video className="mr-1 h-4 w-4" />
//                                                             Join
//                                                         </Button>
//                                                     )}
//                                                 <DropdownMenu>
//                                                     <DropdownMenuTrigger asChild>
//                                                         <Button variant="ghost" size="icon">
//                                                             <MoreVertical className="h-4 w-4" />
//                                                         </Button>
//                                                     </DropdownMenuTrigger>
//                                                     <DropdownMenuContent align="end">
//                                                         <DropdownMenuItem>
//                                                             <User className="mr-2 h-4 w-4" />
//                                                             View Patient
//                                                         </DropdownMenuItem>
//                                                         <DropdownMenuItem>
//                                                             <FileText className="mr-2 h-4 w-4" />
//                                                             View Notes
//                                                         </DropdownMenuItem>
//                                                         <DropdownMenuItem>
//                                                             <Edit className="mr-2 h-4 w-4" />
//                                                             Edit Appointment
//                                                         </DropdownMenuItem>
//                                                         <DropdownMenuSeparator />
//                                                         <DropdownMenuItem className="text-danger">
//                                                             <Trash2 className="mr-2 h-4 w-4" />
//                                                             Cancel Appointment
//                                                         </DropdownMenuItem>
//                                                     </DropdownMenuContent>
//                                                 </DropdownMenu>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     {appointment.notes && (
//                                         <div className="mt-4 rounded-lg bg-accent/30 p-3">
//                                             <p className="text-sm text-muted-foreground">
//                                                 <span className="font-medium text-foreground">
//                                                     Notes:
//                                                 </span>{" "}
//                                                 {appointment.notes}
//                                             </p>
//                                         </div>
//                                     )}
//                                 </CardContent>
//                             </Card>
//                         ))
//                     )}
//                 </TabsContent>

//                 {/* Upcoming */}
//                 <TabsContent value="upcoming" className="mt-6 space-y-4">
//                     {upcomingAppointments.length === 0 ? (
//                         <Card className="border-border">
//                             <CardContent className="flex flex-col items-center justify-center py-12 text-center">
//                                 <Calendar className="mb-3 h-12 w-12 text-muted-foreground/40" />
//                                 <p className="mb-1 font-medium">No upcoming appointments</p>
//                                 <p className="text-sm text-muted-foreground">
//                                     Schedule new appointments to get started
//                                 </p>
//                             </CardContent>
//                         </Card>
//                     ) : (
//                         upcomingAppointments.map((appointment) => (
//                             <Card
//                                 key={appointment.id}
//                                 className="border-border transition-colors hover:border-primary/20"
//                             >
//                                 <CardContent className="pt-6">
//                                     <div className="flex flex-col gap-4 md:flex-row md:items-center">
//                                         <div className="flex flex-1 items-center gap-4">
//                                             <Avatar className="h-12 w-12">
//                                                 <AvatarImage
//                                                     src={appointment.avatar}
//                                                     alt={appointment.patient}
//                                                 />
//                                                 <AvatarFallback className="bg-primary/10 text-primary">
//                                                     {appointment.patient
//                                                         .split(" ")
//                                                         .map((n) => n[0])
//                                                         .join("")}
//                                                 </AvatarFallback>
//                                             </Avatar>
//                                             <div className="flex-1">
//                                                 <h4 className="mb-1 font-semibold">
//                                                     {appointment.patient}
//                                                 </h4>
//                                                 <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
//                                                     <span>
//                                                         {appointment.age}y, {appointment.gender}
//                                                     </span>
//                                                     <span>•</span>
//                                                     <span>{appointment.reason}</span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="flex items-center gap-6">
//                                             <div className="min-w-[120px] text-center">
//                                                 <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
//                                                     <Calendar className="h-3 w-3" />
//                                                     <span>{appointment.date}</span>
//                                                 </div>
//                                                 <div className="flex items-center gap-2 text-sm font-medium">
//                                                     <Clock className="h-3 w-3" />
//                                                     <span>{appointment.time}</span>
//                                                     <span className="text-muted-foreground">
//                                                         ({appointment.duration})
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <div className="flex min-w-[120px] flex-col gap-2">
//                                                 <div className="flex items-center gap-2">
//                                                     <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
//                                                         {getTypeIcon(appointment.type)}
//                                                     </div>
//                                                     <span className="text-sm capitalize">
//                                                         {appointment.type}
//                                                     </span>
//                                                 </div>
//                                                 <Badge className={getStatusColor(appointment.status)}>
//                                                     {appointment.status}
//                                                 </Badge>
//                                             </div>
//                                             <div className="flex items-center gap-2">
//                                                 {appointment.status === "pending" && (
//                                                     <div className="flex gap-2">
//                                                         <Button
//                                                             size="sm"
//                                                             variant="outline"
//                                                             className="text-success border-success hover:bg-success/10"
//                                                         >
//                                                             <CheckCircle className="mr-1 h-4 w-4" />
//                                                             Confirm
//                                                         </Button>
//                                                     </div>
//                                                 )}
//                                                 <DropdownMenu>
//                                                     <DropdownMenuTrigger asChild>
//                                                         <Button variant="ghost" size="icon">
//                                                             <MoreVertical className="h-4 w-4" />
//                                                         </Button>
//                                                     </DropdownMenuTrigger>
//                                                     <DropdownMenuContent align="end">
//                                                         <DropdownMenuItem>
//                                                             <User className="mr-2 h-4 w-4" />
//                                                             View Patient
//                                                         </DropdownMenuItem>
//                                                         <DropdownMenuItem>
//                                                             <FileText className="mr-2 h-4 w-4" />
//                                                             View Notes
//                                                         </DropdownMenuItem>
//                                                         <DropdownMenuItem>
//                                                             <Edit className="mr-2 h-4 w-4" />
//                                                             Edit Appointment
//                                                         </DropdownMenuItem>
//                                                         <DropdownMenuSeparator />
//                                                         <DropdownMenuItem className="text-danger">
//                                                             <Trash2 className="mr-2 h-4 w-4" />
//                                                             Cancel Appointment
//                                                         </DropdownMenuItem>
//                                                     </DropdownMenuContent>
//                                                 </DropdownMenu>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                         ))
//                     )}
//                 </TabsContent>

//                 {/* Past - WITH PAGINATION */}
//                 <TabsContent value="past" className="mt-6 space-y-4">
//                     {pastAppointments.length === 0 ? (
//                         <Card className="border-border">
//                             <CardContent className="flex flex-col items-center justify-center py-12 text-center">
//                                 <Calendar className="mb-3 h-12 w-12 text-muted-foreground/40" />
//                                 <p className="mb-1 font-medium">No past appointments</p>
//                                 <p className="text-sm text-muted-foreground">
//                                     Past appointments will appear here
//                                 </p>
//                             </CardContent>
//                         </Card>
//                     ) : (
//                         <>
//                             {paginatedPast.map((appointment) => (
//                                 <Card key={appointment.id} className="border-border opacity-75">
//                                     <CardContent className="pt-6">
//                                         <div className="flex flex-col gap-4 md:flex-row md:items-center">
//                                             <div className="flex flex-1 items-center gap-4">
//                                                 <Avatar className="h-12 w-12">
//                                                     <AvatarImage
//                                                         src={appointment.avatar}
//                                                         alt={appointment.patient}
//                                                     />
//                                                     <AvatarFallback className="bg-primary/10 text-primary">
//                                                         {appointment.patient
//                                                             .split(" ")
//                                                             .map((n) => n[0])
//                                                             .join("")}
//                                                     </AvatarFallback>
//                                                 </Avatar>
//                                                 <div className="flex-1">
//                                                     <h4 className="mb-1 font-semibold">
//                                                         {appointment.patient}
//                                                     </h4>
//                                                     <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
//                                                         <span>
//                                                             {appointment.age}y, {appointment.gender}
//                                                         </span>
//                                                         <span>•</span>
//                                                         <span>{appointment.reason}</span>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="flex items-center gap-6">
//                                                 <div className="min-w-[120px] text-center">
//                                                     <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
//                                                         <Calendar className="h-3 w-3" />
//                                                         <span>{appointment.date}</span>
//                                                     </div>
//                                                     <div className="flex items-center gap-2 text-sm font-medium">
//                                                         <Clock className="h-3 w-3" />
//                                                         <span>{appointment.time}</span>
//                                                     </div>
//                                                 </div>
//                                                 <div className="flex min-w-[120px] flex-col gap-2">
//                                                     <div className="flex items-center gap-2">
//                                                         <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
//                                                             {getTypeIcon(appointment.type)}
//                                                         </div>
//                                                         <span className="text-sm capitalize">
//                                                             {appointment.type}
//                                                         </span>
//                                                     </div>
//                                                     <Badge className={getStatusColor(appointment.status)}>
//                                                         {appointment.status}
//                                                     </Badge>
//                                                 </div>
//                                                 <DropdownMenu>
//                                                     <DropdownMenuTrigger asChild>
//                                                         <Button variant="ghost" size="icon">
//                                                             <MoreVertical className="h-4 w-4" />
//                                                         </Button>
//                                                     </DropdownMenuTrigger>
//                                                     <DropdownMenuContent align="end">
//                                                         <DropdownMenuItem>
//                                                             <User className="mr-2 h-4 w-4" />
//                                                             View Patient
//                                                         </DropdownMenuItem>
//                                                         <DropdownMenuItem>
//                                                             <FileText className="mr-2 h-4 w-4" />
//                                                             View Notes
//                                                         </DropdownMenuItem>
//                                                     </DropdownMenuContent>
//                                                 </DropdownMenu>
//                                             </div>
//                                         </div>
//                                     </CardContent>
//                                 </Card>
//                             ))}

//                             {/* Pagination for Past Appointments */}
//                             <PaginationControls
//                                 currentPage={pastPage}
//                                 totalPages={totalPastPages}
//                                 onPageChange={setPastPage}
//                                 totalItems={pastAppointments.length}
//                             />
//                         </>
//                     )}
//                 </TabsContent>
//             </Tabs>
//         </div>
//     )
// }
