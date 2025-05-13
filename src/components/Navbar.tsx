import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check current auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-md py-3 shadow-sm"
          : "bg-white py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600">
                Blym
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#sell"
              className="text-sm font-medium text-gray-800 hover:text-black transition-colors"
            >
              Sell
            </a>
            <a
              href="#buy"
              className="text-sm font-medium text-gray-800 hover:text-black transition-colors"
            >
              Buy
            </a>
            <a
              href="#financing"
              className="text-sm font-medium text-gray-800 hover:text-black transition-colors"
            >
              Financing
            </a>
            <a
              href="#valuation"
              className="text-sm font-medium text-gray-800 hover:text-black transition-colors"
            >
              Valuation
            </a>
            
            {user ? (
              <Button 
                variant="outline"
                onClick={handleLogout}
                className="ml-4"
              >
                Sign Out
              </Button>
            ) : (
              <Button
                className="ml-4 bg-black text-white hover:bg-gray-900 transition-smooth"
                onClick={handleAuthClick}
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 pb-3 space-y-1">
            <a
              href="#sell"
              className="block py-2 text-gray-800 hover:text-black transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sell
            </a>
            <a
              href="#buy"
              className="block py-2 text-gray-800 hover:text-black transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Buy
            </a>
            <a
              href="#financing"
              className="block py-2 text-gray-800 hover:text-black transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Financing
            </a>
            <a
              href="#valuation"
              className="block py-2 text-gray-800 hover:text-black transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Valuation
            </a>
            
            {user ? (
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full mt-4"
              >
                Sign Out
              </Button>
            ) : (
              <Button
                className="w-full mt-4 bg-black text-white hover:bg-gray-900 transition-smooth"
                onClick={handleAuthClick}
              >
                Sign In
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
