#!/bin/bash

# Go-World Auto Spare Parts 后端启动脚本

echo "启动 Go-World Auto Spare Parts 后端服务..."

# 检查是否在虚拟环境中
if [[ "$VIRTUAL_ENV" == "" ]]; then
    echo "建议在虚拟环境中运行。创建虚拟环境："
    echo "python3 -m venv venv"
    echo "source venv/bin/activate"
    echo ""
fi

# 检查是否存在 .env 文件
if [ ! -f .env ]; then
    echo "创建 .env 文件..."
    cp .env.example .env
    echo "请编辑 .env 文件，配置数据库连接信息"
fi

# 安装依赖
echo "安装 Python 依赖..."
pip install -r requirements.txt

# 检查数据库连接
echo "检查数据库连接..."
cd backend
python -c "
try:
    from database import engine
    from sqlalchemy import text
    with engine.connect() as conn:
        result = conn.execute(text('SELECT 1'))
        print('数据库连接成功！')
except Exception as e:
    print(f'数据库连接失败: {e}')
    print('请确保：')
    print('1. PostgreSQL 服务正在运行')
    print('2. 数据库和用户已创建')
    print('3. .env 文件中的数据库配置正确')
    exit(1)
"

# 创建数据库表
echo "创建数据库表..."
python -c "
from models import Base
from database import engine
Base.metadata.create_all(bind=engine)
print('数据库表创建完成！')
"

# 启动服务
echo "启动 FastAPI 服务..."
echo "API 文档地址: http://localhost:8001/docs"
echo "API 地址: http://localhost:8001/api"
echo ""

uvicorn main:app --host 0.0.0.0 --port 8001 --reload