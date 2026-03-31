import React from 'react';

/**
 * 基礎 App 元件
 * 僅用於初始化專案結構，不包含具體功能邏輯。
 */
const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <h1 className="text-3xl font-bold text-blue-600">
        Weather Dashboard 專案初始化完成
      </h1>
    </div>
  );
};

export default App;
