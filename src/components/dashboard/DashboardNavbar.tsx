
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DashboardNavbar: React.FC = () => {
  return (
    <nav className="bg-white py-4 px-6 border-b">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600">
                Blym
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
