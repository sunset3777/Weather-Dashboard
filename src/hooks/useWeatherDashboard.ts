import { useState } from 'react';
import { useWeather } from './useWeather';

/**
 * useWeatherDashboard Hook
 * 集中管理天氣儀表板的全域狀態：
 * 1. 當前所選城市 (selectedCity)
 * 2. 亮暗模式 (isDark)
 * 3. 天氣數據獲取與載入狀態 (weatherData)
 */
export const useWeatherDashboard = () => {
  const [selectedCity, setSelectedCity] = useState('Taipei City');
  const [isDark, setIsDark] = useState(true);

  // 整合原有的 useWeather Hook
  const { data: weatherData, loading, error } = useWeather(selectedCity);

  const toggleDarkMode = () => setIsDark(!isDark);

  return {
    selectedCity,
    setSelectedCity,
    isDark,
    toggleDarkMode,
    weatherData,
    loading,
    error,
  };
};
