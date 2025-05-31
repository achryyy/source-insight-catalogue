
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useDataSourcesWithPoints, useDeleteDataSource } from '@/hooks/useDataSources';
import { AdvancedFiltersComponent } from '@/components/AdvancedFilters';
import { EnhancedSourceForm } from '@/components/EnhancedSourceForm';
import { DataSource, AdvancedFilters } from '@/types/database';
import { Plus, Edit, Trash2, Search, CheckCircle, Clock, AlertCircle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export const DataCollectionTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState<DataSource | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSimpleAddOpen, setIsSimpleAddOpen] = useState(false);
  const [filters, setFilters] = useState<AdvancedFilters>({});

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
    if (filters.status?.length && !filters.status.includes(source.status)) return false;
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

  const getStatusIcon = (source: any) => {
    if (source.approved) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (source.needs_review) return <Clock className="h-4 w-4 text-yellow-600" />;
    return <AlertCircle className="h-4 w-4 text-red-600" />;
  };

  const getStatusBadge = (source: any) => {
    if (source.approved) return <Badge variant="default">Approved</Badge>;
    if (source.needs_review) return <Badge variant="secondary">Review</Badge>;
    return <Badge variant="destructive">Rejected</Badge>;
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
        <div className="flex gap-2">
          <Button onClick={() => setIsSimpleAddOpen(true)} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Quick Add
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Source
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sources.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {sources.filter((s: any) => s.approved).length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Needs Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {sources.filter((s: any) => s.needs_review).length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Crawled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {sources.filter((s: any) => s.crawled).length}
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
              className="pl-10"
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
      <Card>
        <CardHeader>
          <CardTitle>Sources ({filteredSources.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Source Name</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>ADIP</TableHead>
                <TableHead>Crawled</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSources.map((source: any) => (
                <TableRow key={source.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(source)}
                      {getStatusBadge(source)}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {source.source_name}
                    {source.auto_populated && (
                      <Badge variant="outline" className="ml-2 text-xs">AI</Badge>
                    )}
                  </TableCell>
                  <TableCell>{source.country}</TableCell>
                  <TableCell>{source.source_type}</TableCell>
                  <TableCell>
                    {source.source_grade ? (
                      <Badge variant="secondary">{source.source_grade}</Badge>
                    ) : '-'}
                  </TableCell>
                  <TableCell>
                    {source.adip_source ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : '-'}
                  </TableCell>
                  <TableCell>
                    {source.crawled ? (
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {source.last_crawled_date && (
                          <span className="text-xs text-muted-foreground">
                            {new Date(source.last_crawled_date).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    ) : (
                      <Clock className="h-4 w-4 text-gray-400" />
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(source)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(source.id)}
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
    </div>
  );
};
