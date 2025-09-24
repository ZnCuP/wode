#!/bin/bash

# 项目快速更新部署脚本
# 使用方法: ./update_deploy.sh

set -e

# 配置变量
SERVER_IP="8.134.236.143"
SERVER_USER="root"
PROJECT_DIR="/var/www/goworldauto"
LOCAL_DIR="/Users/zncup/Documents/wode"

echo "🚀 开始更新部署到阿里云服务器..."

# 1. 打包需要更新的文件（排除不必要的文件）
echo "📦 打包项目文件..."
cd "$LOCAL_DIR"

# 创建临时目录
TEMP_DIR=$(mktemp -d)
echo "临时目录: $TEMP_DIR"

# 复制需要的文件
cp -r assets/ "$TEMP_DIR/"
cp -r pages/ "$TEMP_DIR/"
cp -r scripts/ "$TEMP_DIR/"
cp -r styles/ "$TEMP_DIR/"
cp -r backend/ "$TEMP_DIR/"
cp index.html "$TEMP_DIR/"
cp style.css "$TEMP_DIR/"
cp requirements.txt "$TEMP_DIR/"

# 打包
cd "$TEMP_DIR"
tar -czf update.tar.gz *

echo "✅ 文件打包完成"

# 2. 上传到服务器
echo "📤 上传文件到服务器..."
scp update.tar.gz ${SERVER_USER}@${SERVER_IP}:/tmp/

# 3. 在服务器上执行更新
echo "🔄 在服务器上执行更新..."
ssh ${SERVER_USER}@${SERVER_IP} << 'EOF'
set -e

PROJECT_DIR="/var/www/goworldauto"
echo "停止后端服务..."
systemctl stop goworldauto-backend

echo "备份当前版本..."
if [ -d "${PROJECT_DIR}_backup" ]; then
    rm -rf "${PROJECT_DIR}_backup"
fi
cp -r "$PROJECT_DIR" "${PROJECT_DIR}_backup"

echo "解压新文件..."
cd "$PROJECT_DIR"
tar -xzf /tmp/update.tar.gz

echo "安装Python依赖..."
cd backend
pip3 install -r requirements.txt

echo "重启服务..."
systemctl start goworldauto-backend
systemctl reload nginx

echo "检查服务状态..."
sleep 3
systemctl status goworldauto-backend --no-pager
systemctl status nginx --no-pager

echo "清理临时文件..."
rm -f /tmp/update.tar.gz

echo "✅ 更新完成！"
EOF

# 4. 清理本地临时文件
echo "🧹 清理临时文件..."
rm -rf "$TEMP_DIR"

echo "🎉 项目更新部署完成！"
echo "🌐 请访问 http://goworldauto.com 检查更新是否生效"

# 5. 检查服务状态
echo "📊 检查服务状态..."
ssh ${SERVER_USER}@${SERVER_IP} << 'EOF'
echo "=== 后端服务状态 ==="
systemctl is-active goworldauto-backend
echo "=== Nginx状态 ==="
systemctl is-active nginx
echo "=== 最近的后端日志 ==="
journalctl -u goworldauto-backend --no-pager -n 5
EOF

echo "✨ 更新部署流程完成！"