import React, { useState } from 'react';

interface HeaderProps {
  onSearch: (city: string) => void;
}

/**
 * Header 元件
 * 包含標題、搜尋框、亮暗模式切換按鈕 (UI 狀態) 與設定按鈕。
 * 主色調固定為灰黑色 (neutral-900)。
 */
const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  // 內部狀態僅用於切換按鈕圖示，不影響全域模式
  const [isDark, setIsDark] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const toggleDarkMode = () => setIsDark(!isDark);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onSearch(inputValue.trim());
      setInputValue(''); // 搜尋後清空輸入框 (選配)
    }
  };

  return (
    <header className="flex w-full items-center justify-between bg-neutral-900 px-6 py-4 text-neutral-100 shadow-md">
      {/* Title / Logo */}
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold tracking-tight">WeatherDash</span>
      </div>

      {/* Search Input */}
      <div className="mx-6 max-w-md flex-1">
        <div className="relative text-neutral-400">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </span>
          <input
            type="text"
            className="w-full rounded-lg border-none bg-neutral-800 py-2 pl-10 pr-4 text-neutral-100 placeholder-neutral-500 outline-none transition-all focus:ring-2 focus:ring-blue-500"
            placeholder="Search city..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      {/* Actions: DarkMode & Settings */}
      <div className="flex items-center space-x-4">
        {/* Toggle Dark Mode Button (UI Only) */}
        <button
          onClick={toggleDarkMode}
          className="rounded-lg p-2 transition-colors hover:bg-neutral-800 focus:outline-none"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? (
            <svg
              className="h-6 w-6 text-yellow-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z"
              ></path>
            </svg>
          ) : (
            <svg
              className="h-6 w-6 text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              ></path>
            </svg>
          )}
        </button>

        {/* Settings Button */}
        <button className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-800 focus:outline-none">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
