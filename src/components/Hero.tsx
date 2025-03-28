
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

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
          
          {/* Hero graphic and animations */}
          <div className={`relative animate-fade-in-up ${isMobile ? 'mt-6' : ''}`}>
            <div className="relative w-full aspect-[4/3] bg-white rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blym-soft-pink/10 via-white to-blym-light-blue/10"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`${isMobile ? 'w-11/12' : 'w-4/5'} h-4/5 glass rounded-xl flex items-center justify-center bg-white/50 prevent-overlap`}>
                  <div className="space-y-4 sm:space-y-6 px-4 sm:px-6 py-6 sm:py-8 text-center">
                    <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mx-auto">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-8 w-8 text-gray-800" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={1.5} 
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">AI Valuation Report</h3>
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-gray-100 rounded-full"></div>
                      <div className="h-3 w-5/6 bg-gray-100 rounded-full"></div>
                      <div className="h-3 w-4/6 bg-gray-100 rounded-full"></div>
                    </div>
                    <div className="pt-2 sm:pt-4">
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <p className="text-sm text-gray-500">Estimated Value</p>
                          <p className="text-xl font-semibold">R1.2M - R1.5M</p>
                        </div>
                        <div className="h-8 w-8 bg-green-50 rounded-full flex items-center justify-center">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-4 w-4 text-green-600" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M5 10l7-7m0 0l7 7m-7-7v18" 
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements with mobile fix */}
            <div className={`${isMobile ? 'mobile-float-fix' : 'absolute -top-6 -right-6 w-32 h-32 animate-float delay-100'}`}>
              <div className="w-full h-full glass rounded-lg bg-white/70 shadow-lg flex items-center justify-center p-4 prevent-overlap">
                <div className="text-center">
                  <div className="text-xs text-gray-500">Annual Revenue</div>
                  <div className="text-lg font-semibold">R4.2M</div>
                </div>
              </div>
            </div>
            
            <div className={`${isMobile ? 'mobile-float-fix' : 'absolute -bottom-4 -left-4 animate-float delay-300'}`}>
              <div className="glass rounded-lg bg-white/70 shadow-lg p-3 prevent-overlap">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 text-green-600" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                  </div>
                  <div className="text-sm font-medium">Verified Seller</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
