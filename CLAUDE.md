# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案概述

Hahow Backend Engineer 徵才測驗專案，實作 API server 串接 Hahow 上游 API，根據驗證狀態回傳不同內容。

## 開發指令

```bash
# 安裝依賴
npm install

# 開發模式啟動
npm run dev

# 建置專案  
npm run build

# 執行測試
npm test

# 執行單一測試檔案
npm test -- <test-file-pattern>

# 程式碼檢查
npm run lint

# 型別檢查
npm run type-check
```

## API 規格

### 未驗證狀態
- `GET /heroes` - 回傳所有英雄基本資料 (id, name, image)
- `GET /heroes/:heroId` - 回傳單一英雄基本資料

### 已驗證狀態 (Header: Name: hahow, Password: rocks)
- `GET /heroes` - 回傳所有英雄資料 + profile (str, int, agi, luk)
- `GET /heroes/:heroId` - 回傳單一英雄資料 + profile

## 上游 API 資源

- `https://hahow-recruit.herokuapp.com/heroes` - 英雄列表
- `https://hahow-recruit.herokuapp.com/heroes/:heroId` - 單一英雄
- `https://hahow-recruit.herokuapp.com/heroes/:heroId/profile` - 英雄能力值
- `https://hahow-recruit.herokuapp.com/auth` - 驗證端點

## 核心架構

1. **Authentication Middleware**: Header 驗證 (Name/Password)
2. **Hero Service**: 串接上游 API 取得英雄資料
3. **Response Handler**: 根據驗證狀態組合回傳資料
4. **Error Handler**: 基本錯誤處理

## 技術要求

- Node.js API server 實作
- 完整測試覆蓋
- Git 版本控管
- 可使用第三方套件
- 邊界條件處理
- 程式可讀性與可維護性

## 驗證邏輯

```
未驗證 -> 只回傳基本資料 (id, name, image)
已驗證 -> 基本資料 + profile 合併回傳
```