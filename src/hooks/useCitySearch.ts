import { useState, useEffect, useRef } from 'react';
import { fetchCitySuggestions, CitySuggestion } from '../services/weatherService';

/**
 * useCitySearch Hook
 * 封裝城市搜尋建議的邏輯：包含 Debounce、API 請求、點擊外部關閉以及選取處理。
 */
export const useCitySearch = (onSearch: (city: string) => void) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 1. Debounce Logic: 延遲發送 API 請求
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (inputValue.trim().length >= 2) {
        const results = await fetchCitySuggestions(inputValue.trim());
        setSuggestions(results);
        setShowSuggestions(results.length > 0);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  // 2. Click Outside Logic: 點擊外部關閉選單
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (city: CitySuggestion) => {
    onSearch(city.name);
    setInputValue(''); // 選擇後清空輸入框
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onSearch(inputValue.trim());
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  return {
    inputValue,
    setInputValue,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    dropdownRef,
    handleSelect,
    handleKeyDown,
  };
};
