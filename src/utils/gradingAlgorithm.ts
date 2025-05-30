
import { DataPoints } from '@/types/database';

export interface GradingClass {
  name: string;
  weight: number;
  dataPoints: (keyof DataPoints)[];
}

export const gradingClasses: GradingClass[] = [
  {
    name: 'Company Information',
    weight: 0.5,
    dataPoints: ['company_name', 'trade_name', 'address', 'contact_details']
  },
  {
    name: 'Company Identification Numbers',
    weight: 0.1,
    dataPoints: [
      'uin', 'uin_commercial_register', 'uin_chamber', 'uin_license', 
      'uin_vat_no', 'uin_others', 'company_registration_date', 
      'register_issue_date', 'register_expiry_date', 'register_status', 'legal_form'
    ]
  },
  {
    name: 'Business Classification',
    weight: 0.1,
    dataPoints: ['activity_code', 'activity_description']
  },
  {
    name: 'Shareholder Information',
    weight: 0.1,
    dataPoints: [
      'shareholder_name', 'shareholder_nationality', 'shareholder_dob',
      'shareholder_uin', 'shareholder_address', 'shareholder_shares', 'company_shares'
    ]
  },
  {
    name: 'Director Information',
    weight: 0.1,
    dataPoints: [
      'director_name', 'director_nationality', 'director_dob',
      'director_position', 'director_address'
    ]
  },
  {
    name: 'Employment and Financials',
    weight: 0.1,
    dataPoints: ['number_of_employees', 'full_financials', 'partial_financials', 'capital']
  }
];

export const calculateRecommendationScore = (dataPoints: DataPoints): number => {
  let totalScore = 0;

  for (const gradingClass of gradingClasses) {
    const hasAnyDataPoint = gradingClass.dataPoints.some(
      point => dataPoints[point] === true
    );
    
    if (hasAnyDataPoint) {
      totalScore += gradingClass.weight;
    }
  }

  return Math.round(totalScore * 100 * 100) / 100; // Round to 2 decimal places
};

export const getGradeFromScore = (score: number): string => {
  if (score >= 90) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'B-';
  if (score >= 50) return 'C';
  if (score >= 40) return 'C-';
  if (score >= 30) return 'D';
  return 'F';
};

export const getScoreColor = (score: number): string => {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-blue-600';
  if (score >= 40) return 'text-yellow-600';
  return 'text-red-600';
};

// Mock AI analysis function - in production this would call an actual AI service
export const analyzeSourceContent = async (url: string): Promise<Partial<DataPoints>> => {
  // Simulate AI analysis delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock AI results based on common patterns
  const mockResults: Partial<DataPoints> = {};
  
  // Simulate different analysis results based on URL patterns
  if (url.includes('chamber') || url.includes('commercial')) {
    Object.assign(mockResults, {
      company_name: true,
      trade_name: true,
      address: true,
      contact_details: true,
      uin_commercial_register: true,
      activity_code: true,
      activity_description: true
    });
  } else if (url.includes('stock') || url.includes('exchange')) {
    Object.assign(mockResults, {
      company_name: true,
      shareholder_name: true,
      director_name: true,
      full_financials: true,
      capital: true
    });
  } else if (url.includes('gov') || url.includes('ministry')) {
    Object.assign(mockResults, {
      company_name: true,
      uin: true,
      legal_form: true,
      company_registration_date: true,
      register_status: true
    });
  } else {
    // Default basic analysis
    Object.assign(mockResults, {
      company_name: true,
      address: true,
      uin: true
    });
  }
  
  return mockResults;
};

// Mock web discovery function
export const discoverSources = async (criteria: {
  keywords: string;
  region: string;
  sourceType: string;
}): Promise<SourceDiscoveryLog[]> => {
  // Simulate discovery delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const mockSources = [
    {
      id: crypto.randomUUID(),
      search_criteria: criteria.keywords,
      discovered_url: `https://${criteria.region.toLowerCase()}-business-registry.com`,
      confidence_score: Math.round((Math.random() * 40 + 60) * 100) / 100,
      status: 'Pending',
      analyzed_at: new Date().toISOString(),
      notes: `Discovered via automated search for ${criteria.keywords} in ${criteria.region}`
    },
    {
      id: crypto.randomUUID(),
      search_criteria: criteria.keywords,
      discovered_url: `https://${criteria.region.toLowerCase()}-companies.gov`,
      confidence_score: Math.round((Math.random() * 30 + 70) * 100) / 100,
      status: 'Pending',
      analyzed_at: new Date().toISOString(),
      notes: `Government source found for ${criteria.sourceType} in ${criteria.region}`
    }
  ];
  
  return mockSources;
};
