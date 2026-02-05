import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, MapPin, Filter, Star, Shield, Clock, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { supabase } from '@/integrations/supabase/client';

interface Provider {
  id: string;
  business_name: string;
  bio: string;
  city: string;
  suburb: string | null;
  verification_status: string;
  is_featured: boolean;
  average_rating: number;
  total_reviews: number;
  profile_image_url: string | null;
}

interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
}

// Mock providers for display while DB is empty
const mockProviders: Provider[] = [
  {
    id: '1',
    business_name: 'Shine & Go Mobile Wash',
    bio: 'Professional mobile car washing and detailing. We come to you!',
    city: 'Johannesburg',
    suburb: 'Sandton',
    verification_status: 'verified',
    is_featured: true,
    average_rating: 4.9,
    total_reviews: 127,
    profile_image_url: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    business_name: 'CleanSweep Pros',
    bio: 'Thorough home cleaning services with eco-friendly products.',
    city: 'Cape Town',
    suburb: 'Sea Point',
    verification_status: 'verified',
    is_featured: false,
    average_rating: 4.8,
    total_reviews: 89,
    profile_image_url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    business_name: 'Happy Paws Pet Care',
    bio: 'Loving care for your furry friends. Grooming, walking & sitting.',
    city: 'Pretoria',
    suburb: 'Menlyn',
    verification_status: 'verified',
    is_featured: true,
    average_rating: 5.0,
    total_reviews: 56,
    profile_image_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    business_name: 'FixIt All Handyman',
    bio: 'No job too small! Repairs, installations, and maintenance.',
    city: 'Durban',
    suburb: 'Umhlanga',
    verification_status: 'verified',
    is_featured: false,
    average_rating: 4.7,
    total_reviews: 203,
    profile_image_url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
  },
];

export default function ServicesPage() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [sortBy, setSortBy] = useState('rating');
  const [providers, setProviders] = useState<Provider[]>(mockProviders);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Fetch categories
      const { data: catData } = await supabase
        .from('service_categories')
        .select('id, name, slug')
        .eq('is_active', true)
        .order('display_order');
      
      if (catData) setCategories(catData);

      // Fetch providers
      const { data: providerData } = await supabase
        .from('providers')
        .select('*')
        .order('is_featured', { ascending: false })
        .order('average_rating', { ascending: false });
      
      if (providerData && providerData.length > 0) {
        setProviders(providerData);
      }
      
      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredProviders = providers.filter(p => {
    const matchesSearch = !searchQuery || 
      p.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.bio?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !location ||
      p.city.toLowerCase().includes(location.toLowerCase()) ||
      p.suburb?.toLowerCase().includes(location.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  const sortedProviders = [...filteredProviders].sort((a, b) => {
    if (sortBy === 'rating') return b.average_rating - a.average_rating;
    if (sortBy === 'reviews') return b.total_reviews - a.total_reviews;
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Search Header */}
        <div className="bg-secondary/50 border-b">
          <div className="container py-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center gap-2 bg-background rounded-lg border px-4">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search services or providers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 focus-visible:ring-0"
                />
              </div>
              <div className="flex-1 flex items-center gap-2 bg-background rounded-lg border px-4">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Location (e.g., Sandton)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border-0 focus-visible:ring-0"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-thin">
              <Button variant="secondary" size="sm" className="shrink-0">
                All Services
              </Button>
              {categories.map((cat) => (
                <Button key={cat.id} variant="outline" size="sm" className="shrink-0">
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="container py-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              {sortedProviders.length} provider{sortedProviders.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-card rounded-2xl overflow-hidden border animate-pulse">
                  <div className="aspect-[4/3] bg-muted" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                    <div className="h-4 bg-muted rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProviders.map((provider) => (
                <Link
                  key={provider.id}
                  to={`/provider/${provider.id}`}
                  className="group bg-card rounded-2xl overflow-hidden border shadow-soft hover:shadow-elevated transition-all duration-300 card-hover"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={provider.profile_image_url || 'https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=300&fit=crop'}
                      alt={provider.business_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {provider.is_featured && (
                      <div className="absolute top-3 left-3">
                        <span className="featured-badge">⭐ Featured</span>
                      </div>
                    )}
                    {provider.verification_status === 'verified' && (
                      <div className="absolute top-3 right-3">
                        <span className="trust-badge">
                          <Shield className="h-3 w-3" />
                          Verified
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {provider.business_name}
                    </h3>

                    <div className="flex items-center gap-1 text-sm mb-2">
                      <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                      <span className="font-medium">{provider.average_rating.toFixed(1)}</span>
                      <span className="text-muted-foreground">({provider.total_reviews} reviews)</span>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                      <MapPin className="h-3 w-3" />
                      <span>{provider.suburb ? `${provider.suburb}, ` : ''}{provider.city}</span>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {provider.bio}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && sortedProviders.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No providers found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or location filters
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
