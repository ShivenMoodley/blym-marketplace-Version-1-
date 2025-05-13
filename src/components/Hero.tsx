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
      className={`relative flex items-center justify-center overflow-hidden ${
        isMobile ? 'pt-28 pb-10' : 'min-h-screen pt-16 pb-10'
      } hero-container`}
    >
      {/* Background circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blym-soft-pink/20 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-blym-light-blue/20 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className={`grid grid-cols-1 ${isMobile ? '' : 'lg:grid-cols-2'} gap-8 lg:gap-12 items-center`}>
          <div className="text-left space-y-4 sm:space-y-6 animate-fade-in">
            {/* Adjusted mobile layout for the badge */}
            <div className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-black/5 ${isMobile ? 'mb-2' : 'mb-4'}`}>
              <span className="text-sm font-medium text-gray-900">Business Marketplace</span>
            </div>
            
            {/* Adjusted heading size for mobile */}
            <h1 className={`${isMobile ? 'text-2xl leading-tight' : 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl'} font-bold leading-tight text-balance`}>
              The Modern Way to <span className="text-balance bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">Buy & Sell Businesses</span>
            </h1>
            
            {/* Simplified description for mobile */}
            <p className={`${isMobile ? 'text-sm' : 'text-base sm:text-lg md:text-xl'} text-gray-600 max-w-xl`}>
              Connecting buyers, sellers, and investors with AI-powered tools and expert guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size={isMobile ? "default" : "lg"}
                className="bg-black hover:bg-gray-900 text-white transition-smooth touch-target"
                onClick={() => document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size={isMobile ? "default" : "lg"}
                className="border-gray-300 hover:bg-gray-100 transition-smooth touch-target"
                onClick={() => document.getElementById("sell")?.scrollIntoView({ behavior: "smooth" })}
              >
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Hero graphic - size reduced for mobile */}
          <div className={`relative animate-fade-in-up ${isMobile ? 'mt-6' : ''}`}>
            <div className={`relative w-full ${isMobile ? 'aspect-[16/10]' : 'aspect-[4/3]'} bg-white rounded-2xl overflow-hidden shadow-xl`}>
              <div className="absolute inset-0 bg-gradient-to-br from-blym-soft-pink/10 via-white to-blym-light-blue/10"></div>
              
              {/* Main display area - simplified for mobile */}
              <div className="absolute inset-0 flex items-center justify-center">
                {isMobile ? (
                  <div className="w-full max-w-[280px] mx-auto">
                    <Card className="w-full shadow-md border border-gray-100 bg-white mb-4">
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center text-center mb-3">
                          <h3 className="text-md font-semibold mt-1">AI Valuation</h3>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="h-2 w-full bg-gray-100 rounded-full"></div>
                          <div className="h-2 w-5/6 bg-gray-100 rounded-full"></div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-left">
                            <p className="text-xs text-gray-500">Value</p>
                            <p className="text-sm font-semibold">R1.2M - R1.5M</p>
                          </div>
                          <div className="h-5 w-5 text-green-600">
                            <ArrowUp className="h-4 w-4" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
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
