#!/bin/bash

# DeepSeek API密钥快速修复脚本
echo "🔑 DeepSeek API密钥修复助手"
echo "============================="

echo "当前问题：API密钥无效"
echo "解决方案：配置正确的DeepSeek API密钥"
echo ""

echo "📋 获取API密钥的步骤："
echo "1. 访问 https://platform.deepseek.com/"
echo "2. 注册并登录账户"
echo "3. 进入API管理页面"
echo "4. 创建新的API密钥"
echo "5. 复制生成的密钥（以sk-开头）"
echo ""

read -p "请输入您的DeepSeek API密钥: " api_key

if [ -z "$api_key" ]; then
    echo "❌ API密钥不能为空"
    exit 1
fi

# 检查API密钥格式
if [[ ! $api_key =~ ^sk- ]]; then
    echo "⚠️  警告：API密钥通常以 'sk-' 开头"
    read -p "确认继续？(y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ 配置已取消"
        exit 1
    fi
fi

# 创建环境变量文件
cat > .env.local << EOF
# DeepSeek API 配置
NEXT_PUBLIC_DEEPSEEK_API_KEY=$api_key

# 可选：设置默认模型
NEXT_PUBLIC_DEEPSEEK_MODEL=deepseek-chat

# 可选：设置API超时时间（毫秒）
NEXT_PUBLIC_DEEPSEEK_TIMEOUT=30000
EOF

echo "✅ API密钥配置完成！"
echo ""
echo "📋 配置信息："
echo "   - API Key: ${api_key:0:10}..."
echo "   - 模型: deepseek-chat"
echo "   - 超时: 30000ms"
echo ""
echo "🚀 下一步："
echo "   1. 重启开发服务器: npm run dev"
echo "   2. 测试AI优化功能"
echo ""
echo "⚠️  注意："
echo "   - 请妥善保管您的API密钥"
echo "   - 不要将密钥分享给他人"
echo "   - 定期检查账户余额"
