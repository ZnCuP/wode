#!/usr/bin/env python3
"""
数据库迁移脚本：更新news表结构
"""

from database import engine
from sqlalchemy import text
import sys

def migrate_news_table():
    """迁移news表到新结构"""
    
    migration_sql = """
    -- 添加新字段
    ALTER TABLE news ADD COLUMN IF NOT EXISTS cover_image VARCHAR(500);
    ALTER TABLE news ADD COLUMN IF NOT EXISTS tags VARCHAR(500);
    ALTER TABLE news ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;
    ALTER TABLE news ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;
    
    -- 更新现有字段
    ALTER TABLE news ALTER COLUMN summary TYPE VARCHAR(1000);
    ALTER TABLE news ALTER COLUMN summary_zh TYPE VARCHAR(1000);
    
    -- 将image_url数据迁移到cover_image
    UPDATE news SET cover_image = image_url WHERE cover_image IS NULL AND image_url IS NOT NULL;
    
    -- 创建索引
    CREATE INDEX IF NOT EXISTS idx_news_is_featured ON news(is_featured);
    CREATE INDEX IF NOT EXISTS idx_news_view_count ON news(view_count);
    CREATE INDEX IF NOT EXISTS idx_news_tags ON news USING gin(to_tsvector('english', tags));
    
    -- 更新现有记录的默认值
    UPDATE news SET view_count = 0 WHERE view_count IS NULL;
    UPDATE news SET is_featured = FALSE WHERE is_featured IS NULL;
    """
    
    try:
        with engine.connect() as conn:
            # 执行迁移
            for statement in migration_sql.split(';'):
                statement = statement.strip()
                if statement:
                    print(f"执行: {statement[:50]}...")
                    conn.execute(text(statement))
            
            # 提交事务
            conn.commit()
            print("✅ 数据库迁移完成！")
            
            # 验证新结构
            result = conn.execute(text("""
                SELECT column_name, data_type, is_nullable, column_default 
                FROM information_schema.columns 
                WHERE table_name = 'news' 
                ORDER BY ordinal_position
            """))
            
            print("\n📋 更新后的news表结构:")
            for row in result:
                print(f"  {row[0]}: {row[1]} (nullable: {row[2]}, default: {row[3]})")
                
    except Exception as e:
        print(f"❌ 迁移失败: {e}")
        sys.exit(1)

if __name__ == "__main__":
    migrate_news_table()