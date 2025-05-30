
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
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
  Calendar
} from 'lucide-react';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data for demonstration
  const dashboardStats = {
    totalSources: 1247,
    activeSources: 1089,
    avgRecommendationScore: 78.5,
    complianceCoverage: 94.2,
    newSourcesThisMonth: 23,
    pendingReview: 15
  };

  const mockSources = [
    {
      id: 1,
      name: "UAE Chamber of Commerce",
      country: "UAE",
      type: "Chamber",
      status: "Active",
      recommendationScore: 92,
      grade: "A+",
      companiesExpected: 45000,
      lastUpdated: "2024-05-28",
      compliance: "Compliant",
      dataPoints: ["Company Name", "Trade Name", "Address", "Contact Details", "UIN", "Registration Date"],
      adipSource: true
    },
    {
      id: 2,
      name: "Saudi Ministry of Commerce",
      country: "Saudi Arabia",
      type: "Governmental",
      status: "Active",
      recommendationScore: 88,
      grade: "A",
      companiesExpected: 78000,
      lastUpdated: "2024-05-27",
      compliance: "Under Review",
      dataPoints: ["Company Name", "Address", "UIN", "Legal Form", "Activity Code"],
      adipSource: false
    },
    {
      id: 3,
      name: "Egyptian Stock Exchange",
      country: "Egypt",
      type: "Stock Exchange",
      status: "Active",
      recommendationScore: 85,
      grade: "A",
      companiesExpected: 1200,
      lastUpdated: "2024-05-29",
      compliance: "Compliant",
      dataPoints: ["Company Name", "Financials", "Shareholders", "Directors"],
      adipSource: true
    },
    {
      id: 4,
      name: "Jordan Companies Registry",
      country: "Jordan",
      type: "Governmental",
      status: "Under Maintenance",
      recommendationScore: 45,
      grade: "C",
      companiesExpected: 25000,
      lastUpdated: "2024-05-20",
      compliance: "Non-Compliant",
      dataPoints: ["Company Name", "UIN"],
      adipSource: false
    }
  ];

  const filteredSources = mockSources.filter(source => {
    const matchesSearch = source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         source.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === 'all' || source.country === selectedCountry;
    const matchesType = selectedType === 'all' || source.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || source.status === selectedStatus;
    
    return matchesSearch && matchesCountry && matchesType && matchesStatus;
  });

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
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    if (grade.startsWith('D')) return 'text-red-600';
    return 'text-gray-600';
  };

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
              <Button variant="outline" className="flex items-center space-x-2">
                <Bot className="h-4 w-4" />
                <span>AI Analysis</span>
              </Button>
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Source</span>
              </Button>
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
                  <p className="text-green-100 mt-1">{((dashboardStats.activeSources / dashboardStats.totalSources) * 100).toFixed(1)}% operational</p>
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
                  <div className="text-3xl font-bold">{dashboardStats.avgRecommendationScore}%</div>
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
                  <div className="text-3xl font-bold text-gray-900">{dashboardStats.complianceCoverage}%</div>
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

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <RefreshCw className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">UAE Chamber of Commerce updated</p>
                      <p className="text-sm text-gray-600">Recommendation score increased to 92%</p>
                    </div>
                    <span className="text-sm text-gray-500 ml-auto">2 hours ago</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="font-medium">Jordan Companies Registry maintenance</p>
                      <p className="text-sm text-gray-600">Source temporarily unavailable</p>
                    </div>
                    <span className="text-sm text-gray-500 ml-auto">5 hours ago</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Plus className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">New source discovered</p>
                      <p className="text-sm text-gray-600">Morocco Commercial Registry identified via AI</p>
                    </div>
                    <span className="text-sm text-gray-500 ml-auto">1 day ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                      <SelectItem value="UAE">UAE</SelectItem>
                      <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                      <SelectItem value="Egypt">Egypt</SelectItem>
                      <SelectItem value="Jordan">Jordan</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Source Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Governmental">Governmental</SelectItem>
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
              {filteredSources.map((source) => (
                <Card key={source.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <CardTitle className="text-xl">{source.name}</CardTitle>
                          {source.adipSource && (
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
                            <span>{source.type}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{source.companiesExpected.toLocaleString()} companies</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>Updated {source.lastUpdated}</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
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
                          <Badge className={getComplianceColor(source.compliance)}>
                            {source.compliance}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Grade</span>
                          <span className={`text-lg font-bold ${getGradeColor(source.grade)}`}>
                            {source.grade}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Recommendation Score</span>
                            <span className="text-sm font-bold">{source.recommendationScore}%</span>
                          </div>
                          <Progress value={source.recommendationScore} className="h-2" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Available Data Points</span>
                        <div className="flex flex-wrap gap-1">
                          {source.dataPoints.slice(0, 3).map((point, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {point}
                            </Badge>
                          ))}
                          {source.dataPoints.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{source.dataPoints.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                    <Input placeholder="Enter keywords, regions, or source types..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Country/Region</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="middle-east">Middle East</SelectItem>
                          <SelectItem value="africa">Africa</SelectItem>
                          <SelectItem value="global">Global</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Source Type</label>
                      <Select>
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
                  <Button className="w-full">
                    <Bot className="h-4 w-4 mr-2" />
                    Start AI Discovery
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
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Source URL</label>
                    <Input placeholder="https://example.com/business-registry" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Source Name</label>
                    <Input placeholder="Source display name" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Country</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="uae">UAE</SelectItem>
                          <SelectItem value="saudi">Saudi Arabia</SelectItem>
                          <SelectItem value="egypt">Egypt</SelectItem>
                          <SelectItem value="jordan">Jordan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Type</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="governmental">Governmental</SelectItem>
                          <SelectItem value="chamber">Chamber</SelectItem>
                          <SelectItem value="stock-exchange">Stock Exchange</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Analyze & Add Source
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
                  {[
                    { name: "Morocco Commercial Registry", url: "registre-commerce.ma", score: 78, status: "Pending" },
                    { name: "Tunisia Business Portal", url: "investintunisia.tn", score: 65, status: "Under Review" },
                    { name: "Kuwait Chamber of Commerce", url: "kcci.org.kw", score: 82, status: "Approved" }
                  ].map((source, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{source.name}</p>
                        <p className="text-sm text-gray-600">{source.url}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <p className="text-sm font-medium">{source.score}%</p>
                          <p className="text-xs text-gray-500">Confidence</p>
                        </div>
                        <Badge variant={source.status === 'Approved' ? 'default' : 'secondary'}>
                          {source.status}
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
                      <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                        <span className="text-sm">Company Information</span>
                        <Badge>50% Weight</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span className="text-sm">Company Identification</span>
                        <Badge variant="secondary">10% Weight</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                        <span className="text-sm">Business Classification</span>
                        <Badge variant="secondary">10% Weight</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                        <span className="text-sm">Shareholder Information</span>
                        <Badge variant="secondary">10% Weight</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-indigo-50 rounded">
                        <span className="text-sm">Director Information</span>
                        <Badge variant="secondary">10% Weight</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                        <span className="text-sm">Employment & Financials</span>
                        <Badge variant="secondary">10% Weight</Badge>
                      </div>
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
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">A+ Grade (90-100%)</span>
                        <span className="text-sm text-gray-600">234 sources</span>
                      </div>
                      <Progress value={18.8} className="h-2" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">A Grade (80-89%)</span>
                        <span className="text-sm text-gray-600">456 sources</span>
                      </div>
                      <Progress value={36.6} className="h-2" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">B Grade (70-79%)</span>
                        <span className="text-sm text-gray-600">378 sources</span>
                      </div>
                      <Progress value={30.3} className="h-2" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">C Grade (50-69%)</span>
                        <span className="text-sm text-gray-600">179 sources</span>
                      </div>
                      <Progress value={14.3} className="h-2" />
                    </div>
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
                    <div className="text-2xl font-bold text-blue-600">1,247</div>
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
                  <div className="text-3xl font-bold text-green-600">1,175</div>
                  <p className="text-sm text-gray-600 mt-1">Sources with clear T&C</p>
                  <Progress value={94.2} className="h-2 mt-3" />
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
                  <div className="text-3xl font-bold text-yellow-600">57</div>
                  <p className="text-sm text-gray-600 mt-1">Pending legal review</p>
                  <Progress value={4.6} className="h-2 mt-3" />
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
                  <div className="text-3xl font-bold text-red-600">15</div>
                  <p className="text-sm text-gray-600 mt-1">Restricted usage</p>
                  <Progress value={1.2} className="h-2 mt-3" />
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

            {/* Recent Compliance Updates */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Compliance Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="font-medium">UAE Data Protection Law Compliance</p>
                      <p className="text-sm text-gray-600">15 sources updated with new privacy requirements</p>
                    </div>
                    <span className="text-sm text-gray-500">Today</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <Clock className="h-5 w-5 text-yellow-600" />
                    <div className="flex-1">
                      <p className="font-medium">GDPR Article 6 Review</p>
                      <p className="text-sm text-gray-600">8 EU-based sources require legal basis documentation</p>
                    </div>
                    <span className="text-sm text-gray-500">2 days ago</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="font-medium">Terms & Conditions Update</p>
                      <p className="text-sm text-gray-600">Saudi sources updated with new usage restrictions</p>
                    </div>
                    <span className="text-sm text-gray-500">1 week ago</span>
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
