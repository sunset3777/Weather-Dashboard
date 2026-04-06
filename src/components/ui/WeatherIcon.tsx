import React from 'react';
import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudSun,
  Wind,
} from 'lucide-react';

interface WeatherIconProps {
  condition: string;
  isToday: boolean;
  className?: string;
}

/**
 * WeatherIcon 原子組件
 * 純展示組件，負責根據天氣狀況渲染對應圖示與顏色。
 */
export const WeatherIcon: React.FC<WeatherIconProps> = ({
  condition,
  isToday,
  className = 'w-10 h-10',
}) => {
  const iconColor = isToday ? 'text-yellow-400' : 'text-neutral-500';
  const rainyColor = isToday ? 'text-blue-300' : 'text-blue-500';
  const windColor = isToday ? 'text-neutral-400' : 'text-neutral-600';

  switch (condition) {
    case 'Sunny':
    case 'Clear':
      return <Sun className={`${className} ${iconColor}`} strokeWidth={2.5} />;
    case 'Cloudy':
      return <Cloud className={`${className} ${iconColor}`} strokeWidth={2.5} />;
    case 'Partly Cloudy':
      return (
        <CloudSun className={`${className} ${iconColor}`} strokeWidth={2.5} />
      );
    case 'Rainy':
      return (
        <CloudRain className={`${className} ${rainyColor}`} strokeWidth={2.5} />
      );
    case 'Storm':
      return (
        <CloudLightning
          className={`${className} text-purple-400`}
          strokeWidth={2.5}
        />
      );
    default:
      return <Wind className={`${className} ${windColor}`} strokeWidth={2.5} />;
  }
};
