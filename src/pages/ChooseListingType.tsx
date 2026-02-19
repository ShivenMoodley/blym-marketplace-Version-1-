import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap } from "lucide-react";

const ChooseListingType: React.FC = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your dApp Listing Plan
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select the plan that best fits your dApp or protocol sale goals. Both options include our core listing features with premium upgrades available.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Standard Listing */}
            <Card className="relative border-2 hover:border-gray-300 transition-colors">
              <CardHeader className="text-center pb-6">
                <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl font-bold">Standard Listing</CardTitle>
                <CardDescription className="text-gray-600 mb-4">
                  Perfect for getting started with all essential features
                </CardDescription>
                <div className="text-3xl font-bold text-gray-900">
                  Free
                  <span className="text-base font-normal text-gray-600 ml-2">to start</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Basic dApp listing</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Inquiry form for buyers</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Standard search visibility</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Email support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">30-day listing duration</span>
                  </li>
                </ul>
                <Link to="/seller-onboarding?plan=standard">
                  <Button className="w-full bg-gray-900 text-white hover:bg-gray-800 transition-smooth">
                    Start Standard Listing
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Premium Listing */}
            <Card className="relative border-2 border-black bg-gradient-to-b from-gray-900 to-black text-white">
              <div className="absolute top-4 right-4">
                <Badge className="bg-yellow-500 text-black font-semibold">
                  <Star className="w-3 h-3 mr-1" />
                  Popular
                </Badge>
              </div>
              <CardHeader className="text-center pb-6">
                <div className="w-12 h-12 bg-yellow-500 text-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">Premium dApp Listing</CardTitle>
                <CardDescription className="text-gray-300 mb-4">
                  Maximum exposure and on-chain analytics for serious sellers
                </CardDescription>
                <div className="text-3xl font-bold text-white">
                  $299 USDC
                  <span className="text-base font-normal text-gray-300 ml-2">one-time</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-100">Featured dApp listing</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-100">Priority search placement</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-100">On-chain analytics dashboard</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-100">Dedicated account manager</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-100">90-day listing duration</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-100">Marketing campaign support</span>
                  </li>
                </ul>
                <Link to="/payment?plan=premium">
                  <Button className="w-full bg-yellow-500 text-black hover:bg-yellow-400 transition-smooth font-semibold">
                    Get Premium dApp Listing
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600">
              Questions about our plans?
              <Link to="/" className="text-black font-medium hover:underline ml-1">
                Contact our team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChooseListingType;
