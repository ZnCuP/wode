#!/usr/bin/env python3
"""
添加测试新闻数据
"""

from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import News, NewsCategory, Base
from datetime import datetime, timedelta
import random

# 创建数据库表
Base.metadata.create_all(bind=engine)

def add_test_news():
    db = SessionLocal()
    try:
        # 检查是否已有新闻分类
        categories = db.query(NewsCategory).all()
        if not categories:
            # 创建新闻分类
            categories_data = [
                {"name": "Company News", "name_zh": "公司新闻"},
                {"name": "Product Updates", "name_zh": "产品更新"},
                {"name": "Industry News", "name_zh": "行业新闻"},
                {"name": "Technology", "name_zh": "技术资讯"}
            ]
            
            for cat_data in categories_data:
                category = NewsCategory(**cat_data)
                db.add(category)
            
            db.commit()
            categories = db.query(NewsCategory).all()
            print(f"创建了 {len(categories)} 个新闻分类")

        # 测试新闻数据
        test_news = [
            {
                "title": "Go-World Launches New MAP Sensor Technology",
                "title_zh": "Go-World推出新型MAP传感器技术",
                "content": """<h2>Revolutionary MAP Sensor Technology</h2>
<p>Go-World is proud to announce the launch of our latest MAP (Manifold Absolute Pressure) sensor technology, designed to provide superior performance and reliability for modern automotive applications.</p>

<h3>Key Features</h3>
<ul>
<li>Enhanced accuracy with ±1% precision</li>
<li>Extended temperature range: -40°C to +125°C</li>
<li>Improved durability with IP67 protection</li>
<li>Compatible with all major automotive brands</li>
</ul>

<h3>Technical Specifications</h3>
<p>Our new MAP sensors feature advanced silicon-based technology that ensures consistent performance across various operating conditions. The sensors are designed to meet or exceed OEM specifications.</p>

<p>This breakthrough technology represents our commitment to innovation and quality in the automotive sensor industry.</p>""",
                "content_zh": """<h2>革命性MAP传感器技术</h2>
<p>Go-World自豪地宣布推出我们最新的MAP（歧管绝对压力）传感器技术，旨在为现代汽车应用提供卓越的性能和可靠性。</p>

<h3>主要特点</h3>
<ul>
<li>精度提升至±1%</li>
<li>扩展温度范围：-40°C至+125°C</li>
<li>IP67防护等级提升耐用性</li>
<li>兼容所有主要汽车品牌</li>
</ul>

<h3>技术规格</h3>
<p>我们的新型MAP传感器采用先进的硅基技术，确保在各种工作条件下的一致性能。传感器设计符合或超越OEM规格。</p>

<p>这项突破性技术代表了我们在汽车传感器行业对创新和质量的承诺。</p>""",
                "summary": "Go-World announces the launch of revolutionary MAP sensor technology with enhanced accuracy, extended temperature range, and improved durability.",
                "summary_zh": "Go-World宣布推出革命性MAP传感器技术，具有增强的精度、扩展的温度范围和改进的耐用性。",
                "cover_image": "/assets/file/pics/map-sensor-news.jpg",
                "author": "Go-World Tech Team",
                "tags": "MAP Sensor, Technology, Innovation, Automotive",
                "is_featured": True,
                "category_id": 2  # Product Updates
            },
            {
                "title": "Oil Level Sensor Installation Guide",
                "title_zh": "油位传感器安装指南",
                "content": """<h2>Professional Installation Guide</h2>
<p>Proper installation of oil level sensors is crucial for optimal performance and longevity. This comprehensive guide covers the essential steps for professional installation.</p>

<h3>Pre-Installation Checklist</h3>
<ul>
<li>Verify sensor compatibility with vehicle model</li>
<li>Check oil pan condition and cleanliness</li>
<li>Ensure proper tools are available</li>
<li>Review vehicle service manual</li>
</ul>

<h3>Installation Steps</h3>
<ol>
<li><strong>Preparation:</strong> Drain engine oil and clean the oil pan</li>
<li><strong>Sensor Placement:</strong> Position sensor according to manufacturer specifications</li>
<li><strong>Wiring:</strong> Connect electrical harness with proper torque specifications</li>
<li><strong>Testing:</strong> Verify sensor operation before final assembly</li>
</ol>

<h3>Quality Assurance</h3>
<p>After installation, perform a complete system test to ensure proper sensor function and accurate oil level readings.</p>""",
                "content_zh": """<h2>专业安装指南</h2>
<p>正确安装油位传感器对于最佳性能和使用寿命至关重要。本综合指南涵盖了专业安装的基本步骤。</p>

<h3>安装前检查清单</h3>
<ul>
<li>验证传感器与车型的兼容性</li>
<li>检查油底壳状况和清洁度</li>
<li>确保有合适的工具</li>
<li>查阅车辆维修手册</li>
</ul>

<h3>安装步骤</h3>
<ol>
<li><strong>准备工作：</strong>排放发动机油并清洁油底壳</li>
<li><strong>传感器定位：</strong>根据制造商规格定位传感器</li>
<li><strong>接线：</strong>按照正确的扭矩规格连接电气线束</li>
<li><strong>测试：</strong>在最终组装前验证传感器操作</li>
</ol>

<h3>质量保证</h3>
<p>安装后，执行完整的系统测试以确保传感器功能正常和油位读数准确。</p>""",
                "summary": "Comprehensive installation guide for oil level sensors covering pre-installation checks, step-by-step procedures, and quality assurance.",
                "summary_zh": "油位传感器的综合安装指南，涵盖安装前检查、分步程序和质量保证。",
                "cover_image": "/assets/file/pics/oil-sensor-installation.jpg",
                "author": "Go-World Technical Support",
                "tags": "Oil Level Sensor, Installation, Guide, Technical",
                "is_featured": False,
                "category_id": 4  # Technology
            },
            {
                "title": "Go-World Expands Global Distribution Network",
                "title_zh": "Go-World扩展全球分销网络",
                "content": """<h2>Global Expansion Initiative</h2>
<p>Go-World is pleased to announce the expansion of our global distribution network, bringing our high-quality automotive sensors closer to customers worldwide.</p>

<h3>New Distribution Centers</h3>
<p>We have established new distribution centers in key markets:</p>
<ul>
<li>Europe: Frankfurt, Germany</li>
<li>North America: Detroit, USA</li>
<li>Southeast Asia: Bangkok, Thailand</li>
<li>Middle East: Dubai, UAE</li>
</ul>

<h3>Enhanced Service Capabilities</h3>
<p>This expansion enables us to provide:</p>
<ul>
<li>Faster delivery times</li>
<li>Local technical support</li>
<li>Regional inventory management</li>
<li>Customized solutions for local markets</li>
</ul>

<h3>Commitment to Excellence</h3>
<p>Our global expansion reflects our commitment to serving customers with the highest quality products and services, regardless of their location.</p>""",
                "content_zh": """<h2>全球扩张计划</h2>
<p>Go-World很高兴宣布扩展我们的全球分销网络，将我们的高质量汽车传感器带给世界各地的客户。</p>

<h3>新分销中心</h3>
<p>我们在关键市场建立了新的分销中心：</p>
<ul>
<li>欧洲：德国法兰克福</li>
<li>北美：美国底特律</li>
<li>东南亚：泰国曼谷</li>
<li>中东：阿联酋迪拜</li>
</ul>

<h3>增强的服务能力</h3>
<p>这次扩张使我们能够提供：</p>
<ul>
<li>更快的交付时间</li>
<li>本地技术支持</li>
<li>区域库存管理</li>
<li>针对本地市场的定制解决方案</li>
</ul>

<h3>追求卓越的承诺</h3>
<p>我们的全球扩张反映了我们致力于为客户提供最高质量产品和服务的承诺，无论他们身在何处。</p>""",
                "summary": "Go-World announces global distribution network expansion with new centers in Europe, North America, Southeast Asia, and Middle East.",
                "summary_zh": "Go-World宣布全球分销网络扩张，在欧洲、北美、东南亚和中东设立新中心。",
                "cover_image": "/assets/file/pics/global-expansion.jpg",
                "author": "Go-World Management",
                "tags": "Global Expansion, Distribution, Network, International",
                "is_featured": True,
                "category_id": 1  # Company News
            },
            {
                "title": "Automotive Industry Trends 2024",
                "title_zh": "2024年汽车行业趋势",
                "content": """<h2>Industry Outlook for 2024</h2>
<p>The automotive industry continues to evolve rapidly, driven by technological advancements and changing consumer preferences. Here are the key trends shaping 2024.</p>

<h3>Electric Vehicle Growth</h3>
<p>Electric vehicle adoption is accelerating globally, with new sensor requirements for battery management, thermal monitoring, and energy efficiency optimization.</p>

<h3>Advanced Driver Assistance Systems (ADAS)</h3>
<p>ADAS technology is becoming standard across vehicle segments, increasing demand for precision sensors including:</p>
<ul>
<li>Radar and LiDAR sensors</li>
<li>Camera systems</li>
<li>Ultrasonic sensors</li>
<li>Inertial measurement units</li>
</ul>

<h3>Connectivity and IoT</h3>
<p>Vehicle connectivity is expanding, requiring sensors that can integrate with IoT ecosystems and provide real-time data for predictive maintenance and performance optimization.</p>

<h3>Sustainability Focus</h3>
<p>Environmental considerations are driving demand for more efficient sensors that contribute to reduced emissions and improved fuel economy.</p>""",
                "content_zh": """<h2>2024年行业展望</h2>
<p>汽车行业在技术进步和消费者偏好变化的推动下继续快速发展。以下是塑造2024年的关键趋势。</p>

<h3>电动汽车增长</h3>
<p>电动汽车在全球范围内加速普及，对电池管理、热监控和能效优化的传感器提出了新要求。</p>

<h3>高级驾驶辅助系统(ADAS)</h3>
<p>ADAS技术正在各个车型细分市场中成为标准配置，增加了对精密传感器的需求，包括：</p>
<ul>
<li>雷达和激光雷达传感器</li>
<li>摄像头系统</li>
<li>超声波传感器</li>
<li>惯性测量单元</li>
</ul>

<h3>连接性和物联网</h3>
<p>车辆连接性正在扩展，需要能够与物联网生态系统集成并为预测性维护和性能优化提供实时数据的传感器。</p>

<h3>可持续性关注</h3>
<p>环境考虑正在推动对更高效传感器的需求，这些传感器有助于减少排放和改善燃油经济性。</p>""",
                "summary": "Analysis of key automotive industry trends for 2024, including electric vehicles, ADAS technology, connectivity, and sustainability.",
                "summary_zh": "分析2024年汽车行业的关键趋势，包括电动汽车、ADAS技术、连接性和可持续性。",
                "cover_image": "/assets/file/pics/industry-trends-2024.jpg",
                "author": "Industry Analysis Team",
                "tags": "Industry Trends, 2024, Electric Vehicles, ADAS, IoT",
                "is_featured": False,
                "category_id": 3  # Industry News
            },
            {
                "title": "DPF Sensor Maintenance Best Practices",
                "title_zh": "DPF传感器维护最佳实践",
                "content": """<h2>Diesel Particulate Filter Sensor Maintenance</h2>
<p>Proper maintenance of DPF sensors is essential for optimal diesel engine performance and emissions compliance. Follow these best practices for maximum sensor life.</p>

<h3>Regular Inspection Schedule</h3>
<p>Implement a regular inspection schedule:</p>
<ul>
<li>Visual inspection every 10,000 km</li>
<li>Electrical testing every 20,000 km</li>
<li>Complete system check every 40,000 km</li>
</ul>

<h3>Common Issues and Solutions</h3>
<table>
<tr><th>Issue</th><th>Cause</th><th>Solution</th></tr>
<tr><td>Sensor drift</td><td>Contamination</td><td>Clean sensor element</td></tr>
<tr><td>Electrical failure</td><td>Corrosion</td><td>Replace connector</td></tr>
<tr><td>False readings</td><td>Calibration</td><td>Recalibrate system</td></tr>
</table>

<h3>Preventive Measures</h3>
<p>To extend sensor life:</p>
<ul>
<li>Use quality diesel fuel</li>
<li>Maintain proper engine operating temperature</li>
<li>Replace air filters regularly</li>
<li>Monitor exhaust system integrity</li>
</ul>""",
                "content_zh": """<h2>柴油颗粒过滤器传感器维护</h2>
<p>正确维护DPF传感器对于最佳柴油发动机性能和排放合规性至关重要。遵循这些最佳实践以获得最大传感器寿命。</p>

<h3>定期检查计划</h3>
<p>实施定期检查计划：</p>
<ul>
<li>每10,000公里进行目视检查</li>
<li>每20,000公里进行电气测试</li>
<li>每40,000公里进行完整系统检查</li>
</ul>

<h3>常见问题和解决方案</h3>
<table>
<tr><th>问题</th><th>原因</th><th>解决方案</th></tr>
<tr><td>传感器漂移</td><td>污染</td><td>清洁传感器元件</td></tr>
<tr><td>电气故障</td><td>腐蚀</td><td>更换连接器</td></tr>
<tr><td>错误读数</td><td>校准</td><td>重新校准系统</td></tr>
</table>

<h3>预防措施</h3>
<p>延长传感器寿命：</p>
<ul>
<li>使用优质柴油燃料</li>
<li>保持适当的发动机工作温度</li>
<li>定期更换空气滤清器</li>
<li>监控排气系统完整性</li>
</ul>""",
                "summary": "Comprehensive guide to DPF sensor maintenance including inspection schedules, common issues, and preventive measures.",
                "summary_zh": "DPF传感器维护的综合指南，包括检查计划、常见问题和预防措施。",
                "cover_image": "/assets/file/pics/dpf-sensor-maintenance.jpg",
                "author": "Go-World Service Team",
                "tags": "DPF Sensor, Maintenance, Diesel, Best Practices",
                "is_featured": False,
                "category_id": 4  # Technology
            }
        ]

        # 添加新闻数据
        for i, news_data in enumerate(test_news):
            # 设置发布日期（最近几天）
            publish_date = datetime.now() - timedelta(days=i*2)
            news_data["publish_date"] = publish_date
            
            news = News(**news_data)
            db.add(news)

        db.commit()
        print(f"成功添加了 {len(test_news)} 条测试新闻")
        
        # 显示添加的新闻
        all_news = db.query(News).all()
        print(f"\n数据库中总共有 {len(all_news)} 条新闻：")
        for news in all_news:
            print(f"- {news.title} (ID: {news.id})")

    except Exception as e:
        print(f"添加测试数据时出错: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    add_test_news()