/**
 * 产品页面动态数据加载
 */

// API基础URL - 从config.js获取
// 注意：确保config.js已经在此文件之前加载

// 当前语言
let productsCurrentLanguage = 'en';

/**
 * 获取产品数据
 */
async function fetchProducts() {
    try {
        const response = await fetch(`${window.API_BASE_URL}/products`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

/**
 * 获取分类数据
 */
async function fetchCategories() {
    try {
        const response = await fetch(`${window.API_BASE_URL}/categories`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const categories = await response.json();
        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        console.log('Using local categories data as fallback');
        return localCategoriesData;
    }
}

/**
 * 渲染产品卡片
 */
function renderProductCard(product) {
    const productName = productsCurrentLanguage === 'zh' ? product.name_zh : product.name;
    const productDescription = productsCurrentLanguage === 'zh' ? product.description_zh : product.description;
    
    return `
        <div class="product-card" data-product-id="${product.id}">
            <img src="${product.image_url}" alt="${productName}" onerror="this.src='../assets/temp.png'">
            <h3>${productName}</h3>
            <p>${productDescription}</p>
            ${product.price ? `<div class="product-price">$${product.price}</div>` : ''}
            ${product.sku ? `<div class="product-sku">SKU: ${product.sku}</div>` : ''}
            <button class="product-link view-more-btn" data-product-id="${product.id}" data-translate="viewMore">View More</button>
        </div>
    `;
}

/**
 * 渲染产品网格
 */
function renderProductsGrid(products) {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) {
        console.error('Products grid container not found');
        return;
    }

    if (products.length === 0) {
        productsGrid.innerHTML = '<p class="no-products">No products available</p>';
        return;
    }

    const productsHTML = products.map(product => renderProductCard(product)).join('');
    productsGrid.innerHTML = productsHTML;
}

/**
 * 创建分类过滤器
 */
function createCategoryFilter(categories) {
    const container = document.querySelector('.our-products-section .container');
    if (!container) return;

    // 检查是否已存在过滤器
    let filterContainer = document.querySelector('.category-filter');
    if (!filterContainer) {
        filterContainer = document.createElement('div');
        filterContainer.className = 'category-filter';
        
        // 在标题后插入过滤器
        const title = container.querySelector('h2');
        title.insertAdjacentElement('afterend', filterContainer);
    }

    // 创建过滤器按钮
    const allButton = `<button class="filter-btn active" data-category="all">All Products</button>`;
    const categoryButtons = categories.map(category => {
        const categoryName = productsCurrentLanguage === 'zh' ? category.name_zh : category.name;
        return `<button class="filter-btn" data-category="${category.id}">${categoryName}</button>`;
    }).join('');

    filterContainer.innerHTML = allButton + categoryButtons;

    // 添加过滤器事件监听
    filterContainer.addEventListener('click', handleCategoryFilter);
}

/**
 * 处理分类过滤
 */
async function handleCategoryFilter(event) {
    if (!event.target.classList.contains('filter-btn')) return;

    // 更新按钮状态
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const categoryId = event.target.dataset.category;
    
    try {
        let products;
        if (categoryId === 'all') {
            products = await fetchProducts();
        } else {
            const response = await fetch(`${API_BASE_URL}/products?category_id=${categoryId}`);
            products = await response.json();
        }
        renderProductsGrid(products);
    } catch (error) {
        console.error('Error filtering products:', error);
    }
}

/**
 * 初始化产品页面
 */
async function initProductsPage() {
    try {
        // 获取当前语言设置
        productsCurrentLanguage = localStorage.getItem('language') || 'en';
        
        // 并行获取产品和分类数据
        const [products, categories] = await Promise.all([
            fetchProducts(),
            fetchCategories()
        ]);

        // 渲染产品网格
        renderProductsGrid(products);

        // 创建分类过滤器
        createCategoryFilter(categories);

        console.log('Products page initialized successfully');
    } catch (error) {
        console.error('Error initializing products page:', error);
    }
}

/**
 * 语言切换处理
 */
function handleLanguageChange() {
    productsCurrentLanguage = localStorage.getItem('language') || 'en';
    // 重新初始化页面以更新语言
    initProductsPage();
}

// 本地产品数据（与product-detail.js保持一致）
const localProductsData = [
    {
        id: 1,
        name: "Oil Level Sensor",
        name_zh: "油位传感器",
        description: "High-precision oil level monitoring sensor for automotive applications",
        description_zh: "用于汽车应用的高精度油位监测传感器",
        image_url: "/assets/oil_level_sensor.png",
        sku: "OLS-001",
        category: "Sensors",
        category_zh: "传感器",
        specifications: {
            voltage: "12V DC",
            temperature: "-40°C to +85°C",
            protocol: "CAN Bus",
            certification: "ISO 9001"
        },
        features: [
            {
                icon: "⚡",
                title: "High Performance",
                title_zh: "高性能",
                description: "Advanced processing capabilities",
                description_zh: "先进的处理能力"
            },
            {
                icon: "🔧",
                title: "Easy Installation",
                title_zh: "易于安装",
                description: "Plug and play design",
                description_zh: "即插即用设计"
            },
            {
                icon: "🛡️",
                title: "Reliable",
                title_zh: "可靠性",
                description: "Tested for durability",
                description_zh: "经过耐久性测试"
            }
        ]
    },
    {
        id: 2,
        name: "Steering Angle Sensor",
        name_zh: "转向角度传感器",
        description: "High-precision steering wheel position sensor for vehicle stability control",
        description_zh: "高精度方向盘位置传感器，用于车辆稳定性控制",
        image_url: "/assets/steering_angle_sensor.png",
        sku: "SAS-002",
        category: "Sensors",
        category_zh: "传感器",
        specifications: {
            voltage: "24V DC",
            temperature: "-30°C to +70°C",
            protocol: "LIN Bus",
            certification: "ISO 14001"
        },
        features: [
            {
                icon: "🔄",
                title: "Smooth Operation",
                title_zh: "平稳运行",
                description: "Seamless gear transitions",
                description_zh: "无缝换挡过渡"
            },
            {
                icon: "💡",
                title: "Smart Control",
                title_zh: "智能控制",
                description: "Adaptive learning algorithms",
                description_zh: "自适应学习算法"
            },
            {
                icon: "🔒",
                title: "Secure",
                title_zh: "安全",
                description: "Built-in safety features",
                description_zh: "内置安全功能"
            }
        ]
    },
    {
        id: 3,
        name: "Height Level Sensor",
        name_zh: "高度水平传感器",
        description: "Precise height measurement sensor for vehicle suspension systems",
        description_zh: "用于车辆悬挂系统的精密高度测量传感器",
        image_url: "/assets/height_level_sensor.png",
        sku: "HLS-003",
        category: "Sensors",
        category_zh: "传感器",
        specifications: {
            voltage: "12V DC",
            temperature: "-40°C to +85°C",
            protocol: "CAN Bus",
            certification: "ECE R90"
        },
        features: [
            {
                icon: "🚗",
                title: "Vehicle Safety",
                title_zh: "车辆安全",
                description: "Prevents wheel lockup",
                description_zh: "防止车轮抱死"
            },
            {
                icon: "⚡",
                title: "Fast Response",
                title_zh: "快速响应",
                description: "Millisecond reaction time",
                description_zh: "毫秒级反应时间"
            },
            {
                icon: "🔧",
                title: "Maintenance Free",
                title_zh: "免维护",
                description: "Self-diagnostic capabilities",
                description_zh: "自诊断功能"
            }
        ]
    },
    {
        id: 4,
        name: "MAP Sensor",
        name_zh: "进气歧管压力传感器",
        description: "Manifold Absolute Pressure sensor for engine management",
        description_zh: "用于发动机管理的进气歧管绝对压力传感器",
        image_url: "/assets/oil_level_sensor.png",
        sku: "MAP-004",
        category: "Sensors",
        category_zh: "传感器",
        specifications: {
            voltage: "12V DC",
            temperature: "-40°C to +85°C",
            protocol: "CAN Bus",
            certification: "FMVSS 208"
        },
        features: [
            {
                icon: "🛡️",
                title: "Crash Protection",
                title_zh: "碰撞保护",
                description: "Multi-stage deployment",
                description_zh: "多级展开"
            },
            {
                icon: "📊",
                title: "Sensor Integration",
                title_zh: "传感器集成",
                description: "Multiple sensor inputs",
                description_zh: "多传感器输入"
            },
            {
                icon: "⚡",
                title: "Instant Response",
                title_zh: "瞬时响应",
                description: "Microsecond activation",
                description_zh: "微秒级激活"
            }
        ]
    },
    {
        id: 5,
        name: "Steering Angle Sensor",
        name_zh: "转向角度传感器",
        description: "High-precision steering wheel position sensor for vehicle stability control",
        description_zh: "高精度方向盘位置传感器，用于车辆稳定性控制",
        image_url: "/assets/steering_angle_sensor.png",
        sku: "SAS-001",
        category: "Sensors",
        category_zh: "传感器",
        specifications: {
            voltage: "5V DC",
            temperature: "-40°C to +125°C",
            protocol: "CAN Bus",
            certification: "ISO 26262"
        },
        features: [
            {
                icon: "🎯",
                title: "High Precision",
                title_zh: "高精度",
                description: "±0.1° accuracy",
                description_zh: "±0.1°精度"
            },
            {
                icon: "🔄",
                title: "360° Detection",
                title_zh: "360°检测",
                description: "Full rotation sensing",
                description_zh: "全旋转感应"
            },
            {
                icon: "⚡",
                title: "Fast Response",
                title_zh: "快速响应",
                description: "Real-time feedback",
                description_zh: "实时反馈"
            }
        ]
    },
    {
        id: 6,
        name: "Diesel Glow Plug Controller",
        name_zh: "柴油预热塞控制器",
        description: "Intelligent glow plug control module for diesel engine cold start",
        description_zh: "智能预热塞控制模块，用于柴油发动机冷启动",
        image_url: "/assets/diesel_glow_controller.png",
        sku: "DGPC-001",
        category: "Engine Control",
        category_zh: "发动机控制",
        specifications: {
            voltage: "12V DC",
            temperature: "-40°C to +85°C",
            protocol: "CAN Bus",
            certification: "ISO 9001"
        },
        features: [
            {
                icon: "🔥",
                title: "Smart Heating",
                title_zh: "智能加热",
                description: "Optimal temperature control",
                description_zh: "最佳温度控制"
            },
            {
                icon: "❄️",
                title: "Cold Start",
                title_zh: "冷启动",
                description: "Enhanced cold weather performance",
                description_zh: "增强低温性能"
            },
            {
                icon: "⚡",
                title: "Energy Efficient",
                title_zh: "节能",
                description: "Reduced power consumption",
                description_zh: "降低功耗"
            }
        ]
    },
    {
        id: 7,
        name: "DPF Sensor",
        name_zh: "DPF传感器",
        description: "Diesel Particulate Filter sensor for emission control monitoring",
        description_zh: "用于排放控制监测的柴油颗粒过滤器传感器",
        image_url: "/assets/DPF_sensor.png",
        sku: "DPF-007",
        category: "Sensors",
        category_zh: "传感器",
        specifications: {
            voltage: "12V DC",
            temperature: "-40°C to +850°C",
            protocol: "CAN Bus",
            certification: "Euro 6"
        },
        features: [
            {
                icon: "🌱",
                title: "Emission Control",
                title_zh: "排放控制",
                description: "Monitors particulate filter efficiency",
                description_zh: "监测颗粒过滤器效率"
            },
            {
                icon: "🔥",
                title: "High Temperature",
                title_zh: "高温",
                description: "Withstands extreme exhaust temperatures",
                description_zh: "承受极端排气温度"
            },
            {
                icon: "📊",
                title: "Real-time Data",
                title_zh: "实时数据",
                description: "Continuous monitoring and reporting",
                description_zh: "连续监测和报告"
            }
        ]
    }
];

// 技术规格标签的中英文映射
const specificationLabels = {
    voltage: { en: 'Voltage', zh: '电压' },
    temperature: { en: 'Temperature', zh: '温度' },
    protocol: { en: 'Protocol', zh: '协议' },
    certification: { en: 'Certification', zh: '认证' },
    pressure: { en: 'Pressure', zh: '压力' },
    frequency: { en: 'Frequency', zh: '频率' },
    current: { en: 'Current', zh: '电流' },
    power: { en: 'Power', zh: '功率' },
    material: { en: 'Material', zh: '材料' },
    weight: { en: 'Weight', zh: '重量' },
    dimensions: { en: 'Dimensions', zh: '尺寸' }
};

/**
 * 获取本地产品数据
 */
function getLocalProduct(productId) {
    return localProductsData.find(product => product.id === parseInt(productId));
}

/**
 * 渲染产品详情弹窗内容
 */
function renderProductModal(product) {
    const currentLanguage = localStorage.getItem('language') || 'en';
    
    const productName = currentLanguage === 'zh' ? product.name_zh : product.name;
    const productDescription = currentLanguage === 'zh' ? product.description_zh : product.description;
    const productCategory = currentLanguage === 'zh' ? product.category_zh : product.category;
    
    return `
        <div class="product-detail-container">
            <div class="loading" id="modal-loading" style="display: none;">
                Loading product details...
            </div>
            <div class="error" id="modal-error" style="display: none;">
                <h3>Error Loading Product</h3>
                <p>Unable to load product details. Please try again later.</p>
            </div>
            <div id="modal-product-content">
                <div class="product-header">
                    <img src="${product.image_url}" alt="${productName}" class="product-image" onerror="this.src='../assets/temp.png'">
                    <div class="product-info">
                        <h1 class="product-title">${productName}</h1>
                        <div class="product-sku">SKU: ${product.sku}</div>
                        <div class="product-category">${productCategory}</div>
                        <p class="product-description">${productDescription}</p>
                    </div>
                </div>
                
                <div class="product-specifications">
                    <h3 class="specifications-title">${currentLanguage === 'zh' ? '技术规格' : 'Technical Specifications'}</h3>
                    <div class="specifications-grid">
                        ${Object.entries(product.specifications).map(([key, value]) => {
                            const labelTranslation = specificationLabels[key.toLowerCase()];
                            const label = labelTranslation 
                                ? (currentLanguage === 'zh' ? labelTranslation.zh : labelTranslation.en)
                                : key.charAt(0).toUpperCase() + key.slice(1);
                            return `
                                <div class="spec-item">
                                    <span class="spec-label">${label}</span>
                                    <span class="spec-value">${value}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                
                <div class="product-features">
                    <h3 class="features-title">${currentLanguage === 'zh' ? '核心特性' : 'Key Features'}</h3>
                    <div class="features-grid">
                        ${product.features.map(feature => {
                            const featureTitle = currentLanguage === 'zh' ? feature.title_zh : feature.title;
                            const featureDescription = currentLanguage === 'zh' ? feature.description_zh : feature.description;
                            return `
                                <div class="feature-card">
                                    <span class="feature-icon">${feature.icon}</span>
                                    <h4 class="feature-title">${featureTitle}</h4>
                                    <p class="feature-description">${featureDescription}</p>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * 显示产品详情弹窗
 */
function showProductModal(productId) {
    const modal = document.getElementById('productModal');
    const modalBody = modal.querySelector('.modal-body');
    
    // 显示加载状态
    modalBody.innerHTML = '<div class="loading">Loading product details...</div>';
    modal.classList.add('show');
    
    // 禁用页面滚动
    document.body.style.overflow = 'hidden';
    
    // 获取产品数据
    const product = getLocalProduct(productId);
    
    if (product) {
        // 渲染产品详情
        modalBody.innerHTML = renderProductModal(product);
    } else {
        // 显示错误信息
        modalBody.innerHTML = `
            <div class="error">
                <h3>Product Not Found</h3>
                <p>The requested product could not be found.</p>
            </div>
        `;
    }
}

/**
 * 隐藏产品详情弹窗
 */
function hideProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('show');
    
    // 恢复页面滚动
    document.body.style.overflow = '';
}

/**
 * 初始化弹窗事件监听
 */
function initModalEvents() {
    // 监听View More按钮点击
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('view-more-btn')) {
            event.preventDefault();
            const productId = event.target.dataset.productId;
            showProductModal(productId);
        }
    });
    
    // 监听关闭按钮点击
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('close-modal')) {
            hideProductModal();
        }
    });
    
    // 监听弹窗背景点击
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('product-modal')) {
            hideProductModal();
        }
    });
    
    // 监听ESC键
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modal = document.getElementById('productModal');
            if (modal.classList.contains('show')) {
                hideProductModal();
            }
        }
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 延迟初始化以确保common.js中的语言切换功能先初始化
    setTimeout(() => {
        initProductsPage();
        initModalEvents();
    }, 150); // 比common.js的100ms稍晚一点
});

// 监听语言切换事件
document.addEventListener('languageChanged', handleLanguageChange);