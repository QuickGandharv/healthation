"use client";

import { BookingOptions } from '../../../components/patient/BookingOptions';
import DoctorSearch from '../../../components/patient/DoctorSearch';
import AdvertisementSection from '../../../components/patient/AdvertisementSection';
import PatientReviews from '../../../components/patient/PatientReviews';
import AvaliableDoctor from '@/components/patient/AvaliableDoctor';
import { usePatientHome } from '@/queries/patient/usePatientHome';
import { useAuth } from '@/context/AuthContext';

const Home = () => {

    const { token, initializing } = useAuth();
    const { data, isLoading, isError, error, refetch } = usePatientHome(!!initializing && !!token);
    const homeData = data?.data;
    const avaliableDoctor = homeData?.available_doctors
    const patientReviews = homeData?.patient_reviews;
    const Advertisement = homeData?.advertisements
    const specialitySymptoms = homeData?.speciality_symptoms;

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
                <DoctorSearch data={specialitySymptoms} />
        
                {/* Appointments Section */}
                <AvaliableDoctor data={avaliableDoctor} />
        
                {/* Advertisement Section */}
                <AdvertisementSection data={Advertisement} />
        
                {/* Patient Reviews */}
                <PatientReviews data={patientReviews} />
                
            </main>
    
        </div>
    )
}

export default Home