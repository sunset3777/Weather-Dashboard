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
  // 顏色配置邏輯
  // 顏色配置邏輯
  const colors = {
    yellow: isToday ? 'text-yellow-400' : 'text-neutral-500',
    blue: isToday ? 'text-blue-300' : 'text-blue-500',
    gray: isToday ? 'text-neutral-400' : 'text-neutral-600',
    purple: 'text-purple-400',
  };

  // 圖示配置對照表
  const ICON_CONFIG: Record<
    string,
    { icon: React.ElementType; color: string }
  > = {
    Sunny: { icon: Sun, color: colors.yellow },
    Clear: { icon: Sun, color: colors.yellow },
    Cloudy: { icon: Cloud, color: colors.yellow },
    'Partly Cloudy': { icon: CloudSun, color: colors.yellow },
    Rainy: { icon: CloudRain, color: colors.blue },
    Storm: { icon: CloudLightning, color: colors.purple },
    Default: { icon: Wind, color: colors.gray },
  };

  const { icon: Icon, color } =
    ICON_CONFIG[condition] || ICON_CONFIG['Default'];

  return <Icon className={`${className} ${color}`} strokeWidth={2.5} />;
};
