import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Shield, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* For Customers */}
          <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 hero-gradient text-white">
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
                Need a Service Done?
              </h3>
              <p className="text-white/80 mb-6 max-w-md">
                Join thousands of South Africans who trust ServeLocal for their home and car services.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm">
                  <Shield className="h-5 w-5 text-accent" />
                  <span>All providers verified & vetted</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  <span>Transparent pricing, no hidden fees</span>
                </li>
              </ul>
              <Button variant="accent" size="lg" asChild>
                <Link to="/services" className="flex items-center gap-2">
                  Browse Services
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            {/* Decorative */}
            <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
          </div>

          {/* For Providers */}
          <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 bg-card border shadow-medium">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Briefcase className="h-4 w-4" />
                <span>Become a Provider</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
                Grow Your Business
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Join our network of trusted professionals. Set your prices, manage your schedule, and reach more customers.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm">
                  <span className="w-5 h-5 rounded-full bg-success/10 text-success flex items-center justify-center text-xs">✓</span>
                  <span>Free to join, only pay when you earn</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <span className="w-5 h-5 rounded-full bg-success/10 text-success flex items-center justify-center text-xs">✓</span>
                  <span>Set your own rates and availability</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <span className="w-5 h-5 rounded-full bg-success/10 text-success flex items-center justify-center text-xs">✓</span>
                  <span>Get paid within 48 hours</span>
                </li>
              </ul>
              <Button size="lg" asChild>
                <Link to="/become-provider" className="flex items-center gap-2">
                  Apply Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
