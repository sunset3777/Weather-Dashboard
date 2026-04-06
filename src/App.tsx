import React from 'react';
import WeatherPage from './pages/WeatherPage';

/**
 * 基礎 App 元件
 * 引入整合後的天氣頁面 (WeatherPage)。
 */
const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <WeatherPage />
    </div>
  );
};

export default App;
