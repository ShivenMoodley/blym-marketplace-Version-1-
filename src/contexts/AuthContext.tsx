
import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockAuth } from '@/utils/mockAuth';
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
    // Set up auth listener
    const { subscription } = mockAuth.onAuthStateChange((user) => {
      if (user) {
        setUser(user);
        
        // Show success toast for login
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in."
        });
        
        // Redirect based on user type
        if (user.userType === 'seller') {
          navigate('/seller/listing-type');
        } else if (user.userType === 'buyer') {
          navigate('/buyer/setup');
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Check for existing session
    const checkSession = async () => {
      try {
        const { data } = await mockAuth.getSession();
        if (data.session) {
          const { data: userData } = await mockAuth.getUser();
          if (userData.user) {
            setUser(userData.user);
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
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      await mockAuth.signIn(email, password);
      // Auth listener will handle the rest
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive"
      });
      setLoading(false);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, userType: 'buyer' | 'seller') => {
    try {
      setLoading(true);
      await mockAuth.signUp(email, password, userType);
      
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
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive"
      });
      setLoading(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await mockAuth.signOut();
      
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
