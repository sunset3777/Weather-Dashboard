import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import MapSection from '../components/MapSection';
import Footer from '../components/Footer';
import { useWeatherDashboard } from '../hooks/useWeatherDashboard';

/**
 * WeatherPage 元件 (重構後)
 * 天氣儀表板的最終整合頁面。
 * 透過 useWeatherDashboard Hook 管理所有狀態，頁面僅負責 JSX 佈局與 Prop 分配。
 */
const WeatherPage: React.FC = () => {
  const {
    selectedCity,
    setSelectedCity,
    isDark,
    toggleDarkMode,
    weatherData,
  } = useWeatherDashboard();

  return (
    <div
      className={`${isDark ? 'dark' : ''} min-h-screen transition-colors duration-300`}
    >
      <div className="bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 min-h-screen">
        <Header
          onSearch={setSelectedCity}
          isDark={isDark}
          toggleDarkMode={toggleDarkMode}
        />
        <main>
          <Hero selectedCity={selectedCity} />
          <MapSection
            onCitySelect={setSelectedCity}
            selectedCity={selectedCity}
            weatherData={weatherData}
          />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default WeatherPage;
