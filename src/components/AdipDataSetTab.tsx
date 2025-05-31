
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Download, FileText, Globe, CheckCircle } from 'lucide-react';

interface AdipDataset {
  id: string;
  name: string;
  country: string;
  category: string;
  records: number;
  lastUpdated: string;
  status: 'Active' | 'Processing' | 'Pending';
  format: string;
  size: string;
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
    size: '2.3 GB'
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
    size: '1.8 GB'
  },
  {
    id: '3',
    name: 'Egypt Business Directory',
    country: 'Egypt',
    category: 'Business Registration',
    records: 67234,
    lastUpdated: '2025-05-28',
    status: 'Processing',
    format: 'CSV',
    size: '945 MB'
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
    size: '567 MB'
  },
  {
    id: '5',
    name: 'Kuwait Corporate Database',
    country: 'Kuwait',
    category: 'Corporate Information',
    records: 45123,
    lastUpdated: '2025-05-26',
    status: 'Pending',
    format: 'XML',
    size: '678 MB'
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
    size: '345 MB'
  }
];

export const AdipDataSetTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredData = mockAdipData.filter(dataset =>
    dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dataset.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dataset.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge variant="default">Active</Badge>;
      case 'Processing':
        return <Badge variant="secondary">Processing</Badge>;
      case 'Pending':
        return <Badge variant="outline">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const totalRecords = mockAdipData.reduce((sum, dataset) => sum + dataset.records, 0);
  const activeDatasets = mockAdipData.filter(d => d.status === 'Active').length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">ADIP Data Set</h2>
          <p className="text-muted-foreground">
            Access and manage standardized business data from ADIP sources
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export All
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Datasets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAdipData.length}</div>
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
            <div className="text-2xl font-bold">6</div>
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
                  <TableCell>{getStatusBadge(dataset.status)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{dataset.format}</Badge>
                  </TableCell>
                  <TableCell>{dataset.size}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        View
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
