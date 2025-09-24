#!/bin/bash

# 服务器管理脚本
# 使用方法: ./server_manage.sh [action]
# 可用操作: status, restart, logs, stop, start

set -e

# 配置变量
SERVER_IP="8.134.236.143"
SERVER_USER="root"

# 获取操作参数
ACTION="${1:-status}"

echo "🔧 执行服务器管理操作: $ACTION"

case $ACTION in
    "status")
        echo "📊 检查服务状态..."
        ssh ${SERVER_USER}@${SERVER_IP} << 'EOF'
echo "=== 系统信息 ==="
uptime
echo ""
echo "=== 磁盘使用情况 ==="
df -h /
echo ""
echo "=== 内存使用情况 ==="
free -h
echo ""
echo "=== 后端服务状态 ==="
systemctl status goworldauto-backend --no-pager
echo ""
echo "=== Nginx状态 ==="
systemctl status nginx --no-pager
echo ""
echo "=== 端口监听情况 ==="
netstat -tlnp | grep -E ':(80|8001)'
EOF
        ;;
    
    "restart")
        echo "🔄 重启所有服务..."
        ssh ${SERVER_USER}@${SERVER_IP} << 'EOF'
echo "重启后端服务..."
systemctl restart goworldauto-backend
echo "重启Nginx..."
systemctl restart nginx
echo "等待服务启动..."
sleep 3
echo "检查服务状态..."
systemctl is-active goworldauto-backend && echo "✅ 后端服务正常" || echo "❌ 后端服务异常"
systemctl is-active nginx && echo "✅ Nginx服务正常" || echo "❌ Nginx服务异常"
EOF
        ;;
    
    "logs")
        echo "📋 查看服务日志..."
        ssh ${SERVER_USER}@${SERVER_IP} << 'EOF'
echo "=== 后端服务日志 (最近20行) ==="
journalctl -u goworldauto-backend --no-pager -n 20
echo ""
echo "=== Nginx错误日志 (最近10行) ==="
tail -n 10 /var/log/nginx/error.log 2>/dev/null || echo "无错误日志"
echo ""
echo "=== Nginx访问日志 (最近5行) ==="
tail -n 5 /var/log/nginx/access.log 2>/dev/null || echo "无访问日志"
EOF
        ;;
    
    "stop")
        echo "⏹️ 停止所有服务..."
        ssh ${SERVER_USER}@${SERVER_IP} << 'EOF'
systemctl stop goworldauto-backend
systemctl stop nginx
echo "✅ 所有服务已停止"
EOF
        ;;
    
    "start")
        echo "▶️ 启动所有服务..."
        ssh ${SERVER_USER}@${SERVER_IP} << 'EOF'
systemctl start goworldauto-backend
systemctl start nginx
sleep 3
systemctl is-active goworldauto-backend && echo "✅ 后端服务已启动" || echo "❌ 后端服务启动失败"
systemctl is-active nginx && echo "✅ Nginx服务已启动" || echo "❌ Nginx服务启动失败"
EOF
        ;;
    
    "backup")
        echo "💾 创建项目备份..."
        ssh ${SERVER_USER}@${SERVER_IP} << 'EOF'
BACKUP_DIR="/var/backups/goworldauto"
PROJECT_DIR="/var/www/goworldauto"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

mkdir -p "$BACKUP_DIR"
tar -czf "$BACKUP_DIR/backup_$TIMESTAMP.tar.gz" -C /var/www goworldauto
echo "✅ 备份已创建: $BACKUP_DIR/backup_$TIMESTAMP.tar.gz"

# 只保留最近5个备份
cd "$BACKUP_DIR"
ls -t backup_*.tar.gz | tail -n +6 | xargs -r rm
echo "📁 备份清理完成，保留最近5个备份"
EOF
        ;;
    
    *)
        echo "❌ 未知操作: $ACTION"
        echo "可用操作:"
        echo "  status  - 查看服务状态"
        echo "  restart - 重启所有服务"
        echo "  logs    - 查看服务日志"
        echo "  stop    - 停止所有服务"
        echo "  start   - 启动所有服务"
        echo "  backup  - 创建项目备份"
        echo ""
        echo "使用方法: ./server_manage.sh [action]"
        exit 1
        ;;
esac

echo "✨ 操作完成！"