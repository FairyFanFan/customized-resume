# 🔑 DeepSeek API密钥配置指南

## 当前问题
你遇到的错误：`"API请求失败: Authentication Fails, Your api key: ****_key is invalid"`

这表明当前使用的API密钥 `test_key` 不是有效的DeepSeek API密钥。

## 🚀 解决步骤

### 1. 获取真实的DeepSeek API密钥

**方法一：通过DeepSeek官网**
1. 访问 [DeepSeek开发者平台](https://platform.deepseek.com/)
2. 注册并登录账户
3. 进入API管理页面
4. 创建新的API密钥
5. 复制生成的密钥（通常以 `sk-` 开头）

**方法二：通过DeepSeek控制台**
1. 登录 [DeepSeek控制台](https://console.deepseek.com/)
2. 选择API管理
3. 创建新的API密钥
4. 记录密钥信息

### 2. 配置API密钥

**方法一：使用配置脚本**
```bash
# 运行配置脚本
./setup-deepseek.sh
```

**方法二：手动配置**
```bash
# 创建环境变量文件
echo "NEXT_PUBLIC_DEEPSEEK_API_KEY=your_actual_api_key_here" > .env.local
```

### 3. 验证配置

配置完成后：
1. 重启开发服务器：`npm run dev`
2. 测试AI优化功能
3. 检查浏览器控制台是否有错误

## 🔍 API密钥格式

有效的DeepSeek API密钥通常：
- 以 `sk-` 开头
- 长度约32-64个字符
- 包含字母和数字

示例：`sk-1234567890abcdef1234567890abcdef`

## ⚠️ 常见问题

**Q: 在哪里可以找到API密钥？**
A: 
- DeepSeek官网：https://platform.deepseek.com/
- DeepSeek控制台：https://console.deepseek.com/

**Q: API密钥格式不正确？**
A: 
- 确保密钥以 `sk-` 开头
- 检查是否完整复制了密钥
- 确认没有多余的空格或字符

**Q: 配置后仍然报错？**
A: 
- 检查 `.env.local` 文件是否存在
- 确认密钥格式正确
- 重启开发服务器
- 检查网络连接

**Q: 如何测试API密钥是否有效？**
A: 
- 使用DeepSeek官方API测试工具
- 或通过项目中的AI优化功能测试

## 🛠️ 快速修复

如果你已经有有效的API密钥，可以直接运行：

```bash
# 替换为你的真实API密钥
echo "NEXT_PUBLIC_DEEPSEEK_API_KEY=sk-your-actual-api-key-here" > .env.local

# 重启开发服务器
npm run dev
```

## 📞 获取帮助

如果仍有问题：
1. 检查 [DeepSeek官方文档](https://platform.deepseek.com/)
2. 确认账户状态和余额
3. 查看项目日志输出
4. 联系DeepSeek技术支持
