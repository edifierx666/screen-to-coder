import React from 'react';
import type { PromptDisplayProps } from '../types';
import LoadingSpinner from './LoadingSpinner';
import AnalysisResults from './AnalysisResults';

const PromptDisplay: React.FC<PromptDisplayProps> = ({
  prompt,
  structureAnalysis,
  isLoading,
  error,
  onGenerateStructure,
  isGeneratingStructure
}) => {
  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center">
          <svg className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (!prompt) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center text-gray-500 max-w-sm">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium">等待分析设计</h3>
          <p className="mt-2">上传您的 UI 设计图或应用截图，AI 将为您生成详细的开发指南</p>
        </div>
      </div>
    );
  }

  return (
    <AnalysisResults
      prompt={prompt}
      structureAnalysis={structureAnalysis}
      onGenerateStructure={onGenerateStructure}
      isGeneratingStructure={isGeneratingStructure}
    />
  );
};

export default PromptDisplay;