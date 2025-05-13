
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Save, Bell } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SearchFilters: React.FC = () => {
  // States for all filter values
  const [searchTerm, setSearchTerm] = useState("");
  const [revenue, setRevenue] = useState([0, 10000000]); // 0 - 10M
  const [profit, setProfit] = useState([0, 5000000]); // 0 - 5M
  const [revenueMultiple, setRevenueMultiple] = useState([1, 10]); // 1x - 10x
  const [businessAge, setBusinessAge] = useState<string>("any");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedDealTypes, setSelectedDealTypes] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string>("worldwide");
  
  // Mock data for industry options
  const industryOptions = [
    "SaaS", "E-commerce", "Mobile Apps", "Content", "Agency", 
    "Marketplace", "Subscription", "AdTech", "FinTech", "EdTech"
  ];

  // Mock data for deal type options
  const dealTypeOptions = [
    "Asset Sale", "Stock Sale", "Acquihire", "Earn-out", "Full Acquisition"
  ];
  
  // Mock data for saved searches
  const savedSearches = [
    { id: 1, name: "SaaS under ZAR 5M", criteria: "SaaS businesses with revenue under ZAR 5M ARR" },
    { id: 2, name: "Profitable E-commerce", criteria: "E-commerce with 20%+ profit margin" },
    { id: 3, name: "Mobile Apps with Growth", criteria: "Mobile applications with 50%+ YoY growth" }
  ];
  
  const handleIndustryChange = (industry: string) => {
    setSelectedIndustries(
      selectedIndustries.includes(industry)
        ? selectedIndustries.filter(i => i !== industry)
        : [...selectedIndustries, industry]
    );
  };
  
  const handleDealTypeChange = (dealType: string) => {
    setSelectedDealTypes(
      selectedDealTypes.includes(dealType)
        ? selectedDealTypes.filter(d => d !== dealType)
        : [...selectedDealTypes, dealType]
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Search & Filters</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Search Panel */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Find Your Next Acquisition</CardTitle>
              <CardDescription>Use filters to narrow down your search</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by keyword, business name, or description" 
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
                            
              <Separator />
              
              {/* Financial Filters */}
              <div className="space-y-4">
                <h3 className="font-medium">Financial Criteria</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between mb-1">
                    <Label>Annual Revenue (ZAR)</Label>
                    <span className="text-sm">
                      ZAR {(revenue[0]/1000000).toFixed(1)}M - ZAR {(revenue[1]/1000000).toFixed(1)}M
                    </span>
                  </div>
                  <Slider 
                    defaultValue={[0, 10000000]} 
                    max={10000000} 
                    step={100000}
                    onValueChange={setRevenue} 
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between mb-1">
                    <Label>Annual Profit (ZAR)</Label>
                    <span className="text-sm">
                      ZAR {(profit[0]/1000000).toFixed(1)}M - ZAR {(profit[1]/1000000).toFixed(1)}M
                    </span>
                  </div>
                  <Slider 
                    defaultValue={[0, 5000000]} 
                    max={5000000} 
                    step={50000}
                    onValueChange={setProfit} 
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between mb-1">
                    <Label>Revenue Multiple</Label>
                    <span className="text-sm">{revenueMultiple[0]}x - {revenueMultiple[1]}x</span>
                  </div>
                  <Slider 
                    defaultValue={[1, 10]} 
                    min={1}
                    max={10} 
                    step={0.5}
                    onValueChange={setRevenueMultiple} 
                  />
                </div>
              </div>
              
              <Separator />
              
              {/* Business Characteristics */}
              <div className="space-y-4">
                <h3 className="font-medium">Business Characteristics</h3>
                
                <div className="space-y-2">
                  <Label>Business Age</Label>
                  <RadioGroup value={businessAge} onValueChange={setBusinessAge}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="any" id="any" />
                      <Label htmlFor="any">Any</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0-2" id="0-2" />
                      <Label htmlFor="0-2">0-2 years</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2-5" id="2-5" />
                      <Label htmlFor="2-5">2-5 years</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="5+" id="5+" />
                      <Label htmlFor="5+">5+ years</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label>Industry</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {industryOptions.map((industry) => (
                      <div key={industry} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`industry-${industry}`} 
                          checked={selectedIndustries.includes(industry)}
                          onCheckedChange={() => handleIndustryChange(industry)}
                        />
                        <label
                          htmlFor={`industry-${industry}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {industry}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Deal Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {dealTypeOptions.map((dealType) => (
                      <div key={dealType} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`dealType-${dealType}`} 
                          checked={selectedDealTypes.includes(dealType)}
                          onCheckedChange={() => handleDealTypeChange(dealType)}
                        />
                        <label
                          htmlFor={`dealType-${dealType}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {dealType}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Region</Label>
                  <Select defaultValue="worldwide" onValueChange={setSelectedRegions}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="worldwide">Worldwide</SelectItem>
                      <SelectItem value="africa">Africa</SelectItem>
                      <SelectItem value="europe">Europe</SelectItem>
                      <SelectItem value="north-america">North America</SelectItem>
                      <SelectItem value="south-america">South America</SelectItem>
                      <SelectItem value="asia">Asia</SelectItem>
                      <SelectItem value="oceania">Oceania</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset Filters</Button>
              <Button>
                <Search className="h-4 w-4 mr-1" /> Search
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Saved Searches Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Saved Searches</CardTitle>
              <CardDescription>Get alerts when new matches appear</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {savedSearches.map((search) => (
                <div key={search.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{search.name}</h4>
                    <Badge>Daily Alert</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{search.criteria}</p>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm">View Results</Button>
                    <Button variant="ghost" size="sm">
                      <Bell className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button className="w-full" variant="outline">
                <Save className="h-4 w-4 mr-1" /> Save Current Search
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Search Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Use multiple industry filters to broaden your search</li>
                <li>• Save searches to receive alerts for new matches</li>
                <li>• Be specific with keywords for better results</li>
                <li>• Premium buyers get earlier access to new listings</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
