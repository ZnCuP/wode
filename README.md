# GW-GoWorld 网站

这是一个基于纯HTML/CSS的响应式网站，包含多个页面和公共组件系统。

## 文件结构

```
/
├── index.html          # 首页
├── products.html       # 产品页面
├── faq.html           # 常见问题页面
├── videos.html        # 视频页面
├── contact.html       # 联系我们页面
├── style.css          # 主要样式文件
├── server.py          # 本地测试服务器
├── includes/          # 公共组件目录
│   ├── header.html    # 公共头部
│   └── footer.html    # 公共底部
├── js/                # JavaScript文件
│   └── common.js      # 公共组件加载脚本
└── assets/            # 资源文件目录（图片等）
```

## Go-World Auto Spare Parts Website

一个专业的汽车零部件公司网站，采用纯 HTML/CSS/JavaScript 开发，支持中英文双语切换和响应式设计。

## 🌟 特性

- 📱 **响应式设计** - 完美适配桌面端、平板和移动设备
- 🌐 **双语支持** - 支持中文和英文切换
- 🎨 **现代化界面** - 简洁美观的用户界面
- ⚡ **纯静态** - 无需服务器端处理，加载速度快
- 🔧 **易于维护** - 模块化的代码结构

## 📁 项目结构

```
wode/
├── pages/          # 页面文件
│   ├── index.html  # 主页
│   ├── faq.html    # 常见问题
│   ├── rd-equipment.html  # 研发设备
│   └── ...
├── styles/         # 样式文件
│   ├── css/
│   │   ├── common.css    # 公共样式
│   │   └── language.css  # 语言样式
│   └── ...
├── scripts/        # JavaScript 文件
│   └── js/
│       ├── common.js     # 公共脚本
│       └── language.js   # 语言切换
├── assets/         # 静态资源
│   ├── images/     # 图片文件
│   └── videos/     # 视频文件
└── templates/      # 模板文件
    └── includes/   # 公共组件
```

## 🚀 部署

### GitHub Pages 自动部署

这个项目配置了 GitHub Actions，当你推送代码到 `main` 分支时会自动部署到 GitHub Pages。

#### 设置步骤：

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **启用 GitHub Pages**
   - 进入你的 GitHub 仓库
   - 点击 Settings
   - 找到 Pages 设置
   - Source 选择 "GitHub Actions"

3. **查看部署状态**
   - 进入仓库的 Actions 标签页
   - 查看部署进度

4. **访问网站**
   - 部署完成后，你的网站将在以下地址可用：
   - `https://你的用户名.github.io/仓库名`

### 本地开发

```bash
# 启动本地服务器
python3 -m http.server 8000

# 或者使用 Python 2
python -m SimpleHTTPServer 8000

# 在浏览器中访问
open http://localhost:8000
```

## 🛠 开发

### 添加新页面

1. 在 `pages/` 目录下创建新的 HTML 文件
2. 在 `scripts/js/language.js` 中添加对应的翻译文本
3. 更新导航菜单

### 修改样式

- 公共样式：编辑 `styles/css/common.css`
- 语言相关样式：编辑 `styles/css/language.css`

### 添加翻译

在 `scripts/js/language.js` 的 `translations` 对象中添加新的翻译项：

```javascript
const translations = {
    en: {
        newKey: "English Text"
    },
    zh: {
        newKey: "中文文本"
    }
};
```

## 📧 联系方式

- **电话**: +86-0593-2828185
- **微信/电话**: +86-17305077030, +86-15060895862
- **邮箱**: sales@go-world.cn, sales5@go-world.cn, info@go-world.cn
- **地址**: 福建省宁德市福安市甘棠镇上塘工业区

## 📄 许可证

© 2024 Go-World Auto Spare Parts. All rights reserved.

## 本地运行

### 方法1：使用Python服务器（推荐）
```bash
python3 server.py
```
然后在浏览器中访问 `http://localhost:8000`

### 方法2：直接打开HTML文件
由于使用了公共组件加载，建议使用HTTP服务器运行以避免跨域问题。

## 公共组件系统

网站使用了组件化设计：

- **头部组件** (`includes/header.html`) - 包含导航菜单
- **底部组件** (`includes/footer.html`) - 包含联系信息和链接
- **JavaScript加载器** (`js/common.js`) - 动态加载公共组件

### 备用方案
如果无法加载外部组件文件，系统会自动使用内置的备用内容，确保网站正常显示。

## 页面说明

1. **首页 (index.html)** - 展示公司信息、产品特色和联系表单
2. **产品页面 (products.html)** - 产品展示和搜索功能
3. **FAQ页面 (faq.html)** - 常见问题，带手风琴展开效果
4. **视频页面 (videos.html)** - 产品视频展示
5. **联系页面 (contact.html)** - 公司认证和联系信息

## 移动端适配

所有页面都包含了移动端适配：
- 响应式布局
- 移动端导航菜单
- 触摸友好的交互元素
- 合适的字体大小和间距

## 注意事项

1. 图片文件需要放在 `assets/` 目录中
2. 修改公共组件后，所有页面会自动更新
3. 确保JavaScript启用以正常加载公共组件
4. 建议使用现代浏览器以获得最佳体验# wode

启动方式：python3 start_app.py --host localhost --port 8001