import { CitySuggestion } from '../../services/weatherService';

interface SuggestionDropdownProps {
  suggestions: CitySuggestion[];
  onSelect: (city: CitySuggestion) => void;
  visible: boolean;
}

/**
 * SuggestionDropdown 子組件
 * 單獨處理搜尋建議清單的渲染與樣式。
 */
export const SuggestionDropdown: React.FC<SuggestionDropdownProps> = ({
  suggestions,
  onSelect,
  visible,
}) => {
  if (!visible) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-2xl overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
      {suggestions.map((city, index) => (
        <div
          key={`${city.lat}-${city.lon}-${index}`}
          onClick={() => onSelect(city)}
          className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer flex items-center justify-between group transition-colors"
        >
          <div className="flex flex-col">
            <span className="text-sm font-black text-neutral-900 dark:text-neutral-100">
              {city.name}
              {city.chineseName && (
                <span className="ml-2 text-neutral-400 dark:text-neutral-500 font-medium">
                  ({city.chineseName})
                </span>
              )}
            </span>
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
              {city.state ? `${city.state}, ` : ''}
              {city.country}
            </span>
          </div>
          <span className="text-[9px] font-mono text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
            {city.lat.toFixed(2)}, {city.lon.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
};
