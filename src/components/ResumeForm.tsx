import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2 } from 'lucide-react';

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

type ResumeFormData = z.infer<typeof resumeSchema>;

interface ResumeFormProps {
  onSubmit: (data: ResumeFormData) => void;
}

export default function ResumeForm({ onSubmit }: ResumeFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResumeFormData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      personalInfo: {
        name: '',
        email: '',
        phone: '',
        address: '',
        linkedin: '',
        github: '',
      },
      summary: '',
      experience: [],
      education: [],
      skills: [],
      projects: [],
    },
  });

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control,
    name: 'experience',
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: 'education',
  });

  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({
    control,
    name: 'projects',
  });

  const skills = watch('skills') || [];

  const addSkill = () => {
    const newSkill = prompt('请输入技能名称:');
    if (newSkill && newSkill.trim()) {
      const currentSkills = skills || [];
      const formData = watch();
      onSubmit({ ...formData, skills: [...currentSkills, newSkill.trim()] });
    }
  };

  const removeSkill = (index: number) => {
    const currentSkills = skills || [];
    const newSkills = currentSkills.filter((_, i) => i !== index);
    const formData = watch();
    onSubmit({ ...formData, skills: newSkills });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* 个人信息 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">个人信息</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">姓名 *</label>
              <input
                {...register('personalInfo.name')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请输入您的姓名"
              />
              {errors.personalInfo?.name && (
                <p className="text-red-500 text-sm mt-1">{errors.personalInfo.name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">邮箱 *</label>
              <input
                {...register('personalInfo.email')}
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请输入您的邮箱"
              />
              {errors.personalInfo?.email && (
                <p className="text-red-500 text-sm mt-1">{errors.personalInfo.email.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">电话 *</label>
              <input
                {...register('personalInfo.phone')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请输入您的电话号码"
              />
              {errors.personalInfo?.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.personalInfo.phone.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">地址</label>
              <input
                {...register('personalInfo.address')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请输入您的地址"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
              <input
                {...register('personalInfo.linkedin')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请输入您的LinkedIn链接"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
              <input
                {...register('personalInfo.github')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请输入您的GitHub链接"
              />
            </div>
          </div>
        </div>

        {/* 个人简介 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">个人简介</h2>
          <textarea
            {...register('summary')}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请简要介绍您的专业背景和职业目标..."
          />
        </div>

        {/* 工作经历 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">工作经历</h2>
            <button
              type="button"
              onClick={() => appendExperience({ company: '', position: '', startDate: '', endDate: '', current: false, description: '' })}
              className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-1" />
              添加经历
            </button>
          </div>
          {experienceFields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">工作经历 {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">公司名称 *</label>
                  <input
                    {...register(`experience.${index}.company`)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="请输入公司名称"
                  />
                  {errors.experience?.[index]?.company && (
                    <p className="text-red-500 text-sm mt-1">{errors.experience[index]?.company?.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">职位 *</label>
                  <input
                    {...register(`experience.${index}.position`)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="请输入职位名称"
                  />
                  {errors.experience?.[index]?.position && (
                    <p className="text-red-500 text-sm mt-1">{errors.experience[index]?.position?.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">开始日期 *</label>
                  <input
                    {...register(`experience.${index}.startDate`)}
                    type="month"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.experience?.[index]?.startDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.experience[index]?.startDate?.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">结束日期</label>
                  <input
                    {...register(`experience.${index}.endDate`)}
                    type="month"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={watch(`experience.${index}.current`)}
                  />
                  <label className="flex items-center mt-2">
                    <input
                      {...register(`experience.${index}.current`)}
                      type="checkbox"
                      className="mr-2"
                    />
                    目前在职
                  </label>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">工作描述</label>
                <textarea
                  {...register(`experience.${index}.description`)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请描述您的主要工作职责和成就..."
                />
              </div>
            </div>
          ))}
        </div>

        {/* 教育背景 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">教育背景</h2>
            <button
              type="button"
              onClick={() => appendEducation({ school: '', degree: '', major: '', graduationDate: '' })}
              className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-1" />
              添加教育经历
            </button>
          </div>
          {educationFields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">教育经历 {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">学校名称 *</label>
                  <input
                    {...register(`education.${index}.school`)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="请输入学校名称"
                  />
                  {errors.education?.[index]?.school && (
                    <p className="text-red-500 text-sm mt-1">{errors.education[index]?.school?.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">学位 *</label>
                  <input
                    {...register(`education.${index}.degree`)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="如：学士、硕士、博士"
                  />
                  {errors.education?.[index]?.degree && (
                    <p className="text-red-500 text-sm mt-1">{errors.education[index]?.degree?.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">专业</label>
                  <input
                    {...register(`education.${index}.major`)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="请输入专业名称"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">毕业时间</label>
                  <input
                    {...register(`education.${index}.graduationDate`)}
                    type="month"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 技能 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">技能</h2>
            <button
              type="button"
              onClick={addSkill}
              className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-1" />
              添加技能
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* 项目经历 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">项目经历</h2>
            <button
              type="button"
              onClick={() => appendProject({ name: '', description: '', technologies: '', url: '' })}
              className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-1" />
              添加项目
            </button>
          </div>
          {projectFields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">项目 {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">项目名称 *</label>
                  <input
                    {...register(`projects.${index}.name`)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="请输入项目名称"
                  />
                  {errors.projects?.[index]?.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.projects[index]?.name?.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">项目链接</label>
                  <input
                    {...register(`projects.${index}.url`)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="请输入项目链接"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">项目描述</label>
                <textarea
                  {...register(`projects.${index}.description`)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请描述项目的主要功能和您的贡献..."
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">使用技术</label>
                <input
                  {...register(`projects.${index}.technologies`)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="如：React, Node.js, MongoDB"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            生成简历预览
          </button>
        </div>
      </form>
    </div>
  );
}
