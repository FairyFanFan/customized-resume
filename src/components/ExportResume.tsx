'use client';

import { useRef } from 'react';
import { Download, FileText, Image } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ExportResumeProps {
  resumeData: any;
}

export default function ExportResume({ resumeData }: ExportResumeProps) {
  const resumeRef = useRef<HTMLDivElement>(null);

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
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-6">导出简历</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={exportToPDF}
            className="flex items-center justify-center p-6 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <div className="text-center">
              <FileText className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">导出为PDF</h3>
              <p className="text-gray-600">生成高质量的PDF文件，适合打印和发送</p>
            </div>
          </button>

          <button
            onClick={exportToImage}
            className="flex items-center justify-center p-6 border-2 border-green-600 rounded-lg hover:bg-green-50 transition-colors"
          >
            <div className="text-center">
              <Image className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">导出为图片</h3>
              <p className="text-gray-600">生成PNG图片，适合在线分享</p>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{resumeData.personalInfo?.name}</h1>
            <div className="flex flex-wrap justify-center gap-4 text-gray-600">
              <span>{resumeData.personalInfo?.email}</span>
              <span>•</span>
              <span>{resumeData.personalInfo?.phone}</span>
              {resumeData.personalInfo?.address && (
                <>
                  <span>•</span>
                  <span>{resumeData.personalInfo.address}</span>
                </>
              )}
            </div>
            <div className="flex justify-center gap-4 mt-2">
              {resumeData.personalInfo?.linkedin && (
                <span className="text-blue-600">LinkedIn: {resumeData.personalInfo.linkedin}</span>
              )}
              {resumeData.personalInfo?.github && (
                <span className="text-blue-600">GitHub: {resumeData.personalInfo.github}</span>
              )}
            </div>
          </div>

          {resumeData.summary && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3 border-l-4 border-blue-600 pl-3">
                个人简介
              </h2>
              <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
            </div>
          )}

          {resumeData.experience && resumeData.experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-l-4 border-blue-600 pl-3">
                工作经历
              </h2>
              <div className="space-y-6">
                {resumeData.experience.map((exp: any, index: number) => (
                  <div key={index} className="border-l-2 border-gray-200 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                        <p className="text-blue-600 font-medium">{exp.company}</p>
                      </div>
                      <div className="text-right text-gray-600">
                        <p>{exp.startDate} - {exp.current ? '至今' : exp.endDate}</p>
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 mt-2 leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {resumeData.education && resumeData.education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-l-4 border-blue-600 pl-3">
                教育背景
              </h2>
              <div className="space-y-4">
                {resumeData.education.map((edu: any, index: number) => (
                  <div key={index} className="border-l-2 border-gray-200 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                        <p className="text-blue-600 font-medium">{edu.school}</p>
                        {edu.major && <p className="text-gray-600">{edu.major}</p>}
                      </div>
                      {edu.graduationDate && (
                        <div className="text-right text-gray-600">
                          <p>{edu.graduationDate}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {resumeData.skills && resumeData.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-l-4 border-blue-600 pl-3">
                技能
              </h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {resumeData.projects && resumeData.projects.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-l-4 border-blue-600 pl-3">
                项目经历
              </h2>
              <div className="space-y-6">
                {resumeData.projects.map((project: any, index: number) => (
                  <div key={index} className="border-l-2 border-gray-200 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                        {project.url && (
                          <p className="text-blue-600 text-sm">项目链接: {project.url}</p>
                        )}
                      </div>
                    </div>
                    {project.description && (
                      <p className="text-gray-700 mt-2 leading-relaxed">{project.description}</p>
                    )}
                    {project.technologies && (
                      <div className="mt-2">
                        <span className="text-sm text-gray-600">技术栈: </span>
                        <span className="text-sm text-gray-700">{project.technologies}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
