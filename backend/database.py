"""
数据库连接配置
"""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# 🚀 最终的配置加载逻辑：
# 1. 如果存在 .env.local (本地开发)，加载它并强制覆盖 (解决 Uvicorn 重载问题)。
if os.path.exists('.env.local'):
    # 强制覆盖：解决 Uvicorn 子进程环境变量污染的关键
    load_dotenv('.env.local', override=True) 
    
# 2. 如果不存在 .env.local (服务器或本地通用配置)，尝试加载 .env。
elif os.path.exists('.env'):
    # 服务器/通用环境：不强制覆盖，系统环境变量优先
    load_dotenv('.env')


# 数据库连接配置
# os.getenv() 会从环境变量或加载的文件中获取值。
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://goworld:Wode0809@8.134.236.143:5432/goworld_auto_parts"
)

# 调试检查（本地开发时保留，部署前建议删除）
print(f"DEBUG_DB_URL: {DATABASE_URL}")

# 创建数据库引擎，添加连接池和超时设置
engine = create_engine(
    DATABASE_URL,
    pool_size=5,
    max_overflow=10,
    pool_timeout=30,
    pool_recycle=3600,
    connect_args={
        "connect_timeout": 10,
        "application_name": "goworld_api"
    }
)

# 创建会话工厂
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 创建基础模型类
Base = declarative_base()

# 数据库依赖
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()