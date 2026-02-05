import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Shield, DollarSign, Star, Check, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const benefits = [
  {
    icon: DollarSign,
    title: 'Set Your Own Rates',
    description: 'You decide what your services are worth. Keep up to 88% of every booking.',
  },
  {
    icon: Zap,
    title: 'Instant Payments',
    description: 'Get paid within 48 hours of completing a job. No waiting weeks for your money.',
  },
  {
    icon: Star,
    title: 'Build Your Reputation',
    description: 'Collect reviews and ratings that help you stand out and attract more customers.',
  },
  {
    icon: Shield,
    title: 'Verified Badge',
    description: 'Complete our verification process and get a trusted badge that boosts bookings by 40%.',
  },
];

const subscriptionPlans = [
  {
    name: 'Free',
    price: 0,
    features: [
      'Create your profile',
      'Accept bookings',
      '12% commission per booking',
      'Basic support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: 299,
    period: '/month',
    features: [
      'Everything in Free',
      '0% commission',
      'Featured listing',
      'Priority support',
      'Analytics dashboard',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Verified Badge',
    price: 199,
    period: 'once-off',
    features: [
      'Verified badge on profile',
      'Priority in search results',
      'Trust indicator boost',
      'Background check included',
    ],
    cta: 'Get Verified',
    popular: false,
  },
];

export default function BecomeProviderPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 hero-gradient opacity-10" />
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Briefcase className="h-4 w-4" />
                <span>Join 500+ Service Providers</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                Turn Your Skills Into a{' '}
                <span className="text-gradient">Thriving Business</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join South Africa's fastest-growing service marketplace. Set your own hours, 
                build your reputation, and grow your income with ServeLocal.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="xl" asChild>
                  <Link to="/auth?mode=signup">
                    Apply Now
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
                <Button size="xl" variant="outline">
                  Learn More
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-16 max-w-xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">R15K+</div>
                  <div className="text-sm text-muted-foreground">Avg Monthly Earnings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">4.9</div>
                  <div className="text-sm text-muted-foreground">Platform Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">3K+</div>
                  <div className="text-sm text-muted-foreground">Monthly Bookings</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Why Providers Love ServeLocal
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to grow your service business
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="bg-card border rounded-2xl p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that works for your business
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {subscriptionPlans.map((plan) => (
                <div 
                  key={plan.name} 
                  className={`relative bg-card border rounded-2xl p-6 ${
                    plan.popular ? 'border-primary shadow-glow' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="featured-badge">Most Popular</span>
                    </div>
                  )}
                  <h3 className="font-semibold text-xl mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">R{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-success" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? 'default' : 'outline'}
                    asChild
                  >
                    <Link to="/auth?mode=signup">{plan.cta}</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container">
            <div className="relative overflow-hidden rounded-3xl p-8 md:p-16 hero-gradient text-white text-center">
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Ready to Start Earning?
                </h2>
                <p className="text-white/80 mb-8">
                  Join hundreds of service providers who are already growing their business with ServeLocal.
                </p>
                <Button size="xl" variant="accent" asChild>
                  <Link to="/auth?mode=signup">
                    Apply Now — It's Free
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </div>
              <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -left-16 -top-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
