// app/payments/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    ArrowLeft,
    Download,
    MoreVertical,
    Eye,
    Trash2,
    IndianRupee,
    CreditCard,
    Smartphone,
    Wallet,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Column, DataTable, FilterOption } from "@/components/custom/data-table";


interface Payment {
    id: string;
    patient: string;
    doctor: string;
    amount: number;
    method: "card" | "upi" | "cash" | "pending";
    status: "Paid" | "Pending" | "Failed" | "Refunded";
    razorpayId?: string;
    appointmentId: string;
    date: string;
}

export default function PaymentsPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMethod, setSelectedMethod] = useState<string>("all");
    const [selectedStatus, setSelectedStatus] = useState<string>("all");

    // Sample payments data
    const payments: Payment[] = [
        {
            id: "1",
            patient: "Suresh",
            doctor: "Amit Sharma",
            amount: 1.00,
            method: "card",
            status: "Paid",
            razorpayId: "pay_Bfmz7gdgzz4fMM",
            appointmentId: "3cf3135d-08c8-4096-bbf8-f5a12fc02224",
            date: "Mar 9, 2026 10:59:10"
        },
        {
            id: "2",
            patient: "Suresh",
            doctor: "Amit Sharma",
            amount: 1.00,
            method: "upi",
            status: "Paid",
            razorpayId: "pay_ieGFXsr1eADmFT",
            appointmentId: "44b344d5-5f92-46f9-857b-d57c2cc2d1a7",
            date: "Mar 9, 2026 10:59:10"
        },
        {
            id: "3",
            patient: "Sakshi",
            doctor: "Amit Sharma",
            amount: 1.00,
            method: "card",
            status: "Paid",
            razorpayId: "pay_J7wNdVqPnq7nwu",
            appointmentId: "d637fb82-966d-4104-90bd-f6e1815cfc88",
            date: "Mar 9, 2026 10:59:11"
        },
        {
            id: "4",
            patient: "Suresh",
            doctor: "Amit Sharma",
            amount: 1.00,
            method: "card",
            status: "Paid",
            razorpayId: "pay_VU69Hqlv453c19",
            appointmentId: "38ca2ad5-b8ef-4753-96a5-bef9e7857a50",
            date: "Mar 9, 2026 10:59:11"
        },
        {
            id: "5",
            patient: "test user 7897",
            doctor: "Amit Sharma",
            amount: 1.00,
            method: "pending",
            status: "Paid",
            razorpayId: "a0d916e1-7c70-4e35-8dc9-8bcd5f1b855d",
            appointmentId: "a0d916e1-7c70-4e35-8dc9-8bcd5f1b855d",
            date: "Mar 11, 2026 12:51:11"
        },
        {
            id: "6",
            patient: "test user 7897",
            doctor: "Amit Sharma",
            amount: 1.00,
            method: "pending",
            status: "Paid",
            razorpayId: "201ac439-ed6f-4ddb-ae31-5f08d44b05db",
            appointmentId: "201ac439-ed6f-4ddb-ae31-5f08d44b05db",
            date: "Mar 11, 2026 12:53:56"
        },
        {
            id: "7",
            patient: "Sakshi",
            doctor: "Amit Sharma",
            amount: 1.00,
            method: "upi",
            status: "Paid",
            razorpayId: "pay_SPpzRIA4XDDiZJ",
            appointmentId: "aaad9266-ff2a-4deb-839d-0c9bdb37fcf2",
            date: "Mar 11, 2026 13:03:11"
        },
        {
            id: "8",
            patient: "Rajesh",
            doctor: "Priya Patel",
            amount: 1500.00,
            method: "card",
            status: "Paid",
            razorpayId: "pay_RTyu78hjkl34nm",
            appointmentId: "b7e8f9a1-2b3c-4d5e-6f7g-8h9i0j1k2l3m",
            date: "Mar 10, 2026 15:30:22"
        },
        {
            id: "9",
            patient: "Meena",
            doctor: "Rajesh Kumar",
            amount: 2000.00,
            method: "cash",
            status: "Paid",
            razorpayId: "pay_ZXcv56bnm789kj",
            appointmentId: "n4m5n6b7v8c9x0z1a2s3d4f5g6h7j8k9",
            date: "Mar 8, 2026 09:15:45"
        },
        {
            id: "10",
            patient: "Anil",
            doctor: "Emily Davis",
            amount: 750.00,
            method: "upi",
            status: "Pending",
            razorpayId: "pay_QWErty45uiop78",
            appointmentId: "l0k9j8h7g6f5d4s3a2z1x0c9v8b7n6m5",
            date: "Mar 12, 2026 11:20:33"
        },
        {
            id: "11",
            patient: "Anil",
            doctor: "Emily Davis",
            amount: 750.00,
            method: "upi",
            status: "Pending",
            razorpayId: "pay_QWErty45uiop78",
            appointmentId: "l0k9j8h7g6f5d4s3a2z1x0c9v8b7n6m5",
            date: "Mar 12, 2026 11:20:33"
        }
    ];

    // Get unique methods for filter
    const methods = [...new Set(payments.map(p => p.method))];
    const statuses = [...new Set(payments.map(p => p.status))];

    // Filter payments based on search and filters
    const filteredPayments = payments.filter(payment => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = searchQuery === "" || (
            payment.patient.toLowerCase().includes(searchLower) ||
            payment.doctor.toLowerCase().includes(searchLower) ||
            payment.razorpayId?.toLowerCase().includes(searchLower) ||
            payment.appointmentId.toLowerCase().includes(searchLower)
        );

        const matchesMethod = selectedMethod === "all" || payment.method === selectedMethod;
        const matchesStatus = selectedStatus === "all" || payment.status === selectedStatus;

        return matchesSearch && matchesMethod && matchesStatus;
    });

    // Calculate total amount
    const totalAmount = filteredPayments.reduce((sum, p) => sum + p.amount, 0);

    // Get method icon
    const getMethodIcon = (method: string) => {
        switch (method) {
            case 'card': return <CreditCard className="h-4 w-4" />;
            case 'upi': return <Smartphone className="h-4 w-4" />;
            case 'cash': return <Wallet className="h-4 w-4" />;
            default: return <CreditCard className="h-4 w-4" />;
        }
    };

    // Get method color
    const getMethodColor = (method: string) => {
        switch (method) {
            case 'card': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'upi': return 'bg-purple-50 text-purple-700 border-purple-200';
            case 'cash': return 'bg-green-50 text-green-700 border-green-200';
            default: return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    // Get status color
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Paid': return 'bg-green-100 text-green-800 border-green-200';
            case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Failed': return 'bg-red-100 text-red-800 border-red-200';
            case 'Refunded': return 'bg-orange-100 text-orange-800 border-orange-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    // Define columns
    const columns: Column<Payment>[] = [
        {
            key: "patient",
            header: "Patient",
            className: "font-medium",
        },
        {
            key: "doctor",
            header: "Doctor",
        },
        {
            key: "amount",
            header: "Amount",
            cell: (payment) => (
                <div className="flex items-center gap-1">
                    <IndianRupee className="h-3 w-3" />
                    {payment.amount.toFixed(2)}
                </div>
            ),
        },
        {
            key: "method",
            header: "Method",
            cell: (payment) => (
                <Badge variant="outline" className={`flex items-center gap-1 ${getMethodColor(payment.method)}`}>
                    {getMethodIcon(payment.method)}
                    <span className="capitalize">{payment.method}</span>
                </Badge>
            ),
        },
        {
            key: "status",
            header: "Status",
            cell: (payment) => (
                <Badge className={getStatusColor(payment.status)}>
                    {payment.status}
                </Badge>
            ),
        },
        {
            key: "razorpayId",
            header: "Razorpay ID",
            cell: (payment) => (
                <span className="font-mono text-xs">{payment.razorpayId || '-'}</span>
            ),
        },
        {
            key: "appointmentId",
            header: "Appointment ID",
            cell: (payment) => (
                <span className="font-mono text-xs">{payment.appointmentId.substring(0, 8)}...</span>
            ),
        },
        {
            key: "date",
            header: "Date",
        },
        {
            key: "actions",
            header: "",
            className: "text-right",
            cell: (payment) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem onClick={() => router.push(`/payments/${payment.id}`)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Receipt
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

    // Define filters
    const filters: FilterOption[] = [
        {
            key: "method",
            label: "Methods",
            options: methods.map(m => ({
                value: m,
                label: m.charAt(0).toUpperCase() + m.slice(1),
                icon: getMethodIcon(m)
            }))
        },
        {
            key: "status",
            label: "Status",
            options: statuses.map(s => ({
                value: s,
                label: s
            }))
        }
    ];

    // Filter components for active display
    const filterComponents = {
        method: (value: string) => (
            <div className="flex items-center gap-1">
                {getMethodIcon(value)}
                <span className="capitalize">{value}</span>
            </div>
        ),
        status: (value: string) => (
            <span>Status: {value}</span>
        )
    };

    // Handle filter changes
    const handleFilter = (key: string, value: string) => {
        if (key === 'method') setSelectedMethod(value);
        if (key === 'status') setSelectedStatus(value);
    };

    // Handle clear filters
    const handleClearFilters = () => {
        setSelectedMethod("all");
        setSelectedStatus("all");
        setSearchQuery("");
    };

    // Summary stats
    const summaryStats = (
        <div className="flex items-center gap-4 text-sm">
            <Badge variant="outline" className="bg-primary/10 text-primary">
                Total: {payments.length} payments
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700">
                Paid: {payments.filter(p => p.status === 'Paid').length}
            </Badge>
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                Pending: {payments.filter(p => p.status === 'Pending').length}
            </Badge>
            {filteredPayments.length !== payments.length && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    Filtered: {filteredPayments.length} items
                </Badge>
            )}
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header with Back Button */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button onClick={() => router.back()} className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                </div>
            </div>

            {/* Data Table */}
            <DataTable
                title="Payments"
                data={filteredPayments}
                columns={columns}
                filters={filters}
                searchPlaceholder="Search by patient, doctor, or ID..."
                onSearch={setSearchQuery}
                onFilter={handleFilter}
                onClearFilters={handleClearFilters}
                activeFilters={{
                    method: selectedMethod,
                    status: selectedStatus,
                }}
                filterComponents={filterComponents}
                getId={(payment) => payment.id}
                onRowClick={(payment) => router.push(`/payments/${payment.id}`)}
                onSelectionChange={(selectedIds) => console.log("Selected:", selectedIds)}
                summaryStats={summaryStats}
            />
        </div>
    );
}