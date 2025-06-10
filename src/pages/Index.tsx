
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataCollectionTab } from '@/components/DataCollectionTab';
import { AdipDataSetTab } from '@/components/AdipDataSetTab';
import { OrdersTab } from '@/components/OrdersTab';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import { Header } from '@/components/Header';

const Index = () => {
  const [activeTab, setActiveTab] = useState('data-collection');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Data Sources Management Tool</h1>
          <p className="text-gray-600">Comprehensive data collection and management platform</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm border">
            <TabsTrigger value="data-collection" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              Data Collection
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

          <TabsContent value="data-collection">
            <DataCollectionTab />
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
