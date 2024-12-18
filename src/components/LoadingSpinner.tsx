import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
      <p className="text-gray-500">AI 正在分析图片...</p>
    </div>
  );
};

export default LoadingSpinner;