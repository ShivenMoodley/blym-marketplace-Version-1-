
import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const SellerOnboarding: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const plan = searchParams.get("plan") || "standard";
  const isPaid = searchParams.get("paid") === "true";
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Business Information
    businessName: "",
    industry: "",
    yearEstablished: "",
    location: "",
    
    // Financial Information
    annualRevenue: "",
    monthlyProfit: "",
    askingPrice: "",
    
    // Business Details
    description: "",
    reason: "",
    employees: "",
    
    // Contact Information
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Business listing submitted:", { plan, formData });
    setIsSubmitting(false);
    
    // Redirect to seller dashboard
    navigate("/seller-dashboard");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                name="businessName"
                placeholder="Enter your business name"
                value={formData.businessName}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="industry">Industry *</Label>
              <Input
                id="industry"
                name="industry"
                placeholder="e.g., Restaurant, Retail, Technology"
                value={formData.industry}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="yearEstablished">Year Established *</Label>
                <Input
                  id="yearEstablished"
                  name="yearEstablished"
                  type="number"
                  placeholder="2015"
                  value={formData.yearEstablished}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="employees">Number of Employees</Label>
                <Input
                  id="employees"
                  name="employees"
                  type="number"
                  placeholder="5"
                  value={formData.employees}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="location">Business Location *</Label>
              <Input
                id="location"
                name="location"
                placeholder="City, State"
                value={formData.location}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="annualRevenue">Annual Revenue *</Label>
              <Input
                id="annualRevenue"
                name="annualRevenue"
                placeholder="$500,000"
                value={formData.annualRevenue}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="monthlyProfit">Monthly Net Profit *</Label>
              <Input
                id="monthlyProfit"
                name="monthlyProfit"
                placeholder="$15,000"
                value={formData.monthlyProfit}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="askingPrice">Asking Price *</Label>
              <Input
                id="askingPrice"
                name="askingPrice"
                placeholder="$750,000"
                value={formData.askingPrice}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="description">Business Description *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your business, what you do, your target market, and what makes it unique..."
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="reason">Reason for Selling *</Label>
              <Textarea
                id="reason"
                name="reason"
                placeholder="Why are you selling this business?"
                value={formData.reason}
                onChange={handleChange}
                required
                rows={3}
                className="mt-1"
              />
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="contactName">Contact Name *</Label>
              <Input
                id="contactName"
                name="contactName"
                placeholder="John Smith"
                value={formData.contactName}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="contactEmail">Contact Email *</Label>
              <Input
                id="contactEmail"
                name="contactEmail"
                type="email"
                placeholder="john@example.com"
                value={formData.contactEmail}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="contactPhone">Contact Phone *</Label>
              <Input
                id="contactPhone"
                name="contactPhone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.contactPhone}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Business Information";
      case 2: return "Financial Details";
      case 3: return "Business Description";
      case 4: return "Contact Information";
      default: return "";
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Badge className={plan === "premium" ? "bg-yellow-500 text-black" : "bg-gray-500 text-white"}>
                {plan === "premium" ? "Premium" : "Standard"} Listing
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              List Your Business for Sale
            </h1>
            <p className="text-lg text-gray-600">
              Step {currentStep} of {totalSteps}: {getStepTitle()}
            </p>
            <Progress value={progress} className="mt-4" />
          </div>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-xl font-bold">{getStepTitle()}</CardTitle>
              <CardDescription>
                {currentStep === 1 && "Tell us about your business basics"}
                {currentStep === 2 && "Provide financial information to attract buyers"}
                {currentStep === 3 && "Help buyers understand your business"}
                {currentStep === 4 && "How can interested buyers reach you?"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderStep()}
              
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                
                {currentStep === totalSteps ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-black text-white hover:bg-gray-900 transition-smooth"
                  >
                    {isSubmitting ? "Creating Listing..." : "Create Listing"}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="bg-black text-white hover:bg-gray-900 transition-smooth"
                  >
                    Next
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default SellerOnboarding;
