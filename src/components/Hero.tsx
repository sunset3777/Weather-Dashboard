import { Loader2 } from 'lucide-react';
import { useWeather } from '../hooks/useWeather';
import HeroLeft from './HeroLeft';
import HeroRight from './HeroRight';

interface HeroProps {
  selectedCity: string;
  todayDateString: string;
}

/**
 * Hero 元件 (Main Section)
 * 負責數據獲取、錯誤處理與左右佈局分配。
 */
const Hero: React.FC<HeroProps> = ({ selectedCity, todayDateString }) => {
  const { data, loading, error } = useWeather(selectedCity);

  // 1. 讀取中狀態
  if (loading) {
    return (
      <div className="w-full h-[600px] bg-neutral-200 dark:bg-neutral-800 flex flex-col items-center justify-center gap-4 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
        <Loader2 className="w-12 h-12 animate-spin text-neutral-900 dark:text-neutral-100" />
        <p className="text-sm font-black uppercase tracking-widest italic">
          正在同步數據...
        </p>
      </div>
    );
  }

  // 2. 錯誤處理狀態
  if (error || !data) {
    return (
      <div className="w-full h-[600px] bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-black uppercase text-red-600 transition-colors duration-300">
        {error || '連線中斷。'}
      </div>
    );
  }

  // 3. 正常渲染佈局
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 w-full bg-neutral-200 dark:bg-neutral-800 border-b border-neutral-300 dark:border-neutral-700 transition-colors duration-300">
      <HeroLeft data={data} todayDateString={todayDateString} />
      <HeroRight data={data} />
    </section>
  );
};

export default Hero;
