
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, FileText, Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// Mock conversation data
const conversations = [
  {
    id: 1,
    businessName: "Tech Solutions Platform",
    sellerName: "John Smith",
    lastMessage: "I can provide more details about the customer acquisition strategy if you're interested.",
    time: "2 hours ago",
    unread: true,
    status: "awaiting-response",
    logo: ""
  },
  {
    id: 2,
    businessName: "Health & Wellness App",
    sellerName: "Sarah Johnson",
    lastMessage: "The NDA has been accepted. You now have access to our financial documents.",
    time: "Yesterday",
    unread: false,
    status: "nda-accepted",
    logo: ""
  },
  {
    id: 3,
    businessName: "E-learning Platform",
    sellerName: "Michael Brown",
    lastMessage: "Thank you for your initial offer. We would like to discuss the terms further.",
    time: "3 days ago",
    unread: false,
    status: "negotiation",
    logo: ""
  },
  {
    id: 4,
    businessName: "Subscription Box Service",
    sellerName: "Emily Davis",
    lastMessage: "I've just sent over the NDA for your review.",
    time: "1 week ago",
    unread: false,
    status: "nda-sent",
    logo: ""
  }
];

const DealConversations: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Deal Conversations</h2>
        <Button>Start New Conversation</Button>
      </div>
      
      <div className="space-y-4">
        {conversations.map((conversation) => (
          <Card key={conversation.id} className={conversation.unread ? "border-primary" : ""}>
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={conversation.logo} />
                    <AvatarFallback>{conversation.businessName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {conversation.businessName}
                      {conversation.unread && (
                        <Badge className="bg-primary">New</Badge>
                      )}
                    </CardTitle>
                    <CardDescription>Seller: {conversation.sellerName}</CardDescription>
                  </div>
                </div>
                <div>
                  <Badge variant={
                    conversation.status === 'awaiting-response' ? 'outline' :
                    conversation.status === 'nda-sent' ? 'secondary' :
                    conversation.status === 'nda-accepted' ? 'default' :
                    'destructive'
                  }>
                    {conversation.status === 'awaiting-response' ? 'Awaiting Response' :
                     conversation.status === 'nda-sent' ? 'NDA Sent' :
                     conversation.status === 'nda-accepted' ? 'NDA Accepted' :
                     'Active Negotiation'}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{conversation.time}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                <MessageSquare className="h-4 w-4 inline mr-1" />
                <span>{conversation.lastMessage}</span>
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-1" /> Reply
                </Button>
                <Button variant="outline" size="sm">
                  <Video className="h-4 w-4 mr-1" /> Schedule Call
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-1" /> Request Info
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DealConversations;
