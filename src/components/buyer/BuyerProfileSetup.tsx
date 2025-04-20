import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Define the business model type to match our database enum
type BusinessModel = "subscription" | "one_time" | "agency" | "marketplace" | "ecommerce" | "other";
type BuyerType = "individual" | "investor" | "private_equity" | "corporate_acquirer";

const INDUSTRIES = [
  "SaaS",
  "eCommerce",
  "Mobile Apps",
  "Content & Media",
  "Agency",
  "Marketplace",
  "Other"
];

const BUSINESS_MODELS: BusinessModel[] = [
  "subscription",
  "one_time",
  "agency",
  "marketplace",
  "ecommerce",
  "other"
];

const LOCATIONS = [
  "North America",
  "Europe",
  "Asia",
  "South America",
  "Africa",
  "Australia",
  "Global"
];

const DEAL_TYPES = [
  "Asset Sale",
  "Stock Sale",
  "Either"
];

const BuyerProfileSetup: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    buyerType: "individual" as BuyerType,
    minRevenue: "",
    maxRevenue: "",
    minBudget: "",
    maxBudget: "",
    industries: [] as string[],
    businessModels: [] as BusinessModel[],
    preferredLocation: [] as string[],
    preferredDealType: "",
    linkedinUrl: "",
    companyWebsite: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to continue");
        return;
      }

      const { error: profileError } = await supabase
        .from('buyer_profiles')
        .insert([{
          id: user.id,
          buyer_type: formData.buyerType,
          min_revenue: formData.minRevenue ? parseFloat(formData.minRevenue) : null,
          max_revenue: formData.maxRevenue ? parseFloat(formData.maxRevenue) : null,
          min_budget: formData.minBudget ? parseFloat(formData.minBudget) : null,
          max_budget: formData.maxBudget ? parseFloat(formData.maxBudget) : null,
          preferred_location: formData.preferredLocation,
          preferred_deal_type: formData.preferredDealType,
          linkedin_url: formData.linkedinUrl,
          company_website: formData.companyWebsite,
        }]);

      if (profileError) {
        toast.error("Error creating buyer profile");
        return;
      }

      // Add industries
      if (formData.industries.length > 0) {
        const { error: industriesError } = await supabase
          .from('buyer_industry_interests')
          .insert(
            formData.industries.map(industry => ({
              buyer_id: user.id,
              industry
            }))
          );

        if (industriesError) {
          toast.error("Error saving industry preferences");
          return;
        }
      }

      // Add business models - use type-safe insertion
      if (formData.businessModels.length > 0) {
        const { error: modelsError } = await supabase
          .from('buyer_business_models')
          .insert(
            formData.businessModels.map(businessModel => ({
              buyer_id: user.id,
              business_model: businessModel as BusinessModel
            }))
          );

        if (modelsError) {
          toast.error("Error saving business model preferences");
          return;
        }
      }

      toast.success("Profile created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleCheckboxChange = (field: 'industries' | 'businessModels' | 'preferredLocation', value: string) => {
    setFormData(prev => {
      const currentValues = prev[field];
      const exists = currentValues.includes(value);
      
      if (exists) {
        return {
          ...prev,
          [field]: currentValues.filter(v => v !== value)
        };
      } else {
        // Ensure type safety for businessModels
        if (field === 'businessModels') {
          const validBusinessModel = BUSINESS_MODELS.find(model => model === value);
          if (!validBusinessModel) return prev;
          
          return {
            ...prev,
            [field]: [...currentValues, validBusinessModel] as BusinessModel[]
          };
        }
        
        return {
          ...prev,
          [field]: [...currentValues, value]
        };
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Build Your Buyer Profile</h1>
          <div className="text-sm text-gray-500">Step {step} of 4</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">What type of buyer are you?</h2>
            <RadioGroup
              value={formData.buyerType}
              onValueChange={(value) => 
                setFormData(prev => ({ ...prev, buyerType: value as BuyerType }))
              }
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="individual" id="individual" />
                <Label htmlFor="individual">Individual Buyer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="investor" id="investor" />
                <Label htmlFor="investor">Investor</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="private_equity" id="private_equity" />
                <Label htmlFor="private_equity">Private Equity</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="corporate_acquirer" id="corporate_acquirer" />
                <Label htmlFor="corporate_acquirer">Corporate Acquirer</Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">What industries interest you?</h2>
              <div className="grid grid-cols-2 gap-4">
                {INDUSTRIES.map((industry) => (
                  <div key={industry} className="flex items-center space-x-2">
                    <Checkbox
                      id={`industry-${industry}`}
                      checked={formData.industries.includes(industry)}
                      onCheckedChange={() => handleCheckboxChange('industries', industry)}
                    />
                    <Label htmlFor={`industry-${industry}`}>{industry}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Preferred business models?</h2>
              <div className="grid grid-cols-2 gap-4">
                {BUSINESS_MODELS.map((model) => (
                  <div key={model} className="flex items-center space-x-2">
                    <Checkbox
                      id={`model-${model}`}
                      checked={formData.businessModels.includes(model)}
                      onCheckedChange={() => handleCheckboxChange('businessModels', model)}
                    />
                    <Label htmlFor={`model-${model}`}>{model.charAt(0).toUpperCase() + model.slice(1)}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Investment Criteria</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minRevenue">Minimum Revenue</Label>
                  <Input
                    id="minRevenue"
                    placeholder="e.g., 10000"
                    type="number"
                    value={formData.minRevenue}
                    onChange={(e) => setFormData(prev => ({ ...prev, minRevenue: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxRevenue">Maximum Revenue</Label>
                  <Input
                    id="maxRevenue"
                    placeholder="e.g., 1000000"
                    type="number"
                    value={formData.maxRevenue}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxRevenue: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minBudget">Minimum Budget</Label>
                  <Input
                    id="minBudget"
                    placeholder="e.g., 50000"
                    type="number"
                    value={formData.minBudget}
                    onChange={(e) => setFormData(prev => ({ ...prev, minBudget: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxBudget">Maximum Budget</Label>
                  <Input
                    id="maxBudget"
                    placeholder="e.g., 5000000"
                    type="number"
                    value={formData.maxBudget}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxBudget: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold">Preferred Locations</h2>
              <div className="grid grid-cols-2 gap-4">
                {LOCATIONS.map((location) => (
                  <div key={location} className="flex items-center space-x-2">
                    <Checkbox
                      id={`location-${location}`}
                      checked={formData.preferredLocation.includes(location)}
                      onCheckedChange={() => handleCheckboxChange('preferredLocation', location)}
                    />
                    <Label htmlFor={`location-${location}`}>{location}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold">Preferred Deal Type</h2>
              <RadioGroup
                value={formData.preferredDealType}
                onValueChange={(value) => setFormData(prev => ({ ...prev, preferredDealType: value }))}
                className="space-y-3"
              >
                {DEAL_TYPES.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <RadioGroupItem value={type} id={`deal-${type}`} />
                    <Label htmlFor={`deal-${type}`}>{type}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Professional Information</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="linkedinUrl">LinkedIn Profile URL</Label>
                <Input
                  id="linkedinUrl"
                  placeholder="https://linkedin.com/in/yourprofile"
                  type="url"
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyWebsite">Company Website (Optional)</Label>
                <Input
                  id="companyWebsite"
                  placeholder="https://yourcompany.com"
                  type="url"
                  value={formData.companyWebsite}
                  onChange={(e) => setFormData(prev => ({ ...prev, companyWebsite: e.target.value }))}
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <Button 
              variant="outline" 
              onClick={prevStep}
            >
              Previous
            </Button>
          )}
          {step < 4 ? (
            <Button 
              onClick={nextStep}
              className={step === 1 ? "w-full" : ""}
            >
              Continue
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              className="w-full"
            >
              Complete Profile
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyerProfileSetup;
