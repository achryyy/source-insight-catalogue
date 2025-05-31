
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Download, Plus, Play } from 'lucide-react';

interface Order {
  no: number;
  order: string;
  uid: string;
  client: string;
  subject: string;
  country: string;
  dateIn: string;
  clientDueDate: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Not Started';
  deepResearch: 'Not Started' | 'In Progress' | 'Completed';
}

const mockOrders: Order[] = [
  {
    no: 1,
    order: '1764742',
    uid: 'AEC245189927',
    client: 'CREDITSAFE UK',
    subject: '',
    country: 'United Arab Emirates (the)',
    dateIn: '30/05/2025 11:17 PM',
    clientDueDate: '30/05/2025',
    status: 'Pending',
    deepResearch: 'Not Started'
  },
  {
    no: 2,
    order: '1764741',
    uid: 'AEC1253221',
    client: 'CREDITSAFE UK',
    subject: 'THE FIRST GROUP PLC',
    country: 'United Arab Emirates (the)',
    dateIn: '30/05/2025 10:52 PM',
    clientDueDate: '30/05/2025',
    status: 'In Progress',
    deepResearch: 'In Progress'
  },
  {
    no: 3,
    order: '1764740',
    uid: 'EGC0004007',
    client: 'CREDITSAFE UK',
    subject: 'EGYPTAIR HOLDING COMPANY',
    country: 'Egypt',
    dateIn: '30/05/2025 10:48 PM',
    clientDueDate: '30/05/2025',
    status: 'Completed',
    deepResearch: 'Completed'
  },
  {
    no: 4,
    order: '1764739',
    uid: 'EGC222907599',
    client: 'CREDITSAFE UK',
    subject: 'EGYPT AIR',
    country: 'Egypt',
    dateIn: '30/05/2025 10:47 PM',
    clientDueDate: '30/05/2025',
    status: 'Completed',
    deepResearch: 'Completed'
  },
  {
    no: 5,
    order: '1764738',
    uid: 'AEC1297813',
    client: 'CREDITSAFE UK',
    subject: 'DELMAN SHIPPING L.L.C',
    country: 'United Arab Emirates (the)',
    dateIn: '30/05/2025 10:39 PM',
    clientDueDate: '30/05/2025',
    status: 'Completed',
    deepResearch: 'Completed'
  },
  {
    no: 6,
    order: '1764737',
    uid: 'LBC0065420',
    client: 'CREDITSAFE UK',
    subject: 'MOZART CHAHINE SARL',
    country: 'Lebanon',
    dateIn: '30/05/2025 08:31 PM',
    clientDueDate: '30/05/2025',
    status: 'Completed',
    deepResearch: 'Completed'
  },
  {
    no: 7,
    order: '1764736',
    uid: 'SAC48635484',
    client: 'CREDITSAFE UK',
    subject: 'AL MODON AL ARABIA COMPANY LIMITED',
    country: 'Saudi Arabia',
    dateIn: '30/05/2025 08:11 PM',
    clientDueDate: '30/05/2025',
    status: 'Completed',
    deepResearch: 'Completed'
  },
  {
    no: 8,
    order: '1764735',
    uid: 'UAE789123456',
    client: 'CREDITSAFE UK',
    subject: 'EMIRATES STEEL ARKAN',
    country: 'United Arab Emirates (the)',
    dateIn: '30/05/2025 07:45 PM',
    clientDueDate: '31/05/2025',
    status: 'Not Started',
    deepResearch: 'Not Started'
  },
  {
    no: 9,
    order: '1764734',
    uid: 'KSA456789123',
    client: 'CREDITSAFE UK',
    subject: 'SAUDI ARAMCO',
    country: 'Saudi Arabia',
    dateIn: '30/05/2025 07:30 PM',
    clientDueDate: '01/06/2025',
    status: 'Pending',
    deepResearch: 'Not Started'
  }
];

export const OrdersTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredOrders = mockOrders.filter(order =>
    order.order.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.uid.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge variant="default">Completed</Badge>;
      case 'In Progress':
        return <Badge variant="secondary">In Progress</Badge>;
      case 'Pending':
        return <Badge className="bg-orange-500">Pending</Badge>;
      case 'Not Started':
        return <Badge variant="outline">Not Started</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getDeepResearchBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-blue-500">Completed</Badge>;
      case 'In Progress':
        return <Badge className="bg-orange-500">In Progress</Badge>;
      case 'Not Started':
        return <Badge variant="outline">Not Started</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const totalOrders = mockOrders.length;
  const completedOrders = mockOrders.filter(o => o.status === 'Completed').length;
  const inProgressOrders = mockOrders.filter(o => o.status === 'In Progress').length;
  const pendingOrders = mockOrders.filter(o => o.status === 'Pending').length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Orders</h2>
          <p className="text-muted-foreground">
            Manage client orders and deep research requests
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export to Excel
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">Total: {totalOrders}</div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export to Excel
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedOrders}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{inProgressOrders}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingOrders}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>UID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Date In</TableHead>
                <TableHead>Client Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Deep Research</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.order}>
                  <TableCell>{order.no}</TableCell>
                  <TableCell className="font-medium">{order.order}</TableCell>
                  <TableCell className="text-blue-600 font-medium">{order.uid}</TableCell>
                  <TableCell>{order.client}</TableCell>
                  <TableCell>{order.subject || '-'}</TableCell>
                  <TableCell>{order.country}</TableCell>
                  <TableCell>{order.dateIn}</TableCell>
                  <TableCell>{order.clientDueDate}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{getDeepResearchBadge(order.deepResearch)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {order.status === 'Not Started' || order.deepResearch === 'Not Started' ? (
                        <Button variant="outline" size="sm">
                          <Play className="h-4 w-4" />
                          Start
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
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
