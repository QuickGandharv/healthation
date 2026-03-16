import { Search, Stethoscope } from 'lucide-react';
import { useState } from 'react';

const specialties = [
  'Cardiology', 'Dermatology', 'Neurology', 'Pediatrics', 
  'Orthopedics', 'Psychiatry', 'General Medicine', 'ENT'
];

const symptoms = [
  'Fever', 'Headache', 'Cough', 'Chest Pain', 
  'Skin Rash', 'Joint Pain', 'Fatigue', 'Dizziness'
];

export function DoctorSearch() {
  const [searchType, setSearchType] = useState<'specialty' | 'symptom'>('specialty');
  const [searchTerm, setSearchTerm] = useState('');

  const options = searchType === 'specialty' ? specialties : symptoms;
  const filteredOptions = options.filter(opt => 
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl mb-4 flex items-center gap-2">
        <Stethoscope className="w-6 h-6 text-blue-600" />
        Find a Doctor
      </h2>
      
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setSearchType('specialty')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            searchType === 'specialty' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          By Specialty
        </button>
        <button
          onClick={() => setSearchType('symptom')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            searchType === 'symptom' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          By Symptom
        </button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder={`Search by ${searchType}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {filteredOptions.map((option) => (
          <button
            key={option}
            className="p-3 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-sm"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
