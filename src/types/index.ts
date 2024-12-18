export interface AnalysisResult {
  prompt: string;
  structureAnalysis: string | null;
  loading: boolean;
  error: string | null;
}

export interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  isLoading: boolean;
}

export interface PromptDisplayProps {
  prompt: string;
  structureAnalysis: string | null;
  isLoading: boolean;
  error: string | null;
  onGenerateStructure: () => void;
  isGeneratingStructure: boolean;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  prompt: string;
  structureAnalysis: string | null;
  previewUrl: string | null;
}

export interface HistoryContextType {
  history: HistoryEntry[];
  addToHistory: (entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
}