import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { HourlyForecast } from '../../types/weather';

interface HourlyDataPoint {
  time: string;
  precipitation: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: HourlyDataPoint;
  }>;
}

/**
 * 自定義 Recharts Tooltip
 * 負責渲染懸停時的降雨機率提示。
 */
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

interface PrecipitationChartProps {
  data: HourlyForecast[];
}

/**
 * PrecipitationChart 功能組件
 * 封裝 Recharts 的複雜配置，專注於降雨機率圖表的渲染。
 */
export const PrecipitationChart: React.FC<PrecipitationChartProps> = ({
  data,
}) => {
  return (
    <div className="h-64 w-full bg-neutral-100/50 dark:bg-neutral-900/50 p-6 rounded-[2.5rem] border border-neutral-900/5 dark:border-white/5 shadow-[20px_20px_40px_rgba(0,0,0,0.05)] relative group overflow-hidden mt-8">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
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
            {data.map((_entry, index) => (
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
  );
};
