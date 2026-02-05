import { Link } from 'react-router-dom';
import { Star, MapPin, Shield, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock data - will be replaced with real data
const featuredProviders = [
  {
    id: '1',
    businessName: 'Shine & Go Mobile Wash',
    category: 'Car Wash',
    city: 'Johannesburg',
    suburb: 'Sandton',
    rating: 4.9,
    reviewCount: 127,
    price: 'From R150',
    isVerified: true,
    isFeatured: true,
    responseTime: '< 1 hour',
    imageUrl: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    businessName: 'CleanSweep Pros',
    category: 'Home Cleaning',
    city: 'Cape Town',
    suburb: 'Sea Point',
    rating: 4.8,
    reviewCount: 89,
    price: 'From R350',
    isVerified: true,
    isFeatured: false,
    responseTime: '< 2 hours',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    businessName: 'Happy Paws Pet Care',
    category: 'Pet Services',
    city: 'Pretoria',
    suburb: 'Menlyn',
    rating: 5.0,
    reviewCount: 56,
    price: 'From R200',
    isVerified: true,
    isFeatured: true,
    responseTime: '< 30 mins',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    businessName: 'FixIt All Handyman',
    category: 'Handyman',
    city: 'Durban',
    suburb: 'Umhlanga',
    rating: 4.7,
    reviewCount: 203,
    price: 'From R250',
    isVerified: true,
    isFeatured: false,
    responseTime: '< 1 hour',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
  },
];

export function FeaturedProviders() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Top-Rated Providers
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover verified professionals with excellent reviews from your community
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/services" className="flex items-center gap-2">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProviders.map((provider, index) => (
            <Link
              key={provider.id}
              to={`/provider/${provider.id}`}
              className="group bg-card rounded-2xl overflow-hidden border shadow-soft hover:shadow-elevated transition-all duration-300 card-hover animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={provider.imageUrl}
                  alt={provider.businessName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {provider.isFeatured && (
                  <div className="absolute top-3 left-3">
                    <span className="featured-badge">
                      ⭐ Featured
                    </span>
                  </div>
                )}
                {provider.isVerified && (
                  <div className="absolute top-3 right-3">
                    <span className="trust-badge">
                      <Shield className="h-3 w-3" />
                      Verified
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                    {provider.businessName}
                  </h3>
                </div>
                
                <Badge variant="secondary" className="mb-3 text-xs">
                  {provider.category}
                </Badge>

                <div className="flex items-center gap-1 text-sm mb-2">
                  <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                  <span className="font-medium">{provider.rating}</span>
                  <span className="text-muted-foreground">({provider.reviewCount} reviews)</span>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                  <MapPin className="h-3 w-3" />
                  <span>{provider.suburb}, {provider.city}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="font-semibold text-primary">{provider.price}</span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{provider.responseTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
