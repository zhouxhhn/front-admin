# 后台开发文档

## 安装

> 依赖 >=NodeJs 8 与 >=npm 5 环境

### 开发环境构建项目：

由于CORS限制，统一使用 ngnix 做API 转发，配置 ngnix 开发环境。

```
server {
    listen  80;
    server_name  local.admin.sipin.latest.dev.e.sipin.one;
    root  [项目路径]/dist;

    location /sockjs-node/ {
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_pass http://localhost:3333/sockjs-node/;
    }
    location /api/ {
        proxy_pass http://admin.sipin.latest.dev.e.sipin.one/api/;
    }

  }
```

- 安装依赖
> 使用 `yarn` 管理依赖

```

$ npm install -g yarn

```

- 启动项目

```

$ npm start

```

### 生产环境构建项目:

```
$ yarn
$ export API_HOST=/api && npm run build

```
