# Weather Dashboard 天氣儀表板

這是一個基於 React 和 TypeScript 開發的天氣儀表板專案，旨在提供使用者即時天氣資訊與 5 日天氣預報。

## 🚀 核心功能
- **搜尋功能**：實作搜尋列，讓使用者輸入城市名稱以取得即時天氣資訊。
- **天氣顯示**：針對搜尋的城市顯示以下資訊：
  - 城市名稱
  - 目前溫度
  - 天氣狀況（如：晴天、多雲、雨天）
  - 風速
  - 濕度
- **天氣預報**：顯示搜尋城市的 5 日天氣預報，包含：
  - 日期
  - 預計溫度
  - 天氣狀況

## 🛠 技術線
- **Frontend**: React, TypeScript, Vite, Tailwind CSS v3, React Router
- **Backend/Database**: Node.js, Express, Firebase, PostgreSQL
- **Deployment**: GitHub Pages, Vercel

## 📂 專案架構 (Folder Structure)
```txt
src/
 ├─ components/  # 只負責 UI
 ├─ pages/       # 頁面元件
 ├─ hooks/       # 負責 side effects
 ├─ services/    # 只負責 API 請求
 ├─ types/       # TypeScript 型別定義
 ├─ utils/       # 保持 pure functions
 ├─ App.tsx
 └─ main.tsx
```

## 🏗 架構原則 (Architecture Rules)
- **Component-based architecture**: 元件化開發。
- **Separation of concerns**: 關注點分離。
- **Single responsibility principle**: 單一職責原則。
- **Mobile-first RWD**: 行動裝置優先的響應式設計。

## 📝 開發規範 (Coding Rules)
- **TypeScript**:
  - 禁止使用 `any`。
  - Props 必須定義 `interface`。
  - API response 必須建立 `type`。
  - Util function 必須標示 `return type`。
- **React**:
  - 使用 Function Component。
  - 優先使用 Hooks。
  - `useEffect` 只做 side effects。
  - User action 優先使用 event handler。
- **Prettier+Eslint**:
  - 使用 Prettier 整理程式碼
  - 根據 Eslint 規則規範

- **註解**: 複雜邏輯、易踩坑處及設計原因請使用**繁體中文**註解。

## 🛤 Git 工作流 (Git Workflow)
- `main`: 正式環境
- `preparing`: 預覽環境
- `feature-xxx`: 功能開發分支

## 🌐 部署
- 部署平台：GitHub Pages, Vercel

## 🤖 AI 開發規範 (AI Specification)
為了保持程式碼品質與開發節奏，AI 在產出程式碼時應遵守以下規則：
- **單一功能原則**：每次對話僅完成一個 Feature 或功能模組。
- **目標先行**：在輸出程式碼前，先說明本次修改的具體目標與邏輯。
- **完整輸出**：提供完整的檔案內容，避免僅提供程式碼片段（Code Snippets）。
- **設計解釋**：需詳細解釋 State 設計邏輯、Hook 使用原因以及元件（Component）拆分的依據。
- **禁止全案生成**：禁止一次性生成整包專案，應採增量開發模式。
