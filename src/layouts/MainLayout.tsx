
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const isDashboard = location.pathname.includes("/dashboard");

  useEffect(() => {
    // Fix viewport height issues on mobile browsers
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();
    
    // Use both orientationchange and resize events
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);
    
    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
    };
  }, []);

  return (
    <div className={`flex flex-col min-h-screen-real overflow-x-hidden ${isMobile ? 'mobile-view' : ''}`}>
      {isDashboard ? <DashboardNavbar /> : <Navbar />}
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
