import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const emailSchema = z.string().email('Please enter a valid email address');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(searchParams.get('mode') === 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'customer' | 'provider'>('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; fullName?: string }>({});

  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; fullName?: string } = {};
    
    try {
      emailSchema.parse(email);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.email = e.errors[0].message;
      }
    }

    try {
      passwordSchema.parse(password);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.password = e.errors[0].message;
      }
    }

    if (isSignUp && !fullName.trim()) {
      newErrors.fullName = 'Please enter your name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, role, fullName);
        if (error) {
          if (error.message.includes('already registered')) {
            toast({
              variant: 'destructive',
              title: 'Account exists',
              description: 'This email is already registered. Please sign in instead.',
            });
          } else {
            toast({
              variant: 'destructive',
              title: 'Sign up failed',
              description: error.message,
            });
          }
          return;
        }
        toast({
          title: 'Check your email',
          description: 'We sent you a confirmation link. Please verify your email to continue.',
        });
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              variant: 'destructive',
              title: 'Invalid credentials',
              description: 'Please check your email and password.',
            });
          } else {
            toast({
              variant: 'destructive',
              title: 'Sign in failed',
              description: error.message,
            });
          }
          return;
        }
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="flex items-center gap-2 mb-6">
            <div className="h-10 w-10 rounded-lg hero-gradient flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">S</span>
            </div>
            <span className="font-display font-bold text-2xl">ServeLocal</span>
          </div>

          <h2 className="text-2xl font-display font-bold mb-2">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-muted-foreground">
            {isSignUp 
              ? 'Join thousands of South Africans on ServeLocal' 
              : 'Sign in to continue to your account'}
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <>
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                      className={`pl-10 ${errors.fullName ? 'border-destructive' : ''}`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-sm text-destructive mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <Label>I want to</Label>
                  <RadioGroup
                    value={role}
                    onValueChange={(v) => setRole(v as 'customer' | 'provider')}
                    className="grid grid-cols-2 gap-4 mt-2"
                  >
                    <Label
                      htmlFor="customer"
                      className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        role === 'customer' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-muted-foreground'
                      }`}
                    >
                      <RadioGroupItem value="customer" id="customer" className="sr-only" />
                      <span className="text-2xl mb-1">🏠</span>
                      <span className="font-medium">Book Services</span>
                      <span className="text-xs text-muted-foreground">I need help</span>
                    </Label>
                    <Label
                      htmlFor="provider"
                      className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        role === 'provider' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-muted-foreground'
                      }`}
                    >
                      <RadioGroupItem value="provider" id="provider" className="sr-only" />
                      <span className="text-2xl mb-1">💼</span>
                      <span className="font-medium">Offer Services</span>
                      <span className="text-xs text-muted-foreground">I'm a pro</span>
                    </Label>
                  </RadioGroup>
                </div>
              </>
            )}

            <div>
              <Label htmlFor="email">Email address</Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`pl-10 pr-10 ${errors.password ? 'border-destructive' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive mt-1">{errors.password}</p>
              )}
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isSignUp ? (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="font-medium text-primary hover:underline"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don&apos;t have an account?{' '}
                <button
                  onClick={() => setIsSignUp(true)}
                  className="font-medium text-primary hover:underline"
                >
                  Sign up
                </button>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:flex flex-1 hero-gradient items-center justify-center p-12">
        <div className="max-w-lg text-white text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            {isSignUp 
              ? 'Join South Africa\'s fastest-growing service marketplace'
              : 'Welcome back to ServeLocal'}
          </h2>
          <p className="text-white/80 mb-8">
            {isSignUp
              ? 'Connect with verified professionals or grow your business by offering your services.'
              : 'Your trusted local services are just a click away.'}
          </p>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold">1K+</div>
              <div className="text-sm text-white/70">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm text-white/70">Providers</div>
            </div>
            <div>
              <div className="text-3xl font-bold">4.9</div>
              <div className="text-sm text-white/70">Avg Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
