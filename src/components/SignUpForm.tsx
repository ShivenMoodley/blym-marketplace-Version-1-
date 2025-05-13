import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import { supabaseHelper } from "@/utils/supabase-helpers";
import { toast } from "@/components/ui/use-toast";

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    interest: "buying",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isMobile = useIsMobile();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestChange = (value: string) => {
    setFormState((prev) => ({ ...prev, interest: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Add to Supabase waitlist table
      const { error } = await supabaseHelper.from("waitlist").insert({
        name: formState.name,
        email: formState.email,
        interest: formState.interest,
        created_at: new Date().toISOString()
      });
      
      if (error) throw error;
      
      console.log("Form submitted successfully to waitlist:", formState);
      
      if (formState.interest === 'buying') {
        // Redirect to buyer profile setup
        navigate("/buyer/setup");
      } else {
        // For now, just show success message
        setIsSubmitted(true);
        toast({
          title: "Joined Waitlist!",
          description: "We've added you to our waitlist and will be in touch soon.",
        });
      }
    } catch (error) {
      console.error("Exception submitting form:", error);
      toast({
        title: "Submission failed",
        description: "There was an error joining the waitlist. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="signup"
      className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="section-container px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 md:mb-10 animate-fade-in">
            <div className="inline-flex items-center py-1 px-3 rounded-full bg-black/5 mb-3 md:mb-4">
              <span className="text-sm font-medium">Waitlist</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
              Begin Your Business Journey Today
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base px-2">
              Whether you're looking to buy, sell, or secure financing, we're here to help you navigate the process with confidence.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 md:p-10 shadow-xl animate-fade-in-up">
            {isSubmitted ? (
              <div className="text-center py-6 md:py-8 space-y-3 md:space-y-4">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 md:h-8 md:w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold">Thank You!</h3>
                <p className="text-gray-600 text-sm md:text-base px-2">
                  We've received your information and will be in touch soon to help with your {formState.interest} journey.
                </p>
                <Button
                  className="mt-3 md:mt-4 bg-black text-white hover:bg-gray-900 transition-smooth"
                  onClick={() => setIsSubmitted(false)}
                >
                  Submit Another Request
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-center">Join Our Waitlist</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="block text-center mb-2">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Smith"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="block text-center mb-2">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label className="block text-center mb-2">Business Interest</Label>
                    {isMobile ? (
                      <RadioGroup
                        value={formState.interest}
                        onValueChange={handleInterestChange}
                        className="space-y-2 mt-2"
                      >
                        <div className={`flex items-center px-4 py-3 rounded-full border ${formState.interest === 'buying' ? 'border-black bg-black/5' : 'border-gray-200'}`}>
                          <RadioGroupItem value="buying" id="option-buying" className="mr-3" />
                          <Label htmlFor="option-buying" className="flex-grow text-center mr-5">Buying</Label>
                        </div>
                        
                        <div className={`flex items-center px-4 py-3 rounded-full border ${formState.interest === 'selling' ? 'border-black bg-black/5' : 'border-gray-200'}`}>
                          <RadioGroupItem value="selling" id="option-selling" className="mr-3" />
                          <Label htmlFor="option-selling" className="flex-grow text-center mr-5">Selling</Label>
                        </div>
                        
                        <div className={`flex items-center px-4 py-3 rounded-full border ${formState.interest === 'financing' ? 'border-black bg-black/5' : 'border-gray-200'}`}>
                          <RadioGroupItem value="financing" id="option-financing" className="mr-3" />
                          <Label htmlFor="option-financing" className="flex-grow text-center mr-5">Financing</Label>
                        </div>
                      </RadioGroup>
                    ) : (
                      <RadioGroup
                        value={formState.interest}
                        onValueChange={handleInterestChange}
                        className="grid grid-cols-3 gap-4 mt-2"
                      >
                        <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-smooth">
                          <RadioGroupItem value="buying" id="option-buying" />
                          <Label htmlFor="option-buying" className="cursor-pointer">Buying</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-smooth">
                          <RadioGroupItem value="selling" id="option-selling" />
                          <Label htmlFor="option-selling" className="cursor-pointer">Selling</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-smooth">
                          <RadioGroupItem value="financing" id="option-financing" />
                          <Label htmlFor="option-financing" className="cursor-pointer">Financing</Label>
                        </div>
                      </RadioGroup>
                    )}
                  </div>
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white hover:bg-gray-900 transition-smooth py-3 rounded-md"
                >
                  {isSubmitting ? "Processing..." : "Join Waitlist"}
                </Button>
                
                <p className="text-xs text-gray-500 text-center mt-3 md:mt-4 px-2">
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;
