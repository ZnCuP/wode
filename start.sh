#!/bin/bash

# Go-World Auto Spare Parts 快速启动脚本

echo "🚀 启动 Go-World Auto Spare Parts 整合服务..."
echo "📍 前端页面: http://localhost:8001/"
echo "🔧 API文档: http://localhost:8001/docs"
echo "📊 API根路径: http://localhost:8001/api"
echo "按 Ctrl+C 停止服务"
echo "=" * 50

# 启动Python统一服务器
python3 start_app.py