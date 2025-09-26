"""
数据库 CRUD 操作
"""

from sqlalchemy.orm import Session, joinedload
from sqlalchemy import desc
from typing import List, Optional
from .models import *
from .schemas import *

# ==================== 产品相关操作 ====================

def get_categories_list(db: Session) -> List[Category]:
    """获取所有产品分类"""
    return db.query(Category).all()

def get_products_list(
    db: Session,
    category_id: Optional[int] = None,
    is_active: bool = True,
    skip: int = 0,
    limit: int = 100
) -> List[Product]:
    """获取产品列表"""
    query = db.query(Product).options(joinedload(Product.category)).filter(Product.is_active == is_active)
    
    if category_id:
        query = query.filter(Product.category_id == category_id)
    
    return query.offset(skip).limit(limit).all()

def get_product_by_id(db: Session, product_id: int) -> Optional[Product]:
    """根据ID获取产品"""
    return db.query(Product).options(joinedload(Product.category)).filter(Product.id == product_id).first()

# ==================== 新闻相关操作 ====================

def get_news_categories_list(db: Session) -> List[NewsCategory]:
    """获取所有新闻分类"""
    return db.query(NewsCategory).all()

def get_news_list(
    db: Session,
    category_id: Optional[int] = None,
    is_published: bool = True,
    skip: int = 0,
    limit: int = 20
) -> List[News]:
    """获取新闻列表"""
    query = db.query(News).filter(News.is_published == is_published)
    
    if category_id:
        query = query.filter(News.category_id == category_id)
    
    return query.order_by(desc(News.publish_date)).offset(skip).limit(limit).all()

def get_news_by_id(db: Session, news_id: int) -> Optional[News]:
    """根据ID获取新闻"""
    return db.query(News).filter(News.id == news_id).first()

# ==================== FAQ 相关操作 ====================

def get_faq_categories_list(db: Session) -> List[FAQCategory]:
    """获取所有FAQ分类"""
    return db.query(FAQCategory).order_by(FAQCategory.sort_order).all()

def get_faqs_list(
    db: Session,
    category_id: Optional[int] = None,
    is_active: bool = True
) -> List[FAQ]:
    """获取FAQ列表"""
    query = db.query(FAQ).options(joinedload(FAQ.category)).filter(FAQ.is_active == is_active)
    
    if category_id:
        query = query.filter(FAQ.category_id == category_id)
    
    return query.order_by(FAQ.sort_order).all()

# ==================== 视频相关操作 ====================

def get_video_categories_list(db: Session) -> List[VideoCategory]:
    """获取所有视频分类"""
    return db.query(VideoCategory).all()

def get_videos_list(
    db: Session,
    category_id: Optional[int] = None,
    is_active: bool = True,
    skip: int = 0,
    limit: int = 50
) -> List[Video]:
    """获取视频列表"""
    query = db.query(Video).options(joinedload(Video.category)).filter(Video.is_active == is_active)
    
    if category_id:
        query = query.filter(Video.category_id == category_id)
    
    return query.order_by(desc(Video.created_at)).offset(skip).limit(limit).all()

def get_video_by_id(db: Session, video_id: int) -> Optional[Video]:
    """根据ID获取视频"""
    return db.query(Video).options(joinedload(Video.category)).filter(Video.id == video_id).first()

def increment_video_view_count(db: Session, video_id: int):
    """增加视频观看次数"""
    video = db.query(Video).filter(Video.id == video_id).first()
    if video:
        video.view_count += 1
        db.commit()

# ==================== 联系表单操作 ====================

def create_contact_submission(db: Session, contact: ContactCreate) -> ContactSubmission:
    """创建联系表单提交记录"""
    db_contact = ContactSubmission(**contact.dict())
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact

def get_contact_submissions(
    db: Session,
    is_read: Optional[bool] = None,
    skip: int = 0,
    limit: int = 50
) -> List[ContactSubmission]:
    """获取联系表单提交列表"""
    query = db.query(ContactSubmission)
    
    if is_read is not None:
        query = query.filter(ContactSubmission.is_read == is_read)
    
    return query.order_by(desc(ContactSubmission.created_at)).offset(skip).limit(limit).all()

# ==================== 网站设置操作 ====================

def get_site_settings(db: Session) -> List[SiteSetting]:
    """获取所有网站设置"""
    return db.query(SiteSetting).all()

def get_site_setting_by_key(db: Session, setting_key: str) -> Optional[SiteSetting]:
    """根据键获取网站设置"""
    return db.query(SiteSetting).filter(SiteSetting.setting_key == setting_key).first()

def update_site_setting(db: Session, setting_key: str, setting_value: str) -> SiteSetting:
    """更新网站设置"""
    setting = get_site_setting_by_key(db, setting_key)
    if setting:
        setting.setting_value = setting_value
    else:
        setting = SiteSetting(setting_key=setting_key, setting_value=setting_value)
        db.add(setting)
    
    db.commit()
    db.refresh(setting)
    return setting