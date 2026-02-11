
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
              Choose your path to get started with the right tools for your Web3 M&A journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Sell a Business */}
            <Card className="relative overflow-hidden border-2 hover:border-black transition-colors cursor-pointer group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-900 transition-colors">
                  <Building2 className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl font-bold">Sell a dApp / Protocol</CardTitle>
                <CardDescription className="text-gray-600">
                  List your dApp, protocol, or digital IP and connect with qualified buyers
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-left space-y-2 mb-6 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    On-chain valuation & analytics
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Verified buyer & investor network
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Crypto-native escrow & settlement
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Confidential deal rooms
                  </li>
                </ul>
                <Link to="/choose-listing-type">
                  <Button className="w-full bg-black text-white hover:bg-gray-900 transition-smooth">
                    List My dApp
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Buy a Business */}
            <Card className="relative overflow-hidden border-2 hover:border-blue-500 transition-colors cursor-pointer group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-700 transition-colors">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl font-bold">Acquire a dApp / Protocol</CardTitle>
                <CardDescription className="text-gray-600">
                  Discover and acquire Web3 projects that match your criteria
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-left space-y-2 mb-6 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Curated dApp & protocol listings
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    On-chain due diligence tools
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Smart contract risk analysis
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Stablecoin-based settlement
                  </li>
                </ul>
                <Link to="/buyer-signup">
                  <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-smooth">
                    Browse dApps
                  </Button>
                </Link>
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
