# 專案架構與技術選型

## 整體架構

```
[Client] → [Auth Middleware] → [Hero Service] → [Hahow API]
                ↓
        [Response Handler] → [Client]
```

## 技術棧

- **Runtime**: Node.js 18+
- **Language**: TypeScript
- **Framework**: Express.js
- **HTTP Client**: axios
- **Testing**: Jest + Supertest
- **Package Manager**: npm

## 專案結構

```
hahow-homework/
├── src/
│   ├── controllers/          # 路由控制器
│   │   ├── heroes.controller.ts
│   │   └── types.ts
│   ├── services/            # 業務邏輯層
│   │   ├── hero.service.ts
│   │   ├── auth.service.ts
│   │   └── external-api.service.ts
│   ├── middleware/          # 中介軟體
│   │   ├── auth.middleware.ts
│   │   └── error.middleware.ts
│   ├── utils/              # 工具函式
│   │   ├── http-client.ts
│   │   └── constants.ts
│   ├── types/              # TypeScript 型別
│   │   ├── hero.types.ts
│   │   └── api.types.ts
│   ├── routes/             # 路由定義
│   │   └── heroes.routes.ts
│   ├── config/             # 環境配置
│   │   └── index.ts
│   └── app.ts              # 應用程式進入點
├── tests/                  # 測試檔案
├── docs/                   # 文件
├── package.json
├── tsconfig.json
├── jest.config.js
├── Dockerfile
└── .env.example
```

## 核心功能模組

### Authentication Module

- Header 驗證 (`Name: hahow`, `Password: rocks`)
- 上游 API 身份確認

### Hero Service Module

- 英雄資料取得與整合
- 基本資料與能力值合併

### API Response Module

- 根據驗證狀態回傳對應資料
- 統一錯誤處理

## 資料流向

### 未驗證請求

```
Client → Heroes Controller → Hero Service → Hahow API
基本資料 (id, name, image) ← ← ← ←
```

### 已驗證請求

```
Client → Auth Middleware → Heroes Controller → Hero Service → Hahow API
完整資料 (基本 + profile) ← ← ← ← ←
```

## 環境變數

```env
PORT=3000
HAHOW_API_BASE_URL=https://hahow-recruit.herokuapp.com
NODE_ENV=development
REQUEST_TIMEOUT=10000
```
