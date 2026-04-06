import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import MapSection from '../components/MapSection';
import Footer from '../components/Footer';
import { useWeather } from '../hooks/useWeather';

/**
 * WeatherPage 元件
 * 整合天氣儀表板的所有核心區塊：Header, Hero, MapSection, 與 Footer。
 * 負責管理城市選擇與亮暗模式狀態。
 */
const WeatherPage: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('Taipei City');
  const [isDark, setIsDark] = useState(true);
  const { data: weatherData } = useWeather(selectedCity);

  const toggleDarkMode = () => setIsDark(!isDark);

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
