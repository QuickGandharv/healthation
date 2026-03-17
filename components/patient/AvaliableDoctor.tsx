"use client";

import { MapPin, Video, Star, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


const AvaliableDoctor = ({data}: any) => {
    const router = useRouter();
    return (
        <div className="mb-8">
            <h2 className="text-2xl mb-4">Avaliable Doctor</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data && data.slice(0, 3).map((apt: any) => (
                    <div
                        key={apt.id}
                        className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                        {/* Doctor Info */}
                        <div className="flex items-start gap-4 mb-6">
                            <Image
                                src={apt.avatar}
                                alt="Company Logo"
                                width={80}
                                height={80}
                                priority
                                className="rounded-full"
                                unoptimized
                            />
                            <div className="flex-1 min-w-0">
                                <h3 className="text-xl mb-1 truncate">{apt.name}</h3>
                                <p className="text-gray-600 text-sm mb-2">
                                    {apt.speciality?.join(", ")} {''}
                                    ({apt.years_experience} Years Exp)
                                </p>
                                <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg w-fit">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-medium text-sm">{apt.rating}</span>
                                </div>
                            </div>
                        </div>

                        {/* Appointment Details */}
                        <div className="bg-gray-50 rounded-xl p-4 mb-4">

                            <div className="grid grid-cols-2 gap-4 mb-3">
                                <div>
                                    <p className="text-gray-600 text-sm mb-1">Consultation Type</p>
                                    <div className="flex items-center gap-2 text-green-600">
                                        {apt.type === 'video' ? (
                                            <Video className="w-4 h-4" />
                                        ) : (
                                            <MapPin className="w-4 h-4" />
                                        )}
                                        <span className="font-medium text-sm">
                                            {apt.consultation_type}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm mb-1">Consultation Fee</p>
                                    <p className="font-medium">{apt.consultation_fee}</p>
                                </div>
                            </div>
                        
                        </div>

                        {/* Action Button */}
                        <button 
                        onClick={() => router.push(`/patient/doctor-detail/${apt.id}`)}
                        className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                            <span className="font-medium">
                                Book Appointment
                            </span>
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AvaliableDoctor 