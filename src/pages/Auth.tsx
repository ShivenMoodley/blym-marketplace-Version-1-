
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"buyer" | "seller" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetPasswordMode, setResetPasswordMode] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      if (resetPasswordMode) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + '/auth?reset=true',
        });
        
        if (error) throw error;
        
        setResetEmailSent(true);
        toast.success("Password reset email sent. Please check your inbox.");
      } else if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          if (error.message.includes("Email not confirmed")) {
            throw new Error("Please verify your email address before logging in. Check your inbox for a verification link.");
          } else {
            throw error;
          }
        }
        
        const { data: profile } = await supabase
          .from('profiles')
          .select('user_type')
          .single();
          
        navigate(profile?.user_type === 'buyer' ? '/buyer/dashboard' : '/seller/dashboard');
      } else {
        if (!userType) {
          setError("Please select if you're a buyer or seller");
          setLoading(false);
          return;
        }

        const { error: signUpError, data } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (signUpError) throw signUpError;
        
        if (data?.user) {
          try {
            await supabase.rpc('create_profile_for_user', {
              user_id: data.user.id,
              user_type: userType as 'buyer' | 'seller'
            });
            
            toast.success("Account created! Please check your email to verify your account.");
            setIsLogin(true);
          } catch (profileError) {
            console.error('Profile creation error:', profileError);
            toast.success("Account created but profile setup had an issue. Please check your email to verify your account.");
            setIsLogin(true);
          }
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError(error.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = () => {
    setResetPasswordMode(true);
    setError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {resetPasswordMode 
              ? "Reset your password" 
              : isLogin 
                ? "Sign in to your account" 
                : "Create your account"}
          </h2>
          {resetPasswordMode && resetEmailSent && (
            <p className="mt-2 text-sm text-green-600">
              Check your email for the reset link
            </p>
          )}
        </div>
        
        {error && (
          <Alert variant="destructive" className="my-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleAuth}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            {!resetPasswordMode && (
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required={!resetPasswordMode}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}
            
            {!isLogin && !resetPasswordMode && (
              <div className="space-y-3">
                <Label>I am a:</Label>
                <RadioGroup
                  value={userType || ""}
                  onValueChange={(value) => setUserType(value as "buyer" | "seller")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="buyer" id="buyer" />
                    <Label htmlFor="buyer">Buyer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="seller" id="seller" />
                    <Label htmlFor="seller">Seller</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
          </div>

          <div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading 
                ? "Processing..." 
                : resetPasswordMode 
                  ? "Send reset link" 
                  : isLogin 
                    ? "Sign in" 
                    : "Sign up"}
            </Button>
          </div>
        </form>
        
        <div className="text-center space-y-2">
          {isLogin && !resetPasswordMode && (
            <button
              type="button"
              onClick={handleResetPassword}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Forgot your password?
            </button>
          )}
          
          <button
            type="button"
            onClick={() => {
              if (resetPasswordMode) {
                setResetPasswordMode(false);
              } else {
                setIsLogin(!isLogin);
              }
              setError(null);
              setResetEmailSent(false);
            }}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            {resetPasswordMode 
              ? "Back to sign in" 
              : isLogin 
                ? "Need an account? Sign up" 
                : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
