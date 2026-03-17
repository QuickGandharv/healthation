"use client";

import { Stethoscope } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
const doctorPlaceholder = 'https://telehealthwebapplive.cmcludhiana.in/storage/user_avatar/bbe7ad3e-fd77-4048-9bd9-3272433d79f0.jpeg';

interface BookingSummaryProps {
  appointmentData: {
    doctor: {
      name: string;
      department: string;
    };
    appointment: {
      date: string;
      dayOfWeek: string;
      time: string;
      bookingType: string;
    };
    patient: {
      age: number;
      gender: string;
    };
    payment: {
      consultationFee: number;
      discount: number;
      total: number;
    };
  };
}

export function BookingSummary({ appointmentData }: BookingSummaryProps) {
    
  const { doctor, appointment, patient, payment } = appointmentData;

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
              <span>{doctor.department}</span>
            </div>
            <h1 className="text-3xl">{doctor.name}</h1>
          </div>

          {/* Appointment Details */}
          <div className="mb-8">
            <h2 className="text-2xl mb-4">Appointment Details</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Date</span>
                <span className="font-medium">{appointment.date} | {appointment.dayOfWeek}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Time</span>
                <span className="font-medium">{appointment.time}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Booking Type</span>
                <span className="font-medium">{appointment.bookingType}</span>
              </div>
            </div>
          </div>

          {/* Patient Age */}
          <div className="mb-8">
            <h2 className="text-2xl mb-4">Patient Age</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Patient Age</span>
                <span className="font-medium">{patient.age}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Gender</span>
                <span className="font-medium">{patient.gender}</span>
              </div>
            </div>
          </div>

          {/* Payment Detail */}
          <div className="mb-8">
            <h2 className="text-2xl mb-4">Payment Detail</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Consultation Fee</span>
                <span className="font-medium">₹{payment.consultationFee.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Additional Discount</span>
                <span className="font-medium">{payment.discount}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Total</span>
                <span className="font-medium">{payment.total}</span>
              </div>
            </div>
          </div>

          {/* Book Appointment Button */}
          <button
            className="w-full bg-green-900 text-white py-4 rounded-xl hover:bg-green-800 transition-colors text-lg font-medium"
          >
            Book Appointment (₹{payment.total})
          </button>
        </div>
      </div>
    </div>
  );
}
