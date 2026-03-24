"use client";

import { useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CalendarRange } from "lucide-react";
import { DataTable } from "@/components/custom/data-table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useAllPatients } from "@/queries/doctor/useAllPatients";
import { getPatientColumns } from "./column";
import { Patient } from "@/types/doctor/allPatients";

export default function AllPatientsPage() {
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState<string>("all");
    const [dateRange, setDateRange] = useState<{
        from: Date | undefined;
        to: Date | undefined;
    }>({
        from: undefined,
        to: undefined,
    });

    const { data: apiResponse, isLoading, isError, error } = useAllPatients();

    // Transform API data to Patient type by grouping appointments by patient
    const patients = useMemo(() => {
        if (!apiResponse) return [];

        // Get the data array from response (could be apiResponse.data or apiResponse itself)
        const appointments = Array.isArray(apiResponse) ? apiResponse : apiResponse.data || [];

        if (!Array.isArray(appointments)) {
            console.error("Appointments is not an array:", appointments);
            return [];
        }

        // Group appointments by patient ID
        const patientMap = new Map();

        appointments.forEach((appointment: any) => {
            const patientData = appointment.patient;
            if (!patientData) return;

            const patientId = patientData.patient_id || patientData.id;
            const apppp = patientData.id;

            if (!patientMap.has(patientId)) {
                // Initialize new patient
                patientMap.set(patientId, {
                    id: patientId,
                    patientId: patientData.patient_id || `PT-${patientId.substring(0, 8)}`,
                    name: patientData.name || "Unknown",
                    email: patientData.email || "",
                    phone: patientData.phone || "",
                    appointments: [],
                    clinic_visit: 0,
                    video_consultation: 0,
                    address: patientData.address
                        ? `${patientData.address}, ${patientData.city || ''}, ${patientData.state || ''}`.replace(/,\s*$/, '').replace(/^,|,$/g, '')
                        : "-",
                    avatar: patientData.avatar,
                });
            }

            const patient = patientMap.get(patientId);

            // Add appointment to patient's appointments
            patient.appointments.push({
                appointment_id: appointment.appointment_id || appointment.id,
                date: appointment.appointment_date,
                type: appointment.consultation_type === "in-person" || appointment.consultation_type === "clinic-visit" ? "In-Person" : "Telehealth",
                status: appointment.status,
            });

            // Update counts
            if (appointment.consultation_type === "in-person" || appointment.consultation_type === "clinic-visit") {
                patient.clinic_visit++;
            } else if (appointment.consultation_type === "video") {
                patient.video_consultation++;
            }
        });

        // Process each patient to get last consultation info
        const processedPatients: Patient[] = Array.from(patientMap.values()).map((patient: any) => {
            // Sort appointments by date (newest first)
            const sortedAppointments = [...patient.appointments].sort(
                (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );

            const lastAppointment = sortedAppointments[0];

            const lastConsultationDate = lastAppointment
                ? new Date(lastAppointment.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                })
                : "No consultations";

            const consultationType = lastAppointment
                ? lastAppointment.type
                : "In-Person"; // Default

            return {
                id: patient.id,
                patientId: patient.patientId,
                appointment_id: lastAppointment?.appointment_id || "",
                name: patient.name,
                email: patient.email,
                phone: patient.phone,
                lastConsultation: lastConsultationDate,
                consultationType,
                clinic_visit: patient.clinic_visit,
                video_consultation: patient.video_consultation,
                address: patient.address,
                avatar: patient.avatar,
            };
        });
        return processedPatients;
    }, [apiResponse]);

    // Helper function to parse date string
    const parseDate = useCallback((dateStr: string): Date => {
        if (!dateStr || dateStr === "No consultations") return new Date(0);
        return new Date(dateStr);
    }, []);

    // Filter patients based on search, type, and date range
    const filteredPatients = useMemo(() => {
        return patients.filter((patient: Patient) => {
            const searchLower = searchQuery.toLowerCase();

            const matchesSearch =
                searchQuery === "" ||
                patient.name.toLowerCase().includes(searchLower) ||
                patient.email.toLowerCase().includes(searchLower) ||
                patient.phone.includes(searchQuery) ||
                patient.patientId.toLowerCase().includes(searchLower);

            // Updated filter logic for clinic-visit and video
            const matchesType = () => {
                if (selectedType === "all") return true;
                if (selectedType === "clinic-visit") {
                    return patient.consultationType === "In-Person";
                }
                if (selectedType === "video") {
                    return patient.consultationType === "Telehealth";
                }
                return true;
            };

            let matchesDate = true;
            if (dateRange.from || dateRange.to) {
                const patientDate = parseDate(patient.lastConsultation);

                // Skip date filtering if patient has no consultations
                if (patient.lastConsultation === "No consultations") {
                    matchesDate = false;
                } else if (dateRange.from && dateRange.to) {
                    matchesDate = patientDate >= dateRange.from && patientDate <= dateRange.to;
                } else if (dateRange.from) {
                    matchesDate = patientDate >= dateRange.from;
                } else if (dateRange.to) {
                    matchesDate = patientDate <= dateRange.to;
                }
            }

            return matchesSearch && matchesType() && matchesDate;
        });
    }, [patients, searchQuery, selectedType, dateRange, parseDate]);

    // Get date range text for display
    const getDateRangeText = useCallback(() => {
        if (dateRange.from && dateRange.to) {
            return `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`;
        } else if (dateRange.from) {
            return `From ${dateRange.from.toLocaleDateString()}`;
        } else if (dateRange.to) {
            return `Until ${dateRange.to.toLocaleDateString()}`;
        }
        return "Select date range";
    }, [dateRange]);

    // Action handlers
    const handleViewDetails = useCallback((patient: Patient) => {
        const appointmentID = patient.appointment_id;
        if (appointmentID) {
            router.push(`/doctor/appointments/${appointmentID}`);
        } else {
            console.error("No appointment ID found for patient", patient.id);
        }
    }, [router]);

    const handleSendEmail = useCallback((email: string) => {
        if (email) {
            window.location.href = `mailto:${email}`;
        }
    }, []);

    const handleCallPatient = useCallback((phone: string) => {
        if (phone) {
            window.location.href = `tel:${phone}`;
        }
    }, []);

    const handleDelete = useCallback((patient: Patient) => {
        // Implement delete logic here
        console.log("Delete patient:", patient);
        // You might want to show a confirmation dialog first
    }, []);

    // Get columns with action handlers
    const columns = useMemo(() =>
        getPatientColumns(handleViewDetails, handleSendEmail, handleCallPatient, handleDelete),
        [handleViewDetails, handleSendEmail, handleCallPatient, handleDelete]
    );

    // Updated filters configuration with clinic-visit and video
    const filters = [
        {
            key: "type",
            label: "Type",
            options: [
                { value: "clinic-visit", label: "Clinic Visit" },
                { value: "video", label: "Video Consultation" },
            ],
        },
    ];

    // Updated filter components
    const filterComponents = {
        type: (value: string) => (
            <Badge
                variant="outline"
                className={
                    value === "clinic-visit"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                }
            >
                {value === "clinic-visit" ? "Clinic Visit" : "Video"}
            </Badge>
        ),
    };

    // Date range filter component
    const DateRangeFilterComponent = () => (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-50 justify-start text-left font-normal">
                    <CalendarRange className="mr-2 h-4 w-4" />
                    {dateRange.from || dateRange.to ? (
                        <span>{getDateRangeText()}</span>
                    ) : (
                        <span className="text-muted-foreground">Patients Date Wise</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
                <CalendarComponent
                    mode="range"
                    selected={dateRange}
                    onSelect={(range) => setDateRange(range as any)}
                    numberOfMonths={2}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );

    // Handle filter changes - updated for new values
    const handleFilter = useCallback((key: string, value: string) => {
        if (key === "type") {
            setSelectedType(value);
        }
    }, []);

    // Handle clear filters
    const handleClearFilters = useCallback(() => {
        setSelectedType("all");
        setDateRange({ from: undefined, to: undefined });
        setSearchQuery("");
    }, []);

    // Updated active filters
    const activeFilters = {
        type: selectedType,
    };

    // Summary stats
    const summaryStats = useMemo(() => {
        const totalClinicVisit = patients.reduce((sum, p) => sum + (p.clinic_visit || 0), 0);
        const totalVideo = patients.reduce((sum, p) => sum + (p.video_consultation || 0), 0);

        return (
            <div className="absolute top-35 right-5 flex items-center gap-4 text-sm">
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    {totalClinicVisit} Clinic Visit
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {totalVideo} Video
                </Badge>
            </div>
        );
    }, [patients]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-2 text-muted-foreground">Loading patients...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                    <h3 className="font-semibold">Failed to load patients</h3>
                    <p className="text-sm mt-1">
                        {error instanceof Error ? error.message : "An error occurred while loading patients."}
                    </p>
                    <Button
                        variant="outline"
                        className="mt-3"
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }

    // Show empty state if no patients
    if (patients.length === 0 && !isLoading) {
        return (
            <div className="space-y-4">
                <Button onClick={() => router.back()} className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>
                <div className="text-center py-12">
                    <h3 className="text-lg font-semibold text-gray-900">No patients found</h3>
                    <p className="text-muted-foreground mt-2">No patient data is available at the moment.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <Button onClick={() => router.back()} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
            </Button>

            <DataTable
                title="All Patients"
                data={filteredPatients}
                columns={columns}
                filters={filters}
                customFilters={[
                    {
                        key: "dateRange",
                        component: <DateRangeFilterComponent />,
                    },
                ]}
                searchPlaceholder="Search by name, email, phone, or patient ID..."
                onSearch={setSearchQuery}
                onFilter={handleFilter}
                onClearFilters={handleClearFilters}
                activeFilters={activeFilters}
                filterComponents={filterComponents}
                getId={(patient) => patient.id}
                // onRowClick={handleViewDetails}
                onSelectionChange={(selectedIds) => console.log("Selected:", selectedIds)}
                summaryStats={summaryStats}
                itemsPerPage={10}
                showFilterRow={true}
            />
        </div>
    );
}