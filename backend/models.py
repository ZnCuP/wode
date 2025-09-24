"""
数据库模型定义
"""

from sqlalchemy import Column, Integer, String, Text, Boolean, DECIMAL, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

class Category(Base):
    __tablename__ = "categories"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    name_zh = Column(String(100))
    description = Column(Text)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    
    # 关系
    products = relationship("Product", back_populates="category")

class Product(Base):
    __tablename__ = "products"
    
    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(Integer, ForeignKey("categories.id"))
    name = Column(String(200), nullable=False)
    name_zh = Column(String(200))
    description = Column(Text)
    description_zh = Column(Text)
    image_url = Column(String(500))
    price = Column(DECIMAL(10, 2))
    stock_quantity = Column(Integer, default=0)
    sku = Column(String(100), unique=True)
    specifications = Column(JSON)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    
    # 关系
    category = relationship("Category", back_populates="products")

class NewsCategory(Base):
    __tablename__ = "news_categories"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    name_zh = Column(String(100))
    created_at = Column(DateTime, server_default=func.now())
    
    # 关系
    news = relationship("News", back_populates="category")

class News(Base):
    __tablename__ = "news"
    
    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(Integer, ForeignKey("news_categories.id"))
    title = Column(String(300), nullable=False)
    title_zh = Column(String(300))
    content = Column(Text, nullable=False)
    content_zh = Column(Text)
    summary = Column(String(500))
    summary_zh = Column(String(500))
    image_url = Column(String(500))
    author = Column(String(100))
    is_published = Column(Boolean, default=False)
    publish_date = Column(DateTime)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    
    # 关系
    category = relationship("NewsCategory", back_populates="news")

class FAQCategory(Base):
    __tablename__ = "faq_categories"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    name_zh = Column(String(100))
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime, server_default=func.now())
    
    # 关系
    faqs = relationship("FAQ", back_populates="category")

class FAQ(Base):
    __tablename__ = "faqs"
    
    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(Integer, ForeignKey("faq_categories.id"))
    question = Column(String(500), nullable=False)
    question_zh = Column(String(500))
    answer = Column(Text, nullable=False)
    answer_zh = Column(Text)
    sort_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    
    # 关系
    category = relationship("FAQCategory", back_populates="faqs")

class VideoCategory(Base):
    __tablename__ = "video_categories"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    name_zh = Column(String(100))
    description = Column(Text)
    description_zh = Column(Text)
    created_at = Column(DateTime, server_default=func.now())
    
    # 关系
    videos = relationship("Video", back_populates="category")

class Video(Base):
    __tablename__ = "videos"
    
    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(Integer, ForeignKey("video_categories.id"))
    title = Column(String(300), nullable=False)
    title_zh = Column(String(300))
    description = Column(Text)
    description_zh = Column(Text)
    video_url = Column(String(500), nullable=False)
    thumbnail_url = Column(String(500))
    duration = Column(Integer)  # 秒
    view_count = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    
    # 关系
    category = relationship("VideoCategory", back_populates="videos")

class ContactSubmission(Base):
    __tablename__ = "contact_submissions"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(200), nullable=False)
    phone = Column(String(50))
    company = Column(String(200))
    subject = Column(String(300))
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, server_default=func.now())

class SiteSetting(Base):
    __tablename__ = "site_settings"
    
    id = Column(Integer, primary_key=True, index=True)
    setting_key = Column(String(100), unique=True, nullable=False)
    setting_value = Column(Text)
    description = Column(String(300))
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())