#!/bin/bash

# 简化的Vercel部署脚本
echo "🚀 Vercel 部署助手"
echo "=================="

# 检查是否已安装Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 安装Vercel CLI..."
    npm install -g vercel
fi

# 检查是否已登录Vercel
if ! vercel whoami > /dev/null 2>&1; then
    echo "🔐 请先登录Vercel..."
    vercel login
fi

# 显示当前项目信息
echo "📋 当前项目信息："
vercel project ls

echo ""
echo "🔧 配置选项："
echo "1. 部署到生产环境"
echo "2. 部署到预览环境"
echo "3. 查看部署状态"
echo "4. 配置环境变量"

read -p "请选择操作 (1-4): " choice

case $choice in
    1)
        echo "🚀 部署到生产环境..."
        npm run build
        if [ $? -eq 0 ]; then
            vercel --prod
        else
            echo "❌ 构建失败，请检查代码"
            exit 1
        fi
        ;;
    2)
        echo "🔍 部署到预览环境..."
        npm run build
        if [ $? -eq 0 ]; then
            vercel
        else
            echo "❌ 构建失败，请检查代码"
            exit 1
        fi
        ;;
    3)
        echo "📊 查看部署状态..."
        vercel ls
        ;;
    4)
        echo "⚙️ 配置环境变量..."
        echo "请在Vercel Dashboard中配置以下环境变量："
        echo "- NEXT_PUBLIC_DEEPSEEK_API_KEY"
        echo "- NEXT_PUBLIC_DEEPSEEK_MODEL"
        echo "- NEXT_PUBLIC_DEEPSEEK_TIMEOUT"
        echo ""
        echo "访问: https://vercel.com/dashboard"
        ;;
    *)
        echo "❌ 无效选择"
        exit 1
        ;;
esac

echo "✅ 操作完成！"
