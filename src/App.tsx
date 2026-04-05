import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MapSection from './components/MapSection';
import Footer from './components/Footer';

/**
 * 基礎 App 元件
 * 包含 Header, Hero 與 MapSection 部分。
 */
const App: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('Taipei City');

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Header onSearch={setSelectedCity} />
      <Hero selectedCity={selectedCity} />
      <MapSection onCitySelect={setSelectedCity} selectedCity={selectedCity} />
      <Footer />
    </div>
  );
};

export default App;
