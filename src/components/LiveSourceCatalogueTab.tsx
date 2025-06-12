
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ExternalLink, Globe, Shield, Database } from 'lucide-react';

interface LiveSource {
  id: string;
  department: string;
  region: string;
  country: string;
  sourceName: string;
  sourceHyperlink: string;
  sourceStatus: 'Active' | 'Inactive' | 'Under Maintenance';
  sourceType: string;
  dataType: string;
  discoveryMethod: 'Manual' | 'Automated';
  termsConditions: 'Yes' | 'No';
  searchInput: string;
  searchOutput: string;
  dataFormat: string;
  captchaRequirement: 'Yes' | 'No';
  languageOfData: string;
  adip: 'Yes' | 'No';
  adipRefreshFrequency: string;
  reliabilityScore: number;
  relevanceScore: number;
}

const mockLiveSources: LiveSource[] = [
  {
    id: '1',
    department: 'Credit',
    region: 'MENA',
    country: 'Lebanon',
    sourceName: 'Commercial Register',
    sourceHyperlink: 'https://cr.gov.lb',
    sourceStatus: 'Active',
    sourceType: 'Ministry',
    dataType: 'Registry',
    discoveryMethod: 'Manual',
    termsConditions: 'Yes',
    searchInput: 'Company ID',
    searchOutput: 'Company Name, Address',
    dataFormat: 'PDF',
    captchaRequirement: 'No',
    languageOfData: 'Arabic',
    adip: 'Yes',
    adipRefreshFrequency: 'Monthly',
    reliabilityScore: 85,
    relevanceScore: 90
  },
  {
    id: '2',
    department: 'Due Diligence',
    region: 'EMEA',
    country: 'Egypt',
    sourceName: 'OFAC List',
    sourceHyperlink: 'https://ofac.treas.gov',
    sourceStatus: 'Under Maintenance',
    sourceType: 'Federal',
    dataType: 'Sanctions',
    discoveryMethod: 'Automated',
    termsConditions: 'No',
    searchInput: 'Entity Name',
    searchOutput: 'Sanctioned Entity, Date',
    dataFormat: 'HTML',
    captchaRequirement: 'Yes',
    languageOfData: 'English',
    adip: 'No',
    adipRefreshFrequency: 'Quarterly',
    reliabilityScore: 78,
    relevanceScore: 88
  },
  {
    id: '3',
    department: 'Data',
    region: 'Global',
    country: 'Global',
    sourceName: 'World Bank Registry',
    sourceHyperlink: 'https://worldbank.org/data',
    sourceStatus: 'Inactive',
    sourceType: 'NGO',
    dataType: 'Financials',
    discoveryMethod: 'Manual',
    termsConditions: 'Yes',
    searchInput: 'Country Code',
    searchOutput: 'GDP, Export Values',
    dataFormat: 'CSV',
    captchaRequirement: 'No',
    languageOfData: 'English, French',
    adip: 'Yes',
    adipRefreshFrequency: 'Annually',
    reliabilityScore: 92,
    relevanceScore: 95
  },
  {
    id: '4',
    department: 'Credit',
    region: 'APAC',
    country: 'India',
    sourceName: 'Ministry of Finance',
    sourceHyperlink: 'https://finmin.gov.in',
    sourceStatus: 'Active',
    sourceType: 'Ministry',
    dataType: 'Financials',
    discoveryMethod: 'Automated',
    termsConditions: 'Yes',
    searchInput: 'Budget Year',
    searchOutput: 'Revenue, Expenditure',
    dataFormat: 'PDF',
    captchaRequirement: 'No',
    languageOfData: 'English, Hindi',
    adip: 'Yes',
    adipRefreshFrequency: 'Annually',
    reliabilityScore: 88,
    relevanceScore: 89
  },
  {
    id: '5',
    department: 'Due Diligence',
    region: 'MENA',
    country: 'Saudi Arabia',
    sourceName: 'Zakat & Tax Authority',
    sourceHyperlink: 'https://zakat.gov.sa',
    sourceStatus: 'Active',
    sourceType: 'Authority',
    dataType: 'Tax Records',
    discoveryMethod: 'Manual',
    termsConditions: 'Yes',
    searchInput: 'Tax Number',
    searchOutput: 'Filing Status, Amount',
    dataFormat: 'HTML',
    captchaRequirement: 'Yes',
    languageOfData: 'Arabic, English',
    adip: 'No',
    adipRefreshFrequency: 'Monthly',
    reliabilityScore: 91,
    relevanceScore: 93
  },
  {
    id: '6',
    department: 'Data',
    region: 'EMEA',
    country: 'UK',
    sourceName: 'VAT Verification Service',
    sourceHyperlink: 'https://gov.uk/vat-verify',
    sourceStatus: 'Active',
    sourceType: 'Government',
    dataType: 'Tax Verification',
    discoveryMethod: 'Automated',
    termsConditions: 'Yes',
    searchInput: 'VAT Number',
    searchOutput: 'Company Status, Validity',
    dataFormat: 'HTML',
    captchaRequirement: 'No',
    languageOfData: 'English',
    adip: 'Yes',
    adipRefreshFrequency: 'Quarterly',
    reliabilityScore: 87,
    relevanceScore: 86
  },
  {
    id: '7',
    department: 'Credit',
    region: 'Americas',
    country: 'USA',
    sourceName: 'Gazette of Government',
    sourceHyperlink: 'https://gpo.gov/gsn',
    sourceStatus: 'Inactive',
    sourceType: 'Government',
    dataType: 'Legal Notices',
    discoveryMethod: 'Manual',
    termsConditions: 'No',
    searchInput: 'Issue Date',
    searchOutput: 'Publication Title, Date',
    dataFormat: 'PDF',
    captchaRequirement: 'No',
    languageOfData: 'English',
    adip: 'No',
    adipRefreshFrequency: 'Annually',
    reliabilityScore: 80,
    relevanceScore: 75
  },
  {
    id: '8',
    department: 'Due Diligence',
    region: 'APAC',
    country: 'Japan',
    sourceName: 'Revenue Authority',
    sourceHyperlink: 'https://nta.go.jp',
    sourceStatus: 'Under Maintenance',
    sourceType: 'Authority',
    dataType: 'Tax Records',
    discoveryMethod: 'Automated',
    termsConditions: 'Yes',
    searchInput: 'Tax ID',
    searchOutput: 'Payment History, Balance',
    dataFormat: 'CSV',
    captchaRequirement: 'Yes',
    languageOfData: 'Japanese',
    adip: 'Yes',
    adipRefreshFrequency: 'Monthly',
    reliabilityScore: 83,
    relevanceScore: 85
  },
  {
    id: '9',
    department: 'Data',
    region: 'EMEA',
    country: 'Germany',
    sourceName: 'Federal Gazette (Bundesanzeiger)',
    sourceHyperlink: 'https://www.bundesanzeiger.de',
    sourceStatus: 'Active',
    sourceType: 'Government',
    dataType: 'Corporate Filings',
    discoveryMethod: 'Manual',
    termsConditions: 'No',
    searchInput: 'Company Reg No',
    searchOutput: 'Directors, Financial Statements',
    dataFormat: 'HTML',
    captchaRequirement: 'No',
    languageOfData: 'German',
    adip: 'No',
    adipRefreshFrequency: 'Quarterly',
    reliabilityScore: 90,
    relevanceScore: 92
  },
  {
    id: '10',
    department: 'Credit',
    region: 'Global',
    country: 'Global',
    sourceName: 'International Newspaper Archive',
    sourceHyperlink: 'https://newsarchive.org',
    sourceStatus: 'Active',
    sourceType: 'Private Archive',
    dataType: 'Press Coverage',
    discoveryMethod: 'Automated',
    termsConditions: 'Yes',
    searchInput: 'Keywords',
    searchOutput: 'Headline, Publication Date',
    dataFormat: 'PDF',
    captchaRequirement: 'No',
    languageOfData: 'English, Multiple',
    adip: 'Yes',
    adipRefreshFrequency: 'Annually',
    reliabilityScore: 75,
    relevanceScore: 80
  }
];

export const LiveSourceCatalogueTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredSources = mockLiveSources.filter((source) => {
    const matchesSearch = source.sourceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         source.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         source.dataType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || source.department === departmentFilter;
    const matchesRegion = regionFilter === 'all' || source.region === regionFilter;
    const matchesStatus = statusFilter === 'all' || source.sourceStatus === statusFilter;

    return matchesSearch && matchesDepartment && matchesRegion && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-600 text-white">Active</Badge>;
      case 'Inactive':
        return <Badge className="bg-red-600 text-white">Inactive</Badge>;
      case 'Under Maintenance':
        return <Badge className="bg-yellow-600 text-white">Under Maintenance</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getScoreBadge = (score: number, type: 'reliability' | 'relevance') => {
    const color = score >= 90 ? 'bg-green-100 text-green-800' : 
                  score >= 80 ? 'bg-blue-100 text-blue-800' : 
                  score >= 70 ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800';
    
    return <Badge className={color}>{score}%</Badge>;
  };

  const departments = ['all', ...Array.from(new Set(mockLiveSources.map(s => s.department)))];
  const regions = ['all', ...Array.from(new Set(mockLiveSources.map(s => s.region)))];
  const statuses = ['all', ...Array.from(new Set(mockLiveSources.map(s => s.sourceStatus)))];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Live Source Catalogue</h2>
          <p className="text-muted-foreground mt-2">
            Comprehensive catalogue of live data sources across all regions and departments
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-sm border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Live Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{mockLiveSources.length}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {mockLiveSources.filter(s => s.sourceStatus === 'Active').length}
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">ADIP Integrated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {mockLiveSources.filter(s => s.adip === 'Yes').length}
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-l-4 border-l-orange-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Reliability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {Math.round(mockLiveSources.reduce((acc, s) => acc + s.reliabilityScore, 0) / mockLiveSources.length)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by source name, country, or data type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 shadow-sm"
            />
          </div>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map(dept => (
                <SelectItem key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map(region => (
                <SelectItem key={region} value={region}>
                  {region === 'all' ? 'All Regions' : region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map(status => (
                <SelectItem key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Sources Table */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-green-600" />
            Live Sources ({filteredSources.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-32">Department</TableHead>
                  <TableHead className="min-w-24">Region</TableHead>
                  <TableHead className="min-w-32">Country</TableHead>
                  <TableHead className="min-w-48">Source Name</TableHead>
                  <TableHead className="min-w-48">Source Hyperlink</TableHead>
                  <TableHead className="min-w-32">Status</TableHead>
                  <TableHead className="min-w-32">Source Type</TableHead>
                  <TableHead className="min-w-32">Data Type</TableHead>
                  <TableHead className="min-w-32">Discovery Method</TableHead>
                  <TableHead className="min-w-32">Terms & Conditions</TableHead>
                  <TableHead className="min-w-32">Search Input</TableHead>
                  <TableHead className="min-w-48">Search Output</TableHead>
                  <TableHead className="min-w-24">Data Format</TableHead>
                  <TableHead className="min-w-32">Captcha Requirement</TableHead>
                  <TableHead className="min-w-40">Language</TableHead>
                  <TableHead className="min-w-20">ADIP</TableHead>
                  <TableHead className="min-w-32">ADIP Refresh</TableHead>
                  <TableHead className="min-w-32">Reliability</TableHead>
                  <TableHead className="min-w-32">Relevance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSources.map((source) => (
                  <TableRow key={source.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{source.department}</TableCell>
                    <TableCell>{source.region}</TableCell>
                    <TableCell>{source.country}</TableCell>
                    <TableCell className="font-medium">{source.sourceName}</TableCell>
                    <TableCell>
                      <a 
                        href={source.sourceHyperlink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {source.sourceHyperlink}
                      </a>
                    </TableCell>
                    <TableCell>{getStatusBadge(source.sourceStatus)}</TableCell>
                    <TableCell>{source.sourceType}</TableCell>
                    <TableCell>{source.dataType}</TableCell>
                    <TableCell>
                      <Badge variant={source.discoveryMethod === 'Automated' ? 'default' : 'outline'}>
                        {source.discoveryMethod}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={source.termsConditions === 'Yes' ? 'destructive' : 'default'}>
                        {source.termsConditions}
                      </Badge>
                    </TableCell>
                    <TableCell>{source.searchInput}</TableCell>
                    <TableCell>{source.searchOutput}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{source.dataFormat}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={source.captchaRequirement === 'Yes' ? 'destructive' : 'default'}>
                        {source.captchaRequirement}
                      </Badge>
                    </TableCell>
                    <TableCell>{source.languageOfData}</TableCell>
                    <TableCell>
                      <Badge variant={source.adip === 'Yes' ? 'default' : 'outline'}>
                        {source.adip}
                      </Badge>
                    </TableCell>
                    <TableCell>{source.adipRefreshFrequency}</TableCell>
                    <TableCell>{getScoreBadge(source.reliabilityScore, 'reliability')}</TableCell>
                    <TableCell>{getScoreBadge(source.relevanceScore, 'relevance')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
