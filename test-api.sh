#!/bin/bash

# DeepSeek API密钥测试脚本
echo "🧪 DeepSeek API密钥测试"
echo "======================"

# 读取API密钥
if [ -f ".env.local" ]; then
    API_KEY=$(grep "NEXT_PUBLIC_DEEPSEEK_API_KEY" .env.local | cut -d'=' -f2)
    echo "📋 检测到API密钥: ${API_KEY:0:10}..."
else
    echo "❌ 未找到 .env.local 文件"
    exit 1
fi

# 测试API调用
echo "🔍 测试API连接..."

curl -X POST "https://api.deepseek.com/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_KEY" \
  -d '{
    "model": "deepseek-chat",
    "messages": [
      {
        "role": "user",
        "content": "Hello, this is a test message."
      }
    ],
    "max_tokens": 10
  }' \
  --connect-timeout 10 \
  --max-time 30 \
  -w "\nHTTP Status: %{http_code}\n" \
  -s

echo ""
echo "✅ 测试完成！"
echo ""
echo "📝 说明："
echo "- 如果看到HTTP Status: 200，说明API密钥有效"
echo "- 如果看到HTTP Status: 401，说明API密钥无效"
echo "- 如果看到其他错误，可能是网络问题"
