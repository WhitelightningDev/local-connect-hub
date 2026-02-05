import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, DollarSign, Star, Users, TrendingUp, Settings, Check, X } from 'lucide-react';
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
  todayEarnings: 1250,
  weekEarnings: 4850,
  monthEarnings: 18500,
  totalBookings: 156,
  avgRating: 4.9,
  completionRate: 98,
};

const mockTodayJobs = [
  {
    id: '1',
    customerName: 'Thabo M.',
    serviceName: 'Full Detail',
    time: '10:00',
    address: '123 Sandton Drive',
    status: 'confirmed',
    price: 450,
  },
  {
    id: '2',
    customerName: 'Sarah K.',
    serviceName: 'Basic Wash',
    time: '14:00',
    address: '456 Rosebank Ave',
    status: 'pending',
    price: 150,
  },
];

const mockPendingRequests = [
  {
    id: '3',
    customerName: 'David L.',
    serviceName: 'Premium Detail',
    date: new Date(2026, 1, 8),
    time: '11:00',
    price: 750,
  },
];

export default function ProviderDashboard() {
  const { user, loading, hasRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
                Provider Dashboard
              </h1>
              <p className="text-muted-foreground">
                {format(new Date(), 'EEEE, MMMM d, yyyy')}
              </p>
            </div>
            <Button asChild>
              <Link to="/provider/settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Today's Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R{mockStats.todayEarnings.toLocaleString()}</div>
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +12% from yesterday
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R{mockStats.weekEarnings.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {mockStats.totalBookings} bookings
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-center gap-1">
                  <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                  {mockStats.avgRating}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Based on 127 reviews
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.completionRate}%</div>
                <p className="text-xs text-success mt-1">Excellent</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Today's Jobs */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Today's Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockTodayJobs.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-3">🎉</div>
                      <p className="text-muted-foreground">No jobs scheduled for today</p>
                    </div>
                  ) : (
                    mockTodayJobs.map((job) => (
                      <div key={job.id} className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl">
                        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                          {job.time}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{job.customerName}</div>
                          <div className="text-sm text-muted-foreground">{job.serviceName}</div>
                          <div className="text-xs text-muted-foreground mt-1">{job.address}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">R{job.price}</div>
                          <Badge className={job.status === 'confirmed' ? 'status-confirmed' : 'status-pending'}>
                            {job.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              {/* Pending Requests */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-warning" />
                    Pending Requests
                    {mockPendingRequests.length > 0 && (
                      <Badge variant="secondary">{mockPendingRequests.length}</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockPendingRequests.map((request) => (
                    <div key={request.id} className="flex items-center gap-4 p-4 border rounded-xl">
                      <div className="flex-1">
                        <div className="font-medium">{request.customerName}</div>
                        <div className="text-sm text-muted-foreground">{request.serviceName}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {format(request.date, 'MMM d, yyyy')} at {request.time}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold mb-2">R{request.price}</div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <X className="h-4 w-4" />
                          </Button>
                          <Button size="sm">
                            <Check className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Earnings Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-success" />
                    Earnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">This Month</span>
                      <span className="font-bold">R{mockStats.monthEarnings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pending Payout</span>
                      <span className="font-medium">R2,450</span>
                    </div>
                    <div className="pt-4 border-t">
                      <Button variant="outline" className="w-full">
                        View Earnings History
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Response Rate</span>
                    <span className="font-medium text-success">98%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">On-Time Rate</span>
                    <span className="font-medium text-success">96%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Repeat Customers</span>
                    <span className="font-medium">42%</span>
                  </div>
                </CardContent>
              </Card>

              {/* Verification Status */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="trust-badge">
                      <Check className="h-3 w-3" />
                      Verified
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your profile is verified. Verified providers get 40% more bookings.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
