
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { 
  Home, 
  Search, 
  BookmarkIcon, 
  MessageSquare, 
  FileText, 
  Bell, 
  Settings, 
  Shield, 
  TrendingUp 
} from "lucide-react";

// Import the dashboard sections
import RecommendedDeals from "./dashboard-sections/RecommendedDeals";
import SavedListings from "./dashboard-sections/SavedListings";
import DealConversations from "./dashboard-sections/DealConversations";
import AccessRequests from "./dashboard-sections/AccessRequests";
import OfferManagement from "./dashboard-sections/OfferManagement";
import SearchFilters from "./dashboard-sections/SearchFilters";
import NotificationSettings from "./dashboard-sections/NotificationSettings";
import ProfileManagement from "./dashboard-sections/ProfileManagement";
import PremiumFeatures from "./dashboard-sections/PremiumFeatures";

const BuyerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("recommended");

  const menuItems = [
    { id: "recommended", label: "Recommended Deals", icon: Home },
    { id: "saved", label: "Saved Listings", icon: BookmarkIcon },
    { id: "conversations", label: "Deal Conversations", icon: MessageSquare },
    { id: "access", label: "Access Requests", icon: FileText },
    { id: "offers", label: "Offer Management", icon: TrendingUp },
    { id: "search", label: "Search & Filters", icon: Search },
    { id: "notifications", label: "Alert Settings", icon: Bell },
    { id: "profile", label: "Profile Management", icon: Settings },
    { id: "premium", label: "Premium Features", icon: Shield }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        <SidebarProvider defaultOpen={true}>
          <div className="flex min-h-screen w-full">
            <Sidebar>
              <SidebarHeader className="py-6">
                <h2 className="text-xl font-bold text-center px-4">Buyer Dashboard</h2>
              </SidebarHeader>
              <SidebarContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton 
                        isActive={activeTab === item.id}
                        tooltip={item.label}
                        onClick={() => setActiveTab(item.id)}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarContent>
              <SidebarFooter className="pb-4">
                <div className="px-4 py-2 text-sm text-center">
                  <Link to="/" className="text-primary hover:underline">
                    Back to Home
                  </Link>
                </div>
              </SidebarFooter>
            </Sidebar>
            
            <SidebarInset className="p-6">
              <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-6">Buyer Dashboard</h1>
                
                {activeTab === "recommended" && <RecommendedDeals />}
                {activeTab === "saved" && <SavedListings />}
                {activeTab === "conversations" && <DealConversations />}
                {activeTab === "access" && <AccessRequests />}
                {activeTab === "offers" && <OfferManagement />}
                {activeTab === "search" && <SearchFilters />}
                {activeTab === "notifications" && <NotificationSettings />}
                {activeTab === "profile" && <ProfileManagement />}
                {activeTab === "premium" && <PremiumFeatures />}
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </MainLayout>
  );
};

export default BuyerDashboard;
