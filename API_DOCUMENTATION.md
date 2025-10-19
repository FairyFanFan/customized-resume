# API Documentation / API 文档

This document describes the API structure and component interfaces for the Resume Generator application.

本文档描述了简历生成器应用程序的API结构和组件接口。

---

## Components / 组件

### Header Component / 头部组件

**File / 文件**: `src/components/Header.tsx`

**Props / 属性**:
```typescript
interface HeaderProps {
  activeTab: 'form' | 'preview' | 'download';
  onTabChange: (tab: 'form' | 'preview' | 'download') => void;
}
```

**Description / 描述**: Navigation header component with tab switching functionality.

导航头部组件，具有标签切换功能。

---

### ResumeForm Component / 简历表单组件

**File / 文件**: `src/components/ResumeForm.tsx`

**Props / 属性**:
```typescript
interface ResumeFormProps {
  onSubmit: (data: ResumeFormData) => void;
}
```

**Data Schema / 数据模式**:
```typescript
type ResumeFormData = {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    linkedin?: string;
    github?: string;
  };
  summary?: string;
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description?: string;
  }>;
  education: Array<{
    school: string;
    degree: string;
    major?: string;
    graduationDate?: string;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description?: string;
    technologies?: string;
    url?: string;
  }>;
};
```

**Description / 描述**: Comprehensive form component for collecting resume information with validation.

用于收集简历信息的综合表单组件，具有验证功能。

---

### ResumePreview Component / 简历预览组件

**File / 文件**: `src/components/ResumePreview.tsx`

**Props / 属性**:
```typescript
interface ResumePreviewProps {
  data: ResumeFormData;
}
```

**Description / 描述**: Displays formatted resume preview based on form data.

基于表单数据显示格式化的简历预览。

---

### ExportResume Component / 导出简历组件

**File / 文件**: `src/components/ExportResume.tsx`

**Props / 属性**:
```typescript
interface ExportResumeProps {
  resumeData: ResumeFormData;
}
```

**Methods / 方法**:
- `exportToPDF()` - Exports resume as PDF file / 将简历导出为PDF文件
- `exportToImage()` - Exports resume as PNG image / 将简历导出为PNG图片

**Description / 描述**: Handles resume export functionality in multiple formats.

处理多种格式的简历导出功能。

---

## Form Validation / 表单验证

**Library / 库**: Zod

**Schema / 模式**:
```typescript
const resumeSchema = z.object({
  personalInfo: z.object({
    name: z.string().min(1, '姓名不能为空'),
    email: z.string().email('请输入有效的邮箱地址'),
    phone: z.string().min(1, '电话号码不能为空'),
    address: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
  }),
  summary: z.string().optional(),
  experience: z.array(z.object({
    company: z.string().min(1, '公司名称不能为空'),
    position: z.string().min(1, '职位不能为空'),
    startDate: z.string().min(1, '开始日期不能为空'),
    endDate: z.string().optional(),
    current: z.boolean().default(false),
    description: z.string().optional(),
  })),
  education: z.array(z.object({
    school: z.string().min(1, '学校名称不能为空'),
    degree: z.string().min(1, '学位不能为空'),
    major: z.string().optional(),
    graduationDate: z.string().optional(),
  })),
  skills: z.array(z.string()),
  projects: z.array(z.object({
    name: z.string().min(1, '项目名称不能为空'),
    description: z.string().optional(),
    technologies: z.string().optional(),
    url: z.string().optional(),
  })),
});
```

---

## Export Functionality / 导出功能

### PDF Export / PDF导出

**Dependencies / 依赖**:
- `html2canvas` - Converts HTML to canvas / 将HTML转换为画布
- `jspdf` - Generates PDF documents / 生成PDF文档

**Process / 流程**:
1. Capture resume HTML as canvas / 将简历HTML捕获为画布
2. Convert canvas to image data / 将画布转换为图像数据
3. Create PDF document with image / 使用图像创建PDF文档
4. Handle multi-page scenarios / 处理多页场景
5. Download PDF file / 下载PDF文件

### Image Export / 图片导出

**Process / 流程**:
1. Capture resume HTML as canvas / 将简历HTML捕获为画布
2. Convert canvas to PNG data URL / 将画布转换为PNG数据URL
3. Trigger download with filename / 使用文件名触发下载

---

## Styling System / 样式系统

**Framework / 框架**: Tailwind CSS

**Custom Classes / 自定义类**:
```css
.btn-primary {
  @apply px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors;
}

.form-input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors;
}

.card {
  @apply bg-white rounded-lg shadow-sm border border-gray-200;
}
```

---

## State Management / 状态管理

**Pattern / 模式**: React useState hooks

**Main State / 主要状态**:
```typescript
const [activeTab, setActiveTab] = useState<'form' | 'preview' | 'download'>('form');
const [resumeData, setResumeData] = useState<ResumeFormData | null>(null);
```

**Description / 描述**: Simple state management using React hooks for tab navigation and data persistence.

使用React钩子进行简单的状态管理，用于标签导航和数据持久化。

---

## Error Handling / 错误处理

**Form Validation / 表单验证**: Client-side validation with Zod schema / 使用Zod模式进行客户端验证

**Export Errors / 导出错误**: Try-catch blocks with user-friendly error messages / 使用用户友好的错误消息的try-catch块

**Error Messages / 错误消息**: Localized in Chinese with clear instructions / 使用中文本地化，提供清晰的说明

---

## Browser Compatibility / 浏览器兼容性

**Supported Browsers / 支持的浏览器**:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Features / 功能**:
- Modern ES6+ syntax / 现代ES6+语法
- CSS Grid and Flexbox / CSS Grid和Flexbox
- Canvas API for export / 用于导出的Canvas API
- File download API / 文件下载API
