
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Check } from 'lucide-react';
import { supabaseHelper } from '@/utils/supabase-helpers';

const ListingTypeSelection: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSelectListingType = async (type: 'standard' | 'premium') => {
    setIsLoading(true);
    
    try {
      // Save the listing type selection to database
      const { error } = await supabaseHelper.from('seller_submissions')
        .upsert({
          user_id: user?.id,
          email: user?.email,
          listing_type: type,
          payment_status: type === 'standard' ? 'Not Required' : 'Pending',
          listing_status: 'Draft',
        });

      if (error) throw error;

      // Navigate to the appropriate next step
      if (type === 'premium') {
        navigate('/seller/payment');
      } else {
        // For standard/free tier, go directly to onboarding
        navigate('/seller/onboarding');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to select listing type",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container max-w-6xl px-4 py-6 md:py-12">
        <div className="text-center mb-8 mt-4">
          <h1 className="text-3xl font-bold mb-3">Choose Your Listing Package</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select the listing package that best fits your needs. 
            Premium listings receive priority placement and increased visibility to potential buyers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Standard Listing Card */}
          <Card className="border-2 hover:border-black/30 transition-colors">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Standard Listing</CardTitle>
              <CardDescription className="text-lg font-medium">Free</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>Basic exposure to marketplace</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>Standard listing position</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>Access to verified buyers</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>Basic analytics</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full py-6 text-lg"
                onClick={() => handleSelectListingType('standard')}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Select Standard"}
              </Button>
            </CardFooter>
          </Card>

          {/* Premium Listing Card */}
          <Card className="border-2 border-black bg-gray-50">
            <div className="bg-black text-white py-1 text-center text-sm font-medium">
              RECOMMENDED
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Premium Listing</CardTitle>
              <CardDescription className="text-lg font-medium">$99.99 / month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>Priority placement in search results</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>2x more visibility to potential buyers</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>Access to premium buyer network</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>Personalized support from our team</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>Advanced analytics and reporting</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>Featured in weekly newsletter</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full py-6 text-lg bg-black hover:bg-gray-800"
                onClick={() => handleSelectListingType('premium')}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Select Premium"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ListingTypeSelection;
