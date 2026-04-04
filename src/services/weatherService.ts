import { WeatherReport, DailyForecast, HourlyForecast } from '../types/weather';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_API_BASE_URL;

// --- API 原始型別定義 ---
interface OpenWeatherMapItem {
  dt: number;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
  pop: number; // 降雨機率 (0-1)
}

interface OpenWeatherMapResponse {
  list: OpenWeatherMapItem[];
  city: {
    name: string;
  };
}

// 將 OpenWeatherMap 的天氣名稱映射到我們 UI 的 Condition
const mapCondition = (main: string): DailyForecast['condition'] => {
  const map: Record<string, DailyForecast['condition']> = {
    Clear: 'Clear',
    Clouds: 'Cloudy',
    Rain: 'Rainy',
    Thunderstorm: 'Storm',
    Drizzle: 'Rainy',
    Snow: 'Cloudy',
  };
  return map[main] || 'Partly Cloudy';
};

export const fetchWeatherReport = async (
  city: string = 'Taipei City',
): Promise<WeatherReport> => {
  if (!API_KEY) {
    throw new Error('找不到 API Key。請確保 .env 檔案存在且包含 VITE_WEATHER_API_KEY，並重啟開發伺服器。');
  }

  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(
        city,
      )}&units=metric&appid=${API_KEY}`,
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('找不到該城市，請重新輸入。');
      }
      throw new Error('無法取得氣象數據，請稍後再試。');
    }

    const rawData: OpenWeatherMapResponse = await response.json();

    // 1. 處理每小時預報 (取前 5 筆，每筆間隔 3 小時)
    const hourly: HourlyForecast[] = rawData.list
      .slice(0, 5)
      .map((item: OpenWeatherMapItem) => ({
        time: new Date(item.dt * 1000).getHours().toString().padStart(2, '0') + ':00',
        precipitation: Math.round(item.pop * 100),
      }));

    // 2. 處理每日預報 (每 8 筆代表 1 天)
    const weekly: DailyForecast[] = [];
    for (let i = 0; i < rawData.list.length; i += 8) {
      const item = rawData.list[i];
      const date = new Date(item.dt * 1000);
      
      weekly.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
        temp: Math.round(item.main.temp),
        condition: mapCondition(item.weather[0].main),
        humidity: item.main.humidity,
        wind: Math.round(item.wind.speed * 3.6),
      });
    }

    return {
      city: rawData.city.name,
      weekly: weekly,
      hourly: hourly,
    };
  } catch (error) {
    console.error('Weather Fetch Error:', error);
    throw error;
  }
};
