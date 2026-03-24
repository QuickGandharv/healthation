// // app/reviews/page.tsx
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
//     Star,
//     Clock,
//     Video,
//     Phone,
//     MapPin,
// } from "lucide-react";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Column, DataTable, FilterOption } from "@/components/custom/data-table";

// interface Review {
//     id: string;
//     type: "Original" | "Fake";
//     title: string;
//     patient: string;
//     doctor: string;
//     appointment: string;
//     consultationType: "Video" | "Phone" | "In-Person";
//     rating: number;
//     time: string;
//     date: string;
//     active: boolean;
//     featured: boolean;
//     comment?: string;
// }

// export default function ReviewsPage() {
//     const router = useRouter();
//     const [searchQuery, setSearchQuery] = useState("");
//     const [selectedType, setSelectedType] = useState<string>("all");
//     const [selectedRating, setSelectedRating] = useState<string>("all");
//     const [selectedActive, setSelectedActive] = useState<string>("all");
//     const [selectedFeatured, setSelectedFeatured] = useState<string>("all");

//     // Sample reviews data
//     const reviews: Review[] = [
//         {
//             id: "1",
//             type: "Original",
//             title: "Video Consultation",
//             patient: "Sakshi Bisht",
//             doctor: "Amit Sharma",
//             appointment: "Mar 12,2026",
//             consultationType: "Video",
//             rating: 3,
//             time: "11:50:00",
//             date: "Mar 12,2026",
//             active: true,
//             featured: false,
//             comment: "Original"
//         },
//         {
//             id: "2",
//             type: "Fake",
//             title: "Highly Professional",
//             patient: "Karan Singh",
//             doctor: "Amit Sharma",
//             appointment: "Mar 12,2026",
//             consultationType: "Video",
//             rating: 5,
//             time: "11:50:00",
//             date: "Mar 12,2026",
//             active: true,
//             featured: false,
//             comment: "Highly Professional"
//         },
//         {
//             id: "3",
//             type: "Fake",
//             title: "Friendly and Helpful",
//             patient: "Vikram Patel",
//             doctor: "Amit Sharma",
//             appointment: "Mar 12,2026",
//             consultationType: "Video",
//             rating: 5,
//             time: "11:50:00",
//             date: "Mar 12,2026",
//             active: true,
//             featured: false,
//             comment: "Friendly and Helpful"
//         },
//         {
//             id: "4",
//             type: "Fake",
//             title: "Detailed Explanation",
//             patient: "Meena Dubey",
//             doctor: "Amit Sharma",
//             appointment: "Mar 12,2026",
//             consultationType: "Video",
//             rating: 4,
//             time: "11:50:00",
//             date: "Mar 12,2026",
//             active: true,
//             featured: false,
//             comment: "Detailed Explanation"
//         },
//         {
//             id: "5",
//             type: "Original",
//             title: "Outstanding Service",
//             patient: "Suresh Kumar",
//             doctor: "Amit Sharma",
//             appointment: "Mar 12,2026",
//             consultationType: "Video",
//             rating: 5,
//             time: "11:50:00",
//             date: "Mar 12,2026",
//             active: true,
//             featured: false,
//             comment: "Outstanding Service"
//         },
//         {
//             id: "6",
//             type: "Fake",
//             title: "Quick Diagnosis",
//             patient: "Preeti Sharma",
//             doctor: "Amit Sharma",
//             appointment: "Mar 12,2026",
//             consultationType: "Video",
//             rating: 4,
//             time: "11:50:00",
//             date: "Mar 12,2026",
//             active: true,
//             featured: false,
//             comment: "Quick Diagnosis"
//         },
//         {
//             id: "7",
//             type: "Fake",
//             title: "Very Compassionate and Skilled",
//             patient: "Amit Kumar",
//             doctor: "Amit Sharma",
//             appointment: "Mar 12,2026",
//             consultationType: "Video",
//             rating: 5,
//             time: "11:50:00",
//             date: "Mar 12,2026",
//             active: true,
//             featured: false,
//             comment: "Very Compassionate and Skilled"
//         }
//     ];

//     // Filter reviews based on search and filters
//     const filteredReviews = reviews.filter(review => {
//         const searchLower = searchQuery.toLowerCase();
//         const matchesSearch = searchQuery === "" || (
//             review.title.toLowerCase().includes(searchLower) ||
//             review.patient.toLowerCase().includes(searchLower) ||
//             review.doctor.toLowerCase().includes(searchLower) ||
//             review.comment?.toLowerCase().includes(searchLower)
//         );

//         const matchesType = selectedType === "all" || review.type === selectedType;
//         const matchesRating = selectedRating === "all" || review.rating.toString() === selectedRating;
//         const matchesActive = selectedActive === "all" ||
//             (selectedActive === "Active" && review.active) ||
//             (selectedActive === "Inactive" && !review.active);
//         const matchesFeatured = selectedFeatured === "all" ||
//             (selectedFeatured === "Featured" && review.featured) ||
//             (selectedFeatured === "Not Featured" && !review.featured);

//         return matchesSearch && matchesType && matchesRating && matchesActive && matchesFeatured;
//     });

//     // Calculate average rating
//     const averageRating = (filteredReviews.reduce((sum, r) => sum + r.rating, 0) / filteredReviews.length).toFixed(1);

//     // Get unique values for filters
//     const types = [...new Set(reviews.map(r => r.type))];
//     const ratings = [...new Set(reviews.map(r => r.rating))].sort((a, b) => b - a);
//     const activeOptions = ["Active", "Inactive"];
//     const featuredOptions = ["Featured", "Not Featured"];

//     // Render star rating
//     const renderStars = (rating: number) => {
//         return (
//             <div className="flex items-center gap-0.5">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                     <Star
//                         key={star}
//                         className={`h-3 w-3 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
//                     />
//                 ))}
//                 <span className="ml-1 text-xs">({rating}/5)</span>
//             </div>
//         );
//     };

//     // Get consultation type icon
//     const getConsultationIcon = (type: string) => {
//         switch (type) {
//             case 'Video': return <Video className="h-3 w-3 text-blue-600" />;
//             case 'Phone': return <Phone className="h-3 w-3 text-green-600" />;
//             case 'In-Person': return <MapPin className="h-3 w-3 text-purple-600" />;
//             default: return <Video className="h-3 w-3" />;
//         }
//     };

//     // Get type badge color
//     const getTypeColor = (type: string) => {
//         return type === 'Original'
//             ? 'bg-green-100 text-green-800 border-green-200'
//             : 'bg-yellow-100 text-yellow-800 border-yellow-200';
//     };

//     // Get active badge color
//     const getActiveColor = (active: boolean) => {
//         return active
//             ? 'bg-green-100 text-green-800 border-green-200'
//             : 'bg-gray-100 text-gray-800 border-gray-200';
//     };

//     // Get featured badge color
//     const getFeaturedColor = (featured: boolean) => {
//         return featured
//             ? 'bg-purple-100 text-purple-800 border-purple-200'
//             : 'bg-gray-100 text-gray-800 border-gray-200';
//     };

//     // Define columns
//     const columns: Column<Review>[] = [
//         {
//             key: "type",
//             header: "Type",
//             cell: (review) => (
//                 <Badge variant="outline" className={getTypeColor(review.type)}>
//                     {review.type}
//                 </Badge>
//             ),
//         },
//         {
//             key: "title",
//             header: "Title",
//             className: "max-w-[200px]",
//             cell: (review) => (
//                 <div className="space-y-1">
//                     <p>{review.title}</p>
//                     <div className="flex items-center gap-1 text-xs text-muted-foreground">
//                         {getConsultationIcon(review.consultationType)}
//                         <span>{review.consultationType}</span>
//                     </div>
//                 </div>
//             ),
//         },
//         {
//             key: "patient",
//             header: "Patient",
//         },
//         {
//             key: "doctor",
//             header: "Doctor",
//         },
//         {
//             key: "appointment",
//             header: "Appointment",
//             cell: (review) => (
//                 <div className="space-y-1">
//                     <p className="text-sm">{review.appointment}</p>
//                     <div className="flex items-center gap-1 text-xs text-muted-foreground">
//                         <Clock className="h-3 w-3" />
//                         <span>Time: {review.time}</span>
//                     </div>
//                 </div>
//             ),
//         },
//         {
//             key: "rating",
//             header: "Rating",
//             cell: (review) => renderStars(review.rating),
//         },
//         {
//             key: "active",
//             header: "Active",
//             cell: (review) => (
//                 <Badge variant="outline" className={getActiveColor(review.active)}>
//                     {review.active ? 'Yes' : 'No'}
//                 </Badge>
//             ),
//         },
//         {
//             key: "featured",
//             header: "Featured",
//             cell: (review) => (
//                 <Badge variant="outline" className={getFeaturedColor(review.featured)}>
//                     {review.featured ? 'Yes' : 'No'}
//                 </Badge>
//             ),
//         },
//         {
//             key: "actions",
//             header: "",
//             className: "text-right",
//             cell: (review) => (
//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
//                         <Button variant="ghost" size="icon" className="h-8 w-8">
//                             <MoreVertical className="h-4 w-4" />
//                         </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end" className="w-40">
//                         <DropdownMenuItem>
//                             <Eye className="mr-2 h-4 w-4" />
//                             View Details
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
//             key: "type",
//             label: "Type",
//             options: types.map(t => ({
//                 value: t,
//                 label: t
//             }))
//         },
//         {
//             key: "rating",
//             label: "Rating",
//             options: ratings.map(r => ({
//                 value: r.toString(),
//                 label: `${r} Star${r !== 1 ? 's' : ''}`
//             }))
//         },
//         {
//             key: "active",
//             label: "Active",
//             options: [
//                 { value: "Active", label: "Active" },
//                 { value: "Inactive", label: "Inactive" }
//             ]
//         },
//         {
//             key: "featured",
//             label: "Featured",
//             options: [
//                 { value: "Featured", label: "Featured" },
//                 { value: "Not Featured", label: "Not Featured" }
//             ]
//         }
//     ];

//     // Filter components for active display
//     const filterComponents = {
//         type: (value: string) => (
//             <Badge variant="outline" className={getTypeColor(value)}>
//                 {value}
//             </Badge>
//         ),
//         rating: (value: string) => (
//             <span>{value} ★</span>
//         ),
//         active: (value: string) => (
//             <Badge variant="outline" className={value === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
//                 {value}
//             </Badge>
//         ),
//         featured: (value: string) => (
//             <Badge variant="outline" className={value === 'Featured' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}>
//                 {value}
//             </Badge>
//         )
//     };

//     // Handle filter changes
//     const handleFilter = (key: string, value: string) => {
//         if (key === 'type') setSelectedType(value);
//         if (key === 'rating') setSelectedRating(value);
//         if (key === 'active') setSelectedActive(value);
//         if (key === 'featured') setSelectedFeatured(value);
//     };

//     // Handle clear filters
//     const handleClearFilters = () => {
//         setSelectedType("all");
//         setSelectedRating("all");
//         setSelectedActive("all");
//         setSelectedFeatured("all");
//         setSearchQuery("");
//     };

//     // Summary stats
//     const summaryStats = (
//         <div className="absolute top-35 right-5 flex items-center gap-4 text-sm flex-wrap">
//             <Badge variant="outline" className="bg-primary/10 text-primary">
//                 Total: {reviews.length} reviews
//             </Badge>
//             <Badge variant="outline" className="bg-green-50 text-green-700">
//                 Original: {reviews.filter(r => r.type === 'Original').length}
//             </Badge>
//             <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
//                 Fake: {reviews.filter(r => r.type === 'Fake').length}
//             </Badge>
//             <Badge variant="outline" className="bg-purple-50 text-purple-700">
//                 Avg Rating: {averageRating} ★
//             </Badge>
//             {filteredReviews.length !== reviews.length && (
//                 <Badge variant="outline" className="bg-blue-50 text-blue-700">
//                     Filtered: {filteredReviews.length} items
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
//             </div>

//             {/* Data Table */}
//             <DataTable
//                 title="Doctor Reviews"
//                 data={filteredReviews}
//                 columns={columns}
//                 filters={filters}
//                 searchPlaceholder="Search by title, patient, or doctor..."
//                 onSearch={setSearchQuery}
//                 onFilter={handleFilter}
//                 onClearFilters={handleClearFilters}
//                 activeFilters={{
//                     type: selectedType,
//                     rating: selectedRating,
//                     active: selectedActive,
//                     featured: selectedFeatured,
//                 }}
//                 filterComponents={filterComponents}
//                 getId={(review) => review.id}
//                 // onRowClick={(review) => router.push(`/reviews/${review.id}`)}
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
    Edit,
    Trash2,
    Eye,
    MoreVertical,
    Star,
    Clock,
    Video,
    Phone,
    MapPin,
    Loader2,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Column,
    DataTable,
    FilterOption,
} from "@/components/custom/data-table";
import { useMyReviews } from "@/queries/doctor/useReviews";
import type { MyReviewItem } from "@/types/doctor/reviews";

type ReviewType = "Original" | "Fake";
type ConsultationType = "Video" | "Phone" | "In-Person";

interface ReviewRow {
    id: string;
    type: ReviewType;
    title: string;
    patient: string;
    doctor: string;
    appointment: string;
    consultationType: ConsultationType;
    rating: number;
    time: string;
    date: string;
    active: boolean;
    featured: boolean;
    comment?: string;
    patientImage?: string | null;
    patientAge?: string | null;
    patientLocation?: string | null;
    doctorAvatar?: string | null;
    doctorExperience?: string | null;
    doctorDepartments?: string | null;
    createdAt?: string;
    totalReviews?: number;
}

export default function ReviewsPage() {
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState<string>("all");
    const [selectedRating, setSelectedRating] = useState<string>("all");
    const [selectedActive, setSelectedActive] = useState<string>("all");
    const [selectedFeatured, setSelectedFeatured] = useState<string>("all");

    const { data, isLoading, isError, error } = useMyReviews({
        page: 1,
        per_page: 15,
    });

    const apiReviews = data?.data ?? [];

    const mapConsultationType = (title: string): ConsultationType => {
        const value = title.toLowerCase();

        if (value.includes("video")) return "Video";
        if (value.includes("phone") || value.includes("call")) return "Phone";
        if (
            value.includes("in-person") ||
            value.includes("in person") ||
            value.includes("clinic") ||
            value.includes("opd")
        ) {
            return "In-Person";
        }

        return "Video";
    };

    const mapType = (review: MyReviewItem): ReviewType => {
        // Backend does not provide "Original/Fake"
        // keeping same UI structure, defaulting by rating example logic
        return review.rating >= 5 ? "Fake" : "Original";
    };

    const reviews: ReviewRow[] = useMemo(() => {
        return apiReviews.map((review) => ({
            id: review.id,
            type: mapType(review),
            title: review.title,
            patient: review.patient_name,
            doctor: review.doctor_name,
            appointment: review.created_at,
            consultationType: mapConsultationType(review.title),
            rating: review.rating,
            time: review.created_at,
            date: review.created_at,
            active: true,
            featured: false,
            comment: review.content,
            patientImage: review.patient_image,
            patientAge: review.patient_age,
            patientLocation: review.patient_location,
            doctorAvatar: review.doctor_avatar,
            doctorExperience: review.doctor_experience,
            doctorDepartments: review.doctor_departments,
            createdAt: review.created_at,
            totalReviews: review.total_reviews,
        }));
    }, [apiReviews]);

    const filteredReviews = useMemo(() => {
        return reviews.filter((review) => {
            const searchLower = searchQuery.toLowerCase();

            const matchesSearch =
                searchQuery === "" ||
                review.title.toLowerCase().includes(searchLower) ||
                review.patient.toLowerCase().includes(searchLower) ||
                review.doctor.toLowerCase().includes(searchLower) ||
                review.comment?.toLowerCase().includes(searchLower);

            const matchesType =
                selectedType === "all" || review.type === selectedType;

            const matchesRating =
                selectedRating === "all" || review.rating.toString() === selectedRating;

            const matchesActive =
                selectedActive === "all" ||
                (selectedActive === "Active" && review.active) ||
                (selectedActive === "Inactive" && !review.active);

            const matchesFeatured =
                selectedFeatured === "all" ||
                (selectedFeatured === "Featured" && review.featured) ||
                (selectedFeatured === "Not Featured" && !review.featured);

            return (
                matchesSearch &&
                matchesType &&
                matchesRating &&
                matchesActive &&
                matchesFeatured
            );
        });
    }, [
        reviews,
        searchQuery,
        selectedType,
        selectedRating,
        selectedActive,
        selectedFeatured,
    ]);

    const averageRating = filteredReviews.length
        ? (
            filteredReviews.reduce((sum, r) => sum + r.rating, 0) /
            filteredReviews.length
        ).toFixed(1)
        : "0.0";

    const types = [...new Set(reviews.map((r) => r.type))];
    const ratings = [...new Set(reviews.map((r) => r.rating))].sort(
        (a, b) => b - a
    );

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`h-3 w-3 ${star <= rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                            }`}
                    />
                ))}
                <span className="ml-1 text-xs">({rating}/5)</span>
            </div>
        );
    };

    const getConsultationIcon = (type: string) => {
        switch (type) {
            case "Video":
                return <Video className="h-3 w-3 text-blue-600" />;
            case "Phone":
                return <Phone className="h-3 w-3 text-green-600" />;
            case "In-Person":
                return <MapPin className="h-3 w-3 text-purple-600" />;
            default:
                return <Video className="h-3 w-3" />;
        }
    };

    const getTypeColor = (type: string) => {
        return type === "Original"
            ? "bg-green-100 text-green-800 border-green-200"
            : "bg-yellow-100 text-yellow-800 border-yellow-200";
    };

    const getActiveColor = (active: boolean) => {
        return active
            ? "bg-green-100 text-green-800 border-green-200"
            : "bg-gray-100 text-gray-800 border-gray-200";
    };

    const getFeaturedColor = (featured: boolean) => {
        return featured
            ? "bg-purple-100 text-purple-800 border-purple-200"
            : "bg-gray-100 text-gray-800 border-gray-200";
    };

    const columns: Column<ReviewRow>[] = [
        // {
        //     key: "type",
        //     header: "Type",
        //     cell: (review) => (
        //         <Badge variant="outline" className={getTypeColor(review.type)}>
        //             {review.type}
        //         </Badge>
        //     ),
        // },
        {
            key: "srno",
            header: "Sr. No",
            cell: (review) => (
                <div>
                    {filteredReviews.indexOf(review) + 1}
                </div>
            ),
        },
        {
            key: "title",
            header: "Title",
            className: "max-w-[220px]",
            cell: (review) => (
                <div className="space-y-1">
                    <p className="font-medium">{review.title}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        {getConsultationIcon(review.consultationType)}
                        <span>{review.consultationType}</span>
                    </div>
                    {review.comment ? (
                        <p className="line-clamp-2 text-xs text-muted-foreground max-w-50 truncate">
                            {review.comment}
                        </p>
                    ) : null}
                </div>
            ),
        },
        {
            key: "patient",
            header: "Patient",
            cell: (review) => (
                <div className="space-y-1">
                    <p className="font-medium">{review.patient}</p>
                    <div className="text-xs text-muted-foreground">
                        {review.patientAge && <span>{review.patientAge}</span>}
                        {review.patientAge && review.patientLocation && <span> • </span>}
                        {review.patientLocation && <span>{review.patientLocation}</span>}
                    </div>
                </div>
            ),
        },
        {
            key: "doctor",
            header: "Doctor",
            cell: (review) => (
                <div className="space-y-1">
                    <p className="font-medium">{review.doctor}</p>
                    <div className="text-xs text-muted-foreground">
                        {review.doctorExperience && <span>{review.doctorExperience}</span>}
                        {review.doctorExperience && review.doctorDepartments && (
                            <span> • </span>
                        )}
                        {review.doctorDepartments && <span>{review.doctorDepartments}</span>}
                    </div>
                </div>
            ),
        },
        {
            key: "appointment",
            header: "Posted",
            cell: (review) => (
                <div className="space-y-1">
                    <p className="text-sm">{review.createdAt || review.appointment}</p>
                    {/* <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{review.date}</span>
                    </div> */}
                </div>
            ),
        },
        {
            key: "rating",
            header: "Rating",
            cell: (review) => renderStars(review.rating),
        },
        // {
        //     key: "active",
        //     header: "Active",
        //     cell: (review) => (
        //         <Badge variant="outline" className={getActiveColor(review.active)}>
        //             {review.active ? "Yes" : "No"}
        //         </Badge>
        //     ),
        // },
        // {
        //     key: "featured",
        //     header: "Featured",
        //     cell: (review) => (
        //         <Badge variant="outline" className={getFeaturedColor(review.featured)}>
        //             {review.featured ? "Yes" : "No"}
        //         </Badge>
        //     ),
        // },
        // {
        //     key: "actions",
        //     header: "",
        //     className: "text-right",
        //     cell: (review) => (
        //         <DropdownMenu>
        //             <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
        //                 <Button variant="ghost" size="icon" className="h-8 w-8">
        //                     <MoreVertical className="h-4 w-4" />
        //                 </Button>
        //             </DropdownMenuTrigger>

        //             <DropdownMenuContent align="end" className="w-40">
        //                 <DropdownMenuItem>
        //                     <Eye className="mr-2 h-4 w-4" />
        //                     View Details
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
        // {
        //     key: "type",
        //     label: "Type",
        //     options: types.map((t) => ({
        //         value: t,
        //         label: t,
        //     })),
        // },
        {
            key: "rating",
            label: "Rating",
            options: ratings.map((r) => ({
                value: r.toString(),
                label: `${r} Star${r !== 1 ? "s" : ""}`,
            })),
        },
        // {
        //     key: "active",
        //     label: "Active",
        //     options: [
        //         { value: "Active", label: "Active" },
        //         { value: "Inactive", label: "Inactive" },
        //     ],
        // },
        // {
        //     key: "featured",
        //     label: "Featured",
        //     options: [
        //         { value: "Featured", label: "Featured" },
        //         { value: "Not Featured", label: "Not Featured" },
        //     ],
        // },
    ];

    const filterComponents = {
        type: (value: string) => (
            <Badge variant="outline" className={getTypeColor(value)}>
                {value}
            </Badge>
        ),
        rating: (value: string) => <span>{value} ★</span>,
        active: (value: string) => (
            <Badge
                variant="outline"
                className={
                    value === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                }
            >
                {value}
            </Badge>
        ),
        featured: (value: string) => (
            <Badge
                variant="outline"
                className={
                    value === "Featured"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-gray-100 text-gray-800"
                }
            >
                {value}
            </Badge>
        ),
    };

    const handleFilter = (key: string, value: string) => {
        if (key === "type") setSelectedType(value);
        if (key === "rating") setSelectedRating(value);
        if (key === "active") setSelectedActive(value);
        if (key === "featured") setSelectedFeatured(value);
    };

    const handleClearFilters = () => {
        setSelectedType("all");
        setSelectedRating("all");
        setSelectedActive("all");
        setSelectedFeatured("all");
        setSearchQuery("");
    };

    const totalReviews = data?.pagination?.total ?? reviews.length;
    const originalCount = reviews.filter((r) => r.type === "Original").length;
    const fakeCount = reviews.filter((r) => r.type === "Fake").length;

    const summaryStats = (
        <div className="absolute top-35 right-5 flex items-center gap-4 text-sm flex-wrap">
            <Badge variant="outline" className="bg-primary/10 text-primary">
                Total: {totalReviews} reviews
            </Badge>
            {/* <Badge variant="outline" className="bg-green-50 text-green-700">
                Original: {originalCount}
            </Badge>
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                Fake: {fakeCount}
            </Badge> */}
            <Badge variant="outline" className="bg-purple-50 text-purple-700">
                Avg Rating: {averageRating} ★
            </Badge>
            {filteredReviews.length !== reviews.length && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    Filtered: {filteredReviews.length} items
                </Badge>
            )}
        </div>
    );

    if (isLoading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Loading reviews...</span>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Button onClick={() => router.back()} className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                </div>

                <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-destructive">
                    Failed to load reviews.
                    <div className="mt-1 text-sm text-muted-foreground">
                        {(error as Error)?.message || "Something went wrong"}
                    </div>
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
            </div>

            <DataTable
                title="Doctor Reviews"
                data={filteredReviews}
                columns={columns}
                filters={filters}
                searchPlaceholder="Search by title, patient, doctor, or review..."
                onSearch={setSearchQuery}
                onFilter={handleFilter}
                onClearFilters={handleClearFilters}
                activeFilters={{
                    type: selectedType,
                    rating: selectedRating,
                    active: selectedActive,
                    featured: selectedFeatured,
                }}
                filterComponents={filterComponents}
                getId={(review) => review.id}
                onSelectionChange={(selectedIds) => console.log("Selected:", selectedIds)}
                summaryStats={summaryStats}
            />
        </div>
    );
}