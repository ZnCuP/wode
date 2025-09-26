#!/usr/bin/env python3
"""
Go-World Auto Spare Parts 统一启动脚本
整合前后端服务，单端口运行
"""

import os
import sys
import subprocess
from pathlib import Path

def check_requirements():
    """检查必要的依赖"""
    try:
        import uvicorn
        import fastapi
        import sqlalchemy
        print("✓ 所有必要依赖已安装")
        return True
    except ImportError as e:
        print(f"✗ 缺少依赖: {e}")
        print("请运行: pip install -r requirements.txt")
        return False

def check_env_file():
    """检查环境配置文件"""
    env_file = Path(".env")
    env_example = Path(".env.example")
    
    if not env_file.exists():
        if env_example.exists():
            print("⚠ 未找到 .env 文件，正在从 .env.example 创建...")
            import shutil
            shutil.copy(env_example, env_file)
            print("✓ .env 文件已创建，请根据需要修改配置")
        else:
            print("✗ 未找到 .env 或 .env.example 文件")
            return False
    else:
        print("✓ .env 文件存在")
    
    return True

def start_server(host="0.0.0.0", port=8001, reload=True):
    """启动整合服务器"""
    print(f"\n🚀 启动 Go-World Auto Spare Parts 服务...")
    print(f"📍 服务地址: http://{host}:{port}")
    print(f"📱 前端页面: http://{host}:{port}/")
    print(f"🔧 API文档: http://{host}:{port}/docs")
    print(f"📊 API根路径: http://{host}:{port}/api")
    print("=" * 50)
    
    # 启动 uvicorn 服务器
    try:
        import uvicorn
        uvicorn.run(
            "backend.main:app",
            host=host,
            port=port,
            reload=reload,
            reload_dirs=["backend", "pages", "scripts", "styles"]
        )
    except KeyboardInterrupt:
        print("\n👋 服务已停止")
    except Exception as e:
        print(f"❌ 启动失败: {e}")

def main():
    """主函数"""
    print("Go-World Auto Spare Parts 统一启动器")
    print("=" * 50)
    
    # 检查依赖
    if not check_requirements():
        sys.exit(1)
    
    # 检查环境配置
    if not check_env_file():
        sys.exit(1)
    
    # 解析命令行参数
    import argparse
    parser = argparse.ArgumentParser(description="启动 Go-World Auto Spare Parts 服务")
    parser.add_argument("--host", default="0.0.0.0", help="服务器主机地址 (默认: 0.0.0.0)")
    parser.add_argument("--port", type=int, default=8001, help="服务器端口 (默认: 8001)")
    parser.add_argument("--no-reload", action="store_true", help="禁用自动重载")
    
    args = parser.parse_args()
    
    # 启动服务器
    start_server(
        host=args.host,
        port=args.port,
        reload=not args.no_reload
    )

if __name__ == "__main__":
    main()