
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, StarIcon, ClipboardCheck } from "lucide-react";

// Mock data for saved listings
const savedListings = [
  {
    id: 1,
    title: "Project Management SaaS",
    industry: "Productivity Software",
    revenue: "ZAR 1.2M ARR",
    profit: "ZAR 350K",
    asking: "ZAR 4.2M",
    category: "high-interest",
    lastViewed: "2 days ago"
  },
  {
    id: 2,
    title: "Content Creation Platform",
    industry: "Creative Software",
    revenue: "ZAR 850K ARR",
    profit: "ZAR 220K",
    asking: "ZAR 2.6M",
    category: "due-diligence",
    lastViewed: "Yesterday"
  },
  {
    id: 3,
    title: "Niche Job Board",
    industry: "Recruitment",
    revenue: "ZAR 580K ARR",
    profit: "ZAR 240K",
    asking: "ZAR 1.7M",
    category: "follow-up",
    lastViewed: "5 days ago"
  },
  {
    id: 4,
    title: "B2B Lead Generation Tool",
    industry: "Sales Software",
    revenue: "ZAR 1.8M ARR",
    profit: "ZAR 420K",
    asking: "ZAR 5.1M",
    category: "high-interest",
    lastViewed: "Today"
  }
];

const SavedListings: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState("all");
  
  const filteredListings = activeCategory === "all" 
    ? savedListings 
    : savedListings.filter(listing => listing.category === activeCategory);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Saved Listings</h2>
        
        <Tabs defaultValue="all" onValueChange={setActiveCategory}>
          <TabsList>
            <TabsTrigger value="all">All Saved</TabsTrigger>
            <TabsTrigger value="high-interest">
              <StarIcon className="h-4 w-4 mr-2" />
              High Interest
            </TabsTrigger>
            <TabsTrigger value="due-diligence">
              <ClipboardCheck className="h-4 w-4 mr-2" />
              Due Diligence
            </TabsTrigger>
            <TabsTrigger value="follow-up">
              <BookmarkIcon className="h-4 w-4 mr-2" />
              Follow Up Later
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="h-full">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{listing.title}</CardTitle>
                  <Badge variant="outline">Last viewed: {listing.lastViewed}</Badge>
                </div>
                <CardDescription>{listing.industry}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                    <p className="font-medium">{listing.revenue}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Profit</p>
                    <p className="font-medium">{listing.profit}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Asking</p>
                    <p className="font-medium">{listing.asking}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Badge className={
                    listing.category === 'high-interest' ? 'bg-yellow-500' : 
                    listing.category === 'due-diligence' ? 'bg-blue-500' : 
                    'bg-gray-500'
                  }>
                    {listing.category === 'high-interest' ? 'High Interest' : 
                     listing.category === 'due-diligence' ? 'Due Diligence' : 
                     'Follow Up Later'}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">View Details</Button>
                <Button>Continue Conversation</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 border rounded-lg">
          <BookmarkIcon className="h-12 w-12 text-gray-300 mb-2" />
          <h3 className="text-lg font-medium">No saved listings in this category</h3>
          <p className="text-muted-foreground text-center mt-1">
            Browse recommended deals and save listings you're interested in.
          </p>
        </div>
      )}
    </div>
  );
};

export default SavedListings;
