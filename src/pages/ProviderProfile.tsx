import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Shield, Clock, Calendar, Check, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/lib/auth';

// Mock data - will be replaced with real data
const mockProvider = {
  id: '1',
  businessName: 'Shine & Go Mobile Wash',
  bio: 'Professional mobile car washing and detailing services. We bring the car wash to you! Our team uses eco-friendly products and the latest techniques to make your car shine like new.',
  city: 'Johannesburg',
  suburb: 'Sandton',
  rating: 4.9,
  reviewCount: 127,
  isVerified: true,
  isFeatured: true,
  responseTime: '< 1 hour',
  completedJobs: 450,
  memberSince: '2023',
  profileImage: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&h=400&fit=crop',
  services: [
    { id: '1', name: 'Basic Wash', description: 'Exterior wash and dry', price: 150, duration: 30 },
    { id: '2', name: 'Full Detail', description: 'Interior & exterior deep clean', price: 450, duration: 90 },
    { id: '3', name: 'Premium Detail', description: 'Complete detail with wax & polish', price: 750, duration: 120 },
  ],
  reviews: [
    { id: '1', name: 'Thabo M.', rating: 5, comment: 'Excellent service! My car looks brand new.', date: '2 days ago' },
    { id: '2', name: 'Sarah K.', rating: 5, comment: 'Very professional and on time. Highly recommended!', date: '1 week ago' },
    { id: '3', name: 'David L.', rating: 4, comment: 'Great job on the interior cleaning.', date: '2 weeks ago' },
  ],
};

export default function ProviderProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const provider = mockProvider; // Will fetch real data later

  const handleBookNow = () => {
    if (!user) {
      navigate('/auth?mode=signup');
      return;
    }
    if (selectedService) {
      navigate(`/book/${id}?service=${selectedService}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Back Button */}
        <div className="container pt-6">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to services
          </Link>
        </div>

        {/* Hero Image */}
        <div className="container py-6">
          <div className="relative aspect-[3/1] md:aspect-[4/1] rounded-2xl overflow-hidden">
            <img
              src={provider.profileImage}
              alt={provider.businessName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {provider.isFeatured && <span className="featured-badge">⭐ Featured</span>}
                {provider.isVerified && (
                  <span className="trust-badge">
                    <Shield className="h-3 w-3" />
                    Verified
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-4xl font-display font-bold text-white mb-2">
                {provider.businessName}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                  <span className="font-medium">{provider.rating}</span>
                  <span className="text-white/70">({provider.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{provider.suburb}, {provider.city}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Responds {provider.responseTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="container pb-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <section>
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <p className="text-muted-foreground">{provider.bio}</p>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 bg-secondary/50 rounded-xl">
                    <div className="text-2xl font-bold text-primary">{provider.completedJobs}</div>
                    <div className="text-xs text-muted-foreground">Jobs Completed</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/50 rounded-xl">
                    <div className="text-2xl font-bold text-primary">{provider.responseTime}</div>
                    <div className="text-xs text-muted-foreground">Response Time</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/50 rounded-xl">
                    <div className="text-2xl font-bold text-primary">{provider.memberSince}</div>
                    <div className="text-xs text-muted-foreground">Member Since</div>
                  </div>
                </div>
              </section>

              {/* Services */}
              <section>
                <h2 className="text-xl font-semibold mb-4">Services Offered</h2>
                <div className="space-y-3">
                  {provider.services.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedService === service.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-muted-foreground'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{service.name}</h3>
                            {selectedService === service.id && (
                              <Check className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                          <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {service.duration} min
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-lg">R{service.price}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Reviews */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Reviews</h2>
                  <Badge variant="secondary">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    {provider.rating} ({provider.reviewCount})
                  </Badge>
                </div>
                <div className="space-y-4">
                  {provider.reviews.map((review) => (
                    <div key={review.id} className="p-4 bg-secondary/30 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{review.name}</div>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-muted'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card border rounded-2xl p-6 shadow-medium">
                <h3 className="font-semibold text-lg mb-4">Book This Provider</h3>
                
                {selectedService ? (
                  <div className="mb-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="text-sm text-muted-foreground">Selected service:</div>
                    <div className="font-medium">
                      {provider.services.find(s => s.id === selectedService)?.name}
                    </div>
                    <div className="text-lg font-bold text-primary mt-1">
                      R{provider.services.find(s => s.id === selectedService)?.price}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground mb-4">
                    Select a service above to continue
                  </p>
                )}

                <Button 
                  className="w-full" 
                  size="lg" 
                  disabled={!selectedService}
                  onClick={handleBookNow}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  {user ? 'Book Now' : 'Sign Up to Book'}
                </Button>

                <div className="mt-4 pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message Provider
                  </Button>
                </div>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Shield className="h-4 w-4 text-success" />
                    <span>Secure payment protection</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Check className="h-4 w-4 text-success" />
                    <span>Free cancellation up to 24h before</span>
                  </div>
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
