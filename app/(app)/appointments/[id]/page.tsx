// app/appointments/[id]/page.tsx
"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
            // Get data from URL query
            const data = searchParams.get('data');

            if (data) {
                try {
                    // Decode and parse the data
                    const decodedData = decodeURIComponent(data);
                    const parsedData = JSON.parse(decodedData);
                    setAppointment(parsedData);

                    // Also store in sessionStorage as backup
                    sessionStorage.setItem(`appointment_${parsedData.id}`, JSON.stringify(parsedData));
                } catch (parseError) {
                    console.error("Parse error:", parseError);

                    // Fallback: try without decoding
                    try {
                        const directParse = JSON.parse(data);
                        setAppointment(directParse);
                        sessionStorage.setItem(`appointment_${directParse.id}`, JSON.stringify(directParse));
                    } catch (e) {
                        // Try sessionStorage
                        const id = Number(params.id);
                        const storedData = sessionStorage.getItem(`appointment_${id}`);
                        if (storedData) {
                            setAppointment(JSON.parse(storedData));
                        }
                    }
                }
            } else {
                // Try sessionStorage
                const id = Number(params.id);
                const storedData = sessionStorage.getItem(`appointment_${id}`);
                if (storedData) {
                    setAppointment(JSON.parse(storedData));
                }
            }
        } catch (error) {
            console.error("Error in useEffect:", error);
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

            {/* Patient Header Card */}
            <Card className="border-border mb-6 overflow-hidden">
                <div className="h-2 bg-primary"></div>
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20 border-4 border-primary/20">
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
                <TabsList className="grid w-full max-w-2xl grid-cols-4 mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="medical">Medical History</TabsTrigger>
                    <TabsTrigger value="labs">Lab Results</TabsTrigger>
                    <TabsTrigger value="history">Appointments</TabsTrigger>
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
                                            <Badge className={lab.status === "normal" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                                                {lab.status}
                                            </Badge>
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
            </Tabs>
        </div>
    );
}