
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/layouts/MainLayout';
import { Alert, AlertDescription } from '@/components/ui/alert';

const BuyerDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Buyer Dashboard</h1>
        
        <Alert className="mb-6">
          <AlertDescription>
            Welcome to your buyer dashboard, {user?.email}!
          </AlertDescription>
        </Alert>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-3">Find Businesses</h2>
            <p className="text-gray-600 mb-4">Explore available businesses that match your criteria.</p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-3">Saved Listings</h2>
            <p className="text-gray-600 mb-4">View businesses you've saved for later.</p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-3">Messages</h2>
            <p className="text-gray-600 mb-4">Communicate with sellers.</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BuyerDashboard;
