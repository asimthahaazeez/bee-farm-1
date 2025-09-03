import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/components/ui/use-toast';
import { 
  Mail, 
  Lock, 
  User, 
  AlertCircle, 
  CheckCircle, 
  ArrowLeft,
  Loader2
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const AuthPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signIn, signUp, resetPassword, user, loading } = useAuth();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('signin');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');

  // Check for redirect parameter
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'signup') {
      setActiveTab('signup');
    }
  }, [searchParams]);

  // Redirect authenticated users
  useEffect(() => {
    if (user && !loading) {
      navigate('/', { replace: true });
    }
  }, [user, loading, navigate]);

  const validateForm = () => {
    if (!email || !password) {
      setError('Please fill in all required fields');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (activeTab === 'signup') {
      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        return false;
      }
      
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      
      if (!fullName.trim()) {
        setError('Please enter your full name');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      if (activeTab === 'signin') {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            setError('Invalid email or password. Please check your credentials and try again.');
          } else if (error.message.includes('Email not confirmed')) {
            setError('Please check your email and click the confirmation link before signing in.');
          } else {
            setError(error.message);
          }
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in.",
          });
        }
      } else if (activeTab === 'signup') {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          if (error.message.includes('User already registered')) {
            setError('An account with this email already exists. Please sign in instead.');
          } else {
            setError(error.message);
          }
        } else {
          setSuccess('Account created successfully! Please check your email for a confirmation link.');
          toast({
            title: "Account Created",
            description: "Please check your email to confirm your account.",
          });
        }
      } else if (activeTab === 'reset') {
        const { error } = await resetPassword(email);
        if (error) {
          setError(error.message);
        } else {
          setSuccess('Password reset email sent! Please check your inbox.');
          toast({
            title: "Reset Email Sent",
            description: "Please check your email for password reset instructions.",
          });
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Auth error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
    setError('');
    setSuccess('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-muted-foreground">Loading...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Professional Beekeeping Platform
            </h1>
            <p className="text-muted-foreground">
              Access advanced AI diagnostics, financial analytics, and professional tools
            </p>
          </div>

          {/* Auth Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/')}
                  className="p-0 h-auto font-normal"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Home
                </Button>
              </div>
              <CardTitle>Welcome</CardTitle>
              <CardDescription>
                Sign in to your account or create a new one to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs 
                value={activeTab} 
                onValueChange={(value) => {
                  setActiveTab(value);
                  resetForm();
                }}
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  <TabsTrigger value="reset">Reset</TabsTrigger>
                </TabsList>

                {/* Error/Success Messages */}
                {error && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="mt-4 border-sage bg-sage/10">
                    <CheckCircle className="h-4 w-4 text-sage" />
                    <AlertDescription className="text-sage">{success}</AlertDescription>
                  </Alert>
                )}

                {/* Sign In Tab */}
                <TabsContent value="signin" className="space-y-4 mt-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-9"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-9"
                          required
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-sage text-sage-foreground hover:bg-sage/90"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        'Sign In'
                      )}
                    </Button>
                  </form>

                  <div className="text-center">
                    <Button
                      variant="link"
                      onClick={() => {
                        setActiveTab('reset');
                        resetForm();
                      }}
                      className="text-sm text-muted-foreground"
                    >
                      Forgot your password?
                    </Button>
                  </div>
                </TabsContent>

                {/* Sign Up Tab */}
                <TabsContent value="signup" className="space-y-4 mt-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="pl-9"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-9"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="Create a password (min 6 characters)"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-9"
                          required
                          minLength={6}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pl-9"
                          required
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-sage text-sage-foreground hover:bg-sage/90"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </Button>
                  </form>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Already have an account?{' '}
                      <Button
                        variant="link"
                        onClick={() => {
                          setActiveTab('signin');
                          resetForm();
                        }}
                        className="text-sm p-0 h-auto font-normal text-sage"
                      >
                        Sign in here
                      </Button>
                    </p>
                  </div>
                </TabsContent>

                {/* Password Reset Tab */}
                <TabsContent value="reset" className="space-y-4 mt-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-9"
                          required
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-sage text-sage-foreground hover:bg-sage/90"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending reset email...
                        </>
                      ) : (
                        'Send Reset Email'
                      )}
                    </Button>
                  </form>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Remember your password?{' '}
                      <Button
                        variant="link"
                        onClick={() => {
                          setActiveTab('signin');
                          resetForm();
                        }}
                        className="text-sm p-0 h-auto font-normal text-sage"
                      >
                        Sign in here
                      </Button>
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              <Separator className="my-6" />

              <div className="text-center text-sm text-muted-foreground">
                <p>
                  By signing up, you agree to our professional beekeeping platform's 
                  terms of service and privacy policy.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Features Preview */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Platform Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-sage rounded-full"></div>
                <span className="text-sm">Advanced AI hive diagnostics with 95% accuracy</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-sage rounded-full"></div>
                <span className="text-sm">Automated P&L reporting and tax optimization</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-sage rounded-full"></div>
                <span className="text-sm">Environmental correlation and predictive analytics</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-sage rounded-full"></div>
                <span className="text-sm">Professional API access and integrations</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;