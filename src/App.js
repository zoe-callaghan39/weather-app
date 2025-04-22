import React, { useState, useEffect } from 'react';
import './styles/App.css';

import LocationInput from './components/LocationInput';
import WeatherCard from './components/WeatherCard';
import UnitToggle from './components/UnitToggle';

import weatherImage from './assets/weather.png';
import { getCoordinates } from './utils/geocode';

const DEFAULT_CITIES = [
  { name: 'Berlin', lat: 52.52, lon: 13.41, country: 'Germany' },
  { name: 'London', lat: 51.51, lon: -0.13, country: 'United Kingdom' },
  { name: 'New York', lat: 40.71, lon: -74.01, country: 'United States' },
  { name: 'Leeds', lat: 53.8, lon: -1.55, country: 'United Kingdom' },
];

function App() {
  const [unit, setUnit] = useState(localStorage.getItem('unit') || 'C');
  const [error, setError] = useState('');
  const [locations, setLocations] = useState(() => {
    const stored = localStorage.getItem('localLocations');
    return stored ? JSON.parse(stored) : DEFAULT_CITIES;
  });

  // Persist to localStorage whenever locations change
  useEffect(() => {
    localStorage.setItem('localLocations', JSON.stringify(locations));
  }, [locations]);

  const toggleUnit = () => {
    const newUnit = unit === 'C' ? 'F' : 'C';
    setUnit(newUnit);
    localStorage.setItem('unit', newUnit);
  };

  const addLocation = (cityName) => {
    setError('');
    getCoordinates(cityName)
      .then((newLoc) => {
        if (!newLoc) throw new Error('City not found.');
        const duplicate = locations.some(
          (loc) =>
            loc.name.toLowerCase() === newLoc.name.toLowerCase() &&
            Math.abs(loc.lat - newLoc.lat) < 0.01 &&
            Math.abs(loc.lon - newLoc.lon) < 0.01
        );
        if (duplicate) throw new Error(`${newLoc.name} is already added.`);
        setLocations((prev) => [...prev, newLoc]);
      })
      .catch((err) => setError(err.message || 'An error occurred.'));
  };

  const deleteLocation = (index) => {
    setLocations((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="app">
      <header className="app-header">
        <img src={weatherImage} alt="Weather App Logo" className="app-logo" />
      </header>

      <LocationInput addLocation={addLocation} />
      {error && <p className="error-message">{error}</p>}
      <UnitToggle unit={unit} toggleUnit={toggleUnit} />

      <div className="weather-cards">
        {locations.map((loc, idx) => (
          <WeatherCard
            key={idx}
            name={loc.name}
            lat={loc.lat}
            lon={loc.lon}
            country={loc.country}
            unit={unit}
            onDelete={() => deleteLocation(idx)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
