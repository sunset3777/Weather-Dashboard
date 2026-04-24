import { Loader2 } from 'lucide-react';
import { useWeather } from '../hooks/useWeather';
import HeroWeatherCardList from './HeroWeatherCard';

interface HeroProps {
  selectedCity: string;
  todayDateString: string;
}

/**
 * Hero 元件 (Main Section)
 * 負責數據獲取、錯誤處理與排版。
 */
const Hero: React.FC<HeroProps> = ({ selectedCity, todayDateString }) => {
  const { data, loading, error } = useWeather(selectedCity);

  // 1. Loading State
  if (loading) {
    return (
      <div className="w-full h-[600px] bg-neutral-200 dark:bg-neutral-800 flex flex-col items-center justify-center gap-4 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
        <Loader2 className="w-12 h-12 animate-spin text-neutral-900 dark:text-neutral-100" />
        <p className="text-base font-black uppercase tracking-widest italic">
          Syncing Data...
        </p>
      </div>
    );
  }

  // 2. Error Handling State
  if (error || !data) {
    return (
      <div className="w-full h-[600px] bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-black uppercase text-red-600 transition-colors duration-300">
        {error || 'Connection Lost.'}
      </div>
    );
  }

  // 3. 正常渲染佈局
  return (
    <section className="w-full bg-neutral-200 dark:bg-neutral-800 border-b border-neutral-300 dark:border-neutral-700 transition-colors duration-300">
      <HeroWeatherCardList data={data} todayDateString={todayDateString} />
    </section>
  );
};

export default Hero;
