// 双语支持系统 - 简化版本
const translations = {
    en: {
        // 导航菜单
        home: "Home",
        about: "About",
        goWorldProfile: "Go-World Profile",
        rdEquipment: "R&D and Equipment",
        products: "Products",
        news: "News",
        support: "Support",
        faqs: "FAQs",
        videos: "Videos",
        contactUs: "Contact us",
        
        // 首页内容
        salesWorldwide: "Sales Worldwide",
        featuredProducts: "Featured Products",
        viewMore: "VIEW MORE",
        goWorldInfo: "GO-WORLD INFORMATION",
        companyDescription: "Ningde Go-World Auto Spare Parts Co., LTD., located in Fu'an city, Fujian province, China.",
        productDescription: "It is a professional manufacture specialized in emission control system and engine management system, like MAP sensor (Intake air pressure sensor), oil level sensor, DPF Sensor (Exhaust pressure sensor), EGT Sensor (Exhaust gas temperature sensor), steering angle sensor and Glow Plug Controller.",
        learnMoreAboutUs: "Learn More About Us",
        rdEquipmentLink: "R&D Equipment",
        latestNews: "Latest News",
        latestNewsDesc: "Stay updated with our latest product developments and industry insights",
        readMore: "Read More",
        lookingForward: "Looking Forward To Your Response",
        contactInfo: "For More Information and Favorable Price, Please Contact Us!",
        submitBtn: "Submit",
        
        // 产品相关
        weHaveWhatYouLooking: "WE HAVE WHAT YOU ARE LOOKING FOR",
        ourProducts: "Our Products",
        oilLevelSensor: "OIL LEVEL SENSOR",
        mapSensor: "MAP SENSOR",
        heightLevelSensor: "HEIGHT LEVEL SENSOR",
        dpfSensor: "DPF SENSOR",
        
        // 表单字段
        name: "Name",
        corporateName: "Corporate Name",
        telephone: "Telephone",
        email: "Email",
        message: "Message"
    },
    
    zh: {
        // 导航菜单
        home: "首页",
        about: "关于我们",
        goWorldProfile: "公司简介",
        rdEquipment: "研发设备",
        products: "产品中心",
        news: "新闻资讯",
        support: "技术支持",
        faqs: "常见问题",
        videos: "视频中心",
        contactUs: "联系我们",
        
        // 首页内容
        salesWorldwide: "全球销售",
        featuredProducts: "特色产品",
        viewMore: "查看详情",
        goWorldInfo: "公司信息",
        companyDescription: "宁德高世界汽车配件有限公司，位于中国福建省福安市。",
        productDescription: "是一家专业从事排放控制系统和发动机管理系统制造的企业，主要产品包括MAP传感器（进气压力传感器）、油位传感器、DPF传感器（废气压力传感器）、EGT传感器（废气温度传感器）、转向角传感器和辉光塞控制器。",
        learnMoreAboutUs: "了解更多关于我们",
        rdEquipmentLink: "研发设备",
        latestNews: "最新资讯",
        latestNewsDesc: "了解我们的最新产品动态和行业资讯",
        readMore: "阅读更多",
        lookingForward: "期待您的回复",
        contactInfo: "如需更多信息和优惠价格，请联系我们！",
        submitBtn: "提交",
        
        // 产品相关
        weHaveWhatYouLooking: "我们拥有您所需要的产品",
        ourProducts: "我们的产品",
        oilLevelSensor: "油位传感器",
        mapSensor: "MAP传感器",
        heightLevelSensor: "高度水平传感器",
        dpfSensor: "DPF传感器",
        
        // 表单字段
        name: "姓名",
        corporateName: "公司名称",
        telephone: "电话",
        email: "邮箱",
        message: "留言"
    }
};

// 当前语言状态
let currentLanguage = localStorage.getItem('language') || 'en';

// 语言切换功能
function initLanguageSwitcher() {
    const langToggle = document.getElementById('langToggle');
    const currentLangSpan = document.getElementById('currentLang');
    
    if (langToggle && currentLangSpan) {
        // 设置初始语言显示
        currentLangSpan.textContent = currentLanguage.toUpperCase();
        
        // 语言切换事件
        langToggle.addEventListener('click', function(e) {
            e.preventDefault();
            currentLanguage = currentLanguage === 'en' ? 'zh' : 'en';
            localStorage.setItem('language', currentLanguage);
            currentLangSpan.textContent = currentLanguage.toUpperCase();
            
            // 切换页面语言
            switchLanguage(currentLanguage);
        });
    }
}

// 切换页面语言
function switchLanguage(lang) {
    const translation = translations[lang];
    if (!translation) return;
    
    // 更新所有带有 data-translate 属性的元素
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translation[key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation[key];
            } else {
                element.textContent = translation[key];
            }
        }
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        try {
            initLanguageSwitcher();
            switchLanguage(currentLanguage);
        } catch (error) {
            console.error('Language initialization error:', error);
        }
    }, 500);
});