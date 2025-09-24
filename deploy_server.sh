#!/bin/bash

# 阿里云服务器部署脚本
# 服务器IP: 8.134.236.143
# 域名: goworldauto.com

echo "开始部署 Go-World Auto 项目到阿里云服务器..."

# 1. 更新系统包
echo "更新系统包..."
yum update -y

# 2. 安装必要的软件
echo "安装必要软件..."
yum install -y git wget curl vim nginx

# 3. 安装Python 3.9+
echo "安装Python..."
yum install -y python3 python3-pip python3-devel

# 4. 安装PostgreSQL
echo "安装PostgreSQL..."
yum install -y postgresql postgresql-server postgresql-contrib

# 初始化PostgreSQL
postgresql-setup initdb
systemctl enable postgresql
systemctl start postgresql

# 5. 创建项目目录
echo "创建项目目录..."
mkdir -p /var/www/goworldauto
cd /var/www/goworldauto

# 6. 设置PostgreSQL数据库
echo "配置数据库..."
sudo -u postgres psql << EOF
CREATE DATABASE goworldauto;
CREATE USER goworlduser WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE goworldauto TO goworlduser;
\q
EOF

# 7. 配置防火墙
echo "配置防火墙..."
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --permanent --add-port=8001/tcp
firewall-cmd --reload

echo "服务器基础环境配置完成！"
echo "接下来需要上传项目文件并配置应用..."