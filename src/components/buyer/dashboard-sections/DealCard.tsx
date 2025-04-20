
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DealCardProps {
  title: string;
  industry: string;
  revenue: string;
  profit: string;
  asking: string;
  tags?: string[];
  badges?: {
    label: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | null | undefined;
  }[];
  footerActions?: React.ReactNode;
}

const DealCard: React.FC<DealCardProps> = ({
  title,
  industry,
  revenue,
  profit,
  asking,
  tags = [],
  badges = [],
  footerActions,
}) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{title}</CardTitle>
          {badges.length > 0 && (
            <div className="space-x-1">
              {badges.map((badge, index) => (
                <Badge key={index} variant={badge.variant}>
                  {badge.label}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <CardDescription>{industry}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Revenue</p>
            <p className="font-medium">{revenue}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Profit</p>
            <p className="font-medium">{profit}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Asking</p>
            <p className="font-medium">{asking}</p>
          </div>
        </div>
        
        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      {footerActions && (
        <CardFooter className="flex justify-between">
          {footerActions}
        </CardFooter>
      )}
    </Card>
  );
};

export default DealCard;
