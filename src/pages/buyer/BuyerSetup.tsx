
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import BuyerProfileSetup from '@/components/buyer/BuyerProfileSetup';

const BuyerSetup: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Complete Your Buyer Profile</h1>
      <BuyerProfileSetup />
    </div>
  );
};

export default BuyerSetup;
