#!/bin/bash

# Go-World Auto 一键部署脚本
# 使用方法: ./quick_deploy.sh

SERVER_IP="8.134.236.143"
DOMAIN="goworldauto.com"
PROJECT_NAME="goworldauto"

echo "🚀 开始部署 Go-World Auto 项目到阿里云服务器..."
echo "服务器IP: $SERVER_IP"
echo "域名: $DOMAIN"

# 1. 打包项目文件
echo "📦 打包项目文件..."
tar -czf ${PROJECT_NAME}.tar.gz \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='__pycache__' \
  --exclude='*.pyc' \
  --exclude='.env' \
  --exclude='*.tar.gz' \
  .

echo "✅ 项目文件打包完成"

# 2. 上传文件到服务器
echo "📤 上传文件到服务器..."
scp ${PROJECT_NAME}.tar.gz root@${SERVER_IP}:/tmp/

# 3. 在服务器上执行部署
echo "🔧 在服务器上执行部署..."
ssh root@${SERVER_IP} << 'ENDSSH'

# 设置变量
PROJECT_NAME="goworldauto"
PROJECT_DIR="/var/www/${PROJECT_NAME}"

echo "更新系统包..."
yum update -y

echo "安装必要软件..."
yum install -y git wget curl vim nginx python3 python3-pip postgresql postgresql-server postgresql-contrib

echo "创建项目目录..."
mkdir -p ${PROJECT_DIR}
cd ${PROJECT_DIR}

echo "解压项目文件..."
tar -xzf /tmp/${PROJECT_NAME}.tar.gz -C ${PROJECT_DIR} --strip-components=1
rm /tmp/${PROJECT_NAME}.tar.gz

echo "安装Python依赖..."
cd ${PROJECT_DIR}
pip3 install fastapi uvicorn sqlalchemy psycopg2-binary python-multipart

echo "初始化PostgreSQL..."
if [ ! -f /var/lib/pgsql/data/postgresql.conf ]; then
    postgresql-setup initdb
fi
systemctl enable postgresql
systemctl start postgresql

echo "配置后端环境..."
cd ${PROJECT_DIR}/backend
cat > .env << EOF
DATABASE_URL=postgresql://goworld:Wode0809@localhost/goworld_auto_parts
SECRET_KEY=your_secret_key_here_change_in_production
DEBUG=False
EOF

echo "数据库配置完成，使用现有数据库 goworld_auto_parts..."

echo "配置Nginx..."
cat > /etc/nginx/conf.d/${PROJECT_NAME}.conf << 'EOF'
server {
    listen 80;
    server_name goworldauto.com www.goworldauto.com;
    
    root /var/www/goworldauto;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
        
        location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
    
    location /api/ {
        proxy_pass http://127.0.0.1:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS";
        add_header Access-Control-Allow-Headers "Content-Type, Authorization";
        
        if ($request_method = 'OPTIONS') {
            return 204;
        }
    }
    
    error_page 404 /index.html;
    access_log /var/log/nginx/goworldauto_access.log;
    error_log /var/log/nginx/goworldauto_error.log;
}
EOF

echo "配置后端服务..."
cat > /etc/systemd/system/${PROJECT_NAME}-backend.service << EOF
[Unit]
Description=Go-World Auto Backend API
After=network.target postgresql.service

[Service]
Type=simple
User=root
WorkingDirectory=${PROJECT_DIR}/backend
Environment=PATH=/usr/bin:/usr/local/bin
ExecStart=/usr/bin/python3 -m uvicorn main:app --host 0.0.0.0 --port 8001
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF

echo "启动服务..."
systemctl daemon-reload
systemctl enable ${PROJECT_NAME}-backend
systemctl start ${PROJECT_NAME}-backend

nginx -t
systemctl enable nginx
systemctl restart nginx

echo "配置防火墙..."
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --permanent --add-port=8001/tcp
firewall-cmd --reload

echo "检查服务状态..."
systemctl status ${PROJECT_NAME}-backend --no-pager
systemctl status nginx --no-pager

echo "🎉 部署完成！"
echo "请在域名管理面板中将 goworldauto.com 解析到 $(curl -s ifconfig.me)"
echo "然后访问: http://goworldauto.com"

ENDSSH

# 4. 清理本地临时文件
rm ${PROJECT_NAME}.tar.gz

echo "🎉 部署脚本执行完成！"
echo ""
echo "📋 接下来的步骤："
echo "1. 在域名管理面板中添加DNS解析："
echo "   - 类型: A记录"
echo "   - 主机记录: @"
echo "   - 记录值: $SERVER_IP"
echo "   - TTL: 600"
echo ""
echo "2. 等待DNS解析生效（5-30分钟）"
echo "3. 访问 http://$DOMAIN 测试网站"
echo ""
echo "🔧 管理命令："
echo "ssh root@$SERVER_IP 'systemctl status goworldauto-backend'"
echo "ssh root@$SERVER_IP 'systemctl restart goworldauto-backend'"