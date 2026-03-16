import { Star, User } from 'lucide-react';
import Image from 'next/image';
import type { TestimonialProps } from '@/types/patient/home';

type PatientReviewsProps = {
  data?: TestimonialProps[];
};

const PatientReviews = ({ data = [] }: PatientReviewsProps) => {
    return (
        <div className="mb-8">
            <h2 className="text-2xl mb-4">Patient Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((review) => (
                    <div
                        key={review.slug ?? `${review.patient_id}-${review.doctor_id ?? ''}`}
                        className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        {/* Review Content */}
                        <div className="p-6">

                            {/* Patient Info */}
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                                        <User className="w-8 h-8 text-white" />
                                        <Image
                                            src={review.patient_image}
                                            alt="Avatar"
                                            width={80}
                                            height={80}
                                            priority
                                            className="rounded-full"
                                            unoptimized
                                        />
                                    </div>
                                <div>
                                <h3 className="text-xl mb-1">{review.patient_name}</h3>
                                <p className="text-gray-600">{review.patient_age} Years</p>
                            </div>

                        </div>

                            <div className="flex items-center gap-1 bg-gray-100 px-3 py-2 rounded-xl">
                                <Star className="w-5 h-5 fill-gray-800 text-gray-800" />
                                <span className="font-medium">{review.rating}</span>
                            </div>

                        </div>

                            {/* Consultation title */}
                            <h4 className="text-lg mb-3">{review.title}</h4>

                            {/* Review content */}
                            <p className="text-gray-700">{review.content}</p>
                        </div>

                        {/* Doctor Info Footer */}
                        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                            <p className="font-medium">
                                {review.total_reviews} Reviews for {review.doctor_name}
                            </p>
                            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                                {review.doctor_avatar ? (
                                    <Image
                                        src={review.doctor_avatar}
                                        alt="Avatar"
                                        width={40}
                                        height={40}
                                        priority
                                        className="rounded-full"
                                        unoptimized
                                    />
                                ) : (
                                    <User className="w-5 h-5 text-white" />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PatientReviews