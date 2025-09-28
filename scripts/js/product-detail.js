/**
 * 产品详情页JavaScript逻辑
 */

// 当前语言
let productDetailCurrentLanguage = 'en';

// 本地产品数据（与products.js保持一致）
const localProductsData = [
    {
        id: 1,
        category_id: 1,
        name: "Oil Level Sensor",
        name_zh: "油位传感器",
        description: "Precision oil level detection for automotive applications",
        description_zh: "汽车应用的精密油位检测",
        image_url: "/assets/oil_level_sensor.png",
        sku: "OLS-001",
        category: "Sensors",
        category_zh: "传感器",
        features: [
            {
                title: "High Precision",
                title_zh: "高精度",
                description: "Accurate oil level measurement with ±2% precision",
                description_zh: "精确的油位测量，精度达±2%",
                icon: "🎯"
            },
            {
                title: "Durable Design",
                title_zh: "耐用设计",
                description: "Resistant to extreme temperatures and vibrations",
                description_zh: "耐极端温度和振动",
                icon: "🛡️"
            },
            {
                title: "Easy Installation",
                title_zh: "易于安装",
                description: "Simple plug-and-play installation process",
                description_zh: "简单的即插即用安装过程",
                icon: "🔧"
            }
        ]
    },
    {
        id: 2,
        category_id: 1,
        name: "MAP Sensor",
        name_zh: "MAP传感器",
        description: "Manifold Absolute Pressure sensors for engine management",
        description_zh: "用于发动机管理的歧管绝对压力传感器",
        image_url: "/assets/steering_angle_sensor.png",
        sku: "MAP-001",
        category: "Sensors",
        category_zh: "传感器",
        features: [
            {
                title: "Engine Optimization",
                title_zh: "发动机优化",
                description: "Optimizes fuel injection and ignition timing",
                description_zh: "优化燃油喷射和点火时机",
                icon: "⚡"
            },
            {
                title: "Real-time Monitoring",
                title_zh: "实时监控",
                description: "Continuous pressure monitoring for optimal performance",
                description_zh: "持续压力监控以获得最佳性能",
                icon: "📊"
            },
            {
                title: "Universal Compatibility",
                title_zh: "通用兼容性",
                description: "Compatible with most automotive engine systems",
                description_zh: "与大多数汽车发动机系统兼容",
                icon: "🔄"
            }
        ]
    },
    {
        id: 3,
        category_id: 1,
        name: "Height Level Sensor",
        name_zh: "高度传感器",
        description: "Vehicle height adjustment and leveling systems",
        description_zh: "车辆高度调节和水平系统",
        image_url: "/assets/height_level_sensor.png",
        sku: "HLS-001",
        category: "Sensors",
        category_zh: "传感器",
        features: [
            {
                title: "Automatic Leveling",
                title_zh: "自动调平",
                description: "Maintains optimal vehicle height automatically",
                description_zh: "自动保持最佳车辆高度",
                icon: "📏"
            },
            {
                title: "Load Compensation",
                title_zh: "负载补偿",
                description: "Adjusts for varying load conditions",
                description_zh: "根据不同负载条件进行调整",
                icon: "⚖️"
            },
            {
                title: "Enhanced Stability",
                title_zh: "增强稳定性",
                description: "Improves vehicle stability and handling",
                description_zh: "提高车辆稳定性和操控性",
                icon: "🎯"
            }
        ]
    },
    {
        id: 4,
        category_id: 1,
        name: "DPF Sensor",
        name_zh: "DPF传感器",
        description: "Diesel Particulate Filter monitoring sensor",
        description_zh: "柴油颗粒过滤器监测传感器",
        image_url: "/assets/DPF_sensor.png",
        sku: "DPF-001",
        category: "Sensors",
        category_zh: "传感器",
        features: [
            {
                title: "Emission Control",
                title_zh: "排放控制",
                description: "Monitors and controls diesel particulate emissions",
                description_zh: "监控和控制柴油颗粒排放",
                icon: "🌱"
            },
            {
                title: "Filter Efficiency",
                title_zh: "过滤效率",
                description: "Ensures optimal DPF regeneration cycles",
                description_zh: "确保最佳DPF再生周期",
                icon: "🔄"
            },
            {
                title: "Compliance Ready",
                title_zh: "合规就绪",
                description: "Meets latest emission standards and regulations",
                description_zh: "符合最新排放标准和法规",
                icon: "✅"
            }
        ]
    },
    {
        id: 5,
        category_id: 1,
        name: "Steering Angle Sensor",
        name_zh: "转向角度传感器",
        description: "High-precision steering wheel position sensor for vehicle stability control",
        description_zh: "用于车辆稳定性控制的高精度方向盘位置传感器",
        image_url: "/assets/steering_angle_sensor.png",
        sku: "SAS-001",
        category: "Sensors",
        category_zh: "传感器",
        features: [
            {
                title: "Precision Tracking",
                title_zh: "精确跟踪",
                description: "Accurate steering angle measurement with 0.1° resolution",
                description_zh: "精确的转向角度测量，分辨率达0.1°",
                icon: "🎯"
            },
            {
                title: "Safety Systems",
                title_zh: "安全系统",
                description: "Essential for ESP, ABS, and stability control systems",
                description_zh: "ESP、ABS和稳定性控制系统的必备组件",
                icon: "🛡️"
            },
            {
                title: "Fast Response",
                title_zh: "快速响应",
                description: "Ultra-fast signal processing for real-time control",
                description_zh: "超快信号处理，实现实时控制",
                icon: "⚡"
            }
        ]
    },
    {
        id: 6,
        category_id: 1,
        name: "Diesel Glow Plug Controller",
        name_zh: "柴油预热塞控制器",
        description: "Intelligent glow plug control module for diesel engine cold start",
        description_zh: "柴油发动机冷启动的智能预热塞控制模块",
        image_url: "/assets/diesel_glow_controller.png",
        sku: "DCPC-001",
        category: "Controllers",
        category_zh: "控制器",
        features: [
            {
                title: "Smart Control",
                title_zh: "智能控制",
                description: "Intelligent preheating cycle optimization",
                description_zh: "智能预热循环优化",
                icon: "🧠"
            },
            {
                title: "Cold Start Performance",
                title_zh: "冷启动性能",
                description: "Ensures reliable cold weather engine starting",
                description_zh: "确保寒冷天气下发动机可靠启动",
                icon: "❄️"
            },
            {
                title: "Energy Efficient",
                title_zh: "节能高效",
                description: "Optimized power consumption and heating cycles",
                description_zh: "优化功耗和加热循环",
                icon: "🔋"
            }
        ]
    }
];

/**
 * 获取URL参数
 */
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

/**
 * 获取产品数据
 */
async function fetchProductById(productId) {
    try {
        // 尝试从API获取数据
        const response = await fetch(`${window.API_BASE_URL}/products/${productId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const product = await response.json();
        return product;
    } catch (error) {
        console.error('Error fetching product from API, using local data:', error);
        // 如果API不可用，从本地数据获取
        return localProductsData.find(p => p.id == productId);
    }
}

/**
 * 渲染产品详情
 */
function renderProductDetail(product) {
    if (!product) {
        showError();
        return;
    }

    // 获取当前语言的产品信息
    const productName = productDetailCurrentLanguage === 'zh' ? product.name_zh : product.name;
    const productDescription = productDetailCurrentLanguage === 'zh' ? product.description_zh : product.description;
    const productCategory = productDetailCurrentLanguage === 'zh' ? product.category_zh : product.category;

    // 更新页面标题
    document.title = productName;

    // 更新产品信息
    document.getElementById('product-image').src = product.image_url;
    document.getElementById('product-image').alt = productName;
    document.getElementById('product-title').textContent = productName;
    document.getElementById('product-sku').textContent = `SKU: ${product.sku}`;
    document.getElementById('product-description').textContent = productDescription;
    document.getElementById('product-category').textContent = productCategory;
    document.getElementById('product-sku-spec').textContent = product.sku;

    // 渲染产品特性
    renderProductFeatures(product.features || []);

    // 显示产品内容，隐藏加载状态
    document.getElementById('loading').style.display = 'none';
    document.getElementById('product-content').style.display = 'block';
}

/**
 * 渲染产品特性
 */
function renderProductFeatures(features) {
    const featuresGrid = document.getElementById('features-grid');
    featuresGrid.innerHTML = '';

    features.forEach(feature => {
        const featureTitle = productDetailCurrentLanguage === 'zh' ? feature.title_zh : feature.title;
        const featureDescription = productDetailCurrentLanguage === 'zh' ? feature.description_zh : feature.description;

        const featureCard = document.createElement('div');
        featureCard.className = 'feature-card';
        featureCard.innerHTML = `
            <div class="feature-icon">${feature.icon}</div>
            <h4 class="feature-title">${featureTitle}</h4>
            <p class="feature-description">${featureDescription}</p>
        `;
        featuresGrid.appendChild(featureCard);
    });
}

/**
 * 显示错误信息
 */
function showError() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('error').style.display = 'block';
}

/**
 * 处理语言切换
 */
function handleLanguageChange() {
    // 获取当前语言
    productDetailCurrentLanguage = localStorage.getItem('language') || 'en';
    
    // 重新初始化页面
    initProductDetailPage();
}

/**
 * 初始化产品详情页
 */
async function initProductDetailPage() {
    // 获取产品ID
    const productId = getUrlParameter('id');
    
    if (!productId) {
        showError();
        return;
    }

    try {
        // 获取产品数据
        const product = await fetchProductById(productId);
        
        // 渲染产品详情
        renderProductDetail(product);
    } catch (error) {
        console.error('Error initializing product detail page:', error);
        showError();
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initProductDetailPage);

// 监听语言切换事件
document.addEventListener('languageChanged', handleLanguageChange);