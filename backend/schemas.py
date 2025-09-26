"""
Pydantic 模式定义，用于API数据验证和序列化
"""

from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime

# ==================== 基础模式 ====================

class CategoryBase(BaseModel):
    name: str
    name_zh: Optional[str] = None
    description: Optional[str] = None

class CategoryResponse(CategoryBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# ==================== 产品相关模式 ====================

class ProductBase(BaseModel):
    name: str
    name_zh: Optional[str] = None
    description: Optional[str] = None
    description_zh: Optional[str] = None
    image_url: Optional[str] = None
    price: Optional[float] = None
    stock_quantity: Optional[int] = 0
    sku: Optional[str] = None
    specifications: Optional[Dict[str, Any]] = None
    is_active: bool = True

class ProductResponse(ProductBase):
    id: int
    category_id: Optional[int] = None
    category: Optional[CategoryResponse] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# ==================== 新闻相关模式 ====================

class NewsCategoryBase(BaseModel):
    name: str
    name_zh: Optional[str] = None

class NewsCategoryResponse(NewsCategoryBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class NewsBase(BaseModel):
    title: str
    title_zh: Optional[str] = None
    content: str  # 富文本内容
    content_zh: Optional[str] = None  # 中文富文本内容
    summary: Optional[str] = None  # 摘要，用于列表页显示
    summary_zh: Optional[str] = None
    cover_image: Optional[str] = None  # 封面图
    author: Optional[str] = "Go-World"
    tags: Optional[str] = None  # 标签，逗号分隔
    is_featured: bool = False  # 是否为推荐文章
    is_published: bool = True

class NewsResponse(NewsBase):
    id: int
    category_id: Optional[int] = None
    category: Optional[NewsCategoryResponse] = None
    view_count: int = 0  # 浏览次数
    publish_date: Optional[datetime] = None  # 发布日期
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# ==================== FAQ 相关模式 ====================

class FAQCategoryBase(BaseModel):
    name: str
    name_zh: Optional[str] = None
    sort_order: int = 0

class FAQCategoryResponse(FAQCategoryBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class FAQBase(BaseModel):
    question: str
    question_zh: Optional[str] = None
    answer: str
    answer_zh: Optional[str] = None
    sort_order: int = 0
    is_active: bool = True

class FAQResponse(FAQBase):
    id: int
    category_id: Optional[int] = None
    category: Optional[FAQCategoryResponse] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# ==================== 视频相关模式 ====================

class VideoCategoryBase(BaseModel):
    name: str
    name_zh: Optional[str] = None
    description: Optional[str] = None
    description_zh: Optional[str] = None

class VideoCategoryResponse(VideoCategoryBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class VideoBase(BaseModel):
    title: str
    title_zh: Optional[str] = None
    description: Optional[str] = None
    description_zh: Optional[str] = None
    video_url: str
    thumbnail_url: Optional[str] = None
    duration: Optional[int] = None
    is_active: bool = True

class VideoResponse(VideoBase):
    id: int
    category_id: Optional[int] = None
    category: Optional[VideoCategoryResponse] = None
    view_count: int = 0
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# ==================== 联系表单模式 ====================

class ContactCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    subject: Optional[str] = None
    message: str

class ContactResponse(ContactCreate):
    id: int
    is_read: bool = False
    created_at: datetime
    
    class Config:
        from_attributes = True

# ==================== 网站设置模式 ====================

class SiteSettingBase(BaseModel):
    setting_key: str
    setting_value: Optional[str] = None
    description: Optional[str] = None

class SiteSettingResponse(SiteSettingBase):
    id: int
    updated_at: datetime
    
    class Config:
        from_attributes = True