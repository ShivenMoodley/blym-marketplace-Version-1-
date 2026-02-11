import React from "react";
import MainLayout from "@/layouts/MainLayout";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import SignUpForm from "@/components/SignUpForm";

const Index: React.FC = () => {
  const marketplaceFeature = {
    id: "marketplace",
    title: "Web3 Business Marketplace",
    subtitle: "For Founders & Investors",
    description: "List or discover DeFi protocols, NFT ecosystems, Web3 SaaS, tokenized communities, smart contract infrastructure, and on-chain revenue businesses.",
    items: [
      { id: "m-1", text: "List your dApp, protocol, or digital IP for sale." },
      { id: "m-2", text: "Discover verified Web3 acquisition opportunities." },
      { id: "m-3", text: "Access global buyers and strategic investors." },
    ],
    backgroundColor: "bg-blym-soft-pink/10",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    imageComponent: (
      <div className="relative w-full aspect-square max-w-md mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-blym-soft-pink/30 to-white rounded-2xl"></div>
        <div className="relative h-full flex items-center justify-center p-8">
          <div className="bg-white/80 rounded-xl p-6 shadow-lg backdrop-blur-sm w-full max-w-xs mx-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full bg-blym-soft-pink/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">DeFi Lending Protocol</h3>
                    <p className="text-xs text-gray-500">Listed 2 days ago</p>
                  </div>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500">Asking Price</p>
                  <p className="text-xl font-semibold">750K USDC</p>
                </div>
                <div className="flex justify-between text-sm">
                  <div>
                    <p className="text-gray-500">TVL</p>
                    <p className="font-medium">$2.4M</p>
                  </div>
                  <div>
                    <p className="text-gray-500">MAU</p>
                    <p className="font-medium">12K</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Chain</p>
                    <p className="font-medium">Base</p>
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
    ),
  };

  const dueDiligenceFeature = {
    id: "due-diligence",
    title: "On-Chain Due Diligence",
    subtitle: "Verified Analytics",
    description: "Reduce reliance on unverifiable pitch decks. Blym integrates on-chain analytics to verify revenue, wallet growth, user activity, and smart contract risk.",
    items: [
      { id: "dd-1", text: "Revenue verification via on-chain data." },
      { id: "dd-2", text: "Wallet growth & user activity trend analysis." },
      { id: "dd-3", text: "Smart contract risk indicators & treasury transparency." },
    ],
    backgroundColor: "bg-blym-warm-yellow/10",
    reverse: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    imageComponent: (
      <div className="relative w-full aspect-square max-w-md mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-blym-warm-yellow/30 to-white rounded-2xl"></div>
        <div className="relative h-full flex items-center justify-center p-8">
          <div className="w-full max-w-xs space-y-4">
            <div className="bg-white/80 rounded-xl p-4 shadow-md backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blym-warm-yellow/30 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-sm">Revenue Verified</h3>
                  <p className="text-xs text-gray-500">$42K/mo on-chain</p>
                </div>
              </div>
            </div>
            <div className="bg-white/80 rounded-xl p-4 shadow-md backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blym-warm-yellow/30 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-sm">Wallet Growth</h3>
                  <p className="text-xs text-gray-500">+34% MoM active wallets</p>
                </div>
              </div>
            </div>
            <div className="bg-white/80 rounded-xl p-4 shadow-md backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blym-warm-yellow/30 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-sm">Contract Audited</h3>
                  <p className="text-xs text-gray-500">CertiK • Low risk</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  };

  const escrowFeature = {
    id: "escrow",
    title: "Crypto-Native Escrow & Settlement",
    subtitle: "Programmable Deals",
    description: "Execute transactions with stablecoin-based escrow, smart contract settlement, milestone-based releases, and full on-chain auditability.",
    items: [
      { id: "e-1", text: "Stablecoin-based transactions (USDC)." },
      { id: "e-2", text: "Smart contract escrow with milestone releases." },
      { id: "e-3", text: "Cross-border capital efficiency & on-chain auditability." },
    ],
    backgroundColor: "bg-blym-lavender/10",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    imageComponent: (
      <div className="relative w-full aspect-square max-w-md mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-blym-lavender/30 to-white rounded-2xl"></div>
        <div className="relative h-full flex items-center justify-center p-8">
          <div className="bg-white/80 rounded-xl p-6 shadow-lg backdrop-blur-sm w-full max-w-xs mx-auto">
            <div className="space-y-6">
              <div className="space-y-2 text-center">
                <div className="w-12 h-12 rounded-full bg-blym-lavender/30 flex items-center justify-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-semibold">Smart Escrow</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-sm">Milestone 1</p>
                    <div className="chip bg-green-100 text-green-800">Released</div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Code transfer — 250K USDC</p>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-sm">Milestone 2</p>
                    <div className="chip bg-blue-100 text-blue-800">Pending</div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Admin key handover — 250K USDC</p>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-sm">Milestone 3</p>
                    <div className="chip bg-gray-100 text-gray-600">Locked</div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">30-day support period — 250K USDC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  };

  const dealRoomFeature = {
    id: "dealroom",
    title: "Structured Deal Workflows",
    subtitle: "End-to-End",
    description: "From listing to closing — confidential deal rooms, document management, buyer verification, offer management, and structured closing workflows built for digital-native transactions.",
    items: [
      { id: "d-1", text: "Confidential deal rooms with document management." },
      { id: "d-2", text: "Buyer verification & offer management." },
      { id: "d-3", text: "Token and equity structuring support." },
    ],
    backgroundColor: "bg-white",
    reverse: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    imageComponent: (
      <div className="relative w-full aspect-square max-w-md mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-blym-light-blue/30 to-white rounded-2xl"></div>
        <div className="relative h-full flex items-center justify-center p-8">
          <div className="bg-white/80 rounded-xl p-6 shadow-lg backdrop-blur-sm w-full max-w-xs mx-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Deal Room</h3>
                <div className="h-8 w-8 bg-blym-light-blue/30 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-gray-500">Confidential • Encrypted</p>
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500">Documents</p>
                    <p className="text-sm font-medium">14</p>
                  </div>
                  <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500">Offers</p>
                    <p className="text-sm font-medium">3</p>
                  </div>
                  <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="text-sm font-medium text-green-600">Active</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-gray-500">Deal Progress</p>
                <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-lg" style={{ width: '65%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Listed</span>
                  <span>Due Diligence</span>
                  <span>Closing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <MainLayout>
      <Hero />
      <FeatureSection {...marketplaceFeature} />
      <FeatureSection {...dueDiligenceFeature} />
      <FeatureSection {...escrowFeature} />
      <FeatureSection {...dealRoomFeature} />
      <SignUpForm />
    </MainLayout>
  );
};

export default Index;
