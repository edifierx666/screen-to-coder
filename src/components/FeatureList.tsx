import React from 'react';

const FeatureList: React.FC = () => {
  const features = [
    {
      id: 1,
      icon: (
        <svg className="w-5 h-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      title: '智能 UI 分析',
      description: '自动识别界面元素、布局结构和设计风格',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      id: 2,
      icon: (
        <svg className="w-5 h-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1.323l-3.954 1.582A1 1 0 004 6.82v4.286a1 1 0 00.491.858l4 2.857A1 1 0 009 15v2a1 1 0 102 0v-2c0-.306.138-.591.375-.78l4-2.857A1 1 0 0016 11.106V6.82a1 1 0 00-.546-.915L11.5 4.323V3a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ),
      title: '代码生成',
      description: '生成精确的开发提示词，帮助快速实现设计',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      id: 3,
      icon: (
        <svg className="w-5 h-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
        </svg>
      ),
      title: '开发指南',
      description: '提供详细的实现步骤和技术建议',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ];

  return (
    <div className="mt-12 bg-white rounded-lg border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">功能特点</h2>
      <div className="space-y-4">
        {features.map(feature => (
          <div 
            key={feature.id}
            className={`flex items-start p-4 rounded-lg ${feature.bgColor} transition-all duration-200 hover:shadow-sm`}
          >
            <div className={`flex-shrink-0 ${feature.iconColor}`}>
              {feature.icon}
            </div>
            <div className="ml-4">
              <h3 className="text-base font-medium text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureList;
