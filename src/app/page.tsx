'use client';

import { useState } from 'react';
import { Eye, Download, Settings } from 'lucide-react';
import Header from '@/components/Header';
import ResumeForm from '@/components/ResumeForm';
import ResumePreview from '@/components/ResumePreview';
import ExportResume from '@/components/ExportResume';

type ResumeFormData = {
  personalInfo: {
    name: string;
  };
  targetJob: {
    requirements?: string;
  };
  aiModel: string;
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<'form' | 'preview' | 'download'>('form');
  const [resumeData, setResumeData] = useState<ResumeFormData | null>(null);

  const handleFormSubmit = (data: ResumeFormData) => {
    setResumeData(data);
    setActiveTab('preview');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'preview':
        return resumeData ? <ResumePreview data={resumeData} /> : (
          <div className="form-card animate-float">
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse-slow">
                <Eye className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">暂无简历数据</h2>
              <p className="text-gray-600 text-lg mb-8">请先填写简历信息，然后预览您的专业简历</p>
              <button
                onClick={() => setActiveTab('form')}
                className="gradient-button text-lg px-8 py-4"
              >
                ✨ 开始填写
              </button>
            </div>
          </div>
        );
      case 'download':
        return resumeData ? <ExportResume resumeData={resumeData} /> : (
          <div className="form-card animate-float">
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse-slow">
                <Download className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">暂无简历数据</h2>
              <p className="text-gray-600 text-lg mb-8">请先填写简历信息，然后导出您的专业简历</p>
              <button
                onClick={() => setActiveTab('form')}
                className="gradient-button text-lg px-8 py-4"
              >
                ✨ 开始填写
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* 左侧：操作按钮区域 */}
            {/* <div className="w-full md:w-1/4">
              <div className="glass-card p-6 sticky top-8 flex">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
                  操作面板
                </h2>
                
                <div className="space-y-4 flex gap-4">
                  <button
                    onClick={() => setActiveTab('form')}
                    className={`w-1/10 flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeTab === 'form'
                        ? 'bg-white bg-opacity-20 text-white shadow-lg backdrop-blur-sm'
                        : 'text-white text-opacity-70 hover:text-white hover:bg-white hover:bg-opacity-10'
                    }`}
                  >
                    <Settings className="h-5 w-5 mr-3" />
                    填写信息
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`w-1/10 flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeTab === 'preview'
                        ? 'bg-white bg-opacity-20 text-white shadow-lg backdrop-blur-sm'
                        : 'text-white text-opacity-70 hover:text-white hover:bg-white hover:bg-opacity-10'
                    }`}
                  >
                    <Eye className="h-5 w-5 mr-3" />
                    预览简历
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('download')}
                    className={`w-1/10 flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeTab === 'download'
                        ? 'bg-white bg-opacity-20 text-white shadow-lg backdrop-blur-sm'
                        : 'text-white text-opacity-70 hover:text-white hover:bg-white hover:bg-opacity-10'
                    }`}
                  >
                    <Download className="h-5 w-5 mr-3" />
                    导出简历
                  </button>
                </div>
              
                <div className="mt-8 pt-6 border-t border-white border-opacity-20">
                  <div className="text-white text-opacity-80 text-sm">
                    <div className="flex items-center mb-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      <span>当前状态: {activeTab === 'form' ? '填写中' : activeTab === 'preview' ? '预览中' : '导出中'}</span>
                    </div>
                    {resumeData && (
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                        <span>数据已保存</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div> */}
            
            {/* 右侧：内容区域 */}
            <div className="w-full md:w-3/4">
              {activeTab === 'form' ? (
                <ResumeForm onSubmit={handleFormSubmit} />
              ) : (
                renderContent()
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}