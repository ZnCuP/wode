#!/bin/bash

# Git自动部署脚本
# 使用方法: ./git_deploy.sh [commit_message]

set -e

# 配置变量
SERVER_IP="8.134.236.143"
SERVER_USER="root"
PROJECT_DIR="/var/www/goworldauto"
GIT_REPO="https://github.com/yourusername/goworldauto.git"  # 请替换为您的Git仓库地址

# 获取提交信息
COMMIT_MSG="${1:-自动部署更新 $(date '+%Y-%m-%d %H:%M:%S')}"

echo "🚀 开始Git自动部署流程..."

# 1. 本地Git操作
echo "📝 提交本地更改..."
git add .
git status

read -p "确认要提交这些更改吗？(y/N): " confirm
if [[ $confirm != [yY] ]]; then
    echo "❌ 部署已取消"
    exit 1
fi

git commit -m "$COMMIT_MSG" || echo "没有新的更改需要提交"
git push origin main

echo "✅ 代码已推送到Git仓库"

# 2. 服务器端自动拉取和部署
echo "🔄 在服务器上执行自动部署..."
ssh ${SERVER_USER}@${SERVER_IP} << EOF
set -e

PROJECT_DIR="$PROJECT_DIR"

echo "停止后端服务..."
systemctl stop goworldauto-backend

echo "备份当前版本..."
if [ -d "\${PROJECT_DIR}_backup" ]; then
    rm -rf "\${PROJECT_DIR}_backup"
fi
cp -r "\$PROJECT_DIR" "\${PROJECT_DIR}_backup"

echo "拉取最新代码..."
cd "\$PROJECT_DIR"

# 如果是第一次部署，需要先克隆仓库
if [ ! -d ".git" ]; then
    echo "初始化Git仓库..."
    cd /var/www
    rm -rf goworldauto
    git clone $GIT_REPO goworldauto
    cd goworldauto
else
    # 拉取最新更改
    git fetch origin
    git reset --hard origin/main
fi

echo "安装/更新Python依赖..."
cd backend
pip3 install -r requirements.txt

echo "重启服务..."
systemctl start goworldauto-backend
systemctl reload nginx

echo "检查服务状态..."
sleep 3
if systemctl is-active --quiet goworldauto-backend; then
    echo "✅ 后端服务运行正常"
else
    echo "❌ 后端服务启动失败"
    systemctl status goworldauto-backend --no-pager
    exit 1
fi

if systemctl is-active --quiet nginx; then
    echo "✅ Nginx服务运行正常"
else
    echo "❌ Nginx服务异常"
    systemctl status nginx --no-pager
fi

echo "🎉 Git自动部署完成！"
EOF

echo "🌐 请访问 http://goworldauto.com 检查更新是否生效"

# 3. 显示部署信息
echo ""
echo "📊 部署信息:"
echo "提交信息: $COMMIT_MSG"
echo "部署时间: $(date '+%Y-%m-%d %H:%M:%S')"
echo "Git提交: $(git rev-parse --short HEAD)"

echo "✨ Git自动部署流程完成！"