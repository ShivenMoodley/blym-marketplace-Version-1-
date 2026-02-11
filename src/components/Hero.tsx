import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

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

    setTimeout(animateOnScroll, 100);
    window.addEventListener("scroll", animateOnScroll);
    return () => window.removeEventListener("scroll", animateOnScroll);
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blym-soft-pink/20 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-blym-light-blue/20 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="text-left space-y-6 animate-fade-in">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-black/5 mb-4">
              <span className="text-sm font-medium text-gray-900">Web3-Native M&A Marketplace</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              Where Web3 Businesses <span className="text-balance bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">Change Hands</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-xl">
              Buy or sell dApps, DeFi protocols, tokenized projects, and on-chain IP with crypto-native escrow, on-chain due diligence, and programmable settlement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/choose-role">
                <Button 
                  size="lg" 
                  className="bg-black hover:bg-gray-900 text-white transition-smooth"
                >
                  Get Started
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-gray-300 hover:bg-gray-100 transition-smooth"
                onClick={() => document.getElementById("marketplace")?.scrollIntoView({ behavior: "smooth" })}
              >
                Explore Features
              </Button>
            </div>
          </div>
          
          {/* Hero graphic — on-chain deal card */}
          <div className="relative animate-fade-in-up">
            <div className="relative w-full aspect-[4/3] bg-white rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blym-soft-pink/10 via-white to-blym-light-blue/10"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4/5 h-4/5 glass rounded-xl flex items-center justify-center bg-white/50">
                  <div className="space-y-6 px-6 py-8 text-center">
                    <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mx-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">On-Chain Valuation</h3>
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-gray-100 rounded-full"></div>
                      <div className="h-3 w-5/6 bg-gray-100 rounded-full"></div>
                      <div className="h-3 w-4/6 bg-gray-100 rounded-full"></div>
                    </div>
                    <div className="pt-4">
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <p className="text-sm text-gray-500">Protocol TVL</p>
                          <p className="text-xl font-semibold">$1.2M USDC</p>
                        </div>
                        <div className="h-8 w-8 bg-green-50 rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 animate-float delay-100">
              <div className="w-full h-full glass rounded-lg bg-white/70 shadow-lg flex items-center justify-center p-4">
                <div className="text-center">
                  <div className="text-xs text-gray-500">Monthly Revenue</div>
                  <div className="text-lg font-semibold">42K USDC</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 animate-float delay-300">
              <div className="glass rounded-lg bg-white/70 shadow-lg p-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium">Verified On-Chain</div>
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
