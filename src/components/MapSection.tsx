import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { WeatherReport } from '../types/weather';

interface MapSectionProps {
  onCitySelect: (city: string) => void;
  selectedCity: string;
  weatherData: WeatherReport | null;
}

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const MapSection: React.FC<MapSectionProps> = ({
  onCitySelect,
  selectedCity,
  weatherData,
}) => {
  const [zoom, setZoom] = React.useState(11);

  const featuredCities = [
    { name: 'Taipei', cn: '台北市', temp: 24, status: '多雲時晴', lat: 25.033, lon: 121.565 },
    { name: 'Taichung', cn: '台中市', temp: 26, status: '晴朗', lat: 24.147, lon: 120.673 },
    { name: 'Kaohsiung', cn: '高雄市', temp: 28, status: '晴', lat: 22.627, lon: 120.301 },
    { name: 'Tainan', cn: '台南市', temp: 27, status: '多雲', lat: 22.999, lon: 120.227 },
  ];

  // 邏輯：優先使用天氣 API 回傳的真實座標
  const lat = weatherData?.lat || featuredCities.find(c => c.name === selectedCity)?.lat || featuredCities[0].lat;
  const lon = weatherData?.lon || featuredCities.find(c => c.name === selectedCity)?.lon || featuredCities[0].lon;

  // 簡化版 Google Maps URL，用於測試連線
  const googleMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=${zoom}&size=800x450&maptype=roadmap&markers=color:red%7C${lat},${lon}&key=${GOOGLE_MAPS_API_KEY}`;

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
            Lat. {lat}° N / Long. {lon}° E
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
                      ? 'px-4 bg-neutral-700 border-l-4 border-sky-500'
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
            <div className="relative aspect-[16/9] bg-neutral-800 border border-neutral-700 group overflow-hidden">
              {!GOOGLE_MAPS_API_KEY ? (
                <div className="absolute inset-0 flex items-center justify-center text-neutral-500 font-black uppercase tracking-widest text-xs">
                  Missing Google Maps API Key
                </div>
              ) : (
                <img 
                  src={googleMapUrl}
                  alt={`Map of ${selectedCity}`}
                  key={googleMapUrl} // 當 URL 改變時強制重新載入動畫
                  className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-1000 grayscale hover:grayscale-0 animate-in fade-in zoom-in-95"
                  onError={(e) => {
                    console.error('Google Maps Load Error. Check if Static Maps API is enabled and Billing is linked.');
                    (e.target as HTMLImageElement).src = 'https://placehold.co/800x450/171717/404040?text=MAP+LOAD+ERROR';
                  }}
                />
              )}
              
              {/* 科技感標註 (Overlay) */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 flex items-center justify-center opacity-40">
                  <div className="w-24 h-24 border border-sky-500/20 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* 縮放控制器 (新) */}
              <div className="absolute top-6 right-6 flex flex-col gap-2">
                {[
                  { label: 'STREET', val: 14 },
                  { label: 'CITY', val: 11 },
                  { label: 'REGION', val: 8 }
                ].map((btn) => (
                  <button
                    key={btn.val}
                    onClick={() => setZoom(btn.val)}
                    className={`px-3 py-1 text-[8px] font-black border transition-all ${
                      zoom === btn.val 
                        ? 'bg-sky-500 border-sky-500 text-neutral-900' 
                        : 'bg-neutral-900/80 border-neutral-700 text-neutral-400 hover:border-sky-500'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              {/* 右下角數據標籤 */}
              <div className="absolute bottom-6 right-6 bg-neutral-900/90 backdrop-blur-md border border-neutral-700 px-4 py-2 flex flex-col items-end">
                <p className="text-sky-500 font-black uppercase tracking-widest text-[9px] mb-1">
                  Target Identified
                </p>
                <p className="text-white font-black uppercase tracking-tight text-[11px]">
                  {selectedCity}
                </p>
                <p className="text-neutral-500 font-mono text-[7px] mt-1 uppercase">
                  LOC: {lat}N / {lon}E
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center text-[8px] font-bold text-neutral-500 uppercase tracking-[0.2em]">
              <span>PROVIDER: GOOGLE EARTH IMAGERY SERVICE</span>
              <div className="flex gap-4">
                <span className="text-sky-500 animate-pulse uppercase tracking-[0.3em]">Satellite Link: Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
