
import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
    // Step 1: Seller Profile Information
    fullName: "",
    email: "",
    mobileNumber: "",
    idNumber: "",
    linkedinUrl: "",
    
    // Step 2: Business Overview
    businessName: "",
    businessTagline: "",
    businessSector: "",
    businessLocation: "",
    yearsInOperation: "",
    dealType: "",
    askingPrice: "",
    
    // Step 3: Financial Snapshot
    monthlyRevenue: "",
    monthlyProfit: "",
    ownerInvolvement: "",
    inventoryValue: "",
    customerType: "",
    
    // Step 4: File Uploads
    revenueProof: null as File | null,
    cipcCertificate: null as File | null,
    leaseAgreement: null as File | null,
    orgChart: null as File | null,
    
    // Step 5: Business Narrative
    businessDescription: "",
    sellingReason: "",
    postSaleSupport: "",
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const businessSectors = [
    "Franchise", "Retail", "Medical", "Wellness", "Logistics", 
    "Technology", "Manufacturing", "Hospitality", "Education", 
    "Consulting", "Other"
  ];

  const saProvinces = [
    "Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", 
    "Limpopo", "Mpumalanga", "Northern Cape", "North West", "Western Cape"
  ];

  const dealTypes = ["Full Business Sale", "Partial Equity Sale"];

  const ownerInvolvementOptions = ["Full-Time", "Part-Time", "Passive"];

  const customerTypes = ["B2B", "B2C", "Government", "B2B & B2C", "Other"];

  const sellingReasons = [
    "Retirement", "New opportunities", "Health reasons", "Relocation", 
    "Partnership changes", "Market conditions", "Other"
  ];

  const postSaleSupportOptions = [
    "2-week handover", "1-month support", "3-month support", 
    "6-month support", "Ongoing consultation", "No support"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
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
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="mobileNumber">Mobile Number *</Label>
              <Input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                placeholder="+27 XX XXX XXXX"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="idNumber">ID Number or CIPC Registration Number</Label>
              <Input
                id="idNumber"
                name="idNumber"
                placeholder="Optional: ID or CIPC number"
                value={formData.idNumber}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="linkedinUrl">LinkedIn or Website URL</Label>
              <Input
                id="linkedinUrl"
                name="linkedinUrl"
                type="url"
                placeholder="Optional: https://linkedin.com/in/yourname"
                value={formData.linkedinUrl}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
          </div>
        );
      
      case 2:
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
              <Label htmlFor="businessTagline">Business Tagline *</Label>
              <Input
                id="businessTagline"
                name="businessTagline"
                placeholder="Brief tagline describing your business"
                value={formData.businessTagline}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="businessSector">Business Sector *</Label>
              <Select onValueChange={(value) => handleSelectChange("businessSector", value)} value={formData.businessSector}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select business sector" />
                </SelectTrigger>
                <SelectContent>
                  {businessSectors.map((sector) => (
                    <SelectItem key={sector} value={sector}>
                      {sector}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="businessLocation">Business Location *</Label>
              <Select onValueChange={(value) => handleSelectChange("businessLocation", value)} value={formData.businessLocation}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select province" />
                </SelectTrigger>
                <SelectContent>
                  {saProvinces.map((province) => (
                    <SelectItem key={province} value={province}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="yearsInOperation">Years in Operation *</Label>
                <Input
                  id="yearsInOperation"
                  name="yearsInOperation"
                  type="number"
                  placeholder="5"
                  value={formData.yearsInOperation}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="dealType">Deal Type *</Label>
                <Select onValueChange={(value) => handleSelectChange("dealType", value)} value={formData.dealType}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select deal type" />
                  </SelectTrigger>
                  <SelectContent>
                    {dealTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="askingPrice">Asking Price (ZAR) *</Label>
              <Input
                id="askingPrice"
                name="askingPrice"
                placeholder="R 1,500,000"
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="monthlyRevenue">Monthly Revenue (ZAR) *</Label>
                <Input
                  id="monthlyRevenue"
                  name="monthlyRevenue"
                  placeholder="R 150,000"
                  value={formData.monthlyRevenue}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="monthlyProfit">Monthly Profit (ZAR) *</Label>
                <Input
                  id="monthlyProfit"
                  name="monthlyProfit"
                  placeholder="R 45,000"
                  value={formData.monthlyProfit}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="ownerInvolvement">Owner Involvement *</Label>
              <Select onValueChange={(value) => handleSelectChange("ownerInvolvement", value)} value={formData.ownerInvolvement}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select owner involvement level" />
                </SelectTrigger>
                <SelectContent>
                  {ownerInvolvementOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="inventoryValue">Inventory or Asset Value (ZAR)</Label>
              <Input
                id="inventoryValue"
                name="inventoryValue"
                placeholder="Optional: R 250,000"
                value={formData.inventoryValue}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="customerType">Customer Type</Label>
              <Select onValueChange={(value) => handleSelectChange("customerType", value)} value={formData.customerType}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Optional: Select customer type" />
                </SelectTrigger>
                <SelectContent>
                  {customerTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              All file uploads are optional but recommended to strengthen your listing.
            </p>
            
            <div>
              <Label htmlFor="revenueProof">Revenue Proof (PDF/Excel)</Label>
              <Input
                id="revenueProof"
                name="revenueProof"
                type="file"
                accept=".pdf,.xlsx,.xls"
                onChange={handleFileChange}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="cipcCertificate">CIPC Certificate (PDF)</Label>
              <Input
                id="cipcCertificate"
                name="cipcCertificate"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="leaseAgreement">Lease or Rental Agreement (PDF)</Label>
              <Input
                id="leaseAgreement"
                name="leaseAgreement"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="orgChart">Org Chart or Staff Summary (PDF/Word)</Label>
              <Input
                id="orgChart"
                name="orgChart"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="mt-1"
              />
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="businessDescription">Business Description *</Label>
              <Textarea
                id="businessDescription"
                name="businessDescription"
                placeholder="Describe your business in 100-200 words (max 1000 characters)..."
                value={formData.businessDescription}
                onChange={handleChange}
                required
                rows={5}
                maxLength={1000}
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.businessDescription.length}/1000 characters
              </p>
            </div>
            
            <div>
              <Label htmlFor="sellingReason">Why are you selling? *</Label>
              <Select onValueChange={(value) => handleSelectChange("sellingReason", value)} value={formData.sellingReason}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select reason for selling" />
                </SelectTrigger>
                <SelectContent>
                  {sellingReasons.map((reason) => (
                    <SelectItem key={reason} value={reason}>
                      {reason}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="postSaleSupport">Post-sale Support Offered *</Label>
              <Select onValueChange={(value) => handleSelectChange("postSaleSupport", value)} value={formData.postSaleSupport}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select support level" />
                </SelectTrigger>
                <SelectContent>
                  {postSaleSupportOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Seller Profile Information";
      case 2: return "Business Overview";
      case 3: return "Financial Snapshot";
      case 4: return "File Uploads";
      case 5: return "Business Narrative";
      default: return "";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1: return "Tell us about yourself as the business owner";
      case 2: return "Provide key details about your business";
      case 3: return "Share financial performance and involvement level";
      case 4: return "Upload supporting documents (optional but recommended)";
      case 5: return "Describe your business story and selling motivation";
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
                {getStepDescription()}
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
