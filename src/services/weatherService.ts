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
    coord: {
      lat: number;
      lon: number;
    };
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

/**
 * 數據轉換：處理每小時預報 (將 3小時步長 轉為 連續5小時)
 */
const transformHourlyData = (list: OpenWeatherMapItem[]): HourlyForecast[] => {
  const hourly: HourlyForecast[] = [];
  const nowInSeconds = Math.floor(Date.now() / 1000);

  for (let i = 0; i < 5; i++) {
    const targetTimestamp = nowInSeconds + i * 3600;
    const targetDate = new Date(targetTimestamp * 1000);
    const hourLabel = `${targetDate.getHours().toString().padStart(2, '0')}:00`;

    const closestMatch = list.reduce((prev, curr) => {
      return Math.abs(curr.dt - targetTimestamp) <
        Math.abs(prev.dt - targetTimestamp)
        ? curr
        : prev;
    });

    hourly.push({
      time: hourLabel,
      precipitation: Math.round(closestMatch.pop * 100),
    });
  }
  return hourly;
};

/**
 * 數據轉換：處理每日預報 (5天預報)
 */
const transformWeeklyData = (list: OpenWeatherMapItem[]): DailyForecast[] => {
  const weekly: DailyForecast[] = [];
  for (let i = 0; i < list.length; i += 8) {
    const item = list[i];
    const date = new Date(item.dt * 1000);
    weekly.push({
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
      }),
      temp: Math.round(item.main.temp),
      condition: mapCondition(item.weather[0].main),
      humidity: item.main.humidity,
      wind: Math.round(item.wind.speed * 3.6),
    });
  }
  return weekly;
};

export const fetchWeatherReport = async (
  city: string = 'Taipei',
): Promise<WeatherReport> => {
  if (!API_KEY) {
    throw new Error(
      '找不到 API Key。請確保 .env 檔案存在且包含 VITE_WEATHER_API_KEY，並重啟開發伺服器。',
    );
  }

  try {
    // 僅獲取預報資料，因其已包含座標資訊
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

    return {
      city: rawData.city.name,
      lat: rawData.city.coord.lat,
      lon: rawData.city.coord.lon,
      weekly: transformWeeklyData(rawData.list),
      hourly: transformHourlyData(rawData.list),
    };
  } catch (error) {
    console.error('Weather Fetch Error:', error);
    throw error;
  }
};
