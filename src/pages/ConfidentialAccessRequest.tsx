
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowLeft, ChevronDown, TrendingUp, DollarSign, Users, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ConfidentialAccessRequest: React.FC = () => {
  const { listingId } = useParams<{ listingId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isNDAOpen, setIsNDAOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock data for the listing - in a real app, this would be fetched based on listingId
  const listing = {
    id: listingId || "1",
    category: "Professional Services",
    revenueRange: "$750K - $1M",
    profitRange: "$180K - $220K",
    summary: "Well-established digital marketing agency with recurring clients and strong growth potential. The business has been operating for 5+ years with a proven track record.",
    teamSize: 8,
    location: "Austin, TX",
    tags: ["New Listing", "Growing Revenue"],
    // Blurred/hidden fields
    businessName: "████████ Marketing Agency",
    domain: "████████.com",
  };

  const handleAcceptNDA = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate API call to store buyer access approval
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log(`Buyer approved for access to listing ${listingId}`);
      
      toast({
        title: "NDA Accepted Successfully",
        description: "You now have access to the full listing details.",
      });
      
      // Redirect to deal room
      navigate(`/deal-room/${listingId}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process NDA acceptance. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/buyer-dashboard")}
              className="mb-4 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Request Access to Confidential Listing Info
            </h1>
            <p className="text-gray-600">
              Before unlocking full details, please accept the NDA.
            </p>
          </div>

          {/* Listing Preview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Listing Preview</CardTitle>
              <CardDescription>
                Limited information available without NDA acceptance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Blurred Business Name */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-400 blur-sm select-none">
                    {listing.businessName}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Business name hidden until NDA acceptance</p>
                </div>

                {/* Available Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{listing.category}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{listing.location}</span>
                  </div>
                </div>

                {/* Financial Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="font-semibold">{listing.revenueRange}</div>
                    <div className="text-xs text-gray-600">Revenue Range</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="font-semibold">{listing.profitRange}</div>
                    <div className="text-xs text-gray-600">Profit Range</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="font-semibold">{listing.teamSize}</div>
                    <div className="text-xs text-gray-600">Team Size</div>
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <h4 className="font-semibold mb-2">Business Summary</h4>
                  <p className="text-gray-700">{listing.summary}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {listing.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-green-600 border-green-600">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Blurred Information Notice */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Additional Information Available</h4>
                  <p className="text-sm text-yellow-700">
                    Business name, contact details, financial documents, and other confidential information 
                    will be available after NDA acceptance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* NDA Section */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <Collapsible open={isNDAOpen} onOpenChange={setIsNDAOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                  <h3 className="text-lg font-semibold">Non-Disclosure Agreement (NDA)</h3>
                  <ChevronDown className={`h-5 w-5 transition-transform ${isNDAOpen ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 space-y-4">
                  <div className="prose prose-sm max-w-none">
                    <h4 className="font-semibold">NDA Summary</h4>
                    <p className="text-gray-700">
                      By accepting this NDA, you agree to:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Keep all confidential information strictly private</li>
                      <li>Not share business details with third parties without consent</li>
                      <li>Use the information solely for evaluation purposes</li>
                      <li>Return or destroy all materials if requested</li>
                      <li>Not compete directly with the business for 12 months</li>
                    </ul>
                    
                    <h4 className="font-semibold mt-4">Full Agreement</h4>
                    <div className="bg-gray-50 p-4 rounded border text-sm text-gray-600 max-h-60 overflow-y-auto">
                      <p>
                        <strong>CONFIDENTIAL INFORMATION AGREEMENT</strong>
                      </p>
                      <p className="mt-2">
                        This Confidential Information Agreement ("Agreement") is entered into between the undersigned buyer 
                        and the business seller/broker for the purpose of evaluating a potential business acquisition.
                      </p>
                      <p className="mt-2">
                        <strong>1. Confidential Information:</strong> All information disclosed, including but not limited to 
                        financial records, customer lists, business operations, trade secrets, and proprietary information.
                      </p>
                      <p className="mt-2">
                        <strong>2. Obligations:</strong> The recipient agrees to maintain strict confidentiality and use 
                        the information solely for evaluation purposes.
                      </p>
                      <p className="mt-2">
                        <strong>3. Term:</strong> This agreement remains in effect for 24 months or until terminated by 
                        mutual consent.
                      </p>
                      <p className="mt-2">
                        <strong>4. Remedies:</strong> Breach of this agreement may result in irreparable harm and legal action.
                      </p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>

          {/* Action Button */}
          <div className="text-center">
            <Button
              onClick={handleAcceptNDA}
              disabled={isProcessing}
              className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 text-lg font-semibold"
              size="lg"
            >
              {isProcessing ? "Processing..." : "I Agree to the NDA & Request Access"}
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ConfidentialAccessRequest;
