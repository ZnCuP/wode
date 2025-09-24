# 项目更新部署指南

本指南介绍如何在项目修改后将新内容部署到阿里云服务器。

## 🚀 快速开始

### 准备工作

1. 确保所有脚本都有执行权限：
```bash
chmod +x update_deploy.sh git_deploy.sh server_manage.sh
```

2. 确保可以SSH连接到服务器：
```bash
ssh root@8.134.236.143
```

## 📋 更新部署方式

### 方式一：快速更新部署（推荐日常使用）

**适用场景：** 小幅修改、紧急修复、快速测试

**使用方法：**
```bash
./update_deploy.sh
```

**特点：**
- ✅ 快速简单，一键部署
- ✅ 自动备份当前版本
- ✅ 自动重启服务
- ✅ 检查部署状态
- ❌ 不保留版本历史

### 方式二：Git自动部署（推荐正式环境）

**适用场景：** 正式发布、版本管理、团队协作

**前置条件：**
1. 项目需要托管在Git仓库（GitHub、GitLab等）
2. 修改 `git_deploy.sh` 中的仓库地址：
```bash
GIT_REPO="https://github.com/yourusername/goworldauto.git"
```

**使用方法：**
```bash
# 带自定义提交信息
./git_deploy.sh "修复了新闻页面的显示问题"

# 使用默认提交信息
./git_deploy.sh
```

**特点：**
- ✅ 完整的版本控制
- ✅ 可回滚到任意版本
- ✅ 团队协作友好
- ✅ 自动备份和重启
- ❌ 需要Git仓库

### 方式三：手动文件上传

**适用场景：** 单个文件修改、临时测试

**使用方法：**
```bash
# 上传单个文件
scp path/to/file root@8.134.236.143:/var/www/goworldauto/

# 上传整个目录
scp -r path/to/directory root@8.134.236.143:/var/www/goworldauto/

# 重启服务
./server_manage.sh restart
```

## 🔧 服务器管理

### 服务管理脚本

使用 `server_manage.sh` 脚本管理服务器：

```bash
# 查看服务状态
./server_manage.sh status

# 重启所有服务
./server_manage.sh restart

# 查看服务日志
./server_manage.sh logs

# 停止所有服务
./server_manage.sh stop

# 启动所有服务
./server_manage.sh start

# 创建项目备份
./server_manage.sh backup
```

### 手动服务管理

如果需要直接在服务器上操作：

```bash
# SSH连接到服务器
ssh root@8.134.236.143

# 后端服务管理
systemctl status goworldauto-backend    # 查看状态
systemctl restart goworldauto-backend   # 重启
systemctl stop goworldauto-backend      # 停止
systemctl start goworldauto-backend     # 启动

# Nginx管理
systemctl status nginx     # 查看状态
systemctl reload nginx     # 重新加载配置
systemctl restart nginx    # 重启

# 查看日志
journalctl -u goworldauto-backend -f    # 实时查看后端日志
tail -f /var/log/nginx/error.log        # 实时查看Nginx错误日志
```

## 📁 服务器文件结构

```
/var/www/goworldauto/
├── assets/              # 静态资源
├── pages/               # HTML页面
├── scripts/             # JavaScript文件
├── styles/              # CSS样式
├── backend/             # 后端代码
│   ├── main.py         # FastAPI应用
│   ├── .env            # 环境配置
│   └── requirements.txt # Python依赖
├── index.html          # 首页
└── style.css           # 主样式文件
```

## 🔄 常见更新场景

### 1. 修改前端页面或样式

```bash
# 修改完成后
./update_deploy.sh
```

### 2. 修改后端API

```bash
# 修改完成后
./update_deploy.sh
# 或者使用Git方式
./git_deploy.sh "更新API接口"
```

### 3. 添加新的Python依赖

```bash
# 1. 更新requirements.txt
# 2. 部署
./update_deploy.sh
# 脚本会自动安装新依赖
```

### 4. 数据库结构变更

```bash
# 1. 准备迁移脚本
# 2. 部署代码
./update_deploy.sh

# 3. 手动执行数据库迁移
ssh root@8.134.236.143
cd /var/www/goworldauto/backend
python3 your_migration_script.py
systemctl restart goworldauto-backend
```

## 🚨 故障排除

### 部署失败

1. 检查SSH连接：
```bash
ssh root@8.134.236.143
```

2. 检查服务状态：
```bash
./server_manage.sh status
```

3. 查看错误日志：
```bash
./server_manage.sh logs
```

### 服务启动失败

1. 检查Python依赖：
```bash
ssh root@8.134.236.143
cd /var/www/goworldauto/backend
pip3 install -r requirements.txt
```

2. 检查数据库连接：
```bash
# 检查.env文件配置
cat /var/www/goworldauto/backend/.env
```

3. 手动启动测试：
```bash
cd /var/www/goworldauto/backend
python3 -m uvicorn main:app --host 0.0.0.0 --port 8001
```

### 回滚到备份版本

```bash
ssh root@8.134.236.143
systemctl stop goworldauto-backend
rm -rf /var/www/goworldauto
mv /var/www/goworldauto_backup /var/www/goworldauto
systemctl start goworldauto-backend
systemctl reload nginx
```

## 📊 监控和维护

### 定期检查

建议每周执行：
```bash
./server_manage.sh status
./server_manage.sh backup
```

### 日志清理

定期清理日志文件：
```bash
ssh root@8.134.236.143
journalctl --vacuum-time=30d  # 保留30天的系统日志
```

### 安全更新

定期更新系统：
```bash
ssh root@8.134.236.143
yum update -y  # CentOS/RHEL
# 或
apt update && apt upgrade -y  # Ubuntu/Debian
```

## 💡 最佳实践

1. **使用Git部署** - 正式环境推荐使用Git自动部署
2. **定期备份** - 重要更新前先创建备份
3. **测试验证** - 部署后及时验证功能是否正常
4. **监控日志** - 定期查看服务日志，及时发现问题
5. **版本标记** - 重要版本使用Git标签标记

---

## 📞 技术支持

如果遇到问题，请：
1. 查看本指南的故障排除部分
2. 检查服务器日志
3. 确认网络连接正常
4. 验证配置文件正确性