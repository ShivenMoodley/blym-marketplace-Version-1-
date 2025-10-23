import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Heart, Eye, DollarSign, MapPin, Users, TrendingUp } from "lucide-react";
import { WalletConnect } from "@/components/WalletConnect";

const BuyerDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Mock data for DApp listings
  const dappListings = [
    {
      id: 1,
      name: "DeFi Lending Protocol",
      category: "DeFi",
      chains: ["Base", "Ethereum"],
      tvl: "$2.5M",
      users: "1.2K",
      askingPrice: "$900K",
      contributors: 5,
      description: "Decentralized lending protocol with proven smart contracts",
      isFavorited: false,
      isVerified: true,
    },
    {
      id: 2,
      name: "NFT Marketplace",
      category: "NFT",
      chains: ["Base", "Polygon"],
      tvl: "$850K",
      users: "3.4K",
      askingPrice: "$1.5M",
      contributors: 8,
      description: "Multi-chain NFT marketplace with active community",
      isFavorited: true,
      isVerified: true,
    },
    {
      id: 3,
      name: "DAO Governance Platform",
      category: "Infrastructure",
      chains: ["Base"],
      tvl: "$1.2M",
      users: "890",
      askingPrice: "$750K",
      contributors: 4,
      description: "Complete governance solution for DAOs with voting and treasury",
      isFavorited: false,
      isVerified: true,
    },
  ];

  const savedSearches = [
    { name: "DeFi Protocols $500K-$1M", count: 12 },
    { name: "NFT Marketplaces", count: 8 },
    { name: "Base Chain DApps", count: 15 },
  ];

  const handleRequestAccess = (dappId: number) => {
    navigate(`/confidential-access/${dappId}`);
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Buyer Dashboard</h1>
              <p className="text-gray-600">Discover DApps that match your investment criteria</p>
            </div>
            <WalletConnect />
          </div>

          {/* Search and Filters */}
          <div className="mb-8 bg-white p-6 rounded-lg shadow">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search DApps by name, category, or blockchain..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Advanced Filters
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">$500K - $1M</Badge>
              <Badge variant="secondary">DeFi</Badge>
              <Badge variant="secondary">Base Chain</Badge>
              <Button variant="ghost" size="sm" className="text-xs">
                Clear all
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Saved DApps</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Viewed This Week</span>
                    <span className="font-semibold">28</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Inquiries Sent</span>
                    <span className="font-semibold">5</span>
                  </div>
                </CardContent>
              </Card>

              {/* Saved Searches */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Saved Searches</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {savedSearches.map((search, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <span className="text-sm font-medium">{search.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {search.count}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="browse" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="browse">Browse DApps</TabsTrigger>
                  <TabsTrigger value="favorites">Favorites</TabsTrigger>
                  <TabsTrigger value="inquiries">My Inquiries</TabsTrigger>
                </TabsList>

                <TabsContent value="browse" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Available DApps</h2>
                    <span className="text-sm text-gray-600">{dappListings.length} results found</span>
                  </div>

                  <div className="space-y-6">
                    {dappListings.map((dapp) => (
                      <Card key={dapp.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-xl font-semibold">{dapp.name}</h3>
                                {dapp.isVerified && (
                                  <Badge variant="outline" className="text-green-600 border-green-600">
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <p className="text-gray-600 mb-2">{dapp.description}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  Chains: {dapp.chains.join(", ")}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  {dapp.contributors} contributors
                                </span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Heart className={`h-4 w-4 ${dapp.isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                            </Button>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="text-center p-3 bg-gray-50 rounded">
                              <div className="flex items-center justify-center mb-1">
                                <TrendingUp className="h-4 w-4 text-green-600" />
                              </div>
                              <div className="text-sm font-semibold">{dapp.tvl}</div>
                              <div className="text-xs text-gray-600">TVL</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded">
                              <div className="flex items-center justify-center mb-1">
                                <Users className="h-4 w-4 text-blue-600" />
                              </div>
                              <div className="text-sm font-semibold">{dapp.users}</div>
                              <div className="text-xs text-gray-600">Users</div>
                            </div>
                            <div className="text-center p-3 bg-blue-50 rounded">
                              <div className="text-sm font-semibold text-blue-600">{dapp.askingPrice}</div>
                              <div className="text-xs text-gray-600">Asking Price</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded">
                              <Badge variant="secondary">{dapp.category}</Badge>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <Button 
                              className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                              onClick={() => handleRequestAccess(dapp.id)}
                            >
                              Request Access
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2">
                              <Eye className="h-4 w-4" />
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="favorites">
                  <div className="text-center py-12">
                    <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
                    <p className="text-gray-600">Save DApps you're interested in to view them here</p>
                  </div>
                </TabsContent>

                <TabsContent value="inquiries">
                  <div className="text-center py-12">
                    <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No inquiries yet</h3>
                    <p className="text-gray-600">Your information requests will appear here</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BuyerDashboard;
