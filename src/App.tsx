import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThirdwebProvider } from "thirdweb/react";
import { WalletProvider } from "@/contexts/WalletContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ChooseRole from "./pages/ChooseRole";
import ChooseListingType from "./pages/ChooseListingType";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Payment from "./pages/Payment";
import SellerOnboarding from "./pages/SellerOnboarding";
import SellerDashboard from "./pages/SellerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import BuyerSignUp from "./pages/BuyerSignUp";
import BuyerProfileSetup from "./pages/BuyerProfileSetup";
import BuyerDashboard from "./pages/BuyerDashboard";
import ConfidentialAccessRequest from "./pages/ConfidentialAccessRequest";
import DealRoom from "./pages/DealRoom";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThirdwebProvider>
      <WalletProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/choose-role" element={<ChooseRole />} />
                <Route path="/choose-listing-type" element={<ChooseListingType />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/seller-onboarding" element={<SellerOnboarding />} />
                <Route path="/seller-dashboard" element={
                  <ProtectedRoute requiredRole="seller">
                    <SellerDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin-dashboard" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/buyer-signup" element={<BuyerSignUp />} />
                <Route path="/buyer-profile-setup" element={<BuyerProfileSetup />} />
                <Route path="/buyer-dashboard" element={
                  <ProtectedRoute requiredRole="buyer">
                    <BuyerDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/confidential-access/:listingId" element={
                  <ProtectedRoute>
                    <ConfidentialAccessRequest />
                  </ProtectedRoute>
                } />
                <Route path="/deal-room/:listingId" element={
                  <ProtectedRoute>
                    <DealRoom />
                  </ProtectedRoute>
                } />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </WalletProvider>
    </ThirdwebProvider>
  </QueryClientProvider>
);

export default App;
