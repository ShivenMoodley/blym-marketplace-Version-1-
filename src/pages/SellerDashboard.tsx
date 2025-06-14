
import React from "react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, MessageCircle, Heart, Settings, Plus, Download, Edit, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const SellerDashboard: React.FC = () => {
  // Mock data for demonstration - in real app, this would come from user's submissions
  const userData = {
    name: "John Smith",
    email: "john.smith@example.com"
  };

  const listingData = {
    businessName: "Downtown Coffee Shop",
    category: "Food & Beverage",
    monthlyRevenue: "R 150,000",
    askingPrice: "R 325,000",
    status: "live", // draft, under_review, approved, live, rejected
    yearsInOperation: 5,
    location: "Gauteng",
    description: "Established coffee shop in prime downtown location with loyal customer base and strong profit margins."
  };

  const uploadedDocuments = [
    { name: "Revenue_Proof_2024.pdf", type: "Revenue Proof", uploadDate: "2024-12-01" },
    { name: "CIPC_Certificate.pdf", type: "CIPC Certificate", uploadDate: "2024-12-01" },
    { name: "Lease_Agreement.pdf", type: "Lease Agreement", uploadDate: "2024-12-01" },
    { name: "Staff_Overview.docx", type: "Org Chart", uploadDate: "2024-12-01" }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { variant: "secondary" as const, label: "Draft", color: "bg-gray-500" },
      under_review: { variant: "secondary" as const, label: "Under Review", color: "bg-yellow-500" },
      approved: { variant: "secondary" as const, label: "Approved", color: "bg-blue-500" },
      live: { variant: "secondary" as const, label: "Live", color: "bg-green-500" },
      rejected: { variant: "destructive" as const, label: "Rejected", color: "bg-red-500" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    
    return (
      <Badge variant={config.variant} className={`${config.color} text-white`}>
        {config.label}
      </Badge>
    );
  };

  const handleDownload = (fileName: string) => {
    // Mock download functionality
    console.log(`Downloading ${fileName}`);
    // In real app, this would trigger file download from storage
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {userData.name}
            </h1>
            <p className="text-lg text-gray-600">
              Here's the status of your business listing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Main Listing Summary Card */}
              <Card className="border-2">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl font-bold">{listingData.businessName}</CardTitle>
                      <CardDescription className="text-lg mt-1">
                        {listingData.category} • {listingData.location}
                      </CardDescription>
                    </div>
                    {getStatusBadge(listingData.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Monthly Revenue</p>
                      <p className="text-lg font-semibold text-green-600">{listingData.monthlyRevenue}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Asking Price</p>
                      <p className="text-lg font-semibold text-blue-600">{listingData.askingPrice}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Years Operating</p>
                      <p className="text-lg font-semibold">{listingData.yearsInOperation} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Location</p>
                      <p className="text-lg font-semibold">{listingData.location}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-2">Business Description</p>
                    <p className="text-gray-700">{listingData.description}</p>
                  </div>

                  <div className="flex gap-3">
                    <Link to="/seller-onboarding">
                      <Button variant="outline" className="flex items-center">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Listing
                      </Button>
                    </Link>
                    <Button variant="outline" className="flex items-center">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview Live Listing
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Documents Section */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Uploaded Documents</CardTitle>
                  <CardDescription>
                    Your submitted documents for verification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {uploadedDocuments.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500">{doc.type} • Uploaded {doc.uploadDate}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(doc.name)}
                          className="flex items-center"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Action Buttons */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/seller-onboarding" className="block">
                    <Button className="w-full bg-black text-white hover:bg-gray-900">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Listing
                    </Button>
                  </Link>
                  
                  <Button variant="outline" className="w-full" disabled>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    View Buyer Inquiries
                    <Badge variant="secondary" className="ml-2 text-xs">Coming Soon</Badge>
                  </Button>
                  
                  <Link to="/seller-onboarding">
                    <Button variant="outline" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Create New Listing
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Listing Stats */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Listing Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-2 text-gray-500" />
                        <span className="text-sm">Total Views</span>
                      </div>
                      <span className="font-semibold">1,247</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-2 text-gray-500" />
                        <span className="text-sm">Inquiries</span>
                      </div>
                      <span className="font-semibold">8</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 mr-2 text-gray-500" />
                        <span className="text-sm">Favorites</span>
                      </div>
                      <span className="font-semibold">23</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center">
            <div className="flex items-center justify-center text-gray-600">
              <HelpCircle className="w-5 h-5 mr-2" />
              <span>Need help? </span>
              <Button variant="link" className="p-0 ml-1 h-auto text-blue-600 hover:text-blue-800">
                Contact our team
              </Button>
              <span className="mx-1">or</span>
              <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800">
                visit the FAQ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SellerDashboard;
