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
    setFormData(prev => ({ ...prev, budgetMin: values[0], budgetMax: values[1] }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, proofOfFunds: file }));
  };

  const validateForm = (): boolean => {
    const requiredFields = ['fullName', 'buyerType', 'revenueRange', 'dealType'];
    for (const field of requiredFields) {
      if (!formData[field as keyof FormData]) {
        toast({ title: "Validation Error", description: "Please fill in all required fields.", variant: "destructive" });
        return false;
      }
    }
    if (formData.industriesOfInterest.length === 0) {
      toast({ title: "Validation Error", description: "Please select at least one category of interest.", variant: "destructive" });
      return false;
    }
    if (formData.preferredBusinessModels.length === 0) {
      toast({ title: "Validation Error", description: "Please select at least one preferred protocol model.", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Buyer profile data:", formData);
      toast({ title: "Profile Created Successfully", description: "Your buyer profile has been set up. Welcome to the platform!" });
      navigate("/buyer-dashboard");
    } catch (error) {
      toast({ title: "Error", description: "Failed to create profile. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const industries = [
    "DeFi", "NFT", "Gaming", "Infrastructure", "Social",
    "DAO", "Identity", "L2/Rollup", "Other"
  ];

  const businessModels = [
    "DeFi Protocol", "NFT Marketplace", "SaaS dApp", "Infrastructure",
    "Gaming/GameFi", "Social Protocol", "DAO Tooling", "Other"
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-2">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Buyer Profile Setup</CardTitle>
              <CardDescription>
                Complete your profile to help us match you with the perfect dApp & protocol opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input id="fullName" name="fullName" type="text" placeholder="John Smith" value={formData.fullName} onChange={handleInputChange} required className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="buyerType">Role / Buyer Type *</Label>
                  <Select onValueChange={(value) => handleSelectChange("buyerType", value)}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Select your buyer type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="investor">Crypto Fund / Investor</SelectItem>
                      <SelectItem value="dao">DAO</SelectItem>
                      <SelectItem value="corporate-acquirer">Corporate Acquirer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-medium">Categories of Interest *</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {industries.map((industry) => (
                      <div key={industry} className="flex items-center space-x-2">
                        <Checkbox
                          id={`industry-${industry}`}
                          checked={formData.industriesOfInterest.includes(industry)}
                          onCheckedChange={(checked) => handleMultiSelectChange("industriesOfInterest", industry, checked as boolean)}
                        />
                        <Label htmlFor={`industry-${industry}`} className="text-sm">{industry}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Preferred Protocol Models *</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {businessModels.map((model) => (
                      <div key={model} className="flex items-center space-x-2">
                        <Checkbox
                          id={`model-${model}`}
                          checked={formData.preferredBusinessModels.includes(model)}
                          onCheckedChange={(checked) => handleMultiSelectChange("preferredBusinessModels", model, checked as boolean)}
                        />
                        <Label htmlFor={`model-${model}`} className="text-sm">{model}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="revenueRange">Protocol Revenue Range *</Label>
                  <Select onValueChange={(value) => handleSelectChange("revenueRange", value)}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Select revenue range" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="$0-$10K USDC/mo">$0 – $10K USDC/mo</SelectItem>
                      <SelectItem value="$10K-$50K USDC/mo">$10K – $50K USDC/mo</SelectItem>
                      <SelectItem value="$50K-$200K USDC/mo">$50K – $200K USDC/mo</SelectItem>
                      <SelectItem value="$200K-$1M USDC/mo">$200K – $1M USDC/mo</SelectItem>
                      <SelectItem value="$1M+ USDC/mo">$1M+ USDC/mo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-medium">Budget / Investment Size (USDC)</Label>
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
                      <span>${formData.budgetMin.toLocaleString()} USDC</span>
                      <span>${formData.budgetMax.toLocaleString()} USDC</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="geographicPreference">Chain / Ecosystem Preference</Label>
                  <Input
                    id="geographicPreference"
                    name="geographicPreference"
                    type="text"
                    placeholder="e.g., Base, Ethereum, Solana, Multi-chain"
                    value={formData.geographicPreference}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="dealType">Deal Type *</Label>
                  <Select onValueChange={(value) => handleSelectChange("dealType", value)}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Select deal type preference" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stablecoin">Stablecoin (Full USDC)</SelectItem>
                      <SelectItem value="token-swap">Token Swap</SelectItem>
                      <SelectItem value="milestone-escrow">Milestone Escrow</SelectItem>
                      <SelectItem value="both">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="linkedinProfile">Twitter / Website (Optional)</Label>
                  <Input
                    id="linkedinProfile"
                    name="linkedinProfile"
                    type="url"
                    placeholder="https://twitter.com/yourprofile"
                    value={formData.linkedinProfile}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="proofOfFunds">Upload Proof of Funds (Optional)</Label>
                  <Input id="proofOfFunds" name="proofOfFunds" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={handleFileChange} className="mt-1" />
                  <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX, JPG, PNG (Max 5MB)</p>
                </div>

                <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-smooth">
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
