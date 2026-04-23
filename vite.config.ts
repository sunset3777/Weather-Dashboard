import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite 設定檔案 (Multi-platform Adaptive Deployment)
 * 解決 GitHub Pages (子目錄) 與 Vercel (根目錄) 的部署路徑衝突。
 * 
 * - GITHUB_ACTIONS: GitHub 自動化流程環境變數
 * - VERCEL: Vercel 平台自動化流程環境變數
 */
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? '/Weather-Dashboard/' : '/',
});