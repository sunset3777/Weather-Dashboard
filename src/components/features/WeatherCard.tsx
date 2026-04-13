import { WeatherIcon } from '../ui/WeatherIcon';
import { DailyForecast } from '../../types/weather';

interface WeatherCardProps {
  item: DailyForecast;
  isToday: boolean;
}

/**
 * WeatherCard 功能組件
 * 渲染單一天的天氣資訊，包含溫度、濕度與風速。
 * 實作 425px 以下垂直堆疊的 RWD 佈局。
 */
export const WeatherCard: React.FC<WeatherCardProps> = ({ item, isToday }) => {
  // --- 樣式變數化 (Styles Externalization) ---
  // 核心容器樣式：處理背景、邊框、縮放與陰影
  const containerClasses = isToday
    ? 'bg-neutral-900 text-neutral-100 border-neutral-800 dark:bg-neutral-950 dark:border-neutral-900 scale-105 z-10'
    : 'bg-white text-neutral-900 border-transparent dark:bg-neutral-700 dark:text-neutral-100 opacity-90';

  // 標題文字樣式
  const dayClasses = isToday
    ? 'text-neutral-100'
    : 'text-neutral-900 dark:text-neutral-100';

  // 次要日期標籤樣式
  const dateClasses = isToday
    ? 'text-neutral-500'
    : 'text-neutral-400 dark:text-neutral-400';

  // 圖示背景容器樣式
  const iconWrapperClasses = isToday
    ? 'bg-neutral-800'
    : 'bg-neutral-200 dark:bg-neutral-600';

  // 天氣狀況文字與側邊條樣式
  const conditionClasses = isToday
    ? 'text-yellow-400 border-yellow-400'
    : 'text-neutral-600 border-neutral-900 dark:text-neutral-300 dark:border-neutral-100';

  // 底部數據網格的分隔線樣式
  const gridBorderClasses = isToday
    ? 'border-neutral-800'
    : 'border-neutral-200 dark:border-neutral-600';

  // 底部數據欄位的標籤文字樣式
  const metaLabelClasses = isToday
    ? 'text-neutral-600'
    : 'text-neutral-400 dark:text-neutral-500';

  return (
    <div
      className={`flex-shrink-0 w-72 md:w-85 p-8 rounded-[3.5rem] shadow-2xl transition-all duration-500 snap-center border-2 pointer-events-none ${containerClasses}`}
    >
      <div className="flex justify-between items-start mb-12">
        <div>
          <h3
            className={`text-2xl font-black uppercase tracking-tighter ${dayClasses}`}
          >
            {item.day}
          </h3>
          <p
            className={`text-[10px] font-black uppercase tracking-[0.2em] mt-2 ${dateClasses}`}
          >
            {item.date}
          </p>
        </div>
        <div className={`p-4 rounded-2xl ${iconWrapperClasses}`}>
          <WeatherIcon condition={item.condition} isToday={isToday} />
        </div>
      </div>

      <div className="mb-14">
        <div className="flex items-baseline gap-2">
          <span className="text-8xl font-black tracking-tighter leading-none">
            {item.temp}°
          </span>
          <span className="text-3xl font-bold opacity-20 uppercase italic font-sans">
            C
          </span>
        </div>
        <p
          className={`text-xl font-black uppercase italic mt-6 tracking-[0.1em] border-l-4 pl-4 ${conditionClasses}`}
        >
          {item.condition}
        </p>
      </div>

      {/* 425px 以下切換為垂直堆疊 (Mobile Optimization) */}
      <div
        className={`grid grid-cols-2 max-[425px]:grid-cols-1 gap-8 pt-8 border-t-2 ${gridBorderClasses}`}
      >
        <div className="flex flex-col">
          <span
            className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${metaLabelClasses}`}
          >
            Humidity
          </span>
          <span className="text-2xl font-black tracking-tighter">
            {item.humidity}%
          </span>
        </div>
        <div className="flex flex-col">
          <span
            className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${metaLabelClasses}`}
          >
            Wind
          </span>
          <span className="text-2xl font-black tracking-tighter">
            {item.wind}
            <small className="ml-1 text-xs font-bold opacity-40">km/h</small>
          </span>
        </div>
      </div>
    </div>
  );
};
