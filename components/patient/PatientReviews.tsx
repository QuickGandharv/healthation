import { Star, User } from 'lucide-react';

export function PatientReviews() {

    const reviews = [
    {
        id: 1,
        name: 'Sarah Johnson',
        rating: 5,
        comment: 'Excellent service! The video consultation was very smooth and the doctor was very professional.',
        date: '2 days ago'
    },
    {
        id: 2,
        name: 'Michael Chen',
        rating: 4,
        comment: 'Great experience with the telehealth service. Easy to book and very convenient.',
        date: '1 week ago'
    },
    {
        id: 3,
        name: 'Emily Williams',
        rating: 5,
        comment: 'The in-clinic appointment was well organized. Staff was friendly and caring.',
        date: '2 weeks ago'
    }
    ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl mb-4">Patient Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-4 last:border-0">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-100 rounded-full">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium">{review.name}</h4>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div className="flex gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
