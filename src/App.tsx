import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MapSection from './components/MapSection';

/**
 * 基礎 App 元件
 * 包含 Header, Hero 與 MapSection 部分。
 */
const App: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('Taipei City');

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Header />
      <Hero selectedCity={selectedCity} />
      <MapSection onCitySelect={setSelectedCity} />
      <main className="p-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-neutral-600 italic">
            Dashboard Content Area below Map section.
          </p>
        </div>
      </main>
    </div>
  );
};

export default App;
