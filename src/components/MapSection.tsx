import React from 'react';
import { MapPin } from 'lucide-react';
import { WeatherReport } from '../types/weather';
import { useMapLocation } from '../hooks/useMapLocation';
import { CityList } from './MapSection/CityList';
import { MapDisplay } from './MapSection/MapDisplay';

interface MapSectionProps {
  onCitySelect: (city: string) => void;
  selectedCity: string;
  weatherData: WeatherReport | null;
}

/**
 * MapSection 元件 (重構後)
 * 整合推薦城市清單與互動地圖顯示。
 * 透過 useMapLocation 處理座標邏輯，透過子組件分擔 UI 渲染職責。
 */
const MapSection: React.FC<MapSectionProps> = ({
  onCitySelect,
  selectedCity,
  weatherData,
}) => {
  const { lat, lon } = useMapLocation(selectedCity, weatherData);

  return (
    <section className="bg-neutral-50 dark:bg-neutral-900 p-8 border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        {/* Header - Adaptive Theme */}
        <div className="flex items-end justify-between mb-10 pb-4 border-b border-neutral-300 dark:border-neutral-700">
          <div>
            <div className="flex items-center gap-2 mb-2 text-neutral-500 dark:text-neutral-400 group cursor-default">
              <MapPin className="w-3.5 h-3.5 group-hover:text-sky-500 transition-colors" />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase">
                REGIONAL INDEX{' '}
                <span className="text-[8px] font-bold ml-2 opacity-50">
                  區域索引系統
                </span>
              </span>
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
              Regional{' '}
              <span className="text-neutral-500 italic font-light">
                Distribution
              </span>
            </h2>
          </div>
          <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest pb-1">
            Lat. {lat.toFixed(2)}° N / Long. {lon.toFixed(2)}° E
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* 左側: 城市列表 (33%) */}
          <CityList selectedCity={selectedCity} onCitySelect={onCitySelect} />

          {/* 右側: 地圖介面 (66%) */}
          <MapDisplay lat={lat} lon={lon} selectedCity={selectedCity} />
        </div>
      </div>
    </section>
  );
};

export default MapSection;
