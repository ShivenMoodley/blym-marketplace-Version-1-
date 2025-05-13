
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Check, X, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Mock data for access requests
const accessRequests = [
  {
    id: 1,
    businessName: "Marketing Automation Tool",
    requestDate: "April 15, 2025",
    status: "approved",
    viewedOn: "April 16, 2025",
    timeline: [
      { date: "April 15, 2025", action: "NDA Request Sent" },
      { date: "April 15, 2025", action: "NDA Reviewed by Seller" },
      { date: "April 16, 2025", action: "Full Access Granted" },
      { date: "April 16, 2025", action: "Financial Documents Viewed" }
    ]
  },
  {
    id: 2,
    businessName: "B2B Software Solution",
    requestDate: "April 14, 2025",
    status: "pending",
    timeline: [
      { date: "April 14, 2025", action: "NDA Request Sent" },
      { date: "April 14, 2025", action: "Under Review by Seller" }
    ]
  },
  {
    id: 3,
    businessName: "Mobile Gaming Platform",
    requestDate: "April 10, 2025",
    status: "declined",
    timeline: [
      { date: "April 10, 2025", action: "NDA Request Sent" },
      { date: "April 12, 2025", action: "Request Declined by Seller" },
      { date: "April 13, 2025", action: "Follow-up Message Sent" }
    ]
  }
];

const AccessRequests: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Access Requests (NDAs)</h2>
      </div>
      
      <div className="space-y-4">
        {accessRequests.map((request) => (
          <Card key={request.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>{request.businessName}</CardTitle>
                <Badge variant={
                  request.status === 'approved' ? 'default' :
                  request.status === 'pending' ? 'secondary' :
                  'destructive'
                }>
                  {request.status === 'approved' ? (
                    <><Check className="h-3 w-3 mr-1" /> Approved</>
                  ) : request.status === 'pending' ? (
                    <><Clock className="h-3 w-3 mr-1" /> Pending</>
                  ) : (
                    <><X className="h-3 w-3 mr-1" /> Declined</>
                  )}
                </Badge>
              </div>
              <CardDescription>
                Request submitted: {request.requestDate}
                {request.viewedOn && ` • First viewed: ${request.viewedOn}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Timeline</h4>
                <ol className="border-l border-primary/20 ml-3 space-y-3">
                  {request.timeline.map((event, i) => (
                    <li key={i} className="relative pl-6">
                      <span className="absolute -left-[5px] size-[10px] rounded-full bg-primary" />
                      <p className="text-sm font-medium">{event.action}</p>
                      <p className="text-xs text-muted-foreground">{event.date}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </CardContent>
            <CardFooter>
              {request.status === 'approved' ? (
                <Button>View Full Details</Button>
              ) : request.status === 'pending' ? (
                <Button variant="outline">Check Status</Button>
              ) : (
                <Button variant="outline">Contact Seller</Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AccessRequests;
