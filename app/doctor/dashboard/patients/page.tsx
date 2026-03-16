// app/patients/all/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    ArrowLeft,
    Eye,
    Mail,
    Phone,
    Video,
    MoreVertical,
    Trash2,
    User,
    CalendarRange,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Column, DataTable } from "@/components/custom/data-table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface Patient {
    id: string;
    patientId: string;
    name: string;
    email: string;
    phone: string;
    lastConsultation: string;
    consultationType: "In-Person" | "Telehealth";
    inPersonCount: number;
    telehealthCount: number;
    address: string;
    avatar?: string;
}

export default function AllPatientsPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState<string>("all");
    const [dateRange, setDateRange] = useState<{
        from: Date | undefined;
        to: Date | undefined;
    }>({
        from: undefined,
        to: undefined
    });

    const patients: Patient[] = [
        {
            id: "1",
            patientId: "PT-1001",
            name: "Aarav Sharma",
            email: "aarav.sharma@gmail.com",
            phone: "+91 98765 43210",
            lastConsultation: "Jun 14, 2026",
            consultationType: "In-Person",
            inPersonCount: 4,
            telehealthCount: 1,
            address: "Sector 62, Noida, Uttar Pradesh"
        },
        {
            id: "2",
            patientId: "PT-1002",
            name: "Priya Verma",
            email: "priya.verma@gmail.com",
            phone: "+91 91234 56789",
            lastConsultation: "Jun 12, 2026",
            consultationType: "Telehealth",
            inPersonCount: 1,
            telehealthCount: 3,
            address: "Indiranagar, Bengaluru, Karnataka"
        },
        {
            id: "3",
            patientId: "PT-1003",
            name: "Rahul Mehta",
            email: "rahul.mehta@gmail.com",
            phone: "+91 99887 66554",
            lastConsultation: "Jun 10, 2026",
            consultationType: "In-Person",
            inPersonCount: 2,
            telehealthCount: 1,
            address: "Vastrapur, Ahmedabad, Gujarat"
        },
        {
            id: "4",
            patientId: "PT-1004",
            name: "Sneha Kapoor",
            email: "sneha.kapoor@gmail.com",
            phone: "+91 98989 34343",
            lastConsultation: "Jun 09, 2026",
            consultationType: "Telehealth",
            inPersonCount: 1,
            telehealthCount: 2,
            address: "Rohini Sector 8, Delhi"
        },
        {
            id: "5",
            patientId: "PT-1005",
            name: "Rohan Desai",
            email: "rohan.desai@gmail.com",
            phone: "+91 97654 12345",
            lastConsultation: "Jun 08, 2026",
            consultationType: "In-Person",
            inPersonCount: 3,
            telehealthCount: 1,
            address: "Andheri West, Mumbai, Maharashtra"
        },
        {
            id: "6",
            patientId: "PT-1006",
            name: "Ananya Gupta",
            email: "ananya.gupta@gmail.com",
            phone: "+91 95544 33221",
            lastConsultation: "Jun 06, 2026",
            consultationType: "Telehealth",
            inPersonCount: 0,
            telehealthCount: 4,
            address: "Salt Lake City, Kolkata, West Bengal"
        },
        {
            id: "7",
            patientId: "PT-1007",
            name: "Vikram Singh",
            email: "vikram.singh@gmail.com",
            phone: "+91 94321 76543",
            lastConsultation: "Jun 05, 2026",
            consultationType: "In-Person",
            inPersonCount: 5,
            telehealthCount: 2,
            address: "Civil Lines, Jaipur, Rajasthan"
        },
        {
            id: "8",
            patientId: "PT-1008",
            name: "Neha Agarwal",
            email: "neha.agarwal@gmail.com",
            phone: "+91 93456 67890",
            lastConsultation: "Jun 03, 2026",
            consultationType: "Telehealth",
            inPersonCount: 1,
            telehealthCount: 3,
            address: "Banjara Hills, Hyderabad, Telangana"
        },
        {
            id: "9",
            patientId: "PT-1009",
            name: "Karan Malhotra",
            email: "karan.malhotra@gmail.com",
            phone: "+91 92345 78901",
            lastConsultation: "Jun 02, 2026",
            consultationType: "In-Person",
            inPersonCount: 2,
            telehealthCount: 0,
            address: "Model Town, Ludhiana, Punjab"
        },
        {
            id: "10",
            patientId: "PT-1010",
            name: "Pooja Nair",
            email: "pooja.nair@gmail.com",
            phone: "+91 98712 34567",
            lastConsultation: "May 30, 2026",
            consultationType: "Telehealth",
            inPersonCount: 0,
            telehealthCount: 5,
            address: "Kakkanad, Kochi, Kerala"
        },
        {
            id: "11",
            patientId: "PT-1011",
            name: "Aditya Kulkarni",
            email: "aditya.kulkarni@gmail.com",
            phone: "+91 98123 45678",
            lastConsultation: "May 28, 2026",
            consultationType: "In-Person",
            inPersonCount: 4,
            telehealthCount: 1,
            address: "Baner Road, Pune, Maharashtra"
        },
        {
            id: "12",
            patientId: "PT-1012",
            name: "Meera Iyer",
            email: "meera.iyer@gmail.com",
            phone: "+91 97654 78901",
            lastConsultation: "May 25, 2026",
            consultationType: "Telehealth",
            inPersonCount: 1,
            telehealthCount: 2,
            address: "Adyar, Chennai, Tamil Nadu"
        }
    ];
    // Helper function to parse date string
    const parseDate = (dateStr: string): Date => {
        return new Date(dateStr);
    };

    // Filter patients based on search, type, and date range
    const filteredPatients = patients.filter(patient => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = searchQuery === "" || (
            patient.name.toLowerCase().includes(searchLower) ||
            patient.email.toLowerCase().includes(searchLower) ||
            patient.phone.includes(searchQuery) ||
            patient.patientId.toLowerCase().includes(searchLower)
        );

        const matchesType = selectedType === "all" || patient.consultationType === selectedType;

        let matchesDate = true;
        if (dateRange.from || dateRange.to) {
            const patientDate = parseDate(patient.lastConsultation);
            if (dateRange.from && dateRange.to) {
                matchesDate = patientDate >= dateRange.from && patientDate <= dateRange.to;
            } else if (dateRange.from) {
                matchesDate = patientDate >= dateRange.from;
            } else if (dateRange.to) {
                matchesDate = patientDate <= dateRange.to;
            }
        }

        return matchesSearch && matchesType && matchesDate;
    });

    // Get initials for avatar
    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    // Format date range for display
    const getDateRangeText = () => {
        if (dateRange.from && dateRange.to) {
            return `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`;
        } else if (dateRange.from) {
            return `From ${dateRange.from.toLocaleDateString()}`;
        } else if (dateRange.to) {
            return `Until ${dateRange.to.toLocaleDateString()}`;
        }
        return "Select date range";
    };

    // Define columns for DataTable
    const columns: Column<Patient>[] = [
        {
            key: "patientId",
            header: "Patient ID",
            className: "font-medium w-25",
        },
        {
            key: "name",
            header: "Patient Name",
            cell: (patient) => (
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
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
                    className={patient.consultationType === "In-Person"
                        ? "bg-purple-100 text-purple-800 border-purple-200 flex items-center gap-1 w-fit"
                        : "bg-blue-100 text-blue-800 border-blue-200 flex items-center gap-1 w-fit"
                    }
                >
                    {patient.consultationType === "In-Person" ? (
                        <>
                            <User className="h-3 w-3" />
                            <span>In-Person</span>
                        </>
                    ) : (
                        <>
                            <Video className="h-3 w-3" />
                            <span>Telehealth</span>
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
                            {patient.inPersonCount} In-Person
                        </Badge>
                        <Badge variant="outline" className="bg-blue-50">
                            {patient.telehealthCount} Tele
                        </Badge>
                    </div>
                </div>
            ),
        },
        {
            key: "address",
            header: "Address",
            className: "max-w-50 truncate",
            cell: (patient) => (
                <span title={patient.address}>{patient.address}</span>
            ),
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
                        <DropdownMenuItem onClick={() => router.push(`/patients/${patient.id}`)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => window.location.href = `mailto:${patient.email}`}>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => window.location.href = `tel:${patient.phone}`}>
                            <Phone className="mr-2 h-4 w-4" />
                            Call Patient
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    // Define filters for DataTable
    const filters = [
        {
            key: "type",
            label: "Type",
            options: [
                { value: "In-Person", label: "In-Person" },
                { value: "Telehealth", label: "Telehealth" }
            ]
        }
    ];

    // ✅ Create custom date range filter component
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

    // Filter components for active display
    const filterComponents = {
        type: (value: string) => (
            <Badge variant="outline" className={value === "In-Person" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"}>
                {value}
            </Badge>
        )
    };

    // Handle filter changes
    const handleFilter = (key: string, value: string) => {
        if (key === 'type') setSelectedType(value);
    };

    // Handle clear filters
    const handleClearFilters = () => {
        setSelectedType("all");
        setDateRange({ from: undefined, to: undefined });
        setSearchQuery("");
    };

    // Active filters count
    const activeFiltersCount = (selectedType !== "all" ? 1 : 0) +
        (dateRange.from || dateRange.to ? 1 : 0);

    // Summary stats
    const summaryStats = (
        <div className="absolute top-35 right-5 flex items-center gap-4 text-sm">
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                {patients.reduce((sum, p) => sum + p.inPersonCount, 0)} In-Person
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {patients.reduce((sum, p) => sum + p.telehealthCount, 0)} Tele
            </Badge>
        </div>
    );

    return (
        <div className="space-y-4">
            <Button onClick={() => router.back()} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
            </Button>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    
                    <h1 className="text-2xl font-bold text-primary tracking-tight">All Patients</h1>
                </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm -mt-4">Manage and view all patient consultations</p>

            {/* Data Table - with custom filter */}
            <DataTable
                title=""
                data={filteredPatients}
                columns={columns}
                filters={filters}
                customFilters={[
                    {
                        key: "dateRange",
                        component: <DateRangeFilterComponent />
                    }
                ]}
                searchPlaceholder="Search by name, email, phone, or patient ID..."
                onSearch={setSearchQuery}
                onFilter={handleFilter}
                onClearFilters={handleClearFilters}
                activeFilters={{
                    type: selectedType,
                }}
                filterComponents={filterComponents}
                getId={(patient) => patient.id}
                onRowClick={(patient) => router.push(`/patients/${patient.id}`)}
                onSelectionChange={(selectedIds) => console.log("Selected:", selectedIds)}
                summaryStats={summaryStats}
                itemsPerPage={10}
                showFilterRow={true}
            />
        </div>
    );
}