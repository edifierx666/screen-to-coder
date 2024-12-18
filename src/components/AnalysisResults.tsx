import React from 'react';
import { toast } from 'react-hot-toast';
import StepIndicator from './StepIndicator';
import ResultCard from './ResultCard';

interface AnalysisResultsProps {
  prompt: string;
  structureAnalysis: string | null;
  onGenerateStructure: () => void;
  isGeneratingStructure: boolean;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  prompt,
  structureAnalysis,
  onGenerateStructure,
  isGeneratingStructure
}) => {
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type}已复制到剪贴板`);
  };

  return (
    <div className="space-y-8">
      <StepIndicator 
        currentStep={structureAnalysis ? 2 : 1}
        isGeneratingStructure={isGeneratingStructure}
      />

      <div className="space-y-8">
        <ResultCard
          title="第一步：生成的提示词"
          content={prompt}
          onCopy={() => handleCopy(prompt, "提示词")}
        >
          {!structureAnalysis && (
            <button
              onClick={onGenerateStructure}
              disabled={isGeneratingStructure}
              className={`relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${
                isGeneratingStructure ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isGeneratingStructure ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  生成结构分析中...
                </>
              ) : (
                <>
                  <svg className="mr-1.5 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                  生成结构分析
                </>
              )}
            </button>
          )}
        </ResultCard>

        {structureAnalysis && (
          <ResultCard
            title="第二步：页面结构分析"
            content={structureAnalysis}
            onCopy={() => handleCopy(structureAnalysis, "结构分析")}
          />
        )}
      </div>
    </div>
  );
};

export default AnalysisResults;