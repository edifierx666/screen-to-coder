import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useHistory } from '../contexts/HistoryContext';
import type { HistoryEntry } from '../types';

interface HistoryPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ isOpen, onToggle }) => {
  const { history, clearHistory } = useHistory();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(timestamp));
  };

  const handleCopy = (text: string, type: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      toast.success(`${type}已复制到剪贴板`);
    }
  };

  // 如果还没有挂载，返回 null 以避免水合不匹配
  if (!mounted) {
    return null;
  }

  const HistoryItem: React.FC<{ entry: HistoryEntry }> = ({ entry }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm text-gray-500">{formatDate(entry.timestamp)}</span>
      </div>
      
      {entry.previewUrl && (
        <img
          src={entry.previewUrl}
          alt="预览图"
          className="mb-3 rounded-md w-full h-24 object-cover"
        />
      )}

      <div className="space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">第一步：提示词</span>
            <button
              onClick={() => handleCopy(entry.prompt, "提示词")}
              className="text-blue-600 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50 transition-colors"
              title="复制提示词"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
            </button>
          </div>
          <div className="text-sm text-gray-600 bg-gray-50 rounded p-2 max-h-[100px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {entry.prompt}
          </div>
        </div>

        {entry.structureAnalysis && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">第二步：结构分析</span>
              <button
                onClick={() => handleCopy(entry.structureAnalysis!, "结构分析")}
                className="text-blue-600 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50 transition-colors"
                title="复制结构分析"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
              </button>
            </div>
            <div className="text-sm text-gray-600 bg-gray-50 rounded p-2 max-h-[100px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {entry.structureAnalysis}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div 
      className={`fixed top-0 right-0 h-full transition-all duration-300 ease-in-out transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{ zIndex: 50, width: '24rem' }}
    >
      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 bg-blue-600 text-white p-2 rounded-l-lg shadow-lg hover:bg-blue-700 transition-colors duration-200"
        style={{ zIndex: 51 }}
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.3s ease-in-out'
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Panel content */}
      <div className="h-full bg-white shadow-xl overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">历史记录</h3>
          {history.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('确定要清空所有历史记录吗？')) {
                  clearHistory();
                  toast.success('历史记录已清空');
                }
              }}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              清空记录
            </button>
          )}
        </div>
        
        <div className="h-[calc(100vh-65px)] overflow-y-auto p-4 space-y-4">
          {history.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <p>暂无历史记录</p>
            </div>
          ) : (
            history.map(entry => (
              <HistoryItem key={entry.id} entry={entry} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPanel;