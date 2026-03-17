"use client";

import { Star, User } from 'lucide-react';
import Image from 'next/image';
import type { TestimonialProps } from '@/types/patient/home';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type PatientReviewsProps = {
    data?: TestimonialProps[];
};

const PatientReviews = ({ data = [] }: PatientReviewsProps) => {

    const isSlider = data.length > 3;

    const Card = (review: TestimonialProps) => (
        <div
            key={review.id}
            className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
        >
            <div className="p-6">

                {/* Patient Info */}
                <div className="flex items-start justify-between mb-6">

                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
                            {review.patient_image ? (
                                <Image
                                    src={review.patient_image}
                                    alt="Avatar"
                                    width={80}
                                    height={80}
                                    className="rounded-full"
                                    unoptimized
                                />
                            ) : (
                                <User className="w-8 h-8 text-white" />
                            )}
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

                <h4 className="text-lg mb-3">{review.title}</h4>
                <p className="text-gray-700">{review.content}</p>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
                <p className="font-medium">
                    {review.total_reviews} Reviews for {review.doctor_name}
                </p>

                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                    {review.doctor_avatar ? (
                        <Image
                            src={review.doctor_avatar}
                            alt="Avatar"
                            width={40}
                            height={40}
                            className="rounded-full"
                            unoptimized
                        />
                    ) : (
                        <User className="w-5 h-5 text-white" />
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="mb-8">
            <h2 className="text-2xl mb-4">Patient Reviews</h2>
            {isSlider ? (
                <Carousel opts={{ align: "start" }} className="w-full">
                
                    <CarouselContent>
                        {data.map((review) => (
                            <CarouselItem
                                key={review.id}
                                className="md:basis-1/2 lg:basis-1/3"
                            >
                                {Card(review)}
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Navigation buttons */}
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((review) => Card(review))}
                </div>
            )}
        </div>
    );
};

export default PatientReviews;