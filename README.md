# Weather Dashboard 天氣儀表板

這是一個基於 **React 18**、**TypeScript** 與 **Tailwind CSS** 構建的高性能天氣儀表板。專案採用「關注點分離 (Separation of Concerns)」與「自定義 Hook」重構架構，提供流暢的全球城市搜尋體驗與動態主題切換。

## 🌟 核心功能

- **全球城市搜尋 (Autocomplete)**：整合 OpenWeatherMap Geocoding API，支援全球城市建議，並具備 500ms Debounce 效能優化。
- **即時天氣與 5 日預報**：提供精確的溫度、濕度、風速及降雨機率變化圖表。
- **動態主題切換 (Dark Mode)**：全站支援亮暗模式，具備平滑的顏色過渡效果。
- **互動式地圖 (Google Maps)**：自動定位所選城市座標，支援多層級縮放視角。
- **RWD 佈局**：針對行動裝置進行深度優化（如 425px 斷點下的數據堆疊處理）。

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

## 🏗 設計準則 (Design Principles)

- **關注點分離 (SoC)**：邏輯封裝於 Hooks，UI 組件僅負責呈現。
- **元件原子化**：根據區塊拆分小元件，提升可讀性與維護性。
- **避免冗餘**：移除無功能程式碼；不安裝、不保留未使用的相依套件。
- **路由擴充性**：即使是單頁面應用，亦導入 `react-router-dom` 為未來擴充做準備。
- **樣式**：優先採用 Tailwind 原生類名，僅在全域規範時使用 `extend`。

## 📝 開發規範 (Development Standards)

- **型別定義**：優先使用 `type`，僅在特定場景使用 `interface`；API 異常處理必須透過 `instanceof Error` 進行安全檢查。
- **語言一致性**：變數命名與邏輯註解必須保持語意連貫且一致。
- **Git 工作流**：分支命名採 `feature/`, `hotfix/`；Commit 訊息須明確描述改動原因與影響。
- **CI/CD**：整合 GitHub Actions 進行自動化 Lint 檢查與 Vercel 部署，詳見 `.github/workflows`。

## 🎨 UI/UX & SEO 優化

- **視覺直覺**：整合降雨機率資訊，簡化數據層次；介面不顯示冗餘的版本號。
- **閱讀體驗**：桌面版字體最小維持 **16px**；互動功能（如卡片拖曳）以提升操作直覺為首要目標。
- **SEO 強化**：完整實作 Open Graph (OG) Tags，確保社群分享內容精確。
- **細節導向**：地圖遮罩、轉場動畫等小功能在不影響效能前提下儘可能優化。

## 🚀 快速開始

1. **複製專案**: `git clone [repository-url]`
2. **安裝依賴**: `npm install`
3. **環境變數**: 於 `.env` 設定 `VITE_WEATHER_API_KEY` 與 `VITE_GOOGLE_MAPS_API_KEY`。
4. **啟動開發**: `npm run dev`
5. **代碼檢查**: `npm run lint`

## 🛤 Git 工作流 (Git Workflow)

本專案採用嚴格的環境隔離工作流，確保開發與生產環境：

- **核心分支管理**：
  - `main`：生產環境基準，僅存放穩定發佈的代碼。
  - `dev`：主要開發分支，由 `main` 衍生。
  - `preparing`：**獨立測試分支**，由 `main` 衍生。用於整合各功能分支進行壓力與驗證測試。
- **開發流程**：
  - **功能開發**：所有功能或修正分支（如 `feature/`, `fix/`）必須由 `dev` 延伸。
  - **整合測試**：開發過程中，功能分支需併入 `preparing` 進行驗證。
  - **單向隔離**：`preparing` 僅作為測試沙盒，**絕不併回 `dev` 或 `main`**，避免測試過程中的過度調試或暫時性程式碼污染核心環境。
  - **最終合併**：通過測試的功能分支由原分支併回 `dev`，確認穩定後再由 `dev` 合併至 `main`。

---