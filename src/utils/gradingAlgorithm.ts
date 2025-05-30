
import { DataSource, SourceDiscoveryLog } from '@/types/database';

export interface GradingClass {
  name: string;
  weight: number;
  criteria: GradingCriteria[];
}

export interface GradingCriteria {
  name: string;
  maxScore: number;
  evaluator: (source: DataSource) => number;
}

export const gradingClasses: GradingClass[] = [
  {
    name: 'Data Quality & Completeness',
    weight: 0.25,
    criteria: [
      {
        name: 'Number of Data Points Available',
        maxScore: 100,
        evaluator: (source) => {
          // Mock evaluation based on expected companies
          const companies = source.expected_companies || 0;
          if (companies > 50000) return 100;
          if (companies > 10000) return 80;
          if (companies > 1000) return 60;
          return 40;
        }
      }
    ]
  },
  {
    name: 'Accessibility & Technical',
    weight: 0.20,
    criteria: [
      {
        name: 'Website Accessibility',
        maxScore: 100,
        evaluator: (source) => {
          if (source.captcha_requirements) return 50;
          if (source.search_input_required) return 70;
          return 90;
        }
      }
    ]
  },
  {
    name: 'Legal & Compliance',
    weight: 0.20,
    criteria: [
      {
        name: 'Compliance Status',
        maxScore: 100,
        evaluator: (source) => {
          switch (source.compliance_status) {
            case 'Compliant': return 100;
            case 'Under Review': return 50;
            case 'Non-Compliant': return 0;
            default: return 25;
          }
        }
      }
    ]
  },
  {
    name: 'Data Currency & Updates',
    weight: 0.15,
    criteria: [
      {
        name: 'Update Frequency',
        maxScore: 100,
        evaluator: (source) => {
          const frequency = source.update_frequency?.toLowerCase() || '';
          if (frequency.includes('daily')) return 100;
          if (frequency.includes('weekly')) return 80;
          if (frequency.includes('monthly')) return 60;
          if (frequency.includes('quarterly')) return 40;
          return 20;
        }
      }
    ]
  },
  {
    name: 'Source Reliability',
    weight: 0.20,
    criteria: [
      {
        name: 'Source Type Credibility',
        maxScore: 100,
        evaluator: (source) => {
          switch (source.source_type) {
            case 'Governmental': return 100;
            case 'Ministry': return 95;
            case 'Stock Exchange': return 90;
            case 'Chamber': return 80;
            case 'Non-governmental': return 60;
            default: return 40;
          }
        }
      }
    ]
  }
];

export const calculateSourceGrade = (source: DataSource): { score: number; grade: string } => {
  let totalScore = 0;
  
  for (const gradingClass of gradingClasses) {
    let classScore = 0;
    
    for (const criteria of gradingClass.criteria) {
      classScore += criteria.evaluator(source);
    }
    
    // Average the criteria scores for this class
    const avgClassScore = classScore / gradingClass.criteria.length;
    totalScore += avgClassScore * gradingClass.weight;
  }
  
  // Determine grade based on score
  let grade = 'F';
  if (totalScore >= 95) grade = 'A+';
  else if (totalScore >= 90) grade = 'A';
  else if (totalScore >= 85) grade = 'A-';
  else if (totalScore >= 80) grade = 'B+';
  else if (totalScore >= 75) grade = 'B';
  else if (totalScore >= 70) grade = 'B-';
  else if (totalScore >= 65) grade = 'C+';
  else if (totalScore >= 60) grade = 'C';
  else if (totalScore >= 55) grade = 'C-';
  else if (totalScore >= 50) grade = 'D';
  
  return { score: Math.round(totalScore), grade };
};

// Mock AI-powered content analysis
export const analyzeSourceContent = async (url: string): Promise<any> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock analysis results
  const mockResults = {
    dataPointsDetected: {
      company_name: Math.random() > 0.2,
      address: Math.random() > 0.3,
      contact_details: Math.random() > 0.4,
      uin: Math.random() > 0.5,
      legal_form: Math.random() > 0.6,
      activity_code: Math.random() > 0.4,
      shareholder_name: Math.random() > 0.7,
      director_name: Math.random() > 0.6,
      full_financials: Math.random() > 0.8
    },
    language: Math.random() > 0.5 ? 'Arabic' : 'English',
    updateFrequency: ['Daily', 'Weekly', 'Monthly', 'Quarterly'][Math.floor(Math.random() * 4)],
    captchaDetected: Math.random() > 0.8,
    searchRequired: Math.random() > 0.6,
    confidence: Math.floor(Math.random() * 30) + 70 // 70-100%
  };
  
  return mockResults;
};

// Mock automated source discovery
export const discoverSources = async (criteria: {
  keywords: string;
  region: string;
  sourceType: string;
}): Promise<SourceDiscoveryLog[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock discovered sources based on criteria
  const mockSources: Partial<SourceDiscoveryLog>[] = [
    {
      search_criteria: `${criteria.keywords} ${criteria.region} ${criteria.sourceType}`,
      discovered_url: `https://${criteria.region.toLowerCase()}-chamber.org`,
      confidence_score: Math.floor(Math.random() * 20) + 75,
      status: 'Pending',
      notes: `Discovered through AI analysis of ${criteria.keywords} in ${criteria.region}`
    },
    {
      search_criteria: `${criteria.keywords} ${criteria.region} commercial registry`,
      discovered_url: `https://registry.${criteria.region.toLowerCase()}.gov`,
      confidence_score: Math.floor(Math.random() * 15) + 80,
      status: 'Pending',
      notes: `High-confidence governmental source for ${criteria.region}`
    }
  ];
  
  return mockSources as SourceDiscoveryLog[];
};
