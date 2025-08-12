# Hahow Backend Engineer 小專案

本專案為 Hahow Backend Engineer 徵才測驗，使用 Node.js + TypeScript 實作 API server，串接 Hahow 提供的上游 API，依驗證狀態回傳不同的資料內容。

---

## 專案功能

### 未驗證 API

- **GET /heroes**：回傳所有英雄基本資料（`id`, `name`, `image`）
- **GET /heroes/:heroId**：回傳單一英雄基本資料

### 已驗證 API

- **GET /heroes**（帶 `Name` 與 `Password` header 並驗證成功）：回傳所有英雄資料 + `profile`
- **GET /heroes/:heroId**（帶 `Name` 與 `Password` header 並驗證成功）：回傳單一英雄資料 + `profile`

---

## 文件索引

本專案詳細文件放在 [docs/](docs/) 資料夾中：

- [API 規格](docs/API_SPEC.md)
- [系統架構](docs/ARCHITECTURE.md)
- [邊界條件處理](docs/EDGE_CASES.md)
- [開發指南](docs/DEVELOPMENT_GUIDE.md)
- [Commit 規範](docs/COMMIT_CONVENTION.md)
- [問題排查](docs/TROUBLESHOOTING.md)

---

## 安裝與啟動

### 本機開發

```bash
npm install
npm run dev
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
