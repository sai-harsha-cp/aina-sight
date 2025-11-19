import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Eye, FileText, XCircle, AlertTriangle, HelpCircle } from "lucide-react";
import { violations, sopCategories, sops, Violation } from "../data/mockData";
import { KPICard } from "./KPICard";

interface EvidenceReviewViewProps {
  onViewEvidence: (violation: Violation) => void;
  initialFilter?: { category?: string; sop?: string };
  onFilterChange?: () => void;
  dateRange: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export function EvidenceReviewView({ onViewEvidence, initialFilter, onFilterChange, dateRange, dateFrom, dateTo }: EvidenceReviewViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialFilter?.category || "all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedSOP, setSelectedSOP] = useState<string>(initialFilter?.sop || "all");
  const [selectedTimeline, setSelectedTimeline] = useState<string>("all");

  // Get unique SOP names filtered by selected category
  const uniqueSOPs = selectedCategory === "all" 
    ? Array.from(new Set(sops.map(sop => sop.name))).sort()
    : sops.filter(sop => sop.category === selectedCategory).map(sop => sop.name).sort();

  // Helper function to parse time strings like "10:45 AM" to minutes since midnight
  const parseTimeToMinutes = (timeStr: string): number => {
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return 0;
    
    let hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    const period = match[3].toUpperCase();
    
    // Convert to 24-hour format
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
    
    return hours * 60 + minutes;
  };

  const filteredViolations = violations.filter((violation) => {
    const categoryMatch = selectedCategory === "all" || violation.category === selectedCategory;
    const statusMatch = selectedStatus === "all" || violation.status === selectedStatus;
    const sopMatch = selectedSOP === "all" || violation.sop === selectedSOP;
    
    return categoryMatch && statusMatch && sopMatch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Missed':
        return (
          <Badge className="bg-amber-100 text-amber-800 border-amber-200">
            Missed
          </Badge>
        );
      case 'Violation':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            Violation
          </Badge>
        );
      case 'Uncertain':
        return (
          <Badge className="bg-amber-100 text-amber-800 border-amber-200">
            Uncertain
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-6 bg-white border-gray-200">
        <div className="flex gap-4 items-end flex-wrap">
          <div className="w-64">
            <label className="text-gray-600 mb-2 block">SOP Category</label>
            <Select value={selectedCategory} onValueChange={(value) => {
              setSelectedCategory(value);
              // Reset SOP selection when category changes
              if (value !== "all") {
                const categorySOPs = sops.filter(sop => sop.category === value).map(sop => sop.name);
                if (selectedSOP !== "all" && !categorySOPs.includes(selectedSOP)) {
                  setSelectedSOP("all");
                }
              }
              onFilterChange?.();
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {sopCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-64">
            <label className="text-gray-600 mb-2 block">SOP Name</label>
            <Select value={selectedSOP} onValueChange={(value) => {
              setSelectedSOP(value);
              onFilterChange?.();
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select SOP" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All SOPs</SelectItem>
                {uniqueSOPs.map((sopName) => (
                  <SelectItem key={sopName} value={sopName}>
                    {sopName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-48">
            <label className="text-gray-600 mb-2 block">Status</label>
            <Select value={selectedStatus} onValueChange={(value) => {
              setSelectedStatus(value);
              onFilterChange?.();
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Missed">Missed</SelectItem>
                <SelectItem value="Violation">Violation</SelectItem>
                <SelectItem value="Uncertain">Uncertain</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 flex justify-end gap-2">
            <Button variant="outline" onClick={() => {
              setSelectedCategory("all");
              setSelectedSOP("all");
              setSelectedStatus("all");
              setSelectedTimeline("all");
              onFilterChange?.();
            }}>
              Clear Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard
          title="Total Events"
          value={filteredViolations.length}
          icon={
            <div className="h-full w-12 rounded-lg bg-gray-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
            </div>
          }
          tooltipText="Total number of AI-detected SOP events requiring evidence review for the selected filters and time period."
        />
        <KPICard
          title="Violations"
          value={filteredViolations.filter(v => v.status === 'Violation').length}
          icon={
            <div className="h-full w-12 rounded-lg bg-gray-100 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
            </div>
          }
          tooltipText="Confirmed SOP violations where AI has detected clear evidence of non-compliance requiring immediate attention."
        />
        <KPICard
          title="Missed Events"
          value={filteredViolations.filter(v => v.status === 'Missed').length}
          icon={
            <div className="h-full w-12 rounded-lg bg-gray-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
            </div>
          }
          tooltipText="Events where required SOP steps were completely missed or not performed according to protocol."
        />
        <KPICard
          title="Uncertain"
          value={filteredViolations.filter(v => v.status === 'Uncertain').length}
          icon={
            <div className="h-full w-12 rounded-lg bg-gray-100 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
            </div>
          }
          tooltipText="Events where AI confidence is low or evidence is inconclusive, requiring manual verification by centre staff."
        />
      </div>

      {/* Evidence Table */}
      <Card className="bg-white border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-gray-900">Evidence Records</h3>
        </div>
        <div className="px-6 pb-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>SOP</TableHead>
                <TableHead>Bed</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Evidence</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredViolations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                    No evidence records found matching the selected filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredViolations
                  .slice()
                  .sort((a, b) => {
                    // Sort by timestamp in descending order (most recent first)
                    const timeA = parseTimeToMinutes(a.timestamp);
                    const timeB = parseTimeToMinutes(b.timestamp);
                    return timeB - timeA;
                  })
                  .map((violation) => (
                  <TableRow key={violation.id}>
                    <TableCell>{violation.timestamp}</TableCell>
                    <TableCell>{violation.sop}</TableCell>
                    <TableCell>{violation.bed}</TableCell>
                    <TableCell className="text-gray-600">{violation.patientId || '-'}</TableCell>
                    <TableCell className="text-gray-600">{violation.category}</TableCell>
                    <TableCell>{getStatusBadge(violation.status)}</TableCell>
                    <TableCell>
                      {violation.status === 'Missed' ? (
                        <span className="text-sm text-gray-500">No Evidence</span>
                      ) : violation.thumbnail ? (
                        <img
                          src={violation.thumbnail}
                          alt="Evidence thumbnail"
                          className="w-16 h-12 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => onViewEvidence(violation)}
                        />
                      ) : (
                        <div className="w-16 h-12 bg-gray-100 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors" onClick={() => onViewEvidence(violation)}>
                          <Eye className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}