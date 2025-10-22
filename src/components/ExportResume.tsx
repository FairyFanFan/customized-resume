'use client';

import { useRef } from 'react';
import { Download, FileText, Image } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { ResumeFormData } from './ResumeForm';

interface ExportResumeProps {
  resumeData: ResumeFormData;
}

export default function ExportResume({ resumeData }: ExportResumeProps) {
  const resumeRef = useRef<HTMLDivElement>(null);

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

  const parsedInfo = resumeData.personalInfo?.name ? parsePersonalInfo(resumeData.personalInfo.name) : {};

  const exportToPDF = async () => {
    if (!resumeRef.current) return;

    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${resumeData.personalInfo.name || 'resume'}-resume.pdf`);
    } catch (error) {
      console.error('导出PDF失败:', error);
      alert('导出PDF失败，请重试');
    }
  };

  const exportToImage = async () => {
    if (!resumeRef.current) return;

    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const link = document.createElement('a');
      link.download = `${resumeData.personalInfo.name || 'resume'}-resume.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('导出图片失败:', error);
      alert('导出图片失败，请重试');
    }
  };

  return (
    <div className="form-card animate-float">
      <div className="text-center mb-8">
        <h2 className="section-header">
          <Download className="h-8 w-8 mr-3" />
          导出简历
        </h2>
        <p className="text-gray-600 text-lg">选择您喜欢的格式下载简历</p>
      </div>
      
      <div className="floating-card">
        <h2 className="text-2xl font-semibold mb-6">导出简历</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={exportToPDF}
            className="group flex items-center justify-center p-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white group-hover:bg-opacity-30 transition-colors">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">导出为PDF</h3>
              <p className="text-blue-100">生成高质量的PDF文件，适合打印和发送</p>
            </div>
          </button>

          <button
            onClick={exportToImage}
            className="group flex items-center justify-center p-8 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white group-hover:bg-opacity-30 transition-colors">
                <Image className="h-8 w-8" aria-label="导出图片图标" />
              </div>
              <h3 className="text-xl font-bold mb-2">导出为图片</h3>
              <p className="text-green-100">生成PNG图片，适合在线分享</p>
            </div>
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">导出说明：</h3>
          <ul className="text-gray-600 space-y-2">
            <li>• PDF格式适合打印和正式提交</li>
            <li>• 图片格式适合在线分享和社交媒体</li>
            <li>• 建议在导出前先预览简历内容</li>
            <li>• 导出文件将自动以您的姓名命名</li>
          </ul>
        </div>
      </div>

      {/* 隐藏的简历预览用于导出 */}
      <div className="hidden">
        <div ref={resumeRef} className="bg-white p-8">
          {/* 简历内容 */}
          <div className="text-center mb-8 pb-6 border-b-2 border-blue-600">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{parsedInfo.name || '姓名'}</h1>
            <div className="flex flex-wrap justify-center gap-4 text-gray-600">
              {parsedInfo.email && <span>{parsedInfo.email}</span>}
              {parsedInfo.phone && <span>{parsedInfo.phone}</span>}
              {parsedInfo.address && <span>{parsedInfo.address}</span>}
            </div>
            <div className="flex justify-center gap-4 mt-2">
              {parsedInfo.linkedin && (
                <span className="text-blue-600">LinkedIn: {parsedInfo.linkedin}</span>
              )}
              {parsedInfo.github && (
                <span className="text-blue-600">GitHub: {parsedInfo.github}</span>
              )}
            </div>
          </div>

          {resumeData.targetJob && resumeData.targetJob.requirements && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-l-4 border-green-600 pl-3">
                目标岗位要求
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">{resumeData.targetJob.requirements}</p>
              </div>
            </div>
          )}

          {/* AI模型信息 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-l-4 border-purple-600 pl-3">
              AI优化信息
            </h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">使用的AI模型</h3>
                  <span className="text-purple-700 font-medium">{resumeData.aiModel}</span>
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
