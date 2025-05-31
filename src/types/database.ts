export interface DataSource {
  id: string;
  country: string;
  source_name: string;
  source_hyperlink?: string;
  discovery_method: 'Manual' | 'Automated';
  source_type: 'Governmental' | 'Ministry' | 'Stock Exchange' | 'Chamber' | 'Non-governmental';
  source_grade?: string;
  expected_companies?: number;
  recommendation_score: number;
  status: 'Active' | 'Inactive' | 'Under Maintenance';
  adip_source: boolean;
  adip_refresh_frequency?: string;
  compliance_status: 'Compliant' | 'Under Review' | 'Non-Compliant';
  terms_conditions?: string;
  data_usage_limitations?: string;
  search_input_required: boolean;
  data_extraction_format?: 'HTML' | 'PDF' | 'API' | 'Excel' | 'CSV';
  page_display_limitation?: number;
  captcha_requirements: boolean;
  language_of_data?: string;
  update_frequency?: string;
  reviewer?: string;
  due_date?: string;
  added_value?: string;
  file_hyperlink?: string;
  approved: boolean;
  approved_by?: string;
  approved_at?: string;
  crawled: boolean;
  last_crawled_date?: string;
  needs_review: boolean;
  auto_populated: boolean;
  assigned_to?: string;
  progress_status?: 'not started' | 'in progress' | 'completed' | 'approved';
  created_at: string;
  updated_at: string;
}

export interface DataPoints {
  id: string;
  source_id: string;
  company_name: boolean;
  trade_name: boolean;
  address: boolean;
  contact_details: boolean;
  uin: boolean;
  uin_commercial_register: boolean;
  uin_chamber: boolean;
  uin_license: boolean;
  uin_vat_no: boolean;
  uin_others: boolean;
  company_registration_date: boolean;
  register_issue_date: boolean;
  register_expiry_date: boolean;
  register_status: boolean;
  legal_form: boolean;
  capital: boolean;
  activity_code: boolean;
  activity_description: boolean;
  shareholder_name: boolean;
  shareholder_nationality: boolean;
  shareholder_dob: boolean;
  shareholder_uin: boolean;
  shareholder_address: boolean;
  shareholder_shares: boolean;
  company_shares: boolean;
  director_name: boolean;
  director_nationality: boolean;
  director_dob: boolean;
  director_position: boolean;
  director_address: boolean;
  number_of_employees: boolean;
  full_financials: boolean;
  partial_financials: boolean;
}

export interface SourceDiscoveryLog {
  id: string;
  search_criteria: string;
  discovered_url: string;
  confidence_score: number;
  status: string;
  analyzed_at: string;
  approved_by?: string;
  approved_at?: string;
  notes?: string;
  needs_review: boolean;
}

export interface ActivityLog {
  id: string;
  source_id: string;
  action: string;
  description?: string;
  user_name?: string;
  timestamp: string;
}

export interface AdvancedFilters {
  approved?: boolean;
  adip_source?: boolean;
  needs_review?: boolean;
  crawled?: boolean;
  status?: string[];
  source_type?: string[];
  compliance_status?: string[];
}
