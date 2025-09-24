# 阿里云服务器部署指南

## 服务器信息
- **IP地址**: 8.134.236.143
- **域名**: goworldauto.com
- **操作系统**: CentOS/RHEL

## 部署步骤

### 1. 连接到服务器
```bash
ssh root@8.134.236.143
```

### 2. 运行基础环境配置脚本
将 `deploy_server.sh` 上传到服务器并执行：
```bash
chmod +x deploy_server.sh
./deploy_server.sh
```

### 3. 上传项目文件
在本地执行以下命令上传项目：
```bash
# 压缩项目文件（排除不必要的文件）
tar -czf goworldauto.tar.gz \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='__pycache__' \
  --exclude='*.pyc' \
  --exclude='.env' \
  .

# 上传到服务器
scp goworldauto.tar.gz root@8.134.236.143:/var/www/

# 在服务器上解压
ssh root@8.134.236.143 "cd /var/www && tar -xzf goworldauto.tar.gz && mv wode/* goworldauto/ && rm -rf wode goworldauto.tar.gz"
```

### 4. 配置后端环境
在服务器上执行：
```bash
cd /var/www/goworldauto/backend

# 安装Python依赖
pip3 install -r ../requirements.txt

# 创建环境变量文件
cat > .env << EOF
DATABASE_URL=postgresql://goworlduser:your_secure_password@localhost/goworldauto
SECRET_KEY=your_secret_key_here
DEBUG=False
EOF

# 初始化数据库
python3 -c "
from database import engine, Base
from models import *
Base.metadata.create_all(bind=engine)
print('数据库表创建完成')
"

# 导入测试数据（可选）
python3 add_test_news.py
```

### 5. 配置Nginx
```bash
# 复制Nginx配置文件
cp /var/www/goworldauto/nginx_goworldauto.conf /etc/nginx/conf.d/

# 测试配置
nginx -t

# 启动Nginx
systemctl enable nginx
systemctl start nginx
```

### 6. 配置后端服务
```bash
# 复制服务文件
cp /var/www/goworldauto/goworldauto-backend.service /etc/systemd/system/

# 重新加载systemd
systemctl daemon-reload

# 启动后端服务
systemctl enable goworldauto-backend
systemctl start goworldauto-backend

# 检查服务状态
systemctl status goworldauto-backend
```

### 7. 配置Cloudflare DNS解析
在Cloudflare控制台中添加以下DNS记录：
- **类型**: A
- **名称**: @（或 goworldauto.com）
- **IPv4地址**: 8.134.236.143
- **代理状态**: 可选择开启（橙色云朵）以获得CDN加速和DDoS防护

同时添加www子域名：
- **类型**: A
- **名称**: www
- **IPv4地址**: 8.134.236.143
- **代理状态**: 可选择开启（橙色云朵）

### 8. 验证部署
等待DNS解析生效（通常5-30分钟），然后访问：
- http://goworldauto.com
- http://www.goworldauto.com

## 常用管理命令

### 查看服务状态
```bash
# 查看后端服务状态
systemctl status goworldauto-backend

# 查看Nginx状态
systemctl status nginx

# 查看服务日志
journalctl -u goworldauto-backend -f
```

### 重启服务
```bash
# 重启后端
systemctl restart goworldauto-backend

# 重启Nginx
systemctl restart nginx
```

### 更新代码
```bash
cd /var/www/goworldauto
git pull  # 如果使用git
# 或重新上传文件

# 重启后端服务
systemctl restart goworldauto-backend
```

## 安全建议

1. **修改默认密码**: 确保修改数据库密码和其他默认密码
2. **配置防火墙**: 只开放必要的端口（80, 443, 22）
3. **SSL证书**: 建议配置HTTPS（可使用Let's Encrypt免费证书）
4. **定期备份**: 设置数据库和文件的定期备份

## 故障排除

### 常见问题
1. **502 Bad Gateway**: 检查后端服务是否正常运行
2. **数据库连接失败**: 检查PostgreSQL服务和连接配置
3. **静态文件404**: 检查文件路径和Nginx配置

### 日志位置
- Nginx日志: `/var/log/nginx/`
- 后端日志: `journalctl -u goworldauto-backend`
- 系统日志: `/var/log/messages`