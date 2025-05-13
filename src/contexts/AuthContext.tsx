
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { ExtendedProfile } from '@/types/app';

type User = {
  id: string;
  email: string;
  role?: 'user' | 'admin';
  userType?: 'buyer' | 'seller';
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userType: 'buyer' | 'seller') => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for session on mount
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        const { data: userData } = await supabase.auth.getUser();
        if (userData.user) {
          // Get user profile data including role
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userData.user.id)
            .single();

          const extendedProfile = profile as unknown as ExtendedProfile;

          setUser({
            id: userData.user.id,
            email: userData.user.email || '',
            role: extendedProfile?.role || 'user',
            userType: extendedProfile?.user_type
          });
        }
      }
      setLoading(false);
    };

    checkSession();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session && event === 'SIGNED_IN') {
        // Get user profile data including role
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        const extendedProfile = profile as unknown as ExtendedProfile;

        setUser({
          id: session.user.id,
          email: session.user.email || '',
          role: extendedProfile?.role || 'user',
          userType: extendedProfile?.user_type
        });
        
        // Redirect based on user type after sign in
        if (extendedProfile?.user_type === 'seller') {
          navigate('/seller/listing-type');
        } else if (extendedProfile?.user_type === 'buyer') {
          navigate('/buyer/setup');
        } else {
          navigate('/');
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      // Get user profile to determine where to redirect
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
        
      const extendedProfile = profile as unknown as ExtendedProfile;
      
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });
      
      // Redirect based on user type
      if (extendedProfile?.user_type === 'seller') {
        navigate('/seller/listing-type');
      } else if (extendedProfile?.user_type === 'buyer') {
        navigate('/buyer/setup');
      } else {
        navigate('/');
      }
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userType: 'buyer' | 'seller') => {
    try {
      setLoading(true);
      const { error, data } = await supabase.auth.signUp({ email, password });
      if (error) throw error;

      if (data.user) {
        try {
          // Create profile with user type only - removed role field which is causing errors
          const { error: profileError } = await supabase.from('profiles').insert({
            id: data.user.id,
            user_type: userType
          });

          if (profileError) {
            console.error("Profile creation error:", profileError);
            // Continue even if profile creation fails - we'll handle it later
          }
        } catch (profileError) {
          console.error("Exception creating profile:", profileError);
          // Continue even if profile creation fails
        }
      }

      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
      });

      // Redirect based on user type
      if (userType === 'seller') {
        navigate('/seller/listing-type');
      } else {
        navigate('/buyer/setup');
      }
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      navigate('/');
      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      });
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
