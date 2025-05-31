import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, Download, FileText, Globe, CheckCircle, ExternalLink, RefreshCw, Activity } from 'lucide-react';
import { toast } from 'sonner';

interface AdipDataset {
  id: string;
  name: string;
  country: string;
  category: string;
  records: number;
  lastUpdated: string;
  status: 'Active' | 'Inactive' | 'Under Maintenance';
  format: string;
  size: string;
  url: string;
  updated?: boolean;
}

const mockAdipData: AdipDataset[] = [
  {
    id: '1',
    name: 'UAE Commercial Registry',
    country: 'United Arab Emirates',
    category: 'Business Registration',
    records: 125430,
    lastUpdated: '2025-05-30',
    status: 'Active',
    format: 'JSON',
    size: '2.3 GB',
    url: 'https://uae-commercial-registry.gov.ae'
  },
  {
    id: '2',
    name: 'Saudi Arabia Corporate Database',
    country: 'Saudi Arabia',
    category: 'Corporate Information',
    records: 89765,
    lastUpdated: '2025-05-29',
    status: 'Active',
    format: 'XML',
    size: '1.8 GB',
    url: 'https://saudi-corporate-db.gov.sa'
  },
  {
    id: '3',
    name: 'Egypt Business Directory',
    country: 'Egypt',
    category: 'Business Registration',
    records: 67234,
    lastUpdated: '2025-05-28',
    status: 'Under Maintenance',
    format: 'CSV',
    size: '945 MB',
    url: 'https://egypt-business-dir.gov.eg'
  },
  {
    id: '4',
    name: 'Qatar Commercial Registry',
    country: 'Qatar',
    category: 'Business Registration',
    records: 34567,
    lastUpdated: '2025-05-27',
    status: 'Active',
    format: 'JSON',
    size: '567 MB',
    url: 'https://qatar-commercial.gov.qa'
  },
  {
    id: '5',
    name: 'Kuwait Corporate Database',
    country: 'Kuwait',
    category: 'Corporate Information',
    records: 45123,
    lastUpdated: '2025-05-26',
    status: 'Inactive',
    format: 'XML',
    size: '678 MB',
    url: 'https://kuwait-corporate.gov.kw'
  },
  {
    id: '6',
    name: 'Bahrain Business Registry',
    country: 'Bahrain',
    category: 'Business Registration',
    records: 23456,
    lastUpdated: '2025-05-25',
    status: 'Active',
    format: 'JSON',
    size: '345 MB',
    url: 'https://bahrain-business.gov.bh'
  },
  {
    id: '7',
    name: 'Oman Trade Registry',
    country: 'Oman',
    category: 'Trade Information',
    records: 56789,
    lastUpdated: '2025-05-24',
    status: 'Active',
    format: 'XML',
    size: '890 MB',
    url: 'https://oman-trade.gov.om'
  },
  {
    id: '8',
    name: 'Jordan Business Registry',
    country: 'Jordan',
    category: 'Business Registration',
    records: 34521,
    lastUpdated: '2025-05-23',
    status: 'Under Maintenance',
    format: 'JSON',
    size: '456 MB',
    url: 'https://jordan-business.gov.jo'
  },
  {
    id: '9',
    name: 'Morocco Commercial Database',
    country: 'Morocco',
    category: 'Commercial Information',
    records: 78912,
    lastUpdated: '2025-05-22',
    status: 'Active',
    format: 'CSV',
    size: '1.2 GB',
    url: 'https://morocco-commercial.gov.ma'
  },
  {
    id: '10',
    name: 'Tunisia Business Directory',
    country: 'Tunisia',
    category: 'Business Registration',
    records: 43567,
    lastUpdated: '2025-05-21',
    status: 'Inactive',
    format: 'XML',
    size: '654 MB',
    url: 'https://tunisia-business.gov.tn'
  }
];

export const AdipDataSetTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCheckingUpdates, setIsCheckingUpdates] = useState(false);
  const [crawlingProgress, setCrawlingProgress] = useState<Record<string, number>>({});
  const [datasets, setDatasets] = useState(mockAdipData);
  
  const filteredData = datasets.filter(dataset =>
    dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dataset.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dataset.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge variant="default">Active</Badge>;
      case 'Under Maintenance':
        return <Badge variant="secondary">Under Maintenance</Badge>;
      case 'Inactive':
        return <Badge variant="outline">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleCrawl = async (dataset: AdipDataset) => {
    setCrawlingProgress(prev => ({ ...prev, [dataset.id]: 0 }));
    
    // Simulate progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setCrawlingProgress(prev => ({ ...prev, [dataset.id]: i }));
    }
    
    setCrawlingProgress(prev => {
      const { [dataset.id]: _, ...rest } = prev;
      return rest;
    });
    
    toast.success(`Crawling completed for ${dataset.name}`);
  };

  const handleDownload = (dataset: AdipDataset) => {
    toast.success(`Downloading ${dataset.name}`);
  };

  const handleCheckUpdates = async () => {
    setIsCheckingUpdates(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Randomly assign updated status to datasets
      const updatedDatasets = datasets.map(dataset => ({
        ...dataset,
        updated: Math.random() > 0.5
      }));
      
      setDatasets(updatedDatasets);
      toast.success('Update check completed for all datasets');
    } finally {
      setIsCheckingUpdates(false);
    }
  };

  const totalRecords = datasets.reduce((sum, dataset) => sum + dataset.records, 0);
  const activeDatasets = datasets.filter(d => d.status === 'Active').length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">ADIP Data Set</h2>
          <p className="text-muted-foreground">
            Access and manage standardized business data from ADIP sources
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleCheckUpdates} disabled={isCheckingUpdates} variant="outline">
            {isCheckingUpdates ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Check Updates
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Datasets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{datasets.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Datasets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeDatasets}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRecords.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Countries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search datasets by name, country, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Datasets Table */}
      <Card>
        <CardHeader>
          <CardTitle>ADIP Datasets ({filteredData.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dataset Name</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Records</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((dataset) => (
                <TableRow key={dataset.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      {dataset.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      {dataset.country}
                    </div>
                  </TableCell>
                  <TableCell>{dataset.category}</TableCell>
                  <TableCell>{dataset.records.toLocaleString()}</TableCell>
                  <TableCell>{new Date(dataset.lastUpdated).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {dataset.updated !== undefined ? (
                      dataset.updated ? (
                        <Badge variant="default" className="bg-green-600">Yes</Badge>
                      ) : (
                        <Badge variant="destructive">No</Badge>
                      )
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(dataset.status)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{dataset.format}</Badge>
                  </TableCell>
                  <TableCell>{dataset.size}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {crawlingProgress[dataset.id] !== undefined ? (
                        <div className="w-20">
                          <Progress value={crawlingProgress[dataset.id]} className="h-8" />
                        </div>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCrawl(dataset)}
                        >
                          <Activity className="h-4 w-4" />
                          Crawl
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownload(dataset)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(dataset.url, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
