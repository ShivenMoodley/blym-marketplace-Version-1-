
import React from "react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, MessageCircle, Heart, Settings, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { WalletConnect } from "@/components/WalletConnect";

const SellerDashboard: React.FC = () => {
  // Mock data for demonstration
  const listingStats = {
    views: 1247,
    inquiries: 8,
    favorites: 23,
  };

  const recentInquiries = [
    {
      id: 1,
      buyerName: "Sarah Johnson",
      message: "Interested in learning more about the financial history...",
      date: "2 hours ago",
      status: "unread"
    },
    {
      id: 2,
      buyerName: "Michael Chen",
      message: "Would like to schedule a call to discuss...",
      date: "1 day ago",
      status: "replied"
    },
    {
      id: 3,
      buyerName: "David Wilson",
      message: "Can you provide more details about the lease terms?",
      date: "3 days ago",
      status: "unread"
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Seller Dashboard
              </h1>
              <p className="text-lg text-gray-600">
                Manage your DApp listings and track buyer interest
              </p>
            </div>
            <div className="flex gap-3">
              <WalletConnect />
              <Link to="/seller-onboarding">
                <Button className="bg-black text-white hover:bg-gray-900 transition-smooth">
                  <Plus className="w-4 h-4 mr-2" />
                  New Listing
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{listingStats.views.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Inquiries</CardTitle>
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{listingStats.inquiries}</div>
                <p className="text-xs text-muted-foreground">
                  3 unread messages
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Favorites</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{listingStats.favorites}</div>
                <p className="text-xs text-muted-foreground">
                  Saved by buyers
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Active Listings */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Active Listings</CardTitle>
                <CardDescription>
                  Your currently published DApp listings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">DeFi Lending Protocol</h3>
                      <Badge className="bg-yellow-500 text-black">Verified</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">DeFi • Base, Ethereum</p>
                    <p className="text-lg font-bold text-green-600 mb-3">$900,000 USDC</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Listed 15 days ago</span>
                      <span>TVL: $2.5M</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">
                        <Settings className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3 mr-1" />
                        Preview
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Inquiries */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Recent Inquiries</CardTitle>
                <CardDescription>
                  Messages from potential buyers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium">{inquiry.buyerName}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant={inquiry.status === "unread" ? "destructive" : "secondary"}>
                            {inquiry.status}
                          </Badge>
                          <span className="text-xs text-gray-500">{inquiry.date}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {inquiry.message}
                      </p>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full">
                    View All Messages
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="border-2 mt-8">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
              <CardDescription>
                Common tasks to manage your listings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
                  <Plus className="w-6 h-6 mb-2" />
                  <span>Create New Listing</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
                  <MessageCircle className="w-6 h-6 mb-2" />
                  <span>Respond to Inquiries</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
                  <Settings className="w-6 h-6 mb-2" />
                  <span>Update Profile</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default SellerDashboard;
