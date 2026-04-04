import React from 'react';
import { Cloud, Globe, Shield, Info } from 'lucide-react';

/**
 * 簡約版 Footer 元件
 * 減少資訊量，專注於品牌與系統狀態。
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 py-12 text-neutral-400">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
          {/* Left: Brand & Brief */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center space-x-2 text-neutral-100">
              <Cloud className="w-5 h-5" />
              <span className="text-lg font-black tracking-tighter uppercase">
                WeatherDash
              </span>
            </div>
            <p className="text-[11px] font-medium max-w-xs leading-relaxed opacity-60 uppercase tracking-wider">
              Real-time meteorological visualization system. <br />
              Empowering decision making through regional intelligence.
            </p>
          </div>

          {/* Right: Technical Status (Simplified) */}
          <div className="flex items-center gap-6 bg-neutral-800/30 px-4 py-3 rounded-sm border border-neutral-800">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[9px] font-black uppercase tracking-widest text-neutral-200">
                System Active
              </span>
            </div>
            <div className="h-4 w-[1px] bg-neutral-700"></div>
            <div className="flex gap-4">
              <Globe className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
              <Shield className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
              <Info className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        {/* Bottom: Meta Info */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-neutral-800/50 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-600">
          <div>&copy; {currentYear} WeatherDash Intelligence.</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>v2.4.0-STABLE</span>
            <span className="text-neutral-700">|</span>
            <span>Latency: 42ms</span>
            <span className="text-neutral-700">|</span>
            <span>Region: TW-TP</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
