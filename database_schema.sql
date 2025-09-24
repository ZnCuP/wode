-- Go-World Auto Spare Parts 数据库设计
-- PostgreSQL 数据库表结构

-- 创建数据库（在服务器上执行）
-- CREATE DATABASE goworld_auto_parts;

-- 产品分类表
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    name_zh VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 产品表
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(id),
    name VARCHAR(200) NOT NULL,
    name_zh VARCHAR(200),
    description TEXT,
    description_zh TEXT,
    image_url VARCHAR(500),
    price DECIMAL(10,2),
    stock_quantity INTEGER DEFAULT 0,
    sku VARCHAR(100) UNIQUE,
    specifications JSONB, -- 存储产品规格的JSON数据
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 新闻分类表
CREATE TABLE news_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    name_zh VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 新闻表
CREATE TABLE news (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES news_categories(id),
    title VARCHAR(300) NOT NULL,
    title_zh VARCHAR(300),
    content TEXT NOT NULL, -- 富文本内容
    content_zh TEXT, -- 中文富文本内容
    summary VARCHAR(800), -- 摘要，用于列表页显示
    summary_zh VARCHAR(800),
    cover_image VARCHAR(500) NOT NULL, -- 封面图（必需字段）
    author VARCHAR(100) DEFAULT 'Go-World',
    tags VARCHAR(500), -- 标签，逗号分隔
    view_count INTEGER DEFAULT 0, -- 浏览次数
    is_featured BOOLEAN DEFAULT false, -- 是否为推荐文章
    is_published BOOLEAN DEFAULT true,
    publish_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 发布日期
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- 索引
    INDEX idx_news_publish_date (publish_date),
    INDEX idx_news_category (category_id),
    INDEX idx_news_published (is_published)
);

-- FAQ分类表
CREATE TABLE faq_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    name_zh VARCHAR(100),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- FAQ表
CREATE TABLE faqs (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES faq_categories(id),
    question VARCHAR(500) NOT NULL,
    question_zh VARCHAR(500),
    answer TEXT NOT NULL,
    answer_zh TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 视频分类表
CREATE TABLE video_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    name_zh VARCHAR(100),
    description TEXT,
    description_zh TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 视频表
CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES video_categories(id),
    title VARCHAR(300) NOT NULL,
    title_zh VARCHAR(300),
    description TEXT,
    description_zh TEXT,
    video_url VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500),
    duration INTEGER, -- 视频时长（秒）
    view_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 联系信息表（用于存储联系表单提交）
CREATE TABLE contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(200) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(200),
    subject VARCHAR(300),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 网站配置表（用于存储网站设置）
CREATE TABLE site_settings (
    id SERIAL PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    description VARCHAR(300),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建索引以提高查询性能
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_news_category ON news(category_id);
CREATE INDEX idx_news_published ON news(is_published);
CREATE INDEX idx_news_publish_date ON news(publish_date);
CREATE INDEX idx_faqs_category ON faqs(category_id);
CREATE INDEX idx_faqs_active ON faqs(is_active);
CREATE INDEX idx_videos_category ON videos(category_id);
CREATE INDEX idx_videos_active ON videos(is_active);
CREATE INDEX idx_contact_read ON contact_submissions(is_read);

-- 插入初始数据

-- 产品分类
INSERT INTO categories (name, name_zh, description) VALUES
('Sensors', '传感器', 'Automotive sensors and detection equipment'),
('Engine Parts', '发动机部件', 'Engine components and accessories'),
('Electrical', '电气部件', 'Electrical components and systems');

-- 初始产品数据
INSERT INTO products (category_id, name, name_zh, description, description_zh, image_url, sku) VALUES
(1, 'Oil Level Sensor', '油位传感器', 'Precision oil level detection for automotive applications', '汽车应用的精密油位检测', '/assets/oil_level_sensor.png', 'OLS-001'),
(1, 'MAP Sensor', 'MAP传感器', 'Manifold Absolute Pressure sensors for engine management', '用于发动机管理的歧管绝对压力传感器', '/assets/steering_angle_sensor.png', 'MAP-001'),
(1, 'Height Level Sensor', '高度传感器', 'Vehicle height adjustment and leveling systems', '车辆高度调节和水平系统', '/assets/height_level_sensor.png', 'HLS-001'),
(1, 'DPF Sensor', 'DPF传感器', 'Diesel Particulate Filter monitoring sensor', '柴油颗粒过滤器监测传感器', '/assets/DPF_sensor.png', 'DPF-001');

-- FAQ分类
INSERT INTO faq_categories (name, name_zh, sort_order) VALUES
('General', '常规问题', 1),
('Products', '产品相关', 2),
('Technical', '技术支持', 3);

-- 视频分类
INSERT INTO video_categories (name, name_zh, description, description_zh) VALUES
('MAP Sensor', 'MAP传感器', 'Videos about MAP sensor products and installation', '关于MAP传感器产品和安装的视频'),
('Oil Level Sensor', '油位传感器', 'Videos about oil level sensor products and usage', '关于油位传感器产品和使用的视频');

-- 新闻分类
INSERT INTO news_categories (name, name_zh) VALUES
('Company News', '公司新闻'),
('Product Updates', '产品更新'),
('Industry News', '行业新闻');

-- 网站设置
INSERT INTO site_settings (setting_key, setting_value, description) VALUES
('site_title', 'Go-World Auto Spare Parts', 'Website title'),
('contact_email', 'info@goworld.com', 'Contact email address'),
('contact_phone', '+86-xxx-xxxx-xxxx', 'Contact phone number'),
('company_address', 'Ningde, Fujian, China', 'Company address');