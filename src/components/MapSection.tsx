import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

interface MapSectionProps {
  onCitySelect: (city: string) => void;
  selectedCity: string;
}

const MapSection: React.FC<MapSectionProps> = ({
  onCitySelect,
  selectedCity,
}) => {
  const featuredCities = [
    { name: 'Taipei City', cn: '台北市', temp: 24, status: '多雲時晴' },
    { name: 'Taichung City', cn: '台中市', temp: 26, status: '晴朗' },
    { name: 'Kaohsiung City', cn: '高雄市', temp: 28, status: '晴' },
    { name: 'Tainan City', cn: '台南市', temp: 27, status: '多雲' },
  ];

  return (
    <section className="bg-neutral-600 p-8 border-b border-neutral-700">
      <div className="mx-auto max-w-7xl">
        {/* Header - Dark Theme */}
        <div className="flex items-end justify-between mb-10 pb-4 border-b border-neutral-500/30">
          <div>
            <div className="flex items-center gap-2 mb-2 text-neutral-300 group cursor-default">
              <MapPin className="w-3.5 h-3.5 group-hover:text-white transition-colors" />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase">
                REGIONAL INDEX{' '}
                <span className="text-[8px] font-bold ml-2 opacity-50">
                  區域索引系統
                </span>
              </span>
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-white">
              Regional{' '}
              <span className="text-neutral-400 italic font-light">
                Distribution
              </span>
            </h2>
          </div>
          <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest pb-1">
            Lat. 23.9° N / Long. 120.9° E
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* 左側: 城市列表 (33%) */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-200 flex items-center gap-4">
              RECOMMENDED CITIES
              <span className="w-8 h-[1px] bg-neutral-500"></span>
              <span className="text-[8px] font-bold text-neutral-400">
                推薦城市清單
              </span>
            </h3>

            <div className="flex flex-col border-t border-neutral-500/30">
              {featuredCities.map((city) => (
                <div
                  key={city.name}
                  onClick={() => onCitySelect(city.name)}
                  className={`group cursor-pointer flex justify-between items-center py-6 border-b border-neutral-500/30 transition-all duration-300 ${
                    selectedCity === city.name
                      ? 'px-4 bg-neutral-700'
                      : 'hover:px-4 hover:bg-neutral-500/10'
                  }`}
                >
                  <div>
                    <div className="flex items-baseline gap-3">
                      <h4
                        className={`font-black uppercase text-2xl tracking-tight transition-colors ${
                          selectedCity === city.name
                            ? 'text-white'
                            : 'text-neutral-400 group-hover:text-neutral-100'
                        }`}
                      >
                        {city.name}
                      </h4>
                      <span className="text-xs font-bold text-neutral-500">
                        {city.cn}
                      </span>
                    </div>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase mt-1 tracking-widest">
                      {city.status}
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div
                      className={`text-2xl font-black italic tracking-tighter ${
                        selectedCity === city.name
                          ? 'text-white'
                          : 'text-neutral-500 group-hover:text-neutral-300'
                      }`}
                    >
                      {city.temp}°
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 transition-all duration-300 ${
                        selectedCity === city.name
                          ? 'text-white'
                          : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-neutral-500'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 右側: 地圖介面 (66%) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="relative aspect-[16/9] bg-neutral-800 border border-neutral-700 group overflow-hidden grayscale">
              <div className="absolute inset-0 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i10!2i868!3i443!2m3!1e0!2sm!3i624072895!3m8!2szh-TW!3sTW!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!5f2')] bg-cover opacity-20 group-hover:opacity-40 transition-all duration-700"></div>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                </div>
              </div>

              {/* 右下角標籤 */}
              <div className="absolute bottom-6 right-6 bg-neutral-900 border border-neutral-700 px-4 py-2">
                <p className="text-white font-black uppercase tracking-widest text-[9px]">
                  VIEWING: {selectedCity || 'Regional'}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center text-[8px] font-bold text-neutral-500 uppercase tracking-[0.2em]">
              <span>MAP SOURCE: DIGITALGLOBE / OSM</span>
              <div className="flex gap-4">
                <span className="cursor-pointer hover:text-white transition-colors uppercase">
                  Layers
                </span>
                <span className="cursor-pointer hover:text-white transition-colors uppercase">
                  Zoom
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
