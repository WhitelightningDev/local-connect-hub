import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/services?q=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(location)}`);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient opacity-95" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-30" />
      
      <div className="container relative py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-8 animate-fade-in">
            <Shield className="h-4 w-4" />
            <span>Trusted by 1,000+ South Africans</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Local Services,{' '}
            <span className="relative">
              Delivered
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-accent rounded-full" />
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Book trusted car washers, cleaners, and handymen in your area. 
            Verified providers, secure payments, and service guaranteed.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="bg-white rounded-2xl p-2 shadow-elevated flex flex-col md:flex-row gap-2 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex-1 flex items-center gap-2 px-4">
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <Input
                type="text"
                placeholder="What service do you need?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 focus-visible:ring-0 text-base"
              />
            </div>
            <div className="flex-1 flex items-center gap-2 px-4 border-t md:border-t-0 md:border-l">
              <MapPin className="h-5 w-5 text-muted-foreground shrink-0" />
              <Input
                type="text"
                placeholder="Your location (e.g., Sandton)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border-0 focus-visible:ring-0 text-base"
              />
            </div>
            <Button type="submit" size="lg" className="h-12 px-8">
              Search
            </Button>
          </form>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mt-10 text-white/70 text-sm animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-accent fill-accent" />
              <span>4.9 Average Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Verified Providers</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Book in 60 Seconds</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
        </svg>
      </div>
    </section>
  );
}
