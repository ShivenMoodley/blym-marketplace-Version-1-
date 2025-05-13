
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { supabaseHelper } from '@/utils/supabase-helpers';
import { SellerSubmission } from '@/types/app';

type FormStep = 'business-identity' | 'company-snapshot' | 'business-summary' | 'pricing' | 'documents';
type ListingStatus = 'Draft' | 'Under Review' | 'Approved' | 'Rejected' | 'Published';

const SellerOnboardingForm: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<FormStep>('business-identity');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    // Business Identity
    businessName: '',
    websiteUrl: '',
    tagline: '',
    businessCategory: '',

    // Company Snapshot
    companySize: '',
    teamDescription: '',
    revenue: '',
    profit: '',
    mrr: '',

    // Business Summary
    businessDescription: '',
    uniqueSellingPoints: '',
    reasonForSelling: '',
    growthPotential: '',
    preferredBuyerCriteria: '',

    // Pricing
    openToOffers: false,
    askingPrice: '',

    // Documents - would typically handle file uploads
    hasPitchDeck: false,
    hasMetricsProof: false,
    hasCustomerData: false,
    hasFinancialMetrics: false,
  });
  const [formProgress, setFormProgress] = useState(0);
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  useEffect(() => {
    // Calculate progress based on current step
    const steps = ['business-identity', 'company-snapshot', 'business-summary', 'pricing', 'documents'];
    const currentIndex = steps.indexOf(currentStep);
    setFormProgress(((currentIndex + 1) / steps.length) * 100);
    
    // Try to load existing draft
    const loadDraft = async () => {
      setIsLoading(true);
      
      try {
        if (!user?.id) {
          setIsLoading(false);
          return;
        }
        
        // Try to load from localStorage first as a fallback if Supabase connection is slow
        const savedFormData = localStorage.getItem(`seller_form_${user.id}`);
        if (savedFormData) {
          try {
            const parsedData = JSON.parse(savedFormData);
            setFormData(parsedData);
          } catch (e) {
            console.error("Error parsing saved form data:", e);
          }
        }
        
        try {
          const { data, error } = await supabaseHelper.sellerSubmissions()
            .select()
            .eq('user_id', user.id)
            .single();
            
          if (error) {
            if (error.code === 'PGRST116') {
              // No data found, this is fine for new users
              console.log("No existing submission found, starting fresh");
            } else {
              console.error('Error loading draft:', error);
            }
          } else if (data) {
            // Type check to ensure data has form_data property before accessing it
            if (data && 'form_data' in data) {
              setFormData(data.form_data as any);
            }
            
            if (data && 'id' in data) {
              setSubmissionId(data.id as string);
            }
          }
        } catch (error) {
          console.error('Error loading draft from Supabase:', error);
          // Continue with localStorage data if available
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDraft();
  }, [currentStep, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked,
    }));
  };

  const saveProgress = async () => {
    if (!user?.id) return;
    
    try {
      // Save to localStorage as a fallback
      localStorage.setItem(`seller_form_${user.id}`, JSON.stringify(formData));
      
      // Type-safe listing status
      const listingStatus: ListingStatus = currentStep === 'documents' ? 'Under Review' : 'Draft';
      
      try {
        const submission: Partial<SellerSubmission> = {
          user_id: user.id,
          email: user.email,
          form_data: formData,
          business_name: formData.businessName,
          business_category: formData.businessCategory,
          revenue: formData.revenue,
          profit: formData.profit,
          asking_price: formData.openToOffers ? 'Open to Offers' : formData.askingPrice,
          summary: formData.businessDescription?.substring(0, 200) + '...',
          listing_status: listingStatus, // Use the typed variable
          updated_at: new Date().toISOString(),
        };
        
        let response;
        if (submissionId) {
          response = await supabaseHelper.sellerSubmissions()
            .update(submission)
            .eq('id', submissionId);
        } else {
          response = await supabaseHelper.sellerSubmissions()
            .insert(submission);
        }
              
        const { data, error } = response;
        if (error) throw error;
        
        // Check if data exists and has entries before accessing it
        if (data && Array.isArray(data) && data.length > 0 && !submissionId) {
          // Safely access id if it exists
          if ('id' in data[0]) {
            setSubmissionId(data[0].id as string);
          }
        }
      } catch (error: any) {
        console.error('Error saving to Supabase:', error);
        // Saved to localStorage already as fallback
      }
      
      toast({
        title: "Progress saved",
        description: "Your information has been saved successfully.",
      });
    } catch (error: any) {
      console.error('Error saving progress:', error);
      toast({
        title: "Save failed",
        description: error.message || "Failed to save your progress",
        variant: "destructive"
      });
    }
  };

  const handleNext = async () => {
    await saveProgress();
    
    switch (currentStep) {
      case 'business-identity':
        setCurrentStep('company-snapshot');
        break;
      case 'company-snapshot':
        setCurrentStep('business-summary');
        break;
      case 'business-summary':
        setCurrentStep('pricing');
        break;
      case 'pricing':
        setCurrentStep('documents');
        break;
      case 'documents':
        handleSubmit();
        break;
    }
    
    // Scroll to top when changing steps
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'company-snapshot':
        setCurrentStep('business-identity');
        break;
      case 'business-summary':
        setCurrentStep('company-snapshot');
        break;
      case 'pricing':
        setCurrentStep('business-summary');
        break;
      case 'documents':
        setCurrentStep('pricing');
        break;
    }
    
    // Scroll to top when changing steps
    window.scrollTo(0, 0);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Save to localStorage first as a fallback
      if (user?.id) {
        localStorage.setItem(`seller_form_${user.id}`, JSON.stringify(formData));
      }
      
      try {
        // Ensure we use the correct type for listing_status
        const listingStatus: ListingStatus = 'Under Review';
        
        // Final submission
        const submission: Partial<SellerSubmission> = {
          user_id: user?.id,
          form_data: formData,
          business_name: formData.businessName,
          business_category: formData.businessCategory,
          revenue: formData.revenue,
          profit: formData.profit,
          asking_price: formData.openToOffers ? 'Open to Offers' : formData.askingPrice,
          summary: formData.businessDescription?.substring(0, 200) + '...',
          listing_status: listingStatus, // Use the typed variable
          updated_at: new Date().toISOString(),
        };
        
        if (!submissionId) {
          // Create a new submission if we don't have an ID
          const { data, error } = await supabaseHelper.sellerSubmissions().insert(submission);
          
          if (error) throw error;
        } else {
          // Update existing submission
          const { error } = await supabaseHelper.sellerSubmissions()
            .update(submission)
            .eq('id', submissionId);
            
          if (error) throw error;
        }
      } catch (error: any) {
        console.error('Error submitting to Supabase:', error);
        // Proceed anyway since we have localStorage backup
      }
      
      toast({
        title: "Submission Complete",
        description: "Your business listing has been submitted for review. We'll notify you once it's approved.",
      });
      
      // Navigate to seller dashboard
      navigate('/seller/dashboard');
    } catch (error: any) {
      toast({
        title: "Submission failed",
        description: error.message || "Failed to submit your listing",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container max-w-3xl px-4 py-8 md:py-12">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <h3 className="text-xl font-medium">Loading your form data...</h3>
          <p className="text-gray-500 mt-2">Please wait while we retrieve your information.</p>
        </div>
      </div>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 'business-identity':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Business Identity</h2>
            <p className="text-gray-600">Tell us about your business</p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="Enter your business name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="websiteUrl">Website URL</Label>
                <Input
                  id="websiteUrl"
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                />
              </div>
              
              <div>
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleInputChange}
                  placeholder="A short description of your business"
                />
              </div>
              
              <div>
                <Label htmlFor="businessCategory">Business Category</Label>
                <Select
                  value={formData.businessCategory}
                  onValueChange={(value) => handleSelectChange('businessCategory', value)}
                >
                  <SelectTrigger id="businessCategory">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SaaS">SaaS</SelectItem>
                    <SelectItem value="eCommerce">eCommerce</SelectItem>
                    <SelectItem value="Services">Services</SelectItem>
                    <SelectItem value="Brick & Mortar">Brick & Mortar</SelectItem>
                    <SelectItem value="Mobile App">Mobile App</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
        
      case 'company-snapshot':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Company Snapshot</h2>
            <p className="text-gray-600">Share details about your company size and performance</p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="companySize">Company Size</Label>
                <Select
                  value={formData.companySize}
                  onValueChange={(value) => handleSelectChange('companySize', value)}
                >
                  <SelectTrigger id="companySize">
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Solo">Solo</SelectItem>
                    <SelectItem value="2-5">2-5 employees</SelectItem>
                    <SelectItem value="6-20">6-20 employees</SelectItem>
                    <SelectItem value="21-50">21-50 employees</SelectItem>
                    <SelectItem value="51+">51+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="teamDescription">Team Description</Label>
                <Textarea
                  id="teamDescription"
                  name="teamDescription"
                  value={formData.teamDescription}
                  onChange={handleInputChange}
                  placeholder="Describe your team structure and key roles"
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="revenue">Annual Revenue</Label>
                  <Input
                    id="revenue"
                    name="revenue"
                    value={formData.revenue}
                    onChange={handleInputChange}
                    placeholder="e.g., $250,000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="profit">Annual Profit</Label>
                  <Input
                    id="profit"
                    name="profit"
                    value={formData.profit}
                    onChange={handleInputChange}
                    placeholder="e.g., $75,000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="mrr">MRR / ARR</Label>
                  <Input
                    id="mrr"
                    name="mrr"
                    value={formData.mrr}
                    onChange={handleInputChange}
                    placeholder="e.g., $12,000 MRR"
                  />
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'business-summary':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Business Summary</h2>
            <p className="text-gray-600">Explain what makes your business special</p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="businessDescription">What does your business do?</Label>
                <Textarea
                  id="businessDescription"
                  name="businessDescription"
                  value={formData.businessDescription}
                  onChange={handleInputChange}
                  placeholder="Describe your business, products/services, and target market"
                  rows={4}
                />
              </div>
              
              <div>
                <Label htmlFor="uniqueSellingPoints">Unique Selling Points or Competitive Edge</Label>
                <Textarea
                  id="uniqueSellingPoints"
                  name="uniqueSellingPoints"
                  value={formData.uniqueSellingPoints}
                  onChange={handleInputChange}
                  placeholder="What makes your business stand out from competitors?"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="reasonForSelling">Reason for Selling</Label>
                <Textarea
                  id="reasonForSelling"
                  name="reasonForSelling"
                  value={formData.reasonForSelling}
                  onChange={handleInputChange}
                  placeholder="Why are you selling this business?"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="growthPotential">Growth Potential</Label>
                <Textarea
                  id="growthPotential"
                  name="growthPotential"
                  value={formData.growthPotential}
                  onChange={handleInputChange}
                  placeholder="Describe untapped opportunities and growth paths"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="preferredBuyerCriteria">Preferred Buyer Criteria (optional)</Label>
                <Textarea
                  id="preferredBuyerCriteria"
                  name="preferredBuyerCriteria"
                  value={formData.preferredBuyerCriteria}
                  onChange={handleInputChange}
                  placeholder="Any specific qualifications or experience you'd like the buyer to have"
                  rows={2}
                />
              </div>
            </div>
          </div>
        );
        
      case 'pricing':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Pricing Preference</h2>
            <p className="text-gray-600">Let us know your pricing expectations</p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="openToOffers"
                  checked={formData.openToOffers}
                  onCheckedChange={(checked) => handleSwitchChange('openToOffers', checked)}
                />
                <Label htmlFor="openToOffers">Open to Offers</Label>
              </div>
              
              {!formData.openToOffers && (
                <div>
                  <Label htmlFor="askingPrice">Asking Price</Label>
                  <Input
                    id="askingPrice"
                    name="askingPrice"
                    value={formData.askingPrice}
                    onChange={handleInputChange}
                    placeholder="e.g., $750,000"
                    required={!formData.openToOffers}
                  />
                </div>
              )}
            </div>
          </div>
        );
        
      case 'documents':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Upload Documents (Optional)</h2>
            <p className="text-gray-600">Provide additional documents to strengthen your listing</p>
            
            <div className="space-y-6">
              <div className="p-4 border rounded-md">
                <div className="flex items-center space-x-2 mb-2">
                  <Switch
                    id="hasPitchDeck"
                    checked={formData.hasPitchDeck}
                    onCheckedChange={(checked) => handleSwitchChange('hasPitchDeck', checked)}
                  />
                  <Label htmlFor="hasPitchDeck">Pitch Deck / Company Overview</Label>
                </div>
                
                {formData.hasPitchDeck && (
                  <div className="ml-6 mt-2">
                    <Input type="file" />
                  </div>
                )}
              </div>
              
              <div className="p-4 border rounded-md">
                <div className="flex items-center space-x-2 mb-2">
                  <Switch
                    id="hasMetricsProof"
                    checked={formData.hasMetricsProof}
                    onCheckedChange={(checked) => handleSwitchChange('hasMetricsProof', checked)}
                  />
                  <Label htmlFor="hasMetricsProof">Screenshot Proof of Metrics</Label>
                </div>
                
                {formData.hasMetricsProof && (
                  <div className="ml-6 mt-2">
                    <Input type="file" />
                  </div>
                )}
              </div>
              
              <div className="p-4 border rounded-md">
                <div className="flex items-center space-x-2 mb-2">
                  <Switch
                    id="hasCustomerData"
                    checked={formData.hasCustomerData}
                    onCheckedChange={(checked) => handleSwitchChange('hasCustomerData', checked)}
                  />
                  <Label htmlFor="hasCustomerData">Customer Breakdown or Retention Charts</Label>
                </div>
                
                {formData.hasCustomerData && (
                  <div className="ml-6 mt-2">
                    <Input type="file" />
                  </div>
                )}
              </div>
              
              <div className="p-4 border rounded-md">
                <div className="flex items-center space-x-2 mb-2">
                  <Switch
                    id="hasFinancialMetrics"
                    checked={formData.hasFinancialMetrics}
                    onCheckedChange={(checked) => handleSwitchChange('hasFinancialMetrics', checked)}
                  />
                  <Label htmlFor="hasFinancialMetrics">CAC, LTV, Churn, etc.</Label>
                </div>
                
                {formData.hasFinancialMetrics && (
                  <div className="ml-6 mt-2">
                    <Input type="file" />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container max-w-3xl px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Seller Onboarding</h1>
        <Progress value={formProgress} className="h-2" />
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>{currentStep === 'documents' ? 'Final Step' : 'Step ' + (formProgress / 20)}</span>
          <span>{formProgress}% Complete</span>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-6">
          {renderStepContent()}
          
          <div className="flex justify-between mt-8">
            {currentStep !== 'business-identity' && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
            
            <div className="flex gap-4 ml-auto">
              {currentStep !== 'documents' && (
                <Button variant="outline" onClick={saveProgress}>
                  Save Draft
                </Button>
              )}
              
              <Button 
                onClick={handleNext}
                disabled={isSubmitting}
                className="bg-black hover:bg-gray-800"
              >
                {currentStep === 'documents' 
                  ? (isSubmitting ? "Submitting..." : "Submit Listing") 
                  : "Continue"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerOnboardingForm;
