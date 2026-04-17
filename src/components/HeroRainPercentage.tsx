import { Droplets } from 'lucide-react';
import { WeatherReport } from '../types/weather';
import { PrecipitationChart } from './features/PrecipitationChart';

interface HeroRightProps {
  data: WeatherReport;
}

/**
 * HeroRight 元件 (重構後)
 * 負責渲染降雨機率區塊。
 * 將圖表邏輯委託給 PrecipitationChart 子組件。
 */
const HeroRight: React.FC<HeroRightProps> = ({ data }) => {
  const maxPrecipitation = Math.max(...data.hourly.map((h) => h.precipitation));

  return (
    <div className="md:col-span-1 bg-neutral-300 dark:bg-neutral-700 p-12 flex flex-col justify-between text-neutral-900 dark:text-neutral-100 shadow-[inset_15px_0_30px_rgba(0,0,0,0.05)] overflow-hidden font-sans border-l border-neutral-400 dark:border-neutral-600 transition-colors duration-300">
      <div>
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-neutral-900 dark:bg-neutral-950 p-3 rounded-2xl shadow-xl">
            <Droplets className="w-6 h-6 text-sky-400" />
          </div>
          <div>
            <h3 className="text-3xl font-black uppercase tracking-tighter italic leading-none text-neutral-900 dark:text-neutral-100">
              Precipitation
            </h3>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400 mt-2">
              Atmospheric Analysis{' '}
              <span className="text-sky-600 italic">5-HR</span>
            </p>
          </div>
        </div>

        {/* 降雨機率圖表組件 */}
        <PrecipitationChart data={data.hourly} />

        {/* Forecast Insight - 動態數據摘要 */}
        <div className="mt-10 grid grid-cols-2 gap-4">
          <div className="bg-white/50 dark:bg-neutral-800/50 p-6 rounded-3xl border border-neutral-900/5 dark:border-white/5">
            <p className="text-[10px] font-black text-neutral-600 dark:text-neutral-400 uppercase tracking-widest mb-2">
              Peak Chance
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black">{maxPrecipitation}%</span>
              <span className="text-[10px] font-bold text-neutral-500 uppercase italic">
                Max
              </span>
            </div>
          </div>
          <div className="bg-white/50 dark:bg-neutral-800/50 p-6 rounded-3xl border border-neutral-900/5 dark:border-white/5">
            <p className="text-[10px] font-black text-neutral-600 dark:text-neutral-400 uppercase tracking-widest mb-2">
              Status
            </p>
            <p className="text-sm font-black uppercase italic leading-tight">
              {maxPrecipitation > 50 ? '建議攜帶雨具' : '目前天氣穩定'}
            </p>
          </div>
        </div>
      </div>

      {/* 底部按鈕 */}
      <div className="space-y-6 pt-10">
        <button className="group relative flex items-center justify-between w-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-black py-6 px-10 uppercase tracking-widest hover:bg-sky-500 hover:text-white transition-all rounded-full border-2 border-neutral-900 dark:border-neutral-100 shadow-2xl">
          <span className="text-xs">Global Radar Access</span>
          <span className="text-xl group-hover:translate-x-3 transition-transform duration-300">
            →
          </span>
        </button>
      </div>
    </div>
  );
};

export default HeroRight;
