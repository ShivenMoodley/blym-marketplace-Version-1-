import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { SellerSubmission } from '@/types/app';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<SellerSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSubmission, setSelectedSubmission] = useState<SellerSubmission | null>(null);
  
  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('seller_submissions')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setSubmissions(data as unknown as SellerSubmission[]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load submissions",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSubmissionStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('seller_submissions')
        .update({ listing_status: status, updated_at: new Date().toISOString() })
        .eq('id', id);
        
      if (error) throw error;
      
      // Update local state
      setSubmissions(prev => prev.map(sub => 
        sub.id === id ? { ...sub, listing_status: status as any } : sub
      ));
      
      if (selectedSubmission?.id === id) {
        setSelectedSubmission(prev => prev ? { ...prev, listing_status: status as any } : null);
      }
      
      toast({
        title: "Status Updated",
        description: `Listing status has been updated to ${status}.`,
      });
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update status",
        variant: "destructive"
      });
    }
  };

  const assignToMe = async (id: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('seller_submissions')
        .update({ assigned_admin: user.email, updated_at: new Date().toISOString() })
        .eq('id', id);
        
      if (error) throw error;
      
      // Update local state
      setSubmissions(prev => prev.map(sub => 
        sub.id === id ? { ...sub, assigned_admin: user.email } : sub
      ));
      
      if (selectedSubmission?.id === id) {
        setSelectedSubmission(prev => prev ? { ...prev, assigned_admin: user.email } : null);
      }
      
      toast({
        title: "Assigned",
        description: "Listing has been assigned to you.",
      });
    } catch (error: any) {
      toast({
        title: "Assignment Failed",
        description: error.message || "Failed to assign listing",
        variant: "destructive"
      });
    }
  };
  
  const filteredSubmissions = submissions.filter(sub => {
    // Filter by status
    if (statusFilter && sub.listing_status !== statusFilter) return false;
    
    // Filter by listing type
    if (typeFilter && sub.listing_type !== typeFilter) return false;
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        sub.business_name?.toLowerCase().includes(term) ||
        sub.email?.toLowerCase().includes(term) ||
        sub.business_category?.toLowerCase().includes(term)
      );
    }
    
    return true;
  });

  return (
    <MainLayout>
      <div className="container px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center mt-4 md:mt-0">
            <Button 
              variant="outline" 
              onClick={loadSubmissions} 
              className="ml-2"
            >
              Refresh
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Submissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{submissions.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Under Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {submissions.filter(s => s.listing_status === 'Under Review').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Premium Listings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {submissions.filter(s => s.listing_type === 'premium').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Published
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {submissions.filter(s => s.listing_status === 'Published').length}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Seller Submissions</h2>
            
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="flex-grow">
                <Input
                  placeholder="Search by business name, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="w-full md:w-[180px]">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Under Review">Under Review</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full md:w-[180px]">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Business Name</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead>Listing Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">Loading submissions...</TableCell>
                  </TableRow>
                ) : filteredSubmissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">No submissions found</TableCell>
                  </TableRow>
                ) : (
                  filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium">{submission.business_name || "Unknown"}</TableCell>
                      <TableCell>{submission.email}</TableCell>
                      <TableCell>
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          submission.listing_type === 'premium' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {submission.listing_type === 'premium' ? 'Premium' : 'Standard'}
                        </span>
                      </TableCell>
                      <TableCell>{submission.business_category || "N/A"}</TableCell>
                      <TableCell>{submission.revenue || "N/A"}</TableCell>
                      <TableCell>
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          submission.listing_status === 'Published' ? 'bg-green-100 text-green-800' :
                          submission.listing_status === 'Under Review' ? 'bg-blue-100 text-blue-800' :
                          submission.listing_status === 'Rejected' ? 'bg-red-100 text-red-800' :
                          submission.listing_status === 'Approved' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {submission.listing_status}
                        </span>
                      </TableCell>
                      <TableCell>
                        {new Date(submission.updated_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedSubmission(submission)}>
                              View
                            </Button>
                          </SheetTrigger>
                          <SheetContent className="w-full md:max-w-md overflow-y-auto">
                            {selectedSubmission && (
                              <>
                                <SheetHeader>
                                  <SheetTitle>{selectedSubmission.business_name || "Business Listing"}</SheetTitle>
                                  <SheetDescription>
                                    Submission from {selectedSubmission.email} on {new Date(selectedSubmission.created_at).toLocaleDateString()}
                                  </SheetDescription>
                                </SheetHeader>
                                
                                <div className="mt-6">
                                  <div className="flex justify-between mb-4">
                                    <div>
                                      <Label>Status</Label>
                                      <Select
                                        value={selectedSubmission.listing_status}
                                        onValueChange={(value) => updateSubmissionStatus(selectedSubmission.id, value)}
                                      >
                                        <SelectTrigger className="w-[180px]">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="Draft">Draft</SelectItem>
                                          <SelectItem value="Under Review">Under Review</SelectItem>
                                          <SelectItem value="Approved">Approved</SelectItem>
                                          <SelectItem value="Rejected">Rejected</SelectItem>
                                          <SelectItem value="Published">Published</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => assignToMe(selectedSubmission.id)}
                                    >
                                      {selectedSubmission.assigned_admin === user?.email
                                        ? "Assigned to You"
                                        : "Assign to Me"}
                                    </Button>
                                  </div>
                                  
                                  <div className="space-y-4">
                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="text-sm">Business Details</CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                          <span className="font-medium">Listing Type:</span>
                                          <span>{selectedSubmission.listing_type}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="font-medium">Payment Status:</span>
                                          <span>{selectedSubmission.payment_status}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="font-medium">Category:</span>
                                          <span>{selectedSubmission.business_category || "N/A"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="font-medium">Website:</span>
                                          <span>{selectedSubmission.form_data?.websiteUrl || "N/A"}</span>
                                        </div>
                                      </CardContent>
                                    </Card>
                                    
                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="text-sm">Financial Information</CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                          <span className="font-medium">Revenue:</span>
                                          <span>{selectedSubmission.revenue || "N/A"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="font-medium">Profit:</span>
                                          <span>{selectedSubmission.profit || "N/A"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="font-medium">MRR/ARR:</span>
                                          <span>{selectedSubmission.form_data?.mrr || "N/A"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="font-medium">Asking Price:</span>
                                          <span>{selectedSubmission.asking_price || "N/A"}</span>
                                        </div>
                                      </CardContent>
                                    </Card>
                                    
                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="text-sm">Business Summary</CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-4 text-sm">
                                        <div>
                                          <h4 className="font-medium mb-1">Description</h4>
                                          <p className="text-gray-700">
                                            {selectedSubmission.form_data?.businessDescription || "No description provided."}
                                          </p>
                                        </div>
                                        
                                        <div>
                                          <h4 className="font-medium mb-1">Unique Selling Points</h4>
                                          <p className="text-gray-700">
                                            {selectedSubmission.form_data?.uniqueSellingPoints || "Not provided."}
                                          </p>
                                        </div>
                                        
                                        <div>
                                          <h4 className="font-medium mb-1">Reason for Selling</h4>
                                          <p className="text-gray-700">
                                            {selectedSubmission.form_data?.reasonForSelling || "Not provided."}
                                          </p>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </div>
                              </>
                            )}
                          </SheetContent>
                        </Sheet>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
