import { useState, useEffect } from 'react';
import { WeatherReport } from '../types/weather';
import { fetchWeatherReport } from '../services/weatherService';

export const useWeather = (city: string = 'Taipei City') => {
  const [data, setData] = useState<WeatherReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const report = await fetchWeatherReport(city);
        setData(report);
      } catch (err) {
        setError('Failed to load weather data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [city]); // 當 city 變動時觸發重新抓取

  return { data, loading, error };
};
