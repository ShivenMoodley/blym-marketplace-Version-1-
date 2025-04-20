
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Edit, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for offers
const offers = [
  {
    id: 1,
    businessName: "Digital Marketing Agency",
    offerAmount: "ZAR 3,500,000",
    submittedDate: "April 10, 2025",
    status: "sent",
    terms: "Full acquisition with 30% upfront, 70% over 24 months",
    notes: "Contingent on key employees staying for 6 months transition period"
  },
  {
    id: 2,
    businessName: "E-commerce Platform",
    offerAmount: "ZAR 5,200,000",
    submittedDate: "April 5, 2025",
    status: "countered",
    terms: "Full acquisition with 40% upfront, 60% over 18 months",
    counterOffer: "ZAR 6,500,000 with 50% upfront",
    notes: "Seller prefers shorter earn-out period"
  },
  {
    id: 3,
    businessName: "SaaS Customer Support Tool",
    offerAmount: "ZAR 2,800,000",
    submittedDate: "March 28, 2025",
    status: "accepted",
    terms: "Full acquisition with 45% upfront, 55% over 12 months",
    notes: "Due diligence in progress, expected closing by May 30"
  }
];

// Available LOI templates
const loiTemplates = [
  { id: 1, name: "Standard Acquisition", description: "Complete business purchase template" },
  { id: 2, name: "Asset Sale", description: "Purchase specific assets only" },
  { id: 3, name: "Earn-out Structure", description: "Performance-based acquisition terms" }
];

const OfferManagement: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState("active-offers");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Offer Management</h2>
        <Button>Create New Offer</Button>
      </div>
      
      <Tabs defaultValue="active-offers" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active-offers">Active Offers</TabsTrigger>
          <TabsTrigger value="templates">LOI Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active-offers" className="pt-4 space-y-4">
          {offers.map((offer) => (
            <Card key={offer.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>{offer.businessName}</CardTitle>
                  <Badge variant={
                    offer.status === 'sent' ? 'secondary' :
                    offer.status === 'countered' ? 'warning' :
                    'success'
                  }>
                    {offer.status === 'sent' ? 'LOI Sent' :
                     offer.status === 'countered' ? 'Countered' :
                     'Accepted'}
                  </Badge>
                </div>
                <CardDescription>
                  Submitted: {offer.submittedDate} • Offer: {offer.offerAmount}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Terms:</p>
                  <p className="text-sm text-muted-foreground">{offer.terms}</p>
                </div>
                
                {offer.counterOffer && (
                  <div>
                    <p className="text-sm font-medium">Counter Offer:</p>
                    <p className="text-sm text-muted-foreground">{offer.counterOffer}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-sm font-medium">Additional Notes:</p>
                  <p className="text-sm text-muted-foreground">{offer.notes}</p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-1" /> View Details
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" /> Download PDF
                </Button>
                {offer.status !== 'accepted' && (
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" /> Edit Offer
                  </Button>
                )}
                {offer.status === 'countered' && (
                  <Button size="sm">
                    <TrendingUp className="h-4 w-4 mr-1" /> Respond to Counter
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="templates" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {loiTemplates.map((template) => (
              <Card key={template.id} className="h-full">
                <CardHeader>
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Professional template with standard legal clauses for {template.name.toLowerCase()} transactions.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button>Use Template</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OfferManagement;
