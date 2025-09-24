# Go-World Auto Spare Parts 部署指南

## 系统要求

- **服务器配置**: 2核4G（你的配置完全够用）
- **操作系统**: Ubuntu 20.04+ / CentOS 7+
- **Python**: 3.8+
- **PostgreSQL**: 12+

## 第一步：在阿里云服务器上安装 PostgreSQL

### 1. 连接到你的阿里云服务器
```bash
ssh root@your-server-ip
```

### 2. 上传并运行安装脚本
```bash
# 上传 setup_postgresql.sh 到服务器
chmod +x setup_postgresql.sh
./setup_postgresql.sh
```

### 3. 创建数据库表
```bash
# 上传 database_schema.sql 到服务器
psql -U goworld_user -d goworld_auto_parts -f database_schema.sql
```

## 第二步：部署后端 API

### 1. 创建项目目录
```bash
mkdir -p /var/www/goworld
cd /var/www/goworld
```

### 2. 上传后端文件
上传以下文件到服务器：
- `backend/` 目录下的所有文件
- `requirements.txt`
- `.env.example`

### 3. 配置环境
```bash
# 创建虚拟环境
python3 -m venv venv
source venv/bin/activate

# 复制环境配置
cp .env.example .env
# 编辑 .env 文件，修改数据库连接信息
nano .env
```

### 4. 安装依赖并启动
```bash
pip install -r requirements.txt
cd backend
uvicorn main:app --host 0.0.0.0 --port 8001
```

## 第三步：配置 Nginx（推荐）

### 1. 安装 Nginx
```bash
sudo apt update
sudo apt install nginx
```

### 2. 配置 Nginx
创建配置文件 `/etc/nginx/sites-available/goworld`:

```nginx
server {
    listen 80;
    server_name your-domain.com;  # 替换为你的域名

    # 静态文件
    location /assets/ {
        alias /var/www/goworld/assets/;
        expires 30d;
    }

    # API 请求
    location /api/ {
        proxy_pass http://127.0.0.1:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # 前端页面
    location / {
        root /var/www/goworld;
        try_files $uri $uri/ /index.html;
    }
}
```

### 3. 启用配置
```bash
sudo ln -s /etc/nginx/sites-available/goworld /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 第四步：配置进程管理（使用 systemd）

创建服务文件 `/etc/systemd/system/goworld-api.service`:

```ini
[Unit]
Description=Go-World Auto Spare Parts API
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/goworld/backend
Environment=PATH=/var/www/goworld/venv/bin
ExecStart=/var/www/goworld/venv/bin/uvicorn main:app --host 127.0.0.1 --port 8001
Restart=always

[Install]
WantedBy=multi-user.target
```

启用服务：
```bash
sudo systemctl daemon-reload
sudo systemctl enable goworld-api
sudo systemctl start goworld-api
```

## 第五步：安全配置

### 1. 配置防火墙
```bash
# 允许 HTTP 和 HTTPS
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 22  # SSH

# 限制数据库端口访问（仅本地）
sudo ufw deny 5432
```

### 2. 修改默认密码
```bash
# 修改数据库密码
sudo -u postgres psql
ALTER USER goworld_user PASSWORD 'your-new-strong-password';
\q

# 更新 .env 文件中的密码
```

## 测试部署

### 1. 检查服务状态
```bash
# 检查 PostgreSQL
sudo systemctl status postgresql

# 检查 API 服务
sudo systemctl status goworld-api

# 检查 Nginx
sudo systemctl status nginx
```

### 2. 测试 API
```bash
# 测试健康检查
curl http://your-server-ip/api/health

# 测试产品 API
curl http://your-server-ip/api/products
```

## 性能优化建议

### 1. 数据库优化
- 定期执行 `VACUUM` 和 `ANALYZE`
- 监控慢查询日志
- 根据需要调整 PostgreSQL 配置

### 2. 应用优化
- 启用 Gzip 压缩
- 配置静态文件缓存
- 使用 Redis 缓存热点数据（可选）

### 3. 监控
- 设置日志轮转
- 监控服务器资源使用情况
- 配置告警通知

## 常见问题

### Q: 数据库连接失败
A: 检查 PostgreSQL 服务状态和 .env 配置

### Q: API 无法访问
A: 检查防火墙设置和服务状态

### Q: 静态文件 404
A: 检查 Nginx 配置和文件路径

## 下一步

1. 配置 SSL 证书（Let's Encrypt）
2. 设置自动备份
3. 配置监控和日志
4. 优化数据库性能