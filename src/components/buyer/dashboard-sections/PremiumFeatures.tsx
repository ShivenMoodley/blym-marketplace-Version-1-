
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Star, Shield, TrendingUp, Calendar, MessageSquare, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const PremiumFeatures: React.FC = () => {
  // Premium plan options
  const premiumPlans = [
    {
      name: "Standard",
      current: true,
      price: "Free",
      features: [
        "Basic search filters",
        "Standard listing access",
        "Basic deal management",
        "Public profile"
      ]
    },
    {
      name: "Premium",
      current: false,
      price: "ZAR 950/month",
      features: [
        "Advanced search filters",
        "Early access to new deals",
        "Deal analytics tools",
        "Verified buyer badge",
        "Private deal alerts",
        "Prioritized seller responses",
        "Off-market deal access"
      ]
    },
    {
      name: "Elite",
      current: false,
      price: "ZAR 4,950/month",
      features: [
        "All Premium features",
        "M&A advisor support",
        "Due diligence assistance",
        "Exclusive deal flow",
        "Concierge matching service",
        "Priority support",
        "Deal negotiation assistance"
      ]
    }
  ];
  
  // Premium features categorized
  const featureCategories = [
    {
      category: "Deal Access",
      icon: Star,
      features: [
        { name: "Off-market deals", description: "Access listings not visible to standard users" },
        { name: "Early access to new listings", description: "See new deals 48 hours before standard users" },
        { name: "Exclusive deal flow", description: "Custom-matched opportunities based on your criteria" }
      ]
    },
    {
      category: "Tools & Analytics",
      icon: TrendingUp,
      features: [
        { name: "Valuation tools", description: "Industry benchmark tools for pricing analysis" },
        { name: "Due diligence checklists", description: "Comprehensive verification frameworks" },
        { name: "Financial forecast modeling", description: "Project future performance of acquisition targets" }
      ]
    },
    {
      category: "Expert Support",
      icon: Shield,
      features: [
        { name: "Advisor network", description: "Connect with legal, accounting and M&A experts" },
        { name: "Deal structuring guidance", description: "Assistance optimizing transaction structure" },
        { name: "Negotiation support", description: "Expert coaching through critical deal stages" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Premium Buyer Features</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {premiumPlans.map((plan) => (
          <Card key={plan.name} className={plan.current ? "border-primary" : ""}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{plan.name}</CardTitle>
                {plan.current && <Badge>Current Plan</Badge>}
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold">{plan.price}</span>
                {plan.price !== "Free" && <span className="text-muted-foreground"> /month</span>}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {plan.current ? (
                <Button className="w-full" disabled>Current Plan</Button>
              ) : (
                <Button className="w-full">
                  {plan.name === "Premium" ? "Upgrade to Premium" : "Contact Sales"}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <Separator className="my-8" />
      
      <h3 className="text-lg font-medium mb-4">Premium Features</h3>
      
      <div className="space-y-8">
        {featureCategories.map((category) => (
          <div key={category.category} className="space-y-4">
            <div className="flex items-center">
              <category.icon className="h-5 w-5 mr-2" />
              <h4 className="font-medium">{category.category}</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {category.features.map((feature, index) => (
                <Card key={index} className="h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">{feature.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <Card className="mt-8 bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="h-5 w-5 mr-2" /> Why Upgrade?
          </CardTitle>
          <CardDescription>Premium buyers are 3x more likely to successfully acquire a business</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center text-center p-4">
              <Calendar className="h-10 w-10 text-primary mb-2" />
              <h4 className="font-medium">Faster Acquisition</h4>
              <p className="text-sm text-muted-foreground">Premium buyers complete deals 40% faster on average</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <MessageSquare className="h-10 w-10 text-primary mb-2" />
              <h4 className="font-medium">Higher Response Rates</h4>
              <p className="text-sm text-muted-foreground">85% seller response rate vs. 40% for standard buyers</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <FileText className="h-10 w-10 text-primary mb-2" />
              <h4 className="font-medium">Better Terms</h4>
              <p className="text-sm text-muted-foreground">Premium buyers report 15% better deal terms on average</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button size="lg">Upgrade Now</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PremiumFeatures;
