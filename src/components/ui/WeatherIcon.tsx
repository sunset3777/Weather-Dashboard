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
  // 顏色配置邏輯 (色彩增強版)
  const colors = {
    yellow: 'text-yellow-400',
    blue: 'text-blue-400',
    sky: 'text-sky-300',
    // 針對雲朵與風速圖示：深色背景用白色，淺色背景用半灰色
    gray: isToday ? 'text-white' : 'text-neutral-400 dark:text-white',
    purple: 'text-purple-400',
  };

  // 圖示配置對照表
  const ICON_CONFIG: Record<
    string,
    { icon: React.ElementType; color: string }
  > = {
    Sunny: { icon: Sun, color: colors.yellow },
    Clear: { icon: Sun, color: colors.yellow },
    Cloudy: { icon: Cloud, color: colors.gray },
    'Partly Cloudy': { icon: CloudSun, color: colors.sky },
    Rainy: { icon: CloudRain, color: colors.blue },
    Storm: { icon: CloudLightning, color: colors.purple },
    Default: { icon: Wind, color: colors.gray },
  };

  const { icon: Icon, color } =
    ICON_CONFIG[condition] || ICON_CONFIG['Default'];

  return <Icon className={`${className} ${color}`} strokeWidth={2.5} />;
};
