'use client';

import { FileText } from 'lucide-react';

interface HeaderProps {
  activeTab: 'form' | 'preview' | 'download';
  onTabChange: (tab: 'form' | 'preview' | 'download') => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {

  return (
    <header className=" mx-4 mt-4 mb-8">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-center items-center">
          <div className="flex items-center space-x-3">
            {/* <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <FileText className="h-8 w-8 text-white" />
            </div> */}
            <div>
              <h1 className="text-2xl text-center font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                简历生成器
              </h1>
              <p className="text-sm text-white text-opacity-80">创建专业简历，轻松获得心仪工作</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
