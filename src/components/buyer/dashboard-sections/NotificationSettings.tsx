
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Bell, Mail, BadgeCheck } from "lucide-react";

const NotificationSettings: React.FC = () => {
  // Notification preferences state
  const [emailFrequency, setEmailFrequency] = useState("daily");
  const [pushEnabled, setPushEnabled] = useState(true);
  const [instantAlerts, setInstantAlerts] = useState(true);
  const [offMarketAlerts, setOffMarketAlerts] = useState(false);
  const [sellerResponses, setSellerResponses] = useState(true);
  const [ndaUpdates, setNdaUpdates] = useState(true);
  const [similarListings, setSimilarListings] = useState(true);
  const [priceDrops, setPriceDrops] = useState(true);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Email & Alert Settings</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-5 w-5 mr-2" /> Email Notifications
            </CardTitle>
            <CardDescription>Configure how you receive updates via email</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Digest Frequency</Label>
              <RadioGroup value={emailFrequency} onValueChange={setEmailFrequency}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="daily" />
                  <Label htmlFor="daily">Daily Digest</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekly" id="weekly" />
                  <Label htmlFor="weekly">Weekly Digest</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="instant" id="instant" />
                  <Label htmlFor="instant">Instant Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="none" />
                  <Label htmlFor="none">None (Web Only)</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label>Email Categories</Label>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="seller-responses">Seller Responses</Label>
                  <p className="text-sm text-muted-foreground">When a seller replies to your messages</p>
                </div>
                <Switch 
                  id="seller-responses" 
                  checked={sellerResponses} 
                  onCheckedChange={setSellerResponses}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="nda-updates">NDA Status Updates</Label>
                  <p className="text-sm text-muted-foreground">When your NDA request status changes</p>
                </div>
                <Switch 
                  id="nda-updates" 
                  checked={ndaUpdates} 
                  onCheckedChange={setNdaUpdates}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="similar-listings">Similar Listings</Label>
                  <p className="text-sm text-muted-foreground">Recommendations based on your interests</p>
                </div>
                <Switch 
                  id="similar-listings" 
                  checked={similarListings} 
                  onCheckedChange={setSimilarListings}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="price-drops">Price Drop Alerts</Label>
                  <p className="text-sm text-muted-foreground">When listings you follow reduce their price</p>
                </div>
                <Switch 
                  id="price-drops" 
                  checked={priceDrops} 
                  onCheckedChange={setPriceDrops}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" /> Push Notifications
              </CardTitle>
              <CardDescription>Configure notifications in your browser or mobile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-enabled">Enable Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive alerts even when you're not on the site</p>
                </div>
                <Switch 
                  id="push-enabled" 
                  checked={pushEnabled} 
                  onCheckedChange={setPushEnabled}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="instant-alerts">Instant High-Value Matches</Label>
                  <p className="text-sm text-muted-foreground">Get alerted immediately for perfect fits</p>
                </div>
                <Switch 
                  id="instant-alerts" 
                  checked={instantAlerts} 
                  onCheckedChange={setInstantAlerts}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="off-market-alerts">Off-Market Deal Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    <span>Premium only - </span>
                    <span className="text-primary">Upgrade for access</span>
                  </p>
                </div>
                <Switch 
                  id="off-market-alerts" 
                  checked={offMarketAlerts} 
                  disabled={true}
                  onCheckedChange={setOffMarketAlerts}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BadgeCheck className="h-5 w-5 mr-2" /> Premium Notification Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 mb-4">
                <p className="text-sm text-muted-foreground">
                  Upgrade to premium for enhanced notification features, including off-market deals and early access to new listings.
                </p>
              </div>
              <Button className="w-full">Upgrade to Premium</Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button>Save Notification Preferences</Button>
      </div>
    </div>
  );
};

export default NotificationSettings;
