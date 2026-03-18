"use client";
import { Briefcase, Star, Video, MapPin, ChevronRight, User, Stethoscope } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useQueryClient } from "@tanstack/react-query";
import Image from 'next/image';
import { useParams, useRouter } from "next/navigation";
import { useBrowseDoctorById } from '@/queries/patient/useBrowseDoctorById';
import { useBooking } from '@/context/BookingContext';
import { useBookAppointment } from '@/queries/patient/useBookAppointment';

const doctorPlaceholder = 'https://telehealthwebapplive.cmcludhiana.in/storage/user_avatar/bbe7ad3e-fd77-4048-9bd9-3272433d79f0.jpeg';

type DoctorSlot = {
    id: string;
    start_time: string;
    end_time: string;
    consultation_type: string;
    opd_type?: string;
    consultation_fee?: number;
};

type DoctorAvailability = {
    date: string;
    slots: DoctorSlot[];
};

type DoctorReview = {
    id: string;
    patient_name: string;
    patient_age: string;
    title: string;
    content: string;
    rating: number;
    total_reviews: number | string;
    doctor_name: string;
};

const Page = () => {

    const router = useRouter();
    const params = useParams();
    const idParam = params.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;
    const { data, isLoading } = useBrowseDoctorById(id);
    const doctor = data?.data;
    const availability: DoctorAvailability[] = (doctor as any)?.availability ?? [];
    const doctorReviews: DoctorReview[] = (doctor as any)?.doctor_reviews ?? [];
    const reviewSummary = doctor?.review_summary;
    const appointmentTypes = doctor?.appointment_types;
    const languages = Array.isArray(doctor?.languages)
        ? doctor.languages
        : doctor?.languages
        ? [doctor.languages]
        : [];

    const { setBookingData } = useBooking();
    const queryClient = useQueryClient();
    const [selectedAppointmentType, setSelectedAppointmentType] = useState<'video' | 'in_person'>('video');
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedSlot, setSelectedSlot] = useState<DoctorSlot | null>(null);
    const { mutate, isPending } = useBookAppointment();

    const getDateDisplay = (dateStr: string) => {
        const date = new Date(dateStr);
        const day = date.getDate();
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        return { day, dayName };
    };

    useEffect(() => {
        if (!selectedDate && availability.length > 0) {
            setSelectedDate(availability[0]!.date);
        }
    }, [availability, selectedDate]);

    const selectedDateSlots = availability.find(a => a.date === selectedDate)?.slots || [];

    const handleBookAppointment = () => {

        if (!selectedSlot) {
            alert('Please select a time slot');
            return;
        }

        if (!doctor?.id) return;

        const bookingData: any = {
            doctor_id: doctor.id,
            availability_id: selectedSlot.id,
            appointment_date: selectedDate,
            appointment_time: selectedSlot.start_time,
            consultation_type: selectedAppointmentType,
            consultation_fee: selectedSlot.consultation_fee ?? 0
        };

        setBookingData(bookingData);
        
        mutate(bookingData, {
            onSuccess: (response) => {
                console.log("Booking Success:", response);

                // Invalidate appointment queries to refresh data
                queryClient.invalidateQueries({
                    queryKey: ["appointment"],
                });

                router.push(`/patient/appointment-summary?bookingId=${response?.data?.appointment?.id}`);
            },
            onError: (error: any) => {
                console.log("Booking Error (Raw):", error);
                console.log("Booking Error Data:", JSON.stringify(error?.response?.data, null, 2));

                const errorData = error?.response?.data;
                let errorMsg = "Failed to book appointment. Please try again.";

                if (errorData) {
                    if (errorData.errors) {
                        // Extracts the first validation error from any field (e.g., appointment_date)
                        const firstKey = Object.keys(errorData.errors)[0];
                        const firstError = errorData.errors[firstKey];
                        if (Array.isArray(firstError)) {
                            errorMsg = firstError[0];
                        } else if (typeof firstError === "string") {
                            errorMsg = firstError;
                        }
                    } else if (errorData.message) {
                        errorMsg = errorData.message;
                    }
                } else if (error.message) {
                    errorMsg = error.message;
                }

                // setResultModalMessage(errorMsg);
                // setResultModalSuccess(false);
                // setResultModalVisible(true);
            },
          });
    };

    

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-6">

                {isLoading ? (
                    <div className="bg-white rounded-2xl shadow-md p-6">Loading…</div>
                ) : null}

                {!isLoading && !doctor ? (
                    <div className="bg-white rounded-2xl shadow-md p-6">Doctor not found.</div>
                ) : null}

                {!isLoading && doctor ? (
                    <>

                        {/* Doctor Header */}
                        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">

                            {/* Doctor Image */}
                            <div className="bg-white flex items-center justify-center p-6">
                                <Image
                                    src={doctor.profile?.avatar || doctorPlaceholder}
                                    alt="Doctor"
                                    width={640}
                                    height={480}
                                    className="w-full max-w-md h-auto object-contain"
                                    priority
                                    unoptimized
                                />
                            </div>
                        
                            <div className="px-6 pb-6">

                                <div className="flex items-center gap-2 text-gray-700 mb-2">
                                    <Stethoscope className="w-5 h-5" />
                                    <span>{doctor.profile?.department}</span>
                                </div>

                                <h1 className="text-3xl mb-6">{doctor.profile?.name}</h1>

                                {/* Stats Cards */}
                                <div className="grid grid-cols-2 gap-4">

                                    <div className="border border-gray-200 rounded-2xl p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-3 bg-gray-100 rounded-full">
                                                <Briefcase className="w-6 h-6 text-gray-700" />
                                            </div>
                                            <div>
                                                <p className="text-2xl mb-1">{doctor.profile?.years_experience} years</p>
                                                <p className="text-gray-600 text-sm">Work Experience</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border border-gray-200 rounded-2xl p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-3 bg-gray-100 rounded-full">
                                                <Star className="w-6 h-6 text-gray-700" />
                                            </div>
                                            <div>
                                                <p className="text-2xl mb-1">{reviewSummary?.average_rating ?? 0}</p>
                                                <p className="text-gray-600 text-sm">Reviews ({reviewSummary?.total_reviews ?? 0})</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About Doctor */}
                        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                            <h2 className="text-2xl mb-3">About Doctor</h2>
                            <p className="text-gray-700">{doctor.about?.bio}</p>
                        </div>

                        {/* Education */}
                        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                            <h2 className="text-2xl mb-3">Education</h2>
                            <ul className="space-y-2">
                                {(doctor.education ?? []).map((edu, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="w-2 h-2 bg-gray-900 rounded-full mt-2"></span>
                                        <span className="text-gray-700">{edu.degree}, {edu.institution}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Languages */}
                        {languages.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                                <h2 className="text-2xl mb-4">Languages</h2>
                                <div className="flex flex-wrap gap-3">
                                    {languages.map((language, index) => (
                                        <span
                                            key={index}
                                            className="px-6 py-2 border-2 border-gray-300 rounded-full text-gray-700"
                                        >
                                            {language}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Reviews Section */}
                        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                            
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl">Reviews</h2>
                                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                    <span>See All</span>
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        
                            <div className="space-y-4">
                                {doctorReviews.slice(0, 2).map((review) => (
                                    <div
                                        key={review.id}
                                        className="border border-gray-200 rounded-2xl overflow-hidden"
                                    >
                                        <div className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                                                        <User className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg mb-1">{review.patient_name}</h3>
                                                        <p className="text-gray-600 text-sm">{review.patient_age}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 bg-gray-100 px-3 py-2 rounded-xl">
                                                    <Star className="w-4 h-4 fill-gray-800 text-gray-800" />
                                                    <span className="font-medium">{review.rating}</span>
                                                </div>
                                            </div>
                                            <h4 className="text-lg mb-2">{review.title}</h4>
                                            <p className="text-gray-700">{review.content}</p>
                                        </div>
                                        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
                                            <p className="font-medium">
                                                {review.total_reviews} Reviews for {review.doctor_name}
                                            </p>
                                            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                                                <User className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Select Appointment Type */}
                        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                            <h2 className="text-2xl mb-4">Select Appointment type</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {appointmentTypes?.video && (
                                    <button
                                        onClick={() => setSelectedAppointmentType('video')}
                                        className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-colors ${
                                        selectedAppointmentType === 'video'
                                            ? 'bg-green-900 text-white border-green-900'
                                            : 'border-gray-300 hover:border-green-900'
                                        }`}
                                    >
                                        <Video className="w-6 h-6" />
                                        <span className="font-medium">Online Video Appointment</span>
                                    </button>
                                )}
                                {appointmentTypes?.in_person && (
                                    <button
                                        onClick={() => setSelectedAppointmentType('in_person')}
                                        className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-colors ${
                                        selectedAppointmentType === 'in_person'
                                            ? 'bg-green-900 text-white border-green-900'
                                            : 'border-gray-300 hover:border-green-900'
                                        }`}
                                    >
                                        <MapPin className="w-6 h-6" />
                                        <span className="font-medium">In-Clinic Appointment</span>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Select Schedules */}
                        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                            
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl">Select Schedules</h2>
                                <span className="text-gray-600">March 2026</span>
                            </div>
                        
                            <div className="flex gap-4 overflow-x-auto pb-2 mb-6">
                                {availability.map((availability) => {
                                    const { day, dayName } = getDateDisplay(availability.date);
                                    const isSelected = selectedDate === availability.date;
                                    return (
                                        <button
                                            key={availability.date}
                                            onClick={() => {
                                                setSelectedDate(availability.date);
                                                setSelectedSlot(null);
                                            }}
                                            className={`flex-shrink-0 flex flex-col items-center justify-center w-20 h-20 rounded-xl transition-colors ${
                                                isSelected
                                                ? 'bg-green-900 text-white'
                                                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                            }`}
                                        >
                                            <span className="text-2xl mb-1">{day}</span>
                                            <span className="text-sm">{dayName}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Time Slots */}
                            {selectedDate && (
                                <div className="space-y-3">
                                    {selectedDateSlots.map((slot) => (
                                        <button
                                            key={slot.id}
                                            onClick={() => setSelectedSlot(slot)}
                                            className={`w-full p-4 rounded-xl text-center transition-colors ${
                                                selectedSlot?.id === slot.id
                                                ? 'bg-green-900 text-white'
                                                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                            }`}
                                        >
                                            <div className="font-medium">{slot.start_time} - {slot.end_time}</div>
                                            <div className="text-sm opacity-80">
                                                {slot.consultation_type} ({slot.opd_type})
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}

                        </div>

                        {/* Book Appointment Button */}
                        <button
                            onClick={handleBookAppointment}
                            className="w-full bg-green-900 text-white py-4 rounded-xl hover:bg-green-800 transition-colors text-lg font-medium"
                        >
                            Book Appointment (₹{selectedSlot?.consultation_fee ?? availability[0]?.slots?.[0]?.consultation_fee ?? 1}.00)
                        </button>
                    
                    </>
                ) : null}
            </div>
        </div>
    );
}

export default Page