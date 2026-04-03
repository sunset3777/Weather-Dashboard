import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudSun,
  Wind,
} from 'lucide-react';
import { useDraggableScroll } from '../hooks/useDraggableScroll';
import { WeatherReport } from '../types/weather';

const WeatherIcon = ({
  condition,
  isToday,
}: {
  condition: string;
  isToday: boolean;
}) => {
  const size = 'w-10 h-10';
  const iconColor = isToday ? 'text-yellow-400' : 'text-neutral-500';
  const rainyColor = isToday ? 'text-blue-300' : 'text-blue-500';
  const windColor = isToday ? 'text-neutral-400' : 'text-neutral-600';

  switch (condition) {
    case 'Sunny':
    case 'Clear':
      return <Sun className={`${size} ${iconColor}`} strokeWidth={2.5} />;
    case 'Cloudy':
      return <Cloud className={`${size} ${iconColor}`} strokeWidth={2.5} />;
    case 'Partly Cloudy':
      return <CloudSun className={`${size} ${iconColor}`} strokeWidth={2.5} />;
    case 'Rainy':
      return (
        <CloudRain className={`${size} ${rainyColor}`} strokeWidth={2.5} />
      );
    case 'Storm':
      return (
        <CloudLightning
          className={`${size} text-purple-400`}
          strokeWidth={2.5}
        />
      );
    default:
      return <Wind className={`${size} ${windColor}`} strokeWidth={2.5} />;
  }
};

interface HeroLeftProps {
  data: WeatherReport;
  currentDayIndex: number;
}

const HeroLeft: React.FC<HeroLeftProps> = ({ data, currentDayIndex }) => {
  const {
    ref: scrollRef,
    isDragging,
    events: scrollEvents,
  } = useDraggableScroll(2.5);

  return (
    <div className="md:col-span-2 py-12 pl-8 overflow-hidden font-sans bg-neutral-300">
      <div className="flex items-center mb-8 px-4">
        <h2 className="text-3xl font-black text-neutral-900 uppercase italic tracking-tighter">
          {data.city}{' '}
          <span className="text-neutral-500 not-italic font-medium ml-2 text-xl tracking-normal italic">
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
        {data.weekly.map((item, index) => {
          const isToday = index === currentDayIndex;
          return (
            <div
              key={item.day}
              className={`flex-shrink-0 w-72 md:w-85 p-8 rounded-[3.5rem] shadow-2xl transition-all duration-500 snap-center border-2 pointer-events-none ${
                isToday
                  ? 'bg-neutral-900 text-neutral-100 border-neutral-800 scale-105 z-10'
                  : 'bg-neutral-100 text-neutral-900 border-transparent opacity-90'
              }`}
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h3
                    className={`text-2xl font-black uppercase tracking-tighter ${isToday ? 'text-neutral-100' : 'text-neutral-900'}`}
                  >
                    {item.day}
                  </h3>
                  <p
                    className={`text-[10px] font-black uppercase tracking-[0.2em] mt-2 ${isToday ? 'text-neutral-500' : 'text-neutral-400'}`}
                  >
                    {item.date}
                  </p>
                </div>
                <div
                  className={`p-4 rounded-2xl ${isToday ? 'bg-neutral-800' : 'bg-neutral-200'}`}
                >
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
                  className={`text-xl font-black uppercase italic mt-6 tracking-[0.1em] border-l-4 pl-4 ${isToday ? 'text-yellow-400 border-yellow-400' : 'text-neutral-600 border-neutral-900'}`}
                >
                  {item.condition}
                </p>
              </div>

              <div
                className={`grid grid-cols-2 gap-8 pt-8 border-t-2 ${isToday ? 'border-neutral-800' : 'border-neutral-200'}`}
              >
                <div className="flex flex-col">
                  <span
                    className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${isToday ? 'text-neutral-600' : 'text-neutral-400'}`}
                  >
                    Humidity
                  </span>
                  <span className="text-2xl font-black tracking-tighter">
                    {item.humidity}%
                  </span>
                </div>
                <div className="flex flex-col">
                  <span
                    className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${isToday ? 'text-neutral-600' : 'text-neutral-400'}`}
                  >
                    Wind
                  </span>
                  <span className="text-2xl font-black tracking-tighter">
                    {item.wind}
                    <small className="ml-1 text-xs font-bold opacity-40">
                      km/h
                    </small>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroLeft;
