"use client";

import { Stethoscope } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { useAuth } from '@/context/AuthContext';
import { useSearchParams } from "next/navigation";
import { useVerifyPayment } from '@/queries/patient/useVerifyPayment';
import { getAppointmentDetailsById } from '@/queries/patient/getAppointmentDetails';

const doctorPlaceholder = 'https://telehealthwebapplive.cmcludhiana.in/storage/user_avatar/bbe7ad3e-fd77-4048-9bd9-3272433d79f0.jpeg';

const calculateAge = (dob: string) => {

    const birthDate = new Date(dob);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Adjust days
    if (days < 0) {
        months--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
    }

    // Adjust months
    if (months < 0) {
        years--;
        months += 12;
    }

    // 🎯 Your conditions
    if (years > 0) {
        return `${years} year${years > 1 ? "s" : ""}`;
    }

    if (months > 0) {
        return `${months} month${months > 1 ? "s" : ""}`;
    }

    return `${days} day${days > 1 ? "s" : ""}`;
};

const Page = () => {

    const searchParams = useSearchParams();
    const bookingId = searchParams.get("bookingId");
    const { bookingData } = useBooking();
    const { user } = useAuth();
    const { mutate: verifyPayment } = useVerifyPayment();
    const appointmentId = typeof bookingId === "string" ? bookingId : undefined;
    const { data, isLoading, error, isError, refetch } = getAppointmentDetailsById(appointmentId);
    const AppointmentDetails = data?.data;
    const calAge = calculateAge(user?.date_of_birth);
    

    if (!bookingData) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-2xl mx-auto bg-white min-h-screen p-6">
                    <p className="text-gray-700">No booking data found.</p>
                </div>
            </div>
        );
    }

    const dayOfWeek = bookingData.date
        ? new Date(bookingData.date).toLocaleDateString('en-US', { weekday: 'long' })
        : '';

    console.log('data', data)

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-2xl mx-auto bg-white min-h-screen">

                {/* Doctor Header with Illustration */}
                <div className="bg-gradient-to-br from-teal-200 to-teal-300">
                    <img 
                        src={doctorPlaceholder} 
                        alt="Doctor"
                        className="w-full h-auto"
                    />
                </div>

                <div className="p-6">

                    {/* Doctor Info */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 text-gray-700 mb-2">
                            <Stethoscope className="w-5 h-5" />
                            <span>Department</span>
                        </div>
                        <h1 className="text-3xl">Doctor</h1>
                    </div>

                    {/* Appointment Details */}
                    <div className="mb-8">
                        <h2 className="text-2xl mb-4">Appointment Details</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                <span className="text-gray-600">Date</span>
                                {/* <span className="font-medium">{AppointmentDetails.schedule.date_formatted}</span> */}
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                <span className="text-gray-600">Time</span>
                                <span className="font-medium">
                                    {bookingData.startTime} - {bookingData.endTime}
                                </span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                <span className="text-gray-600">Booking Type</span>
                                <span className="font-medium">{bookingData.appointmentType}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Detail */}
                    <div className="mb-8">
                        <h2 className="text-2xl mb-4">Patient Detail</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                <span className="text-gray-600">Patient Age</span>
                                <span className="font-medium">{calAge}</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                <span className="text-gray-600">Gender</span>
                                <span className="font-medium">{user?.gender}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Detail */}
                    <div className="mb-8">
                        <h2 className="text-2xl mb-4">Payment Detail</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                <span className="text-gray-600">Consultation Fee</span>
                                {/* <span className="font-medium">₹{bookingData.consultationFee.toFixed(2)}</span> */}
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                <span className="text-gray-600">Total</span>
                                <span className="font-medium">{bookingData.consultationFee}</span>
                            </div>
                        </div>
                    </div>

                    {/* Book Appointment Button */}
                    <button
                        className="w-full bg-green-900 text-white py-4 rounded-xl hover:bg-green-800 transition-colors text-lg font-medium"
                    >
                        Book Appointment (₹{bookingData.consultationFee})
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Page