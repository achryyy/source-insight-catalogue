import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Download, RefreshCw, Database } from 'lucide-react';

interface AdipDataset {
  id: string;
  name: string;
  country: string;
  category: string;
  lastUpdated: string;
  lastCrawled: string;
  status: "Active" | "Inactive" | "Under Maintenance";
  format: string;
  size: string;
  url: string;
  records: number;
}

export const AdipDataSetTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCheckingUpdates, setIsCheckingUpdates] = useState(false);

  const generateMockData = (): AdipDataset[] => {
    const countries = ['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain', 'Oman', 'Egypt', 'Jordan'];
    const categories = ['Commercial Registry', 'Tax Authority', 'Chamber of Commerce', 'Stock Exchange', 'Ministry'];
    const formats = ['JSON', 'XML', 'CSV', 'API'];
    const statuses: ("Active" | "Inactive" | "Under Maintenance")[] = ['Active', 'Inactive', 'Under Maintenance'];
    
    return Array.from({ length: 15 }, (_, i) => {
      const lastCrawled = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
      const records = Math.floor(Math.random() * 50000) + 1000;
      
      return {
        id: `dataset-${i + 1}`,
        name: `${countries[Math.floor(Math.random() * countries.length)]} ${categories[Math.floor(Math.random() * categories.length)]}`,
        country: countries[Math.floor(Math.random() * countries.length)],
        category: categories[Math.floor(Math.random() * categories.length)],
        lastUpdated: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        lastCrawled: lastCrawled.toLocaleDateString(),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        format: formats[Math.floor(Math.random() * formats.length)],
        size: `${(Math.random() * 500 + 50).toFixed(1)} MB`,
        url: `https://api.example.com/dataset-${i + 1}`,
        records
      };
    });
  };

  const [datasets] = useState<AdipDataset[]>(generateMockData());

  const filteredDatasets = datasets.filter(dataset =>
    dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dataset.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dataset.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'Inactive':
        return 'secondary';
      case 'Under Maintenance':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const handleCheckUpdates = async () => {
    setIsCheckingUpdates(true);
    
    // Simulate checking for updates
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock some updates found
    const updatesFound = Math.floor(Math.random() * 5) + 1;
    console.log(`Found ${updatesFound} sources with updates`);
    
    setIsCheckingUpdates(false);
    alert(`Checked all sources. Found ${updatesFound} sources with new updates.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">ADIP Data Sets</h2>
          <p className="text-muted-foreground">
            Manage and monitor automated data integration pipelines
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleCheckUpdates}
            disabled={isCheckingUpdates}
            variant="outline"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isCheckingUpdates ? 'animate-spin' : ''}`} />
            {isCheckingUpdates ? 'Checking Updates...' : 'Check Source Updates'}
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Dataset
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New ADIP Dataset</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Dataset creation form would go here
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Datasets</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{datasets.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <RefreshCw className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {datasets.filter(d => d.status === 'Active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Maintenance</CardTitle>
            <RefreshCw className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {datasets.filter(d => d.status === 'Under Maintenance').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {datasets.reduce((sum, d) => sum + d.records, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Datasets</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search datasets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Records</TableHead>
                <TableHead>Last Crawled</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Size</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDatasets.map((dataset) => (
                <TableRow key={dataset.id}>
                  <TableCell className="font-medium">{dataset.name}</TableCell>
                  <TableCell>{dataset.country}</TableCell>
                  <TableCell>{dataset.category}</TableCell>
                  <TableCell>{dataset.records.toLocaleString()}</TableCell>
                  <TableCell>{dataset.lastCrawled}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(dataset.status)}>
                      {dataset.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{dataset.format}</TableCell>
                  <TableCell>{dataset.size}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
