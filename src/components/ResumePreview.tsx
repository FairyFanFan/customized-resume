import { ResumeFormData } from './ResumeForm';
import { Eye } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeFormData;
}

export default function ResumePreview({ data }: ResumePreviewProps) {
  const { personalInfo, targetJob, aiModel } = data;

  // 解析个人信息文本
  const parsePersonalInfo = (infoText: string) => {
    const lines = infoText.split('\n').filter(line => line.trim());
    const info: Record<string, string> = {};
    
    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine.includes('@') && trimmedLine.includes('.')) {
        info.email = trimmedLine;
      } else if (/^1[3-9]\d{9}$/.test(trimmedLine.replace(/[-\s]/g, ''))) {
        info.phone = trimmedLine;
      } else if (trimmedLine.includes('linkedin.com')) {
        info.linkedin = trimmedLine;
      } else if (trimmedLine.includes('github.com')) {
        info.github = trimmedLine;
      } else if (trimmedLine.includes('省') || trimmedLine.includes('市') || trimmedLine.includes('区') || trimmedLine.includes('县')) {
        info.address = trimmedLine;
      } else if (!info.name) {
        info.name = trimmedLine;
      }
    });
    
    return info;
  };

  const parsedInfo = personalInfo.name ? parsePersonalInfo(personalInfo.name) : {};

  return (
    <div className="form-card animate-float">
      <div className="text-center mb-8">
        <h2 className="section-header">
          <Eye className="h-8 w-8 mr-3" />
          简历预览
        </h2>
        <p className="text-gray-600 text-lg">您的专业简历预览效果</p>
      </div>
      
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
        {/* 简历内容 */}
        <div className="p-8">
          {/* 个人信息头部 */}
          <div className="text-center mb-8 pb-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">{parsedInfo.name ? parsedInfo.name.charAt(0) : '?'}</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">{parsedInfo.name || '姓名'}</h1>
            <div className="flex flex-wrap justify-center gap-6 text-gray-600 mb-4">
              {parsedInfo.email && (
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {parsedInfo.email}
                </div>
              )}
              {parsedInfo.phone && (
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  {parsedInfo.phone}
                </div>
              )}
              {parsedInfo.address && (
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  {parsedInfo.address}
                </div>
              )}
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {parsedInfo.linkedin && (
                <a href={parsedInfo.linkedin} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <span className="mr-2">💼</span>
                  LinkedIn
                </a>
              )}
              {parsedInfo.github && (
                <a href={parsedInfo.github} className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors">
                  <span className="mr-2">🐙</span>
                  GitHub
                </a>
              )}
            </div>
          </div>

          {/* 目标岗位要求 */}
          {targetJob && targetJob.requirements && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-l-4 border-green-600 pl-3">
                目标岗位要求
              </h2>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{targetJob.requirements}</p>
                </div>
              </div>
            </div>
          )}

          {/* AI模型信息 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-l-4 border-purple-600 pl-3">
              AI优化信息
            </h2>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">使用的AI模型</h3>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                    <span className="text-purple-700 font-medium text-lg">{aiModel}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">智能优化</span>
                    <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">内容生成</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
