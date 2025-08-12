# Hahow Backend Engineer 小專案

本專案為 Hahow Backend Engineer 徵才測驗，使用 Node.js + TypeScript 實作 API server，串接 Hahow 提供的上游 API，依驗證狀態回傳不同的資料內容。

---

## 專案功能

### 未驗證 API

- **GET /heroes**：回傳所有英雄基本資料（`id`, `name`, `image`）
- **GET /heroes/:heroId**：回傳單一英雄基本資料

### 已驗證 API

驗證方式：在 HTTP header 中帶入 `Name: hahow` 與 `Password: rocks`

- **GET /heroes**：回傳所有英雄資料 + `profile`（str, int, agi, luk）
- **GET /heroes/:heroId**：回傳單一英雄資料 + `profile`（str, int, agi, luk）

---

## 技術架構

- **框架**: Node.js + Express.js + TypeScript
- **驗證中介層**: 檢查 HTTP header 中的 Name/Password
- **英雄服務**: 串接上游 API 取得英雄資料與能力值
- **回應處理**: 根據驗證狀態組合回傳資料
- **輸入驗證**: 使用 Joi 進行資料驗證
- **安全性**: 使用 helmet 與 CORS 中介層

---

## 安裝與啟動

### 本機開發

```bash
# 安裝依賴套件
npm install

# 開發模式啟動（自動重載）
npm run dev

# 服務將在 http://localhost:3000 啟動
```

### 生產環境部署

```bash
# 建置專案
npm run build

# 啟動服務
npm start
```

### Docker 部署

```bash
# 建置 Docker image
docker build -t hahow-api .

# 執行容器
docker run -p 3000:3000 hahow-api

# 或使用環境變數
docker run -p 3000:3000 -e PORT=3000 -e NODE_ENV=production hahow-api
```

---

## 開發指令

```bash
# 程式碼檢查
npm run lint

# 修正程式碼格式
npm run lint:fix

# 型別檢查
npm run type-check

# 格式化程式碼
npm run format

# 檢查格式化
npm run format:check

# 執行測試
npm test
```

---

## API 測試範例

### 未驗證狀態

```bash
# 取得所有英雄基本資料
curl http://localhost:3000/heroes

# 取得單一英雄基本資料
curl http://localhost:3000/heroes/1
```

### 已驗證狀態

```bash
# 取得所有英雄完整資料（含 profile）
curl -H "Name: hahow" -H "Password: rocks" http://localhost:3000/heroes

# 取得單一英雄完整資料（含 profile）
curl -H "Name: hahow" -H "Password: rocks" http://localhost:3000/heroes/1
```

---

## 上游 API 資源

- `https://hahow-recruit.herokuapp.com/heroes` - 英雄列表
- `https://hahow-recruit.herokuapp.com/heroes/:heroId` - 單一英雄基本資料
- `https://hahow-recruit.herokuapp.com/heroes/:heroId/profile` - 英雄能力值資料
- `https://hahow-recruit.herokuapp.com/auth` - 驗證端點
