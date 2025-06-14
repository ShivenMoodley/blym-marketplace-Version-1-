
import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, Lock } from "lucide-react";

const Payment: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const plan = searchParams.get("plan") || "premium";

  useEffect(() => {
    // Redirect if not premium plan
    if (plan !== "premium") {
      navigate("/choose-listing-type");
    }
  }, [plan, navigate]);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Payment processed for premium plan");
    setIsProcessing(false);
    
    // Redirect to onboarding after successful payment
    navigate("/seller-onboarding?plan=premium&paid=true");
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge className="bg-yellow-500 text-black font-semibold mb-4">
              Premium Listing
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Your Premium Listing
            </h1>
            <p className="text-lg text-gray-600">
              Secure payment processing powered by industry-leading encryption
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
                <CardDescription>
                  Review your premium listing details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Premium Business Listing</span>
                    <span className="font-bold">$299.00</span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <h4 className="font-medium text-gray-900">Includes:</h4>
                    <ul className="space-y-1">
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        Featured listing placement
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        Enhanced photos & media
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        Dedicated account manager
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        90-day listing duration
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        Marketing campaign support
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-t font-bold text-lg">
                    <span>Total</span>
                    <span>$299.00</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Information
                </CardTitle>
                <CardDescription>
                  Your payment information is secure and encrypted
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Payment Method Selection */}
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CreditCard className="w-5 h-5 mr-2" />
                        <span className="font-medium">Credit/Debit Card</span>
                      </div>
                      <div className="flex space-x-2">
                        <img src="/placeholder.svg" alt="Visa" className="w-8 h-5" />
                        <img src="/placeholder.svg" alt="Mastercard" className="w-8 h-5" />
                        <img src="/placeholder.svg" alt="American Express" className="w-8 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="flex items-start p-3 bg-green-50 border border-green-200 rounded-lg">
                    <Lock className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-green-800">Secure Payment</p>
                      <p className="text-green-700">
                        Your payment is processed securely through Stripe. We never store your payment information.
                      </p>
                    </div>
                  </div>

                  {/* Payment Button */}
                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-black text-white hover:bg-gray-900 transition-smooth py-3"
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing Payment...
                      </div>
                    ) : (
                      `Pay $299.00 - Complete Purchase`
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By completing this purchase, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link to="/choose-listing-type" className="text-gray-600 hover:text-gray-900 transition-colors">
              ← Back to Listing Plans
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Payment;
