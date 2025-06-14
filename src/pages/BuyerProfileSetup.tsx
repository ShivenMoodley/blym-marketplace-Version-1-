
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  fullName: string;
  buyerType: string;
  industriesOfInterest: string[];
  preferredBusinessModels: string[];
  revenueRange: string;
  budgetMin: number;
  budgetMax: number;
  geographicPreference: string;
  dealType: string;
  linkedinProfile: string;
  proofOfFunds: File | null;
}

const BuyerProfileSetup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    buyerType: "",
    industriesOfInterest: [],
    preferredBusinessModels: [],
    revenueRange: "",
    budgetMin: 50000,
    budgetMax: 1000000,
    geographicPreference: "",
    dealType: "",
    linkedinProfile: "",
    proofOfFunds: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (name: keyof FormData, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked 
        ? [...(prev[name] as string[]), value]
        : (prev[name] as string[]).filter(item => item !== value)
    }));
  };

  const handleBudgetChange = (values: number[]) => {
    setFormData(prev => ({
      ...prev,
      budgetMin: values[0],
      budgetMax: values[1]
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, proofOfFunds: file }));
  };

  const validateForm = (): boolean => {
    const requiredFields = ['fullName', 'buyerType', 'revenueRange', 'dealType'];
    for (const field of requiredFields) {
      if (!formData[field as keyof FormData]) {
        toast({
          title: "Validation Error",
          description: `Please fill in all required fields.`,
          variant: "destructive",
        });
        return false;
      }
    }
    
    if (formData.industriesOfInterest.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please select at least one industry of interest.",
        variant: "destructive",
      });
      return false;
    }

    if (formData.preferredBusinessModels.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please select at least one preferred business model.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call to store buyer profile
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Buyer profile data:", formData);
      
      toast({
        title: "Profile Created Successfully",
        description: "Your buyer profile has been set up. Welcome to the platform!",
      });
      
      // Redirect to buyer dashboard
      navigate("/buyer-dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const industries = [
    "SaaS", "eCommerce", "Services", "Brick & Mortar", "Healthcare", 
    "Education", "Manufacturing", "Real Estate", "Other"
  ];

  const businessModels = [
    "Subscription", "One-Time", "Agency", "Marketplace", "SaaS", 
    "E-commerce", "Consulting", "Franchise", "Other"
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-2">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Buyer Profile Setup</CardTitle>
              <CardDescription>
                Complete your profile to help us match you with the perfect business opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="John Smith"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>

                {/* Buyer Type */}
                <div>
                  <Label htmlFor="buyerType">Role / Buyer Type *</Label>
                  <Select onValueChange={(value) => handleSelectChange("buyerType", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your buyer type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="investor">Investor</SelectItem>
                      <SelectItem value="private-equity">Private Equity</SelectItem>
                      <SelectItem value="corporate-acquirer">Corporate Acquirer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Industries of Interest */}
                <div>
                  <Label className="text-base font-medium">Industries of Interest *</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {industries.map((industry) => (
                      <div key={industry} className="flex items-center space-x-2">
                        <Checkbox
                          id={`industry-${industry}`}
                          checked={formData.industriesOfInterest.includes(industry)}
                          onCheckedChange={(checked) => 
                            handleMultiSelectChange("industriesOfInterest", industry, checked as boolean)
                          }
                        />
                        <Label htmlFor={`industry-${industry}`} className="text-sm">
                          {industry}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preferred Business Models */}
                <div>
                  <Label className="text-base font-medium">Preferred Business Models *</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {businessModels.map((model) => (
                      <div key={model} className="flex items-center space-x-2">
                        <Checkbox
                          id={`model-${model}`}
                          checked={formData.preferredBusinessModels.includes(model)}
                          onCheckedChange={(checked) => 
                            handleMultiSelectChange("preferredBusinessModels", model, checked as boolean)
                          }
                        />
                        <Label htmlFor={`model-${model}`} className="text-sm">
                          {model}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Revenue Range */}
                <div>
                  <Label htmlFor="revenueRange">Revenue Range of Target Businesses *</Label>
                  <Select onValueChange={(value) => handleSelectChange("revenueRange", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select revenue range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="R20K-R100K">R20K – R100K</SelectItem>
                      <SelectItem value="R100K-R500K">R100K – R500K</SelectItem>
                      <SelectItem value="R500K-R1M">R500K – R1M</SelectItem>
                      <SelectItem value="R1M-R5M">R1M – R5M</SelectItem>
                      <SelectItem value="R5M+">R5M+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Budget / Investment Size */}
                <div>
                  <Label className="text-base font-medium">Budget / Investment Size</Label>
                  <div className="mt-2 px-3">
                    <Slider
                      min={10000}
                      max={5000000}
                      step={10000}
                      value={[formData.budgetMin, formData.budgetMax]}
                      onValueChange={handleBudgetChange}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>R{formData.budgetMin.toLocaleString()}</span>
                      <span>R{formData.budgetMax.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Geographic Preference */}
                <div>
                  <Label htmlFor="geographicPreference">Geographic Preference</Label>
                  <Input
                    id="geographicPreference"
                    name="geographicPreference"
                    type="text"
                    placeholder="e.g., Cape Town, Johannesburg, National, International"
                    value={formData.geographicPreference}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>

                {/* Deal Type */}
                <div>
                  <Label htmlFor="dealType">Deal Type *</Label>
                  <Select onValueChange={(value) => handleSelectChange("dealType", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select deal type preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asset-sale">Asset Sale</SelectItem>
                      <SelectItem value="equity-sale">Equity Sale</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* LinkedIn Profile */}
                <div>
                  <Label htmlFor="linkedinProfile">LinkedIn Profile or Website (Optional)</Label>
                  <Input
                    id="linkedinProfile"
                    name="linkedinProfile"
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={formData.linkedinProfile}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>

                {/* Proof of Funds Upload */}
                <div>
                  <Label htmlFor="proofOfFunds">Upload Proof of Funds (Optional)</Label>
                  <Input
                    id="proofOfFunds"
                    name="proofOfFunds"
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Accepted formats: PDF, DOC, DOCX, JPG, PNG (Max 5MB)
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-smooth"
                >
                  {isLoading ? "Setting up profile..." : "Complete Profile Setup"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default BuyerProfileSetup;
