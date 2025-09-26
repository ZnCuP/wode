// API配置文件
// 根据当前域名自动判断环境并设置正确的API基础URL

const API_CONFIG = {
    // 生产环境配置 - 使用相对路径，前后端同端口
    production: {
        baseURL: '/api',
        timeout: 10000
    },
    // 开发环境配置 - 使用相对路径，前后端同端口
    development: {
        baseURL: '/api',
        timeout: 10000
    }
};

// 自动检测当前环境
function getCurrentEnvironment() {
    const hostname = window.location.hostname;
    
    // 如果是生产域名，返回production
    if (hostname === 'www.goworldauto.com' || hostname === 'goworldauto.com') {
        return 'production';
    }
    
    // 如果是localhost或127.0.0.1，返回development
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'development';
    }
    
    // 默认返回production（适用于其他域名或IP访问）
    return 'production';
}

// 获取当前环境的API配置
const currentEnv = getCurrentEnvironment();
const API_BASE_URL = API_CONFIG[currentEnv].baseURL;
const API_TIMEOUT = API_CONFIG[currentEnv].timeout;

// 导出配置供其他文件使用
window.API_BASE_URL = API_BASE_URL;
window.API_TIMEOUT = API_TIMEOUT;

console.log(`当前环境: ${currentEnv}, API基础URL: ${API_BASE_URL}`);