import React from 'react';
import { Loader2 } from 'lucide-react';
import { useWeather } from '../hooks/useWeather';
import HeroLeft from './HeroLeft';
import HeroRight from './HeroRight';

/**
 * Hero 元件 (Main Section)
 * 負責數據獲取、錯誤處理與左右佈局分配。
 */
const Hero: React.FC = () => {
  const currentDayIndex = new Date().getDay();
  const { data, loading, error } = useWeather();

  // 1. 讀取中狀態
  if (loading) {
    return (
      <div className="w-full h-[600px] bg-neutral-300 flex flex-col items-center justify-center gap-4 text-neutral-900">
        <Loader2 className="w-12 h-12 animate-spin text-neutral-900" />
        <p className="text-sm font-black uppercase tracking-widest italic">
          Synchronizing Data...
        </p>
      </div>
    );
  }

  // 2. 錯誤處理狀態
  if (error || !data) {
    return (
      <div className="w-full h-[600px] bg-neutral-300 flex items-center justify-center font-black uppercase text-red-600">
        {error || 'Link Interrupted.'}
      </div>
    );
  }

  // 3. 正常渲染佈局
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 w-full bg-neutral-300 border-b border-neutral-400">
      <HeroLeft data={data} currentDayIndex={currentDayIndex} />
      <HeroRight data={data} />
    </section>
  );
};

export default Hero;
