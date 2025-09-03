// 双语支持系统 - 简化版本
const translations = {
    en: {
        // 网站名称
        siteName: "GW-GoWorld",
        
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
        message: "Message",
        
        // FAQ页面
        faqTitle: "FAQs",
        question1: "Is it better to choose original parts or non-original parts to replace a part? The original one is too expensive?",
        answer1p1: "Regarding the choice between original parts and non-original parts, it really needs to be considered according to the actual situation. Genuine parts are usually produced or authorized by the car manufacturer, the quality is more guaranteed, and the match with the vehicle is higher, but the price is relatively high. Non-genuine accessories are produced by third-party manufacturers, which are more affordable but of varying quality.",
        answer1p2: "For key safety components, such as braking system, steering system, seat belts, etc., it is strongly recommended to choose the original parts. Because these parts directly affect the safety of driving, the original parts have been rigorously tested and can provide better safety protection.",
        answer1p3: "For some non-critical parts, such as filter elements, light bulbs, windshield wipers, etc., you can choose cost-effective non-original parts, but be sure to choose the parts produced by regular manufacturers and meet the quality standards. You can refer to some well-known accessory brands, or consult our professional sales team, we will recommend the right accessories according to your model and needs.",
        answer1p4: "You can also consider our Ward brand accessories. We select high-quality suppliers to provide reliable quality and cost-effective parts, and provide one-year warranty service, you can rest assured.",
        question2: "Problems occur not long after installing the accessory, with strange noise/loose/not working?",
        answer2p1: "In order to ensure the proper use of the accessories, proper installation is crucial. All the accessories we sell have gone through strict quality testing. In this case, it may be caused by improper installation.",
        answer2p2: "If you choose to install it by yourself or find a non-designated repair store to install it, please make sure that the installer has the appropriate technical qualifications and follow the installation instructions strictly.",
        answer2p3: "You can provide the installation vouchers and parts information at that time, we will try our best to assist you to solve the problem. If it is confirmed that it is a quality problem of our parts, we will replace or refund you according to our after-sales policy.",
        question3: "Purchased accessories found that they do not work when installed, and seem to be mismatched with the model?",
        answer3p1: "To avoid the situation that the accessories do not match with your vehicle, we need to know the exact information of your model, year and engine model before purchase. My suggestion:",
        answer3p2: "Please provide detailed information about your vehicle, including the model, year, VIN code (vehicle identification code), etc.. We will accurately match the parts for you based on this information.",
        answer3p3: "If you have already purchased the parts, please provide the model number and proof of purchase. We will verify the accessory information, and if there is indeed a mismatch, we can arrange a return or exchange for you. All of our products enjoy one year warranty.",
        answer3p4: "We suggest you consult our sales team before purchase, they will provide professional installation guidance."
    },
    
    zh: {
        // 网站名称
        siteName: "沃德汽车电子",
        
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
        message: "留言",
        
        // FAQ页面
        faqTitle: "常见问题",
        question1: "选择原厂配件还是非原厂配件替换零件更好？原厂的太贵了？",
        answer1p1: "关于原厂配件和非原厂配件的选择，确实需要根据实际情况来考虑。正品配件通常由汽车制造商生产或授权，质量更有保障，与车辆的匹配度更高，但价格相对较高。非正品配件由第三方制造商生产，价格更实惠但质量参差不齐。",
        answer1p2: "对于关键安全部件，如制动系统、转向系统、安全带等，强烈建议选择原厂配件。因为这些部件直接影响驾驶安全，原厂配件经过严格测试，能提供更好的安全保护。",
        answer1p3: "对于一些非关键部件，如滤芯、灯泡、雨刷器等，您可以选择性价比高的非原厂配件，但一定要确保选择正规厂家生产且符合质量标准的产品。您可以参考一些知名的配件品牌，或咨询我们的专业销售团队，我们会根据您的车型和需求推荐合适的配件。",
        answer1p4: "您也可以考虑我们的Ward品牌配件。我们精选优质供应商，提供可靠的质量和高性价比的配件，并提供一年保修服务，您可以放心使用。",
        question2: "安装配件后不久出现问题，有异响/松动/不工作？",
        answer2p1: "为了确保配件的正常使用，正确安装至关重要。我们销售的所有配件都经过严格的质量检测。在这种情况下，可能是由于安装不当造成的。",
        answer2p2: "如果您选择自己安装或找非指定维修店安装，请确保安装人员具有相应的技术资质，并严格按照安装说明进行操作。",
        answer2p3: "您可以提供当时的安装凭证和配件信息，我们会尽力协助您解决问题。如果确认是我们配件的质量问题，我们会根据售后政策为您更换或退款。",
        question3: "购买的配件安装后发现不工作，似乎与车型不匹配？",
        answer3p1: "为了避免配件与您的车辆不匹配的情况，我们需要在购买前了解您车型、年份和发动机型号的准确信息。我的建议：",
        answer3p2: "请提供您车辆的详细信息，包括车型、年份、VIN码（车辆识别代码）等。我们会根据这些信息为您准确匹配配件。",
        answer3p3: "如果您已经购买了配件，请提供型号和购买凭证。我们会核实配件信息，如果确实存在不匹配，我们可以为您安排退换货。我们所有产品都享受一年保修。",
        answer3p4: "我们建议您在购买前咨询我们的销售团队，他们会提供专业的安装指导。"
    }
};

// 当前语言状态
let currentLanguage = localStorage.getItem('language') || 'en';

// 语言切换功能
function initLanguageSwitcher() {
    console.log('Initializing language switcher...');
    const langToggle = document.getElementById('langToggle');
    console.log('Language toggle element found:', langToggle);
    
    if (langToggle) {
        // 设置初始语言状态
        console.log('Current language:', currentLanguage);
        if (currentLanguage === 'zh') {
            langToggle.classList.add('zh');
        }
        
        // 语言切换事件
        langToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Language toggle clicked!');
            currentLanguage = currentLanguage === 'en' ? 'zh' : 'en';
            localStorage.setItem('language', currentLanguage);
            console.log('Switched to language:', currentLanguage);
            
            // 切换按钮状态
            if (currentLanguage === 'zh') {
                langToggle.classList.add('zh');
            } else {
                langToggle.classList.remove('zh');
            }
            
            // 切换页面语言
            switchLanguage(currentLanguage);
        });
        console.log('Language switcher initialized successfully!');
    } else {
        console.error('Language toggle element NOT found!');
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
    // 移除这里的重复初始化，让common.js统一管理
});