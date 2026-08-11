import { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import useClock from '../hooks/useClock';
import useWeather from '../hooks/useWeather';

const bgImages = {
  sunny: { morning: '/asset/bg_sunny.png', noon: '/asset/bg_sunny.png', afternoon: '/asset/bg_sunny.png', goldenHour: '/asset/bg_sunny.png', evening: '/asset/bg_sunny_night.png', night: '/asset/bg_sunny_night.png' },
  cloudy: { morning: '/asset/bg_cloudy.png', noon: '/asset/bg_cloudy.png', afternoon: '/asset/bg_cloudy.png', goldenHour: '/asset/bg_cloudy.png', evening: '/asset/bg_cloudy_night.png', night: '/asset/bg_cloudy_night.png' },
  rainy: { morning: '/asset/bg_rainy.png', noon: '/asset/bg_rainy.png', afternoon: '/asset/bg_rainy.png', goldenHour: '/asset/bg_rainy.png', evening: '/asset/bg_rainy_night.png', night: '/asset/bg_rainy_night.png' },
  foggy: { morning: '/asset/bg_foggy.png', noon: '/asset/bg_foggy.png', afternoon: '/asset/bg_foggy.png', goldenHour: '/asset/bg_foggy.png', evening: '/asset/bg_foggy_night.png', night: '/asset/bg_foggy_night.png' },
  snowy: { morning: '/asset/bg_snowy.png', noon: '/asset/bg_snowy.png', afternoon: '/asset/bg_snowy.png', goldenHour: '/asset/bg_snowy.png', evening: '/asset/bg_snowy_night.png', night: '/asset/bg_snowy_night.png' },
  partlyCloudy: { morning: '/asset/bg_partlyCloudy.png', noon: '/asset/bg_partlyCloudy.png', afternoon: '/asset/bg_partlyCloudy.png', goldenHour: '/asset/bg_partlyCloudy.png', evening: '/asset/bg_partlyCloudy_night.png', night: '/asset/bg_partlyCloudy_night.png' },
  thunderstorm: { morning: '/asset/bg_thunderstorm.png', noon: '/asset/bg_thunderstorm.png', afternoon: '/asset/bg_thunderstorm.png', goldenHour: '/asset/bg_thunderstorm.png', evening: '/asset/bg_thunderstorm_night.png', night: '/asset/bg_thunderstorm_night.png' },
  windy: { morning: '/asset/bg_windy.png', noon: '/asset/bg_windy.png', afternoon: '/asset/bg_windy.png', goldenHour: '/asset/bg_windy.png', evening: '/asset/bg_windy_night.png', night: '/asset/bg_windy_night.png' },
};

function WeatherIcon({ condition, isDay }) {
  let paths;
  if (condition === 'sunny') {
    paths = isDay === 0
      ? <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      : <><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></>;
  } else if (condition === 'foggy') {
    paths = <><path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97 7 7 0 0 0-13.9 1.44 4 4 0 0 0 1.9 7.53" /><path d="M4 22h16" /><path d="M4 18h16" /></>;
  } else if (condition === 'snowy') {
    paths = <><path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97 7 7 0 0 0-13.9 1.44 4 4 0 0 0 1.9 7.53" /><circle cx="8" cy="21" r="1" /><circle cx="12" cy="21" r="1" /><circle cx="16" cy="21" r="1" /></>;
  } else if (condition === 'cloudy') {
    paths = <path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97 7 7 0 0 0-13.9 1.44 4 4 0 0 0 1.9 7.53" />;
  } else {
    paths = <><path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97 7 7 0 0 0-13.9 1.44 4 4 0 0 0 1.9 7.53" /><path d="M8 22v-3" /><path d="M12 22v-3" /><path d="M16 22v-3" /></>;
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
      {paths}
    </svg>
  );
}

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { time, date, timeGroup } = useClock();
  const weather = useWeather();

  const bgUrl = bgImages[weather.condition]?.[timeGroup] || bgImages.sunny[timeGroup];

  // ⚡ Bolt: Moved body background updates into a useEffect to prevent redundant synchronous DOM mutations.
  // Expected Impact: Eliminates forced layout/style recalculations every 1 second (triggered by useClock), reducing main thread work and preventing UI jank.
  useEffect(() => {
    document.body.style.backgroundImage = `url('${bgUrl}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
  }, [bgUrl]);

  return (
    <header
      id="navbar"
      className="relative overflow-hidden rounded-[32px] w-full h-[180px] flex border border-white/20 shadow-2xl mb-8 card-animate"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000 opacity-90"
        style={{ backgroundImage: `url('${bgUrl}')` }}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-0" />

      {/* Content */}
      <div className="relative z-10 w-full h-full p-6 sm:px-8 flex justify-between items-center">
        {/* Left: Weather Info */}
        <div className="flex flex-col justify-center h-full">
          <div className="flex items-center gap-2 mb-1">
            <div className="text-white scale-110">
              <WeatherIcon condition={weather.condition} isDay={weather.isDay} />
            </div>
            <span className="text-base text-white/90 font-medium tracking-wide drop-shadow-sm">
              {weather.conditionLabel}
            </span>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-start">
              <h3 className="text-[64px] font-light text-white leading-none tracking-tighter drop-shadow-md">
                {weather.temp}
              </h3>
              <span className="text-2xl font-light text-white drop-shadow-md mt-1">°</span>
            </div>

            <div className="w-[1px] h-12 bg-white/30" />

            <div className="flex flex-col gap-0.5 justify-center">
              <p className="text-[15px] text-white font-medium drop-shadow-md">{date}</p>
              <div className="flex items-center gap-1.5 text-white/90 drop-shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span className="text-[13px] font-medium">{weather.city}</span>
              </div>
            </div>
          </div>

          {/* Weather Details */}
          <div className="flex items-center gap-4 mt-3 text-xs text-white/80 font-medium drop-shadow-sm">
            <div className="flex items-center gap-1" title="Precipitation">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12a10.06 10.06 1 0 0-20 0Z" />
                <path d="M12 12v8a2 2 0 0 0 4 0" />
                <path d="M12 2v1" />
              </svg>
              <span>{weather.precip}</span>
            </div>
            <div className="flex items-center gap-1" title="Humidity">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22a5 5 0 0 0 5-5c0-2-5-9-5-9s-5 7-5 9a5 5 0 0 0 5 5z" />
              </svg>
              <span>{weather.humidity}</span>
            </div>
            <div className="flex items-center gap-1" title="Wind">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12.8 19.6A2 2 0 1 0 14 16H2" />
                <path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" />
                <path d="M9.8 4.4A2 2 0 1 1 11 8H2" />
              </svg>
              <span>{weather.wind}</span>
            </div>
          </div>
        </div>

        {/* Right: Theme Toggle + Time */}
        <div className="flex flex-col justify-between items-end h-full py-1">
          <button
            onClick={toggleTheme}
            className="relative w-14 h-7 rounded-full bg-black/40 border border-white/20 flex items-center px-0.5 transition-colors cursor-pointer shadow-inner backdrop-blur-sm z-20 overflow-hidden"
          >
            <div
              className={`w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-500 z-0 border border-black/10 flex items-center justify-center overflow-hidden ${isDark ? 'translate-x-7' : 'translate-x-0'}`}
            >
              {/* Sun Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                className={`text-amber-500 absolute transition-all duration-500 ${isDark ? 'scale-0 -rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}`}
              >
                <circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
              </svg>
              {/* Moon Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                className={`text-indigo-500 absolute transition-all duration-500 ${isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-90 opacity-0'}`}
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            </div>
          </button>

          <h4 className="text-[44px] font-bold text-white drop-shadow-md tracking-tighter leading-none relative z-20 mb-1">
            {time}
          </h4>
        </div>
      </div>
    </header>
  );
}
