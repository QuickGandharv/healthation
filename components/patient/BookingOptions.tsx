import { Calendar, Video } from 'lucide-react';

export function BookingOptions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <button className="flex items-center gap-4 p-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        <div className="p-3 bg-white/20 rounded-full">
          <Calendar className="w-8 h-8" />
        </div>
        <div className="text-left">
          <h3 className="text-xl mb-1">Book In-Clinic Appointment</h3>
          <p className="text-blue-100 text-sm">Schedule a visit to our clinic</p>
        </div>
      </button>
      
      <button className="flex items-center gap-4 p-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
        <div className="p-3 bg-white/20 rounded-full">
          <Video className="w-8 h-8" />
        </div>
        <div className="text-left">
          <h3 className="text-xl mb-1">Telehealth / Video Call</h3>
          <p className="text-green-100 text-sm">Connect with doctor online</p>
        </div>
      </button>
    </div>
  );
}