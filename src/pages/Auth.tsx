
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

const Auth: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'seller' as 'buyer' | 'seller',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: '',
  });
  const { signIn, signUp, user } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Redirect if user is already authenticated
  useEffect(() => {
    if (user) {
      if (user.userType === 'seller') {
        navigate('/seller/listing-type');
      } else if (user.userType === 'buyer') {
        navigate('/buyer/setup');
      } else {
        navigate('/');
      }
    }
  }, [user, navigate]);

  // Set initial tab based on URL parameter if provided
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'signup' || tab === 'signin') {
      setAuthMode(tab);
    }
  }, [searchParams]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '', general: '' };
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (authMode === 'signup' && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (name === 'email' || name === 'password') {
      setErrors(prev => ({ ...prev, [name]: '', general: '' }));
    }
  };

  const handleUserTypeChange = (value: string) => {
    setFormData({
      ...formData,
      userType: value as 'buyer' | 'seller',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form first
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setErrors({ email: '', password: '', general: '' });

    try {
      if (authMode === 'signin') {
        await signIn(formData.email, formData.password);
        // Toast and redirect will be handled in AuthContext
      } else {
        await signUp(formData.email, formData.password, formData.userType);
        // Toast and redirect will be handled in AuthContext
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      
      // Handle specific error cases
      if (error.message.includes('already')) {
        setErrors(prev => ({ 
          ...prev, 
          email: 'This email is already in use. Please try signing in instead.',
          general: ''
        }));
      } else if (error.message.includes('password')) {
        setErrors(prev => ({ 
          ...prev, 
          password: 'Incorrect password. Please try again.',
          general: ''
        }));
      } else if (error.message.includes('not found') || error.message.includes('user')) {
        setErrors(prev => ({ 
          ...prev, 
          email: 'No account found with this email.',
          general: ''
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          general: error.message || "An error occurred during authentication"
        }));
        
        toast({
          title: authMode === 'signin' ? "Sign in failed" : "Sign up failed",
          description: error.message || "An error occurred. Please try again.",
          variant: "destructive"
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[80vh] px-4 py-12">
        <Card className="w-full max-w-md mx-auto">
          <Tabs
            defaultValue="signin"
            value={authMode}
            onValueChange={(value) => setAuthMode(value as 'signin' | 'signup')}
          >
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <CardContent className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {errors.general && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{errors.general}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={errors.email ? "border-red-500" : ""}
                      disabled={isLoading}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className={errors.password ? "border-red-500" : ""}
                      disabled={isLoading}
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                    )}
                  </div>

                  {authMode === 'signup' && (
                    <div>
                      <Label className="block mb-2">I want to:</Label>
                      <RadioGroup
                        value={formData.userType}
                        onValueChange={handleUserTypeChange}
                        className={isMobile ? "space-y-2" : "grid grid-cols-2 gap-4"}
                        disabled={isLoading}
                      >
                        <div className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-smooth ${formData.userType === 'seller' ? 'border-black bg-black/5' : 'border-gray-200'}`}>
                          <RadioGroupItem value="seller" id="option-seller" />
                          <Label htmlFor="option-seller" className="cursor-pointer">Sell a Business</Label>
                        </div>
                        
                        <div className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-smooth ${formData.userType === 'buyer' ? 'border-black bg-black/5' : 'border-gray-200'}`}>
                          <RadioGroupItem value="buyer" id="option-buyer" />
                          <Label htmlFor="option-buyer" className="cursor-pointer">Buy a Business</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 bg-black hover:bg-gray-800"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {authMode === 'signin' ? "Signing in..." : "Creating account..."}
                    </span>
                  ) : (
                    authMode === 'signin' ? "Sign In" : "Create Account"
                  )}
                </Button>
              </form>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Auth;
