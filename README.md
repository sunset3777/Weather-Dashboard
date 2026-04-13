# Weather Dashboard 天氣儀表板

這是一個基於 **React 18**、**TypeScript** 與 **Tailwind CSS** 構建的高性能天氣儀表板。專案採用「關注點分離 (Separation of Concerns)」與「自定義 Hook」重構架構，提供流暢的全球城市搜尋體驗與動態主題切換。

## 🌟 核心功能

- **全球城市搜尋 (Autocomplete)**：整合 OpenWeatherMap Geocoding API，支援全球城市建議，並具備 500ms Debounce 效能優化。
- **即時天氣與 5 日預報**：提供精確的溫度、濕度、風速及降雨機率變化圖表。
- **動態主題切換 (Dark Mode)**：全站支援亮暗模式，具備平滑的顏色過渡效果。
- **互動式地圖 (Google Maps)**：自動定位所選城市座標，支援多層級縮放視角。
- **極致 RWD 佈局**：針對行動裝置進行深度優化（如 425px 斷點下的數據堆疊處理）。

## 🛠 技術棧

- **核心框架**: React 18 (Function Components)
- **開發工具**: Vite, TypeScript
- **樣式處理**: Tailwind CSS v3 (含 Dark Mode 支援)
- **圖表視覺化**: Recharts (響應式降雨圖表)
- **圖示庫**: Lucide React
- **資料來源**: OpenWeatherMap API, Google Maps Static API

## 📂 專案架構 (Modernized Folder Structure)

專案採用模組化設計，嚴格區分布局、功能與基礎零件：

```txt
src/
 ├─ components/
 │   ├─ ui/           # 原子組件 (如 WeatherIcon.tsx)
 │   ├─ features/     # 功能模組 (如 WeatherCard, PrecipitationChart, CityList)
 │   └─ layout/       # 頁面大框架 (Header, Hero, MapSection, Footer)
 ├─ hooks/            # 業務邏輯抽離 (useWeatherDashboard, useCitySearch, useMapLocation)
 ├─ pages/            # 頁面容器 (WeatherPage.tsx)
 ├─ services/         # API 請求與數據轉換 (weatherService.ts)
 ├─ types/            # 強型別定義 (weather.ts)
 └─ utils/            # 通用工具函式
```

## 🏗 重構設計原則 (Refactoring Principles)

- **關注點分離 (SoC)**：UI 組件不再負責複雜計算與 API 呼叫，邏輯統一封裝於自定義 Hooks。
- **組件原子化**：將重複使用的圖示、卡片與圖表獨立化，提升程式碼複用性。
- **強型別保障**：嚴格禁止 `any`，所有 API 回傳數據皆有對應的 Interface。
- **效能優先**：實作 Debounce 機制減少無效 API 請求；利用 `useMemo` 優化座標計算。

## 📝 開發規範

- **TypeScript**: Props 必須定義 `interface`，API response 必須建立專屬 `type`。
- **React**: 優先使用 Hooks 進行狀態管理，`useEffect` 僅用於處理 Side Effects。
- **註解**: 複雜邏輯、設計原因與 API 串接細節請使用 **繁體中文** 註解。
- **格式規範**: 嚴格遵守 ESLint 與 Prettier 規範，確保代碼風格統一。

## 🚀 快速開始

1. **複製專案**: `git clone [repository-url]`
2. **安裝依賴**: `npm install`
3. **環境變數**: 於 `.env` 設定 `VITE_WEATHER_API_KEY` 與 `VITE_GOOGLE_MAPS_API_KEY`。
4. **啟動開發**: `npm run dev`
5. **代碼檢查**: `npm run lint`

## 🛤 Git 工作流

- `main`: 正式穩定環境
- `feature/xxx`: 功能開發分支

---

_Developed with focus on Clean Code & Scalable Architecture._
