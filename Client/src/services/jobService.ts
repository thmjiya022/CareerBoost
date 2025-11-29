import axios from 'axios';

export interface Job {
  id: string;
  title: string;
  company: {
    display_name: string;
  };
  location: {
    display_name: string;
    area: string[];
  };
  salary_min?: number;
  salary_max?: number;
  salary_is_predicted: number;
  description: string;
  created: string;
  redirect_url: string;
  category?: {
    label: string;
    tag: string;
  };
  contract_type: string;
  contract_time?: string;
}

export interface JobSearchParams {
  what?: string;
  what_exclude?: string;
  where?: string;
  location0?: string;
  location1?: string;
  location2?: string;
  category?: string;
  salary_min?: number;
  salary_max?: number;
  full_time?: number;
  part_time?: number;
  permanent?: number;
  contract?: number;
  page?: number;
  results_per_page?: number;
  sort_by?: 'relevance' | 'salary' | 'date';
  sort_dir?: 'up' | 'down';
}

export interface JobSearchResponse {
  results: Job[];
  count: number;
  mean: number;
  __CLASS__: string;
}

export interface JobCategory {
  label: string;
  tag: string;
}

class JobService {
  private readonly BASE_URL = import.meta.env.VITE_API_URL + "/api";
  
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly CACHE_TTL = 10 * 60 * 60 * 1000;
  
  private getCacheKey(endpoint: string, params: any): string {
    return `${endpoint}:${JSON.stringify(params)}`;
  }
  
  private isValidCache(timestamp: number): boolean {
    return Date.now() - timestamp < this.CACHE_TTL;
  }
  
  async searchJobs(params: JobSearchParams): Promise<JobSearchResponse> {
    const cacheKey = this.getCacheKey('search', params);
    const cached = this.cache.get(cacheKey);
    
    if (cached && this.isValidCache(cached.timestamp)) {
      return cached.data as JobSearchResponse;
    }
    
    try {
      
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
      
      const response = await axios.get(`${this.BASE_URL}/jobs/search?${queryParams}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      this.cache.set(cacheKey, { data: response.data, timestamp: Date.now() });
      return response.data as JobSearchResponse;
      
    } catch (error: any) {
      console.error('❌ Backend API call failed:', error);
      throw new Error(`Failed to fetch jobs: ${error.message}`);
    }
  }

  async getCategories(): Promise<JobCategory[]> {
    const cacheKey = this.getCacheKey('categories', {});
    const cached = this.cache.get(cacheKey);
    
    if (cached && this.isValidCache(cached.timestamp)) {
      return cached.data as JobCategory[];
    }
    
    try {
      
      const response = await axios.get(`${this.BASE_URL}/jobs/categories`, {
        timeout: 15000,
        headers: {
          'Accept': 'application/json',
        }
      });
      
      this.cache.set(cacheKey, { data: response.data, timestamp: Date.now() });
      return response.data as JobCategory[];
      
    } catch (error:any) {
      console.error('❌ Categories API call failed:', error);
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }
  }
}

export default new JobService();
