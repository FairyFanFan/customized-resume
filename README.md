# Resume Generator / 简历生成器

A modern resume generation website based on Next.js + React, helping users quickly create professional resumes.

一个基于 Next.js + React 的现代化简历生成网站，帮助用户快速创建专业的简历。

---

## Features / 功能特性

- 📝 **Smart Form / 智能表单** - Step-by-step form for personal info, work experience, education, etc. / 分步骤填写个人信息、工作经历、教育背景等
- 👀 **Real-time Preview / 实时预览** - Instant resume preview with WYSIWYG / 即时查看简历效果，所见即所得
- 📄 **Multi-format Export / 多格式导出** - Export as PDF and PNG image formats / 支持导出为PDF和PNG图片格式
- 🎨 **Modern Design / 现代设计** - Clean and beautiful interface with responsive layout / 简洁美观的界面设计，响应式布局
- ⚡ **Quick Generation / 快速生成** - Generate professional resumes based on templates / 基于模板快速生成专业简历

## Tech Stack / 技术栈

- **Frontend Framework / 前端框架**: Next.js 15 + React 18
- **Styling / 样式**: Tailwind CSS
- **Form Handling / 表单处理**: React Hook Form + Zod
- **Icons / 图标**: Lucide React
- **PDF Generation / PDF生成**: jsPDF + html2canvas
- **Type Checking / 类型检查**: TypeScript

## Quick Start / 快速开始

### Install Dependencies / 安装依赖

```bash
npm install
```

### Start Development Server / 启动开发服务器

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### Build for Production / 构建生产版本

```bash
npm run build
npm start
```

## Project Structure / 项目结构

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles / 全局样式
│   ├── layout.tsx      # Root layout / 根布局
│   └── page.tsx        # Main page / 主页面
├── components/         # React components / React 组件
│   ├── Header.tsx      # Navigation header / 导航头部
│   ├── ResumeForm.tsx  # Resume form / 简历表单
│   ├── ResumePreview.tsx # Resume preview / 简历预览
│   └── ExportResume.tsx # Export functionality / 导出功能
└── types/              # TypeScript type definitions / TypeScript 类型定义
```

## Usage Instructions / 使用说明

1. **Fill Information / 填写信息** - Fill in personal info, work experience, education, etc. on the form page / 在表单页面填写个人信息、工作经历、教育背景等
2. **Preview Resume / 预览简历** - Switch to preview page to view resume effect / 切换到预览页面查看简历效果
3. **Export Resume / 导出简历** - Choose PDF or image format to export resume / 选择PDF或图片格式导出简历

## Resume Template / 简历模板

The resume adopts a modern design style, including the following sections:

简历采用现代化的设计风格，包含以下部分：

- Personal Information (name, contact info, social media links) / 个人信息（姓名、联系方式、社交媒体链接）
- Personal Summary / 个人简介
- Work Experience / 工作经历
- Education Background / 教育背景
- Skills Tags / 技能标签
- Project Experience / 项目经历

## Development Notes / 开发说明

### Adding New Resume Fields / 添加新的简历字段

1. Update form schema in `ResumeForm.tsx` / 在 `ResumeForm.tsx` 中更新表单schema
2. Add corresponding display logic in `ResumePreview.tsx` / 在 `ResumePreview.tsx` 中添加对应的显示逻辑
3. Update export template in `ExportResume.tsx` / 在 `ExportResume.tsx` 中更新导出模板

### Customizing Styles / 自定义样式

The project uses Tailwind CSS. You can customize styles by modifying component classes in `globals.css`.

项目使用 Tailwind CSS，可以通过修改 `globals.css` 中的组件类来自定义样式。

## License / 许可证

MIT License