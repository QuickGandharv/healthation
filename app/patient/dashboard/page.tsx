"use client";

import { BookingOptions } from '../../../components/patient/BookingOptions';
import { DoctorSearch } from '../../../components/patient/DoctorSearch';
import { AdvertisementSection } from '../../../components/patient/AdvertisementSection';
import { PatientReviews } from '../../../components/patient/PatientReviews';
import { AppointmentsList } from '../../../components/patient/AppointmentsList';

const Home = () => {
    return(
            <div className="min-h-screen bg-gray-50">

                {/* Header */}
                <header className="bg-white shadow-sm sticky top-0 z-30">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <h1 className="text-3xl text-blue-600">Patient Dashboard</h1>
                        <p className="text-gray-600 text-sm mt-1">Welcome back! Manage your healthcare journey</p>
                    </div>
                </header>
    
                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 py-8">
                    {/* Booking Options */}
                    <BookingOptions />
            
                    {/* Doctor Search */}
                    <DoctorSearch />
            
                    {/* Appointments Section */}
                    <AppointmentsList />
            
                    {/* Advertisement Section */}
                    <AdvertisementSection />
            
                    {/* Patient Reviews */}
                    <PatientReviews />
                </main>
    
        </div>
    )
}

export default Home