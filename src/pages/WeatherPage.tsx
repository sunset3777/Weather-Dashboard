import { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import MapSection from '../components/MapSection';
import Footer from '../components/Footer';
import ErrorBoundary from '../components/ErrorBoundary';
import { useWeatherDashboard } from '../hooks/useWeatherDashboard';

/**
 * WeatherPage 元件 (重構後)
 * 天氣儀表板的最終整合頁面。
 */
const WeatherPage: React.FC = () => {
  const {
    selectedCity,
    setSelectedCity,
    isDark,
    toggleDarkMode,
    weatherData,
    todayDateString,
    error: apiError,
  } = useWeatherDashboard();

  const [renderError, setRenderError] = useState<Error | null>(null);

  const hasError = !!apiError || !!renderError;

  return (
    <div
      className={`${isDark ? 'dark' : ''} min-h-screen transition-colors duration-300`}
    >
      <div className="bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 min-h-screen flex flex-col">
        <Header
          onSearch={setSelectedCity}
          isDark={isDark}
          toggleDarkMode={toggleDarkMode}
        />
        <main className="flex-grow">
          <ErrorBoundary
            fallback={(err) => {
              setRenderError(err);
              return (
                <div className="flex items-center justify-center h-full p-10">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-500">
                      System Rendering Error
                    </h2>
                    <p className="mt-2 opacity-70">
                      An unexpected error occurred while rendering the
                      dashboard.
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-4 px-4 py-2 bg-neutral-200 dark:bg-neutral-800 rounded-md text-sm font-bold"
                    >
                      Reload System
                    </button>
                  </div>
                </div>
              );
            }}
          >
            <Hero
              selectedCity={selectedCity}
              todayDateString={todayDateString}
            />
            <MapSection
              onCitySelect={setSelectedCity}
              selectedCity={selectedCity}
              weatherData={weatherData}
            />
          </ErrorBoundary>
        </main>
        <Footer hasError={hasError} />
      </div>
    </div>
  );
};

export default WeatherPage;
