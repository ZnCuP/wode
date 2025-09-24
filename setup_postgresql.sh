#!/bin/bash

# Go-World Auto Spare Parts PostgreSQL 安装脚本
# 适用于 Ubuntu/Debian 系统

echo "开始安装 PostgreSQL..."

# 更新系统包
sudo apt update

# 安装 PostgreSQL 和相关工具
sudo apt install -y postgresql postgresql-contrib

# 启动 PostgreSQL 服务
sudo systemctl start postgresql
sudo systemctl enable postgresql

echo "PostgreSQL 安装完成！"

# 设置 PostgreSQL 用户密码
echo "设置 PostgreSQL 用户..."
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'your_password_here';"

# 创建数据库
echo "创建数据库..."
sudo -u postgres createdb goworld_auto_parts

# 创建应用用户
echo "创建应用用户..."
sudo -u postgres psql -c "CREATE USER goworld_user WITH PASSWORD 'goworld_password_123';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE goworld_auto_parts TO goworld_user;"

# 配置 PostgreSQL 允许远程连接（可选）
echo "配置 PostgreSQL..."

# 备份原配置文件
sudo cp /etc/postgresql/*/main/postgresql.conf /etc/postgresql/*/main/postgresql.conf.backup
sudo cp /etc/postgresql/*/main/pg_hba.conf /etc/postgresql/*/main/pg_hba.conf.backup

# 修改配置以允许远程连接（请根据安全需求调整）
echo "listen_addresses = '*'" | sudo tee -a /etc/postgresql/*/main/postgresql.conf
echo "host    all             all             0.0.0.0/0               md5" | sudo tee -a /etc/postgresql/*/main/pg_hba.conf

# 重启 PostgreSQL 服务
sudo systemctl restart postgresql

echo "PostgreSQL 配置完成！"
echo "数据库名称: goworld_auto_parts"
echo "用户名: goworld_user"
echo "密码: goworld_password_123"
echo ""
echo "下一步："
echo "1. 运行数据库表创建脚本: psql -U goworld_user -d goworld_auto_parts -f database_schema.sql"
echo "2. 检查防火墙设置，确保端口 5432 开放（如需远程连接）"
echo "3. 建议修改默认密码以提高安全性"

# 显示 PostgreSQL 状态
sudo systemctl status postgresql --no-pager