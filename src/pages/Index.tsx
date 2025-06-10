
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, FileText, BarChart3, Settings } from 'lucide-react';

import { DataCollectionTab } from '@/components/DataCollectionTab';
import { AdipDataSetTab } from '@/components/AdipDataSetTab';
import { OrdersTab } from '@/components/OrdersTab';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import { Header } from '@/components/Header';
import { SettingsModal } from '@/components/SettingsModal';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user, logout } = useAuth();
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const handleSettings = () => {
    setShowSettingsModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        isAuthenticated={true}
        user={user || undefined}
        onLogin={() => {}}
        onLogout={handleLogout}
        onSettings={handleSettings}
      />

      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">ADIP Data Platform</h1>
          <p className="text-gray-600">
            Comprehensive data management and analytics platform for enterprise operations
          </p>
        </div>

        <Tabs defaultValue="data-collection" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="data-collection" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Data Collection
            </TabsTrigger>
            <TabsTrigger value="dataset" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              ADIP Dataset
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="data-collection">
            <Card>
              <CardHeader>
                <CardTitle>Data Source Management</CardTitle>
                <CardDescription>
                  Configure and manage your data sources for automated collection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataCollectionTab />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dataset">
            <Card>
              <CardHeader>
                <CardTitle>ADIP Dataset Overview</CardTitle>
                <CardDescription>
                  View and manage your collected datasets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdipDataSetTab />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>
                  Track and manage data processing orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <OrdersTab />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>

        <SettingsModal
          isOpen={showSettingsModal}
          onClose={() => setShowSettingsModal(false)}
        />
      </div>
    </div>
  );
};

export default Index;
