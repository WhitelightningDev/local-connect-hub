import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t bg-secondary/30">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg hero-gradient flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">S</span>
              </div>
              <span className="font-display font-bold text-xl">ServeLocal</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Connecting South Africans with trusted local service providers. Book in under 60 seconds.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/services/car-wash" className="hover:text-foreground transition-colors">Car Wash</Link></li>
              <li><Link to="/services/home-cleaning" className="hover:text-foreground transition-colors">Home Cleaning</Link></li>
              <li><Link to="/services/pet-services" className="hover:text-foreground transition-colors">Pet Services</Link></li>
              <li><Link to="/services/handyman" className="hover:text-foreground transition-colors">Handyman</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link to="/how-it-works" className="hover:text-foreground transition-colors">How It Works</Link></li>
              <li><Link to="/become-provider" className="hover:text-foreground transition-colors">Become a Provider</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link to="/refunds" className="hover:text-foreground transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ServeLocal. Made with ❤️ in South Africa.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">Trusted by 1000+ South Africans</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
