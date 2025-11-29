import { useState, useCallback } from 'react';
import type { CVAnalysis } from '../models/cv.types';
import cvService from '../services/cvService';
import toast from 'react-hot-toast';

interface UseCVReturn {
  // State
  analysis: CVAnalysis | null;
  loading: boolean;
  uploading: boolean;
  error: string | null;
  
  // Actions
  uploadAndAnalyze: (file: File, jobDescription?: string) => Promise<void>;
  clearError: () => void;
}

const CACHE_KEY = 'careerboost_cv_analysis';
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

interface CachedAnalysis {
  analysis: CVAnalysis;
  timestamp: number;
  fileName: string;
}

export const useCV = (): UseCVReturn => {
  const [analysis, setAnalysis] = useState<CVAnalysis | null>(() => {
    // Load from cache on initialization
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const parsedCache: CachedAnalysis = JSON.parse(cached);
        const isValid = Date.now() - parsedCache.timestamp < CACHE_DURATION;
        return isValid ? parsedCache.analysis : null;
      } catch {
        localStorage.removeItem(CACHE_KEY);
      }
    }
    return null;
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
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
        
        // Cache the analysis
        const cacheData: CachedAnalysis = {
          analysis: result.analysis,
          timestamp: Date.now(),
          fileName: file.name
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        
        toast.success('CV analyzed successfully!');
      } else {
        throw new Error(result.error || 'Analysis failed');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to analyze CV';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  }, []);



  return {
    // State
    analysis,
    loading,
    uploading,
    error,
    
    // Actions
    uploadAndAnalyze,
    clearError,
  };
};