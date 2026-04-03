import {
  CloudSun as CloudSunIcon,
  Search as SearchIcon,
  Menu as MenuIcon,
  User as UserIcon,
  Moon as MoonIcon,
} from 'lucide-react';

/**
 * Header 元件
 */
const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-neutral-200 backdrop-blur-md bg-white/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo & Brand */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-neutral-900 p-1.5 rounded-sm group-hover:bg-neutral-800 transition-colors">
            <CloudSunIcon className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-black uppercase tracking-tighter text-neutral-900">
            AERO<span className="text-neutral-500 italic">CAST</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="flex flex-col items-start group">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-900 border-b-2 border-neutral-900 pb-0.5">
              Dashboard
            </span>
            <span className="text-[8px] font-bold text-neutral-300 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity uppercase">
              儀表板
            </span>
          </a>
          <a href="#" className="flex flex-col items-start group">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-300 group-hover:text-neutral-900 transition-colors">
              Analytics
            </span>
            <span className="text-[8px] font-bold text-neutral-300 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity uppercase">
              數據分析
            </span>
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center bg-neutral-100 px-3 py-1.5 border border-neutral-200 rounded-sm">
            <SearchIcon className="h-3.5 w-3.5 text-neutral-400" />
            <input
              type="text"
              placeholder="SEARCH"
              className="bg-transparent border-none outline-none text-[10px] font-bold px-2 w-32 placeholder:text-neutral-300"
            />
          </div>
          <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
            <MoonIcon className="h-4 w-4 text-neutral-600" />
          </button>

          <div className="h-8 w-8 bg-neutral-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-neutral-800 transition-colors">
            <UserIcon className="h-4 w-4 text-white" />
          </div>
          <button className="md:hidden">
            <MenuIcon className="h-6 w-6 text-neutral-900" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
