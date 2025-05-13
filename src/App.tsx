
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BuyerProfileSetup from "./components/buyer/BuyerProfileSetup";
import SellerProfileSetup from "./components/seller/SellerProfileSetup";
import SellerDashboard from "./components/seller/SellerDashboard";
import BuyerDashboard from "./components/buyer/BuyerDashboard";
import Auth from "./pages/Auth";
import ListingTypeSelection from "./pages/seller/ListingTypeSelection";
import PaymentPage from "./pages/seller/PaymentPage";
import SellerOnboardingForm from "./pages/seller/SellerOnboardingForm";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AuthProvider from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/seller/listing-type" element={<ProtectedRoute><ListingTypeSelection /></ProtectedRoute>} />
            <Route path="/seller/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
            <Route path="/seller/onboarding" element={<ProtectedRoute><SellerOnboardingForm /></ProtectedRoute>} />
            <Route path="/buyer/setup" element={<BuyerProfileSetup />} />
            <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
            <Route path="/seller/setup" element={<SellerProfileSetup />} />
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute requireAdmin={true}><AdminDashboard /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
