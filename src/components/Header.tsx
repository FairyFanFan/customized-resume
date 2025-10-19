'use client';

import { FileText, Download, Eye, Settings } from 'lucide-react';

interface HeaderProps {
  activeTab: 'form' | 'preview' | 'download';
  onTabChange: (tab: 'form' | 'preview' | 'download') => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="ml-2 text-xl font-bold text-gray-900">简历生成器</h1>
          </div>
          
          <nav className="flex space-x-8">
            <button
              onClick={() => onTabChange('form')}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === 'form'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Settings className="h-4 w-4 mr-1" />
              填写信息
            </button>
            <button
              onClick={() => onTabChange('preview')}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === 'preview'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Eye className="h-4 w-4 mr-1" />
              预览简历
            </button>
            <button
              onClick={() => onTabChange('download')}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === 'download'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Download className="h-4 w-4 mr-1" />
              导出简历
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
