
import React, { useEffect, useState } from "react";
import { supabaseHelper } from "@/utils/supabase-helpers";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  interest: string;
  created_at: string;
}

export const WaitlistViewer: React.FC = () => {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWaitlistEntries = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabaseHelper.from("waitlist").select("*");
      
      if (error) {
        throw error;
      }
      
      setEntries(data || []);
      console.log("Waitlist entries:", data);
    } catch (err: any) {
      console.error("Error fetching waitlist entries:", err);
      setError(err.message || "Failed to fetch waitlist entries");
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchWaitlistEntries();
  }, []);
  
  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        <h2 className="text-xl font-bold">Loading Waitlist Data...</h2>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-4 w-1/3 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-4 w-1/4" />
          </Card>
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 rounded-md">
        <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
        <p className="text-red-600">{error}</p>
        <Button onClick={fetchWaitlistEntries} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="p-4 border border-gray-200 rounded-md">
        <h2 className="text-xl font-bold mb-2">Waitlist</h2>
        <p className="text-gray-600">No entries found in the waitlist.</p>
        <Button onClick={fetchWaitlistEntries} className="mt-4">
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Waitlist Entries ({entries.length})</h2>
        <Button onClick={fetchWaitlistEntries} size="sm">
          Refresh
        </Button>
      </div>
      
      <div className="space-y-3">
        {entries.map((entry) => (
          <Card key={entry.id} className="p-4">
            <h3 className="font-semibold">{entry.name}</h3>
            <p className="text-sm text-gray-600">{entry.email}</p>
            <div className="flex justify-between mt-2">
              <span className="text-xs bg-black/5 px-2 py-1 rounded-full">
                {entry.interest}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(entry.created_at).toLocaleDateString()}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WaitlistViewer;
