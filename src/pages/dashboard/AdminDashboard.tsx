import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, DollarSign, TrendingUp, AlertTriangle, Check, X, Calendar, Shield } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/lib/auth';

// Mock data
const mockStats = {
  totalRevenue: 125000,
  monthlyRevenue: 32500,
  activeProviders: 156,
  totalCustomers: 1240,
  totalBookings: 3420,
  pendingDisputes: 3,
};

const mockPendingProviders = [
  {
    id: '1',
    businessName: 'Cape Town Cleaners',
    email: 'ctcleaners@email.com',
    category: 'Home Cleaning',
    appliedAt: new Date(2026, 1, 3),
  },
  {
    id: '2',
    businessName: 'Jozi Auto Spa',
    email: 'joziauto@email.com',
    category: 'Car Wash',
    appliedAt: new Date(2026, 1, 4),
  },
];

const mockDisputes = [
  {
    id: '1',
    bookingId: 'B-1234',
    customer: 'Thabo M.',
    provider: 'CleanSweep Pros',
    reason: 'Service not completed as described',
    amount: 450,
    createdAt: new Date(2026, 1, 2),
    status: 'open',
  },
];

export default function AdminDashboard() {
  const { user, loading, hasRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !hasRole('admin'))) {
      navigate('/');
    }
  }, [user, loading, hasRole, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-secondary/20">
        <div className="container py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Platform overview and management
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R{mockStats.totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +15% this month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R{mockStats.monthlyRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">Commission earned</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Providers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.activeProviders}</div>
                <p className="text-xs text-muted-foreground mt-1">Verified providers</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.totalCustomers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">{mockStats.totalBookings} bookings</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="providers" className="space-y-6">
            <TabsList>
              <TabsTrigger value="providers">
                Provider Approvals
                {mockPendingProviders.length > 0 && (
                  <Badge variant="secondary" className="ml-2">{mockPendingProviders.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="disputes">
                Disputes
                {mockStats.pendingDisputes > 0 && (
                  <Badge variant="destructive" className="ml-2">{mockStats.pendingDisputes}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
            </TabsList>

            {/* Provider Approvals */}
            <TabsContent value="providers" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Pending Provider Applications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockPendingProviders.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-3">✅</div>
                      <p className="text-muted-foreground">All applications reviewed</p>
                    </div>
                  ) : (
                    mockPendingProviders.map((provider) => (
                      <div key={provider.id} className="flex items-center gap-4 p-4 border rounded-xl">
                        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                          {provider.businessName[0]}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{provider.businessName}</div>
                          <div className="text-sm text-muted-foreground">{provider.email}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary">{provider.category}</Badge>
                            <span className="text-xs text-muted-foreground">
                              Applied {format(provider.appliedAt, 'MMM d, yyyy')}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <X className="h-4 w-4" />
                          </Button>
                          <Button size="sm">
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Disputes */}
            <TabsContent value="disputes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    Open Disputes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockDisputes.map((dispute) => (
                    <div key={dispute.id} className="p-4 border rounded-xl">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="font-medium">Booking #{dispute.bookingId}</div>
                          <div className="text-sm text-muted-foreground">
                            {dispute.customer} vs {dispute.provider}
                          </div>
                        </div>
                        <Badge className="status-pending">
                          {dispute.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{dispute.reason}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <span className="font-medium">Amount: </span>
                          <span>R{dispute.amount}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Refund Customer
                          </Button>
                          <Button size="sm">
                            Resolve
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Revenue */}
            <TabsContent value="revenue" className="space-y-4">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Platform Volume</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">R{(mockStats.totalRevenue * 8).toLocaleString()}</div>
                    <p className="text-sm text-muted-foreground mt-1">All-time bookings value</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">Commission Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">12%</div>
                    <p className="text-sm text-muted-foreground mt-1">Average platform fee</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">Subscriptions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">23</div>
                    <p className="text-sm text-muted-foreground mt-1">Active provider plans</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
