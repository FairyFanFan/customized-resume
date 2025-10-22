#!/bin/bash

# DeepSeek账户余额检查脚本
echo "💰 DeepSeek账户余额检查"
echo "======================="

# 读取API密钥
if [ -f ".env.local" ]; then
    API_KEY=$(grep "NEXT_PUBLIC_DEEPSEEK_API_KEY" .env.local | cut -d'=' -f2)
    echo "📋 API密钥: ${API_KEY:0:10}..."
else
    echo "❌ 未找到 .env.local 文件"
    exit 1
fi

echo "🔍 检查账户状态..."

# 尝试获取账户信息
response=$(curl -X GET "https://api.deepseek.com/v1/models" \
  -H "Authorization: Bearer $API_KEY" \
  --connect-timeout 10 \
  --max-time 30 \
  -w "HTTPSTATUS:%{http_code}" \
  -s)

# 提取HTTP状态码
http_code=$(echo $response | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')
response_body=$(echo $response | sed -e 's/HTTPSTATUS:.*//g')

echo "📊 HTTP状态码: $http_code"

case $http_code in
    200)
        echo "✅ API密钥有效，账户状态正常"
        echo "📝 响应: $response_body"
        ;;
    401)
        echo "❌ API密钥无效"
        echo "💡 解决方案: 检查API密钥是否正确"
        ;;
    402)
        echo "⚠️  账户余额不足"
        echo "💡 解决方案: 请访问 https://platform.deepseek.com/ 充值"
        ;;
    429)
        echo "⚠️  请求频率过高"
        echo "💡 解决方案: 请稍后重试"
        ;;
    *)
        echo "❓ 未知错误 (状态码: $http_code)"
        echo "📝 响应: $response_body"
        ;;
esac

echo ""
echo "🔗 相关链接："
echo "- DeepSeek控制台: https://platform.deepseek.com/"
echo "- 账户充值: https://platform.deepseek.com/billing"
echo "- API文档: https://platform.deepseek.com/api-docs/"
