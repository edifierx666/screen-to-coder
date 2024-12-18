import React from 'react';

interface HeaderProps {
  onHistoryClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHistoryClick }) => {
  return (
    <div className="relative text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">
        AI 代码助手
      </h1>
      <p className="text-lg text-gray-600 mb-4">
        上传设计图，获取精确的开发指南和代码提示
      </p>
      <div className="flex justify-center space-x-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          UI 分析
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          代码生成
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
          开发指南
        </span>
      </div>
      
      {/* 历史记录按钮 */}
      <button
        onClick={onHistoryClick}
        className="absolute right-0 top-0 flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        <svg className="w-5 h-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
        历史记录
      </button>
    </div>
  );
};

export default Header;