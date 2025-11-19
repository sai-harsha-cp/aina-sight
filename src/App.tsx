import { useState } from "react";
import { DashboardView } from "./components/DashboardView";
import { TimelineView } from "./components/TimelineView";
import { SOPComplianceView } from "./components/SOPComplianceView";
import { EvidenceReviewView } from "./components/EvidenceReviewView";
import { EvidenceModal } from "./components/EvidenceModal";
import { ClusterDashboardView } from "./components/ClusterDashboardView";
import { ZonalDashboardView } from "./components/ZonalDashboardView";
import { LoginPage } from "./components/LoginPage";
import { Violation } from "./data/mockData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Calendar as CalendarIcon, User, Loader2, LayoutList, LayoutGrid, ArrowLeft } from "lucide-react";
import { Calendar } from "./components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "./components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./components/ui/dialog";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";
import { format } from "date-fns";
import Group1 from "./imports/Group26";
import { TimelineDateFilter } from "./imports/Frame3";

type ViewType = "dashboard" | "timeline" | "compliance" | "evidence";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [selectedCentre, setSelectedCentre] = useState("kukatpally");
  const [selectedDateRange, setSelectedDateRange] = useState("today");
  const [selectedViolation, setSelectedViolation] = useState<Violation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [evidenceFilter, setEvidenceFilter] = useState<{ category?: string; sop?: string }>({});
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTimelineDate, setSelectedTimelineDate] = useState<string>("30"); // Default to Thu 30
  const [isEditDetailsOpen, setIsEditDetailsOpen] = useState(false);
  const [userName, setUserName] = useState("Sai Kiran");
  const [userPassword, setUserPassword] = useState("");
  const [editName, setEditName] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editCurrentPassword, setEditCurrentPassword] = useState("");
  const [editConfirmPassword, setEditConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [dashboardLayout, setDashboardLayout] = useState<"bento" | "cards">("bento");
  const [managerView, setManagerView] = useState<"centre" | "cluster" | "zonal">("centre");
  const [isDrilledDown, setIsDrilledDown] = useState(false); // Track if viewing specific centre from cluster view
  const [selectedZone, setSelectedZone] = useState<string | null>(null); // Track selected zone in zonal view
  const [drillLevel, setDrillLevel] = useState<"zone" | "cluster" | "centre">("centre"); // Track current drill level
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  const triggerLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleDateRangeChange = (rangeId: string) => {
    setSelectedDateRange(rangeId);
    triggerLoading();
  };

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
    triggerLoading();
  };

  const handleCentreChange = (centreId: string) => {
    setSelectedCentre(centreId);
    triggerLoading();
  };

  const handleViewEvidence = (violation: Violation) => {
    setSelectedViolation(violation);
    setIsModalOpen(true);
  };

  const handleNavigateToEvidence = (category: string, sopName: string) => {
    setEvidenceFilter({ category, sop: sopName });
    setCurrentView("evidence");
  };

  const handleTimelineDateChange = (date: string) => {
    setSelectedTimelineDate(date);
    triggerLoading();
  };

  // Drill down from zone to cluster (zonal view)
  const handleDrillDownToCluster = (zoneId: string) => {
    setSelectedZone(zoneId);
    setDrillLevel("cluster");
    triggerLoading();
  };

  // Drill down from cluster to centre (cluster or zonal view)
  const handleDrillDownToCentre = (centreId: string) => {
    setSelectedCentre(centreId);
    setDrillLevel("centre");
    setIsDrilledDown(true);
    triggerLoading();
  };

  // Navigate back one level
  const handleBackToCluster = () => {
    if (managerView === "zonal" && drillLevel === "centre") {
      // From centre back to cluster view in zonal hierarchy
      setDrillLevel("cluster");
      setIsDrilledDown(false);
    } else if (managerView === "zonal" && drillLevel === "cluster") {
      // From cluster back to zone view
      setDrillLevel("zone");
      setSelectedZone(null);
    } else {
      // From centre back to cluster view in cluster hierarchy
      setIsDrilledDown(false);
    }
    triggerLoading();
  };

  // Handle successful login
  const handleLogin = (role: "centre" | "cluster" | "zonal", name: string) => {
    setUserName(name);
    setManagerView(role);
    setDrillLevel(role === "zonal" ? "zone" : role === "cluster" ? "cluster" : "centre");
    setIsLoggedIn(true);
    triggerLoading();
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setManagerView("centre");
    setDrillLevel("centre");
    setIsDrilledDown(false);
    setSelectedZone(null);
    setCurrentView("dashboard");
  };

  const centres = [
    { id: "kukatpally", name: "NephroPlus – Kukatpally" },
    { id: "hitech", name: "NephroPlus – Hi-Tech City" },
    { id: "ameerpet", name: "NephroPlus – Ameerpet" },
  ];

  const dateRanges = [
    { id: "today", name: "Today" },
    { id: "yesterday", name: "Yesterday" },
    { id: "week", name: "This Week" },
    { id: "custom", name: "Custom Range" },
  ];

  // Show login page if not authenticated
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-8 py-4 pt-[16px] pr-[32px] pb-[0px] pl-[32px]">
          <div className="flex items-center justify-between mb-[28px]">
            {/* Logo and Title */}
            <div>
              <div className="h-[60px] w-[176px]">
                <Group1 />
              </div>
            </div>

            {/* Centre & Date Filters */}
            <div className="flex items-center gap-4">
              {(managerView === "centre" || isDrilledDown) && (
                <div className="w-64">
                  <Select value={selectedCentre} onValueChange={handleCentreChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {centres.map((centre) => (
                        <SelectItem key={centre.id} value={centre.id}>
                          {centre.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {currentView === "timeline" ? (
                <TimelineDateFilter 
                  selectedDate={selectedTimelineDate}
                  onDateChange={handleTimelineDateChange}
                />
              ) : (
                <div className="flex items-center gap-2">
                  {dateRanges.map((range) => {
                    if (range.id === "custom") {
                      return (
                        <Popover key={range.id} open={calendarOpen} onOpenChange={setCalendarOpen}>
                          <PopoverTrigger asChild>
                            <button
                              onClick={() => {
                                setSelectedDateRange(range.id);
                                setCalendarOpen(true);
                              }}
                              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                                selectedDateRange === range.id
                                  ? 'bg-[#2563EB] text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {dateFrom && dateTo 
                                ? `${format(dateFrom, "MMM d")} - ${format(dateTo, "MMM d")}`
                                : dateFrom
                                ? format(dateFrom, "MMM d, yyyy")
                                : range.name
                              }
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="end">
                            <div className="p-3">
                              <div className="text-sm text-gray-700 mb-2">Select date range:</div>
                              <div className="flex gap-2">
                                <div>
                                  <div className="text-xs text-gray-600 mb-1">From</div>
                                  <Calendar
                                    mode="single"
                                    selected={dateFrom}
                                    onSelect={(date) => setDateFrom(date)}
                                    disabled={(date) =>
                                      date > new Date() || (dateTo ? date > dateTo : false)
                                    }
                                    initialFocus
                                  />
                                </div>
                                <div>
                                  <div className="text-xs text-gray-600 mb-1">To</div>
                                  <Calendar
                                    mode="single"
                                    selected={dateTo}
                                    onSelect={(date) => setDateTo(date)}
                                    disabled={(date) =>
                                      date > new Date() || (dateFrom ? date < dateFrom : false)
                                    }
                                    initialFocus
                                  />
                                </div>
                              </div>
                              <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
                                <button
                                  onClick={() => {
                                    setDateFrom(undefined);
                                    setDateTo(undefined);
                                  }}
                                  className="flex-1 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                                >
                                  Clear
                                </button>
                                <button
                                  onClick={() => {
                                    setCalendarOpen(false);
                                    triggerLoading();
                                  }}
                                  className="flex-1 px-3 py-1.5 text-sm bg-[#2563EB] text-white rounded hover:bg-[#1d4ed8] transition-colors"
                                >
                                  Apply
                                </button>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      );
                    }
                    
                    return (
                      <button
                        key={range.id}
                        onClick={() => handleDateRangeChange(range.id)}
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${
                          selectedDateRange === range.id
                            ? 'bg-[#2563EB] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {range.name}
                      </button>
                    );
                  })}
                </div>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
                    <span className="text-white text-sm">SK</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div>
                      <div>{userName}</div>
                      <div className="text-xs text-gray-500 font-normal">
                        {managerView === "centre" && "Centre Manager"}
                        {managerView === "cluster" && "Cluster Manager"}
                        {managerView === "zonal" && "Zonal Manager"}
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  {/* View Selection */}
                  <div className="px-2 py-1.5">
                    <div className="text-xs text-gray-500 mb-1.5">Switch View</div>
                    <DropdownMenuRadioGroup value={managerView} onValueChange={(value) => {
                      setManagerView(value as "centre" | "cluster" | "zonal");
                      setIsDrilledDown(false);
                      setSelectedZone(null);
                      setDrillLevel(value === "zonal" ? "zone" : value === "cluster" ? "cluster" : "centre");
                      triggerLoading();
                    }}>
                      <DropdownMenuRadioItem value="centre" className="cursor-pointer">
                        Centre Manager
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="cluster" className="cursor-pointer">
                        Cluster Manager
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="zonal" className="cursor-pointer">
                        Zonal Manager
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </div>
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={() => {
                      setEditName(userName);
                      setEditPassword("");
                      setIsEditDetailsOpen(true);
                    }}
                  >
                    Edit Details
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Main Navigation Tabs */}
          {/* Hide tabs when in cluster/zonal view and not drilled down */}
          {(managerView === "centre" || isDrilledDown) && (
            <div className="flex items-center justify-between">
              <div className="flex gap-8">
                <button
                  onClick={() => handleViewChange("dashboard")}
                  className={`pb-3 border-b-2 transition-colors ${
                    currentView === "dashboard"
                      ? "border-[#2563EB] text-[#2563EB]"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => handleViewChange("timeline")}
                  className={`pb-3 border-b-2 transition-colors ${
                    currentView === "timeline"
                      ? "border-[#2563EB] text-[#2563EB]"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Timeline View
                </button>
                <button
                  onClick={() => handleViewChange("evidence")}
                  className={`pb-3 border-b-2 transition-colors ${
                    currentView === "evidence"
                      ? "border-[#2563EB] text-[#2563EB]"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Evidence Review
                </button>
              </div>
              
              {/* Layout Toggle - Only visible on Dashboard */}
              {currentView === "dashboard" && (
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg m-[0px] p-[4px]">
                  <button
                    onClick={() => setDashboardLayout("bento")}
                    className={`p-2 rounded transition-all ${
                      dashboardLayout === "bento"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <LayoutList className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDashboardLayout("cards")}
                    className={`p-2 rounded transition-all ${
                      dashboardLayout === "cards"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-8 py-8 bg-[rgb(255,255,255)]">
        <div className="max-w-[1600px] mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-[#2563EB]" />
                <p className="text-gray-600 text-sm">Loading data...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Breadcrumb for drilled down views */}
              {currentView === "dashboard" && (
                <>
                  {/* Zonal view breadcrumbs */}
                  {managerView === "zonal" && drillLevel === "cluster" && (
                    <div className="mb-6">
                      <button
                        onClick={handleBackToCluster}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#2563EB] transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Zonal Overview
                      </button>
                    </div>
                  )}
                  {managerView === "zonal" && drillLevel === "centre" && (
                    <div className="mb-6">
                      <button
                        onClick={handleBackToCluster}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#2563EB] transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Cluster Overview
                      </button>
                    </div>
                  )}
                  
                  {/* Cluster view breadcrumb */}
                  {managerView === "cluster" && isDrilledDown && (
                    <div className="mb-6">
                      <button
                        onClick={handleBackToCluster}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#2563EB] transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Cluster Overview
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Conditionally render based on manager view and drill level */}
              {currentView === "dashboard" && managerView === "zonal" && drillLevel === "zone" ? (
                <ZonalDashboardView onDrillDownToCluster={handleDrillDownToCluster} />
              ) : currentView === "dashboard" && managerView === "zonal" && drillLevel === "cluster" ? (
                <ClusterDashboardView onDrillDown={handleDrillDownToCentre} />
              ) : currentView === "dashboard" && managerView === "cluster" && !isDrilledDown ? (
                <ClusterDashboardView onDrillDown={handleDrillDownToCentre} />
              ) : currentView === "dashboard" ? (
                <DashboardView onViewEvidence={handleViewEvidence} onNavigateToEvidence={handleNavigateToEvidence} dateRange={selectedDateRange} dateFrom={dateFrom} dateTo={dateTo} layout={dashboardLayout} />
              ) : currentView === "timeline" ? (
                <TimelineView onViewEvidence={handleViewEvidence} dateRange={selectedDateRange} dateFrom={dateFrom} dateTo={dateTo} selectedDate={selectedTimelineDate} />
              ) : currentView === "compliance" ? (
                <SOPComplianceView dateRange={selectedDateRange} dateFrom={dateFrom} dateTo={dateTo} />
              ) : currentView === "evidence" ? (
                <EvidenceReviewView onViewEvidence={handleViewEvidence} initialFilter={evidenceFilter} onFilterChange={() => setEvidenceFilter({})} dateRange={selectedDateRange} dateFrom={dateFrom} dateTo={dateTo} />
              ) : null}
            </>
          )}
        </div>
      </main>

      {/* Evidence Modal */}
      <EvidenceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        violation={selectedViolation}
      />

      {/* Edit Details Dialog */}
      <Dialog open={isEditDetailsOpen} onOpenChange={setIsEditDetailsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Details</DialogTitle>
            <DialogDescription>
              Update your name and password information.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={editCurrentPassword}
                onChange={(e) => setEditCurrentPassword(e.target.value)}
                placeholder="Enter current password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                value={editPassword}
                onChange={(e) => setEditPassword(e.target.value)}
                placeholder="Enter new password (leave blank to keep current)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={editConfirmPassword}
                onChange={(e) => setEditConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>

            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDetailsOpen(false);
                setPasswordError("");
                setEditCurrentPassword("");
                setEditPassword("");
                setEditConfirmPassword("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setPasswordError("");
                
                // Validate name
                if (!editName.trim()) {
                  setPasswordError("Name cannot be empty");
                  return;
                }
                
                // Check if user is trying to change password
                if (editPassword.trim() || editConfirmPassword.trim() || editCurrentPassword.trim()) {
                  // If any password field is filled, all password fields must be filled
                  if (!editCurrentPassword.trim()) {
                    setPasswordError("Current password is required to change password");
                    return;
                  }
                  
                  if (!editPassword.trim()) {
                    setPasswordError("New password is required");
                    return;
                  }
                  
                  if (!editConfirmPassword.trim()) {
                    setPasswordError("Please confirm your new password");
                    return;
                  }
                  
                  // Check if new passwords match
                  if (editPassword !== editConfirmPassword) {
                    setPasswordError("New passwords do not match");
                    return;
                  }
                  
                  // In a real app, you would verify the current password here
                  // For now, we'll just update the password
                  setUserPassword(editPassword);
                }
                
                // Update name
                setUserName(editName.trim());
                
                // Clear fields and close
                setEditCurrentPassword("");
                setEditPassword("");
                setEditConfirmPassword("");
                setPasswordError("");
                setIsEditDetailsOpen(false);
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}