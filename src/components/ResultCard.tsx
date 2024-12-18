import React from 'react';

interface ResultCardProps {
  title: string;
  content: string;
  onCopy: () => void;
  children?: React.ReactNode;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, content, onCopy, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-xl">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          {title}
        </h3>
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <pre className="whitespace-pre-wrap text-gray-800 font-mono text-sm">{content}</pre>
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={onCopy}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <svg className="h-4 w-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            复制内容
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;