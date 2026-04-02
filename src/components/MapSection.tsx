import React from 'react';
import { MapPin } from 'lucide-react';

interface MapSectionProps {
  onCitySelect: (city: string) => void;
}

const MapSection: React.FC<MapSectionProps> = ({ onCitySelect }) => {
  // 模擬點選地區
  const cities = ['Taipei City', 'Taichung City', 'Kaohsiung City', 'Tainan City'];

  return (
    <section className="bg-neutral-50 p-8 border-b border-neutral-200">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="w-6 h-6 text-neutral-900" />
          <h2 className="text-2xl font-black uppercase tracking-tight">Regional Analysis</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 地圖視窗佔位符 */}
          <div className="lg:col-span-3 aspect-video bg-neutral-200 border-2 border-neutral-300 flex items-center justify-center relative group overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i10!2i868!3i443!2m3!1e0!2sm!3i624072895!3m8!2szh-TW!3sTW!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!5f2')] bg-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700"></div>
            <div className="relative z-10 text-center">
              <p className="text-neutral-900 font-black uppercase tracking-widest bg-white/80 px-4 py-2">
                Interactive Map API Placeholder
              </p>
              <p className="text-xs text-neutral-600 mt-2 uppercase">
                (Google Maps / Leaflet Integration Coming Soon)
              </p>
            </div>
          </div>

          {/* 快速選擇面板 (模擬點選功能) */}
          <div className="flex flex-col gap-4">
            <p className="text-sm font-bold uppercase text-neutral-500 border-b pb-2">Select Location</p>
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => onCitySelect(city)}
                className="w-full text-left px-4 py-3 bg-white border border-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors font-bold uppercase text-sm"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
