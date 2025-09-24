#!/bin/bash
# PostgreSQL安装脚本 - 适用于CentOS/RHEL系统
# 作者: Claude
# 日期: 2023-07-24

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印带颜色的信息
info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查是否为root用户
if [ "$(id -u)" != "0" ]; then
   error "此脚本必须以root用户运行"
   exit 1
fi

# 检查系统版本
if [ -f /etc/redhat-release ]; then
    info "检测到RedHat/CentOS系统"
    OS_VERSION=$(cat /etc/redhat-release)
    info "系统版本: $OS_VERSION"
else
    error "不支持的操作系统，此脚本仅适用于RedHat/CentOS系统"
    exit 1
fi

# 检查PostgreSQL是否已安装
if command -v psql &> /dev/null; then
    warning "PostgreSQL已经安装，跳过安装步骤"
    POSTGRES_INSTALLED=true
else
    POSTGRES_INSTALLED=false
fi

# 安装PostgreSQL
install_postgresql() {
    info "开始安装PostgreSQL..."
    
    # 安装EPEL仓库
    info "安装EPEL仓库..."
    yum install -y epel-release
    
    # 安装PostgreSQL
    info "安装PostgreSQL及相关组件..."
    yum install -y postgresql postgresql-server postgresql-contrib
    
    if [ $? -ne 0 ]; then
        error "PostgreSQL安装失败"
        exit 1
    fi
    
    # 初始化数据库
    info "初始化PostgreSQL数据库..."
    if [ -f /usr/bin/postgresql-setup ]; then
        postgresql-setup initdb || postgresql-setup --initdb
    else
        /usr/bin/initdb -D /var/lib/pgsql/data
    fi
    
    # 启动PostgreSQL服务
    info "启动PostgreSQL服务..."
    systemctl start postgresql
    systemctl enable postgresql
    
    if systemctl is-active postgresql >/dev/null 2>&1; then
        success "PostgreSQL服务已成功启动"
    else
        error "PostgreSQL服务启动失败"
        exit 1
    fi
}

# 配置PostgreSQL
configure_postgresql() {
    info "配置PostgreSQL..."
    
    # 找到PostgreSQL配置文件
    PG_DATA_DIR=$(find /var/lib/pgsql -name "postgresql.conf" -exec dirname {} \; 2>/dev/null | head -n 1)
    
    if [ -z "$PG_DATA_DIR" ]; then
        PG_DATA_DIR="/var/lib/pgsql/data"
        warning "未找到PostgreSQL配置目录，使用默认路径: $PG_DATA_DIR"
    else
        info "找到PostgreSQL配置目录: $PG_DATA_DIR"
    fi
    
    # 备份原始配置文件
    cp "$PG_DATA_DIR/postgresql.conf" "$PG_DATA_DIR/postgresql.conf.bak"
    cp "$PG_DATA_DIR/pg_hba.conf" "$PG_DATA_DIR/pg_hba.conf.bak"
    
    # 修改postgresql.conf允许远程连接
    info "配置postgresql.conf允许远程连接..."
    sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" "$PG_DATA_DIR/postgresql.conf"
    
    # 修改pg_hba.conf允许远程连接
    info "配置pg_hba.conf允许远程连接..."
    echo "# 允许所有IP远程连接 (使用密码认证)" >> "$PG_DATA_DIR/pg_hba.conf"
    echo "host    all             all             0.0.0.0/0               md5" >> "$PG_DATA_DIR/pg_hba.conf"
    
    # 重启PostgreSQL服务
    info "重启PostgreSQL服务应用新配置..."
    systemctl restart postgresql
    
    if [ $? -ne 0 ]; then
        error "PostgreSQL服务重启失败，请检查配置"
        exit 1
    fi
    
    success "PostgreSQL配置完成"
}

# 创建数据库和用户
create_database() {
    info "创建数据库和用户..."
    
    # 设置数据库名称和用户
    DB_NAME="goworld_auto_parts"
    DB_USER="goworld_user"
    DB_PASSWORD="your_strong_password"  # 建议修改为强密码
    
    # 创建数据库和用户
    su - postgres -c "psql -c \"CREATE DATABASE $DB_NAME;\""
    su - postgres -c "psql -c \"CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';\""
    su - postgres -c "psql -c \"GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;\""
    su - postgres -c "psql -c \"ALTER USER $DB_USER CREATEDB;\""
    
    success "数据库 '$DB_NAME' 和用户 '$DB_USER' 创建成功"
    info "请记住以下信息用于连接数据库:"
    info "数据库名: $DB_NAME"
    info "用户名: $DB_USER"
    info "密码: $DB_PASSWORD"
    info "主机: 你的服务器IP"
    info "端口: 5432"
}

# 配置防火墙
configure_firewall() {
    info "配置防火墙允许PostgreSQL连接..."
    
    # 检查防火墙是否运行
    if systemctl is-active firewalld >/dev/null 2>&1; then
        # 开放PostgreSQL端口
        firewall-cmd --permanent --add-port=5432/tcp
        firewall-cmd --reload
        success "防火墙已配置允许5432端口"
    else
        warning "防火墙服务未运行，跳过防火墙配置"
    fi
}

# 主函数
main() {
    info "===== PostgreSQL安装和配置脚本 ====="
    
    # 安装PostgreSQL（如果尚未安装）
    if [ "$POSTGRES_INSTALLED" = false ]; then
        install_postgresql
    fi
    
    # 配置PostgreSQL
    configure_postgresql
    
    # 创建数据库和用户
    create_database
    
    # 配置防火墙
    configure_firewall
    
    # 显示PostgreSQL状态
    info "PostgreSQL状态:"
    systemctl status postgresql --no-pager
    
    success "===== PostgreSQL安装和配置完成 ====="
    info "现在你可以远程连接到PostgreSQL数据库了"
}

# 执行主函数
main