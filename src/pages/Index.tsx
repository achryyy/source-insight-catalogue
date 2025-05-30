
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Search, 
  Plus, 
  Database, 
  Globe, 
  Shield, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Bot,
  Star,
  Filter,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  BarChart3,
  Users,
  Building2,
  Calendar,
  Loader2
} from 'lucide-react';

import { useDataSourcesWithPoints } from '@/hooks/useDataSources';
import { useSourceDiscoveryLogs, useCreateDiscoveryLog } from '@/hooks/useSourceDiscovery';
import { SourceForm } from '@/components/SourceForm';
import { discoverSources, gradingClasses } from '@/utils/gradingAlgorithm';
import { DataSource } from '@/types/database';
import { toast } from 'sonner';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSource, setEditingSource] = useState<DataSource | undefined>();
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [discoveryForm, setDiscoveryForm] = useState({
    keywords: '',
    region: '',
    sourceType: ''
  });

  const { data: sourcesWithPoints, isLoading } = useDataSourcesWithPoints();
  const { data: discoveryLogs } = useSourceDiscoveryLogs();
  const createDiscoveryLog = useCreateDiscoveryLog();

  const sources = sourcesWithPoints || [];

  // Calculate dashboard stats
  const dashboardStats = {
    totalSources: sources.length,
    activeSources: sources.filter(s => s.status === 'Active').length,
    avgRecommendationScore: sources.length > 0 ? 
      sources.reduce((acc, s) => acc + s.recommendation_score, 0) / sources.length : 0,
    complianceCoverage: sources.length > 0 ?
      (sources.filter(s => s.compliance_status === 'Compliant').length / sources.length) * 100 : 0,
    newSourcesThisMonth: sources.filter(s => {
      const created = new Date(s.created_at);
      const now = new Date();
      return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
    }).length,
    pendingReview: sources.filter(s => s.compliance_status === 'Under Review').length
  };

  const filteredSources = sources.filter(source => {
    const matchesSearch = source.source_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         source.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === 'all' || source.country === selectedCountry;
    const matchesType = selectedType === 'all' || source.source_type === selectedType;
    const matchesStatus = selectedStatus === 'all' || source.status === selectedStatus;
    
    return matchesSearch && matchesCountry && matchesType && matchesStatus;
  });

  const handleStartDiscovery = async () => {
    if (!discoveryForm.keywords || !discoveryForm.region || !discoveryForm.sourceType) {
      toast.error('Please fill in all discovery criteria');
      return;
    }

    setIsDiscovering(true);
    try {
      const discoveredSources = await discoverSources(discoveryForm);
      
      // Save discovery logs to database
      for (const source of discoveredSources) {
        await createDiscoveryLog.mutateAsync(source);
      }
      
      toast.success(`Discovered ${discoveredSources.length} potential sources`);
    } catch (error) {
      toast.error('Discovery failed. Please try again.');
    } finally {
      setIsDiscovering(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Under Maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplianceColor = (compliance: string) => {
    switch (compliance) {
      case 'Compliant': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Non-Compliant': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade?.startsWith('A')) return 'text-green-600';
    if (grade?.startsWith('B')) return 'text-blue-600';
    if (grade?.startsWith('C')) return 'text-yellow-600';
    if (grade?.startsWith('D')) return 'text-red-600';
    return 'text-gray-600';
  };

  const getDataPointsList = (dataPoints: any) => {
    if (!dataPoints) return [];
    
    const availablePoints = [];
    if (dataPoints.company_name) availablePoints.push('Company Name');
    if (dataPoints.trade_name) availablePoints.push('Trade Name');
    if (dataPoints.address) availablePoints.push('Address');
    if (dataPoints.contact_details) availablePoints.push('Contact Details');
    if (dataPoints.uin) availablePoints.push('UIN');
    if (dataPoints.legal_form) availablePoints.push('Legal Form');
    if (dataPoints.activity_code) availablePoints.push('Activity Code');
    if (dataPoints.shareholder_name) availablePoints.push('Shareholders');
    if (dataPoints.director_name) availablePoints.push('Directors');
    if (dataPoints.full_financials) availablePoints.push('Financials');
    
    return availablePoints;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Database className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Data Source Intelligence Platform</h1>
                <p className="text-sm text-gray-600">Comprehensive Data Source Management & Analytics</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Add Source</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingSource ? 'Edit Source' : 'Add New Source'}</DialogTitle>
                  </DialogHeader>
                  <SourceForm 
                    source={editingSource} 
                    onSuccess={() => {
                      setIsFormOpen(false);
                      setEditingSource(undefined);
                    }} 
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="repository" className="flex items-center space-x-2">
              <Database className="h-4 w-4" />
              <span>Repository</span>
            </TabsTrigger>
            <TabsTrigger value="discovery" className="flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <span>Discovery</span>
            </TabsTrigger>
            <TabsTrigger value="grading" className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>Grading</span>
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Compliance</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Database className="h-5 w-5" />
                    <span>Total Sources</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{dashboardStats.totalSources.toLocaleString()}</div>
                  <p className="text-blue-100 mt-1">Across all regions</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Active Sources</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{dashboardStats.activeSources.toLocaleString()}</div>
                  <p className="text-green-100 mt-1">
                    {dashboardStats.totalSources > 0 ? 
                      ((dashboardStats.activeSources / dashboardStats.totalSources) * 100).toFixed(1) : 0}% operational
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Avg. Score</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{dashboardStats.avgRecommendationScore.toFixed(1)}%</div>
                  <p className="text-purple-100 mt-1">Recommendation score</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <span>Compliance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{dashboardStats.complianceCoverage.toFixed(1)}%</div>
                  <p className="text-gray-600 mt-1">Sources compliant</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Plus className="h-5 w-5 text-green-600" />
                    <span>New Sources</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{dashboardStats.newSourcesThisMonth}</div>
                  <p className="text-gray-600 mt-1">Added this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <span>Pending Review</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{dashboardStats.pendingReview}</div>
                  <p className="text-gray-600 mt-1">Awaiting approval</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Repository Tab */}
          <TabsContent value="repository" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>Search & Filter Sources</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search sources..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Countries</SelectItem>
                      {Array.from(new Set(sources.map(s => s.country))).map(country => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Source Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Governmental">Governmental</SelectItem>
                      <SelectItem value="Ministry">Ministry</SelectItem>
                      <SelectItem value="Chamber">Chamber</SelectItem>
                      <SelectItem value="Stock Exchange">Stock Exchange</SelectItem>
                      <SelectItem value="Non-governmental">Non-governmental</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Sources List */}
            <div className="grid gap-6">
              {filteredSources.map((source) => {
                const dataPoints = getDataPointsList(source.data_points?.[0]);
                return (
                  <Card key={source.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <CardTitle className="text-xl">{source.source_name}</CardTitle>
                            {source.adip_source && (
                              <Badge className="bg-blue-100 text-blue-800">ADIP Source</Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center space-x-1">
                              <Globe className="h-4 w-4" />
                              <span>{source.country}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Building2 className="h-4 w-4" />
                              <span>{source.source_type}</span>
                            </span>
                            {source.expected_companies && (
                              <span className="flex items-center space-x-1">
                                <Users className="h-4 w-4" />
                                <span>{source.expected_companies.toLocaleString()} companies</span>
                              </span>
                            )}
                            <span className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>Updated {new Date(source.updated_at).toLocaleDateString()}</span>
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {source.source_hyperlink && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={source.source_hyperlink} target="_blank" rel="noopener noreferrer">
                                <Eye className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setEditingSource(source);
                              setIsFormOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Status</span>
                            <Badge className={getStatusColor(source.status)}>
                              {source.status}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Compliance</span>
                            <Badge className={getComplianceColor(source.compliance_status)}>
                              {source.compliance_status}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Grade</span>
                            <span className={`text-lg font-bold ${getGradeColor(source.source_grade)}`}>
                              {source.source_grade || 'N/A'}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">Recommendation Score</span>
                              <span className="text-sm font-bold">{source.recommendation_score}%</span>
                            </div>
                            <Progress value={source.recommendation_score} className="h-2" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <span className="text-sm font-medium">Available Data Points</span>
                          <div className="flex flex-wrap gap-1">
                            {dataPoints.slice(0, 3).map((point, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {point}
                              </Badge>
                            ))}
                            {dataPoints.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{dataPoints.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Discovery Tab */}
          <TabsContent value="discovery" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Search className="h-5 w-5" />
                    <span>Automated Source Discovery</span>
                  </CardTitle>
                  <CardDescription>
                    AI-powered web search to identify new data sources
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Search Criteria</label>
                    <Input 
                      placeholder="Enter keywords, regions, or source types..." 
                      value={discoveryForm.keywords}
                      onChange={(e) => setDiscoveryForm(prev => ({ ...prev, keywords: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Country/Region</label>
                      <Select value={discoveryForm.region} onValueChange={(value) => setDiscoveryForm(prev => ({ ...prev, region: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="middle-east">Middle East</SelectItem>
                          <SelectItem value="africa">Africa</SelectItem>
                          <SelectItem value="morocco">Morocco</SelectItem>
                          <SelectItem value="tunisia">Tunisia</SelectItem>
                          <SelectItem value="kuwait">Kuwait</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Source Type</label>
                      <Select value={discoveryForm.sourceType} onValueChange={(value) => setDiscoveryForm(prev => ({ ...prev, sourceType: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="governmental">Governmental</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="chamber">Chamber</SelectItem>
                          <SelectItem value="stock-exchange">Stock Exchange</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={handleStartDiscovery}
                    disabled={isDiscovering}
                  >
                    {isDiscovering ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Bot className="h-4 w-4 mr-2" />
                    )}
                    {isDiscovering ? 'Discovering...' : 'Start AI Discovery'}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Plus className="h-5 w-5" />
                    <span>Manual Source Addition</span>
                  </CardTitle>
                  <CardDescription>
                    Add sources manually with URL analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => setIsFormOpen(true)}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Add New Source
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Discovered Sources */}
            <Card>
              <CardHeader>
                <CardTitle>Recently Discovered Sources</CardTitle>
                <CardDescription>
                  Sources identified through automated discovery awaiting review
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {discoveryLogs?.slice(0, 5).map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{log.search_criteria}</p>
                        <p className="text-sm text-gray-600">{log.discovered_url}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <p className="text-sm font-medium">{log.confidence_score}%</p>
                          <p className="text-xs text-gray-500">Confidence</p>
                        </div>
                        <Badge variant={log.status === 'Approved' ? 'default' : 'secondary'}>
                          {log.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Grading Tab */}
          <TabsContent value="grading" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="h-5 w-5" />
                    <span>Grading System Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Scoring Classes & Weights</h4>
                    <div className="space-y-2">
                      {gradingClasses.map((gradingClass, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-blue-50 rounded">
                          <span className="text-sm">{gradingClass.name}</span>
                          <Badge>{(gradingClass.weight * 100)}% Weight</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600">
                      Sources scoring below 50% are automatically eliminated from consideration.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Grade Distribution</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { grade: 'A+ Grade (90-100%)', count: sources.filter(s => s.recommendation_score >= 90).length },
                      { grade: 'A Grade (80-89%)', count: sources.filter(s => s.recommendation_score >= 80 && s.recommendation_score < 90).length },
                      { grade: 'B Grade (70-79%)', count: sources.filter(s => s.recommendation_score >= 70 && s.recommendation_score < 80).length },
                      { grade: 'C Grade (50-69%)', count: sources.filter(s => s.recommendation_score >= 50 && s.recommendation_score < 70).length },
                    ].map(({ grade, count }) => (
                      <div key={grade} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{grade}</span>
                          <span className="text-sm text-gray-600">{count} sources</span>
                        </div>
                        <Progress value={sources.length > 0 ? (count / sources.length) * 100 : 0} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="h-5 w-5" />
                  <span>AI-Powered Content Analysis</span>
                </CardTitle>
                <CardDescription>
                  Automated analysis of source content to identify available data points
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">94.2%</div>
                    <p className="text-sm text-gray-600 mt-1">Analysis Accuracy</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{sources.length}</div>
                    <p className="text-sm text-gray-600 mt-1">Sources Analyzed</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">23</div>
                    <p className="text-sm text-gray-600 mt-1">Languages Supported</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span>Compliant</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    {sources.filter(s => s.compliance_status === 'Compliant').length}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Sources with clear T&C</p>
                  <Progress value={dashboardStats.complianceCoverage} className="h-2 mt-3" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-yellow-600" />
                    <span>Under Review</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-600">
                    {sources.filter(s => s.compliance_status === 'Under Review').length}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Pending legal review</p>
                  <Progress value={sources.length > 0 ? (sources.filter(s => s.compliance_status === 'Under Review').length / sources.length) * 100 : 0} className="h-2 mt-3" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <span>Non-Compliant</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">
                    {sources.filter(s => s.compliance_status === 'Non-Compliant').length}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Restricted usage</p>
                  <Progress value={sources.length > 0 ? (sources.filter(s => s.compliance_status === 'Non-Compliant').length / sources.length) * 100 : 0} className="h-2 mt-3" />
                </CardContent>
              </Card>
            </div>

            {/* Compliance Framework */}
            <Card>
              <CardHeader>
                <CardTitle>Data Privacy Compliance Framework</CardTitle>
                <CardDescription>
                  Ensuring adherence to GDPR, CCPA, and regional data protection laws
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Compliance Checks</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Terms & Conditions Review</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Data Usage Permissions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Privacy Policy Analysis</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Regional Law Compliance</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Data Protection Measures</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Encrypted Data Transmission</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Access Control & Audit Logs</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Data Retention Policies</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Regular Compliance Audits</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
