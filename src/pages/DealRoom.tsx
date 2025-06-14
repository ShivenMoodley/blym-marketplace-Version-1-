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
import { ArrowLeft, Download, MessageCircle, FileText, TrendingUp, DollarSign, Users, Target, Send } from "lucide-react";
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

  // Mock data - in a real app, this would be fetched based on listingId and buyer access verification
  const listing = {
    id: listingId || "1",
    businessName: "TechFlow Marketing Agency",
    category: "Professional Services",
    monthlyRevenue: "$85,000",
    monthlyProfit: "$22,000",
    mrr: "$85,000",
    askingPrice: "$950,000",
    teamSize: 8,
    location: "Austin, TX",
    tags: ["SaaS Tools", "B2B Marketing", "Growing Revenue"],
    about: "TechFlow is a full-service digital marketing agency specializing in B2B SaaS companies. We've built a reputation for driving consistent growth through data-driven marketing strategies, content creation, and lead generation campaigns. Our team of experts has helped over 150+ companies scale their marketing efforts.",
    sellingPoints: [
      "Recurring revenue model with 95% client retention rate",
      "Proprietary marketing automation tools and processes",
      "Strong team with minimal owner dependency",
      "Proven track record with measurable ROI for clients",
      "Scalable business model ready for expansion"
    ],
    reasonForSelling: "The founder is looking to pursue a larger venture and wants to ensure TechFlow continues to thrive under new ownership. This is a strategic exit, not a distressed sale.",
    growthPotential: "Strong opportunity to expand into new markets, add complementary services, and scale the team. The marketing automation tools could be productized for additional revenue streams.",
    buyerCriteria: "Looking for an experienced marketer or business operator who understands the SaaS ecosystem and can maintain the company culture while driving growth.",
    documents: [
      { name: "Business Overview & Pitch Deck", type: "PDF", size: "2.1 MB" },
      { name: "Financial Statements (12 months)", type: "PDF", size: "1.8 MB" },
      { name: "Customer Analysis & Breakdown", type: "Excel", size: "890 KB" },
      { name: "Marketing Metrics & KPIs", type: "PDF", size: "1.2 MB" },
      { name: "Team Structure & Contracts", type: "PDF", size: "950 KB" },
      { name: "Operational Processes", type: "PDF", size: "1.5 MB" }
    ]
  };

  // Mock function to check if buyer has NDA access - in real app, this would be an API call
  const hasNDAAccess = true; // Mock - buyer has accepted NDA

  // Redirect if no NDA access
  React.useEffect(() => {
    if (!hasNDAAccess) {
      navigate(`/confidential-access/${listingId}`);
    }
  }, [hasNDAAccess, listingId, navigate]);

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message before sending.",
        variant: "destructive",
      });
      return;
    }

    // Mock API call to send message
    console.log(`Message sent to seller for listing ${listingId}:`, message);
    
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the seller.",
    });
    
    setMessage("");
    setIsMessageDialogOpen(false);
  };

  const handleDownload = (documentName: string) => {
    // Mock download functionality
    console.log(`Downloading: ${documentName}`);
    toast({
      title: "Download Started",
      description: `Downloading ${documentName}...`,
    });
  };

  const onSubmitLOI = (values: LOIFormValues) => {
    // Mock API call to save LOI
    console.log(`LOI submitted for listing ${listingId}:`, values);
    
    // In a real app, this would save to LOI_Submissions table
    const loiData = {
      listingId,
      buyerId: "mock-buyer-id", // Would come from auth context
      proposedValuation: values.proposedValuation,
      dealStructure: values.dealStructure,
      notesToSeller: values.notesToSeller,
      submittedAt: new Date().toISOString(),
    };
    
    console.log("Saving LOI to database:", loiData);
    
    toast({
      title: "LOI Submitted",
      description: "Your Letter of Intent has been sent to the seller.",
    });
    
    // Reset form
    form.reset();
  };

  if (!hasNDAAccess) {
    return null; // Will redirect in useEffect
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {listing.businessName}
              </h1>
              <Badge variant="secondary" className="text-sm">
                {listing.category}
              </Badge>
            </div>
            <p className="text-gray-600">
              Complete business details and documentation
            </p>
          </div>

          {/* Overview Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Business Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-lg font-semibold">{listing.monthlyRevenue}</div>
                  <div className="text-sm text-gray-600">Monthly Revenue</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-lg font-semibold">{listing.monthlyProfit}</div>
                  <div className="text-sm text-gray-600">Monthly Profit</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-purple-600">{listing.askingPrice}</div>
                  <div className="text-sm text-gray-600">Asking Price</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="text-lg font-semibold">{listing.teamSize}</div>
                  <div className="text-sm text-gray-600">Team Size</div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <h4 className="font-semibold mb-2">Industry Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {listing.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-blue-600 border-blue-600">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About the Business */}
              <Card>
                <CardHeader>
                  <CardTitle>About the Business</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{listing.about}</p>
                </CardContent>
              </Card>

              {/* Unique Selling Points */}
              <Card>
                <CardHeader>
                  <CardTitle>Unique Selling Points</CardTitle>
                </CardHeader>
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

              {/* Reason for Selling */}
              <Card>
                <CardHeader>
                  <CardTitle>Reason for Selling</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{listing.reasonForSelling}</p>
                </CardContent>
              </Card>

              {/* Growth Potential */}
              <Card>
                <CardHeader>
                  <CardTitle>Growth Potential</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{listing.growthPotential}</p>
                </CardContent>
              </Card>

              {/* Preferred Buyer Criteria */}
              <Card>
                <CardHeader>
                  <CardTitle>Preferred Buyer Criteria</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{listing.buyerCriteria}</p>
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
                  <CardDescription>
                    Download confidential business documents
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {listing.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{doc.name}</div>
                        <div className="text-xs text-gray-500">{doc.type} • {doc.size}</div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(doc.name)}
                        className="ml-2"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
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
                        <DialogDescription>
                          Send a secure message to the business owner
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Textarea
                          placeholder="Type your message here..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={4}
                        />
                        <div className="flex gap-2">
                          <Button onClick={handleSendMessage} className="flex-1">
                            Send Message
                          </Button>
                          <Button variant="outline" onClick={() => setIsMessageDialogOpen(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleSubmitLOI}
                  >
                    Submit Letter of Intent
                  </Button>
                </CardContent>
              </Card>

              {/* LOI Submission */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    Submit Letter of Intent
                  </CardTitle>
                  <CardDescription>
                    Submit a formal offer for this business
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitLOI)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="proposedValuation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Proposed Valuation ($)</FormLabel>
                            <FormControl>
                              <input
                                type="number"
                                placeholder="Enter proposed valuation"
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
                                <SelectItem value="all-cash">All-Cash</SelectItem>
                                <SelectItem value="earn-out">Earn-Out</SelectItem>
                                <SelectItem value="equity-rollover">Equity Rollover</SelectItem>
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
                              <Textarea
                                placeholder="Share your thoughts, questions, or additional details about your offer..."
                                rows={4}
                                {...field}
                              />
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
