import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import { useWeather } from './hooks/useWeather';

/**
 * 基礎 App 元件
 * 包含 Header, Hero 與 MapSection 部分。
 */
const App: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('Taipei City');
  const { data, loading, error } = useWeather(selectedCity);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Header onSearch={handleCityChange} />
      <Hero data={data} loading={loading} error={error} />
      <MapSection
        onCitySelect={handleCityChange}
        selectedCity={selectedCity}
        weatherData={data}
      />
      <Footer />
    </div>
  );
};

export default App;
