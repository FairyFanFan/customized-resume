'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import ResumeForm from '@/components/ResumeForm';
import ResumePreview from '@/components/ResumePreview';
import ExportResume from '@/components/ExportResume';

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

export default function Home() {
  const [activeTab, setActiveTab] = useState<'form' | 'preview' | 'download'>('form');
  const [resumeData, setResumeData] = useState<ResumeFormData | null>(null);

  const handleFormSubmit = (data: ResumeFormData) => {
    setResumeData(data);
    setActiveTab('preview');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'form':
        return <ResumeForm onSubmit={handleFormSubmit} />;
      case 'preview':
        return resumeData ? <ResumePreview data={resumeData} /> : (
          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <h2 className="text-xl font-semibold text-gray-600 mb-4">暂无简历数据</h2>
              <p className="text-gray-500 mb-6">请先填写简历信息</p>
              <button
                onClick={() => setActiveTab('form')}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                开始填写
              </button>
            </div>
          </div>
        );
      case 'download':
        return resumeData ? <ExportResume resumeData={resumeData} /> : (
          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <h2 className="text-xl font-semibold text-gray-600 mb-4">暂无简历数据</h2>
              <p className="text-gray-500 mb-6">请先填写简历信息</p>
              <button
                onClick={() => setActiveTab('form')}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                开始填写
              </button>
            </div>
          </div>
        );
      default:
        return <ResumeForm onSubmit={handleFormSubmit} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="py-8">
        {renderContent()}
      </main>
    </div>
  );
}