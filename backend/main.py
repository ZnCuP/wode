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
from pathlib import Path

# 假设您的项目结构和依赖导入保持不变
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

# ----------------------------------------------------
# 静态文件挂载
# ----------------------------------------------------
# 获取项目根目录 (假设此文件位于项目根目录下的某个子目录，例如 app/main.py)
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 挂载各种静态资源
assets_path = os.path.join(project_root, "assets")
styles_path = os.path.join(project_root, "styles")
scripts_path = os.path.join(project_root, "scripts")
templates_path = os.path.join(project_root, "templates")

# 检查路径是否存在，避免启动报错
if os.path.isdir(assets_path):
    app.mount("/assets", StaticFiles(directory=assets_path), name="assets")
if os.path.isdir(styles_path):
    app.mount("/styles", StaticFiles(directory=styles_path), name="styles")
if os.path.isdir(scripts_path):
    app.mount("/scripts", StaticFiles(directory=scripts_path), name="scripts")
if os.path.isdir(templates_path):
    app.mount("/templates", StaticFiles(directory=templates_path), name="templates")

# ----------------------------------------------------
# 前端页面路由 - 按优先级排序 (特定在前，通用在后)
# ----------------------------------------------------

# 1. 优先级最高：API 根路径和健康检查 (确保不被通用路由捕获)
@app.get("/api")
async def api_root():
    return {"message": "Go-World Auto Spare Parts API", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# 2. 优先级高：特定文件路由 (解决 style.css 404)
@app.get("/style.css")
async def serve_style_css():
    """提供主样式文件"""
    file_path = os.path.join(project_root, "style.css")
    if os.path.exists(file_path):
        return FileResponse(file_path)
    raise HTTPException(status_code=404, detail="style.css not found")

# 3. 优先级高：主页路由
@app.get("/")
async def serve_index():
    """提供主页：/ 自动加载 pages/index.html"""
    page_path = os.path.join(project_root, "pages", "index.html")
    if os.path.exists(page_path):
        return FileResponse(page_path)
    # 兼容项目根目录下的 index.html
    return FileResponse(os.path.join(project_root, "index.html"))

# 4. 优先级中：兼容旧链接的路由
@app.get("/pages/{page_name}")
async def serve_page(page_name: str):
    """提供页面文件 (兼容 /pages/xxx.html 这种旧链接)"""
    page_path = os.path.join(project_root, "pages", page_name)
    if os.path.exists(page_path) and page_name.endswith('.html'):
        return FileResponse(page_path)
    raise HTTPException(status_code=404, detail="Page not found")

# 5. 优先级低：通用页面路由 (实现 URL 简洁化)
@app.get("/{page_alias}")
async def serve_clean_page(page_alias: str):
    """
    通过别名提供页面文件。
    例如：访问 /news 将查找 pages/news.html
    """
    
    # 豁免检查：防止通用路由捕获静态文件或 API 路径
    EXCLUDED_PREFIXES = ('api/', 'assets/', 'styles/', 'scripts/', 'templates/')
    if page_alias.startswith(EXCLUDED_PREFIXES) or page_alias in ['style.css', 'health']:
        # 由于路由顺序正确，理论上不会到达这里，但作为安全措施
        raise HTTPException(status_code=404, detail="Resource excluded from clean URL matching")

    # 1. 构造带 .html 后缀的完整路径
    page_name_with_html = page_alias + ".html"
    page_path = os.path.join(project_root, "pages", page_name_with_html)
    
    # 2. 检查文件是否存在
    if os.path.exists(page_path):
        return FileResponse(page_path)
    
    # 3. 容错：如果请求本身带有 .html (尽管不应该发生)
    if page_alias.endswith('.html'):
        page_path_direct = os.path.join(project_root, "pages", page_alias)
        if os.path.exists(page_path_direct):
             return FileResponse(page_path_direct)
    
    raise HTTPException(status_code=404, detail="Page not found")


# ==================== 产品相关 API ====================

@app.get("/api/products")
async def get_products(
    category_id: Optional[int] = None,
    is_active: bool = True,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """获取产品列表"""
    products = get_products_list(db, category_id=category_id, is_active=is_active, skip=skip, limit=limit)
    
    # 手动构造返回数据
    products_data = []
    for product in products:
        product_data = {
            "id": product.id,
            "name": product.name,
            "name_zh": product.name_zh,
            "description": product.description,
            "description_zh": product.description_zh,
            "image_url": product.image_url,
            "price": product.price,
            "stock_quantity": product.stock_quantity,
            "sku": product.sku,
            "specifications": product.specifications,
            "is_active": product.is_active,
            "category_id": product.category_id,
            "created_at": product.created_at.isoformat() if product.created_at else None,
            "updated_at": product.updated_at.isoformat() if product.updated_at else None
        }
        
        # 添加分类信息
        if product.category:
            product_data["category"] = {
                "id": product.category.id,
                "name": product.category.name,
                "name_zh": product.category.name_zh,
                "description": product.category.description,
                "created_at": product.category.created_at.isoformat() if product.category.created_at else None
            }
        else:
            product_data["category"] = None
            
        products_data.append(product_data)
    
    return products_data

@app.get("/api/products/{product_id}")
async def get_product(product_id: int, db: Session = Depends(get_db)):
    """获取单个产品详情"""
    product = get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # 手动构造返回数据
    product_data = {
        "id": product.id,
        "name": product.name,
        "name_zh": product.name_zh,
        "description": product.description,
        "description_zh": product.description_zh,
        "image_url": product.image_url,
        "price": product.price,
        "stock_quantity": product.stock_quantity,
        "sku": product.sku,
        "specifications": product.specifications,
        "is_active": product.is_active,
        "category_id": product.category_id,
        "created_at": product.created_at.isoformat() if product.created_at else None,
        "updated_at": product.updated_at.isoformat() if product.updated_at else None
    }
    
    # 添加分类信息
    if product.category:
        product_data["category"] = {
            "id": product.category.id,
            "name": product.category.name,
            "name_zh": product.category.name_zh,
            "description": product.category.description,
            "created_at": product.category.created_at.isoformat() if product.category.created_at else None
        }
    else:
        product_data["category"] = None
    
    return product_data

@app.get("/api/categories")
async def get_categories(db: Session = Depends(get_db)):
    """获取产品分类列表"""
    categories = get_categories_list(db)
    
    # 手动构造返回数据
    categories_data = []
    for category in categories:
        category_data = {
            "id": category.id,
            "name": category.name,
            "name_zh": category.name_zh,
            "description": category.description,
            "created_at": category.created_at.isoformat() if category.created_at else None
        }
        categories_data.append(category_data)
    
    return categories_data

# ==================== 新闻相关 API ====================

@app.get("/api/news")
async def get_news(
    category_id: Optional[int] = None,
    is_published: bool = True,
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    """获取新闻列表"""
    news_list = get_news_list(db, category_id=category_id, is_published=is_published, skip=skip, limit=limit)
    
    # 手动构建响应数据
    result = []
    for news in news_list:
        news_data = {
             "id": news.id,
             "title": news.title,
             "title_zh": news.title_zh,
             "content": news.content,
             "content_zh": news.content_zh,
             "summary": news.summary,
             "summary_zh": news.summary_zh,
             "cover_image": news.cover_image,
             "author": news.author,
             "tags": news.tags,
             "view_count": news.view_count,
             "is_featured": news.is_featured,
             "is_published": news.is_published,
             "publish_date": news.publish_date.isoformat() if news.publish_date else None,
             "category_id": news.category_id,
             "category": {
                  "id": news.category.id,
                  "name": news.category.name,
                  "name_zh": news.category.name_zh,
                  "created_at": news.category.created_at.isoformat()
              } if news.category else None,
             "created_at": news.created_at.isoformat(),
             "updated_at": news.updated_at.isoformat()
         }
        result.append(news_data)
    
    return result

@app.get("/api/news/{news_id}")
async def get_news_detail(news_id: int, db: Session = Depends(get_db)):
    """获取新闻详情"""
    news = get_news_by_id(db, news_id)
    if not news:
        raise HTTPException(status_code=404, detail="News not found")
    
    # 手动构建响应数据
    news_data = {
         "id": news.id,
         "title": news.title,
         "title_zh": news.title_zh,
         "content": news.content,
         "content_zh": news.content_zh,
         "summary": news.summary,
         "summary_zh": news.summary_zh,
         "cover_image": news.cover_image,
         "author": news.author,
         "tags": news.tags,
         "view_count": news.view_count,
         "is_featured": news.is_featured,
         "is_published": news.is_published,
         "publish_date": news.publish_date.isoformat() if news.publish_date else None,
         "category_id": news.category_id,
         "category": {
             "id": news.category.id,
             "name": news.category.name,
             "name_zh": news.category.name_zh,
             "created_at": news.category.created_at.isoformat()
         } if news.category else None,
         "created_at": news.created_at.isoformat(),
         "updated_at": news.updated_at.isoformat()
     }
    
    return news_data

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