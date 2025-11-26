export const getCoordinates = (cityName) => {
  return fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=b3ba93df6c4142e1990f9d9902dae0ae`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch geocode data');
      }
      return response.json();
    })
    .then((data) => {
      if (!data.results || data.results.length === 0) {
        throw new Error('No results found for this location');
      }

      const refineCityName = (rawName) => {
        if (!rawName) return '';

        let refined = rawName.replace(/^(City of|Capital City of)\s+/i, '');

        refined = refined.split(',')[0];

        return refined.trim();
      };

      const { lat, lng } = data.results[0].geometry;
      const components = data.results[0].components;

      const rawCity =
        components.city || components.town || components.village || cityName;

      const city = refineCityName(rawCity);

      const country = components.country;

      return {
        name: city,
        lat,
        lon: lng,
        country,
      };
    })
    .catch((err) => {
      console.error('Error in getCoordinates:', err);
      return null;
    });
};
