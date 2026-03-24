// // app/inventory/page.tsx
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//     ArrowLeft,
//     Plus,
//     Edit,
//     Trash2,
//     Eye,
//     MoreVertical,
//     Package,
//     AlertCircle,
//     Download,
// } from "lucide-react";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Column, DataTable, FilterOption } from "@/components/custom/data-table";

// interface Medicine {
//     id: string;
//     name: string;
//     category: string;
//     type: string;
//     createdAt: string;
//     updatedAt: string;
//     stock?: number;
//     price?: number;
//     manufacturer?: string;
//     expiryDate?: string;
// }

// export default function InventoryPage() {
//     const router = useRouter();
//     const [searchQuery, setSearchQuery] = useState("");
//     const [selectedCategory, setSelectedCategory] = useState<string>("all");
//     const [selectedType, setSelectedType] = useState<string>("all");

//     // Sample medicines data
//     const medicines: Medicine[] = [
//         {
//             id: "1",
//             name: "Insulin",
//             category: "Supplements",
//             type: "Injection",
//             createdAt: "2026-03-09 10:59:09",
//             updatedAt: "2026-03-09 10:59:09",
//             stock: 45,
//             price: 25.99,
//             manufacturer: "PharmaCare",
//             expiryDate: "2027-03-09"
//         },
//         {
//             id: "2",
//             name: "Aspirin",
//             category: "Analgesics",
//             type: "Tablet",
//             createdAt: "2026-03-09 10:59:09",
//             updatedAt: "2026-03-09 10:59:09",
//             stock: 120,
//             price: 5.99,
//             manufacturer: "MediCorp",
//             expiryDate: "2028-03-09"
//         },
//         {
//             id: "3",
//             name: "Omeprazole",
//             category: "Antacids",
//             type: "Capsule",
//             createdAt: "2026-03-09 10:59:09",
//             updatedAt: "2026-03-09 10:59:09",
//             stock: 85,
//             price: 12.50,
//             manufacturer: "HealthPharm",
//             expiryDate: "2027-06-15"
//         },
//         {
//             id: "4",
//             name: "Amoxicillin",
//             category: "Antibiotics",
//             type: "Capsule",
//             createdAt: "2026-03-09 10:59:09",
//             updatedAt: "2026-03-09 10:59:09",
//             stock: 60,
//             price: 15.75,
//             manufacturer: "BioMed",
//             expiryDate: "2026-12-20"
//         },
//         {
//             id: "5",
//             name: "Vitamin C",
//             category: "Vitamins",
//             type: "Tablet",
//             createdAt: "2026-03-09 10:59:09",
//             updatedAt: "2026-03-09 10:59:09",
//             stock: 200,
//             price: 8.99,
//             manufacturer: "NutriWell",
//             expiryDate: "2028-01-30"
//         },
//         {
//             id: "6",
//             name: "Paracetamol",
//             category: "Analgesics",
//             type: "Tablet",
//             createdAt: "2026-03-09 10:59:09",
//             updatedAt: "2026-03-09 10:59:09",
//             stock: 150,
//             price: 4.50,
//             manufacturer: "GenericMed",
//             expiryDate: "2027-11-05"
//         },
//         {
//             id: "7",
//             name: "Cough Syrup",
//             category: "Antiseptics",
//             type: "Syrup",
//             createdAt: "2026-03-09 10:59:09",
//             updatedAt: "2026-03-09 10:59:09",
//             stock: 35,
//             price: 7.25,
//             manufacturer: "SyrupLab",
//             expiryDate: "2026-08-14"
//         },
//         {
//             id: "8",
//             name: "Ibuprofen",
//             category: "Analgesics",
//             type: "Tablet",
//             createdAt: "2026-03-09 10:59:09",
//             updatedAt: "2026-03-09 10:59:09",
//             stock: 95,
//             price: 6.99,
//             manufacturer: "PainRelief Inc",
//             expiryDate: "2027-09-22"
//         },
//         {
//             id: "9",
//             name: "Metformin",
//             category: "Antidiabetic",
//             type: "Tablet",
//             createdAt: "2026-03-09 10:59:09",
//             updatedAt: "2026-03-09 10:59:09",
//             stock: 110,
//             price: 9.99,
//             manufacturer: "DiabetesCare",
//             expiryDate: "2027-12-15"
//         },
//         {
//             id: "10",
//             name: "Lisinopril",
//             category: "Antihypertensive",
//             type: "Tablet",
//             createdAt: "2026-03-09 10:59:09",
//             updatedAt: "2026-03-09 10:59:09",
//             stock: 75,
//             price: 11.50,
//             manufacturer: "HeartHealth",
//             expiryDate: "2028-02-28"
//         },
//         {
//             id: "11",
//             name: "Albuterol",
//             category: "Respiratory",
//             type: "Inhaler",
//             createdAt: "2026-03-09 10:59:09",
//             updatedAt: "2026-03-09 10:59:09",
//             stock: 30,
//             price: 35.99,
//             manufacturer: "BreathEasy",
//             expiryDate: "2026-11-30"
//         },
//         {
//             id: "12",
//             name: "Cetirizine",
//             category: "Antihistamine",
//             type: "Tablet",
//             createdAt: "2026-03-09 10:59:09",
//             updatedAt: "2026-03-09 10:59:09",
//             stock: 180,
//             price: 7.25,
//             manufacturer: "AllergyRelief",
//             expiryDate: "2027-10-10"
//         }
//     ];

//     // Filter medicines based on search and filters
//     const filteredMedicines = medicines.filter(med => {
//         const searchLower = searchQuery.toLowerCase();
//         const matchesSearch = searchQuery === "" || (
//             med.name.toLowerCase().includes(searchLower) ||
//             med.category.toLowerCase().includes(searchLower) ||
//             med.type.toLowerCase().includes(searchLower) ||
//             med.manufacturer?.toLowerCase().includes(searchLower)
//         );

//         const matchesCategory = selectedCategory === "all" || med.category === selectedCategory;
//         const matchesType = selectedType === "all" || med.type === selectedType;

//         return matchesSearch && matchesCategory && matchesType;
//     });

//     // Get unique values for filters
//     const categories = [...new Set(medicines.map(m => m.category))];
//     const types = [...new Set(medicines.map(m => m.type))];

//     // Get type badge color
//     const getTypeColor = (type: string) => {
//         switch (type) {
//             case 'Tablet': return 'bg-green-50 text-green-700 border-green-200';
//             case 'Capsule': return 'bg-purple-50 text-purple-700 border-purple-200';
//             case 'Injection': return 'bg-red-50 text-red-700 border-red-200';
//             case 'Syrup': return 'bg-orange-50 text-orange-700 border-orange-200';
//             case 'Inhaler': return 'bg-cyan-50 text-cyan-700 border-cyan-200';
//             default: return 'bg-gray-50 text-gray-700 border-gray-200';
//         }
//     };

//     // Define columns
//     const columns: Column<Medicine>[] = [
//         {
//             key: "name",
//             header: "Name",
//             className: "font-medium",
//         },
//         {
//             key: "category",
//             header: "Category",
//             cell: (medicine) => (
//                 <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
//                     {medicine.category}
//                 </Badge>
//             ),
//         },
//         {
//             key: "type",
//             header: "Type",
//             cell: (medicine) => (
//                 <Badge variant="outline" className={getTypeColor(medicine.type)}>
//                     {medicine.type}
//                 </Badge>
//             ),
//         },
//         {
//             key: "createdAt",
//             header: "Created at",
//             cell: (medicine) => (
//                 <span className="text-muted-foreground">{medicine.createdAt}</span>
//             ),
//         },
//         {
//             key: "updatedAt",
//             header: "Updated at",
//             cell: (medicine) => (
//                 <span className="text-muted-foreground">{medicine.updatedAt}</span>
//             ),
//         },
//         {
//             key: "actions",
//             header: "",
//             className: "text-right",
//             cell: (medicine) => (
//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
//                         <Button variant="ghost" size="icon" className="h-8 w-8">
//                             <MoreVertical className="h-4 w-4" />
//                         </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end" className="w-40">
//                         <DropdownMenuItem onClick={() => router.push(`/inventory/${medicine.id}`)}>
//                             <Eye className="mr-2 h-4 w-4" />
//                             View
//                         </DropdownMenuItem>
//                         <DropdownMenuItem>
//                             <Edit className="mr-2 h-4 w-4" />
//                             Edit
//                         </DropdownMenuItem>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItem className="text-destructive">
//                             <Trash2 className="mr-2 h-4 w-4" />
//                             Delete
//                         </DropdownMenuItem>
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             ),
//         },
//     ];

//     // Define filters
//     const filters: FilterOption[] = [
//         {
//             key: "category",
//             label: "Categories",
//             options: categories.map(c => ({
//                 value: c,
//                 label: c
//             }))
//         },
//         {
//             key: "type",
//             label: "Types",
//             options: types.map(t => ({
//                 value: t,
//                 label: t
//             }))
//         }
//     ];

//     // Filter components for active display
//     const filterComponents = {
//         category: (value: string) => (
//             <span>Category: {value}</span>
//         ),
//         type: (value: string) => (
//             <Badge variant="outline" className={getTypeColor(value)}>
//                 {value}
//             </Badge>
//         )
//     };

//     // Handle filter changes
//     const handleFilter = (key: string, value: string) => {
//         if (key === 'category') setSelectedCategory(value);
//         if (key === 'type') setSelectedType(value);
//     };

//     // Handle clear filters
//     const handleClearFilters = () => {
//         setSelectedCategory("all");
//         setSelectedType("all");
//         setSearchQuery("");
//     };

//     // Summary stats
//     const summaryStats = (
//         <div className="flex items-center gap-4 text-sm flex-wrap">
//             <Badge variant="outline" className="bg-primary/10 text-primary">
//                 Total: {medicines.length} medicines
//             </Badge>
//             <Badge variant="outline" className="bg-green-50 text-green-700">
//                 In Stock: {medicines.reduce((sum, m) => sum + (m.stock || 0), 0)}
//             </Badge>
//             {filteredMedicines.length !== medicines.length && (
//                 <Badge variant="outline" className="bg-blue-50 text-blue-700">
//                     Filtered: {filteredMedicines.length} items
//                 </Badge>
//             )}
//         </div>
//     );

//     return (
//         <div className="space-y-4">
//             {/* Header with Back Button */}
//             <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                     <Button onClick={() => router.back()} className="gap-2">
//                         <ArrowLeft className="h-4 w-4" />
//                         Back
//                     </Button>
//                 </div>
//                 <Button className="gap-2">
//                     <Plus className="h-4 w-4" />
//                     Add New Medicine Request
//                 </Button>
//             </div>

//             {/* Data Table */}
//             <DataTable
//                 title="Medicines"
//                 data={filteredMedicines}
//                 columns={columns}
//                 filters={filters}
//                 searchPlaceholder="Search medicine..."
//                 onSearch={setSearchQuery}
//                 onFilter={handleFilter}
//                 onClearFilters={handleClearFilters}
//                 activeFilters={{
//                     category: selectedCategory,
//                     type: selectedType,
//                 }}
//                 filterComponents={filterComponents}
//                 getId={(medicine) => medicine.id}
//                 onRowClick={(medicine) => router.push(`/inventory/${medicine.id}`)}
//                 onSelectionChange={(selectedIds) => console.log("Selected:", selectedIds)}
//                 summaryStats={summaryStats}
//             />
//         </div>
//     );
// }


"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    ArrowLeft,
    Plus,
    Edit,
    Trash2,
    Eye,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Column, DataTable, FilterOption } from "@/components/custom/data-table";
import { useMedicines } from "@/queries/common/useAllMedicines";
import type { MedicineItem } from "@/types/common/all-medicines";

interface Medicine {
    id: string;
    name: string;
    category: string;
    type: string;
    createdAt: string;
    updatedAt: string;
}

export default function InventoryPage() {
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [selectedType, setSelectedType] = useState<string>("all");

    const [page, setPage] = useState(1);
    const perPage = 5;

    const { data, isLoading, isError, error, isFetching } = useMedicines({
        page,
        per_page: perPage,
    });

    const medicines: Medicine[] = useMemo(() => {
        const list: MedicineItem[] = data?.data ?? [];

        return list.map((item) => ({
            id: item.id,
            name: item.name,
            category: item.category,
            type: item.type,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
        }));
    }, [data]);

    const filteredMedicines = medicines.filter((med) => {
        const searchLower = searchQuery.toLowerCase();

        const matchesSearch =
            searchQuery === "" ||
            med.name.toLowerCase().includes(searchLower) ||
            med.category.toLowerCase().includes(searchLower) ||
            med.type.toLowerCase().includes(searchLower);

        const matchesCategory =
            selectedCategory === "all" || med.category === selectedCategory;

        const matchesType = selectedType === "all" || med.type === selectedType;

        return matchesSearch && matchesCategory && matchesType;
    });

    const categories = [...new Set((data?.data ?? []).map((m) => m.category))];
    const types = [...new Set((data?.data ?? []).map((m) => m.type))];

    const getTypeColor = (type: string) => {
        switch (type) {
            case "Tablet":
                return "bg-green-50 text-green-700 border-green-200";
            case "Capsule":
                return "bg-purple-50 text-purple-700 border-purple-200";
            case "Injection":
                return "bg-red-50 text-red-700 border-red-200";
            case "Syrup":
                return "bg-orange-50 text-orange-700 border-orange-200";
            case "Inhaler":
                return "bg-cyan-50 text-cyan-700 border-cyan-200";
            default:
                return "bg-gray-50 text-gray-700 border-gray-200";
        }
    };

    const columns: Column<Medicine>[] = [
        {
            key: "name",
            header: "Name",
            className: "font-medium",
        },
        {
            key: "category",
            header: "Category",
            cell: (medicine) => (
                <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                >
                    {medicine.category}
                </Badge>
            ),
        },
        {
            key: "type",
            header: "Type",
            cell: (medicine) => (
                <Badge variant="outline" className={getTypeColor(medicine.type)}>
                    {medicine.type}
                </Badge>
            ),
        },
        {
            key: "createdAt",
            header: "Created at",
            cell: (medicine) => (
                <span className="text-muted-foreground">{medicine.createdAt}</span>
            ),
        },
        {
            key: "updatedAt",
            header: "Updated at",
            cell: (medicine) => (
                <span className="text-muted-foreground">{medicine.updatedAt}</span>
            ),
        },
        // {
        //     key: "actions",
        //     header: "",
        //     className: "text-right",
        //     cell: (medicine) => (
        //         <DropdownMenu>
        //             <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
        //                 <Button variant="ghost" size="icon" className="h-8 w-8">
        //                     <MoreVertical className="h-4 w-4" />
        //                 </Button>
        //             </DropdownMenuTrigger>

        //             <DropdownMenuContent align="end" className="w-40">
        //                 <DropdownMenuItem onClick={() => router.push(`/inventory/${medicine.id}`)}>
        //                     <Eye className="mr-2 h-4 w-4" />
        //                     View
        //                 </DropdownMenuItem>

        //                 <DropdownMenuItem>
        //                     <Edit className="mr-2 h-4 w-4" />
        //                     Edit
        //                 </DropdownMenuItem>

        //                 <DropdownMenuSeparator />

        //                 <DropdownMenuItem className="text-destructive">
        //                     <Trash2 className="mr-2 h-4 w-4" />
        //                     Delete
        //                 </DropdownMenuItem>
        //             </DropdownMenuContent>
        //         </DropdownMenu>
        //     ),
        // },
    ];

    const filters: FilterOption[] = [
        {
            key: "category",
            label: "Categories",
            options: categories.map((c) => ({
                value: c,
                label: c,
            })),
        },
        {
            key: "type",
            label: "Types",
            options: types.map((t) => ({
                value: t,
                label: t,
            })),
        },
    ];

    const filterComponents = {
        category: (value: string) => <span>Category: {value}</span>,
        type: (value: string) => (
            <Badge variant="outline" className={getTypeColor(value)}>
                {value}
            </Badge>
        ),
    };

    const handleFilter = (key: string, value: string) => {
        if (key === "category") setSelectedCategory(value);
        if (key === "type") setSelectedType(value);
    };

    const handleClearFilters = () => {
        setSelectedCategory("all");
        setSelectedType("all");
        setSearchQuery("");
    };

    const pagination = data?.pagination;

    const summaryStats = (
        <div className="flex items-center gap-4 text-sm flex-wrap">
            <Badge variant="outline" className="bg-primary/10 text-primary">
                Total: {pagination?.total ?? 0} medicines
            </Badge>

            <Badge variant="outline" className="bg-green-50 text-green-700">
                Current Page: {pagination?.current_page ?? 1}
            </Badge>

            <Badge variant="outline" className="bg-purple-50 text-purple-700">
                Per Page: {pagination?.per_page ?? perPage}
            </Badge>

            {filteredMedicines.length !== medicines.length && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    Filtered: {filteredMedicines.length} items
                </Badge>
            )}
        </div>
    );

    if (isLoading) {
        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Button onClick={() => router.back()} className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Button>
                    </div>
                </div>

                <div className="rounded-xl border p-6 text-sm text-muted-foreground">
                    Loading medicines...
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Button onClick={() => router.back()} className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Button>
                    </div>
                </div>

                <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
                    Failed to load medicines.
                    <br />
                    {(error as Error)?.message || "Something went wrong."}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button onClick={() => router.back()} className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                </div>

                {/* <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add New Medicine Request
                </Button> */}
            </div>

            <DataTable
                title="Medicines"
                data={filteredMedicines}
                columns={columns}
                filters={filters}
                searchPlaceholder="Search medicine..."
                onSearch={setSearchQuery}
                onFilter={handleFilter}
                onClearFilters={handleClearFilters}
                activeFilters={{
                    category: selectedCategory,
                    type: selectedType,
                }}
                filterComponents={filterComponents}
                getId={(medicine) => medicine.id}
                // onRowClick={(medicine) => router.push(`/inventory/${medicine.id}`)}
                onSelectionChange={(selectedIds) => console.log("Selected:", selectedIds)}
                summaryStats={summaryStats}
            />

            <div className="flex items-center justify-end gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1 || isFetching}
                >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                </Button>

                <Badge variant="outline" className="px-3 py-1">
                    Page {pagination?.current_page ?? page} of {pagination?.last_page ?? 1}
                </Badge>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                        setPage((prev) =>
                            pagination?.last_page ? Math.min(prev + 1, pagination.last_page) : prev + 1
                        )
                    }
                    disabled={page === (pagination?.last_page ?? 1) || isFetching}
                >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
            </div>
        </div>
    );
}