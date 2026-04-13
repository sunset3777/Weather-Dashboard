import React from 'react';
import { ArrowRight } from 'lucide-react';
import { FEATURED_CITIES } from '../../constants/cities';

interface CityListProps {
  selectedCity: string;
  onCitySelect: (city: string) => void;
}

/**
 * CityList 子組件
 * 負責渲染左側的推薦城市清單與切換狀態。
 */
export const CityList: React.FC<CityListProps> = ({
  selectedCity,
  onCitySelect,
}) => {
  return (
    <div className="lg:col-span-1 flex flex-col gap-6">
      <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-200 flex items-center gap-4">
        RECOMMENDED CITIES
        <span className="w-8 h-[1px] bg-neutral-300 dark:bg-neutral-500"></span>
        <span className="text-[8px] font-bold text-neutral-400">
          推薦城市清單
        </span>
      </h3>

      <div className="flex flex-col border-t border-neutral-200 dark:border-neutral-700">
        {FEATURED_CITIES.map((city) => {
          const isSelected = selectedCity === city.name;

          // 定義清單項目的動態樣式
          const listItemClasses = isSelected
            ? 'px-4 bg-neutral-200 dark:bg-neutral-800 border-l-4 border-sky-500'
            : 'hover:px-4 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50';

          const cityNameClasses = isSelected
            ? 'text-neutral-900 dark:text-white'
            : 'text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-100';

          const tempClasses = isSelected
            ? 'text-neutral-900 dark:text-white'
            : 'text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-500 dark:group-hover:text-neutral-300';

          const arrowClasses = isSelected
            ? 'text-sky-500'
            : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-neutral-400';

          return (
            <div
              key={city.name}
              onClick={() => onCitySelect(city.name)}
              className={`group cursor-pointer flex justify-between items-center py-6 border-b border-neutral-200 dark:border-neutral-700 transition-all duration-300 ${listItemClasses}`}
            >
              <div>
                <div className="flex items-baseline gap-3">
                  <h4
                    className={`font-black uppercase text-2xl tracking-tight transition-colors ${cityNameClasses}`}
                  >
                    {city.name}
                  </h4>
                  <span className="text-xs font-bold text-neutral-500">
                    {city.chineseName}
                  </span>
                </div>
                <p className="text-[10px] font-bold text-neutral-400 uppercase mt-1 tracking-widest">
                  {city.status}
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div
                  className={`text-2xl font-black italic tracking-tighter ${tempClasses}`}
                >
                  {city.temp}°
                </div>
                <ArrowRight
                  className={`w-4 h-4 transition-all duration-300 ${arrowClasses}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
