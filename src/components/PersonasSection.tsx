import React from "react";
import { Rocket, TrendingUp, Target } from "lucide-react";

const personas = [
  {
    icon: Rocket,
    title: "Founders",
    description: "Exit your dApp, protocol, or digital IP. Raise strategic capital, sell equity or tokens, and access global buyers.",
    items: [
      "Exit your dApp or protocol",
      "Raise strategic capital",
      "Sell equity or tokens",
      "Access global buyers",
    ],
  },
  {
    icon: TrendingUp,
    title: "Investors",
    description: "Discover verified Web3 opportunities. Access structured deal flow with on-chain due diligence across jurisdictions.",
    items: [
      "Discover verified opportunities",
      "Access structured deal flow",
      "On-chain due diligence",
      "Invest across jurisdictions",
    ],
  },
  {
    icon: Target,
    title: "Strategic Buyers",
    description: "Acquire technology or communities. Expand your ecosystem footprint and consolidate your market position.",
    items: [
      "Acquire technology or communities",
      "Expand ecosystem footprint",
      "Consolidate market position",
      "Access digital IP & tooling",
    ],
  },
];

const PersonasSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center py-1 px-3 rounded-full bg-black/5 mb-4">
            <span className="text-sm font-medium">Who Is Blym For</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for Every Side of the Deal
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Whether you're exiting, acquiring, or investing — Blym gives you the infrastructure to move with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {personas.map((persona) => (
            <div
              key={persona.title}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-smooth border border-gray-100"
            >
              <div className="w-14 h-14 rounded-xl bg-black/5 flex items-center justify-center mb-6">
                <persona.icon className="w-7 h-7 text-gray-800" />
              </div>
              <h3 className="text-xl font-bold mb-2">{persona.title}</h3>
              <p className="text-gray-600 text-sm mb-6">{persona.description}</p>
              <ul className="space-y-3">
                {persona.items.map((item) => (
                  <li key={item} className="flex items-center text-sm text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-green-600 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonasSection;
