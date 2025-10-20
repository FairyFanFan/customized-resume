import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Settings } from 'lucide-react';

const resumeSchema = z.object({
  personalInfo: z.object({
    name: z.string().min(1, '个人信息不能为空'),
  }),
  targetJob: z.object({
    requirements: z.string().optional(),
  }),
  aiModel: z.string().default('deepseek'),
});

export type ResumeFormData = z.infer<typeof resumeSchema>;

interface ResumeFormProps {
  onSubmit: (data: ResumeFormData) => void;
}

export default function ResumeForm({ onSubmit }: ResumeFormProps) {
  const {
    register,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      personalInfo: {
        name: '',
      },
      targetJob: {
        requirements: '',
      },
      aiModel: 'deepseek',
    },
  });

  return (
    <div className="flex flex-col md:flex-row gap-8">
   
      {/* 右侧：表单内容 */}
      <div className="w-full md:w-3/4">
        <div className="form-card animate-float">
          <div className="text-center mb-8">
            <h2 className="section-header">
              <Settings className="h-8 w-8 mr-3" />
              填写简历信息
            </h2>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* 个人信息 */}
            <div className="floating-card">
              <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
                个人信息
              </h2>
              <div>
                <textarea
                  {...register('personalInfo.name')}
                  rows={4}
                  className="input-field"
                  placeholder="请填写您的个人信息，包括姓名、邮箱、电话、地址、LinkedIn、GitHub等联系方式..."
                />
                <div className="mt-2 text-sm text-gray-600">
                  <p className="mb-2">💡 提示：输入您的基础简历，我们会根据您的简历生成专业的简历</p>
                </div>
              </div>
            </div>

            {/* 目标岗位要求 */}
            <div className="floating-card">
              <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-blue-600 rounded-full mr-3"></div>
                目标岗位要求
              </h2>
              <div>
                <textarea
                  {...register('targetJob.requirements')}
                  rows={6}
                  className="input-field"
                  placeholder="请粘贴目标岗位的详细要求，包括职位名称、技能要求、工作经验、学历要求等..."
                />
                <div className="mt-2 text-sm text-gray-600">
                  <p className="mb-2">💡 提示：您可以复制招聘网站上的完整岗位要求，我们将帮您分析并优化简历内容</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">技能匹配</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">经验优化</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">关键词提取</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI模型选择 */}
            <div className="floating-card">
              <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full mr-3"></div>
                AI模型选择
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">选择AI模型</label>
                <select
                  {...register('aiModel')}
                  className="input-field"
                >
                  <option value="deepseek">DeepSeek</option>
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-3.5">GPT-3.5</option>
                  <option value="claude">Claude</option>
                  <option value="gemini">Gemini</option>
                </select>
                <div className="mt-2 text-sm text-gray-600">
                  <p className="mb-2">🤖 选择AI模型来优化您的简历内容</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">智能优化</span>
                    <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-xs">内容生成</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">格式调整</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-8">
              <button
                type="submit"
                className="gradient-button text-lg px-8 py-4 shadow-2xl hover:shadow-3xl"
              >
                ✨ 生成简历预览
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
