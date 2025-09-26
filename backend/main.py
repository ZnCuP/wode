"""
Go-World Auto Spare Parts Backend API
轻量级 FastAPI 后端服务
"""

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from typing import List, Optional
import os
from dotenv import load_dotenv

from .database import get_db, engine
from .models import Base
from .schemas import *
from .crud import *

# 加载环境变量
load_dotenv()

# 创建数据库表
Base.metadata.create_all(bind=engine)

# 创建 FastAPI 应用
app = FastAPI(
    title="Go-World Auto Spare Parts API",
    description="汽车零配件管理系统API",
    version="1.0.0"
)

# 配置 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 生产环境中应该限制具体域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 挂载静态文件
import os
from pathlib import Path

# 获取项目根目录
project_root = os.path.dirname(os.path.dirname(__file__))

# 挂载各种静态资源
assets_path = os.path.join(project_root, "assets")
styles_path = os.path.join(project_root, "styles")
scripts_path = os.path.join(project_root, "scripts")
templates_path = os.path.join(project_root, "templates")

app.mount("/assets", StaticFiles(directory=assets_path), name="assets")
app.mount("/styles", StaticFiles(directory=styles_path), name="styles")
app.mount("/scripts", StaticFiles(directory=scripts_path), name="scripts")
app.mount("/templates", StaticFiles(directory=templates_path), name="templates")

# 添加前端页面路由

@app.get("/")
async def serve_index():
    """提供主页"""
    return FileResponse(os.path.join(project_root, "index.html"))

@app.get("/style.css")
async def serve_style_css():
    """提供主样式文件"""
    return FileResponse(os.path.join(project_root, "style.css"))

@app.get("/pages/{page_name}")
async def serve_page(page_name: str):
    """提供页面文件"""
    page_path = os.path.join(project_root, "pages", page_name)
    if os.path.exists(page_path) and page_name.endswith('.html'):
        return FileResponse(page_path)
    raise HTTPException(status_code=404, detail="Page not found")

# API根路径信息
@app.get("/api")
async def api_root():
    return {"message": "Go-World Auto Spare Parts API", "version": "1.0.0"}

# 健康检查
@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# ==================== 产品相关 API ====================

@app.get("/api/products", response_model=List[ProductResponse])
async def get_products(
    category_id: Optional[int] = None,
    is_active: bool = True,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """获取产品列表"""
    products = get_products_list(db, category_id=category_id, is_active=is_active, skip=skip, limit=limit)
    return products

@app.get("/api/products/{product_id}", response_model=ProductResponse)
async def get_product(product_id: int, db: Session = Depends(get_db)):
    """获取单个产品详情"""
    product = get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.get("/api/categories", response_model=List[CategoryResponse])
async def get_categories(db: Session = Depends(get_db)):
    """获取产品分类列表"""
    categories = get_categories_list(db)
    return categories

# ==================== 新闻相关 API ====================

@app.get("/api/news", response_model=List[NewsResponse])
async def get_news(
    category_id: Optional[int] = None,
    is_published: bool = True,
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    """获取新闻列表"""
    news = get_news_list(db, category_id=category_id, is_published=is_published, skip=skip, limit=limit)
    return news

@app.get("/api/news/{news_id}", response_model=NewsResponse)
async def get_news_detail(news_id: int, db: Session = Depends(get_db)):
    """获取新闻详情"""
    news = get_news_by_id(db, news_id)
    if not news:
        raise HTTPException(status_code=404, detail="News not found")
    return news

# ==================== FAQ 相关 API ====================

@app.get("/api/faqs", response_model=List[FAQResponse])
async def get_faqs(
    category_id: Optional[int] = None,
    is_active: bool = True,
    db: Session = Depends(get_db)
):
    """获取FAQ列表"""
    faqs = get_faqs_list(db, category_id=category_id, is_active=is_active)
    
    # 手动构建响应数据以避免序列化问题
    result = []
    for faq in faqs:
        faq_dict = {
            "id": faq.id,
            "question": faq.question,
            "question_zh": faq.question_zh,
            "answer": faq.answer,
            "answer_zh": faq.answer_zh,
            "sort_order": faq.sort_order,
            "is_active": faq.is_active,
            "category_id": faq.category_id,
            "category": {
                "id": faq.category.id,
                "name": faq.category.name,
                "name_zh": faq.category.name_zh,
                "sort_order": faq.category.sort_order,
                "created_at": faq.category.created_at
            } if faq.category else None,
            "created_at": faq.created_at,
            "updated_at": faq.updated_at
        }
        result.append(faq_dict)
    
    return result

@app.get("/api/faq-categories", response_model=List[FAQCategoryResponse])
async def get_faq_categories(db: Session = Depends(get_db)):
    """获取FAQ分类列表"""
    categories = get_faq_categories_list(db)
    return categories

# ==================== 视频相关 API ====================

@app.get("/api/videos", response_model=List[VideoResponse])
async def get_videos(
    category_id: Optional[int] = None,
    is_active: bool = True,
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    """获取视频列表"""
    videos = get_videos_list(db, category_id=category_id, is_active=is_active, skip=skip, limit=limit)
    return videos

@app.get("/api/video-categories", response_model=List[VideoCategoryResponse])
async def get_video_categories(db: Session = Depends(get_db)):
    """获取视频分类列表"""
    categories = get_video_categories_list(db)
    return categories

# ==================== 联系表单 API ====================

@app.post("/api/contact", response_model=dict)
async def submit_contact(contact: ContactCreate, db: Session = Depends(get_db)):
    """提交联系表单"""
    try:
        create_contact_submission(db, contact)
        return {"message": "Contact form submitted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to submit contact form")

# ==================== 网站设置 API ====================

@app.get("/api/settings", response_model=dict)
async def get_site_settings(db: Session = Depends(get_db)):
    """获取网站设置"""
    settings = get_site_settings(db)
    return {setting.setting_key: setting.setting_value for setting in settings}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)