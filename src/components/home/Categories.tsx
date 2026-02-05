import { Link } from 'react-router-dom';
import { Car, Home, PawPrint, Wrench, Leaf, Droplet, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  {
    slug: 'car-wash',
    name: 'Car Wash',
    description: 'Mobile car washing & detailing',
    icon: Car,
    color: 'bg-blue-500/10 text-blue-600',
    count: 45,
  },
  {
    slug: 'home-cleaning',
    name: 'Home Cleaning',
    description: 'Residential cleaning services',
    icon: Home,
    color: 'bg-emerald-500/10 text-emerald-600',
    count: 62,
  },
  {
    slug: 'pet-services',
    name: 'Pet Services',
    description: 'Grooming, walking & sitting',
    icon: PawPrint,
    color: 'bg-orange-500/10 text-orange-600',
    count: 28,
  },
  {
    slug: 'handyman',
    name: 'Handyman',
    description: 'Repairs & maintenance',
    icon: Wrench,
    color: 'bg-purple-500/10 text-purple-600',
    count: 34,
  },
  {
    slug: 'garden-services',
    name: 'Garden Services',
    description: 'Lawn care & landscaping',
    icon: Leaf,
    color: 'bg-green-500/10 text-green-600',
    count: 21,
  },
  {
    slug: 'plumbing',
    name: 'Plumbing',
    description: 'Repairs & installations',
    icon: Droplet,
    color: 'bg-cyan-500/10 text-cyan-600',
    count: 18,
  },
];

export function Categories() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Popular Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From car washes to home cleaning, find trusted professionals for all your needs
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              to={`/services/${category.slug}`}
              className="group relative bg-card rounded-2xl p-6 border shadow-soft hover:shadow-medium transition-all duration-300 card-hover animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4', category.color)}>
                <category.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <p className="text-xs text-muted-foreground mb-2">
                {category.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {category.count} providers
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
