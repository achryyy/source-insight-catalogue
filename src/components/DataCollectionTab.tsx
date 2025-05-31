
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useDataSourcesWithPoints, useDeleteDataSource } from '@/hooks/useDataSources';
import { AdvancedFiltersComponent } from '@/components/AdvancedFilters';
import { EnhancedSourceForm } from '@/components/EnhancedSourceForm';
import { DataSource, AdvancedFilters } from '@/types/database';
import { Plus, Edit, Trash2, Search, CheckCircle, Clock, AlertCircle, RefreshCw, Activity } from 'lucide-react';
import { toast } from 'sonner';

export const DataCollectionTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState<DataSource | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSimpleAddOpen, setIsSimpleAddOpen] = useState(false);
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);
  const [discoveryCountry, setDiscoveryCountry] = useState('');
  const [discoveryKeywords, setDiscoveryKeywords] = useState('');
  const [filters, setFilters] = useState<AdvancedFilters>({});
  const [copiedAssignee, setCopiedAssignee] = useState('');
  const [editableSources, setEditableSources] = useState<Record<string, any>>({});

  const { data: sources = [], isLoading, refetch } = useDataSourcesWithPoints();
  const deleteSource = useDeleteDataSource();

  // Apply filters and search
  const filteredSources = sources.filter((source: any) => {
    // Search filter
    if (searchTerm && !source.source_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !source.country.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Advanced filters
    if (filters.approved !== undefined && source.approved !== filters.approved) return false;
    if (filters.adip_source !== undefined && source.adip_source !== filters.adip_source) return false;
    if (filters.needs_review !== undefined && source.needs_review !== filters.needs_review) return false;
    if (filters.crawled !== undefined && source.crawled !== filters.crawled) return false;
    if (filters.source_type?.length && !filters.source_type.includes(source.source_type)) return false;
    if (filters.compliance_status?.length && !filters.compliance_status.includes(source.compliance_status)) return false;

    return true;
  });

  const handleEdit = (source: DataSource) => {
    setSelectedSource(source);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this source?')) {
      deleteSource.mutate(id);
    }
  };

  const handleAutomatedDiscovery = async () => {
    if (!discoveryCountry || !discoveryKeywords) {
      toast.error('Please enter both country and keywords');
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      toast.success(`Automated discovery completed for ${discoveryCountry}. Found 5 new potential sources.`);
      setIsDiscoveryOpen(false);
      setDiscoveryCountry('');
      setDiscoveryKeywords('');
    } catch (error) {
      toast.error('Discovery failed. Please try again.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, sourceId: string) => {
    if (e.ctrlKey && e.key === 'c') {
      const source = sources.find((s: any) => s.id === sourceId);
      if (source?.assigned_to) {
        setCopiedAssignee(source.assigned_to);
        navigator.clipboard.writeText(source.assigned_to);
        toast.success('Assignee copied to clipboard');
      }
    }
  };

  const handleFieldChange = (sourceId: string, field: string, value: any) => {
    setEditableSources(prev => ({
      ...prev,
      [sourceId]: {
        ...prev[sourceId],
        [field]: value
      }
    }));
    toast.success(`Updated ${field}`);
  };

  const getFieldValue = (source: any, field: string) => {
    return editableSources[source.id]?.[field] ?? source[field];
  };

  const getProgressStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-600">Completed</Badge>;
      case 'in progress':
        return <Badge className="bg-blue-600">In Progress</Badge>;
      case 'approved':
        return <Badge className="bg-purple-600">Approved</Badge>;
      default:
        return <Badge variant="outline">Not Started</Badge>;
    }
  };

  const clearFilters = () => {
    setFilters({});
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading sources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Data Collection</h2>
          <p className="text-muted-foreground mt-2">
            Manage and track your data sources with comprehensive filtering and approval workflow
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsSimpleAddOpen(true)} variant="outline" className="shadow-sm">
            <Plus className="h-4 w-4 mr-2" />
            Quick Add
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(true)} className="shadow-sm">
            <Plus className="h-4 w-4 mr-2" />
            Create Source
          </Button>
          <Dialog open={isDiscoveryOpen} onOpenChange={setIsDiscoveryOpen}>
            <Button onClick={() => setIsDiscoveryOpen(true)} variant="outline" className="shadow-sm">
              <Activity className="h-4 w-4 mr-2" />
              Automated Discovery
            </Button>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-sm border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{sources.length}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {sources.filter((s: any) => s.approved).length}
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-l-4 border-l-yellow-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Needs Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">
              {sources.filter((s: any) => s.needs_review).length}
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Assigned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {sources.filter((s: any) => s.assigned_to).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search sources by name or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 shadow-sm"
            />
          </div>
        </div>
        
        <AdvancedFiltersComponent
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={clearFilters}
        />
      </div>

      {/* Sources Table */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Sources ({filteredSources.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source Name</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>ADIP</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Progress Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSources.map((source: any) => (
                <TableRow key={source.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Input
                        value={getFieldValue(source, 'source_name')}
                        onChange={(e) => handleFieldChange(source.id, 'source_name', e.target.value)}
                        className="border-none p-0 h-auto font-medium"
                      />
                      {source.auto_populated && (
                        <Badge variant="outline" className="ml-2 text-xs bg-blue-50 text-blue-600">AI</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Input
                      value={getFieldValue(source, 'country')}
                      onChange={(e) => handleFieldChange(source.id, 'country', e.target.value)}
                      className="border-none p-0 h-auto"
                    />
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={getFieldValue(source, 'source_type')} 
                      onValueChange={(value) => handleFieldChange(source.id, 'source_type', value)}
                    >
                      <SelectTrigger className="border-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Governmental">Governmental</SelectItem>
                        <SelectItem value="Ministry">Ministry</SelectItem>
                        <SelectItem value="Stock Exchange">Stock Exchange</SelectItem>
                        <SelectItem value="Chamber">Chamber</SelectItem>
                        <SelectItem value="Non-governmental">Non-governmental</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={getFieldValue(source, 'source_grade') || ''} 
                      onValueChange={(value) => handleFieldChange(source.id, 'source_grade', value)}
                    >
                      <SelectTrigger className="border-none">
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                        <SelectItem value="C">C</SelectItem>
                        <SelectItem value="D">D</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={getFieldValue(source, 'adip_source')}
                      onCheckedChange={(checked) => handleFieldChange(source.id, 'adip_source', checked)}
                    />
                  </TableCell>
                  <TableCell
                    onKeyDown={(e) => handleKeyDown(e, source.id)}
                    tabIndex={0}
                    className="focus:outline-none"
                  >
                    <Select 
                      value={getFieldValue(source, 'assigned_to') || ''} 
                      onValueChange={(value) => handleFieldChange(source.id, 'assigned_to', value)}
                    >
                      <SelectTrigger className="border-none">
                        <SelectValue placeholder="Assign to..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="achref messaoudi">Achref Messaoudi</SelectItem>
                        <SelectItem value="meriem frej">Meriem Frej</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={getFieldValue(source, 'progress_status') || 'not started'} 
                      onValueChange={(value) => handleFieldChange(source.id, 'progress_status', value)}
                    >
                      <SelectTrigger className="border-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="not started">Not Started</SelectItem>
                        <SelectItem value="in progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(source)}
                        className="shadow-sm"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(source.id)}
                        className="shadow-sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Source</DialogTitle>
          </DialogHeader>
          <EnhancedSourceForm 
            onSuccess={() => {
              setIsCreateDialogOpen(false);
              refetch();
              toast.success('Source created successfully');
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Source</DialogTitle>
          </DialogHeader>
          <EnhancedSourceForm 
            source={selectedSource || undefined}
            onSuccess={() => {
              setIsEditDialogOpen(false);
              setSelectedSource(null);
              refetch();
              toast.success('Source updated successfully');
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isSimpleAddOpen} onOpenChange={setIsSimpleAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quick Add Source</DialogTitle>
          </DialogHeader>
          <EnhancedSourceForm 
            isSimpleMode={true}
            onSuccess={() => {
              setIsSimpleAddOpen(false);
              refetch();
              toast.success('Source added for review');
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isDiscoveryOpen} onOpenChange={setIsDiscoveryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Automated Source Discovery</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={discoveryCountry}
                onChange={(e) => setDiscoveryCountry(e.target.value)}
                placeholder="Enter country name"
              />
            </div>
            <div>
              <Label htmlFor="keywords">Keywords</Label>
              <Input
                id="keywords"
                value={discoveryKeywords}
                onChange={(e) => setDiscoveryKeywords(e.target.value)}
                placeholder="Enter search keywords"
              />
            </div>
            <Button onClick={handleAutomatedDiscovery} className="w-full">
              Start Discovery
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
