import React from 'react';
import { Search, Plus } from 'lucide-react';
import type { City, Settings } from '../types';

const popularCities: City[] = [
  { id: '1', name: 'New York', country: 'US' },
  { id: '2', name: 'London', country: 'UK' },
  { id: '3', name: 'Tokyo', country: 'JP' },
  { id: '4', name: 'Paris', country: 'FR' },
  { id: '5', name: 'Sydney', country: 'AU' },
  { id: '6', name: 'Dubai', country: 'AE' },
  { id: '7', name: 'Singapore', country: 'SG' },
  { id: '8', name: 'Moscow', country: 'RU' },
  { id: '9', name: 'Saint Petersburg', country: 'RU' },
];

interface CitySelectorProps {
  onCitiesSelected: (cities: City[]) => void;
  settings: Settings;
}

export default function CitySelector({ onCitiesSelected, settings }: CitySelectorProps) {
  const [selectedCities, setSelectedCities] = React.useState<City[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleCitySelect = (city: City) => {
    if (!selectedCities.find(c => c.id === city.id)) {
      setSelectedCities([...selectedCities, city]);
    }
  };

  const handleRemoveCity = (cityId: string) => {
    setSelectedCities(selectedCities.filter(c => c.id !== cityId));
  };

  const handleSubmit = () => {
    if (selectedCities.length > 0) {
      onCitiesSelected(selectedCities);
    }
  };

  const filteredCities = popularCities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedCities.find(c => c.id === city.id)
  );

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      settings.darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-500 to-purple-600'
    }`}>
      <div className={`${
        settings.darkMode ? 'bg-gray-800 text-white' : 'bg-white/90'
      } backdrop-blur-sm rounded-xl p-8 w-full max-w-md shadow-2xl`}>
        <h2 className="text-3xl font-bold mb-6">Select Cities</h2>
        
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg ${
              settings.darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-gray-50 border-gray-200 text-gray-800'
            } border focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
          />
          <Search className="absolute right-3 top-3 text-gray-400" size={20} />
        </div>

        <div className="mb-6">
          <h3 className={`text-sm font-semibold mb-2 ${
            settings.darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Selected Cities ({selectedCities.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedCities.map(city => (
              <span
                key={city.id}
                onClick={() => handleRemoveCity(city.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${
                  settings.darkMode
                    ? 'bg-blue-900 text-blue-100 hover:bg-blue-800'
                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                } transition-colors`}
              >
                {city.name}, {city.country}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {filteredCities.map(city => (
            <button
              key={city.id}
              onClick={() => handleCitySelect(city)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg ${
                settings.darkMode
                  ? 'hover:bg-gray-700 text-gray-200'
                  : 'hover:bg-gray-50 text-gray-700'
              } transition-colors`}
            >
              <span>{city.name}, {city.country}</span>
              <Plus size={20} className="text-blue-500" />
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={selectedCities.length === 0}
          className={`mt-6 w-full font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            settings.darkMode
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          Start Forecast ({selectedCities.length} cities)
        </button>
      </div>
    </div>
  );
}
