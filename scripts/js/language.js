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
        answer3p4: "We suggest you consult our sales team before purchase, they will provide professional installation guidance.",
        
        // R&D设备页面
        rdPageTitle: "R&D and Equipment",
        sensorProcedureTesting: "Sensor Procedure Testing",
        temperatureShockProcedure: "Temperature Shock Procedure",
        corrosionTestProcedure: "Corrosion test procedure",
        temperatureHumidityTest: "Temperature and Humidity test procedure",
        temperatureStorageProcedure: "High and low temperature storage procedure",
        vibrationProcedure: "Vibration procedure",
        leakageTest: "Leakage Test",
        automotiveFluidCompatibility: "Automotive Fluid Compatibility Experiment",
        performanceTesting: "Performance Testing",
        oesEngineeringTest: "OES engineering test solution",
        
        // Why Choose Us 区域
        whyChooseUsTitle: "Why Choose Us",
        feature1Text: "As a professional auto parts supplier, Go-World Auto Parts Ltd. always puts product quality in the first place.",
        feature2Text: "With IATF 16949 quality certificate and professional sales and technical support team, we select high quality raw materials for our customers.",
        feature3Text: "Adopting exquisite manufacturing technology, we ensure that each product can stand the test of time.",
        feature4Text: "We are ready to respond to customers' needs and provide professional product consultation, fast logistics and distribution, perfect after-sales service and customized solutions.",
        feature5Text: "We always adhere to the customer-centric, customer satisfaction as a measure of standards, and constantly optimize the service process and improve service quality.",
        feature6Text: "Choosing Ningde Go-World Auto Parts Co., Ltd, you will feel not only the reliability of the products, but also the intimate and warm service.",
        
        // 工程创新区域
        engineeringTitle: "ENGINEERING AND INNOVATION",
        productionLinesTitle: "Fully-automated and semi-automated production lines",
        productionLinesDesc: "By integrating fully-automatic and semi-automatic production equipments,we build intelligent production lines to realize efficient, precise and stable production processes, thus significantly enhancing our competitiveness.",
        intelligentSystemTitle: "INTELLIGENT CONTROL SYSTEM",
        intelligentSystemDesc: "With the help of Internet of Things technology, we build an intelligent control system platform to remotely monitor the production equipment, real-time data collection, fault early warning and remote debugging, so as to realize transparent and intelligent management of the production process, thus improving production efficiency, optimizing product quality, reducing operating costs and improving the enterprise's response speed to market changes.",
        warehouseTitle: "Warehouse Management",
        warehouseDesc: "Efficient storage solution: A combination of blue plastic crates and metal shelves is used to achieve efficient classification and storage of items.Clear labeling system: The S2 area is used for storing specific product categories, making it easy to quickly locate and manage.Clean and organized environment: Clean floor and sufficient light create a good working atmosphere.",
        electronicStorageTitle: "Electronic Equipment Storage Rack",
        electronicStorageDesc1: "Professional-grade design: Black metal frame structure is sturdy and durable, suitable for long time use. Modular Layout: Compartment size can be adjusted as needed to flexibly accommodate different sizes of electronic equipment and accessories. Safety Protection Measures: All wires are neatly arranged in the designated location to minimize potential safety hazards.",
        electronicStorageDesc2: "Professional-grade design: Black metal frame structure is sturdy and durable, suitable for long time use. Modular Layout: Compartment size can be adjusted as needed to flexibly accommodate different sizes of electronic equipment and accessories. Safety Protection Measures: All wires are neatly arranged in the designated location to minimize potential safety hazards.",

        // Our Service section
        ourServiceTitle: "OUR SERVICE",
        serviceExperience: "Have more than 12 years experience in product auto sensors.",
        serviceCooperation: "Have cooperated with customers,purchasing group and imports in Europe for more than 10 years.",
        serviceSemiAuto: "Semi-automatic equipment not only improves the quality and consistency of products, but also improves production efficiency and shortens delivery time.",
        serviceTest: "100% test before sent out.",
        serviceDesign: "Own designing team for new product development.",
        
        // Service table
        tableCustomCategory: "Custom category",
        tableOptionalRange: "Optional range",
        tableExplain: "Explain",
        tableSensorType: "Sensor type",
        tablePressureTemp: "Pressure/temperature/speed",
        tableSuitableApp: "Suitable for different application scenarios",
        tableShellMaterial: "Shell material",
        tablePlasticMetal: "Plastic/metal/ceramics",
        tableAdaptEnvironment: "Adapt to different environmental needs",
        tableProtectionGrades: "Protection grades",
        tableIP: "IP65 / IP67 / IP68",
        tableDustProof: "Dust-proof and waterproof grades are optional.",
        tableSignalOutput: "Signal output",
        tableAnalogDigital: "Analog/digital signals",
        tableAdaptingInterface: "Adapting to different equipment interfaces",
        tableAttendedMode: "Attended mode",
        tableWiringHarness: "Wiring harness/connector/customized interface",
        tableCompatibleDevices: "Compatible with different devices",
        tableWorkingTemp: "Working temperature",
        tableTempRange: "-40°C~150°C",
        tableSuitableExtreme: "Suitable for extreme environment",
        tableBrandCustom: "Brand customization",
        tableLogoLabel: "Logo/label/color",
        tableBrandSolutions: "Can provide brand customization solutions.",

        // Sales Worldwide section
        salesWorldwide: "SALES WORLDWIDE",
        exportMarkets: "WE DO 100% EXPORT TO OVERSEA MARKETS",
        mainlyRegions: "Mainly in Europe and North America",
        salesDescription: "Go world do 100% export to oversea markets, mainly in Europe and North America like: Germany, United Kingdom, France, Italy, Denmark, Poland, United State of America, Canada and so on. Go world is qualified with IATF 16949, REACH and EMC.",
        readMore: "READ MORE",

        // Products showcase
        viewFeaturedProducts: "VIEW FEATURED PRODUCTS",
        oilLevelSensor: "OIL LEVEL SENSOR",
        steeringAngleSensor: "STEERING ANGLE SENSOR",
        heightLevelSensor: "HEIGHT LEVEL SENSOR",
        mapSensor: "MAP SENSOR",
        dieselGlowController: "Diesel Glow Plug Controller",
        dpfSensor: "DPF SENSOR",
        viewMore: "VIEW MORE",

        // Go-World Information section
        goWorldInfoTitle: "GO-WORLD INFORMATION",
        companyLocation: "Ningde Go-World Auto Spare Parts Co.,LTD., located in Fu'an city, Fujian province,China.",
        companyDescription: "It is a professional manufacture specialized in emission control system and engine management system,like",
        mapSensorFull: "MAP sensor",
        oilLevelSensorFull: "oil level sensor",
        dpfSensorFull: "DPF Sensor",
        egtSensorFull: "EGT Sensor",
        steeringAngleSensorFull: "steering angle sensor",
        glowPlugControllerFull: "Glow Plug Controller",

        // Contact Response section
        lookingForwardTitle: "Looking Forward To Your Response",
        moreInfoText: "For More Information and Favorable Price,Please Contact Us!",
        phoneLabel: "Phone: ",
        wechatLabel1: "Telephone/wechat: ",
        wechatLabel2: "Telephone/wechat: ",
        emailLabel: "Email: ",
        addressLabel: "Addr: ",
        fullAddress: "Shangtang Industrial Zone,Gantang Town, Fuan, <br>Ningde City, Fujian Province, P.R. China 355009",
        contactUsTitle: "Contact us"
    },
    zh: {

        // Contact page
        contactPageTitle: "Contact Us",
        certificationsTitle: "OUR CERTIFICATIONS",
        certificationsDesc: "Our company has been awarded TS certification",
        contactInfoTitle: "WHERE CAN YOU CONTACT US?",
        contactSubtitle: "CONTACT",
        contactAddress: "Add: Shangtang Industrial Zone,Gantang Town, Fuan, \\nNingde City, Fujian Province, P.R. China 355009",
        contactEmail: "Email: sales@go-world.cn",
        contactPhone: "Phone: +86-0593-2828185",
        
        // Contact form
        formTitle: "GET IN TOUCH",
        formDescription: "We would love to hear from you. Send us a message and we'll respond as soon as possible.",
        namePlaceholder: "Name",
        corporateNamePlaceholder: "Corporate Name",
        telephonePlaceholder: "*Telephone",
        emailPlaceholder: "*Email",
        messagePlaceholder: "*Message",
        submitBtn: "Submit"
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
        answer3p4: "我们建议您在购买前咨询我们的销售团队，他们会提供专业的安装指导。",
        
        // R&D设备页面
        rdPageTitle: "研发设备",
        sensorProcedureTesting: "传感器程序测试",
        temperatureShockProcedure: "温度冲击程序",
        corrosionTestProcedure: "腐蚀测试程序",
        temperatureHumidityTest: "温湿度测试程序",
        temperatureStorageProcedure: "高低温存储程序",
        vibrationProcedure: "振动程序",
        leakageTest: "泄漏测试",
        automotiveFluidCompatibility: "汽车流体兼容性实验",
        performanceTesting: "性能测试",
        oesEngineeringTest: "OES工程测试解决方案",
        
        // Why Choose Us 区域
        whyChooseUsTitle: "为什么选择我们",
        feature1Text: "作为专业的汽车零部件供应商，高世界汽车配件有限公司始终将产品质量放在首位。",
        feature2Text: "拥有IATF 16949质量认证和专业的销售技术支持团队，我们为客户精选优质原材料。",
        feature3Text: "采用精湛的制造技术，我们确保每个产品都能经得起时间的考验。",
        feature4Text: "我们时刻准备响应客户需求，提供专业的产品咨询、快速物流配送、完善的售后服务和定制化解决方案。",
        feature5Text: "我们始终坚持以客户为中心，以客户满意度为衡量标准，不断优化服务流程，提升服务质量。",
        feature6Text: "选择宁德高世界汽车配件有限公司，您将感受到的不仅是产品的可靠性，更有贴心温暖的服务。",
        
        // 工程创新区域
        engineeringTitle: "工程与创新",
        productionLinesTitle: "全自动化和半自动化生产线",
        productionLinesDesc: "通过整合全自动化和半自动化生产设备，我们构建智能生产线，实现高效、精确、稳定的生产过程，从而显著增强我们的竞争力。",
        intelligentSystemTitle: "智能控制系统",
        intelligentSystemDesc: "借助物联网技术，我们构建智能控制系统平台，远程监控生产设备，实时数据采集，故障预警和远程调试，实现生产过程的透明化智能管理，从而提高生产效率，优化产品质量，降低运营成本，提升企业对市场变化的响应速度。",
        warehouseTitle: "仓库管理",
        warehouseDesc: "高效存储解决方案：采用蓝色塑料箱和金属货架的组合，实现物品的高效分类和存储。清晰标识系统：S2区域用于存储特定产品类别，便于快速定位和管理。整洁有序的环境：清洁的地面和充足的照明创造良好的工作氛围。",
        electronicStorageTitle: "电子设备存储架",
        electronicStorageDesc1: "专业级设计：黑色金属框架结构坚固耐用，适合长期使用。模块化布局：隔间尺寸可根据需要调整，灵活容纳不同尺寸的电子设备和配件。安全防护措施：所有线路都整齐排列在指定位置，最大限度减少潜在安全隐患。",
        electronicStorageDesc2: "专业级设计：黑色金属框架结构坚固耐用，适合长期使用。模块化布局：隔间尺寸可根据需要调整，灵活容纳不同尺寸的电子设备和配件。安全防护措施：所有线路都整齐排列在指定位置，最大限度减少潜在安全隐患。",

        // Our Service section
        ourServiceTitle: "我们的服务",
        serviceExperience: "在产品自动传感器方面拥有超过12年的经验。",
        serviceCooperation: "与客户、采购集团和欧洲进口商合作超过10年。",
        serviceSemiAuto: "半自动设备不仅提高了产品的质量和一致性，还提高了生产效率，缩短了交货时间。",
        serviceTest: "发货前100%测试。",
        serviceDesign: "拥有新产品开发的设计团队。",
        
        // Service table
        tableCustomCategory: "定制类别",
        tableOptionalRange: "可选范围",
        tableExplain: "说明",
        tableSensorType: "传感器类型",
        tablePressureTemp: "压力/温度/速度",
        tableSuitableApp: "适用于不同应用场景",
        tableShellMaterial: "外壳材料",
        tablePlasticMetal: "塑料/金属/陶瓷",
        tableAdaptEnvironment: "适应不同环境需求",
        tableProtectionGrades: "防护等级",
        tableIP: "IP65 / IP67 / IP68",
        tableDustProof: "防尘防水等级可选。",
        tableSignalOutput: "信号输出",
        tableAnalogDigital: "模拟/数字信号",
        tableAdaptingInterface: "适应不同设备接口",
        tableAttendedMode: "连接方式",
        tableWiringHarness: "线束/连接器/定制接口",
        tableCompatibleDevices: "兼容不同设备",
        tableWorkingTemp: "工作温度",
        tableTempRange: "-40°C~150°C",
        tableSuitableExtreme: "适用于极端环境",
        tableBrandCustom: "品牌定制",
        tableLogoLabel: "Logo/标签/颜色",
        tableBrandSolutions: "可提供品牌定制解决方案。",

        // Sales Worldwide section
        salesWorldwide: "全球销售",
        exportMarkets: "我们100%出口到海外市场",
        mainlyRegions: "主要在欧洲和北美",
        salesDescription: "沃德汽车电子100%出口到海外市场，主要在欧洲和北美，如：德国、英国、法国、意大利、丹麦、波兰、美国、加拿大等。沃德汽车电子拥有IATF 16949、REACH和EMC认证。",
        readMore: "阅读更多",

        // Products showcase
        viewFeaturedProducts: "查看精选产品",
        oilLevelSensor: "油位传感器",
        steeringAngleSensor: "转向角度传感器",
        heightLevelSensor: "高度液位传感器",
        mapSensor: "进气压力传感器",
        dieselGlowController: "柴油预热塞控制器",
        dpfSensor: "DPF传感器",
        viewMore: "查看更多",

        // Go-World Information section
        goWorldInfoTitle: "沃德汽车信息",
        companyLocation: "宁德沃德汽车配件有限公司，位于中国福建省福安市。",
        companyDescription: "是一家专业从事排放控制系统和发动机管理系统的制造商，如",
        mapSensorFull: "进气压力传感器",
        oilLevelSensorFull: "油位传感器",
        dpfSensorFull: "DPF传感器",
        egtSensorFull: "排气温度传感器",
        steeringAngleSensorFull: "转向角传感器",
        glowPlugControllerFull: "预热塞控制器",

        // Contact Response section
        lookingForwardTitle: "期待您的回复",
        moreInfoText: "如需更多信息和优惠价格，请联系我们！",
        phoneLabel: "电话: ",
        wechatLabel1: "电话/微信: ",
        wechatLabel2: "电话/微信: / ",
        emailLabel: "邮箱: ",
        addressLabel: "地址: ",
        fullAddress: "中国福建省宁德市福安市<br>甘棠镇上塘工业区 355009",
        contactUsTitle: "联系我们",

        // Contact page
        contactPageTitle: "联系我们",
        certificationsTitle: "我们的认证",
        certificationsDesc: "我们公司已获得TS认证",
        contactInfoTitle: "您可以在哪里联系我们？",
        contactSubtitle: "联系方式",
        contactAddress: "地址：中国福建省宁德市福安市甘棠镇上塘工业区, \\n355009",
        contactEmail: "邮箱：sales@go-world.cn",
        contactPhone: "电话：+86-0593-2828185",
        
        // Contact form
        formTitle: "联系我们",
        formDescription: "我们很乐意听到您的声音。请给我们留言，我们会尽快回复。",
        namePlaceholder: "姓名",
        corporateNamePlaceholder: "公司名称",
        telephonePlaceholder: "*电话",
        emailPlaceholder: "*邮箱",
        messagePlaceholder: "*留言",
        submitBtn: "提交"
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
            } else if (key === 'contactAddress' || key === 'fullAddress') {
                // 特殊处理地址，将 <br> 标签渲染为 HTML
                element.innerHTML = translation[key];
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