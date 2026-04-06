import { Droplets } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { WeatherReport } from '../types/weather';

/**
 * 定義圖表資料點的型別
 */
interface HourlyDataPoint {
  time: string;
  precipitation: number;
}

/**
 * 自定義 Recharts Tooltip 型別
 */
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: HourlyDataPoint; // 這裡改用具體的型別取代 any
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-neutral-900 border border-neutral-700 p-3 rounded-xl shadow-2xl">
        <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">
          Precipitation
        </p>
        <p className="text-xl font-black text-neutral-100">{`${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

interface HeroRightProps {
  data: WeatherReport;
}

const HeroRight: React.FC<HeroRightProps> = ({ data }) => {
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

        {/* Recharts 圖表容器 */}
        <div className="h-64 w-full bg-neutral-100/50 dark:bg-neutral-900/50 p-6 rounded-[2.5rem] border border-neutral-900/5 dark:border-white/5 shadow-[20px_20px_40px_rgba(0,0,0,0.05)] relative group overflow-hidden mt-8">
          {/* 背景裝飾圖示 */}
          <div className="absolute -right-4 -top-4 opacity-[0.03] rotate-12 transition-transform group-hover:rotate-0 duration-700">
            <Droplets className="w-32 h-32 text-sky-600" />
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.hourly}
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'currentColor', fontSize: 10, fontWeight: 900 }}
                dy={10}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: 'rgba(0, 0, 0, 0.05)', radius: 10 }}
              />
              <Bar
                dataKey="precipitation"
                radius={[12, 12, 12, 12]}
                animationDuration={1500}
              >
                {data.hourly.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 0 ? '#0ea5e9' : '#737373'}
                    style={{
                      filter:
                        index === 0
                          ? 'drop-shadow(0 0 8px rgba(14, 165, 233, 0.4))'
                          : 'none',
                    }}
                    className="transition-all duration-300 hover:opacity-80"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Forecast Insight - 動態數據摘要 */}
        <div className="mt-10 grid grid-cols-2 gap-4">
          <div className="bg-white/50 dark:bg-neutral-800/50 p-6 rounded-3xl border border-neutral-900/5 dark:border-white/5">
            <p className="text-[10px] font-black text-neutral-600 dark:text-neutral-400 uppercase tracking-widest mb-2">
              Peak Chance
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black">
                {Math.max(...data.hourly.map((h) => h.precipitation))}%
              </span>
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
              {Math.max(...data.hourly.map((h) => h.precipitation)) > 50
                ? '建議攜帶雨具'
                : '目前天氣穩定'}
            </p>
          </div>
        </div>
      </div>

      {/* 底部數據與按鈕 */}
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
