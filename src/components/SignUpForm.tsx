import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const SignUpForm: React.FC = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    interest: "buying",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form submitted:", formState);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section id="signup" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 animate-fade-in">
            <div className="inline-flex items-center py-1 px-3 rounded-full bg-black/5 mb-4">
              <span className="text-sm font-medium">Get Started</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join the Web3 M&A Marketplace
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Whether you're looking to acquire a protocol, exit your dApp, or invest in on-chain businesses — Blym is built for you.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl animate-fade-in-up">
            {isSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold">Thank You!</h3>
                <p className="text-gray-600">
                  We've received your information and will be in touch soon to help with your {formState.interest === "buying" ? "acquisition" : formState.interest === "selling" ? "exit" : "investment"} journey.
                </p>
                <Button
                  className="mt-4 bg-black text-white hover:bg-gray-900 transition-smooth"
                  onClick={() => setIsSubmitted(false)}
                >
                  Submit Another Request
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-semibold mb-6">Get Started with Blym</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" type="text" placeholder="John Smith" value={formState.name} onChange={handleChange} required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" placeholder="john@example.com" value={formState.email} onChange={handleChange} required className="mt-1" />
                  </div>
                  <div>
                    <Label>I'm interested in</Label>
                    <RadioGroup value={formState.interest} onValueChange={handleInterestChange} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-smooth">
                        <RadioGroupItem value="buying" id="option-buying" />
                        <Label htmlFor="option-buying" className="cursor-pointer">Acquiring a dApp</Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-smooth">
                        <RadioGroupItem value="selling" id="option-selling" />
                        <Label htmlFor="option-selling" className="cursor-pointer">Selling / Exiting</Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-smooth">
                        <RadioGroupItem value="investing" id="option-investing" />
                        <Label htmlFor="option-investing" className="cursor-pointer">Investing</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full bg-black text-white hover:bg-gray-900 transition-smooth">
                  {isSubmitting ? "Processing..." : "Create Your Account"}
                </Button>
                <p className="text-xs text-gray-500 text-center mt-4">
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
