import axios from 'axios';
import process from 'process';

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
  _note?: string;
}

export interface SalaryData {
  role: string;
  min: number;
  max: number;
  average: number;
}

export interface MarketStats {
  activeJobs: number;
  entryLevelJobs: number;
  internships: number;
  newThisWeek: number;
  trendingSkills: Array<{
    skill: string;
    growth: string;
    demand: number;
  }>;
  salaryRanges: SalaryData[];
}

class JobService {
  private readonly ADZUNA_APP_ID = process.env.ADZUNA_APP_ID || '-----';
  private readonly ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY || '+++';
  private readonly CORS_PROXY = 'https://api.allorigins.win/raw?url=';
  private readonly ADZUNA_BASE = 'http://api.adzuna.com/v1/api/jobs/za';
  
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly CACHE_TTL = 10 * 60 * 60 * 1000; // 10 hours
  
  private getCacheKey(endpoint: string, params: any): string {
    return `${endpoint}:${JSON.stringify(params)}`;
  }
  
  private isValidCache(timestamp: number): boolean {
    return Date.now() - timestamp < this.CACHE_TTL;
  }

  private buildAdzunaUrl(endpoint: string, params: any = {}): string {
    const url = new URL(`${this.ADZUNA_BASE}/${endpoint}`);
    url.searchParams.set('app_id', this.ADZUNA_APP_ID);
    url.searchParams.set('app_key', this.ADZUNA_APP_KEY);
    url.searchParams.set('content-type', 'application/json');
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });
    
    return url.toString();
  }
  
  /**
   * Search for jobs calling Adzuna API directly via CORS proxy - Single call with 10hr cache
   */
  async searchJobs(params: JobSearchParams): Promise<JobSearchResponse> {
    const cacheKey = this.getCacheKey('search', params);
    const cached = this.cache.get(cacheKey);
    
    if (cached && this.isValidCache(cached.timestamp)) {
      return cached.data as JobSearchResponse;
    }
    
    const pageNum = params.page || 1;
    const { page, ...queryParams } = params;
    
    const adzunaUrl = this.buildAdzunaUrl(`search/${pageNum}`, queryParams);
    const proxiedUrl = `${this.CORS_PROXY}${encodeURIComponent(adzunaUrl)}`;

    try {
      
      const response = await axios.get(proxiedUrl, {
        timeout: 15000,
        headers: {
          'Accept': 'application/json',
        }
      });
      
      
      this.cache.set(cacheKey, { data: response.data, timestamp: Date.now() });
      return response.data as JobSearchResponse;
      
    } catch (error) {
      console.error('❌ Direct API call failed:', error);
      throw new Error('Unable to fetch jobs from Adzuna API directly. Please check your connection and try again.');
    }
  }

  /**
   * Get salary data for histogram - Direct Adzuna API with 10hr cache
   */
  async getSalaryData(what?: string, where?: string): Promise<any> {
    const cacheKey = this.getCacheKey('histogram', { what, where });
    const cached = this.cache.get(cacheKey);
    
    if (cached && this.isValidCache(cached.timestamp)) {
      return cached.data;
    }
    
    const params: any = {};
    if (what) params.what = what;
    if (where) params.where = where;
    
    const adzunaUrl = this.buildAdzunaUrl('histogram', params);
    const proxiedUrl = `${this.CORS_PROXY}${encodeURIComponent(adzunaUrl)}`;
    
    try {
      const response = await axios.get(proxiedUrl, {
        timeout: 10000,
        headers: {
          'Accept': 'application/json',
        }
      });
      
      this.cache.set(cacheKey, { data: response.data, timestamp: Date.now() });
      return response.data;
    } catch (error) {
      console.error('❌ Salary API failed:', error);
      throw new Error('Unable to fetch salary data from Adzuna API directly');
    }
  }

  /**
   * Get top companies - Direct Adzuna API with 10hr cache
   */
  async getTopCompanies(what?: string): Promise<any> {
    const cacheKey = this.getCacheKey('companies', { what });
    const cached = this.cache.get(cacheKey);
    
    if (cached && this.isValidCache(cached.timestamp)) {
      return cached.data;
    }
    
    const params: any = {};
    if (what) params.what = what;
    
    const adzunaUrl = this.buildAdzunaUrl('top_companies', params);
    const proxiedUrl = `${this.CORS_PROXY}${encodeURIComponent(adzunaUrl)}`;
    
    try {
      const response = await axios.get(proxiedUrl, {
        timeout: 10000,
        headers: {
          'Accept': 'application/json',
        }
      });
      
      this.cache.set(cacheKey, { data: response.data, timestamp: Date.now() });
      return response.data;
    } catch (error) {
      console.error('❌ Companies API failed:', error);
      throw new Error('Unable to fetch top companies from Adzuna API directly');
    }
  }

  /**
   * Get market stats using single API call + cache for 10 hours
   */
  async getMarketStats(): Promise<MarketStats> {
    const cacheKey = this.getCacheKey('marketStats', {});
    const cached = this.cache.get(cacheKey);
    
    if (cached && this.isValidCache(cached.timestamp)) {
      return cached.data as MarketStats;
    }

    try {
      const allJobs = await this.searchJobs({ results_per_page: 1 });
      
      const marketData: MarketStats = {
        activeJobs: allJobs.count || 0,
        entryLevelJobs: Math.floor((allJobs.count || 0) * 0.15),
        internships: Math.floor((allJobs.count || 0) * 0.05),
        newThisWeek: Math.floor((allJobs.count || 0) * 0.12),
        trendingSkills: [
          { skill: 'Python', growth: '+45%', demand: 95 },
          { skill: 'React', growth: '+38%', demand: 88 },
          { skill: 'Data Science', growth: '+52%', demand: 92 },
          { skill: 'Cloud Computing', growth: '+43%', demand: 85 }
        ],
        salaryRanges: [
          { role: 'Junior Developer', min: 200000, max: 350000, average: 275000 },
          { role: 'Senior Developer', min: 400000, max: 800000, average: 600000 },
          { role: 'Data Analyst', min: 300000, max: 500000, average: 400000 },
          { role: 'Project Manager', min: 350000, max: 650000, average: 500000 }
        ]
      };
      
      this.cache.set(cacheKey, { data: marketData, timestamp: Date.now() });
      return marketData;
    } catch (error) {
      console.error('Failed to fetch market stats:', error);
      throw new Error('Unable to load market statistics from Adzuna API directly');
    }
  }
}

export default new JobService();
