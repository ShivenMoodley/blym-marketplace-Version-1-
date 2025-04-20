
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BuyerProfileSetup from "./components/buyer/BuyerProfileSetup";
import SellerProfileSetup from "./components/seller/SellerProfileSetup";
import SellerDashboard from "./components/seller/SellerDashboard";
import BuyerDashboard from "./components/buyer/BuyerDashboard";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

// Route protection component
const ProtectedRoute = ({ children, userType }: { children: React.ReactNode, userType?: "buyer" | "seller" }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      
      if (session) {
        const { data } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', session.user.id)
          .single();
        
        setProfile(data);
      }
      
      setLoading(false);
    };
    
    checkSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate('/auth');
      }
    });
    
    return () => subscription.unsubscribe();
  }, [navigate]);
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!session) {
    return <Navigate to="/auth" />;
  }
  
  if (userType && profile?.user_type !== userType) {
    return <Navigate to={`/${profile?.user_type || 'auth'}/dashboard`} />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/buyer/setup" element={
            <ProtectedRoute userType="buyer">
              <BuyerProfileSetup />
            </ProtectedRoute>
          } />
          <Route path="/buyer/dashboard" element={
            <ProtectedRoute userType="buyer">
              <BuyerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/seller/setup" element={
            <ProtectedRoute userType="seller">
              <SellerProfileSetup />
            </ProtectedRoute>
          } />
          <Route path="/seller/dashboard" element={
            <ProtectedRoute userType="seller">
              <SellerDashboard />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
