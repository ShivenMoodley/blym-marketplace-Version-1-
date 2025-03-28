import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ArrowUp, CheckCircle } from "lucide-react";

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;

    const animateOnScroll = () => {
      const elements = heroElement.querySelectorAll(".animate-on-scroll");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        if (isVisible) {
          (el as HTMLElement).style.opacity = "1";
          (el as HTMLElement).style.transform = "translateY(0)";
        }
      });
    };

    // Initial check
    setTimeout(animateOnScroll, 100);

    window.addEventListener("scroll", animateOnScroll);
    return () => window.removeEventListener("scroll", animateOnScroll);
  }, []);

  return (
    <div
      ref={heroRef}
      className={`relative flex items-center justify-center overflow-hidden pt-16 pb-10 ${isMobile ? 'min-h-full' : 'min-h-screen'} hero-container`}
    >
      {/* Background circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blym-soft-pink/20 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-blym-light-blue/20 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className={`grid grid-cols-1 ${isMobile ? '' : 'lg:grid-cols-2'} gap-8 lg:gap-12 items-center`}>
          <div className="text-left space-y-4 sm:space-y-6 animate-fade-in">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-black/5 mb-4">
              <span className="text-sm font-medium text-gray-900">Business Marketplace</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              The Modern Way to <span className="text-balance bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">Buy & Sell Businesses</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xl">
              Connecting buyers, sellers, and investors with AI-powered tools and expert guidance for successful business transactions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-black hover:bg-gray-900 text-white transition-smooth touch-target"
                onClick={() => document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-gray-300 hover:bg-gray-100 transition-smooth touch-target"
                onClick={() => document.getElementById("sell")?.scrollIntoView({ behavior: "smooth" })}
              >
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Hero graphic and animations - Completely redesigned for mobile */}
          <div className={`relative animate-fade-in-up ${isMobile ? 'mt-6' : ''}`}>
            <div className="relative w-full aspect-[4/3] bg-white rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blym-soft-pink/10 via-white to-blym-light-blue/10"></div>
              
              {/* Main display area */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* AI Valuation Report Card - Redesigned to match the image */}
                {isMobile ? (
                  <div className="flex flex-col w-full max-w-[320px] gap-4">
                    {/* Main Card */}
                    <Card className="w-full shadow-md border border-gray-100 bg-white">
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center space-y-4 mb-4">
                          <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                            <FileText className="h-6 w-6 text-gray-800" />
                          </div>
                          <h3 className="text-lg font-semibold">AI Valuation Report</h3>
                        </div>
                        
                        <div className="space-y-2 mb-6">
                          <div className="h-2.5 w-full bg-gray-100 rounded-full"></div>
                          <div className="h-2.5 w-5/6 bg-gray-100 rounded-full"></div>
                          <div className="h-2.5 w-4/6 bg-gray-100 rounded-full"></div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-left">
                            <p className="text-sm text-gray-500">Estimated Value</p>
                            <p className="text-lg font-semibold">R1.2M - R1.5M</p>
                          </div>
                          <div className="h-8 w-8 bg-green-50 rounded-full flex items-center justify-center">
                            <ArrowUp className="h-4 w-4 text-green-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Two smaller cards in a row */}
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="bg-white shadow-sm border border-gray-100">
                        <CardContent className="p-4 flex flex-col items-center justify-center">
                          <p className="text-xs text-gray-500 mb-1">Annual Revenue</p>
                          <p className="text-lg font-semibold">R4.2M</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-white shadow-sm border border-gray-100">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                              <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                            </div>
                            <div className="text-sm font-medium">Verified Seller</div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ) : (
                  // Desktop version remains the same
                  <Card className="w-4/5 shadow-lg bg-white/90 border-gray-100">
                    <CardContent className="p-6 space-y-6">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <FileText className="h-8 w-8 text-gray-800" />
                        </div>
                        <h3 className="text-xl font-semibold">AI Valuation Report</h3>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="h-3 w-full bg-gray-100 rounded-full"></div>
                        <div className="h-3 w-5/6 bg-gray-100 rounded-full"></div>
                        <div className="h-3 w-4/6 bg-gray-100 rounded-full"></div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="text-left">
                          <p className="text-sm text-gray-500">Estimated Value</p>
                          <p className="text-xl font-semibold">R1.2M - R1.5M</p>
                        </div>
                        <div className="h-8 w-8 bg-green-50 rounded-full flex items-center justify-center">
                          <ArrowUp className="h-4 w-4 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
            
            {/* Floating elements on desktop only */}
            {!isMobile && (
              <>
                <div className="absolute -top-6 -right-6 w-32 h-32 animate-float delay-100">
                  <Card className="w-full h-full bg-white/70 shadow-lg">
                    <CardContent className="h-full flex items-center justify-center p-4">
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Annual Revenue</div>
                        <div className="text-lg font-semibold">R4.2M</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="absolute -bottom-4 -left-4 animate-float delay-300">
                  <Card className="bg-white/70 shadow-lg">
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="text-sm font-medium">Verified Seller</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
