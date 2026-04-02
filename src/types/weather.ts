export interface DailyForecast {
  day: string;
  date: string;
  temp: number;
  condition: 'Sunny' | 'Clear' | 'Cloudy' | 'Partly Cloudy' | 'Rainy' | 'Storm';
  humidity: number;
  wind: number;
}

export interface HourlyForecast {
  time: string; // 例如 "14:00"
  precipitation: number; // 降雨機率 0-100
}

export interface WeatherReport {
  city: string;
  weekly: DailyForecast[];
  hourly: HourlyForecast[]; // 新增每小時數據
}
