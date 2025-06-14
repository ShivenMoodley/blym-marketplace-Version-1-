
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const BuyerProfileSetup: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    phone: "",
    location: "",
    
    // Investment Preferences
    investmentRange: "",
    preferredIndustries: [] as string[],
    businessSize: "",
    
    // Experience & Background
    businessExperience: "",
    previousAcquisitions: "",
    financingNeeds: "",
    
    // Investment Criteria
    timeframe: "",
    geography: "",
    additionalNotes: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Buyer profile setup:", formData);
    setIsLoading(false);
    
    // Redirect to buyer dashboard
    navigate("/buyer-dashboard");
  };

  const industries = [
    "Technology", "Healthcare", "Retail", "Manufacturing", "Food & Beverage",
    "Professional Services", "Real Estate", "Construction", "Transportation",
    "Education", "Entertainment", "Agriculture", "Other"
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step <= currentStep
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-24 h-1 mx-2 ${
                        step < currentStep ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Personal Info</span>
              <span>Investment Preferences</span>
              <span>Experience & Criteria</span>
            </div>
          </div>

          <Card className="border-2">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Complete Your Buyer Profile</CardTitle>
              <CardDescription>
                Help us match you with the perfect business opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        type="text"
                        placeholder="City, State"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold mb-4">Investment Preferences</h3>
                    
                    <div>
                      <Label htmlFor="investmentRange">Investment Range</Label>
                      <Select onValueChange={(value) => handleSelectChange("investmentRange", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select your investment range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-100k">Under $100K</SelectItem>
                          <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                          <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                          <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                          <SelectItem value="5m-10m">$5M - $10M</SelectItem>
                          <SelectItem value="over-10m">Over $10M</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="businessSize">Preferred Business Size</Label>
                      <Select onValueChange={(value) => handleSelectChange("businessSize", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select business size preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small (1-10 employees)</SelectItem>
                          <SelectItem value="medium">Medium (11-50 employees)</SelectItem>
                          <SelectItem value="large">Large (50+ employees)</SelectItem>
                          <SelectItem value="no-preference">No Preference</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold mb-4">Experience & Investment Criteria</h3>
                    
                    <div>
                      <Label htmlFor="businessExperience">Business Experience</Label>
                      <Select onValueChange={(value) => handleSelectChange("businessExperience", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="first-time">First-time buyer</SelectItem>
                          <SelectItem value="some-experience">Some business experience</SelectItem>
                          <SelectItem value="experienced">Experienced entrepreneur</SelectItem>
                          <SelectItem value="serial-acquirer">Serial acquirer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="timeframe">Investment Timeframe</Label>
                      <Select onValueChange={(value) => handleSelectChange("timeframe", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="When are you looking to invest?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediately</SelectItem>
                          <SelectItem value="3-months">Within 3 months</SelectItem>
                          <SelectItem value="6-months">Within 6 months</SelectItem>
                          <SelectItem value="1-year">Within 1 year</SelectItem>
                          <SelectItem value="exploring">Just exploring</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="geography">Geographic Preference</Label>
                      <Input
                        id="geography"
                        name="geography"
                        type="text"
                        placeholder="e.g., Local, Regional, National, No Preference"
                        value={formData.geography}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="additionalNotes">Additional Notes</Label>
                      <Textarea
                        id="additionalNotes"
                        name="additionalNotes"
                        placeholder="Tell us more about what you're looking for in a business..."
                        value={formData.additionalNotes}
                        onChange={handleInputChange}
                        className="mt-1"
                        rows={4}
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrevious}
                    >
                      Previous
                    </Button>
                  )}
                  
                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="ml-auto bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="ml-auto bg-blue-600 text-white hover:bg-blue-700"
                    >
                      {isLoading ? "Setting up profile..." : "Complete Setup"}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default BuyerProfileSetup;
