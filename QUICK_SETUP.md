# 🚀 DeepSeek API 快速配置指南

## 问题：API密钥未配置

如果你看到 `"DeepSeek API密钥未配置"` 错误，请按照以下步骤配置：

## 方法一：使用配置脚本（推荐）

```bash
# 运行配置脚本
./setup-deepseek.sh
```

## 方法二：手动配置

### 1. 获取API密钥
- 访问 [DeepSeek开发者平台](https://platform.deepseek.com/)
- 注册并登录账户
- 创建新的API密钥

### 2. 创建环境变量文件
在项目根目录创建 `.env.local` 文件：

```bash
# 创建文件
touch .env.local
```

### 3. 添加配置内容
在 `.env.local` 文件中添加：

```env
# DeepSeek API 配置
NEXT_PUBLIC_DEEPSEEK_API_KEY=your_actual_api_key_here

# 可选配置
NEXT_PUBLIC_DEEPSEEK_MODEL=deepseek-chat
NEXT_PUBLIC_DEEPSEEK_TIMEOUT=30000
```

### 4. 重启开发服务器
```bash
# 停止当前服务器 (Ctrl+C)
# 重新启动
npm run dev
```

## 验证配置

1. 打开浏览器开发者工具
2. 填写简历信息并提交
3. 查看网络请求，确认API调用成功

## 常见问题

### Q: API密钥格式是什么？
A: DeepSeek API密钥通常以 `sk-` 开头，例如：`sk-1234567890abcdef...`

### Q: 配置后仍然报错？
A: 请检查：
- `.env.local` 文件是否在项目根目录
- API密钥是否正确复制
- 是否重启了开发服务器
- 网络连接是否正常

### Q: 如何测试API密钥是否有效？
A: 可以访问 [DeepSeek API文档](https://platform.deepseek.com/api-docs/) 进行测试

## 安全提醒

⚠️ **重要**：
- 不要将API密钥提交到Git仓库
- `.env.local` 文件已在 `.gitignore` 中
- 定期轮换API密钥
- 不要在客户端代码中硬编码密钥

## 获取帮助

如果仍有问题，请：
1. 检查 [DeepSeek官方文档](https://platform.deepseek.com/)
2. 查看项目日志输出
3. 确认账户余额充足
