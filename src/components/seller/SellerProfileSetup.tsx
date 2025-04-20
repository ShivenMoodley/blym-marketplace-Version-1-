import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, CheckCircle, DollarSign, BarChart2, Upload, FileText, Lock } from "lucide-react";

// Listing types
type ListingType = "standard" | "premium";

// Business categories
const BUSINESS_CATEGORIES = [
  "SaaS",
  "eCommerce",
  "Mobile App",
  "Content/Media",
  "Agency/Service",
  "Marketplace",
  "Community",
  "Other"
];

// Company size options
const COMPANY_SIZES = [
  "Solo founder",
  "2-5 employees",
  "6-10 employees",
  "11-25 employees",
  "26-50 employees",
  "51+ employees"
];

// Reason for selling options
const SELLING_REASONS = [
  "Moving on to next project",
  "Need capital for other ventures",
  "Lack of time to grow further",
  "Looking to retire",
  "Strategic exit",
  "No longer aligned with interests",
  "Other"
];

// Initial form state
const initialFormData = {
  listingType: "standard" as ListingType,
  businessName: "",
  website: "",
  tagline: "",
  businessCategory: "",
  companySize: "",
  teamInfo: "",
  revenue: "",
  profit: "",
  mrr: "",
  arr: "",
  businessSummary: "",
  sellingPoints: [""],
  reasonForSelling: "",
  growthPotential: "",
  preferredBuyerCriteria: "",
  askingPrice: "",
  openToOffers: true,
  keepPrivate: true
};

export default function SellerProfileSetup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);

  const handleChange = (field: keyof typeof initialFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddSellingPoint = () => {
    setFormData(prev => ({
      ...prev,
      sellingPoints: [...prev.sellingPoints, ""]
    }));
  };

  const handleUpdateSellingPoint = (index: number, value: string) => {
    setFormData(prev => {
      const updatedPoints = [...prev.sellingPoints];
      updatedPoints[index] = value;
      return { ...prev, sellingPoints: updatedPoints };
    });
  };

  const handleRemoveSellingPoint = (index: number) => {
    setFormData(prev => {
      const updatedPoints = [...prev.sellingPoints];
      updatedPoints.splice(index, 1);
      return { ...prev, sellingPoints: updatedPoints };
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).map(file => file.name);
      setUploadedDocs(prev => [...prev, ...newFiles]);
    }
  };

  const handleSubmit = async () => {
    // Here you would implement the actual submission to your backend
    console.log("Submitting seller profile:", formData);
    // Redirect to seller dashboard after successful submission
    // navigate("/seller/dashboard");
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Choose a Listing Type</CardTitle>
              <CardDescription>
                Select how you want to list your business on our marketplace
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div 
                  className={`p-6 border rounded-lg cursor-pointer ${
                    formData.listingType === "standard" 
                      ? "border-2 border-primary" 
                      : "border-border"
                  }`}
                  onClick={() => handleChange("listingType", "standard")}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-lg">Standard Listing</h3>
                      <p className="text-muted-foreground">Free</p>
                    </div>
                    {formData.listingType === "standard" && (
                      <CheckCircle className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <div className="mt-4">
                    <p>• Basic exposure to buyers</p>
                    <p>• Standard placement in search results</p>
                    <p>• Basic analytics on listing views</p>
                  </div>
                </div>

                <div 
                  className={`p-6 border rounded-lg cursor-pointer ${
                    formData.listingType === "premium" 
                      ? "border-2 border-primary" 
                      : "border-border"
                  }`}
                  onClick={() => handleChange("listingType", "premium")}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-lg">Premium Listing</h3>
                      <p className="text-muted-foreground">Paid</p>
                    </div>
                    {formData.listingType === "premium" && (
                      <CheckCircle className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <div className="mt-4">
                    <p>• Priority placement in search results</p>
                    <p>• Enhanced visibility with featured badge</p>
                    <p>• Access to premium buyers</p>
                    <p>• Personalized support throughout the selling process</p>
                    <p>• Detailed analytics on buyer engagement</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <div></div>
                <Button onClick={nextStep} className="flex items-center gap-2">
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      
      case 2:
        return (
          <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Company Information</CardTitle>
              <CardDescription>
                Tell us about your business
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Business Name</label>
                  <Input
                    value={formData.businessName}
                    onChange={(e) => handleChange("businessName", e.target.value)}
                    placeholder="Your company name"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Website</label>
                  <Input
                    value={formData.website}
                    onChange={(e) => handleChange("website", e.target.value)}
                    placeholder="https://example.com"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Tagline</label>
                  <Input
                    value={formData.tagline}
                    onChange={(e) => handleChange("tagline", e.target.value)}
                    placeholder="Brief description of what your business does"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Business Category</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    {BUSINESS_CATEGORIES.map((category) => (
                      <div 
                        key={category}
                        className={`p-3 border rounded-md cursor-pointer text-center ${
                          formData.businessCategory === category 
                            ? "border-2 border-primary bg-primary/10" 
                            : "border-border"
                        }`}
                        onClick={() => handleChange("businessCategory", category)}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Company Size</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    {COMPANY_SIZES.map((size) => (
                      <div 
                        key={size}
                        className={`p-3 border rounded-md cursor-pointer text-center ${
                          formData.companySize === size 
                            ? "border-2 border-primary bg-primary/10" 
                            : "border-border"
                        }`}
                        onClick={() => handleChange("companySize", size)}
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Team Information</label>
                  <Textarea
                    value={formData.teamInfo}
                    onChange={(e) => handleChange("teamInfo", e.target.value)}
                    placeholder="Describe your team structure and key roles"
                    className="w-full min-h-[100px]"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={prevStep} className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button onClick={nextStep} className="flex items-center gap-2">
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Business Metrics & Financials</CardTitle>
              <CardDescription>
                Share key financial information to help buyers evaluate your business
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      <DollarSign className="h-4 w-4 inline mr-1" /> Annual Revenue
                    </label>
                    <Input
                      value={formData.revenue}
                      onChange={(e) => handleChange("revenue", e.target.value)}
                      placeholder="ZAR"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      <DollarSign className="h-4 w-4 inline mr-1" /> Annual Profit
                    </label>
                    <Input
                      value={formData.profit}
                      onChange={(e) => handleChange("profit", e.target.value)}
                      placeholder="ZAR"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      <BarChart2 className="h-4 w-4 inline mr-1" /> Monthly Recurring Revenue (MRR)
                    </label>
                    <Input
                      value={formData.mrr}
                      onChange={(e) => handleChange("mrr", e.target.value)}
                      placeholder="ZAR"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      <BarChart2 className="h-4 w-4 inline mr-1" /> Annual Recurring Revenue (ARR)
                    </label>
                    <Input
                      value={formData.arr}
                      onChange={(e) => handleChange("arr", e.target.value)}
                      placeholder="ZAR"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-medium text-lg mb-3">Connect Financial Services</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect your accounts to verify metrics and increase buyer trust
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {["Stripe", "QuickBooks", "Baremetrics", "Google Analytics"].map(service => (
                      <Button key={service} variant="outline" className="h-auto py-4 flex flex-col gap-2">
                        <span>{service}</span>
                        <span className="text-xs text-muted-foreground">Connect</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-medium text-lg mb-3">Upload Financial Documents</h3>
                  
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="mb-2">Drag & drop files or click to browse</p>
                    <p className="text-xs text-muted-foreground mb-4">
                      P&L statements, bank statements, or other financial documents
                    </p>
                    <input
                      type="file"
                      id="financial-docs"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <Button 
                      variant="secondary" 
                      onClick={() => document.getElementById("financial-docs")?.click()}
                    >
                      Select Files
                    </Button>
                  </div>

                  {uploadedDocs.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Uploaded Documents</h4>
                      <ul className="space-y-2">
                        {uploadedDocs.map((doc, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={prevStep} className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button onClick={nextStep} className="flex items-center gap-2">
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Business Summary & Highlights</CardTitle>
              <CardDescription>
                Tell potential buyers about your business and why it's valuable
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Business Summary</label>
                  <Textarea
                    value={formData.businessSummary}
                    onChange={(e) => handleChange("businessSummary", e.target.value)}
                    placeholder="Describe what your business does, its history, and main offerings"
                    className="w-full min-h-[150px]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Unique Selling Points</label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Highlight competitive advantages that make your business stand out
                  </p>
                  
                  {formData.sellingPoints.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-2 mb-3">
                      <Input
                        value={point}
                        onChange={(e) => handleUpdateSellingPoint(idx, e.target.value)}
                        placeholder={`Selling point ${idx + 1}`}
                        className="flex-1"
                      />
                      {formData.sellingPoints.length > 1 && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRemoveSellingPoint(idx)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    onClick={handleAddSellingPoint}
                    className="mt-2"
                  >
                    Add Another Selling Point
                  </Button>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Reason for Selling</label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {SELLING_REASONS.map((reason) => (
                      <div 
                        key={reason}
                        className={`p-3 border rounded-md cursor-pointer text-center ${
                          formData.reasonForSelling === reason 
                            ? "border-2 border-primary bg-primary/10" 
                            : "border-border"
                        }`}
                        onClick={() => handleChange("reasonForSelling", reason)}
                      >
                        {reason}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Growth Potential</label>
                  <Textarea
                    value={formData.growthPotential}
                    onChange={(e) => handleChange("growthPotential", e.target.value)}
                    placeholder="Describe opportunities for expanding the business"
                    className="w-full min-h-[100px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Preferred Buyer Criteria (Optional)</label>
                  <Textarea
                    value={formData.preferredBuyerCriteria}
                    onChange={(e) => handleChange("preferredBuyerCriteria", e.target.value)}
                    placeholder="Describe your ideal buyer (experience, location, etc.)"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={prevStep} className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button onClick={nextStep} className="flex items-center gap-2">
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Valuation & Privacy</CardTitle>
              <CardDescription>
                Set your asking price and privacy preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Asking Price (Optional)</label>
                  <Input
                    value={formData.askingPrice}
                    onChange={(e) => handleChange("askingPrice", e.target.value)}
                    placeholder="$"
                    className="w-full"
                  />
                  
                  <div className="flex items-center mt-3">
                    <Checkbox 
                      id="open-to-offers" 
                      checked={formData.openToOffers}
                      onCheckedChange={(checked) => handleChange("openToOffers", checked)}
                    />
                    <label 
                      htmlFor="open-to-offers" 
                      className="text-sm font-medium ml-2 cursor-pointer"
                    >
                      I'm open to offers
                    </label>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="font-medium text-lg mb-2">Listing Privacy</h3>
                  
                  <div className="flex items-start gap-3 p-4 border rounded-lg">
                    <Lock className="h-5 w-5 mt-1" />
                    <div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="keep-private" 
                          checked={formData.keepPrivate}
                          onCheckedChange={(checked) => handleChange("keepPrivate", checked)}
                        />
                        <label 
                          htmlFor="keep-private" 
                          className="text-sm font-medium ml-2 cursor-pointer"
                        >
                          Keep company name and URL private
                        </label>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Your business name and website will be blurred until a buyer signs an NDA.
                        This helps protect your confidentiality during the selling process.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium text-lg mb-2">What Happens Next?</h3>
                  <ol className="space-y-3 text-sm">
                    <li className="flex gap-2">
                      <span className="font-medium">1.</span>
                      <span>Our team will review your listing (usually within 24-48 hours)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">2.</span>
                      <span>We may reach out for clarifications or additional information</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">3.</span>
                      <span>Once approved, your listing will go live on our marketplace</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium">4.</span>
                      <span>You'll receive notifications when buyers express interest</span>
                    </li>
                  </ol>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={prevStep} className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button onClick={handleSubmit} className="flex items-center gap-2">
                  Submit Listing
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-2">Create Your Listing</h1>
      <p className="text-center text-muted-foreground mb-8">
        Fill out the form below to list your business for sale
      </p>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          {[1, 2, 3, 4, 5].map((item) => (
            <div 
              key={item} 
              className={`relative flex flex-col items-center ${
                item < 5 ? 'flex-1' : ''
              }`}
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  item <= step
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-background border-muted-foreground/30 text-muted-foreground"
                }`}
              >
                {item < step ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span>{item}</span>
                )}
              </div>
              <div className="text-xs mt-1 font-medium hidden sm:block">
                {item === 1 && "Listing Type"}
                {item === 2 && "Company Info"}
                {item === 3 && "Financials"}
                {item === 4 && "Summary"}
                {item === 5 && "Valuation"}
              </div>
              {item < 5 && (
                <div 
                  className={`absolute top-5 w-full h-[2px] left-1/2 ${
                    item < step ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {renderStep()}
    </div>
  );
}
