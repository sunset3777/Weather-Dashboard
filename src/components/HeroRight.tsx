import React from 'react';
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
 * 自定義 Recharts Tooltip
 * 為了相容 Recharts 的內部型別推導，我們直接解構 props
 */
const CustomTooltip = ({ active, payload }: any) => {
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
    <div className="md:col-span-1 bg-neutral-600 p-12 flex flex-col justify-between text-neutral-100 shadow-[inset_15px_0_30px_rgba(0,0,0,0.15)] overflow-hidden font-sans">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-neutral-100 p-3 rounded-2xl shadow-xl">
            <Droplets className="w-6 h-6 text-neutral-900" />
          </div>
          <div>
            <h3 className="text-3xl font-black uppercase tracking-tighter italic leading-none">
              Precipitation
            </h3>
            <p className="text-xs font-black uppercase tracking-widest text-neutral-400 mt-1">
              5-Hour Forecast Flow
            </p>
          </div>
        </div>

        <p className="text-neutral-300 leading-relaxed font-medium text-base mb-12">
          Dynamic hourly analysis powered by <strong>Recharts Engine</strong>.
          High fidelity atmospheric metrics.
        </p>

        {/* Recharts 圖表容器 */}
        <div className="h-56 w-full bg-neutral-700/40 p-6 rounded-[2.5rem] border border-neutral-500/20 shadow-2xl relative">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.hourly}
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#a3a3a3', fontSize: 10, fontWeight: 900 }}
                dy={10}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: 'rgba(255, 255, 255, 0.05)', radius: 10 }}
              />
              <Bar
                dataKey="precipitation"
                radius={[12, 12, 12, 12]}
                animationDuration={1500}
              >
                {data.hourly.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 0 ? '#0ea5e9' : '#525252'}
                    style={{
                      filter:
                        index === 0
                          ? 'drop-shadow(0 0 12px rgba(14, 165, 233, 0.5))'
                          : 'none',
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-6 pt-10">
        <div className="bg-neutral-800/60 backdrop-blur-md p-8 rounded-3xl border border-neutral-500/20 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-neutral-100 group-hover:w-2 transition-all"></div>
          <p className="text-sm text-neutral-300 leading-relaxed italic font-medium">
            "The probability of rainfall is currently being monitored by
            real-time satellites."
          </p>
        </div>

        <button className="group relative flex items-center justify-between w-full bg-neutral-900 text-neutral-100 font-black py-6 px-10 uppercase tracking-widest hover:bg-neutral-100 hover:text-neutral-900 transition-all rounded-full border-2 border-neutral-800 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
          <span className="text-sm">Global Radar View</span>
          <span className="text-xl group-hover:translate-x-3 transition-transform duration-300">
            →
          </span>
        </button>
      </div>
    </div>
  );
};

export default HeroRight;
