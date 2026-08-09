import { useState, useEffect, useRef } from 'react';

export default function useWeather() {
  const [weather, setWeather] = useState(() => {
    try {
      const cached = localStorage.getItem('dashboard-weather');
      if (cached) {
        const parsed = JSON.parse(cached);
        return parsed.data;
      }
    } catch {
      // ignore
    }
    return {
      temp: '--',
      condition: 'sunny',
      conditionLabel: 'Loading...',
      humidity: '--%',
      wind: '-- km/h',
      precip: '-- mm',
      city: 'Loading...',
      isDay: 1,
    };
  });

  const loaded = useRef(false);

  useEffect(() => {
    function getWeatherByCoords(lat, lon) {
      if (loaded.current) return;

      loaded.current = true;

      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,is_day`;

      // 🛡️ Sentinel: Added timeout to prevent hanging requests
      fetch(weatherUrl, { signal: AbortSignal.timeout(5000) })
        .then((res) => res.json())
        .then((data) => {
          if (!data.current) return;
          const temp = Math.round(data.current.temperature_2m);
          const weatherCode = data.current.weather_code;
          const humidity = data.current.relative_humidity_2m;
          const precip = data.current.precipitation;
          const wind = data.current.wind_speed_10m;
          const isDay = data.current.is_day;

          let condition = 'sunny';
          if (weatherCode === 0) condition = 'sunny';
          else if ([1, 2].includes(weatherCode)) condition = 'partlyCloudy';
          else if ([3].includes(weatherCode)) condition = 'cloudy';
          else if ([45, 48].includes(weatherCode)) condition = 'foggy';
          else if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode))
            condition = 'rainy';
          else if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) condition = 'snowy';
          else if ([95, 96, 99].includes(weatherCode)) condition = 'thunderstorm';

          if (wind > 25 && [0, 1, 2, 3].includes(weatherCode)) condition = 'windy';

          const conditionMap = {
            sunny: 'Sunny',
            partlyCloudy: 'Partly Cloudy',
            cloudy: 'Cloudy',
            rainy: 'Rainy',
            thunderstorm: 'Thunderstorm',
            windy: 'Windy',
            foggy: 'Foggy',
            snowy: 'Snowy',
          };

          let label = conditionMap[condition] || 'Unknown';
          if (condition === 'sunny' && isDay === 0) label = 'Clear';

          setWeather((prev) => {
            const newData = {
              temp,
              condition,
              conditionLabel: label,
              humidity: `${humidity}%`,
              wind: `${wind} km/h`,
              precip: `${precip} mm`,
              city: prev.city !== 'Loading...' && prev.city !== 'Unavailable' ? prev.city : 'Loading...',
              isDay,
            };
            // ⚡ Bolt: Cache newly fetched data
            try {
              localStorage.setItem('dashboard-weather', JSON.stringify({ timestamp: Date.now(), data: newData }));
            } catch {
              // ignore
            }
            return newData;
          });
        })
        .catch((err) => console.error('Weather error:', err));

      const geoUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
      // 🛡️ Sentinel: Added timeout to prevent hanging requests
      fetch(geoUrl, { signal: AbortSignal.timeout(5000) })
        .then((res) => res.json())
        .then((data) => {
          const city = data.city || data.locality || data.principalSubdivision || 'Unknown Location';
          setWeather((prev) => {
            const finalData = { ...prev, city };
            // ⚡ Bolt: Update cache with city name
            try {
              localStorage.setItem('dashboard-weather', JSON.stringify({ timestamp: Date.now(), data: finalData }));
            } catch {
              // ignore
            }
            return finalData;
          });
        })
        .catch(() => {
          setWeather((prev) => {
             const finalData = { ...prev, city: 'Unavailable' };
             try {
                localStorage.setItem('dashboard-weather', JSON.stringify({ timestamp: Date.now(), data: finalData }));
             } catch {
                // ignore
             }
             return finalData;
          });
        });
    }

    function fetchWeather() {
      // ⚡ Bolt: Check cache before Geolocation to avoid expensive hardware wake-up
      // Expected Impact: Saves battery and eliminates geolocation latency (up to 10s) on page reloads if data is fresh.
      try {
        const cached = localStorage.getItem('dashboard-weather');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < 30 * 60 * 1000) {
            loaded.current = true;
            return; // Skip geolocation entirely if cache is fresh
          }
        }
      } catch {
        // ignore
      }

      if (!navigator.geolocation || window.location.protocol === 'file:') {
        getWeatherByCoords(26.1445, 91.7362);
        return;
      }

      const geoTimeout = setTimeout(() => {
        if (!loaded.current) getWeatherByCoords(26.1445, 91.7362);
      }, 10000);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(geoTimeout);
          getWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        () => {
          clearTimeout(geoTimeout);
          if (!loaded.current) getWeatherByCoords(26.1445, 91.7362);
        },
        { timeout: 10000, maximumAge: 10000 }
      );
    }

    fetchWeather();
  }, []);

  return weather;
}
