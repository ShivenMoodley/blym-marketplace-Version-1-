
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const BuyerProfileSetup: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    buyerType: "individual" as const,
    minRevenue: "",
    maxRevenue: "",
    minBudget: "",
    maxBudget: "",
    industries: [] as string[],
    businessModels: [] as string[],
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

      // Add business models
      if (formData.businessModels.length > 0) {
        const { error: modelsError } = await supabase
          .from('buyer_business_models')
          .insert(
            formData.businessModels.map(model => ({
              buyer_id: user.id,
              business_model: model
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

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <div className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">What type of buyer are you?</h2>
            <RadioGroup
              value={formData.buyerType}
              onValueChange={(value) => 
                setFormData(prev => ({ ...prev, buyerType: value as any }))
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
            <Button onClick={nextStep}>Continue</Button>
          </div>
        )}

        {/* We'll implement the rest of the steps in subsequent updates */}
      </div>
    </div>
  );
};

export default BuyerProfileSetup;
