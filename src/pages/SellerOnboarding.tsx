import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, DollarSign, Send, Plus, X, CheckCircle2 } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { WalletConnect } from "@/components/WalletConnect";
import { useToast } from "@/hooks/use-toast";

const SellerOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const { account } = useWallet();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    legalName: "",
    country: "",
    email: "",
    walletAddress: "",
    ipOwnership: false,
    ipProof: null as File | null,
    dappName: "",
    oneLiner: "",
    category: "",
    websiteUrl: "",
    docsUrl: "",
    githubUrl: "",
    chains: [] as string[],
    contractAddresses: "",
    openSourceLicense: "",
    usesThirdPartyCode: false,
    
    // Step 2: DApp Phase
    phase: "", // "build-only" or "live-revenue"
    
    // Build-only path
    technicalReadiness: [] as string[],
    hoursInvested: {
      solidity: 0,
      frontend: 0,
      backend: 0,
      design: 0,
      pm: 0,
    },
    seniorityMix: {
      junior: 0,
      mid: 0,
      senior: 0,
    },
    uniqueLogicPercent: 0,
    assetsIncluded: [] as string[],
    knownBugs: "",
    askingPriceBuild: 0,
    priceBasis: "",
    postSaleSupport: 0,
    preferredDealStructure: "",
    
    // Live revenue path
    dau: 0,
    mau: 0,
    retentionRate: 0,
    transactionCount: 0,
    tvl: 0,
    userGeographies: [] as string[],
    revenueStreams: {} as Record<string, number>,
    infrastructureCosts: {} as Record<string, number>,
    tokenInfo: {} as Record<string, any>,
    vestingSchedule: null as File | null,
    treasuryWallets: [] as string[],
    governanceModel: "",
    securityAudits: [] as string[],
    securityIncidents: "",
    adminKeysCustody: "",
    hasBugBounty: false,
    communityStats: {} as Record<string, number>,
    activeContributors: 0,
    contractorAgreementsAssignIP: false,
    roadmap: "",
    askingPriceLive: 0,
    dealTerms: {} as Record<string, any>,
    
    // Step 3: Evidence & Links
    blockExplorerLinks: [""],
    dashboardLinks: [""],
    financialFiles: [] as File[],
    brandAssets: [] as File[],
    contracts: [] as File[],
    verificationConsent: false,
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const categories = ["DeFi", "NFT", "Infrastructure", "Tooling", "Gaming", "Social", "Other"];
  const chains = ["Base", "Ethereum", "Polygon", "Arbitrum", "Optimism", "BSC", "Avalanche", "Other"];
  const licenses = ["MIT", "Apache 2.0", "GPL v3", "BSD 3-Clause", "Custom", "Proprietary"];
  const technicalReadinessItems = [
    "Smart contracts deployed",
    "Frontend application",
    "Backend API",
    "Documentation",
    "Deployed to testnet",
    "Deployed to mainnet"
  ];
  const assetsIncludedOptions = [
    "Source code IP",
    "Brand/Domain",
    "Design files",
    "Documentation",
    "Social handles"
  ];
  const dealStructures = ["Asset sale", "Token sale", "Combination"];
  const governanceModels = ["Multisig", "Proxy contract", "Upgradeable", "Immutable"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleArrayToggle = (arrayName: string, value: string) => {
    setFormData(prev => {
      const array = prev[arrayName as keyof typeof prev] as string[];
      const newArray = array.includes(value)
        ? array.filter(item => item !== value)
        : [...array, value];
      return { ...prev, [arrayName]: newArray };
    });
  };

  const handleNumberChange = (name: string, value: number) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNestedNumberChange = (parent: string, key: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof typeof prev] as Record<string, number>),
        [key]: value
      }
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleMultiFileChange = (e: React.ChangeEvent<HTMLInputElement>, arrayName: string) => {
    const { files } = e.target;
    if (files) {
      const fileArray = Array.from(files);
      setFormData(prev => ({
        ...prev,
        [arrayName]: [...(prev[arrayName as keyof typeof prev] as File[]), ...fileArray]
      }));
    }
  };

  const handleDynamicArrayChange = (arrayName: string, index: number, value: string) => {
    setFormData(prev => {
      const newArray = [...(prev[arrayName as keyof typeof prev] as string[])];
      newArray[index] = value;
      return { ...prev, [arrayName]: newArray };
    });
  };

  const addToArray = (arrayName: string) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...(prev[arrayName as keyof typeof prev] as string[]), ""]
    }));
  };

  const removeFromArray = (arrayName: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: (prev[arrayName as keyof typeof prev] as string[]).filter((_, i) => i !== index)
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    if (!formData.verificationConsent) {
      toast({
        title: "Verification Required",
        description: "You must consent to verification to proceed.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("DApp listing submitted:", formData);
    
    toast({
      title: "Application Submitted",
      description: "Your DApp listing is now under review.",
    });
    
    setIsSubmitting(false);
    navigate("/seller-dashboard");
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Basic Information";
      case 2: return "DApp Phase";
      case 3: return "Evidence & Links";
      case 4: return "Review & Submit";
      default: return "";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1: return "Tell us about yourself and your DApp";
      case 2: return "Build-only or live with revenue?";
      case 3: return "Provide proof and supporting documentation";
      case 4: return "Review your application before submission";
      default: return "";
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="legalName">Legal Name / Entity *</Label>
                  <Input
                    id="legalName"
                    name="legalName"
                    placeholder="John Doe / Acme Corp"
                    value={formData.legalName}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    name="country"
                    placeholder="United States"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Wallet Address</Label>
                  <div className="mt-2">
                    <WalletConnect />
                  </div>
                  {account && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Connected: {account.address}
                    </p>
                  )}
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="ipOwnership"
                    checked={formData.ipOwnership}
                    onCheckedChange={(checked) => handleCheckboxChange("ipOwnership", checked as boolean)}
                  />
                  <Label htmlFor="ipOwnership" className="text-sm font-normal">
                    I own the intellectual property rights to this DApp *
                  </Label>
                </div>

                {formData.ipOwnership && (
                  <div>
                    <Label htmlFor="ipProof">IP Ownership Proof (Optional)</Label>
                    <Input
                      id="ipProof"
                      name="ipProof"
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileChange}
                      className="mt-1"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* DApp Information */}
            <Card>
              <CardHeader>
                <CardTitle>DApp Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="dappName">DApp Name *</Label>
                  <Input
                    id="dappName"
                    name="dappName"
                    placeholder="My Awesome DApp"
                    value={formData.dappName}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="oneLiner">One-liner Description *</Label>
                  <Textarea
                    id="oneLiner"
                    name="oneLiner"
                    placeholder="A decentralized marketplace for digital assets..."
                    value={formData.oneLiner}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select onValueChange={(value) => handleSelectChange("category", value)} value={formData.category}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="websiteUrl">Website URL</Label>
                    <Input
                      id="websiteUrl"
                      name="websiteUrl"
                      type="url"
                      placeholder="https://example.com"
                      value={formData.websiteUrl}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="docsUrl">Documentation URL</Label>
                    <Input
                      id="docsUrl"
                      name="docsUrl"
                      type="url"
                      placeholder="https://docs.example.com"
                      value={formData.docsUrl}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="githubUrl">GitHub URL</Label>
                    <Input
                      id="githubUrl"
                      name="githubUrl"
                      type="url"
                      placeholder="https://github.com/user/repo"
                      value={formData.githubUrl}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label>Chains Used *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                    {chains.map((chain) => (
                      <div key={chain} className="flex items-center space-x-2">
                        <Checkbox
                          id={`chain-${chain}`}
                          checked={formData.chains.includes(chain)}
                          onCheckedChange={() => handleArrayToggle("chains", chain)}
                        />
                        <Label htmlFor={`chain-${chain}`} className="text-sm font-normal">
                          {chain}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="contractAddresses">Contract Addresses</Label>
                  <Textarea
                    id="contractAddresses"
                    name="contractAddresses"
                    placeholder="0x123..., 0x456..."
                    value={formData.contractAddresses}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="openSourceLicense">Open Source License *</Label>
                  <Select onValueChange={(value) => handleSelectChange("openSourceLicense", value)} value={formData.openSourceLicense}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select license" />
                    </SelectTrigger>
                    <SelectContent>
                      {licenses.map((license) => (
                        <SelectItem key={license} value={license}>
                          {license}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="usesThirdPartyCode"
                    checked={formData.usesThirdPartyCode}
                    onCheckedChange={(checked) => handleCheckboxChange("usesThirdPartyCode", checked as boolean)}
                  />
                  <Label htmlFor="usesThirdPartyCode" className="text-sm font-normal">
                    Uses third-party code
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Phase Selection */}
            {!formData.phase && (
              <Card>
                <CardHeader>
                  <CardTitle>Select Your DApp Phase</CardTitle>
                  <CardDescription>Choose the option that best describes your DApp's current state</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card
                      className="cursor-pointer border-2 hover:border-primary transition-colors"
                      onClick={() => handleSelectChange("phase", "build-only")}
                    >
                      <CardContent className="pt-6">
                        <Building2 className="h-12 w-12 text-primary mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Build-only / Pre-revenue</h3>
                        <p className="text-sm text-muted-foreground">
                          Your DApp is built but not yet generating revenue
                        </p>
                      </CardContent>
                    </Card>

                    <Card
                      className="cursor-pointer border-2 hover:border-primary transition-colors"
                      onClick={() => handleSelectChange("phase", "live-revenue")}
                    >
                      <CardContent className="pt-6">
                        <DollarSign className="h-12 w-12 text-primary mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Live / Users + Revenue</h3>
                        <p className="text-sm text-muted-foreground">
                          Your DApp is live with users and generating revenue
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Build-only Path */}
            {formData.phase === "build-only" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Technical Readiness</CardTitle>
                    <Badge variant="outline" className="w-fit">Build-only DApp</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>What's completed? *</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                        {technicalReadinessItems.map((item) => (
                          <div key={item} className="flex items-center space-x-2">
                            <Checkbox
                              id={`tech-${item}`}
                              checked={formData.technicalReadiness.includes(item)}
                              onCheckedChange={() => handleArrayToggle("technicalReadiness", item)}
                            />
                            <Label htmlFor={`tech-${item}`} className="text-sm font-normal">
                              {item}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Hours Invested by Role</Label>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-2">
                        {Object.keys(formData.hoursInvested).map((role) => (
                          <div key={role}>
                            <Label htmlFor={`hours-${role}`} className="text-xs capitalize">
                              {role}
                            </Label>
                            <Input
                              id={`hours-${role}`}
                              type="number"
                              min="0"
                              value={formData.hoursInvested[role as keyof typeof formData.hoursInvested]}
                              onChange={(e) => handleNestedNumberChange("hoursInvested", role, parseInt(e.target.value) || 0)}
                              className="mt-1"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Seniority Mix (must total 100%)</Label>
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        {Object.keys(formData.seniorityMix).map((level) => (
                          <div key={level}>
                            <Label htmlFor={`seniority-${level}`} className="text-xs capitalize">
                              {level} %
                            </Label>
                            <Input
                              id={`seniority-${level}`}
                              type="number"
                              min="0"
                              max="100"
                              value={formData.seniorityMix[level as keyof typeof formData.seniorityMix]}
                              onChange={(e) => handleNestedNumberChange("seniorityMix", level, parseInt(e.target.value) || 0)}
                              className="mt-1"
                            />
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Total: {Object.values(formData.seniorityMix).reduce((a, b) => a + b, 0)}%
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="uniqueLogicPercent">% Unique Logic vs Forked Code *</Label>
                      <Input
                        id="uniqueLogicPercent"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.uniqueLogicPercent}
                        onChange={(e) => handleNumberChange("uniqueLogicPercent", parseInt(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label>Assets Included</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                        {assetsIncludedOptions.map((asset) => (
                          <div key={asset} className="flex items-center space-x-2">
                            <Checkbox
                              id={`asset-${asset}`}
                              checked={formData.assetsIncluded.includes(asset)}
                              onCheckedChange={() => handleArrayToggle("assetsIncluded", asset)}
                            />
                            <Label htmlFor={`asset-${asset}`} className="text-sm font-normal">
                              {asset}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="knownBugs">Known Bugs/Limitations</Label>
                      <Textarea
                        id="knownBugs"
                        name="knownBugs"
                        placeholder="Describe any known issues or limitations..."
                        value={formData.knownBugs}
                        onChange={handleChange}
                        rows={3}
                        className="mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pricing & Deal Terms</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="askingPriceBuild">Asking Price (USDC) *</Label>
                      <Input
                        id="askingPriceBuild"
                        type="number"
                        min="0"
                        value={formData.askingPriceBuild}
                        onChange={(e) => handleNumberChange("askingPriceBuild", parseFloat(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="priceBasis">Price Basis *</Label>
                      <Textarea
                        id="priceBasis"
                        name="priceBasis"
                        placeholder="Explain how you calculated the asking price (time spent, uniqueness premium, etc.)"
                        value={formData.priceBasis}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="postSaleSupport">Post-sale Support (hours)</Label>
                      <Input
                        id="postSaleSupport"
                        type="number"
                        min="0"
                        value={formData.postSaleSupport}
                        onChange={(e) => handleNumberChange("postSaleSupport", parseInt(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="preferredDealStructure">Preferred Deal Structure *</Label>
                      <Select onValueChange={(value) => handleSelectChange("preferredDealStructure", value)} value={formData.preferredDealStructure}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select structure" />
                        </SelectTrigger>
                        <SelectContent>
                          {dealStructures.map((structure) => (
                            <SelectItem key={structure} value={structure}>
                              {structure}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Live Revenue Path */}
            {formData.phase === "live-revenue" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Traction Metrics</CardTitle>
                    <Badge variant="outline" className="w-fit">Live DApp</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="dau">Daily Active Users (DAU) *</Label>
                        <Input
                          id="dau"
                          type="number"
                          min="0"
                          value={formData.dau}
                          onChange={(e) => handleNumberChange("dau", parseInt(e.target.value) || 0)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="mau">Monthly Active Users (MAU) *</Label>
                        <Input
                          id="mau"
                          type="number"
                          min="0"
                          value={formData.mau}
                          onChange={(e) => handleNumberChange("mau", parseInt(e.target.value) || 0)}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="retentionRate">Retention Rate (%) *</Label>
                        <Input
                          id="retentionRate"
                          type="number"
                          min="0"
                          max="100"
                          value={formData.retentionRate}
                          onChange={(e) => handleNumberChange("retentionRate", parseFloat(e.target.value) || 0)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="transactionCount">Transaction Count *</Label>
                        <Input
                          id="transactionCount"
                          type="number"
                          min="0"
                          value={formData.transactionCount}
                          onChange={(e) => handleNumberChange("transactionCount", parseInt(e.target.value) || 0)}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="tvl">TVL - Total Value Locked (USDC)</Label>
                      <Input
                        id="tvl"
                        type="number"
                        min="0"
                        value={formData.tvl}
                        onChange={(e) => handleNumberChange("tvl", parseFloat(e.target.value) || 0)}
                        className="mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">For DeFi applications only</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Governance & Security</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="governanceModel">Governance Model *</Label>
                      <Select onValueChange={(value) => handleSelectChange("governanceModel", value)} value={formData.governanceModel}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select governance model" />
                        </SelectTrigger>
                        <SelectContent>
                          {governanceModels.map((model) => (
                            <SelectItem key={model} value={model}>
                              {model}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="adminKeysCustody">Admin Keys Custody *</Label>
                      <Input
                        id="adminKeysCustody"
                        name="adminKeysCustody"
                        placeholder="Describe who controls admin keys"
                        value={formData.adminKeysCustody}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="hasBugBounty"
                        checked={formData.hasBugBounty}
                        onCheckedChange={(checked) => handleCheckboxChange("hasBugBounty", checked as boolean)}
                      />
                      <Label htmlFor="hasBugBounty" className="text-sm font-normal">
                        Has Bug Bounty Program
                      </Label>
                    </div>

                    <div>
                      <Label htmlFor="activeContributors">Active Contributors Count *</Label>
                      <Input
                        id="activeContributors"
                        type="number"
                        min="1"
                        value={formData.activeContributors}
                        onChange={(e) => handleNumberChange("activeContributors", parseInt(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="contractorAgreementsAssignIP"
                        checked={formData.contractorAgreementsAssignIP}
                        onCheckedChange={(checked) => handleCheckboxChange("contractorAgreementsAssignIP", checked as boolean)}
                      />
                      <Label htmlFor="contractorAgreementsAssignIP" className="text-sm font-normal">
                        Contractor agreements assign IP
                      </Label>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Roadmap & Pricing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="roadmap">Roadmap (Next 3 months) *</Label>
                      <Textarea
                        id="roadmap"
                        name="roadmap"
                        placeholder="Describe key deliverables for the next 3 months..."
                        value={formData.roadmap}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="askingPriceLive">Asking Price (USDC) *</Label>
                      <Input
                        id="askingPriceLive"
                        type="number"
                        min="0"
                        value={formData.askingPriceLive}
                        onChange={(e) => handleNumberChange("askingPriceLive", parseFloat(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {formData.phase && (
              <Button
                variant="outline"
                onClick={() => handleSelectChange("phase", "")}
                className="w-full"
              >
                Change Phase Selection
              </Button>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Block Explorer Links</CardTitle>
                <CardDescription>Required - Add links to your smart contracts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {formData.blockExplorerLinks.map((link, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="https://etherscan.io/address/0x..."
                      value={link}
                      onChange={(e) => handleDynamicArrayChange("blockExplorerLinks", index, e.target.value)}
                      className="flex-1"
                    />
                    {index === formData.blockExplorerLinks.length - 1 ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => addToArray("blockExplorerLinks")}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeFromArray("blockExplorerLinks", index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dashboard Links</CardTitle>
                <CardDescription>Optional - Dune Analytics, Flipside, etc.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {formData.dashboardLinks.map((link, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="https://dune.com/dashboard/..."
                      value={link}
                      onChange={(e) => handleDynamicArrayChange("dashboardLinks", index, e.target.value)}
                      className="flex-1"
                    />
                    {index === formData.dashboardLinks.length - 1 ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => addToArray("dashboardLinks")}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeFromArray("dashboardLinks", index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>File Uploads</CardTitle>
                <CardDescription>All uploads are optional but recommended</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="financialFiles">Financial Data (.csv, .xlsx)</Label>
                  <Input
                    id="financialFiles"
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    multiple
                    onChange={(e) => handleMultiFileChange(e, "financialFiles")}
                    className="mt-1"
                  />
                  {formData.financialFiles.length > 0 && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {formData.financialFiles.length} file(s) selected
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="brandAssets">Brand Assets (images, design files)</Label>
                  <Input
                    id="brandAssets"
                    type="file"
                    accept=".png,.jpg,.jpeg,.svg,.pdf,.ai,.sketch"
                    multiple
                    onChange={(e) => handleMultiFileChange(e, "brandAssets")}
                    className="mt-1"
                  />
                  {formData.brandAssets.length > 0 && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {formData.brandAssets.length} file(s) selected
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="contracts">Contracts & Agreements (.pdf, .doc)</Label>
                  <Input
                    id="contracts"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    multiple
                    onChange={(e) => handleMultiFileChange(e, "contracts")}
                    className="mt-1"
                  />
                  {formData.contracts.length > 0 && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {formData.contracts.length} file(s) selected
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Verification Consent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="verificationConsent"
                    checked={formData.verificationConsent}
                    onCheckedChange={(checked) => handleCheckboxChange("verificationConsent", checked as boolean)}
                  />
                  <Label htmlFor="verificationConsent" className="text-sm font-normal">
                    I allow Blym to verify the metrics and wallet addresses provided in this application. 
                    This may include checking on-chain data, contacting references, and validating financial information. *
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            {/* Review Basic Info */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Basic Information</CardTitle>
                  <Badge>Step 1</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div><strong>Legal Name:</strong> {formData.legalName}</div>
                <div><strong>Country:</strong> {formData.country}</div>
                <div><strong>Email:</strong> {formData.email}</div>
                {account && <div><strong>Wallet:</strong> {account.address}</div>}
                <div><strong>IP Ownership:</strong> {formData.ipOwnership ? "✓ Declared" : "Not declared"}</div>
                <div className="pt-2 border-t"><strong>DApp Name:</strong> {formData.dappName}</div>
                <div><strong>Category:</strong> {formData.category}</div>
                <div><strong>Chains:</strong> {formData.chains.join(", ")}</div>
                <div><strong>License:</strong> {formData.openSourceLicense}</div>
                {formData.websiteUrl && <div><strong>Website:</strong> {formData.websiteUrl}</div>}
                {formData.githubUrl && <div><strong>GitHub:</strong> {formData.githubUrl}</div>}
              </CardContent>
            </Card>

            {/* Review Phase Details */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>DApp Phase Details</CardTitle>
                  <Badge>Step 2</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {formData.phase === "build-only" ? (
                  <>
                    <div className="text-2xl font-bold text-green-600">
                      ${formData.askingPriceBuild.toLocaleString()} USDC
                    </div>
                    <div><strong>Unique Logic:</strong> {formData.uniqueLogicPercent}%</div>
                    <div><strong>Post-sale Support:</strong> {formData.postSaleSupport} hours</div>
                    <div><strong>Deal Structure:</strong> {formData.preferredDealStructure}</div>
                    <div><strong>Assets Included:</strong> {formData.assetsIncluded.join(", ")}</div>
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold text-green-600">
                      ${formData.askingPriceLive.toLocaleString()} USDC
                    </div>
                    <div><strong>DAU:</strong> {formData.dau.toLocaleString()}</div>
                    <div><strong>MAU:</strong> {formData.mau.toLocaleString()}</div>
                    <div><strong>Retention:</strong> {formData.retentionRate}%</div>
                    <div><strong>Transactions:</strong> {formData.transactionCount.toLocaleString()}</div>
                    {formData.tvl > 0 && <div><strong>TVL:</strong> ${formData.tvl.toLocaleString()} USDC</div>}
                    <div><strong>Contributors:</strong> {formData.activeContributors}</div>
                    <div><strong>Governance:</strong> {formData.governanceModel}</div>
                    <div><strong>Admin Keys:</strong> {formData.adminKeysCustody}</div>
                    <div className="flex gap-2 pt-2">
                      {formData.hasBugBounty && <Badge variant="outline">Bug Bounty ✓</Badge>}
                      {formData.contractorAgreementsAssignIP && <Badge variant="outline">IP Assigned ✓</Badge>}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Review Evidence */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Evidence & Links</CardTitle>
                  <Badge>Step 3</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div><strong>Block Explorer Links:</strong> {formData.blockExplorerLinks.filter(l => l).length}</div>
                <div><strong>Dashboard Links:</strong> {formData.dashboardLinks.filter(l => l).length}</div>
                <div><strong>Financial Files:</strong> {formData.financialFiles.length}</div>
                <div><strong>Brand Assets:</strong> {formData.brandAssets.length}</div>
                <div><strong>Contracts:</strong> {formData.contracts.length}</div>
                {formData.verificationConsent && (
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Verification Consent Granted
                  </Badge>
                )}
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">List Your Web3 DApp</h1>
          <p className="text-muted-foreground">
            Step {currentStep} of {totalSteps}: {getStepTitle()}
          </p>
          <Progress value={progress} className="mt-4" />
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{getStepTitle()}</CardTitle>
            <CardDescription>{getStepDescription()}</CardDescription>
          </CardHeader>
          <CardContent>
            {renderStep()}
          </CardContent>
        </Card>

        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Previous
          </Button>

          <div className="flex gap-2">
            {currentStep < totalSteps && (
              <Button onClick={handleNext}>
                Continue
              </Button>
            )}
            
            {currentStep === totalSteps && (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.verificationConsent}
                className="min-w-[200px]"
              >
                <Send className="mr-2 h-4 w-4" />
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SellerOnboarding;
