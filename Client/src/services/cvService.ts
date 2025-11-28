import api from './api';
import type { CVAnalysis, CVUploadResponse, JobDescription, OptimizationReport } from '../models/cv.types';

class CVService {
  /**
   * Upload and analyze CV
   */
  async uploadAndAnalyze(
    file: File,
    jobDescription?: string
  ): Promise<CVUploadResponse> {
    try {
      const formData = new FormData();
      formData.append('cv', file);
      if (jobDescription) {
        formData.append('jobDescription', jobDescription);
      }

      const response = await api.post('/cv/upload-analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return {
        success: true,
        analysis: response.data.analysis,
      };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('CV upload failed:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to analyze CV',
      };
    }
  }

  /**
   * Get CV analysis by ID
   */
  async getAnalysis(analysisId: string): Promise<CVAnalysis | null> {
    try {
      const response = await api.get(`/cv/analysis/${analysisId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch analysis:', error);
      return null;
    }
  }

  /**
   * Get user's CV analysis history
   */
  async getAnalysisHistory(): Promise<CVAnalysis[]> {
    try {
      const response = await api.get('/cv/history');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch history:', error);
      return [];
    }
  }

  /**
   * Optimize CV based on job description
   */
  async optimizeCV(
    analysisId: string,
    targetJob: JobDescription
  ): Promise<OptimizationReport | null> {
    try {
      const response = await api.post(`/cv/optimize/${analysisId}`, {
        targetJob,
      });
      return response.data;
    } catch (error) {
      console.error('CV optimization failed:', error);
      return null;
    }
  }

  /**
   * Download optimized CV
   */
  async downloadOptimizedCV(analysisId: string): Promise<Blob | null> {
    try {
      const response = await api.get(`/cv/download/${analysisId}`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('Download failed:', error);
      return null;
    }
  }

}

export default new CVService();