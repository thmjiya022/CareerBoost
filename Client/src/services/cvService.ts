import api from './api';
import type { CVUploadResponse } from '../models/cv.types';

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
    } catch (error: any) {
      console.error('CV upload failed:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to analyze CV',
      };
    }
  }







}

export default new CVService();