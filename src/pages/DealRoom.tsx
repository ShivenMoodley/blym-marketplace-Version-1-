import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, Download, MessageCircle, FileText, TrendingUp, DollarSign, Users, Target, Send, Shield, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loiFormSchema = z.object({
  proposedValuation: z.string().min(1, "Proposed valuation is required"),
  dealStructure: z.string().min(1, "Deal structure is required"),
  notesToSeller: z.string().min(10, "Please provide at least 10 characters in notes"),
});

type LOIFormValues = z.infer<typeof loiFormSchema>;

const DealRoom: React.FC = () => {
  const { listingId } = useParams<{ listingId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [message, setMessage] = useState("");

  const form = useForm<LOIFormValues>({
    resolver: zodResolver(loiFormSchema),
    defaultValues: {
      proposedValuation: "",
      dealStructure: "",
      notesToSeller: "",
    },
  });

  // Mock Web3 protocol data
  const listing = {
    id: listingId || "1",
    protocolName: "LendFlow Protocol",
    category: "DeFi",
    protocolRevenue: "$85,000 USDC/mo",
    tvl: "$2.5M",
    dau: "1,200",
    mau: "8,500",
    askingPrice: "950,000 USDC",
    contributors: 8,
    chains: ["Base", "Ethereum"],
    tags: ["DeFi", "Lending", "Audited"],
    about: "LendFlow is a decentralized lending protocol built on Base and Ethereum, enabling permissionless borrowing and lending of crypto assets. The protocol has been live for 18 months with audited smart contracts, a growing TVL, and consistent protocol revenue from origination fees.",
    sellingPoints: [
      "Recurring protocol revenue with 95% user retention rate",
      "Audited smart contracts (CertiK & Trail of Bits)",
      "Immutable governance with on-chain voting",
      "Minimal admin key dependency — fully decentralized",
      "Scalable to additional EVM chains"
    ],
    reasonForSelling: "The founding team is pivoting to a new L2 infrastructure project and wants to ensure LendFlow continues to grow under aligned new ownership.",
    growthPotential: "Strong opportunity to expand to Arbitrum and Optimism, add new lending markets, and launch a governance token for additional revenue streams.",
    buyerCriteria: "Looking for experienced DeFi operators or funds who understand lending protocols and can maintain the protocol's security standards.",
    documents: [
      { name: "Smart Contract Audit Report (CertiK)", type: "PDF", size: "3.2 MB" },
      { name: "Tokenomics & Vesting Schedule", type: "PDF", size: "1.1 MB" },
      { name: "Protocol Revenue Dashboard", type: "PDF", size: "890 KB" },
      { name: "On-Chain Analytics Summary", type: "PDF", size: "1.5 MB" },
      { name: "Treasury & Multisig Wallet Overview", type: "PDF", size: "720 KB" },
      { name: "Governance Framework", type: "PDF", size: "950 KB" }
    ],
    escrow: {
      status: "Active",
      squadsWallet: "0x7a3d...f92e",
      depositedAmount: "50,000 USDC",
      milestones: [
        { name: "Due Diligence Deposit", amount: "50,000 USDC", status: "Completed" },
        { name: "Smart Contract Transfer", amount: "450,000 USDC", status: "Pending" },
        { name: "Final Settlement", amount: "450,000 USDC", status: "Pending" },
      ]
    }
  };

  const hasNDAAccess = true;

  React.useEffect(() => {
    if (!hasNDAAccess) {
      navigate(`/confidential-access/${listingId}`);
    }
  }, [hasNDAAccess, listingId, navigate]);

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast({ title: "Error", description: "Please enter a message before sending.", variant: "destructive" });
      return;
    }
    console.log(`Message sent to seller for listing ${listingId}:`, message);
    toast({ title: "Message Sent", description: "Your message has been sent to the seller." });
    setMessage("");
    setIsMessageDialogOpen(false);
  };

  const handleDownload = (documentName: string) => {
    console.log(`Downloading: ${documentName}`);
    toast({ title: "Download Started", description: `Downloading ${documentName}...` });
  };

  const onSubmitLOI = (values: LOIFormValues) => {
    console.log(`LOI submitted for listing ${listingId}:`, values);
    toast({ title: "LOI Submitted", description: "Your Letter of Intent has been sent to the seller." });
    form.reset();
  };

  if (!hasNDAAccess) return null;

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" onClick={() => navigate("/buyer-dashboard")} className="mb-4 flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{listing.protocolName}</h1>
              <Badge variant="secondary" className="text-sm">{listing.category}</Badge>
            </div>
            <p className="text-gray-600">Complete protocol details, on-chain metrics, and documentation</p>
          </div>

          {/* Overview Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Protocol Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-lg font-semibold">{listing.protocolRevenue}</div>
                  <div className="text-sm text-gray-600">Protocol Revenue</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-lg font-semibold">{listing.tvl}</div>
                  <div className="text-sm text-gray-600">Total Value Locked</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-purple-600">{listing.askingPrice}</div>
                  <div className="text-sm text-gray-600">Asking Price</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="text-lg font-semibold">{listing.dau} / {listing.mau}</div>
                  <div className="text-sm text-gray-600">DAU / MAU</div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex flex-wrap gap-2">
                {listing.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-blue-600 border-blue-600">{tag}</Badge>
                ))}
                {listing.chains.map((chain, index) => (
                  <Badge key={`chain-${index}`} variant="secondary">{chain}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader><CardTitle>About the Protocol</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{listing.about}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Key Selling Points</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {listing.sellingPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Reason for Selling</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{listing.reasonForSelling}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Growth Potential</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{listing.growthPotential}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Preferred Buyer Criteria</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{listing.buyerCriteria}</p>
                </CardContent>
              </Card>

              {/* Escrow Status */}
              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    Escrow Status (Squads Multisig)
                  </CardTitle>
                  <CardDescription>Funds held in admin-controlled Squads wallet</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4 p-3 bg-blue-50 rounded-lg">
                    <Wallet className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-mono">{listing.escrow.squadsWallet}</span>
                    <Badge variant="secondary" className="ml-auto">{listing.escrow.status}</Badge>
                  </div>
                  <div className="space-y-3">
                    {listing.escrow.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium text-sm">{milestone.name}</div>
                          <div className="text-xs text-gray-500">{milestone.amount}</div>
                        </div>
                        <Badge variant={milestone.status === 'Completed' ? 'default' : 'secondary'}>
                          {milestone.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Documents
                  </CardTitle>
                  <CardDescription>Download confidential protocol documents</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {listing.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{doc.name}</div>
                        <div className="text-xs text-gray-500">{doc.type} • {doc.size}</div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleDownload(doc.name)} className="ml-2">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader><CardTitle>Actions</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contact Seller
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Send Message to Seller</DialogTitle>
                        <DialogDescription>Send a secure message to the protocol owner</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Textarea placeholder="Type your message here..." value={message} onChange={(e) => setMessage(e.target.value)} rows={4} />
                        <div className="flex gap-2">
                          <Button onClick={handleSendMessage} className="flex-1">Send Message</Button>
                          <Button variant="outline" onClick={() => setIsMessageDialogOpen(false)}>Cancel</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              {/* LOI Submission */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    Submit Letter of Intent
                  </CardTitle>
                  <CardDescription>Submit a formal offer for this protocol</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitLOI)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="proposedValuation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Proposed Valuation (USDC)</FormLabel>
                            <FormControl>
                              <input
                                type="number"
                                placeholder="Enter proposed valuation in USDC"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="dealStructure"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Deal Structure</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select deal structure" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="stablecoin">Stablecoin (Full USDC)</SelectItem>
                                <SelectItem value="token-swap">Token Swap</SelectItem>
                                <SelectItem value="milestone-escrow">Milestone Escrow</SelectItem>
                                <SelectItem value="earn-out">Earn-Out</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="notesToSeller"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Notes to Seller</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Share your thoughts, questions, or additional details about your offer..." rows={4} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                        <Send className="h-4 w-4 mr-2" />
                        Submit LOI
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DealRoom;
