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
        subtitle: "Continuous wet-sump monitoring with +/-1.5% volumetric accuracy.",
        subtitle_zh: "连续湿式油底壳监测，体积测量精度±1.5%。",
        description: "Engineered with redundant hall sensing and temperature compensation to ensure stable readings during aggressive vehicle maneuvers. Supports CAN and LIN variants for seamless integration with engine control units.",
        description_zh: "采用冗余霍尔感应与温度补偿算法，确保激烈工况下信号稳定。提供CAN与LIN版本，便于与发动机控制单元无缝集成。",
        image_url: "/assets/oil_level_sensor.png",
        sku: "OLS-001",
        category: "Sensors",
        category_zh: "传感器",
        card_highlights: [
            { en: "Hermetically sealed module rated IP67/IP6K9K.", zh: "IP67/IP6K9K密封模块设计。" },
            { en: "Traceable batches with PPAP Level 3 documentation.", zh: "批次全程可追溯，并附PPAP三级资料。" },
            { en: "Self-diagnostics with stuck float detection.", zh: "内置自诊断，支持浮子卡滞检测。" }
        ],
        specifications: {
            voltage: "9-16 V DC",
            temperature: "-40°C to +125°C",
            protocol: "CAN / LIN selectable",
            accuracy: "+/-1.5% full-scale",
            certification: "IATF 16949, ISO 26262 ASIL-B"
        },
        features: [
            {
                icon: "🧭",
                title: "Stabilized Signal Chain",
                title_zh: "稳定信号链",
                description: "Dual hall arrays with 14-bit resolution maintain accuracy during slosh events.",
                description_zh: "双霍尔阵列14位分辨率，在油液波动时仍保持精度。"
            },
            {
                icon: "🔍",
                title: "Safety Diagnostics",
                title_zh: "安全诊断",
                description: "Built-in self test and stuck-float detection broadcast limp-home messaging over CAN.",
                description_zh: "内置自检与浮子卡滞检测，通过CAN输出故障降级信息。"
            },
            {
                icon: "�",
                title: "OEM Documentation",
                title_zh: "主机厂文档",
                description: "Delivered with PPAP Level 3 package, IMDS entries, and calibration certificates.",
                description_zh: "随件附带PPAP三级资料、IMDS条目与标定证书。"
            }
        ],
        applications: [
            { en: "Wet-sump petrol and diesel engines across C/D-segment platforms.", zh: "覆盖C/D级平台的湿式油底壳汽柴油发动机。" },
            { en: "Heavy-duty commercial vehicles requiring extended drain intervals.", zh: "需要延长换油周期的中重型商用车。" },
            { en: "Hybrid powertrains needing precise thermal compensation.", zh: "要求精准热补偿的混合动力系统。" }
        ],
        compliance: [
            { en: "Manufactured under IATF 16949 with automated end-of-line validation.", zh: "IATF 16949体系下生产，并配备全自动终检验证。" },
            { en: "Meets ISO 26262 ASIL-B safety diagnostics coverage.", zh: "满足ISO 26262 ASIL-B安全诊断覆盖率要求。" },
            { en: "Validated to ISO 16750 and IEC 60068 vibration and thermal cycles.", zh: "通过ISO 16750与IEC 60068振动及热循环验证。" }
        ],
        support: [
            { en: "PPAP Level 3, IMDS entries, and traceability reports on request.", zh: "可按需提供PPAP三级资料、IMDS条目及追溯报告。" },
            { en: "Application engineering support for calibration and harness adaptation.", zh: "提供标定与线束适配的应用工程支持。" },
            { en: "Warranty analysis portal with 48-hour failure feedback.", zh: "质保分析平台可在48小时内反馈故障结论。" }
        ]
    },
    {
        id: 2,
        category_id: 1,
        name: "Manifold Absolute Pressure Sensor",
        name_zh: "歧管绝对压力传感器",
        subtitle: "Fast-response silicon sensing for turbocharged engine control.",
        subtitle_zh: "面向增压发动机的快速响应硅基压力检测。",
        description: "A high-temperature MEMS element with on-board linearization delivers precise manifold pressure for combustion control. EMI shielding and vibration damping ensure stability in demanding turbocharged applications.",
        description_zh: "高温MEMS芯片配合片上线性化算法，为燃烧控制提供精确歧管压力。EMI屏蔽与减振设计确保在苛刻的增压工况下稳定可靠。",
        image_url: "/assets/steering_angle_sensor.png",
        sku: "MAP-001",
        category: "Sensors",
        category_zh: "传感器",
        card_highlights: [
            { en: "1 ms response with temperature-compensated output.", zh: "1 ms响应并具备温度补偿输出。" },
            { en: "Absolute range 10-400 kPa supporting boost monitoring.", zh: "10-400 kPa绝压量程，满足增压监测。" },
            { en: "CISPR 25 Class 5 compliant EMI design.", zh: "EMI设计符合CISPR 25 Class 5。" }
        ],
        specifications: {
            voltage: "5 V +/-0.5 V",
            temperature: "-40°C to +125°C",
            protocol: "Analog 0.5-4.5 V / SENT",
            response_time: "1 ms typical",
            certification: "ISO 7637-2, CISPR 25 Class 5"
        },
        features: [
            {
                icon: "⚡",
                title: "High Accuracy",
                title_zh: "高精度",
                description: "+/-1% FS accuracy across temperature thanks to on-chip calibration.",
                description_zh: "片上校准实现全温区+/-1%FS精度。"
            },
            {
                icon: "🌀",
                title: "Boost Ready",
                title_zh: "增压适配",
                description: "400 kPa absolute range supports modern turbo petrol and diesel engines.",
                description_zh: "400 kPa绝压量程覆盖最新汽柴油涡轮发动机需求。"
            },
            {
                icon: "�️",
                title: "EMI Shielding",
                title_zh: "EMI防护",
                description: "Metal shield can and differential routing pass stringent EMC testing.",
                description_zh: "金属屏蔽罩与差分走线通过严苛EMC测试。"
            }
        ],
        applications: [
            { en: "Gasoline and diesel turbocharged engines up to 3.0L displacement.", zh: "适用于排量至3.0L的汽柴油增压发动机。" },
            { en: "EGR feedback and boost monitoring for Euro 6 / OBD-II compliance.", zh: "用于满足欧6/OBD-II法规的EGR反馈与增压监控。" },
            { en: "Industrial generator sets requiring altitude compensation.", zh: "需要海拔补偿的工业发电机组。" }
        ],
        compliance: [
            { en: "CISPR 25 Class 5 conducted and radiated compliance validation.", zh: "通过CISPR 25 Class 5传导与辐射兼容性验证。" },
            { en: "End-of-line calibration traceable to ISO 17025 accredited labs.", zh: "终检标定可追溯至ISO 17025认可实验室。" },
            { en: "Thermal shock and vibration qualified per ISO 16750.", zh: "按照ISO 16750完成热冲击与振动认证。" }
        ],
        support: [
            { en: "Calibration tables and drift curves supplied for ECU integration.", zh: "提供用于ECU集成的标定表及漂移曲线。" },
            { en: "Packaging assistance for manifold placement and sealing.", zh: "协助优化安装位置与歧管密封设计。" },
            { en: "Failure analysis with SEM/EDX reporting within 5 business days.", zh: "5个工作日内提供SEM/EDX失效分析报告。" }
        ]
    },
    {
        id: 3,
        category_id: 1,
        name: "Height Level Sensor",
        name_zh: "高度水平传感器",
        subtitle: "Closed-loop ride height sensing for air and adaptive suspension systems.",
        subtitle_zh: "适用于空气与自适应悬挂的闭环车身高度检测。",
        description: "A sealed rotary position sensor delivers precise wheel-to-body measurements for adaptive damping and leveling logic. Mechanical design resists mud, salt, and gravel while exceeding five million articulation cycles.",
        description_zh: "密封旋转式位置传感器为自适应阻尼和自动调平逻辑提供精准轮-车身距离。机械结构耐泥水、盐雾与砂砾磨蚀，并通过超过五百万次摆动寿命测试。",
        image_url: "/assets/height_level_sensor.png",
        sku: "HLS-001",
        category: "Sensors",
        category_zh: "传感器",
        card_highlights: [
            { en: "IP6K7/IP6K9K sealed housing with vent membrane.", zh: "IP6K7/IP6K9K密封壳体并配透气膜。" },
            { en: "Forged linkage engineered for high-cycle durability.", zh: "锻造连杆设计确保高循环耐久性。" },
            { en: "Analog and PWM output options for flexible integration.", zh: "可选模拟输出与PWM输出，便于集成。" }
        ],
        specifications: {
            voltage: "9-16 V DC",
            temperature: "-40°C to +105°C",
            output: "Analog 0-5 V / PWM",
            lifetime: "5 million articulation cycles",
            certification: "ECE R79, ISO 16750"
        },
        features: [
            {
                icon: "🛡️",
                title: "Corrosion Resistant",
                title_zh: "抗腐蚀",
                description: "Anodized housing and stainless linkage survive salt spray beyond 720 hours.",
                description_zh: "阳极氧化壳体与不锈钢连杆，盐雾试验超过720小时。"
            },
            {
                icon: "🔁",
                title: "High Cycle Life",
                title_zh: "长寿命",
                description: "Tested to 5 million articulation cycles without measurable drift.",
                description_zh: "完成500万次摆动测试且无显著漂移。"
            },
            {
                icon: "⚙️",
                title: "Flexible Output",
                title_zh: "输出灵活",
                description: "Configurable PWM frequency and analog scaling for multiple ECUs.",
                description_zh: "可配置PWM频率和模拟量程，对接多种ECU。"
            }
        ],
        applications: [
            { en: "Adaptive air suspension and automatic leveling systems.", zh: "自适应空气悬挂与自动调平系统。" },
            { en: "Matrix headlamp leveling for premium vehicles.", zh: "高端车型的矩阵式大灯调平。" },
            { en: "Electronic stability programs requiring chassis height feedback.", zh: "需要车身高度反馈的车辆稳定控制系统。" }
        ],
        compliance: [
            { en: "Salt spray tested to ASTM B117 beyond 720 hours.", zh: "按ASTM B117完成超过720小时盐雾试验。" },
            { en: "Ingress protection validated to IP6K7/IP6K9K.", zh: "通过IP6K7/IP6K9K防护等级验证。" },
            { en: "Cycle life verified to 5 million articulations at -40°C to +105°C.", zh: "在-40°C至+105°C范围内完成500万次摆动寿命验证。" }
        ],
        support: [
            { en: "Linkage geometry customization with 3D CAD support.", zh: "提供连杆几何定制与3D CAD支持。" },
            { en: "Rapid prototype tooling available within four weeks.", zh: "四周内即可交付快速试制模具与样件。" },
            { en: "Field return analysis delivered within 72 hours.", zh: "72小时内提供现场返件分析结论。" }
        ]
    },
    {
        id: 4,
        category_id: 1,
        name: "DPF Differential Pressure Sensor",
        name_zh: "DPF差压传感器",
        subtitle: "High-temperature differential pressure sensing for diesel particulate filters.",
        subtitle_zh: "面向柴油颗粒捕集器的高温差压检测。",
        description: "A dual-port ceramic element measures pressure drop across the DPF to control regeneration cycles. Resistant to exhaust condensate and sulfur contamination with protective coatings and heating options.",
        description_zh: "双通道陶瓷敏感元件监测DPF两端压差，精确控制再生周期。防护涂层与加热方案可抵御排气冷凝与硫化物污染。",
        image_url: "/assets/DPF_sensor.png",
        sku: "DPF-001",
        category: "Sensors",
        category_zh: "传感器",
        card_highlights: [
            { en: "Measures 0-100 kPa differential pressure with 0.5% accuracy.", zh: "0-100 kPa差压测量，精度0.5%。" },
            { en: "High-temp resistant up to 850°C exhaust environments.", zh: "耐受高达850°C的排气环境。" },
            { en: "Heated reference port prevents condensation blockages.", zh: "加热参比端口避免冷凝堵塞。" }
        ],
        specifications: {
            voltage: "5 V +/-10%",
            temperature: "-40°C to +850°C media",
            protocol: "Analog 0.5-4.5 V / CAN",
            accuracy: "+/-0.5% full-scale",
            certification: "Euro 6, SAE J2711"
        },
        features: [
            {
                icon: "🌡️",
                title: "High Temperature Core",
                title_zh: "高温核心",
                description: "Ceramic diaphragm and stainless steel ports withstand 850°C exhaust streams.",
                description_zh: "陶瓷膜片与不锈钢接口可承受850°C排气。"
            },
            {
                icon: "🔥",
                title: "Regeneration Control",
                title_zh: "再生控制",
                description: "Provides stable delta-pressure signal to optimize DPF regeneration intervals.",
                description_zh: "输出稳定压差信号，优化DPF再生间隔。"
            },
            {
                icon: "🛡️",
                title: "Contamination Resistant",
                title_zh: "抗污染",
                description: "Hydrophobic coatings resist soot, condensate, and sulfuric deposits.",
                description_zh: "疏水涂层抵御积碳、冷凝水与硫化沉积。"
            }
        ],
        applications: [
            { en: "Euro 6 and EPA 2027 diesel passenger cars and SUVs.", zh: "欧6及EPA 2027柴油乘用车与SUV。" },
            { en: "Heavy-duty trucks requiring precise DPF regeneration control.", zh: "需要精准DPF再生控制的重型卡车。" },
            { en: "Off-highway machinery operating in variable load cycles.", zh: "在变负荷工况下运行的非道路机械。" }
        ],
        compliance: [
            { en: "Qualified under Euro 6 and China VI emission durability programs.", zh: "满足欧6与国六排放耐久性认证要求。" },
            { en: "Validated with soot loading cycles per SAE J2711.", zh: "按照SAE J2711完成积碳加载验证。" },
            { en: "Ingress protection certified to IP6K7 for underbody mounting.", zh: "通过IP6K7防护认证，适用于底盘安装。" }
        ],
        support: [
            { en: "Tubing and bracket kits engineered to OEM packaging.", zh: "提供符合主机厂布置的取压管与支架套件。" },
            { en: "Data logging templates for regeneration calibration projects.", zh: "支持再生标定项目的数据记录模板。" },
            { en: "Failure lab capable of soot and condensate root cause analysis.", zh: "具备烟炱与冷凝物失效分析能力的实验室支持。" }
        ]
    },
    {
        id: 5,
        category_id: 1,
        name: "Steering Angle Sensor",
        name_zh: "转向角度传感器",
        subtitle: "Redundant encoder for ESC, ADAS, and steer-by-wire platforms.",
        subtitle_zh: "满足ESC、ADAS与线控底盘需求的冗余编码器。",
        description: "Dual optical tracks with digital plausibility checks provide precise wheel angle data for chassis controllers. Configurable damping algorithms filter steering vibration without sacrificing response time.",
        description_zh: "双光学编码轨配合数字可信度校验，为底盘控制器提供精准方向角数据。可配置的阻尼算法在过滤振动的同时保持响应速度。",
        image_url: "/assets/steering_angle_sensor.png",
        sku: "SAS-001",
        category: "Sensors",
        category_zh: "传感器",
        card_highlights: [
            { en: "0.1° accuracy across full 900° rotation.", zh: "900°全量程保持0.1°精度。" },
            { en: "ASIL-C capable dual channel architecture.", zh: "双通道架构满足ASIL-C能力。" },
            { en: "Integrated heater supports -40°C cold start operation.", zh: "集成加热模块保障-40°C冷启动。" }
        ],
        specifications: {
            voltage: "5 V +/-10%",
            temperature: "-40°C to +125°C",
            protocol: "Dual CAN FD / SENT",
            accuracy: "0.1 deg resolution",
            certification: "ISO 26262 ASIL-C capable"
        },
        features: [
            {
                icon: "🔄",
                title: "Redundant Measurement",
                title_zh: "冗余测量",
                description: "Dual sensor cores with continuous plausibility monitoring safeguard angle data.",
                description_zh: "双传感核心持续执行可信度监控，保障角度数据。"
            },
            {
                icon: "🎯",
                title: "Digital Filtering",
                title_zh: "数字滤波",
                description: "Configurable filtering eliminates mechanical chatter while preserving fast response.",
                description_zh: "可调滤波器消除机械噪声同时保持快速响应。"
            },
            {
                icon: "🔥",
                title: "Integrated Heater",
                title_zh: "集成加热",
                description: "Embedded resistive heater ensures stability in extreme cold climates.",
                description_zh: "内嵌电阻加热器确保极寒环境下的稳定性。"
            }
        ],
        applications: [
            { en: "Electronic stability control and brake assist platforms.", zh: "电子稳定控制与制动辅助平台。" },
            { en: "ADAS lane keeping and automated parking systems.", zh: "ADAS车道保持与自动泊车系统。" },
            { en: "Steer-by-wire and electric power steering modules.", zh: "线控转向与电动助力转向模块。" }
        ],
        compliance: [
            { en: "ASIL-C capable architecture with safety manuals and FMEDA.", zh: "具备ASIL-C能力的架构，提供安全手册与FMEDA。" },
            { en: "ISO 16750 vibration endurance to 30 g random profiles.", zh: "按照ISO 16750承受30 g随机振动谱。" },
            { en: "EMC robustness validated per ISO 11452-2.", zh: "依照ISO 11452-2完成电磁兼容验证。" }
        ],
        support: [
            { en: "Safety case documentation and integration guidelines provided.", zh: "提供安全案例文档与集成指南。" },
            { en: "Real-time data logging support for chassis tuning.", zh: "支持底盘调校的实时数据记录服务。" },
            { en: "Failure mode workshops available for ADAS teams.", zh: "可为ADAS团队提供失效模式研讨会。" }
        ]
    },
    {
        id: 6,
        category_id: 2,
        name: "Diesel Glow Plug Controller",
        name_zh: "柴油预热塞控制器",
        subtitle: "Intelligent cold-start management with closed-loop plug control.",
        subtitle_zh: "闭环控制的智能冷启动管理模块。",
        description: "A microcontroller-based driver monitors plug current, voltage, and temperature to stabilize combustion during cold starts. Supports CAN diagnostics and protects against over-current, short, and open load events.",
        description_zh: "基于微控制器的驱动模块实时监测电流、电压与温度，在冷启动阶段稳定燃烧。支持CAN诊断，并具备过流、短路与断路保护。",
        image_url: "/assets/diesel_glow_controller.png",
        sku: "DGPC-001",
        category: "Controllers",
        category_zh: "控制器",
        card_highlights: [
            { en: "Adaptive heating profiles for all plug chemistries.", zh: "适配各类预热塞材料的自适应加热曲线。" },
            { en: "Integrated current sensing with +/-2% accuracy.", zh: "集成电流检测，精度+/-2%。" },
            { en: "CAN diagnostics with freeze-frame data support.", zh: "CAN诊断支持冻结帧数据。" }
        ],
        specifications: {
            voltage: "9-32 V DC",
            temperature: "-40°C to +105°C",
            protocol: "CAN 2.0B diagnostics",
            output: "4-channel high-side driver",
            certification: "ISO 16750, ISO 7637-2"
        },
        features: [
            {
                icon: "❄️",
                title: "Cold Start Optimized",
                title_zh: "冷启动优化",
                description: "Closed-loop current control keeps plug temperature stable in extreme cold.",
                description_zh: "闭环电流控制在极寒条件下保持预热塞温度稳定。"
            },
            {
                icon: "🧠",
                title: "Smart Protection",
                title_zh: "智能保护",
                description: "Detects over-current, short, and open load faults with DTC generation.",
                description_zh: "检测过流、短路与断路故障并生成诊断码。"
            },
            {
                icon: "🛠️",
                title: "Flexible Integration",
                title_zh: "灵活集成",
                description: "Configurable wake-up, PWM frequency, and connector options.",
                description_zh: "可配置唤醒方式、PWM频率与连接器选项。"
            }
        ],
        applications: [
            { en: "Common-rail diesel passenger vehicles and light trucks.", zh: "共轨柴油乘用车与轻型卡车。" },
            { en: "Cold climate fleets requiring rapid restarts.", zh: "需要快速重启的寒区车队。" },
            { en: "Off-highway diesel engines with extended idle time.", zh: "长时间怠速的非道路柴油发动机。" }
        ],
        compliance: [
            { en: "Electrical stress qualified to ISO 7637-2 pulses 1, 2a, 2b, 5a, 5b.", zh: "通过ISO 7637-2脉冲1、2a、2b、5a、5b电气应力验证。" },
            { en: "Thermal cycling validated from -40°C to +105°C for 1000 hours.", zh: "完成-40°C至+105°C 1000小时热循环验证。" },
            { en: "Corrosion resistance tested to 480-hour salt spray.", zh: "耐腐蚀性能完成480小时盐雾测试。" }
        ],
        support: [
            { en: "Harness and connector customization with sample kits.", zh: "提供线束与连接器定制及样件套装。" },
            { en: "Calibration support for vehicle ECU cold-start strategies.", zh: "支持整车ECU冷启动策略的标定工作。" },
            { en: "On-site launch support and quick-response service team.", zh: "提供上线现场支持与快速响应服务团队。" }
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

    const productName = getLocalizedField(product, 'name');
    const productSubtitle = getLocalizedField(product, 'subtitle');
    const productDescription = getLocalizedField(product, 'description');
    const productCategory = getLocalizedField(product, 'category');

    document.title = productName;

    const imageElement = document.getElementById('product-image');
    if (imageElement) {
        imageElement.src = product.image_url;
        imageElement.alt = productName;
    }

    const titleElement = document.getElementById('product-title');
    if (titleElement) {
        titleElement.textContent = productName;
    }

    const subtitleElement = document.getElementById('product-subtitle');
    if (subtitleElement) {
        if (productSubtitle) {
            subtitleElement.textContent = productSubtitle;
            subtitleElement.style.display = '';
        } else {
            subtitleElement.textContent = '';
            subtitleElement.style.display = 'none';
        }
    }

    const skuElement = document.getElementById('product-sku');
    if (skuElement) {
        skuElement.textContent = `SKU: ${product.sku}`;
    }

    const descriptionElement = document.getElementById('product-description');
    if (descriptionElement) {
        descriptionElement.textContent = productDescription;
    }

    const categoryElement = document.getElementById('product-category');
    if (categoryElement) {
        categoryElement.textContent = productCategory;
    }

    renderProductSpecifications(product.specifications || {});
    renderProductFeatures(product.features || []);
    renderProductListSection('product-applications', 'product-applications-block', product.applications);
    renderProductListSection('product-compliance', 'product-compliance-block', product.compliance);
    renderProductListSection('product-support', 'product-support-block', product.support);

    document.getElementById('loading').style.display = 'none';
    document.getElementById('product-content').style.display = 'block';
}

function renderProductSpecifications(specifications) {
    const specGrid = document.getElementById('product-spec-grid');
    if (!specGrid) {
        return;
    }

    const card = specGrid.closest('.product-specs-card');
    const entries = Object.entries(specifications || {});

    if (!entries.length) {
        specGrid.innerHTML = '';
        if (card) {
            card.style.display = 'none';
        }
        return;
    }

    if (card) {
        card.style.display = '';
    }

    const itemsHTML = entries.map(([key, value]) => {
        const labelTranslation = specificationLabels[key.toLowerCase()];
        const fallbackLabel = key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
        const label = labelTranslation
            ? (productDetailCurrentLanguage === 'zh' ? labelTranslation.zh : labelTranslation.en)
            : fallbackLabel;
        return `
            <div class="spec-item">
                <span class="spec-label">${label}</span>
                <span class="spec-value">${value}</span>
            </div>
        `;
    }).join('');

    specGrid.innerHTML = itemsHTML;
}

function renderProductListSection(listId, blockId, items) {
    const listElement = document.getElementById(listId);
    const blockElement = document.getElementById(blockId);

    if (!listElement || !blockElement) {
        return;
    }

    const localizedItems = getLocalizedList(items);

    if (!localizedItems.length) {
        blockElement.style.display = 'none';
        listElement.innerHTML = '';
        return;
    }

    blockElement.style.display = '';
    listElement.innerHTML = localizedItems.map(item => `<li>${item}</li>`).join('');
}

/**
 * 渲染产品特性
 */
function renderProductFeatures(features) {
    const featuresGrid = document.getElementById('features-grid');
    if (!featuresGrid) {
        return;
    }

    const section = featuresGrid.closest('.product-features-section');

    if (!features || !features.length) {
        featuresGrid.innerHTML = '';
        if (section) {
            section.style.display = 'none';
        }
        return;
    }

    if (section) {
        section.style.display = '';
    }

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

    const loadingElement = document.getElementById('loading');
    const contentElement = document.getElementById('product-content');
    const errorElement = document.getElementById('error');

    if (loadingElement) {
        loadingElement.style.display = 'block';
    }
    if (contentElement) {
        contentElement.style.display = 'none';
    }
    if (errorElement) {
        errorElement.style.display = 'none';
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