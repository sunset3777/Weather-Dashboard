import { Cloud } from 'lucide-react';

/**
 *  Footer 元件
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-100 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 py-10 text-neutral-500 dark:text-neutral-500 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left: Brand & Status */}
          <div className="flex items-center gap-6">
            <div className="flex items-center space-x-2 text-neutral-900 dark:text-neutral-100">
              <Cloud className="w-4 h-4 opacity-70" />
              <span className="text-sm font-black tracking-tighter uppercase">
                WeatherDash
              </span>
            </div>
            <div className="h-4 w-[1px] bg-neutral-300 dark:bg-neutral-700 hidden md:block"></div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[9px] font-black uppercase tracking-widest opacity-60">
                System Active
              </span>
            </div>
          </div>

          {/* Right: Copyright & Meta */}
          <div className="flex flex-col md:items-end gap-1 text-[9px] font-bold uppercase tracking-[0.2em] opacity-50">
            <div>&copy; {currentYear} WeatherDash Intelligence.</div>
            <div className="flex gap-3 mt-1 justify-center md:justify-end">
              <span>v2.4.0</span>
              <span className="opacity-30">|</span>
              <span>Regional Intelligence System</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
