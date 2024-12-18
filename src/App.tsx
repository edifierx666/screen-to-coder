import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import ImageUpload from './components/ImageUpload';
import PromptDisplay from './components/PromptDisplay';
import Header from './components/Header';
import HistoryPanel from './components/HistoryPanel';
import Layout from './components/Layout';
import FeatureList from './components/FeatureList';
import { HistoryProvider } from './contexts/HistoryContext';
import { useHistory } from './contexts/HistoryContext';
import { analyzeImage, generateStructureAnalysis } from './utils/api';
import type { AnalysisResult } from './types';

const AppContent: React.FC = () => {
  const [result, setResult] = useState<AnalysisResult>({
    prompt: '',
    structureAnalysis: null,
    loading: false,
    error: null
  });
  const [isGeneratingStructure, setIsGeneratingStructure] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { addToHistory } = useHistory();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleImageSelect = async (file: File) => {
    setResult({ prompt: '', structureAnalysis: null, loading: true, error: null });
    const imageUrl = URL.createObjectURL(file);
    setPreviewUrl(imageUrl);
    
    try {
      const prompt = await analyzeImage(file);
      setResult({ prompt, structureAnalysis: null, loading: false, error: null });
      addToHistory({ prompt, structureAnalysis: null, previewUrl: imageUrl });
      toast.success('第一步分析完成！');
    } catch (error) {
      setResult({ 
        prompt: '', 
        structureAnalysis: null,
        loading: false, 
        error: error instanceof Error ? error.message : '分析过程中发生错误'
      });
      toast.error('分析失败');
    }
  };

  const handleGenerateStructure = async () => {
    setIsGeneratingStructure(true);
    try {
      const structureAnalysis = await generateStructureAnalysis();
      setResult(prev => ({ ...prev, structureAnalysis }));
      addToHistory({
        prompt: result.prompt,
        structureAnalysis,
        previewUrl: previewUrl || ''
      });
      toast.success('布局分析完成！');
    } catch (error) {
      toast.error('布局分析失败');
    } finally {
      setIsGeneratingStructure(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    setResult({
      prompt: '',
      structureAnalysis: null,
      loading: false,
      error: null
    });
  };

  return (
    <div className="relative min-h-screen">
      <Layout
        rightPanel={
          <div className="space-y-6">
            <div className="text-lg font-semibold">分析结果</div>
            <PromptDisplay
              prompt={result.prompt}
              structureAnalysis={result.structureAnalysis}
              isLoading={result.loading}
              error={result.error}
              onGenerateStructure={handleGenerateStructure}
              isGeneratingStructure={isGeneratingStructure}
            />
          </div>
        }
      >
        <div className="space-y-8">
          <Header onHistoryClick={() => setIsHistoryOpen(!isHistoryOpen)} />
          <ImageUpload 
            onImageSelect={handleImageSelect}
            isLoading={result.loading}
          />
          {previewUrl && (
            <div className="mt-4 rounded-lg overflow-hidden border border-gray-200 relative group">
              <img
                src={previewUrl}
                alt="UI 设计预览"
                className="w-full h-auto"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
          
          {/* 功能特点列表始终显示 */}
          <FeatureList />
        </div>
      </Layout>

      {/* 历史记录抽屉 */}
      <HistoryPanel 
        isOpen={isHistoryOpen} 
        onToggle={() => setIsHistoryOpen(!isHistoryOpen)}
      />

      <Toaster 
        position="top-center"
        toastOptions={{
          className: 'rounded-lg shadow-md',
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HistoryProvider>
      <AppContent />
    </HistoryProvider>
  );
};

export default App;