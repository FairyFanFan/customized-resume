#!/bin/bash

# Vercel部署脚本
echo "🚀 开始部署到Vercel..."

# 检查是否已登录Vercel
if ! vercel whoami > /dev/null 2>&1; then
    echo "❌ 请先登录Vercel: vercel login"
    exit 1
fi

# 构建项目
echo "📦 构建项目..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败"
    exit 1
fi

# 部署到Vercel
echo "🌐 部署到Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo "✅ 部署成功！"
else
    echo "❌ 部署失败"
    exit 1
fi
