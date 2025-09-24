#!/usr/bin/env python3
"""
导入现有的markdown文章到数据库
"""

import os
import sys
import re
from datetime import datetime
from pathlib import Path

# 添加当前目录到Python路径
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import get_db
from models import News, NewsCategory
from sqlalchemy.orm import Session

def parse_markdown_file(file_path):
    """解析markdown文件，提取标题、内容和摘要"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 提取标题（第一行或第一个#标题）
    lines = content.split('\n')
    title = None
    content_start_idx = 0
    
    for i, line in enumerate(lines):
        line = line.strip()
        if line.startswith('# '):
            title = line[2:].strip()
            content_start_idx = i + 1
            break
        elif line and not title:
            title = line
            content_start_idx = i + 1
            break
    
    if not title:
        # 如果没有找到标题，使用文件名
        title = file_path.stem
    
    # 获取内容（去掉标题后的部分）
    content_without_title = '\n'.join(lines[content_start_idx:]).strip()
    if not content_without_title:
        content_without_title = content
    
    # 提取摘要（取前750个字符的纯文本，确保在800字符限制内）
    # 移除markdown格式
    plain_text = re.sub(r'[#*_`]', '', content_without_title)
    plain_text = re.sub(r'\n+', ' ', plain_text)
    summary = plain_text[:750] + '...' if len(plain_text) > 750 else plain_text
    
    return title, content_without_title, summary

def get_date_from_filename(filename):
    """根据文件名获取发布日期"""
    # 硬编码的日期映射（从news-detail.js中获取）
    date_mapping = {
        'How Headlight Level Sensors Enhance Road Safety.md': '2024-08-15',
        'How to Install a Headlight Level Sensor in Your Car.md': '2024-08-18',
        'How to Install an Oil Level Sensor in Your Car.md': '2024-08-20',
        'Oil Level Sensors- The Unsung Heroes of Engine Protection.md': '2024-08-22',
        'The Science Behind Oil Level Sensors- How They Work.md': '2024-08-25'
    }
    
    return date_mapping.get(filename, '2024-08-01')

def get_cover_image_path(filename):
    """根据文件名生成封面图片路径"""
    # 移除.md扩展名，添加.png扩展名
    image_name = filename.replace('.md', '.png')
    return f'../assets/file/pics/{image_name}'

def get_chinese_content(title, summary):
    """为英文内容生成对应的中文标题、摘要和内容"""
    # 根据英文标题生成中文标题
    title_translations = {
        'How Headlight Level Sensors Enhance Road Safety': '大灯水平传感器如何提升道路安全',
        'How to Install a Headlight Level Sensor in Your Car': '如何在您的汽车中安装大灯水平传感器',
        'How to Install an Oil Level Sensor in Your Car': '如何在您的汽车中安装机油液位传感器',
        'Oil Level Sensors- The Unsung Heroes of Engine Protection': '机油液位传感器：发动机保护的无名英雄',
        'The Science Behind Oil Level Sensors- How They Work': '机油液位传感器背后的科学：它们如何工作',
        'Advanced Technology in Action: The Functionality of Headlight Level Sensors': '先进技术实践：大灯水平传感器的功能',
        'Where Are Headlight Level Sensors Located in Different Car Brands?': '不同汽车品牌的大灯水平传感器位置在哪里？',
        'Where to Purchase Volkswagen Oil Level Sensors for Your Business': '为您的企业采购大众汽车机油液位传感器的地方',
        # 处理长标题的情况
        'The Manifold Absolute Pressure (MAP) sensor is a small but critical component in a vehicle\'s engine management system. For Ford vehicles, as with many others, a properly functioning MAP sensor is essential for optimal performance, fuel efficiency, and emissions control. Over time, this sensor can...': '福特MAP传感器清洁指南'
    }
    
    # 生成中文摘要
    summary_translations = {
        'How Headlight Level Sensors Enhance Road Safety': '大灯水平传感器是现代汽车安全系统的重要组成部分，通过自动调节大灯角度确保最佳照明效果，提升夜间驾驶安全性。本文详细介绍了这项技术如何工作以及对道路安全的重要意义。',
        'How to Install a Headlight Level Sensor in Your Car': '本文提供了在汽车中安装大灯水平传感器的详细指南，包括所需工具、安装步骤和注意事项。正确安装传感器对确保车辆照明系统的最佳性能至关重要。',
        'How to Install an Oil Level Sensor in Your Car': '机油液位传感器的安装需要精确操作，本指南将带您了解安装过程的每个步骤，确保传感器能够准确监测发动机机油状况，保护发动机免受损害。',
        'Oil Level Sensors- The Unsung Heroes of Engine Protection': '机油液位传感器虽然不起眼，但在发动机保护方面发挥着关键作用。本文探讨了这些传感器如何默默守护着发动机的健康，防止因机油不足造成的严重损害。',
        'The Science Behind Oil Level Sensors- How They Work': '深入了解机油液位传感器的工作原理，从传感技术到信号处理，本文详细解释了这些精密设备如何准确测量和监控发动机机油液位。',
        'Advanced Technology in Action: The Functionality of Headlight Level Sensors': '探索大灯水平传感器的先进功能，了解这项技术如何通过智能调节提升驾驶体验和安全性。本文深入分析了传感器的工作机制和实际应用。',
        'Where Are Headlight Level Sensors Located in Different Car Brands?': '不同汽车制造商在车辆中安装大灯水平传感器的位置各不相同。本文详细介绍了主要汽车品牌中传感器的具体位置，帮助您快速定位和维护。',
        'Where to Purchase Volkswagen Oil Level Sensors for Your Business': '为企业采购高质量的大众汽车机油液位传感器的完整指南，包括供应商选择、产品规格和采购建议，确保您的业务获得可靠的汽车零部件供应。',
        # 处理长标题的情况
        'The Manifold Absolute Pressure (MAP) sensor is a small but critical component in a vehicle\'s engine management system. For Ford vehicles, as with many others, a properly functioning MAP sensor is essential for optimal performance, fuel efficiency, and emissions control. Over time, this sensor can...': '歧管绝对压力（MAP）传感器是车辆发动机管理系统中的一个小而关键的组件。本文详细介绍了如何清洁福特MAP传感器，确保发动机的最佳性能、燃油效率和排放控制。'
    }
    
    # 生成中文内容
    content_translations = {
        'How Headlight Level Sensors Enhance Road Safety': '''# 大灯水平传感器如何提升道路安全

大灯水平传感器是现代汽车安全技术的重要组成部分，它们通过自动调节车辆前照灯的角度来确保最佳的道路照明效果。这项技术对于提升夜间驾驶安全性具有重要意义。

## 工作原理

大灯水平传感器通过监测车辆的倾斜角度和载重变化，自动调整前照灯的照射角度。当车辆载重增加或路面不平时，传感器会实时调整大灯角度，确保光束始终照射在正确的位置。

## 安全优势

1. **防止眩光**：避免对向车辆驾驶员受到强光干扰
2. **优化照明**：确保道路获得最佳照明效果
3. **提升能见度**：在各种驾驶条件下保持良好的视野
4. **减少事故**：通过改善照明条件降低夜间事故风险

## 技术特点

现代大灯水平传感器采用先进的电子控制技术，能够快速响应车辆状态变化，为驾驶员提供持续稳定的照明支持。''',
        
        'How to Install a Headlight Level Sensor in Your Car': '''# 如何在您的汽车中安装大灯水平传感器

安装大灯水平传感器需要一定的技术知识和合适的工具。本指南将为您提供详细的安装步骤和注意事项。

## 所需工具

- 螺丝刀套装
- 扳手组
- 电气测试仪
- 安装支架
- 电线连接器

## 安装步骤

### 1. 准备工作
首先断开车辆电源，确保安全操作环境。检查传感器包装是否完整，确认所有配件齐全。

### 2. 定位安装位置
根据车辆型号确定传感器的最佳安装位置，通常位于车辆前悬挂系统附近。

### 3. 固定传感器
使用提供的支架将传感器牢固安装在指定位置，确保传感器能够准确感知车辆倾斜变化。

### 4. 电气连接
按照接线图正确连接传感器的电源线和信号线，确保连接牢固可靠。

### 5. 系统测试
重新连接车辆电源，测试传感器功能是否正常工作。

## 注意事项

- 安装过程中务必遵循安全操作规程
- 确保所有电气连接符合车辆标准
- 安装完成后进行全面功能测试''',
        
        'How to Install an Oil Level Sensor in Your Car': '''# 如何在您的汽车中安装机油液位传感器

机油液位传感器是保护发动机的重要设备，正确安装对确保发动机长期稳定运行至关重要。

## 安装前准备

### 工具清单
- 专用扳手
- 密封胶
- 清洁剂
- 新机油
- 防护手套

### 安全注意事项
- 确保发动机完全冷却
- 准备好废机油收集容器
- 穿戴适当的防护设备

## 详细安装步骤

### 1. 排放机油
首先需要排放发动机中的旧机油，为传感器安装创造干净的工作环境。

### 2. 拆卸旧传感器
小心拆卸原有的机油液位传感器，注意保护螺纹和密封面。

### 3. 清洁安装位置
彻底清洁传感器安装位置，确保没有杂质和旧密封材料残留。

### 4. 安装新传感器
将新传感器按照规定扭矩安装到位，使用新的密封垫圈确保密封性能。

### 5. 连接电路
正确连接传感器的电气接头，确保信号传输正常。

### 6. 添加新机油
安装完成后，添加符合规格的新机油至适当液位。

## 测试验证

启动发动机，检查传感器工作状态和机油液位显示是否正常。''',
        
        'Oil Level Sensors- The Unsung Heroes of Engine Protection': '''# 机油液位传感器：发动机保护的无名英雄

在现代汽车的复杂系统中，机油液位传感器虽然体积小巧，却承担着保护发动机这一重要使命。它们默默工作，为发动机提供可靠的保护。

## 重要作用

机油液位传感器的主要功能是实时监测发动机机油液位，当机油不足时及时发出警告，防止发动机因缺油而损坏。

### 保护机制

1. **实时监测**：持续监控机油液位变化
2. **早期预警**：在机油不足时立即报警
3. **损害预防**：避免发动机因缺油造成严重损坏
4. **成本节约**：通过预防性保护降低维修成本

## 技术原理

传感器通过电阻或电容变化来检测机油液位，将物理信号转换为电信号，传输给发动机控制单元进行处理。

## 维护要点

- 定期检查传感器工作状态
- 保持传感器清洁
- 及时更换损坏的传感器
- 使用符合规格的机油

机油液位传感器虽然不起眼，但它们是发动机保护系统中不可或缺的重要组件。''',
        
        'The Science Behind Oil Level Sensors- How They Work': '''# 机油液位传感器背后的科学：它们如何工作

机油液位传感器是精密的电子设备，其工作原理涉及多种物理和电子技术的综合应用。

## 传感技术原理

### 电阻式传感器
通过浮子位置变化改变电阻值，从而确定机油液位高度。

### 电容式传感器
利用机油介电常数的变化来检测液位，具有更高的精度和稳定性。

### 超声波传感器
通过超声波反射时间计算液位高度，适用于恶劣环境。

## 信号处理过程

1. **信号采集**：传感器检测物理变化
2. **信号转换**：将物理信号转换为电信号
3. **信号放大**：增强信号强度以便传输
4. **数字处理**：ECU对信号进行数字化处理
5. **结果输出**：显示液位信息或触发警报

## 精度控制

现代传感器采用先进的校准技术，确保测量精度在±2%以内，满足发动机保护的严格要求。

## 环境适应性

传感器设计考虑了高温、振动、化学腐蚀等恶劣工作环境，确保长期稳定工作。

这些精密设备的科学原理确保了发动机保护系统的可靠性和准确性。''',
        
        'Advanced Technology in Action: The Functionality of Headlight Level Sensors': '''# 先进技术实践：大灯水平传感器的功能

大灯水平传感器代表了汽车照明技术的重要进步，它们将先进的传感技术与智能控制系统相结合。

## 核心功能

### 自动调节
传感器能够根据车辆载重和路面条件自动调整大灯角度，确保最佳照明效果。

### 实时响应
系统能够在毫秒级时间内响应车辆状态变化，提供即时的照明调整。

### 智能控制
结合车辆其他传感器数据，实现更加智能的照明控制策略。

## 技术特点

1. **高精度检测**：能够检测微小的角度变化
2. **快速响应**：响应时间小于100毫秒
3. **长期稳定**：设计寿命超过10年
4. **环境适应**：适应各种恶劣工作环境

## 系统集成

大灯水平传感器与车辆的其他系统紧密集成：
- 悬挂系统监测
- 载重检测系统
- 车身控制模块
- 照明控制系统

## 未来发展

随着自动驾驶技术的发展，大灯水平传感器将与更多智能系统集成，为未来的智能照明奠定基础。

这项先进技术的应用显著提升了驾驶安全性和舒适性。''',
        
        'Where Are Headlight Level Sensors Located in Different Car Brands?': '''# 不同汽车品牌的大灯水平传感器位置在哪里？

不同汽车制造商在设计车辆时，会根据各自的技术特点和设计理念来确定大灯水平传感器的安装位置。

## 主要汽车品牌传感器位置

### 德系品牌
**奔驰**：通常安装在前悬挂塔顶位置
**宝马**：多数车型将传感器置于前轴附近
**奥迪**：采用分布式设计，前后各有传感器
**大众**：标准位置在前悬挂下摆臂连接点

### 日系品牌
**丰田**：传感器位于前悬挂弹簧座附近
**本田**：安装在前副车架上
**日产**：采用前后双传感器配置
**马自达**：位于前悬挂支柱总成上

### 美系品牌
**福特**：传感器安装在前悬挂横梁上
**通用**：位于前轴差速器附近
**克莱斯勒**：采用集成式设计

## 定位方法

1. **查阅维修手册**：最准确的位置信息
2. **观察线束走向**：跟踪传感器连接线
3. **专业诊断设备**：使用扫描仪定位
4. **经验判断**：根据车型特点推断

## 维护注意事项

- 不同位置的传感器维护方法不同
- 注意保护传感器免受路面杂物损伤
- 定期检查安装支架的牢固性
- 清洁传感器表面以确保准确检测

了解传感器位置有助于更好地进行维护和故障诊断。''',
        
        'Where to Purchase Volkswagen Oil Level Sensors for Your Business': '''# 为您的企业采购大众汽车机油液位传感器的地方

为企业采购高质量的大众汽车机油液位传感器需要考虑多个因素，包括供应商可靠性、产品质量和成本效益。

## 主要采购渠道

### 官方渠道
**大众原厂配件**：质量保证，但价格较高
**授权经销商**：正品保障，服务完善
**官方在线商城**：便捷采购，价格透明

### 专业供应商
**汽配批发市场**：价格优势，选择丰富
**专业传感器制造商**：技术支持，定制服务
**在线B2B平台**：全球采购，价格比较

## 采购考虑因素

### 质量标准
- 符合大众技术规范
- 通过相关质量认证
- 具备完整的质量追溯体系

### 价格策略
- 批量采购折扣
- 长期合作优惠
- 季节性价格波动

### 服务支持
- 技术咨询服务
- 快速物流配送
- 售后服务保障

## 供应商评估

1. **资质认证**：检查供应商相关资质
2. **产品质量**：要求提供质量检测报告
3. **交付能力**：评估供应商的交付稳定性
4. **服务水平**：考察技术支持和售后服务

## 采购建议

- 建立多元化供应商体系
- 定期评估供应商绩效
- 保持适当的库存水平
- 关注市场价格趋势

选择合适的采购渠道和供应商对企业的长期发展至关重要。'''
    }
    
    chinese_title = title_translations.get(title, f'{title}（中文版）')
    chinese_summary = summary_translations.get(title, f'这是关于{title}的中文描述。本文详细介绍了相关技术和应用，为读者提供专业的技术指导和实用信息。')
    chinese_content = content_translations.get(title, f'# {chinese_title}\n\n这是{title}的中文版本。本文详细介绍了相关的技术原理、应用方法和实践经验，为读者提供全面的技术指导和实用信息。\n\n## 主要内容\n\n本文涵盖了以下几个方面：\n- 技术原理和工作机制\n- 实际应用和操作指南\n- 注意事项和最佳实践\n- 故障排除和维护建议\n\n通过阅读本文，您将获得关于该技术的全面了解和实用知识。')
    
    return chinese_title, chinese_summary, chinese_content

def main():
    """主函数"""
    try:
        # 获取数据库会话
        db = next(get_db())
        
        # 清空现有的新闻数据
        print("清空现有新闻数据...")
        db.query(News).delete()
        db.commit()
        
        # 确保有Technology分类
        category = db.query(NewsCategory).filter(NewsCategory.name == 'Technology').first()
        if not category:
            category = NewsCategory(name='Technology', name_zh='技术')
            db.add(category)
            db.commit()
            print("创建了Technology分类")
        
        # 获取markdown文件目录
        docs_dir = Path('../assets/file/docs')
        
        if not docs_dir.exists():
            print(f"错误：目录 {docs_dir} 不存在")
            return
        
        # 获取所有markdown文件
        md_files = list(docs_dir.glob('*.md'))
        
        if not md_files:
            print(f"在 {docs_dir} 中没有找到markdown文件")
            return
        
        print(f"找到 {len(md_files)} 个markdown文件")
        
        # 处理每个文件
        for md_file in md_files:
            print(f"处理文件: {md_file.name}")
            
            try:
                # 解析文件内容
                title, content, summary = parse_markdown_file(md_file)
                
                # 确保标题在300字符限制内
                if len(title) > 300:
                    title = title[:297] + '...'
                
                # 获取中文标题、摘要和内容
                chinese_title, chinese_summary, chinese_content = get_chinese_content(title, summary)
                
                # 获取发布日期
                publish_date_str = get_date_from_filename(md_file.name)
                publish_date = datetime.strptime(publish_date_str, '%Y-%m-%d').date()
                
                # 获取封面图片路径
                cover_image = get_cover_image_path(md_file.name)
                
                # 创建新闻记录 - 英文内容保存到普通字段，中文内容保存到_zh字段
                news = News(
                    title=title,  # 英文标题
                    title_zh=chinese_title,  # 中文标题
                    content=content,  # 英文内容
                    content_zh=chinese_content,  # 中文内容
                    summary=summary,  # 英文摘要
                    summary_zh=chinese_summary,  # 中文摘要
                    cover_image=cover_image,
                    author='GW-GoWorld',
                    category_id=category.id,
                    tags='automotive,sensors,technology',
                    view_count=0,
                    is_featured=False,
                    is_published=True,
                    publish_date=publish_date
                )
                
                db.add(news)
                print(f"  ✓ 添加文章: {title}")
                
            except Exception as e:
                print(f"  ✗ 处理文件 {md_file.name} 时出错: {e}")
                continue
        
        # 提交所有更改
        db.commit()
        
        # 显示结果
        total_news = db.query(News).count()
        print(f"\n成功导入 {total_news} 篇文章到数据库！")
        
        # 显示导入的文章列表
        print("\n导入的文章列表:")
        news_list = db.query(News).order_by(News.publish_date.desc()).all()
        for i, news in enumerate(news_list, 1):
            print(f"{i}. {news.title} (发布日期: {news.publish_date})")
    
    except Exception as e:
        print(f"导入过程中出错: {e}")
        import traceback
        traceback.print_exc()
    
    finally:
        if 'db' in locals():
            db.close()

if __name__ == "__main__":
    main()