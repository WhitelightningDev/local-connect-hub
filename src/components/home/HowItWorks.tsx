import { Search, Calendar, CreditCard, Star } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Find a Service',
    description: 'Browse verified providers in your area. Filter by ratings, price, and availability.',
  },
  {
    icon: Calendar,
    title: 'Book Instantly',
    description: 'Pick a date and time that works for you. Get instant confirmation.',
  },
  {
    icon: CreditCard,
    title: 'Pay Securely',
    description: 'Pay in-app with your preferred method. Funds held until job completion.',
  },
  {
    icon: Star,
    title: 'Rate & Review',
    description: 'Share your experience and help others find great providers.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Book a trusted professional in under 60 seconds
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="relative z-10 w-24 h-24 mx-auto mb-6 rounded-2xl hero-gradient flex items-center justify-center shadow-glow">
                <step.icon className="h-10 w-10 text-white" />
              </div>
              
              {/* Step number */}
              <div className="absolute top-0 right-1/2 translate-x-14 -translate-y-2 w-8 h-8 rounded-full bg-accent text-accent-foreground font-bold flex items-center justify-center text-sm shadow-accent">
                {index + 1}
              </div>

              <h3 className="font-display font-semibold text-lg mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
