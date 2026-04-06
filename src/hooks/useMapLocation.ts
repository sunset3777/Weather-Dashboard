import { useMemo } from 'react';
import { WeatherReport } from '../types/weather';
import { FEATURED_CITIES } from '../constants/cities';

/**
 * useMapLocation Hook
 * 負責計算當前地圖應顯示的座標。
 * 優先順序：1. 天氣 API 真實座標 2. 精選城市清單座標 3. 預設座標 (台北)
 */
export const useMapLocation = (
  selectedCity: string,
  weatherData: WeatherReport | null,
) => {
  const location = useMemo(() => {
    const lat =
      weatherData?.lat ||
      FEATURED_CITIES.find((c) => c.name === selectedCity)?.lat ||
      FEATURED_CITIES[0].lat;
    const lon =
      weatherData?.lon ||
      FEATURED_CITIES.find((c) => c.name === selectedCity)?.lon ||
      FEATURED_CITIES[0].lon;

    return { lat, lon };
  }, [selectedCity, weatherData]);

  return location;
};
