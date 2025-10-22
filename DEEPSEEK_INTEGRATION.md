# DeepSeek API 集成配置指南

## 环境变量配置

### 1. 创建环境变量文件

在项目根目录创建 `.env.local` 文件：

```bash
# DeepSeek API 配置
NEXT_PUBLIC_DEEPSEEK_API_KEY=your_deepseek_api_key_here
NEXT_PUBLIC_DEEPSEEK_MODEL=deepseek-chat
NEXT_PUBLIC_DEEPSEEK_TIMEOUT=30000
```

### 2. 获取 DeepSeek API 密钥

1. 访问 [DeepSeek 开发者平台](https://platform.deepseek.com/)
2. 注册并登录您的账户
3. 在控制台中创建新的 API 密钥
4. 将 API 密钥复制到 `.env.local` 文件中

### 3. 支持的模型

- `deepseek-chat` (默认)
- `deepseek-coder`
- 其他 DeepSeek 支持的模型

## 功能特性

### AI 简历优化
- 根据目标岗位要求优化简历内容
- 智能关键词匹配
- 工作经历描述优化
- 提供改进建议

### 错误处理
- API 调用失败时的友好错误提示
- 网络超时处理
- 降级处理（即使 AI 优化失败也能继续使用）

### 用户体验
- 实时加载状态显示
- 优化进度提示
- 错误状态反馈

## API 接口

### POST /api/optimize-resume

**请求体**:
```json
{
  "personalInfo": "用户个人信息文本",
  "targetJob": "目标岗位要求（可选）",
  "model": "deepseek-chat"
}
```

**响应**:
```json
{
  "success": true,
  "data": {
    "optimizedResume": "优化后的简历内容",
    "suggestions": ["建议1", "建议2"],
    "keywords": ["关键词1", "关键词2"]
  }
}
```

## 部署配置

### Vercel 部署

1. 在 Vercel 项目设置中添加环境变量：
   - `NEXT_PUBLIC_DEEPSEEK_API_KEY`
   - `NEXT_PUBLIC_DEEPSEEK_MODEL` (可选)
   - `NEXT_PUBLIC_DEEPSEEK_TIMEOUT` (可选)

2. 确保 API 密钥的安全性，不要在代码中硬编码

### 本地开发

1. 复制 `.env.example` 为 `.env.local`
2. 填入您的 DeepSeek API 密钥
3. 运行 `npm run dev` 启动开发服务器

## 故障排除

### 常见问题

1. **API 密钥无效**
   - 检查 API 密钥是否正确
   - 确认 API 密钥是否已激活
   - 检查账户余额是否充足

2. **网络超时**
   - 检查网络连接
   - 调整 `NEXT_PUBLIC_DEEPSEEK_TIMEOUT` 值
   - 检查 DeepSeek 服务状态

3. **响应解析错误**
   - 检查 API 响应格式
   - 查看控制台错误日志
   - 确认模型是否支持

### 调试模式

在开发环境中，可以在浏览器控制台查看详细的 API 调用日志。

## 安全注意事项

1. **API 密钥保护**
   - 不要在客户端代码中暴露 API 密钥
   - 使用环境变量存储敏感信息
   - 定期轮换 API 密钥

2. **请求限制**
   - 实施适当的请求频率限制
   - 验证用户输入
   - 防止恶意请求

3. **数据隐私**
   - 确保用户数据的安全传输
   - 遵守相关隐私法规
   - 定期清理临时数据
