import React, { useState } from 'react';

interface MapDisplayProps {
  lat: number;
  lon: number;
  selectedCity: string;
}

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

/**
 * MapDisplay 子組件
 * 負責渲染 Google Maps 靜態地圖、縮放控制項與狀態標籤。
 */
export const MapDisplay: React.FC<MapDisplayProps> = ({
  lat,
  lon,
  selectedCity,
}) => {
  const [zoom, setZoom] = useState(11);

  const googleMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=${zoom}&size=800x450&maptype=roadmap&markers=color:red%7C${lat},${lon}&key=${GOOGLE_MAPS_API_KEY}`;

  return (
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
            key={googleMapUrl}
            className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-1000 grayscale hover:grayscale-0 animate-in fade-in zoom-in-95"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://placehold.co/800x450/171717/404040?text=MAP+LOAD+ERROR';
            }}
          />
        )}

        {/* 科技感標註 (Overlay) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <div className="w-24 h-24 border border-sky-500/20 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* 縮放控制器 */}
        <div className="absolute top-6 right-6 flex flex-col gap-2">
          {[
            { label: 'STREET', val: 14 },
            { label: 'CITY', val: 11 },
            { label: 'REGION', val: 8 },
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
            LOC: {lat.toFixed(4)}N / {lon.toFixed(4)}E
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center text-[8px] font-bold text-neutral-500 uppercase tracking-[0.2em]">
        <span>PROVIDER: GOOGLE EARTH IMAGERY SERVICE</span>
        <div className="flex gap-4">
          <span className="text-sky-500 animate-pulse uppercase tracking-[0.3em]">
            Satellite Link: Active
          </span>
        </div>
      </div>
    </div>
  );
};
