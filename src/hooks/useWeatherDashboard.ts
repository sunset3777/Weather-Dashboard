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

  // 獲取當前日期的英文格式 (如: Apr 08)，強制使用台北時區避免部署後時差導致的高亮錯誤
  const todayDateString = new Date().toLocaleDateString('en-US', {
    timeZone: 'Asia/Taipei',
    month: 'short',
    day: '2-digit',
  });

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
    todayDateString,
  };
};
