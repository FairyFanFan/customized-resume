# 🚀 Vercel 部署配置指南

## 问题：GitHub Actions 部署失败

如果你看到 `Input required and not supplied: vercel-token` 错误，说明GitHub Actions缺少必要的Vercel配置。

## 🔧 解决方案

### 方法一：配置GitHub Secrets（推荐）

#### 1. 获取Vercel配置信息

**获取Vercel Token**：
1. 访问 [Vercel Dashboard](https://vercel.com/account/tokens)
2. 点击 "Create Token"
3. 输入名称（如：`GitHub Actions`）
4. 选择过期时间
5. 复制生成的token

**获取Organization ID和Project ID**：
```bash
# 安装Vercel CLI
npm install -g vercel

# 登录Vercel
vercel login

# 获取项目信息
vercel project ls
```

或者：
1. 访问你的Vercel项目页面
2. 在URL中找到项目ID：`https://vercel.com/your-org/your-project`
3. 在项目设置中找到Organization ID

#### 2. 配置GitHub Secrets

1. 进入GitHub仓库页面
2. 点击 **Settings** 标签
3. 左侧菜单选择 **Secrets and variables** > **Actions**
4. 点击 **New repository secret**
5. 添加以下三个secrets：

| Secret名称 | 值 | 说明 |
|-----------|-----|------|
| `VERCEL_TOKEN` | `your_vercel_token` | Vercel API Token |
| `VERCEL_ORG_ID` | `your_org_id` | Vercel Organization ID |
| `VERCEL_PROJECT_ID` | `your_project_id` | Vercel Project ID |

#### 3. 验证配置

配置完成后，下次推送代码时GitHub Actions会自动部署到Vercel。

### 方法二：手动部署

如果不想配置自动部署，可以使用手动部署：

```bash
# 本地部署
npm run build
vercel --prod

# 或使用部署脚本
./deploy.sh
```

### 方法三：使用Vercel GitHub集成

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 **New Project**
3. 选择 **Import Git Repository**
4. 选择你的GitHub仓库
5. 配置项目设置
6. 启用自动部署

## 📋 环境变量配置

### 在Vercel Dashboard中配置：

1. 进入项目设置
2. 选择 **Environment Variables**
3. 添加以下变量：

| 变量名 | 值 | 环境 |
|--------|-----|------|
| `NEXT_PUBLIC_DEEPSEEK_API_KEY` | `your_deepseek_api_key` | Production, Preview, Development |

### 在GitHub Secrets中配置（可选）：

| Secret名称 | 值 | 说明 |
|-----------|-----|------|
| `DEEPSEEK_API_KEY` | `your_deepseek_api_key` | DeepSeek API密钥 |

## 🔍 故障排除

### 常见问题

**Q: 如何找到Vercel Project ID？**
A: 
- 方法1：访问项目URL，ID在URL中
- 方法2：运行 `vercel project ls`
- 方法3：在项目设置页面查看

**Q: Organization ID在哪里？**
A: 
- 在Vercel Dashboard的团队设置中
- 或运行 `vercel teams ls`

**Q: Token权限不足？**
A: 
- 确保token有足够的权限
- 检查token是否过期
- 重新生成token

**Q: 部署成功但网站无法访问？**
A: 
- 检查环境变量是否正确配置
- 查看Vercel部署日志
- 确认域名配置

### 调试步骤

1. **检查GitHub Actions日志**：
   - 进入仓库的Actions页面
   - 查看最新的workflow运行结果
   - 检查错误信息

2. **验证Vercel配置**：
   ```bash
   vercel whoami
   vercel project ls
   ```

3. **测试本地构建**：
   ```bash
   npm run build
   npm start
   ```

## 📚 相关文档

- [Vercel GitHub Actions](https://vercel.com/guides/how-can-i-use-github-actions-with-vercel)
- [Vercel CLI文档](https://vercel.com/docs/cli)
- [GitHub Secrets文档](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

## 🎯 最佳实践

1. **安全性**：
   - 定期轮换API密钥
   - 使用最小权限原则
   - 不要在代码中硬编码密钥

2. **监控**：
   - 设置部署通知
   - 监控部署状态
   - 配置错误告警

3. **备份**：
   - 保存重要的配置信息
   - 定期备份环境变量
   - 记录部署历史
