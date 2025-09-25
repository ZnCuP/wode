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
        return [];
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
            <a href="#" class="product-link" data-translate="viewMore">View More</a>
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

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initProductsPage);

// 监听语言切换事件
document.addEventListener('languageChanged', handleLanguageChange);