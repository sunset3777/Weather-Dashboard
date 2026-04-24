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
  pop: number; // Precipitation probability (0-1)
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

// Map OpenWeatherMap weather names to our UI Conditions
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
 * Data Transformation: Process hourly forecast (convert 3h steps to consecutive 5h)
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
 * Data Transformation: Process daily forecast (5-day forecast)
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
      windSpeed: Math.round(item.wind.speed * 3.6),
      precipitation: Math.round(item.pop * 100),
    });
  }
  return weekly;
};

export interface CitySuggestion {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  chineseName?: string;
}

interface GeocodingApiResponse {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

/**
 * Fetch city suggestions (Geocoding API)
 */
export const fetchCitySuggestions = async (
  query: string,
): Promise<CitySuggestion[]> => {
  if (!query || query.length < 2 || !API_KEY) return [];

  try {
    const response = await fetch(
      `${BASE_URL.replace('data/2.5', 'geo/1.0')}/direct?q=${encodeURIComponent(
        query,
      )}&limit=5&appid=${API_KEY}`,
    );

    if (!response.ok) return [];

    const data: GeocodingApiResponse[] = await response.json();
    return data.map((item) => {
      const englishName = item.local_names?.en || item.name;
      const chineseName =
        item.local_names?.zh || item.local_names?.['zh-tw'] || undefined;

      return {
        name: englishName,
        lat: item.lat,
        lon: item.lon,
        country: item.country,
        state: item.state,
        chineseName,
      };
    });
  } catch (error) {
    console.error('City Suggestions Fetch Error:', error);
    return [];
  }
};

export const fetchWeatherReport = async (
  city: string = 'Taipei City',
): Promise<WeatherReport> => {
  if (!API_KEY) {
    throw new Error(
      'API Key not found. Please ensure .env exists with VITE_WEATHER_API_KEY and restart the dev server.',
    );
  }

  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(
        city,
      )}&units=metric&appid=${API_KEY}`,
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found, please try again.');
      }
      throw new Error('Unable to fetch weather data, please try again later.');
    }

    const rawData: OpenWeatherMapResponse = await response.json();

    return {
      city: rawData.city.name,
      weekly: transformWeeklyData(rawData.list),
      hourly: transformHourlyData(rawData.list),
      lat: rawData.city.coord.lat,
      lon: rawData.city.coord.lon,
    };
  } catch (error) {
    console.error('Weather Fetch Error:', error);
    throw error;
  }
};
