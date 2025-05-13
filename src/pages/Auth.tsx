
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
import { useSearchParams } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
    password: '',
  });
  const { signIn, signUp } = useAuth();
  const isMobile = useIsMobile();

  // Set initial tab based on URL parameter if provided
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'signup' || tab === 'signin') {
      setAuthMode(tab);
    }
  }, [searchParams]);

  const validatePassword = (password: string): boolean => {
    if (password.length < 6) {
      setErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }));
      return false;
    }
    setErrors(prev => ({ ...prev, password: '' }));
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (name === 'password') {
      setErrors(prev => ({ ...prev, password: '' }));
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
    
    // Validate password for signup
    if (authMode === 'signup' && !validatePassword(formData.password)) {
      return;
    }
    
    setIsLoading(true);

    try {
      if (authMode === 'signin') {
        await signIn(formData.email, formData.password);
      } else {
        await signUp(formData.email, formData.password, formData.userType);
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      toast({
        title: authMode === 'signin' ? "Sign in failed" : "Sign up failed",
        description: error.message || "An error occurred during authentication",
        variant: "destructive"
      });
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
                    />
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
                  {isLoading ? "Processing..." : authMode === 'signin' ? "Sign In" : "Create Account"}
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
