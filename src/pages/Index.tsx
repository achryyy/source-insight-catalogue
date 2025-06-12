
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SourceAssessmentTab } from '@/components/SourceAssessmentTab';
import { LiveSourceCatalogueTab } from '@/components/LiveSourceCatalogueTab';
import { AdipDataSetTab } from '@/components/AdipDataSetTab';
import { OrdersTab } from '@/components/OrdersTab';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import { Header } from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const [activeTab, setActiveTab] = useState('source-assessment');
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogin = () => {
    // This shouldn't be called since we're in a protected route
    console.log('Login called from authenticated page');
  };

  const handleLogout = () => {
    logout();
  };

  const handleSettings = () => {
    console.log('Settings clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        isAuthenticated={isAuthenticated}
        user={user || undefined}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onSettings={handleSettings}
      />
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Data Sources Management Tool</h1>
          <p className="text-gray-600">Comprehensive source assessment and management platform</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm border">
            <TabsTrigger value="source-assessment" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              Source Assessment
            </TabsTrigger>
            <TabsTrigger value="live-catalogue" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              Live Source Catalogue
            </TabsTrigger>
            <TabsTrigger value="adip-datasets" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              ADIP Datasets
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              Orders
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="source-assessment">
            <SourceAssessmentTab />
          </TabsContent>

          <TabsContent value="live-catalogue">
            <LiveSourceCatalogueTab />
          </TabsContent>

          <TabsContent value="adip-datasets">
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
    </div>
  );
};

export default Index;
