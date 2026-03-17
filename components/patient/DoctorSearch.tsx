import { Search, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { SpecialityProps } from '@/types/patient/home';

type DoctorSearchProps = {
    data?: SpecialityProps[];
};

const DoctorSearch = ({ data = [] }: DoctorSearchProps) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState<'Speciality' | 'Symptoms'>('Speciality');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Get all unique symptoms from all specialties
    const allSymptoms = data.flatMap(spec => 
        spec.symptoms.map(symptom => ({
            ...symptom,
            relatedSpecialtyId: spec.id,
            relatedSpecialty: spec.department.name
        }))
    );

    const currentData = selectedFilter === 'Speciality' 
    ? data.map(spec => ({
            id: spec.id,
            name: spec.department.name,
            icon: spec.department.icon
        }))
    : allSymptoms.map(symptom => ({
            id: symptom.id,
            name: symptom.name,
            icon: symptom.icon,
            relatedSpecialtyId: symptom.relatedSpecialtyId,
            relatedSpecialty: symptom.relatedSpecialty
        }));
  
    const filteredItems = currentData.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleItemClick = (item: any) => {
        if (selectedFilter === 'Symptoms') {
            // Send symptom ID and related specialty ID in params
            const params = new URLSearchParams({
                symptomId: item.id,
                specialtyId: item.relatedSpecialtyId,
                type: 'symptom'
            });
            console.log(`Navigate to: /doctors?${params.toString()}`);
        } else {
            // Send specialty ID in params
            const params = new URLSearchParams({
                specialtyId: item.id,
                type: 'specialty'
            });
            console.log(`Navigate to: /doctors?${params.toString()}`);
        }
    };

    return (
        <div className="mb-8">

            <h2 className="text-2xl mb-4">Find a Doctor</h2>
        
            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-md p-3 mb-6 flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Search A Doc by"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-3 py-2 focus:outline-none"
                />
                <div className="relative">

                    <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 rounded-lg border-l border-gray-200"
                    >
                        <span className="font-medium">{selectedFilter}</span>
                        <ChevronDown className="w-4 h-4" />
                    </button>
                
                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-10">
                            <button
                                onClick={() => {
                                    setSelectedFilter('Speciality');
                                    setIsDropdownOpen(false);
                                    setSearchTerm('');
                                }}
                                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 ${
                                    selectedFilter === 'Speciality' ? 'bg-gray-100 font-medium' : ''
                                }`}
                            >
                                Speciality
                            </button>
                            <button
                                onClick={() => {
                                    setSelectedFilter('Symptoms');
                                    setIsDropdownOpen(false);
                                    setSearchTerm('');
                                }}
                                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 ${
                                    selectedFilter === 'Symptoms' ? 'bg-gray-100 font-medium' : ''
                                }`}
                            >
                                Symptoms
                            </button>
                        </div>
                    )}
                </div>
                <button className="p-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors">
                    <Search className="w-5 h-5" />
                </button>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredItems.length === 0 ? (
                    <p className="col-span-full text-sm text-gray-500">
                        No {selectedFilter.toLowerCase()} found.
                    </p>
                ) : null}
                {filteredItems.map((item, index) => (
                    <button
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                        className="flex flex-col items-center gap-3 p-4 hover:scale-105 transition-transform"
                    >
                        <div className={`w-16 h-16 bg-secondary rounded-full flex items-center justify-center overflow-hidden`}>
                            <img 
                                src={item.icon} 
                                alt={item.name} 
                                className="w-8 h-8 object-contain"
                                onError={(e) => {
                                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"%3E%3Cpath d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"%3E%3C/path%3E%3Ccircle cx="12" cy="7" r="4"%3E%3C/circle%3E%3C/svg%3E';
                                }}
                            />
                        </div>
                        <span className="text-sm text-center">{item.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default DoctorSearch