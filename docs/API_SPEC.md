# API 規格文件

## 系統架構

```
[Client] → [Auth Middleware] → [Hero Service] → [Upstream API]
                ↓
        [Response Handler] → [Client]
```

### 核心組件

- **Authentication Middleware**: Header 驗證處理
- **Hero Service**: 上游 API 資料整合
- **Response Handler**: 根據驗證狀態組合回應

## API 端點規格

### 認證機制

- Header: `Name: hahow`, `Password: rocks`
- 未驗證: 回傳基本資料 (id, name, image)
- 已驗證: 回傳基本資料 + profile

### 端點列表

| Method | Path              | 未驗證回應      | 已驗證回應         |
| ------ | ----------------- | --------------- | ------------------ |
| GET    | `/heroes`         | 英雄列表 (基本) | 英雄列表 + profile |
| GET    | `/heroes/:heroId` | 單一英雄 (基本) | 單一英雄 + profile |

### HTTP 狀態碼

- `200` - 成功
- `400` - 請求參數錯誤
- `401` - 認證失敗
- `404` - 英雄不存在
- `500` - 伺服器錯誤

## 上游 API 依賴

| 端點                          | 用途       |
| ----------------------------- | ---------- |
| `GET /heroes`                 | 英雄列表   |
| `GET /heroes/:heroId`         | 單一英雄   |
| `GET /heroes/:heroId/profile` | 英雄能力值 |
| `POST /auth`                  | 身份驗證   |

Base URL: `https://hahow-recruit.herokuapp.com`
