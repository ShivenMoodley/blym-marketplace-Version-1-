import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowLeft, ChevronDown, TrendingUp, DollarSign, Users, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ConfidentialAccessRequest: React.FC = () => {
  const { listingId } = useParams<{ listingId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isNDAOpen, setIsNDAOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const listing = {
    id: listingId || "1",
    category: "DeFi",
    revenueRange: "$50K – $100K USDC/mo",
    tvlRange: "$2M – $3M",
    summary: "Audited decentralized lending protocol with recurring protocol revenue, on-chain governance, and active user base across Base and Ethereum. Live for 18+ months.",
    contributors: 8,
    chains: ["Base", "Ethereum"],
    tags: ["Audited", "Growing TVL"],
    protocolName: "████████ Protocol",
    domain: "████████.xyz",
  };

  const handleAcceptNDA = async () => {
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(`Buyer approved for access to listing ${listingId}`);
      toast({ title: "NDA Accepted Successfully", description: "You now have access to the full protocol details." });
      navigate(`/deal-room/${listingId}`);
    } catch (error) {
      toast({ title: "Error", description: "Failed to process NDA acceptance. Please try again.", variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Button variant="ghost" onClick={() => navigate("/buyer-dashboard")} className="mb-4 flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Request Access to Confidential Protocol Info
            </h1>
            <p className="text-gray-600">
              Before unlocking full details, please accept the NDA.
            </p>
          </div>

          {/* Listing Preview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Protocol Preview</CardTitle>
              <CardDescription>Limited information available without NDA acceptance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-400 blur-sm select-none">{listing.protocolName}</h3>
                  <p className="text-sm text-gray-500 mt-1">Protocol name hidden until NDA acceptance</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{listing.category}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{listing.chains.join(", ")}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="font-semibold">{listing.revenueRange}</div>
                    <div className="text-xs text-gray-600">Protocol Revenue</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="font-semibold">{listing.tvlRange}</div>
                    <div className="text-xs text-gray-600">TVL Range</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="font-semibold">{listing.contributors}</div>
                    <div className="text-xs text-gray-600">Contributors</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Protocol Summary</h4>
                  <p className="text-gray-700">{listing.summary}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {listing.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-green-600 border-green-600">{tag}</Badge>
                  ))}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Additional Information Available</h4>
                  <p className="text-sm text-yellow-700">
                    Protocol name, smart contract addresses, token details, treasury information, and confidential documents will be available after NDA acceptance.
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
                    <p className="text-gray-700">By accepting this NDA, you agree to:</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Keep all confidential protocol information strictly private</li>
                      <li>Not share smart contract addresses, token details, or treasury information with third parties</li>
                      <li>Use the information solely for acquisition evaluation purposes</li>
                      <li>Return or destroy all materials if requested</li>
                      <li>Not fork, copy, or deploy competing protocols using disclosed information for 12 months</li>
                    </ul>

                    <h4 className="font-semibold mt-4">Full Agreement</h4>
                    <div className="bg-gray-50 p-4 rounded border text-sm text-gray-600 max-h-60 overflow-y-auto">
                      <p><strong>CONFIDENTIAL INFORMATION AGREEMENT — WEB3 PROTOCOL ACQUISITION</strong></p>
                      <p className="mt-2">This Confidential Information Agreement ("Agreement") is entered into between the undersigned buyer and the protocol seller for the purpose of evaluating a potential dApp/protocol acquisition.</p>
                      <p className="mt-2"><strong>1. Confidential Information:</strong> All information disclosed, including smart contract source code, deployment addresses, token allocation, treasury wallet addresses, governance keys, admin access credentials, and proprietary protocol logic.</p>
                      <p className="mt-2"><strong>2. Obligations:</strong> The recipient agrees to maintain strict confidentiality and use the information solely for evaluation purposes. No forking, replication, or competitive deployment.</p>
                      <p className="mt-2"><strong>3. Term:</strong> This agreement remains in effect for 24 months or until terminated by mutual consent.</p>
                      <p className="mt-2"><strong>4. Remedies:</strong> Breach of this agreement may result in irreparable harm and legal action, including on-chain enforcement measures.</p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>

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
