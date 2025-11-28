import { useState, useCallback } from 'react';
import type { CVAnalysis } from '../models/cv.types';
import cvService from '../services/cvService';
import toast from 'react-hot-toast';

interface UseCVReturn {
  // State
  analysis: CVAnalysis | null;
  history: CVAnalysis[];
  loading: boolean;
  uploading: boolean;
  error: string | null;
  
  // Actions
  uploadAndAnalyze: (file: File, jobDescription?: string) => Promise<void>;
  getAnalysis: (id: string) => Promise<void>;
  loadHistory: () => Promise<void>;
  clearError: () => void;
  clearAnalysis: () => void;
}

export const useCV = (): UseCVReturn => {
  const [analysis, setAnalysis] = useState<CVAnalysis | null>(null);
  const [history, setHistory] = useState<CVAnalysis[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearAnalysis = useCallback(() => {
    setAnalysis(null);
    setError(null);
  }, []);

  const uploadAndAnalyze = useCallback(async (file: File, jobDescription?: string) => {
    setUploading(true);
    setError(null);
    
    try {
      // Use real API instead of mock
      const result = await cvService.uploadAndAnalyze(file, jobDescription);
      
      if (result.success && result.analysis) {
        setAnalysis(result.analysis);
        toast.success('CV analyzed successfully!');
      } else {
        throw new Error(result.error || 'Analysis failed');
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to analyze CV';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  }, []);

  const getAnalysis = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await cvService.getAnalysis(id);
      if (result) {
        setAnalysis(result);
      } else {
        throw new Error('Analysis not found');
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to load analysis';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await cvService.getAnalysisHistory();
      setHistory(result);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to load history';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    // State
    analysis,
    history,
    loading,
    uploading,
    error,
    
    // Actions
    uploadAndAnalyze,
    getAnalysis,
    loadHistory,
    clearError,
    clearAnalysis,
  };
};