// 简单的内存缓存，避免同一组件重复解析
const componentCache = new Map();

// 公共组件加载函数
async function loadComponent(file, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        return;
    }

    try {
        if (componentCache.has(file)) {
            container.innerHTML = componentCache.get(file);
            return;
        }

        const response = await fetch(file, { cache: 'force-cache' });
        if (!response.ok) {
            throw new Error(`Failed to fetch ${file}: ${response.status}`);
        }

        const html = await response.text();
        componentCache.set(file, html);
        container.innerHTML = html;
    } catch (error) {
        console.error('Error loading component:', error);
        // 如果无法加载，显示错误信息或使用备用内容
        loadFallback(containerId);
    }
}

// 备用内容函数（在无法加载外部文件时使用）
function loadFallback(containerId) {
    if (containerId === 'header-container' || containerId === 'header-placeholder') {
        document.getElementById(containerId).innerHTML = `
            <header>
                <div class="container">
                    <div class="header-left">
                        <a href="index" class="logo">
                            <img src="/assets/logo.png" alt="GW-GoWorld" class="logo-img">
                        </a>
                    </div>
                    
                    <div class="header-right">
                        <!-- 移动端汉堡包菜单按钮 -->
                        <button class="mobile-menu-toggle" id="mobileMenuToggle">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        
                        <nav>
                            <ul id="mobileMenu">
                                <li><a href="index" data-translate="home">Home</a></li>
                                <li class="dropdown">
                                    <a href="#" class="dropbtn" data-translate="about">About</a>
                                    <div class="dropdown-menu">
                                        <a href="profile" data-translate="goWorldProfile">Go-World Profile</a>
                                        <a href="rd-equipment" data-translate="rdEquipment">R&D and Equipment</a>
                                    </div>
                                </li>
                                <li><a href="products" data-translate="products">Products</a></li>
                                <li><a href="news" data-translate="news">News</a></li>
                                <li class="dropdown">
                                    <a href="#" class="dropbtn" data-translate="support">Support</a>
                                    <div class="dropdown-menu">
                                        <a href="faq" data-translate="faqs">FAQs</a>
                                        <a href="videos" data-translate="videos">Videos</a>
                                    </div>
                                </li>
                                <li><a href="contact" data-translate="contactUs">Contact us</a></li>
                                <li class="language-nav">
                                    <button class="language-toggle" id="langToggle">
                                        <span id="currentLang">EN</span>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        `;
    } else if (containerId === 'footer-container' || containerId === 'footer-placeholder') {
        document.getElementById(containerId).innerHTML = `
            <footer>
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-section">
                            <h3 data-translate="contactTitle">Contact</h3>
                            <p>📧 Email: info@goworld.com</p>
                            <p>📞 Phone: +86 123 4567 8900</p>
                            <p>📍 Address: 123 Innovation Road, Tech City</p>
                        </div>
                        <div class="footer-section">
                            <h3 data-translate="products">Products</h3>
                            <ul>
                                <li><a href="products" data-translate="mapSensor">MAP Sensor</a></li>
                                <li><a href="products" data-translate="oilLevelSensor">Oil Level Sensor</a></li>
                                <li><a href="products">Temperature Sensor</a></li>
                            </ul>
                        </div>
                        <div class="footer-section">
                            <h3 data-translate="support">Support</h3>
                            <ul>
                                <li><a href="faq" data-translate="faqs">FAQ</a></li>
                                <li><a href="videos" data-translate="videos">Videos</a></li>
                                <li><a href="contact" data-translate="contactUs">Contact us</a></li>
                            </ul>
                        </div>
                        <div class="footer-section">
                            <h3 data-translate="followUs">Follow Us</h3>
                            <div class="social-links">
                                <a href="#" title="Facebook">📘</a>
                                <a href="#" title="Twitter">🐦</a>
                                <a href="#" title="LinkedIn">💼</a>
                                <a href="#" title="WeChat">💬</a>
                            </div>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>&copy; 2024 GW-GoWorld. <span data-translate="allRightsReserved">All rights reserved</span>.</p>
                    </div>
                </div>
            </footer>
        `;
    }
}

// 移动端菜单切换功能
function initMobileMenu() {
    let mobileMenuToggle = document.getElementById('mobileMenuToggle');
    let mobileMenu = document.getElementById('mobileMenu');
    const headerRight = document.querySelector('header .header-right');
    if (!mobileMenuToggle && headerRight) {
        const newToggle = document.createElement('button');
        newToggle.className = 'mobile-menu-toggle';
        newToggle.id = 'mobileMenuToggle';
        newToggle.type = 'button';
        newToggle.setAttribute('aria-label', 'Toggle navigation');
        for (let i = 0; i < 3; i += 1) {
            newToggle.appendChild(document.createElement('span'));
        }
        headerRight.insertBefore(newToggle, headerRight.firstChild);
        mobileMenuToggle = newToggle;
        mobileMenu = document.getElementById('mobileMenu');
    }
    const glassOverlay = document.getElementById('glassOverlay');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // 控制液态玻璃遮罩
            if (glassOverlay) {
                glassOverlay.classList.toggle('active');
                
                // 当遮罩打开时，更新遮罩内语言切换按钮的状态
                if (glassOverlay.classList.contains('active')) {
                    const overlayLangToggle = document.getElementById('overlayLangToggle');
                    if (overlayLangToggle) {
                        const currentLang = localStorage.getItem('language') || 'en';
                        if (currentLang === 'zh') {
                            overlayLangToggle.classList.add('zh');
                        } else {
                            overlayLangToggle.classList.remove('zh');
                        }
                    }
                }
            }
            
            // 防止背景滚动
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // 点击遮罩关闭菜单
        if (glassOverlay) {
            glassOverlay.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                glassOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // 点击菜单项后关闭菜单（排除父级导航链接）
        const menuItems = mobileMenu.querySelectorAll('a:not(.parent-nav-link)');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                if (glassOverlay) {
                    glassOverlay.classList.remove('active');
                }
                document.body.style.overflow = '';
            });
        });
        
        // 初始化导航替换功能
        initNavigationReplacement();
    }
}

// 导航替换功能
function initNavigationReplacement() {
    const parentNavLinks = document.querySelectorAll('.parent-nav-link');
    const overlayNavMenu = document.querySelector('.overlay-nav-menu');
    let originalNavItems = null;
    
    // 定义子菜单数据
    const subMenus = {
        about: [
            { href: 'profile', key: 'goWorldProfile', text: 'Go-World Profile' },
            { href: 'rd-equipment', key: 'rdEquipment', text: 'R&D and Equipment' }
        ],
        support: [
            { href: 'faq', key: 'faqs', text: 'FAQs' },
            { href: 'videos', key: 'videos', text: 'Videos' }
        ]
    };
    
    // 父级导航点击事件
    parentNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // 阻止事件冒泡
            const submenuType = this.getAttribute('data-submenu');
            showSubMenu(submenuType);
        });
    });
    
    // 显示子菜单
    function showSubMenu(submenuType) {
        if (!overlayNavMenu || !subMenus[submenuType]) return;
        
        // 保存原始导航项（如果还没保存）
        if (!originalNavItems) {
            originalNavItems = overlayNavMenu.innerHTML;
        }
        
        // 创建子菜单HTML
        const subMenuItems = subMenus[submenuType];
        let subMenuHTML = '';
        
        // 添加子菜单项
        subMenuItems.forEach(item => {
            subMenuHTML += `
                <li class="overlay-nav-item">
                    <a href="${item.href}" class="overlay-nav-link" data-translate="${item.key}">${item.text}</a>
                </li>
            `;
        });
        
        // 添加返回按钮（在第三个位置）
        subMenuHTML += `
            <li class="overlay-nav-item">
                <button class="back-button-nav" id="backButtonNav">
                    <span class="back-arrow">◀</span>
                </button>
            </li>
        `;
        
        // 替换导航内容
        overlayNavMenu.innerHTML = subMenuHTML;
        
        // 绑定返回按钮事件
        const backButton = document.getElementById('backButtonNav');
        if (backButton) {
            backButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation(); // 阻止事件冒泡
                showMainMenu();
            });
        }
        
        // 绑定子菜单项点击关闭事件
        const subMenuLinks = overlayNavMenu.querySelectorAll('a');
        subMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                const mobileMenuToggle = document.getElementById('mobileMenuToggle');
                const mobileMenu = document.getElementById('mobileMenu');
                const glassOverlay = document.getElementById('glassOverlay');
                
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                if (glassOverlay) {
                    glassOverlay.classList.remove('active');
                }
                document.body.style.overflow = '';
                
                // 注意：这里不调用showMainMenu()，因为遮罩已经关闭，用户将跳转到新页面
            });
        });
    }
    
    // 显示主导航
     function showMainMenu() {
         if (!overlayNavMenu || !originalNavItems) return;
         
         // 恢复原始导航
         overlayNavMenu.innerHTML = originalNavItems;
         
         // 重新初始化导航替换功能
         initNavigationReplacement();
     }
}

// 底部下拉菜单功能
function initFooterDropdowns() {
    const footerDropdowns = document.querySelectorAll('.footer-dropdown');
    
    footerDropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        const menu = dropdown.querySelector('.footer-dropdown-menu');
        
        if (trigger && menu) {
            trigger.addEventListener('click', function() {
                // 切换当前下拉菜单
                dropdown.classList.toggle('active');
                
                // 关闭其他下拉菜单（可选，保持只有一个展开）
                footerDropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
            });
        }
    });
}

// 滚动时的头部样式变化
function initScrollHeader() {
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// 添加页面动画
function initPageAnimations() {
    // 观察器，当元素进入视口时添加动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // 为所有需要动画的元素添加观察
    const animatedElements = document.querySelectorAll('.news-card, .feature-card, .service-item, .accordion, .video-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 页面加载完成后初始化所有功能
document.addEventListener('DOMContentLoaded', async function() {
    const componentPromises = [];

    const headerTargets = ['header-container', 'header-placeholder'];
    headerTargets.forEach(id => {
        if (document.getElementById(id)) {
            componentPromises.push(loadComponent('../templates/includes/header.html', id));
        }
    });

    const footerTargets = ['footer-container', 'footer-placeholder'];
    footerTargets.forEach(id => {
        if (document.getElementById(id)) {
            componentPromises.push(loadComponent('../templates/includes/footer.html', id));
        }
    });

    await Promise.all(componentPromises);

    const runInitializers = () => {
        initMobileMenu();
        initScrollHeader();
        initPageAnimations();
        initSmoothScroll();
        initFooterDropdowns();

        if (typeof initLanguageSwitcher === 'function') {
            initLanguageSwitcher();
        }
        if (typeof switchLanguage === 'function') {
            const currentLang = localStorage.getItem('language') || 'en';
            switchLanguage(currentLang);
        }

        initHistoryYearSwitcher();
        enhanceDropdownMenus();
    };

    if ('requestIdleCallback' in window) {
        requestIdleCallback(runInitializers, { timeout: 500 });
    } else {
        setTimeout(runInitializers, 0);
    }
});

// Corporate History年份切换功能
function initHistoryYearSwitcher() {
    const yearItems = document.querySelectorAll('.year-item');
    
    yearItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有active类
            yearItems.forEach(year => year.classList.remove('active'));
            // 给当前点击的年份添加active类
            this.classList.add('active');
            
            // 这里可以根据不同年份显示不同内容
            const selectedYear = this.getAttribute('data-year');
            updateHistoryContent(selectedYear);
        });
    });
}

// 根据选中年份更新右侧内容
function updateHistoryContent(year) {
    const historyEvent = document.querySelector('.history-event');
    const historyDescription = document.querySelector('.history-description');
    
    if (historyEvent && historyDescription) {
        // 更新data-translate属性
        historyEvent.setAttribute('data-translate', `historyEvent${year}`);
        historyDescription.setAttribute('data-translate', `historyDescription${year}`);
        
        // 立即应用当前语言的翻译
        if (typeof switchLanguage === 'function') {
            const currentLang = localStorage.getItem('language') || 'en';
            // 获取翻译文本
            if (typeof translations !== 'undefined' && translations[currentLang]) {
                const eventKey = `historyEvent${year}`;
                const descKey = `historyDescription${year}`;
                
                if (translations[currentLang][eventKey]) {
                    historyEvent.textContent = translations[currentLang][eventKey];
                }
                if (translations[currentLang][descKey]) {
                    historyDescription.textContent = translations[currentLang][descKey];
                }
            }
        }
    }
}

// 改善下拉菜单用户体验
function enhanceDropdownMenus() {
    const dropdowns = document.querySelectorAll('.dropdown');
    let hideTimeout;
    
    dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (menu) {
            // 鼠标进入dropdown时显示菜单
            dropdown.addEventListener('mouseenter', function() {
                clearTimeout(hideTimeout);
                menu.style.display = 'block';
                // 小延迟后添加opacity和transform
                setTimeout(() => {
                    menu.style.opacity = '1';
                    menu.style.transform = 'translateX(-50%) translateY(0) scale(1)';
                }, 10);
            });
            
            // 鼠标离开dropdown时延迟隐藏菜单
            dropdown.addEventListener('mouseleave', function() {
                hideTimeout = setTimeout(() => {
                    menu.style.opacity = '0';
                    menu.style.transform = 'translateX(-50%) translateY(-10px) scale(0.95)';
                    // 动画完成后隐藏
                    setTimeout(() => {
                        menu.style.display = 'none';
                    }, 350);
                }, 200); // 200ms延迟
            });
            
            // 鼠标进入菜单时取消隐藏
            menu.addEventListener('mouseenter', function() {
                clearTimeout(hideTimeout);
            });
            
            // 鼠标离开菜单时延迟隐藏
            menu.addEventListener('mouseleave', function() {
                hideTimeout = setTimeout(() => {
                    menu.style.opacity = '0';
                    menu.style.transform = 'translateX(-50%) translateY(-10px) scale(0.95)';
                    setTimeout(() => {
                        menu.style.display = 'none';
                    }, 350);
                }, 200);
            });
        }
    });
}