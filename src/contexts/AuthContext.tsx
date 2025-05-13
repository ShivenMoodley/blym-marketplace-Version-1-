
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

  // Setup auth subscription on mount
  useEffect(() => {
    // First set up the auth listener to avoid missing auth events
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        try {
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
          
          // Show success toast for login
          if (event === 'SIGNED_IN') {
            toast({
              title: "Welcome back!",
              description: "You've successfully signed in."
            });
            
            // Redirect immediately based on user type
            if (extendedProfile?.user_type === 'seller') {
              navigate('/seller/listing-type');
            } else if (extendedProfile?.user_type === 'buyer') {
              navigate('/buyer/setup');
            } else {
              navigate('/');
            }
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setLoading(false);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setLoading(false);
      }
    });

    // Then check for session on mount
    const checkSession = async () => {
      try {
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
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      // Get user profile data to determine where to redirect
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
          
        const extendedProfile = profile as unknown as ExtendedProfile;
        
        // Redirection will be handled by onAuthStateChange
      } catch (profileError) {
        console.error("Error fetching user profile during sign in:", profileError);
      }
    } catch (error: any) {
      console.error("Sign in error:", error);
      setLoading(false); // Make sure to set loading to false on error
      throw error;
    }
  };

  const signUp = async (email: string, password: string, userType: 'buyer' | 'seller') => {
    try {
      setLoading(true);
      const { error, data } = await supabase.auth.signUp({ email, password });
      if (error) throw error;

      if (data.user) {
        try {
          // Create profile with user type
          const { error: profileError } = await supabase.from('profiles').insert({
            id: data.user.id,
            user_type: userType
          });

          if (profileError) {
            console.error("Profile creation error:", profileError);
            throw profileError;
          }
          
          // Set user manually since this isn't a sign-in event
          setUser({
            id: data.user.id,
            email: data.user.email || '',
            role: 'user',
            userType: userType
          });
          
          // Show successful signup toast
          toast({
            title: "Account created successfully",
            description: "You can now sign in with your credentials.",
          });
          
          // Redirect based on user type immediately
          if (userType === 'seller') {
            navigate('/seller/listing-type');
          } else {
            navigate('/buyer/setup');
          }
        } catch (profileError) {
          console.error("Exception creating profile:", profileError);
          // Continue even if profile creation fails
        }
      }
    } catch (error: any) {
      console.error("Sign up error:", error);
      setLoading(false); // Make sure to set loading to false on error
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
      
      // We don't need to set user to null here as it will be done by onAuthStateChange
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
