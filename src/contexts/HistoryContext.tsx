import React, { createContext, useContext, useState, useEffect } from 'react';
import type { HistoryEntry, HistoryContextType } from '../types';

const HistoryContext = createContext<HistoryContextType | null>(null);

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // 只在客户端执行，并且只在组件首次挂载时执行一次
    if (typeof window !== 'undefined' && !isInitialized) {
      const saved = localStorage.getItem('promptHistory');
      if (saved) {
        try {
          setHistory(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to parse history:', e);
        }
      }
      setIsInitialized(true);
    }
  }, [isInitialized]);

  useEffect(() => {
    // 只在客户端执行，并且只在 history 更新时保存
    if (typeof window !== 'undefined' && isInitialized) {
      localStorage.setItem('promptHistory', JSON.stringify(history));
    }
  }, [history, isInitialized]);

  const addToHistory = (entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => {
    const newEntry: HistoryEntry = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    setHistory(prev => [newEntry, ...prev]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <HistoryContext.Provider value={{ history, addToHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};