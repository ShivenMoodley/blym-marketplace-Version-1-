import React from "react";
import { cn } from "@/lib/utils";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <a href="/" className="inline-block">
              <span className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600">
                Blym
              </span>
            </a>
            <p className="mt-4 text-gray-600 text-sm max-w-xs">
              The modern platform for buying, selling, and financing businesses of all sizes.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Platform
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#sell" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Sell Your Business
                </a>
              </li>
              <li>
                <a href="#buy" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Buy a Business
                </a>
              </li>
              <li>
                <a href="#financing" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Rescue Financing
                </a>
              </li>
              <li>
                <a href="#valuation" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Business Valuation
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Resource Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Market Reports
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Due Diligence Checklist
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm text-center">
            &copy; {new Date().getFullYear()} Blym. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
