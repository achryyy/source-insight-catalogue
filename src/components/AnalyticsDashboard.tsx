
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Users, Database, FileText, Clock } from 'lucide-react';

const sourceTypeDistribution = [
  { name: 'Governmental', value: 45, color: '#0088FE' },
  { name: 'Stock Exchange', value: 28, color: '#00C49F' },
  { name: 'Chamber', value: 32, color: '#FFBB28' },
  { name: 'Ministry', value: 25, color: '#FF8042' },
  { name: 'Non-governmental', value: 18, color: '#8884D8' },
  { name: 'Tax Authority', value: 22, color: '#82CA9D' }
];

const monthlyProgress = [
  { month: 'Jan', sources: 65, orders: 23, approved: 45 },
  { month: 'Feb', sources: 78, orders: 34, approved: 56 },
  { month: 'Mar', sources: 92, orders: 45, approved: 71 },
  { month: 'Apr', sources: 115, orders: 67, approved: 89 },
  { month: 'May', sources: 180, orders: 89, approved: 134 }
];

const orderStatusData = [
  { name: 'Completed', value: 156, color: '#10B981' },
  { name: 'In Progress', value: 45, color: '#3B82F6' },
  { name: 'Pending', value: 23, color: '#F59E0B' },
  { name: 'Not Started', value: 12, color: '#6B7280' }
];

const countryPerformanceData = [
  { country: 'UAE', totalSources: 45, activeSources: 38 },
  { country: 'Saudi Arabia', totalSources: 32, activeSources: 28 },
  { country: 'Qatar', totalSources: 28, activeSources: 24 },
  { country: 'Kuwait', totalSources: 22, activeSources: 19 },
  { country: 'Bahrain', totalSources: 18, activeSources: 15 },
  { country: 'Oman', totalSources: 15, activeSources: 12 },
  { country: 'Egypt', totalSources: 25, activeSources: 20 },
  { country: 'Jordan', totalSources: 12, activeSources: 10 }
];

const statusTrendData = [
  { month: 'Jan', active: 120, inactive: 15, maintenance: 8 },
  { month: 'Feb', active: 135, inactive: 18, maintenance: 12 },
  { month: 'Mar', active: 158, inactive: 22, maintenance: 15 },
  { month: 'Apr', active: 175, inactive: 25, maintenance: 18 },
  { month: 'May', active: 197, inactive: 28, maintenance: 22 }
];

const aiUsageData = [
  { source: 'AL Madina', usageCount: 156 },
  { source: 'GCC News', usageCount: 134 },
  { source: 'KSA News', usageCount: 89 },
  { source: 'Oman Chamber of Commerce', usageCount: 67 },
  { source: 'Bahrain Ministry', usageCount: 45 },
  { source: 'UAE Commercial Registry', usageCount: 34 }
];

export const AnalyticsDashboard = () => {
  const [showSources, setShowSources] = useState(true);
  const [showOrders, setShowOrders] = useState(true);
  const [showApproved, setShowApproved] = useState(true);

  const getFilteredProgressData = () => {
    return monthlyProgress.map(month => {
      const filtered: any = { month: month.month };
      if (showSources) filtered.sources = month.sources;
      if (showOrders) filtered.orders = month.orders;
      if (showApproved) filtered.approved = month.approved;
      return filtered;
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Monitor performance and track key metrics across all operations
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sources</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">180</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              +8% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">74%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              -2% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Points</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4M</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              +15% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Progress</CardTitle>
            <div className="flex gap-4 mt-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sources"
                  checked={showSources}
                  onCheckedChange={(checked) => setShowSources(checked as boolean)}
                />
                <Label htmlFor="sources">Sources</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="orders"
                  checked={showOrders}
                  onCheckedChange={(checked) => setShowOrders(checked as boolean)}
                />
                <Label htmlFor="orders">Orders</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="approved"
                  checked={showApproved}
                  onCheckedChange={(checked) => setShowApproved(checked as boolean)}
                />
                <Label htmlFor="approved">Approved</Label>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getFilteredProgressData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                {showSources && <Line type="monotone" dataKey="sources" stroke="#3B82F6" strokeWidth={2} />}
                {showOrders && <Line type="monotone" dataKey="orders" stroke="#10B981" strokeWidth={2} />}
                {showApproved && <Line type="monotone" dataKey="approved" stroke="#F59E0B" strokeWidth={2} />}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Source Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sourceTypeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sourceTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Country Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={countryPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="country" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalSources" fill="#3B82F6" name="Total Sources" />
                <Bar dataKey="activeSources" fill="#10B981" name="Active Sources" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={statusTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="active" stroke="#10B981" strokeWidth={2} name="Active" />
                <Line type="monotone" dataKey="inactive" stroke="#EF4444" strokeWidth={2} name="Inactive" />
                <Line type="monotone" dataKey="maintenance" stroke="#F59E0B" strokeWidth={2} name="Under Maintenance" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Most Used Sources in Deep Research</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={aiUsageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="usageCount" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">UAE Commercial Registry updated</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New order from CREDITSAFE UK</p>
                <p className="text-xs text-muted-foreground">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Saudi Arabia dataset processing</p>
                <p className="text-xs text-muted-foreground">6 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Deep research completed for Egypt Air</p>
                <p className="text-xs text-muted-foreground">8 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Source approval pending review</p>
                <p className="text-xs text-muted-foreground">12 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
