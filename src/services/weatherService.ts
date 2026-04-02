import { WeatherReport } from '../types/weather';

export const fetchWeatherReport = async (
  city: string = 'Taipei City',
): Promise<WeatherReport> => {
  const currentHour = new Date().getHours();
  // 生成未來 5 小時的時間點 (例如: ["15:00", "16:00", ...])
  const hourlyData = Array.from({ length: 5 }, (_, i) => {
    const nextHour = (currentHour + i + 1) % 24;
    return {
      time: `${nextHour.toString().padStart(2, '0')}:00`,
      precipitation: Math.floor(Math.random() * 80) + 10, // 模擬 10% - 90% 降雨機率
    };
  });

  return {
    city: city, // 使用傳入的城市名稱
    weekly: [
      {
        day: 'Sun',
        date: 'Mar 29',
        temp: 22,
        condition: 'Cloudy',
        humidity: 82,
        wind: 10,
      },
      {
        day: 'Mon',
        date: 'Mar 30',
        temp: 24,
        condition: 'Sunny',
        humidity: 65,
        wind: 15,
      },
      {
        day: 'Tue',
        date: 'Mar 31',
        temp: 26,
        condition: 'Clear',
        humidity: 60,
        wind: 12,
      },
      {
        day: 'Wed',
        date: 'Apr 01',
        temp: 23,
        condition: 'Rainy',
        humidity: 90,
        wind: 20,
      },
      {
        day: 'Thu',
        date: 'Apr 02',
        temp: 21,
        condition: 'Storm',
        humidity: 95,
        wind: 25,
      },
      {
        day: 'Fri',
        date: 'Apr 03',
        temp: 25,
        condition: 'Partly Cloudy',
        humidity: 70,
        wind: 14,
      },
      {
        day: 'Sat',
        date: 'Apr 04',
        temp: 27,
        condition: 'Sunny',
        humidity: 55,
        wind: 18,
      },
    ],
    hourly: hourlyData, // 注入每小時數據
  };
};
