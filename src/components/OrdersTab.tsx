import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, Plus, Bot, FileText, Filter, ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

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
  assignedTo?: string;
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
    assignedTo: 'Achref Messaoudi'
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
    assignedTo: 'Meriem Frej'
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
    assignedTo: 'Achref Messaoudi'
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
    assignedTo: 'Meriem Frej'
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
    assignedTo: 'Achref Messaoudi'
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
    assignedTo: 'Meriem Frej'
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
    assignedTo: 'Achref Messaoudi'
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
    status: 'Not Started'
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
    status: 'Pending'
  }
];

export const OrdersTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [deepResearchProgress, setDeepResearchProgress] = useState<Record<string, number>>({});
  const [orders, setOrders] = useState(mockOrders);
  const [editableOrders, setEditableOrders] = useState<Record<string, any>>({});
  const [newOrder, setNewOrder] = useState({
    client: '',
    subject: '',
    country: '',
    dueDate: '',
    notes: ''
  });

  // Filter states
  const [filters, setFilters] = useState({
    assignedTo: '',
    status: '',
    country: '',
    order: '',
    uid: '',
    client: ''
  });

  // Sort states
  const [dateSortField, setDateSortField] = useState<'dateIn' | 'clientDueDate' | null>(null);
  const [dateSortDirection, setDateSortDirection] = useState<'asc' | 'desc'>('asc');

  // Apply filters and sorting
  const filteredAndSortedOrders = orders
    .filter(order => {
      // Search filter
      if (searchTerm && 
          !order.order.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !order.uid.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !order.client.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !order.subject.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !order.country.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Column filters
      if (filters.assignedTo && (!order.assignedTo || !order.assignedTo.toLowerCase().includes(filters.assignedTo.toLowerCase()))) return false;
      if (filters.status && order.status !== filters.status) return false;
      if (filters.country && !order.country.toLowerCase().includes(filters.country.toLowerCase())) return false;
      if (filters.order && !order.order.toLowerCase().includes(filters.order.toLowerCase())) return false;
      if (filters.uid && !order.uid.toLowerCase().includes(filters.uid.toLowerCase())) return false;
      if (filters.client && !order.client.toLowerCase().includes(filters.client.toLowerCase())) return false;

      return true;
    })
    .sort((a, b) => {
      if (dateSortField) {
        const dateA = new Date(a[dateSortField]);
        const dateB = new Date(b[dateSortField]);
        
        if (dateSortDirection === 'asc') {
          return dateA.getTime() - dateB.getTime();
        } else {
          return dateB.getTime() - dateA.getTime();
        }
      }
      return 0;
    });

  const handleDateSort = (field: 'dateIn' | 'clientDueDate') => {
    if (dateSortField === field) {
      setDateSortDirection(dateSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setDateSortField(field);
      setDateSortDirection('asc');
    }
  };

  const clearFilters = () => {
    setFilters({
      assignedTo: '',
      status: '',
      country: '',
      order: '',
      uid: '',
      client: ''
    });
    setDateSortField(null);
    setDateSortDirection('asc');
  };

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

  const handleFieldChange = (orderId: string, field: string, value: any) => {
    setEditableOrders(prev => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [field]: value
      }
    }));
    
    // Update the orders array as well
    setOrders(prev => prev.map(order => 
      order.order === orderId 
        ? { ...order, [field]: value }
        : order
    ));
    
    toast.success(`Updated ${field}`);
  };

  const getFieldValue = (order: Order, field: string) => {
    return editableOrders[order.order]?.[field] ?? (order as any)[field];
  };

  const handleStartDeepResearch = async (order: Order) => {
    // Update status to in progress
    handleFieldChange(order.order, 'status', 'In Progress');
    
    setDeepResearchProgress(prev => ({ ...prev, [order.order]: 0 }));
    
    // Simulate progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setDeepResearchProgress(prev => ({ ...prev, [order.order]: i }));
    }
    
    // Complete the research
    setDeepResearchProgress(prev => {
      const { [order.order]: _, ...rest } = prev;
      return rest;
    });
    
    handleFieldChange(order.order, 'status', 'Completed');
    toast.success(`Deep research completed for order ${order.order}`);
  };

  const handleDownloadOrder = (order: Order) => {
    toast.success(`Downloading order ${order.order} report`);
  };

  const handleExportExcel = () => {
    toast.success('Exporting orders to Excel...');
  };

  const handleCreateOrder = () => {
    if (!newOrder.client || !newOrder.country) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('New order created successfully');
    setIsNewOrderOpen(false);
    setNewOrder({
      client: '',
      subject: '',
      country: '',
      dueDate: '',
      notes: ''
    });
  };

  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === 'Completed').length;
  const inProgressOrders = orders.filter(o => o.status === 'In Progress').length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Orders</h2>
          <p className="text-muted-foreground mt-2">
            Manage client orders and deep research requests
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportExcel} className="shadow-sm">
            <Download className="h-4 w-4 mr-2" />
            Export to Excel
          </Button>
          <Dialog open={isNewOrderOpen} onOpenChange={setIsNewOrderOpen}>
            <DialogTrigger asChild>
              <Button className="shadow-sm">
                <Plus className="h-4 w-4 mr-2" />
                New Order
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Order</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="client">Client *</Label>
                  <Input
                    id="client"
                    value={newOrder.client}
                    onChange={(e) => setNewOrder(prev => ({ ...prev, client: e.target.value }))}
                    placeholder="Enter client name"
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={newOrder.subject}
                    onChange={(e) => setNewOrder(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Enter subject/company name"
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    value={newOrder.country}
                    onChange={(e) => setNewOrder(prev => ({ ...prev, country: e.target.value }))}
                    placeholder="Enter country"
                  />
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newOrder.dueDate}
                    onChange={(e) => setNewOrder(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newOrder.notes}
                    onChange={(e) => setNewOrder(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Additional notes..."
                  />
                </div>
                <Button onClick={handleCreateOrder} className="w-full">
                  Create Order
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-sm border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{totalOrders}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{completedOrders}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-l-4 border-l-blue-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">{inProgressOrders}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-l-4 border-l-orange-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{pendingOrders}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-blue-600" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div>
              <Label>Order</Label>
              <Input
                placeholder="Filter by order..."
                value={filters.order}
                onChange={(e) => setFilters(prev => ({ ...prev, order: e.target.value }))}
              />
            </div>
            <div>
              <Label>UID</Label>
              <Input
                placeholder="Filter by UID..."
                value={filters.uid}
                onChange={(e) => setFilters(prev => ({ ...prev, uid: e.target.value }))}
              />
            </div>
            <div>
              <Label>Client</Label>
              <Input
                placeholder="Filter by client..."
                value={filters.client}
                onChange={(e) => setFilters(prev => ({ ...prev, client: e.target.value }))}
              />
            </div>
            <div>
              <Label>Country</Label>
              <Input
                placeholder="Filter by country..."
                value={filters.country}
                onChange={(e) => setFilters(prev => ({ ...prev, country: e.target.value }))}
              />
            </div>
            <div>
              <Label>Assigned To</Label>
              <Select value={filters.assignedTo} onValueChange={(value) => setFilters(prev => ({ ...prev, assignedTo: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by assignee..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem value="achref messaoudi">Achref Messaoudi</SelectItem>
                  <SelectItem value="meriem frej">Meriem Frej</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button onClick={clearFilters} variant="outline" size="sm">
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 shadow-sm"
        />
      </div>

      {/* Orders Table */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Orders ({filteredAndSortedOrders.length})
          </CardTitle>
        </CardHeader>
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
                <TableHead 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleDateSort('dateIn')}
                >
                  <div className="flex items-center gap-1">
                    Date In
                    {dateSortField === 'dateIn' && (
                      dateSortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                    )}
                    {dateSortField !== 'dateIn' && <ArrowUpDown className="h-4 w-4 opacity-50" />}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleDateSort('clientDueDate')}
                >
                  <div className="flex items-center gap-1">
                    Client Due Date
                    {dateSortField === 'clientDueDate' && (
                      dateSortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                    )}
                    {dateSortField !== 'clientDueDate' && <ArrowUpDown className="h-4 w-4 opacity-50" />}
                  </div>
                </TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Deep Research</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedOrders.map((order) => (
                <TableRow key={order.order} className="hover:bg-gray-50">
                  <TableCell>{order.no}</TableCell>
                  <TableCell className="font-medium">{order.order}</TableCell>
                  <TableCell className="text-blue-600 font-medium">{order.uid}</TableCell>
                  <TableCell>{order.client}</TableCell>
                  <TableCell>{order.subject || '-'}</TableCell>
                  <TableCell>{order.country}</TableCell>
                  <TableCell>{order.dateIn}</TableCell>
                  <TableCell>{order.clientDueDate}</TableCell>
                  <TableCell>
                    <Select 
                      value={getFieldValue(order, 'assignedTo') || ''} 
                      onValueChange={(value) => handleFieldChange(order.order, 'assignedTo', value)}
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
                  <TableCell>{getStatusBadge(getFieldValue(order, 'status'))}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {deepResearchProgress[order.order] !== undefined ? (
                        <div className="w-32">
                          <Progress value={deepResearchProgress[order.order]} className="h-8" />
                        </div>
                      ) : order.status === 'Not Started' || order.status === 'Pending' ? (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleStartDeepResearch(order)}
                          className="shadow-sm"
                        >
                          <Bot className="h-4 w-4 mr-1" />
                          Deepresearch AI
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownloadOrder(order)}
                          className="shadow-sm"
                        >
                          <Download className="h-4 w-4" />
                          Download
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
