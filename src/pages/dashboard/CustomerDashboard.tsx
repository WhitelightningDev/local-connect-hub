import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Star, ChevronRight, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/lib/auth';

// Mock data
const mockBookings = [
  {
    id: '1',
    providerName: 'Shine & Go Mobile Wash',
    serviceName: 'Full Detail',
    date: new Date(2026, 1, 10),
    time: '10:00',
    status: 'confirmed',
    price: 450,
    providerImage: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    providerName: 'CleanSweep Pros',
    serviceName: 'Deep Cleaning',
    date: new Date(2026, 0, 28),
    time: '14:00',
    status: 'completed',
    price: 650,
    providerImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=100&h=100&fit=crop',
    canReview: true,
  },
  {
    id: '3',
    providerName: 'Happy Paws Pet Care',
    serviceName: 'Dog Grooming',
    date: new Date(2026, 0, 15),
    time: '09:00',
    status: 'completed',
    price: 350,
    providerImage: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=100&h=100&fit=crop',
    rating: 5,
  },
];

const statusColors: Record<string, string> = {
  pending: 'status-pending',
  confirmed: 'status-confirmed',
  completed: 'status-completed',
  cancelled: 'status-cancelled',
};

export default function CustomerDashboard() {
  const { user, loading } = useAuth();
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

  const upcomingBookings = mockBookings.filter(b => b.status === 'confirmed' || b.status === 'pending');
  const pastBookings = mockBookings.filter(b => b.status === 'completed' || b.status === 'cancelled');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-secondary/20">
        <div className="container py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your bookings
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Link to="/services" className="bg-card border rounded-xl p-4 hover:shadow-medium transition-all group">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                <Plus className="h-5 w-5" />
              </div>
              <div className="font-medium group-hover:text-primary transition-colors">Book a Service</div>
              <div className="text-sm text-muted-foreground">Find trusted pros</div>
            </Link>
            <div className="bg-card border rounded-xl p-4">
              <div className="text-3xl font-bold text-primary">{upcomingBookings.length}</div>
              <div className="text-sm text-muted-foreground">Upcoming Bookings</div>
            </div>
            <div className="bg-card border rounded-xl p-4">
              <div className="text-3xl font-bold text-primary">{pastBookings.length}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="bg-card border rounded-xl p-4">
              <div className="text-3xl font-bold text-primary">R1,450</div>
              <div className="text-sm text-muted-foreground">Total Spent</div>
            </div>
          </div>

          {/* Bookings Tabs */}
          <Tabs defaultValue="upcoming" className="space-y-6">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
              <TabsTrigger value="past">Past ({pastBookings.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {upcomingBookings.length === 0 ? (
                <div className="bg-card border rounded-2xl p-8 text-center">
                  <div className="text-5xl mb-4">📅</div>
                  <h3 className="text-lg font-semibold mb-2">No upcoming bookings</h3>
                  <p className="text-muted-foreground mb-4">Ready to book your next service?</p>
                  <Button asChild>
                    <Link to="/services">Browse Services</Link>
                  </Button>
                </div>
              ) : (
                upcomingBookings.map((booking) => (
                  <div key={booking.id} className="bg-card border rounded-2xl p-5 flex items-center gap-4">
                    <img
                      src={booking.providerImage}
                      alt={booking.providerName}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold truncate">{booking.providerName}</h3>
                        <Badge className={statusColors[booking.status]}>
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">{booking.serviceName}</div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {format(booking.date, 'MMM d, yyyy')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {booking.time}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">R{booking.price}</div>
                      <Button variant="ghost" size="sm" className="mt-2">
                        View Details
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {pastBookings.map((booking) => (
                <div key={booking.id} className="bg-card border rounded-2xl p-5 flex items-center gap-4">
                  <img
                    src={booking.providerImage}
                    alt={booking.providerName}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate">{booking.providerName}</h3>
                      <Badge className={statusColors[booking.status]}>
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">{booking.serviceName}</div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(booking.date, 'MMM d, yyyy')}
                      </span>
                      {booking.rating && (
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                          {booking.rating}/5
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">R{booking.price}</div>
                    {booking.canReview && (
                      <Button size="sm" className="mt-2">
                        Leave Review
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
