import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, User, Bell, FileText, DollarSign, CheckCircle } from "lucide-react";

export default function SellerDashboard() {
  // This is just a placeholder dashboard. In a real application, this would
  // display data from your backend, like listing status, buyer inquiries, etc.
  
  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Seller Dashboard</h1>
          <p className="text-muted-foreground">Manage your business listing and buyer inquiries</p>
        </div>
        <Button>Edit Listing</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Listing Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">127</div>
            <p className="text-sm text-muted-foreground mt-1">+12% from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Buyer Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
            <p className="text-sm text-muted-foreground mt-1">3 new this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">NDAs Signed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
            <p className="text-sm text-muted-foreground mt-1">1 pending approval</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Listing Status</CardTitle>
              <CardDescription>Current status of your business listing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border p-4 bg-green-50 border-green-200 flex items-start gap-4">
                <div className="bg-green-100 rounded-full p-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Your listing is live</h3>
                  <p className="text-sm text-muted-foreground">
                    Your business is visible to qualified buyers. Maximize your exposure by keeping your information up to date.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="font-medium">Improve your listing</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3 items-center">
                    <BarChart2 className="h-4 w-4 text-muted-foreground" />
                    <span>Connect additional metrics providers</span>
                    <Button variant="link" size="sm" className="ml-auto">
                      Connect
                    </Button>
                  </div>
                  
                  <div className="flex gap-3 items-center">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>Upload financial documents</span>
                    <Button variant="link" size="sm" className="ml-auto">
                      Upload
                    </Button>
                  </div>

                  <div className="flex gap-3 items-center">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>Upgrade to Premium listing</span>
                    <Button variant="link" size="sm" className="ml-auto">
                      Upgrade
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Inquiries</CardTitle>
              <CardDescription>Latest messages from interested buyers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                    <div className="bg-muted rounded-full p-2">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Interested Buyer {item}</h4>
                          <p className="text-xs text-muted-foreground">2 days ago</p>
                        </div>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          View <ArrowRight className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm mt-1">
                        I'm interested in learning more about your business. I have experience in this industry and would like to schedule a call.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-4">View All Inquiries</Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Updates and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "New NDA request",
                    time: "1 hour ago",
                    description: "A buyer has requested to sign an NDA to view your full listing details."
                  },
                  {
                    title: "New message received",
                    time: "Yesterday",
                    description: "You have a new message from an interested buyer."
                  },
                  {
                    title: "Listing view milestone",
                    time: "3 days ago",
                    description: "Your listing has reached 100 views!"
                  }
                ].map((notification, idx) => (
                  <div key={idx} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                    <Bell className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <div>
                      <div className="flex justify-between">
                        <span className="font-medium text-sm">{notification.title}</span>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                      <p className="text-xs mt-1">{notification.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-4">View All Notifications</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription>Resources and support</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">Selling Guide</Button>
                <Button variant="outline" className="w-full justify-start">FAQ</Button>
                <Button variant="outline" className="w-full justify-start">Contact Support</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
