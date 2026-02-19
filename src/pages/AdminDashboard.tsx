import React, { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Eye, FileText, CheckCircle, XCircle, AlertTriangle, Edit, Save, X } from "lucide-react";

const AdminDashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      sellerName: "John Smith",
      email: "john@example.com",
      listingType: "Premium",
      paymentStatus: "Paid",
      protocolName: "LendFlow Protocol",
      category: "DeFi",
      protocolRevenue: "$85,000 USDC/mo",
      tvl: "$2.5M",
      askingPrice: "950,000 USDC",
      status: "Under Review",
      uploadedDocs: ["certik_audit.pdf", "tokenomics.pdf"],
      assignedAdmin: "Sarah Johnson",
      missingDocs: false
    },
    {
      id: 2,
      sellerName: "Maria Garcia",
      email: "maria@nftmarket.xyz",
      listingType: "Standard",
      paymentStatus: "Free",
      protocolName: "ArtVault NFT",
      category: "NFT",
      protocolRevenue: "$12,000 USDC/mo",
      tvl: "$850K",
      askingPrice: "1,500,000 USDC",
      status: "Draft",
      uploadedDocs: ["smart_contract_source.zip"],
      assignedAdmin: null,
      missingDocs: true
    },
    {
      id: 3,
      sellerName: "David Wilson",
      email: "david@govdao.io",
      listingType: "Premium",
      paymentStatus: "Paid",
      protocolName: "GovDAO Platform",
      category: "Infrastructure",
      protocolRevenue: "$45,000 USDC/mo",
      tvl: "$1.2M",
      askingPrice: "750,000 USDC",
      status: "Live",
      uploadedDocs: ["trail_of_bits_audit.pdf", "governance_framework.pdf", "treasury_overview.pdf"],
      assignedAdmin: "Mike Chen",
      missingDocs: false
    }
  ]);

  const [listingTypeFilter, setListingTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editingFinancials, setEditingFinancials] = useState<number | null>(null);
  const [editValues, setEditValues] = useState({ protocolRevenue: "", tvl: "", askingPrice: "" });

  const filteredSubmissions = submissions.filter(submission => {
    return (
      (listingTypeFilter === "all" || submission.listingType === listingTypeFilter) &&
      (statusFilter === "all" || submission.status === statusFilter) &&
      (categoryFilter === "all" || submission.category === categoryFilter)
    );
  });

  const handleStatusChange = (submissionId: number, newStatus: string) => {
    setSubmissions(prev => prev.map(sub => sub.id === submissionId ? { ...sub, status: newStatus } : sub));
  };

  const startEditingFinancials = (submission: any) => {
    setEditingFinancials(submission.id);
    setEditValues({ protocolRevenue: submission.protocolRevenue, tvl: submission.tvl, askingPrice: submission.askingPrice });
  };

  const saveFinancialChanges = (submissionId: number) => {
    setSubmissions(prev => prev.map(sub =>
      sub.id === submissionId ? { ...sub, protocolRevenue: editValues.protocolRevenue, tvl: editValues.tvl, askingPrice: editValues.askingPrice } : sub
    ));
    setEditingFinancials(null);
  };

  const cancelEditingFinancials = () => {
    setEditingFinancials(null);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Draft": return "bg-gray-500";
      case "Under Review": return "bg-yellow-500";
      case "Approved": return "bg-green-500";
      case "Live": return "bg-blue-500";
      case "Rejected": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const categories = ["DeFi", "NFT", "Infrastructure", "Gaming", "Social", "DAO", "Identity", "Other"];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-lg text-gray-600">Manage and review all dApp & protocol submissions</p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Filter submissions by type, status, or category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Listing Type</label>
                  <Select value={listingTypeFilter} onValueChange={setListingTypeFilter}>
                    <SelectTrigger><SelectValue placeholder="All Types" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="Premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger><SelectValue placeholder="All Statuses" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Under Review">Under Review</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Live">Live</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger><SelectValue placeholder="All Categories" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submissions Table */}
          <Card>
            <CardHeader>
              <CardTitle>Protocol Submissions</CardTitle>
              <CardDescription>{filteredSubmissions.length} submission(s) found</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Seller Info</TableHead>
                      <TableHead>Protocol Details</TableHead>
                      <TableHead>On-Chain Metrics</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Admin</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium flex items-center gap-2">
                              {submission.sellerName}
                              {submission.missingDocs && <AlertTriangle className="w-4 h-4 text-orange-500" />}
                            </div>
                            <div className="text-sm text-gray-500">{submission.email}</div>
                            <Badge variant={submission.listingType === "Premium" ? "default" : "secondary"}>{submission.listingType}</Badge>
                            <div className="text-xs text-gray-500">{submission.paymentStatus}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{submission.protocolName}</div>
                            <div className="text-sm text-gray-500">{submission.category}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {editingFinancials === submission.id ? (
                            <div className="space-y-2 min-w-[150px]">
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-gray-500 w-12">Rev:</span>
                                <Input value={editValues.protocolRevenue} onChange={(e) => setEditValues(prev => ({ ...prev, protocolRevenue: e.target.value }))} className="h-6 text-xs" />
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-gray-500 w-12">TVL:</span>
                                <Input value={editValues.tvl} onChange={(e) => setEditValues(prev => ({ ...prev, tvl: e.target.value }))} className="h-6 text-xs" />
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-gray-500 w-12">Price:</span>
                                <Input value={editValues.askingPrice} onChange={(e) => setEditValues(prev => ({ ...prev, askingPrice: e.target.value }))} className="h-6 text-xs" />
                              </div>
                              <div className="flex gap-1">
                                <Button size="sm" onClick={() => saveFinancialChanges(submission.id)} className="h-6 w-6 p-0 bg-green-600 hover:bg-green-700">
                                  <Save className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={cancelEditingFinancials} className="h-6 w-6 p-0">
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <div className="text-sm">Revenue: {submission.protocolRevenue}</div>
                              <div className="text-sm">TVL: {submission.tvl}</div>
                              <div className="font-medium text-green-600">{submission.askingPrice}</div>
                              <Button size="sm" variant="ghost" onClick={() => startEditingFinancials(submission)} className="h-6 w-6 p-0 mt-1">
                                <Edit className="w-3 h-3" />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusBadgeColor(submission.status)} text-white`}>{submission.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {submission.uploadedDocs.map((doc, index) => (
                              <div key={index} className="flex items-center gap-1">
                                <FileText className="w-3 h-3" />
                                <button className="text-xs text-blue-600 hover:underline">{doc}</button>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{submission.assignedAdmin || <span className="text-gray-400">Unassigned</span>}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline"><Eye className="w-3 h-3" /></Button>
                            {submission.status === "Under Review" && (
                              <>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button size="sm" variant="outline" className="text-green-600"><CheckCircle className="w-3 h-3" /></Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Approve Submission</AlertDialogTitle>
                                      <AlertDialogDescription>Are you sure you want to approve this dApp listing?</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleStatusChange(submission.id, "Approved")}>Approve</AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button size="sm" variant="outline" className="text-red-600"><XCircle className="w-3 h-3" /></Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Reject Submission</AlertDialogTitle>
                                      <AlertDialogDescription>Are you sure you want to reject this dApp listing?</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleStatusChange(submission.id, "Rejected")}>Reject</AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </>
                            )}
                            {submission.status === "Approved" && (
                              <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => handleStatusChange(submission.id, "Live")}>
                                Make Live
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">Admin Dashboard • Manage dApp & protocol submissions</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
