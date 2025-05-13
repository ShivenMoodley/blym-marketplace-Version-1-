import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // In a real implementation, this would call to a Stripe/PayStack endpoint
    // For this demo, we'll simulate a successful payment
    try {
      setTimeout(async () => {
        // Update the payment status in the database
        const { error } = await supabase
          .from('seller_submissions')
          .update({ payment_status: 'Paid' } as any)
          .eq('user_id', user?.id);

        if (error) throw error;

        toast({
          title: "Payment Successful",
          description: "Your payment has been processed. You can now continue with the onboarding process.",
        });

        // Navigate to the onboarding form
        navigate('/seller/onboarding');
      }, 2000); // Simulate API call delay
    } catch (error: any) {
      toast({
        title: "Payment Failed",
        description: error.message || "There was an error processing your payment",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };

  return (
    <MainLayout>
      <div className="container max-w-3xl px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">Complete Your Payment</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            You selected the Premium Listing package. Please complete the payment to proceed.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Premium Listing Subscription</CardTitle>
            <CardDescription>$99.99 per month • Cancel anytime</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Cardholder Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Smith"
                    value={cardDetails.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="number">Card Number</Label>
                  <Input
                    id="number"
                    name="number"
                    placeholder="•••• •••• •••• ••••"
                    value={cardDetails.number}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      name="expiry"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      name="cvc"
                      placeholder="•••"
                      value={cardDetails.cvc}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full py-6 text-lg bg-black hover:bg-gray-800"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing Payment..." : "Pay $99.99 & Continue"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-gray-500">
            <p>Your payment is processed securely</p>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default PaymentPage;
