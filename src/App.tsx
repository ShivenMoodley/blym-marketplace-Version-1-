
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayout';
import WaitlistPage from './pages/WaitlistPage';
import Auth from './pages/Auth';
import AuthProvider from './contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import ListingTypeSelection from './pages/seller/ListingTypeSelection';
import SellerOnboardingForm from './pages/seller/SellerOnboardingForm';
import PaymentPage from './pages/seller/PaymentPage';
import BuyerSetup from './pages/buyer/BuyerSetup';
import BuyerDashboard from './pages/buyer/BuyerDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainLayout><Index /></MainLayout>} />
          <Route path="/waitlist-data" element={<MainLayout><WaitlistPage /></MainLayout>} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Seller routes */}
          <Route path="/seller/listing-type" element={
            <ProtectedRoute>
              <MainLayout>
                <ListingTypeSelection />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/seller/onboarding" element={
            <ProtectedRoute>
              <MainLayout>
                <SellerOnboardingForm />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/seller/payment" element={
            <ProtectedRoute>
              <MainLayout>
                <PaymentPage />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          {/* Buyer routes */}
          <Route path="/buyer/setup" element={
            <ProtectedRoute>
              <MainLayout>
                <BuyerSetup />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/buyer/dashboard" element={
            <ProtectedRoute>
              <MainLayout>
                <BuyerDashboard />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
