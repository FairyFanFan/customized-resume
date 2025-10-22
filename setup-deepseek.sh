#!/bin/bash

# DeepSeek API 配置脚本
echo "🔧 DeepSeek API 配置助手"
echo "=========================="

# 检查是否已存在 .env.local 文件
if [ -f ".env.local" ]; then
    echo "⚠️  发现已存在的 .env.local 文件"
    read -p "是否要覆盖现有配置？(y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ 配置已取消"
        exit 1
    fi
fi

echo "📝 请输入您的 DeepSeek API 密钥："
echo "   (可在 https://platform.deepseek.com/ 获取)"
read -p "API Key: " api_key

if [ -z "$api_key" ]; then
    echo "❌ API 密钥不能为空"
    exit 1
fi

# 创建 .env.local 文件
cat > .env.local << EOF
# DeepSeek API 配置
NEXT_PUBLIC_DEEPSEEK_API_KEY=$api_key

# 可选：设置默认模型
NEXT_PUBLIC_DEEPSEEK_MODEL=deepseek-chat

# 可选：设置API超时时间（毫秒）
NEXT_PUBLIC_DEEPSEEK_TIMEOUT=30000
EOF

echo "✅ 环境变量配置完成！"
echo ""
echo "📋 配置内容："
echo "   - API Key: ${api_key:0:10}..."
echo "   - 模型: deepseek-chat"
echo "   - 超时: 30000ms"
echo ""
echo "🚀 下一步："
echo "   1. 重启开发服务器: npm run dev"
echo "   2. 测试 AI 优化功能"
echo ""
echo "⚠️  注意：请妥善保管您的 API 密钥，不要分享给他人"
