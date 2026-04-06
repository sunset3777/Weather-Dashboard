import React from 'react';
import { useDraggableScroll } from '../hooks/useDraggableScroll';
import { WeatherReport } from '../types/weather';
import { WeatherCard } from './features/WeatherCard';

interface HeroLeftProps {
  data: WeatherReport;
  currentDayIndex: number;
}

/**
 * HeroLeft 元件
 * 負責渲染所選城市的每週預報列表。
 * 使用 WeatherCard 子組件處理單個卡片的內容。
 */
const HeroLeft: React.FC<HeroLeftProps> = ({ data, currentDayIndex }) => {
  const {
    ref: scrollRef,
    isDragging,
    events: scrollEvents,
  } = useDraggableScroll(2.5);

  return (
    <div className="md:col-span-2 py-12 pl-8 overflow-hidden font-sans bg-neutral-200 dark:bg-neutral-800 transition-colors duration-300">
      <div className="flex items-center mb-8 px-4">
        <h2 className="text-3xl font-black text-neutral-900 dark:text-neutral-100 uppercase italic tracking-tighter">
          {data.city}{' '}
          <span className="text-neutral-500 dark:text-neutral-400 not-italic font-medium ml-2 text-xl tracking-normal italic">
            Flow
          </span>
        </h2>
      </div>

      <div
        ref={scrollRef}
        {...scrollEvents}
        className={`flex gap-8 overflow-x-auto pb-12 pr-12 snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none
          [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
          ${isDragging ? 'scroll-auto' : 'scroll-smooth'}`}
      >
        {data.weekly.map((item, index) => (
          <WeatherCard
            key={item.day}
            item={item}
            isToday={index === currentDayIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroLeft;
