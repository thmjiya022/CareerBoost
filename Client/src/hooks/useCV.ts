import { useState, useCallback } from 'react';
import type { CVAnalysis } from '../models/cv.types';
import cvService from '../services/cvService';
import toast from 'react-hot-toast';

interface UseCVReturn {
  analysis: CVAnalysis | null;
  loading: boolean;
  uploading: boolean;
  error: string | null;
  
  uploadAndAnalyze: (file: File, jobDescription?: string) => Promise<void>;
  clearError: () => void;
}

const CACHE_KEY = 'careerboost_cv_analysis';
const CACHE_DURATION = 1000 * 60 * 30; 

interface CachedAnalysis {
  analysis: CVAnalysis;
  timestamp: number;
  fileName: string;
}

export const useCV = (): UseCVReturn => {
  const [analysis, setAnalysis] = useState<CVAnalysis | null>(() => {
    
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
      
      const result = await cvService.uploadAndAnalyze(file, jobDescription);
      
      if (result.success && result.analysis) {
        setAnalysis(result.analysis);
        
        
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
    
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to analyze CV';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  }, []);



  return {
    
    analysis,
    loading,
    uploading,
    error,
    
    
    uploadAndAnalyze,
    clearError,
  };
};