
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Calendar, BarChart, Star } from "lucide-react";

// Mock data for recommended listings
const mockListings = [
  {
    id: 1,
    title: "SaaS Marketing Platform",
    industry: "Marketing Technology",
    revenue: "ZAR 2.5M ARR",
    profit: "ZAR 750K",
    asking: "ZAR 7.5M",
    tags: ["SaaS", "B2B", "High Growth"],
    new: true,
    trending: true
  },
  {
    id: 2,
    title: "E-Commerce Analytics Tool",
    industry: "E-Commerce",
    revenue: "ZAR 1.8M ARR",
    profit: "ZAR 540K",
    asking: "ZAR 5.4M",
    tags: ["Analytics", "Subscription"],
    new: true,
    trending: false
  },
  {
    id: 3,
    title: "Mobile Fitness App",
    industry: "Health & Fitness",
    revenue: "ZAR 900K ARR",
    profit: "ZAR 300K",
    asking: "ZAR 2.7M",
    tags: ["Mobile", "B2C", "Subscription"],
    new: false,
    trending: true
  },
  {
    id: 4,
    title: "HR Management Platform",
    industry: "Enterprise Software",
    revenue: "ZAR 3.2M ARR",
    profit: "ZAR 960K",
    asking: "ZAR 9.6M",
    tags: ["SaaS", "B2B", "Enterprise"],
    new: false,
    trending: false
  }
];

const RecommendedDeals: React.FC = () => {
  const [sortBy, setSortBy] = useState("newest");
  
  // Sort listings based on selected filter
  const sortedListings = [...mockListings].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return a.new ? -1 : 1;
      case "trending":
        return a.trending ? -1 : 1;
      case "valuation":
        return parseInt(b.asking.replace(/\D/g, "")) - parseInt(a.asking.replace(/\D/g, ""));
      case "revenue":
        return parseInt(b.revenue.replace(/\D/g, "")) - parseInt(a.revenue.replace(/\D/g, ""));
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Recommended Deals</h2>
        
        <div className="flex space-x-2">
          <TabsList>
            <TabsTrigger 
              value="newest" 
              className={sortBy === "newest" ? "bg-primary text-white" : ""} 
              onClick={() => setSortBy("newest")}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Newest
            </TabsTrigger>
            <TabsTrigger 
              value="trending" 
              className={sortBy === "trending" ? "bg-primary text-white" : ""} 
              onClick={() => setSortBy("trending")}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending
            </TabsTrigger>
            <TabsTrigger 
              value="valuation" 
              className={sortBy === "valuation" ? "bg-primary text-white" : ""} 
              onClick={() => setSortBy("valuation")}
            >
              <BarChart className="h-4 w-4 mr-2" />
              Valuation
            </TabsTrigger>
            <TabsTrigger 
              value="revenue" 
              className={sortBy === "revenue" ? "bg-primary text-white" : ""} 
              onClick={() => setSortBy("revenue")}
            >
              <Star className="h-4 w-4 mr-2" />
              Revenue
            </TabsTrigger>
          </TabsList>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedListings.map((listing) => (
          <Card key={listing.id} className="h-full">
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>{listing.title}</CardTitle>
                <div className="space-x-1">
                  {listing.new && (
                    <Badge className="bg-green-500">New</Badge>
                  )}
                  {listing.trending && (
                    <Badge className="bg-orange-500">Trending</Badge>
                  )}
                </div>
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
              
              <div className="mt-4 flex flex-wrap gap-1">
                {listing.tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">View Details</Button>
              <Button>Contact Seller</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommendedDeals;
