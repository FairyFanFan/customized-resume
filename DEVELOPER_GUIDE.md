# Developer Guide / 开发者指南

This guide is for developers who want to understand, modify, or extend the Resume Generator application.

本指南适用于想要理解、修改或扩展简历生成器应用程序的开发者。

---

## Project Overview / 项目概述

The Resume Generator is a modern web application built with Next.js 15, React 18, and TypeScript. It provides a user-friendly interface for creating professional resumes with real-time preview and export functionality.

简历生成器是一个使用Next.js 15、React 18和TypeScript构建的现代Web应用程序。它提供了一个用户友好的界面，用于创建专业简历，具有实时预览和导出功能。

---

## Architecture / 架构

### Technology Stack / 技术栈

- **Frontend Framework / 前端框架**: Next.js 15 with App Router
- **UI Library / UI库**: React 18 with TypeScript
- **Styling / 样式**: Tailwind CSS
- **Form Management / 表单管理**: React Hook Form + Zod validation
- **Icons / 图标**: Lucide React
- **PDF Generation / PDF生成**: jsPDF + html2canvas
- **Build Tool / 构建工具**: Turbopack (Next.js)

### Project Structure / 项目结构

```
create-resume/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css        # Global styles and Tailwind config
│   │   ├── layout.tsx         # Root layout component
│   │   └── page.tsx           # Main application page
│   └── components/            # React components
│       ├── Header.tsx         # Navigation header
│       ├── ResumeForm.tsx     # Form for resume data input
│       ├── ResumePreview.tsx  # Resume preview component
│       └── ExportResume.tsx   # Export functionality
├── public/                    # Static assets
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

---

## Component Architecture / 组件架构

### State Management / 状态管理

The application uses React's built-in state management with `useState` hooks:

应用程序使用React的内置状态管理，使用`useState`钩子：

```typescript
// Main application state / 主应用程序状态
const [activeTab, setActiveTab] = useState<'form' | 'preview' | 'download'>('form');
const [resumeData, setResumeData] = useState<ResumeFormData | null>(null);
```

### Data Flow / 数据流

1. **Form Input / 表单输入**: User fills out `ResumeForm` component / 用户填写`ResumeForm`组件
2. **Data Validation / 数据验证**: Zod schema validates form data / Zod模式验证表单数据
3. **State Update / 状态更新**: Valid data updates application state / 有效数据更新应用程序状态
4. **Preview / 预览**: `ResumePreview` displays formatted resume / `ResumePreview`显示格式化的简历
5. **Export / 导出**: `ExportResume` generates downloadable files / `ExportResume`生成可下载的文件

---

## Development Setup / 开发设置

### Prerequisites / 先决条件

- Node.js 18+ / Node.js 18+
- npm or yarn / npm或yarn
- Modern code editor (VS Code recommended) / 现代代码编辑器（推荐VS Code）

### Installation / 安装

```bash
# Clone the repository / 克隆仓库
git clone <repository-url>
cd create-resume

# Install dependencies / 安装依赖
npm install

# Start development server / 启动开发服务器
npm run dev
```

### Available Scripts / 可用脚本

```bash
npm run dev          # Start development server / 启动开发服务器
npm run build        # Build for production / 构建生产版本
npm run start        # Start production server / 启动生产服务器
npm run lint         # Run ESLint / 运行ESLint
npm run type-check   # Run TypeScript type checking / 运行TypeScript类型检查
```

---

## Component Development / 组件开发

### Creating New Components / 创建新组件

1. **Create component file / 创建组件文件**:
```typescript
// src/components/NewComponent.tsx
'use client';

interface NewComponentProps {
  // Define props interface / 定义props接口
}

export default function NewComponent({ }: NewComponentProps) {
  return (
    <div>
      {/* Component JSX / 组件JSX */}
    </div>
  );
}
```

2. **Add TypeScript types / 添加TypeScript类型**:
```typescript
// Define interfaces for component props / 为组件props定义接口
interface ComponentProps {
  required: string;
  optional?: number;
}
```

3. **Use Tailwind CSS for styling / 使用Tailwind CSS进行样式设计**:
```typescript
<div className="bg-white rounded-lg shadow p-6">
  <h2 className="text-xl font-semibold mb-4">Title</h2>
</div>
```

### Form Development / 表单开发

The application uses React Hook Form with Zod validation:

应用程序使用React Hook Form和Zod验证：

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define schema / 定义模式
const schema = z.object({
  field: z.string().min(1, 'Error message'),
});

// Use in component / 在组件中使用
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
});
```

---

## Styling Guidelines / 样式指南

### Tailwind CSS Usage / Tailwind CSS使用

The project uses Tailwind CSS with custom component classes:

项目使用Tailwind CSS和自定义组件类：

```css
/* Custom component classes / 自定义组件类 */
.btn-primary {
  @apply px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700;
}

.form-input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500;
}
```

### Design System / 设计系统

**Colors / 颜色**:
- Primary: Blue (#2563eb) / 主要：蓝色
- Secondary: Gray (#6b7280) / 次要：灰色
- Success: Green (#10b981) / 成功：绿色
- Error: Red (#ef4444) / 错误：红色

**Typography / 排版**:
- Headings: Inter font, various weights / 标题：Inter字体，各种粗细
- Body text: Inter font, regular weight / 正文：Inter字体，常规粗细

**Spacing / 间距**:
- Use Tailwind's spacing scale (4, 6, 8, 12, 16, etc.) / 使用Tailwind的间距比例
- Consistent padding and margins / 一致的填充和边距

---

## Export Functionality / 导出功能

### PDF Generation / PDF生成

The PDF export uses html2canvas and jsPDF:

PDF导出使用html2canvas和jsPDF：

```typescript
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const exportToPDF = async () => {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
  });
  
  const pdf = new jsPDF('p', 'mm', 'a4');
  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0);
  pdf.save('resume.pdf');
};
```

### Image Export / 图片导出

PNG export uses html2canvas:

PNG导出使用html2canvas：

```typescript
const exportToImage = async () => {
  const canvas = await html2canvas(element);
  const link = document.createElement('a');
  link.download = 'resume.png';
  link.href = canvas.toDataURL();
  link.click();
};
```

---

## Testing / 测试

### Manual Testing / 手动测试

1. **Form Validation / 表单验证**:
   - Test required field validation / 测试必填字段验证
   - Test email format validation / 测试邮箱格式验证
   - Test dynamic field addition/removal / 测试动态字段添加/删除

2. **Export Functionality / 导出功能**:
   - Test PDF generation / 测试PDF生成
   - Test image export / 测试图片导出
   - Test file naming / 测试文件命名

3. **Responsive Design / 响应式设计**:
   - Test on different screen sizes / 在不同屏幕尺寸上测试
   - Test mobile compatibility / 测试移动设备兼容性

### Automated Testing / 自动化测试

To add automated testing:

要添加自动化测试：

```bash
# Install testing dependencies / 安装测试依赖
npm install --save-dev @testing-library/react @testing-library/jest-dom jest

# Add test scripts to package.json / 向package.json添加测试脚本
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch"
}
```

---

## Performance Optimization / 性能优化

### Code Splitting / 代码分割

Next.js automatically handles code splitting with the App Router:

Next.js通过App Router自动处理代码分割：

```typescript
// Dynamic imports for heavy components / 重型组件的动态导入
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});
```

### Image Optimization / 图片优化

Use Next.js Image component for optimized images:

使用Next.js Image组件进行图片优化：

```typescript
import Image from 'next/image';

<Image
  src="/profile.jpg"
  alt="Profile"
  width={200}
  height={200}
  priority
/>
```

---

## Deployment / 部署

### Vercel Deployment / Vercel部署

1. **Connect to Vercel / 连接到Vercel**:
```bash
npm install -g vercel
vercel login
vercel
```

2. **Environment Variables / 环境变量**:
```bash
# Add to .env.local / 添加到.env.local
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### Other Platforms / 其他平台

**Netlify / Netlify**:
```bash
npm run build
# Deploy dist folder / 部署dist文件夹
```

**Docker / Docker**:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## Contributing / 贡献

### Code Style / 代码风格

- Use TypeScript for all components / 对所有组件使用TypeScript
- Follow React best practices / 遵循React最佳实践
- Use meaningful variable and function names / 使用有意义的变量和函数名
- Add comments for complex logic / 为复杂逻辑添加注释

### Git Workflow / Git工作流

1. Create feature branch / 创建功能分支
2. Make changes with descriptive commits / 使用描述性提交进行更改
3. Test thoroughly / 彻底测试
4. Create pull request / 创建拉取请求
5. Code review and merge / 代码审查和合并

### Pull Request Guidelines / 拉取请求指南

- Clear description of changes / 清晰的更改描述
- Include screenshots for UI changes / 为UI更改包含截图
- Update documentation if needed / 如果需要，更新文档
- Ensure all tests pass / 确保所有测试通过

---

## Troubleshooting / 故障排除

### Common Development Issues / 常见开发问题

**Build Errors / 构建错误**:
```bash
# Clear Next.js cache / 清除Next.js缓存
rm -rf .next
npm run build
```

**Type Errors / 类型错误**:
```bash
# Run type checking / 运行类型检查
npm run type-check
```

**Styling Issues / 样式问题**:
```bash
# Restart development server / 重启开发服务器
npm run dev
```

### Debugging Tips / 调试提示

1. Use React Developer Tools / 使用React开发者工具
2. Check browser console for errors / 检查浏览器控制台错误
3. Use Next.js built-in debugging / 使用Next.js内置调试
4. Add console.log for state debugging / 添加console.log进行状态调试

---

## Resources / 资源

### Documentation / 文档

- [Next.js Documentation](https://nextjs.org/docs) / [Next.js文档](https://nextjs.org/docs)
- [React Documentation](https://react.dev) / [React文档](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) / [Tailwind CSS文档](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs) / [TypeScript文档](https://www.typescriptlang.org/docs)

### Useful Tools / 有用工具

- [React Hook Form](https://react-hook-form.com) / React Hook Form
- [Zod](https://zod.dev) / Zod验证库
- [Lucide Icons](https://lucide.dev) / Lucide图标
- [jsPDF](https://github.com/parallax/jsPDF) / jsPDF库
