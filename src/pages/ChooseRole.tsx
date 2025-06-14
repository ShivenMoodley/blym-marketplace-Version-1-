
import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, ShoppingCart } from "lucide-react";

const ChooseRole: React.FC = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What brings you to Blym?
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose your path to get started with the right tools and resources for your business journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Sell a Business */}
            <Card className="relative overflow-hidden border-2 hover:border-black transition-colors cursor-pointer group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-900 transition-colors">
                  <Building2 className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl font-bold">Sell a Business</CardTitle>
                <CardDescription className="text-gray-600">
                  List your business for sale and connect with qualified buyers
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-left space-y-2 mb-6 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Professional business valuation
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Verified buyer network
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    End-to-end transaction support
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Confidential listing process
                  </li>
                </ul>
                <Link to="/choose-listing-type">
                  <Button className="w-full bg-black text-white hover:bg-gray-900 transition-smooth">
                    List My Business
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Buy a Business */}
            <Card className="relative overflow-hidden border-2 hover:border-gray-400 transition-colors cursor-pointer group opacity-60">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gray-400 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-600">Buy a Business</CardTitle>
                <CardDescription className="text-gray-500">
                  Discover and acquire businesses that match your criteria
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-left space-y-2 mb-6 text-gray-500">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                    Curated business listings
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                    Financial analysis tools
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                    Due diligence support
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                    Financing assistance
                  </li>
                </ul>
                <Button disabled className="w-full bg-gray-400 text-white cursor-not-allowed">
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600">
              Need help deciding? 
              <Link to="/" className="text-black font-medium hover:underline ml-1">
                Learn more about our platform
              </Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChooseRole;
