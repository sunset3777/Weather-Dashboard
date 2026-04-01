import React from 'react';
// import Header from './components/Header';
import Hero from './components/Hero';

/**
 * 基礎 App 元件
 * 包含 Header 與 Hero 部分。
 */
const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* <Header /> */}
      <Hero />
      <main className="p-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-neutral-600 italic">
            Dashboard Content Area below Hero section.
          </p>
        </div>
      </main>
    </div>
  );
};

export default App;
