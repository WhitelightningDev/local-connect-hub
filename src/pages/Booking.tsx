import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, CreditCard, Shield, Check } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

// Mock data
const mockProvider = {
  id: '1',
  businessName: 'Shine & Go Mobile Wash',
  city: 'Johannesburg',
  suburb: 'Sandton',
  services: [
    { id: '1', name: 'Basic Wash', price: 150, duration: 30 },
    { id: '2', name: 'Full Detail', price: 450, duration: 90 },
    { id: '3', name: 'Premium Detail', price: 750, duration: 120 },
  ],
  availability: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
};

export default function BookingPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const serviceId = searchParams.get('service');
  const service = mockProvider.services.find(s => s.id === serviceId);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(addDays(new Date(), 1));
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service not found</h1>
          <Button asChild>
            <Link to="/services">Browse Services</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime || !address) {
      toast({
        variant: 'destructive',
        title: 'Missing information',
        description: 'Please fill in all required fields.',
      });
      return;
    }

    setLoading(true);
    
    // Simulate booking creation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: 'Booking confirmed!',
      description: 'You will receive a confirmation email shortly.',
    });
    
    navigate('/dashboard');
    setLoading(false);
  };

  const commissionRate = 0.12;
  const commission = service.price * commissionRate;
  const providerPayout = service.price - commission;

  return (
    <div className="min-h-screen flex flex-col bg-secondary/20">
      <Header />
      
      <main className="flex-1 container py-8">
        <Link to={`/provider/${id}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to provider
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Date & Time */}
            <div className={`bg-card rounded-2xl border p-6 ${step >= 1 ? '' : 'opacity-50'}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <h2 className="text-xl font-semibold">Select Date & Time</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="mb-2 block">Select Date</Label>
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date > addDays(new Date(), 30)}
                    className="rounded-lg border"
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Available Times</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {mockProvider.availability.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? 'default' : 'outline'}
                        onClick={() => setSelectedTime(time)}
                        className="justify-start"
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {selectedDate && selectedTime && step === 1 && (
                <Button className="mt-6" onClick={() => setStep(2)}>
                  Continue
                </Button>
              )}
            </div>

            {/* Step 2: Address & Notes */}
            <div className={`bg-card rounded-2xl border p-6 ${step >= 2 ? '' : 'opacity-50 pointer-events-none'}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  2
                </div>
                <h2 className="text-xl font-semibold">Service Location</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Address *</Label>
                  <div className="relative mt-2">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your full address"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes">Special Instructions (optional)</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any specific instructions for the provider..."
                    className="mt-2"
                    rows={3}
                  />
                </div>
              </div>

              {address && step === 2 && (
                <Button className="mt-6" onClick={() => setStep(3)}>
                  Continue to Payment
                </Button>
              )}
            </div>

            {/* Step 3: Review & Pay */}
            <div className={`bg-card rounded-2xl border p-6 ${step >= 3 ? '' : 'opacity-50 pointer-events-none'}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  3
                </div>
                <h2 className="text-xl font-semibold">Review & Confirm</h2>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">
                      {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}
                    </div>
                    <div className="text-sm text-muted-foreground">{selectedTime}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">{address || 'No address provided'}</div>
                    <div className="text-sm text-muted-foreground">{mockProvider.city}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-success/10 text-success rounded-lg mb-6">
                <Shield className="h-5 w-5" />
                <span className="text-sm font-medium">Your payment is protected until the job is complete</span>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                disabled={loading || !address}
                onClick={handleConfirmBooking}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                {loading ? 'Processing...' : `Pay R${service.price} and Confirm`}
              </Button>
            </div>
          </div>

          {/* Sidebar - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border rounded-2xl p-6 shadow-medium">
              <h3 className="font-semibold text-lg mb-4">Booking Summary</h3>
              
              <div className="pb-4 border-b">
                <div className="font-medium">{mockProvider.businessName}</div>
                <div className="text-sm text-muted-foreground">
                  {mockProvider.suburb}, {mockProvider.city}
                </div>
              </div>

              <div className="py-4 border-b">
                <div className="flex justify-between mb-2">
                  <span>{service.name}</span>
                  <span>R{service.price}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{service.duration} minutes</span>
                </div>
              </div>

              <div className="py-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>R{service.price}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  <span>Secure payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  <span>Free cancellation 24h before</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  <span>Verified provider</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
