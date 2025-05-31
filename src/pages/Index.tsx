
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDataSourcesWithPoints, useDeleteDataSource } from '@/hooks/useDataSources';
import { AdvancedFiltersComponent } from '@/components/AdvancedFilters';
import { EnhancedSourceForm } from '@/components/EnhancedSourceForm';
import { DataSource, AdvancedFilters } from '@/types/database';
import { Plus, Edit, Trash2, Search, CheckCircle, Clock, AlertCircle, RefreshCw, Database, Package, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';
import { DataCollectionTab } from '@/components/DataCollectionTab';
import { AdipDataSetTab } from '@/components/AdipDataSetTab';
import { OrdersTab } from '@/components/OrdersTab';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';

const Index = () => {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Data Sources Repository</h1>
          <p className="text-muted-foreground">
            Manage and track your data sources with comprehensive filtering and approval workflow
          </p>
        </div>
      </div>

      <Tabs defaultValue="data-collection" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="data-collection" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Data Collection
          </TabsTrigger>
          <TabsTrigger value="adip-dataset" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            ADIP Data Set
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="data-collection">
          <DataCollectionTab />
        </TabsContent>

        <TabsContent value="adip-dataset">
          <AdipDataSetTab />
        </TabsContent>

        <TabsContent value="orders">
          <OrdersTab />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
