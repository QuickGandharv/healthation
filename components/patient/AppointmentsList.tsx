import { Calendar, Clock, MapPin, Video } from 'lucide-react';

export function AppointmentsList() {
  const appointments = [
    {
      id: 1,
      type: 'video',
      doctor: 'Dr. Sarah Anderson',
      specialty: 'Cardiologist',
      date: 'Today',
      time: '2:00 PM',
      status: 'upcoming'
    },
    {
      id: 2,
      type: 'clinic',
      doctor: 'Dr. James Wilson',
      specialty: 'Dermatologist',
      date: 'Tomorrow',
      time: '10:30 AM',
      location: 'Building A, Room 203',
      status: 'upcoming'
    },
    {
      id: 3,
      type: 'video',
      doctor: 'Dr. Emily Roberts',
      specialty: 'General Physician',
      date: 'March 18, 2026',
      time: '4:00 PM',
      status: 'upcoming'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl mb-4">My Appointments</h2>
      <div className="space-y-4">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {apt.type === 'video' ? (
                    <Video className="w-5 h-5 text-green-600" />
                  ) : (
                    <MapPin className="w-5 h-5 text-blue-600" />
                  )}
                  <span className="text-sm font-medium text-gray-600">
                    {apt.type === 'video' ? 'Video Consultation' : 'In-Clinic Visit'}
                  </span>
                </div>
                <h3 className="text-lg mb-1">{apt.doctor}</h3>
                <p className="text-gray-600 text-sm mb-3">{apt.specialty}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {apt.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {apt.time}
                  </div>
                  {apt.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {apt.location}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {apt.type === 'video' && apt.date === 'Today' && (
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                    Join Call
                  </button>
                )}
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                  Reschedule
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}