# Hahow Backend Engineer 小專案

本專案為 Hahow Backend Engineer 徵才測驗，使用 Node.js + TypeScript 實作 API server，串接 Hahow 提供的上游 API，依驗證狀態回傳不同的資料內容。

---

## 如何啟動 Server

### 環境需求

- Node.js 20 或以上版本
- npm

### 本機開發

```bash
# 1. 安裝依賴套件
npm install

# 2. 建立環境變數檔案（可選）
# 複製 .env.example 並修改為 .env，或使用預設值

# 3. 開發模式啟動（自動重載）
npm run dev

# 服務將在 http://localhost:3000 啟動
```

### 生產環境部署

```bash
# 1. 建置 TypeScript 為 JavaScript
npm run build

# 2. 啟動生產環境服務
npm start
```

### Docker 部署

```bash
# 建置 Docker image
docker build -t hahow-api .

# 執行容器
docker run -p 3000:3000 hahow-api
```

### 測試 API

```bash
# 健康檢查
curl http://localhost:3000/health

# 未驗證狀態 - 取得英雄基本資料
curl http://localhost:3000/heroes

# 已驗證狀態 - 取得英雄完整資料（含 profile）
curl -H "Name: hahow" -H "Password: rocks" http://localhost:3000/heroes
```

---

## 專案架構與 API Server 架構邏輯

### 整體架構圖

```
Client Request
      ↓
[Security Middleware] (helmet, cors)
      ↓
[Logger Middleware] (morgan)
      ↓
[Auth Middleware] (驗證 Name/Password headers)
      ↓
[Route Handlers] (/heroes, /health)
      ↓
[Controller] (處理業務邏輯)
      ↓
[Service] (串接上游 API)
      ↓
[Error Handler] (統一錯誤處理)
      ↓
Response to Client
```

### 目錄結構

```
src/
├── app.ts                 # Express 應用程式設定
├── server.ts              # 伺服器啟動與優雅關閉
├── controllers/           # controller 層 - 處理 HTTP 請求/回應
│   └── heroController.ts
├── services/              # service 層 - 業務邏輯與外部 API 整合
│   └── heroService.ts
├── middleware/            # 中介層
│   ├── auth.ts           # 身份驗證中介層
│   ├── errorHandler.ts   # 錯誤處理中介層
│   ├── logger.ts         # 請求記錄中介層
│   └── validation.ts     # 輸入驗證中介層
├── routes/               # 路由定義
│   ├── heroes.ts
│   └── health.ts
├── validators/           # 資料驗證 schema
│   └── schemas.ts
├── errors/              # 自定義錯誤類型
│   ├── AxiosError.ts
│   └── ServiceError.ts
├── types/               # TypeScript 型別定義
│   └── index.ts
└── utils/               # 工具函數
    └── response.ts
```

### 核心設計原則

1. **分層架構**: 採用 Controller-Service 模式
2. **中介層模式**: 使用 Express
3. **錯誤處理**: 統一錯誤處理機制
4. **型別安全**: 完整的 TypeScript 型別定義
5. **驗證機制**: 使用 Joi 進行輸入驗證

### API 流程邏輯

1. **請求進入**: 經過安全性中介層 (helmet, cors)
2. **記錄請求**: morgan 記錄所有請求
3. **身份驗證**: 檢查 Header 中的 Name/Password，呼叫上游驗證 API
4. **路由處理**: 根據路徑分發到對應的 controller
5. **業務邏輯**: controller 呼叫 service 層處理業務邏輯
6. **資料取得**: service 層串接上游 API 取得資料
7. **資料組合**: 根據驗證狀態決定回傳資料內容
8. **回應處理**: 統一格式化回應資料

---

## 第三方 Library 功能簡介

### 核心框架

- **express**: Node.js 網頁應用程式框架，提供路由、中介層等功能
- **typescript**: JavaScript 的超集合，提供靜態型別檢查

### HTTP 客戶端

- **axios**: Promise 基礎的 HTTP 客戶端，用於串接上游 API

### 安全性

- **helmet**: 設定安全相關的 HTTP headers
- **cors**: 處理跨來源資源共享 (CORS) 政策

### 資料驗證

- **joi**: 強大的物件 schema 驗證庫，用於驗證 API 輸入

### 環境配置

- **dotenv**: 從 .env 檔案載入環境變數

### 開發工具

- **ts-node-dev**: TypeScript 開發伺服器，支援自動重載
- **morgan**: HTTP 請求記錄中介層

### 程式碼品質

- **eslint**: JavaScript/TypeScript 程式碼檢查工具
- **prettier**: 程式碼格式化工具
- **@typescript-eslint**: ESLint 的 TypeScript 支援

### 測試框架

- **jest**: JavaScript 測試框架
- **supertest**: HTTP 斷言庫，用於測試 Express 應用程式
- **ts-jest**: Jest 的 TypeScript 支援

---

## API 規格

### 未驗證狀態

- `GET /heroes` - 回傳所有英雄基本資料 (id, name, image)
- `GET /heroes/:heroId` - 回傳單一英雄基本資料

### 已驗證狀態 (Header: Name: hahow, Password: rocks)

- `GET /heroes` - 回傳所有英雄資料 + profile (str, int, agi, luk)
- `GET /heroes/:heroId` - 回傳單一英雄資料 + profile

### 健康檢查

- `GET /health` - 伺服器健康狀態檢查

---

## 開發指令

```bash
# 程式碼檢查
npm run lint

# 格式化程式碼
npm run format

# 執行測試
npm test
```

---

## 程式碼註解原則

本專案的註解撰寫遵循以下原則：

### 會寫註解的情況

1. **錯誤處理邏輯**: 當處理複雜的錯誤情境或特殊的錯誤處理機制時

   ```typescript
   // 驗證失敗時不拋出錯誤，只設定為未驗證狀態
   req.isAuthenticated = false;

   // 可以選擇記錄驗證錯誤（僅在開發環境）
   if (process.env.NODE_ENV === 'development') {
     console.warn('Authentication failed:', error.message);
   }
   ```

2. **複雜業務邏輯**: 當邏輯流程較為複雜，需要額外說明時

   ```typescript
   // Process heroes in chunks to avoid overwhelming the upstream API
   const CHUNK_SIZE = 5;
   for (let i = 0; i < heroList.length; i += CHUNK_SIZE) {
     // 分批處理英雄資料以避免對上游 API 造成過大負載
   }
   ```

3. **特殊處理機制**: 當有特別的處理邏輯或邊界條件時
   ```typescript
   // Graceful Shutdown - 優雅關閉伺服器
   process.on('SIGTERM', () => {
     console.log('收到 SIGTERM，正在優雅關閉...');
   });
   ```

### 不會寫註解的情況

1. **語意清楚的變數命名**: 當變數或函數名稱已能清楚表達其用途時

   ```typescript
   const isAuthenticated = checkUserCredentials(name, password);
   const heroesWithProfile = await getHeroesWithProfileData();
   ```

2. **標準的 CRUD 操作**: 一般的資料存取操作

   ```typescript
   const heroes = await getHeroes();
   const hero = await getHeroById(id);
   ```

3. **簡單的條件判斷**: 邏輯簡單明瞭的條件式
   ```typescript
   if (req.isAuthenticated) {
     return heroService.getHeroesWithProfile();
   }
   return heroService.getHeroesNoProfile();
   ```

---

## 開發過程中遇到的困難與解決方法

### 主要困難

#### 1. API 設計重構問題

**問題描述**:
專案初期沒有充分理解需求，原本以為驗證與未驗證狀態需要設計成不同的 API endpoint，後來才發現同一個 API 需要根據驗證狀態回傳不同的資料內容。

**解決方法**:

- 重構 API 架構，統一使用相同的 endpoint
- 在 middleware 層面處理驗證邏輯，將驗證結果存入 `req.isAuthenticated`
- Controller 根據驗證狀態呼叫不同的 service 方法

#### 2. 多 API 串接複雜度

**問題描述**:
每個英雄的完整資料需要串接兩個不同的上游 API：

- `/heroes` - 取得基本資料 (id, name, image)
- `/heroes/:id/profile` - 取得能力值 (str, int, agi, luk)

這導致需要處理大量的並發請求，且容易對上游 API 造成負載壓力。

**解決方法**:

- 實作分批處理機制，避免同時發送過多請求

#### 3. 錯誤處理策略

**問題描述**:
需要處理多種錯誤情境：驗證失敗、上游 API 無回應、部分資料取得失敗等。

**解決方法**:

- 建立統一的錯誤處理中介層

---
