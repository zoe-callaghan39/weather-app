import React, { useState } from 'react';

const LocationInput = ({ addLocation }) => {
  const [cityName, setCityName] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=b3ba93df6c4142e1990f9d9902dae0ae`
    )
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch suggestions');
        return response.json();
      })
      .then((data) => {
        const suggestionList = data.results.map((result) => result.formatted);
        setSuggestions(suggestionList);
      })
      .catch(() => {
        setSuggestions([]);
      });
  };

  const handleChange = (e) => {
    const query = e.target.value;
    setCityName(query);
    fetchSuggestions(query);
  };

  const handleSuggestionClick = (suggestion) => {
    addLocation(suggestion);
    setCityName('');
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cityName.trim()) {
      addLocation(cityName);
      setCityName('');
      setSuggestions([]);
    }
  };

  return (
    <div className="location-input">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={cityName}
          onChange={handleChange}
        />
        <button type="submit">Add Location</button>
      </form>
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationInput;
