
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload, BadgeCheck, User, Settings, Shield } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

const ProfileManagement: React.FC = () => {
  // States for profile data
  const [name, setName] = useState("John Smith");
  const [email, setEmail] = useState("john.smith@example.com");
  const [phone, setPhone] = useState("+27 12 345 6789");
  const [company, setCompany] = useState("Smith Investments");
  const [role, setRole] = useState("CEO");
  const [minBudget, setMinBudget] = useState([500000]);
  const [maxBudget, setMaxBudget] = useState([5000000]);
  const [privateProfile, setPrivateProfile] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState("pending");
  
  // Mock industry preferences
  const industryPreferences = [
    "SaaS", "E-commerce", "Digital Marketing", "Mobile Apps"
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Buyer Profile Management</h2>
      </div>
      
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" /> Profile Details
          </TabsTrigger>
          <TabsTrigger value="acquisition">
            <Settings className="h-4 w-4 mr-2" /> Acquisition Criteria
          </TabsTrigger>
          <TabsTrigger value="verification">
            <Shield className="h-4 w-4 mr-2" /> Verification
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="pt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Manage your personal information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-6 items-center">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <Button variant="outline">Change Photo</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input id="linkedin" placeholder="https://linkedin.com/in/..." />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Tell sellers about your background and acquisition experience..."
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Switch 
                  id="private-profile" 
                  checked={privateProfile}
                  onCheckedChange={setPrivateProfile}
                />
                <Label htmlFor="private-profile">Keep my identity private until I initiate contact</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Profile Details</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="acquisition" className="pt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Acquisition Criteria</CardTitle>
              <CardDescription>Define what kind of businesses you're looking for</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Budget Range (ZAR)</h3>
                <div className="space-y-2">
                  <div className="flex justify-between mb-1">
                    <Label>Minimum Budget</Label>
                    <span className="text-sm">
                      ZAR {(minBudget[0]/1000000).toFixed(2)}M
                    </span>
                  </div>
                  <Slider 
                    defaultValue={[500000]} 
                    max={5000000} 
                    step={100000}
                    onValueChange={setMinBudget} 
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between mb-1">
                    <Label>Maximum Budget</Label>
                    <span className="text-sm">
                      ZAR {(maxBudget[0]/1000000).toFixed(2)}M
                    </span>
                  </div>
                  <Slider 
                    defaultValue={[5000000]} 
                    max={20000000} 
                    step={100000}
                    onValueChange={setMaxBudget} 
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Industry Preferences</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {industryPreferences.map((industry) => (
                    <div key={industry} className="flex items-center space-x-2 bg-primary/10 px-3 py-2 rounded-md">
                      <span>{industry}</span>
                    </div>
                  ))}
                  <Button variant="outline" className="h-[36px]">+ Add Industry</Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Preferred Business Age</Label>
                  <Select defaultValue="any">
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any age</SelectItem>
                      <SelectItem value="0-2">0-2 years</SelectItem>
                      <SelectItem value="2-5">2-5 years</SelectItem>
                      <SelectItem value="5+">5+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Preferred Deal Structure</Label>
                  <Select defaultValue="any">
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any structure</SelectItem>
                      <SelectItem value="asset">Asset Sale</SelectItem>
                      <SelectItem value="stock">Stock Sale</SelectItem>
                      <SelectItem value="earn-out">Earn-out</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Additional Requirements</Label>
                <Textarea placeholder="Describe any other specific criteria for your ideal acquisition..." />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Acquisition Criteria</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="verification" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Identity & Funds Verification</CardTitle>
              <CardDescription>Verify your identity and proof of funds to increase seller trust</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium flex items-center">
                    <Shield className="h-4 w-4 mr-2" /> Verification Status:
                  </h3>
                  <Badge 
                    variant={
                      verificationStatus === "verified" ? "default" : 
                      verificationStatus === "pending" ? "outline" : 
                      "destructive"
                    }
                  >
                    {verificationStatus === "verified" ? "Verified" :
                     verificationStatus === "pending" ? "Pending Review" :
                     "Not Verified"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {verificationStatus === "verified" ? 
                    "Your identity and funds have been verified. Sellers can see you're a serious and trusted buyer." :
                    verificationStatus === "pending" ? 
                    "Your documents are being reviewed. This typically takes 1-2 business days." :
                    "Complete verification to improve your chances with sellers."
                  }
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Identity Verification</h3>
                    <p className="text-sm text-muted-foreground">Upload government-issued ID</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-1" /> Upload ID
                  </Button>
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Proof of Funds</h3>
                    <p className="text-sm text-muted-foreground">Recent bank statement or letter from financial institution</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-1" /> Upload Document
                  </Button>
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Company Documents</h3>
                    <p className="text-sm text-muted-foreground">Business registration or corporate documents (optional)</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-1" /> Upload Document
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="space-y-2 w-full">
                <Button className="w-full">Submit for Verification</Button>
                <p className="text-xs text-center text-muted-foreground">
                  Documents are securely stored and only used for verification purposes.
                </p>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileManagement;
