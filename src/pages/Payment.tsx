import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, Lock, Wallet } from "lucide-react";

const Payment: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'basepay'>('stripe');
  const plan = searchParams.get("plan") || "premium";

  useEffect(() => {
    if (plan !== "premium") {
      navigate("/choose-listing-type");
    }
  }, [plan, navigate]);

  const handlePayment = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(`Payment processed via ${paymentMethod} for premium plan`);
    setIsProcessing(false);
    navigate("/seller-onboarding?plan=premium&paid=true");
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge className="bg-yellow-500 text-black font-semibold mb-4">
              Premium dApp Listing
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Your Premium dApp Listing
            </h1>
            <p className="text-lg text-gray-600">
              Secure payment processing — pay with card or on-chain via Base Pay
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
                <CardDescription>Review your premium dApp listing details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Premium dApp Listing</span>
                    <span className="font-bold">$299.00 USDC</span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <h4 className="font-medium text-gray-900">Includes:</h4>
                    <ul className="space-y-1">
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        Featured dApp listing placement
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        On-chain analytics dashboard
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
                    <span>$299.00 USDC</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Method
                </CardTitle>
                <CardDescription>
                  Choose your preferred payment method
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Payment Method Selection */}
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${paymentMethod === 'stripe' ? 'border-black bg-gray-50' : 'border-gray-200'}`}
                    onClick={() => setPaymentMethod('stripe')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CreditCard className="w-5 h-5 mr-2" />
                        <span className="font-medium">Credit/Debit Card (Stripe)</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${paymentMethod === 'stripe' ? 'bg-black border-black' : 'border-gray-300'}`} />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Pay with Visa, Mastercard, or Amex</p>
                  </div>

                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${paymentMethod === 'basepay' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}
                    onClick={() => setPaymentMethod('basepay')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Wallet className="w-5 h-5 mr-2 text-blue-600" />
                        <span className="font-medium">Base Pay (On-Chain USDC)</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${paymentMethod === 'basepay' ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`} />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Pay directly with USDC on Base network</p>
                  </div>

                  {/* Security Notice */}
                  <div className="flex items-start p-3 bg-green-50 border border-green-200 rounded-lg">
                    <Lock className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-green-800">Secure Payment</p>
                      <p className="text-green-700">
                        {paymentMethod === 'stripe'
                          ? 'Your payment is processed securely through Stripe. We never store your payment information.'
                          : 'On-chain payments are verified on Base. Transaction is confirmed via smart contract.'}
                      </p>
                    </div>
                  </div>

                  {/* Payment Button */}
                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className={`w-full py-3 transition-smooth ${paymentMethod === 'basepay' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-black text-white hover:bg-gray-900'}`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing Payment...
                      </div>
                    ) : paymentMethod === 'basepay' ? (
                      `Pay 299 USDC via Base Pay`
                    ) : (
                      `Pay $299.00 — Complete Purchase`
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
