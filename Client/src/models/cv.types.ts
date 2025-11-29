
export interface CVFile {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

export interface CVAnalysis {
  id: string;
  fileName: string;
  uploadDate: string;
  matchScore: number;
  identifiedSkills: string[];
  skillsToAdd: string[];
  recommendations: AIRecommendation[];
  optimizedSummary: string;
}

export interface AIRecommendation {
  section: 'summary' | 'skills' | 'experience';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

export interface JobDescription {
  title: string;
  company: string;
  requirements: string[];
  description: string;
}

export interface SkillGap {
  skill: string;
  importance: 'critical' | 'important' | 'nice-to-have';
  learningPath?: string;
}

export interface CVUploadResponse {
  success: boolean;
  analysis?: CVAnalysis;
  error?: string;
}

export interface OptimizationReport {
  originalCV: string;
  optimizedCV: string;
  changes: string[];
  improvementScore: number;
}