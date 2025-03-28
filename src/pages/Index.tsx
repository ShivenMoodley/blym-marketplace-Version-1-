import React from "react";
import MainLayout from "@/layouts/MainLayout";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import SignUpForm from "@/components/SignUpForm";
const Index: React.FC = () => {
  // Feature section data
  const sellFeature = {
    id: "sell",
    title: "Sell Your Business with Confidence",
    subtitle: "For Sellers",
    description: "List your business for sale and connect with qualified buyers and investors. Our AI-powered valuation tool ensures you get a fair price for your business.",
    items: [{
      id: "sell-1",
      text: "List your business in minutes."
    }, {
      id: "sell-2",
      text: "AI-powered valuation tool for fair pricing."
    }, {
      id: "sell-3",
      text: "Connect with verified buyers & investors."
    }],
    backgroundColor: "bg-blym-soft-pink/10",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>,
    imageComponent: <div className="relative w-full aspect-square max-w-md mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-blym-soft-pink/30 to-white rounded-2xl"></div>
        <div className="relative h-full flex items-center justify-center p-8">
          <div className="bg-white/80 rounded-xl p-6 shadow-lg backdrop-blur-sm w-full max-w-xs mx-auto">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-blym-soft-pink/30 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Retail Business</h3>
                      <p className="text-xs text-gray-500">Listed 2 days ago</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500">Asking Price</p>
                  <p className="text-xl font-semibold">R750,000</p>
                </div>
                
                <div className="flex justify-between text-sm">
                  <div>
                    <p className="text-gray-500">Revenue</p>
                    <p className="font-medium">R1.2M</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Profit</p>
                    <p className="font-medium">R280K</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Multiple</p>
                    <p className="font-medium">2.7x</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <div className="h-10 bg-black/5 rounded-lg animate-pulse-slow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
  };
  const buyFeature = {
    id: "buy",
    title: "Find the Right Business to Buy",
    subtitle: "For Buyers",
    description: "Browse businesses of all sizes and industries. Get access to financing options and expert advisory services to make the right purchase.",
    items: [{
      id: "buy-1",
      text: "Browse businesses of all sizes."
    }, {
      id: "buy-2",
      text: "Get private debt & bank financing options."
    }, {
      id: "buy-3",
      text: "Access professional M&A advisory services."
    }],
    backgroundColor: "bg-blym-warm-yellow/10",
    reverse: true,
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>,
    imageComponent: <div className="relative w-full aspect-square max-w-md mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-blym-warm-yellow/30 to-white rounded-2xl"></div>
        <div className="relative h-full flex items-center justify-center p-8">
          <div className="w-full max-w-xs">
            <div className="space-y-4">
              <div className="bg-white/80 rounded-xl p-4 shadow-md backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blym-warm-yellow/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Software Company</h3>
                    <p className="text-xs text-gray-500">SaaS • 15 Employees</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 rounded-xl p-4 shadow-md backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blym-warm-yellow/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">E-commerce Store</h3>
                    <p className="text-xs text-gray-500">Retail • Established</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 rounded-xl p-4 shadow-md backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blym-warm-yellow/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Bakery Chain</h3>
                    <p className="text-xs text-gray-500">Food • 3 Locations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  };
  const financingFeature = {
    id: "financing",
    title: "Rescue Financing for Struggling Businesses",
    subtitle: "For Businesses in Need",
    description: "Secure the funding you need to turn your business around. Connect with private investors and access expert guidance to navigate business recovery.",
    items: [{
      id: "financing-1",
      text: "Equity leverage partnerships & crowdfunding."
    }, {
      id: "financing-2",
      text: "Secure private investors & turnaround funding."
    }, {
      id: "financing-3",
      text: "Expert legal & financial guidance to navigate business recovery."
    }],
    backgroundColor: "bg-blym-lavender/10",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>,
    imageComponent: <div className="relative w-full aspect-square max-w-md mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-blym-lavender/30 to-white rounded-2xl"></div>
        <div className="relative h-full flex items-center justify-center p-8">
          <div className="bg-white/80 rounded-xl p-6 shadow-lg backdrop-blur-sm w-full max-w-xs mx-auto">
            <div className="space-y-6">
              <div className="space-y-2 text-center">
                <div className="w-12 h-12 rounded-full bg-blym-lavender/30 flex items-center justify-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold">Financing Options</h3>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-sm">Bridge Loan</p>
                    <div className="chip bg-green-100 text-green-800">Fast</div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Short-term financing up to R500K</p>
                </div>
                
                <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-sm">Private Equity</p>
                    <div className="chip bg-blue-100 text-blue-800">Growth</div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">For established businesses seeking expansion</p>
                </div>
                
                <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-sm">Turnaround Fund</p>
                    <div className="chip bg-purple-100 text-purple-800">Rescue</div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Specialized financing for business recovery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  };
  const valuationFeature = {
    id: "valuation",
    title: "AI-Powered Valuations & Due Diligence",
    subtitle: "Smart Analytics",
    description: "Get an instant AI-driven valuation of your business. Our smart analytics assess growth potential and provide insights for informed decision-making.",
    items: [{
      id: "valuation-1",
      text: "Instant AI-driven business valuation."
    }, {
      id: "valuation-2",
      text: "Smart analytics to assess growth potential."
    }, {
      id: "valuation-3",
      text: "Access legal & financing solutions in one place."
    }],
    backgroundColor: "bg-white",
    reverse: true,
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>,
    imageComponent: <div className="relative w-full aspect-square max-w-md mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-blym-light-blue/30 to-white rounded-2xl"></div>
        <div className="relative h-full flex items-center justify-center p-8">
          <div className="bg-white/80 rounded-xl p-6 shadow-lg backdrop-blur-sm w-full max-w-xs mx-auto">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Business Valuation</h3>
                  <div className="h-8 w-8 bg-blym-light-blue/30 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Based on market data and AI analysis</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between">
                    <p className="text-xs text-gray-500">Valuation Range</p>
                    <p className="text-xs text-green-600 font-medium">High Confidence</p>
                  </div>
                  <p className="text-xl font-semibold">R1.2M - R1.5M</p>
                </div>
                
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 shadow-sm border border-gray-100 rounded-lg bg-white">
                      <p className="text-xs text-gray-500">Revenue</p>
                      <p className="text-sm font-medium">R3.2M</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100">
                      <p className="text-xs text-gray-500">EBITDA</p>
                      <p className="text-sm font-medium">R780K</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100">
                      <p className="text-xs text-gray-500">Multiple</p>
                      <p className="text-sm font-medium">1.8x</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs text-gray-500">Growth Trend</p>
                  <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-lg" style={{
                    width: '65%'
                  }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1 Year</span>
                    <span>3 Years</span>
                    <span>5 Years</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  };
  return <MainLayout>
      <Hero />
      <FeatureSection {...sellFeature} />
      <FeatureSection {...buyFeature} />
      <FeatureSection {...financingFeature} />
      <FeatureSection {...valuationFeature} />
      <SignUpForm />
    </MainLayout>;
};
export default Index;