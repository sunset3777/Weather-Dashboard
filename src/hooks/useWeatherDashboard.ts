import { useState, useEffect } from 'react';
import { useWeather } from './useWeather';

const THEME_KEY = 'weather-dashboard-theme';

/**
 * useWeatherDashboard Hook
 */
export const useWeatherDashboard = () => {
  const [selectedCity, setSelectedCity] = useState('Taipei City');
  const [isDark, setIsDark] = useState(() => {
    // 初始化時從 localStorage 獲取偏好，若無則預設為 true (符合專案風格)
    const saved = localStorage.getItem(THEME_KEY);
    return saved ? saved === 'dark' : true;
  });

  // 當 isDark 改變時，同步到 DOM 並存入 localStorage
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(THEME_KEY, 'light');
    }
  }, [isDark]);

  // 獲取當前日期的英文格式 (如: Apr 08)
  const todayDateString = new Date().toLocaleDateString('en-US', {
    timeZone: 'Asia/Taipei',
    month: 'short',
    day: '2-digit',
  });

  const { data: weatherData, loading, error } = useWeather(selectedCity);

  const toggleDarkMode = () => setIsDark((prev) => !prev);

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
