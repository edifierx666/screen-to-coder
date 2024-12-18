import React from 'react';

interface StepIndicatorProps {
  currentStep: 1 | 2;
  isGeneratingStructure: boolean;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, isGeneratingStructure }) => {
  return (
    <div className="mb-8">
      <div className="relative flex justify-between items-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
              <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
          <span className="mt-2 text-sm font-medium text-gray-900">提示词生成</span>
        </div>

        <div className="flex-1 mx-4">
          <div className={`h-1 rounded-full ${currentStep === 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <span className={`relative flex h-10 w-10 items-center justify-center rounded-full ${
              currentStep === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {isGeneratingStructure ? (
                <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <span>2</span>
              )}
            </span>
          </div>
          <span className={`mt-2 text-sm font-medium ${currentStep === 2 ? 'text-gray-900' : 'text-gray-500'}`}>
            结构分析
          </span>
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;