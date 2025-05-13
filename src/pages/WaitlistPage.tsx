
import React from "react";
import WaitlistViewer from "@/components/WaitlistViewer";
import { Card } from "@/components/ui/card";

const WaitlistPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Waitlist Data</h1>
        <WaitlistViewer />
      </Card>
    </div>
  );
};

export default WaitlistPage;
