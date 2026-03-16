export function AdvertisementSection() {
  const ads = [
    {
      id: 1,
      title: 'Free Health Checkup',
      description: 'Get your annual health checkup done for free this month',
      color: 'bg-purple-100'
    },
    {
      id: 2,
      title: 'Dental Care Package',
      description: 'Complete dental care at 30% off - Limited time offer',
      color: 'bg-green-100'
    },
    {
      id: 3,
      title: 'Mental Wellness Program',
      description: 'Join our mental wellness sessions - First session free',
      color: 'bg-blue-100'
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl mb-4">Special Offers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ads.map((ad) => (
          <div
            key={ad.id}
            className={`${ad.color} rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer`}
          >
            <h3 className="text-xl mb-2">{ad.title}</h3>
            <p className="text-gray-700 text-sm">{ad.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}