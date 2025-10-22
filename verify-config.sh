#!/bin/bash

# DeepSeek API配置成功确认脚本
echo "🎉 DeepSeek API配置成功确认"
echo "=========================="

# 检查环境变量文件
if [ -f ".env.local" ]; then
    API_KEY=$(grep "NEXT_PUBLIC_DEEPSEEK_API_KEY" .env.local | cut -d'=' -f2)
    echo "✅ 环境变量文件存在"
    echo "📋 API密钥: ${API_KEY:0:10}..."
else
    echo "❌ 环境变量文件不存在"
    exit 1
fi

# 检查API密钥格式
if [[ $API_KEY =~ ^sk- ]]; then
    echo "✅ API密钥格式正确"
else
    echo "⚠️  API密钥格式可能不正确（应该以sk-开头）"
fi

# 测试API连接
echo "🔍 测试API连接..."
response=$(curl -X GET "https://api.deepseek.com/v1/models" \
  -H "Authorization: Bearer $API_KEY" \
  --connect-timeout 10 \
  --max-time 30 \
  -w "HTTPSTATUS:%{http_code}" \
  -s)

http_code=$(echo $response | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')

case $http_code in
    200)
        echo "✅ API连接正常"
        echo "🎯 配置完成！可以开始使用AI优化功能了"
        ;;
    401)
        echo "❌ API密钥无效"
        echo "💡 请检查API密钥是否正确"
        exit 1
        ;;
    402)
        echo "⚠️  账户余额不足"
        echo "💡 请访问 https://platform.deepseek.com/billing 充值"
        ;;
    *)
        echo "❓ API连接异常 (状态码: $http_code)"
        ;;
esac

echo ""
echo "🚀 下一步操作："
echo "1. 启动开发服务器: npm run dev"
echo "2. 打开浏览器访问: http://localhost:3000"
echo "3. 填写简历信息并测试AI优化功能"
echo ""
echo "📚 相关文档："
echo "- DeepSeek集成指南: DEEPSEEK_INTEGRATION.md"
echo "- API密钥配置: API_KEY_SETUP.md"
echo "- 部署指南: DEPLOYMENT_GUIDE.md"
echo ""
echo "🎉 恭喜！DeepSeek API已成功配置！"
