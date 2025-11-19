import { useState } from "react";
import { Card } from "./ui/card";
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
import { sops, sopCategories } from "../data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Minus, Activity, XCircle, CheckCircle, FileText, HelpCircle } from "lucide-react";
import { KPICard } from "./KPICard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface SOPComplianceViewProps {
  dateRange: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export function SOPComplianceView({ dateRange, dateFrom, dateTo }: SOPComplianceViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Pre-Dialysis Preparation");

  const filteredSops = sops.filter(sop => sop.category === selectedCategory);

  const categoryStats = {
    totalEvents: filteredSops.reduce((acc, sop) => acc + sop.totalEvents, 0),
    compliance: Math.round(filteredSops.reduce((acc, sop) => acc + sop.compliance, 0) / filteredSops.length),
    violations: filteredSops.reduce((acc, sop) => acc + sop.violations, 0),
  };

  const chartData = filteredSops.slice(0, 10).map(sop => ({
    name: sop.name.length > 25 ? sop.name.substring(0, 25) + '...' : sop.name,
    compliance: sop.compliance,
  }));

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 85) return '#86EFAC'; // Soft green
    if (compliance >= 70) return '#FCD34D'; // Soft amber
    return '#FCA5A5'; // Soft red
  };

  const getTrendIcon = (index: number) => {
    // Mock trend data
    const trends = [1, -1, 0, 1, -1, 1, 0, -1, 1, 0];
    const trend = trends[index % trends.length];
    
    if (trend > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend < 0) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="mb-6">
        <label className="text-gray-600 mb-3 block">Category</label>
        <div className="flex flex-wrap gap-2">
          {sopCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-all text-sm ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard
          title="Total SOP Events"
          value={categoryStats.totalEvents}
          icon={
            <div className="h-full w-12 rounded-lg bg-gray-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
            </div>
          }
          tooltipText="Total number of SOP-related events detected across all monitored beds for the selected category and time period."
        />
        
        <KPICard
          title="Overall Compliance"
          value={`${categoryStats.compliance}%`}
          change={2}
          icon={
            <div className="h-full w-12 rounded-lg bg-gray-100 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
            </div>
          }
          tooltipText="Average compliance percentage across all SOPs in the selected category. Green (≥85%) indicates good compliance, amber (70-84%) needs attention, red (<70%) requires immediate action."
        />
        
        <KPICard
          title="Total Violations"
          value={categoryStats.violations}
          icon={
            <div className="h-full w-12 rounded-lg bg-gray-100 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
            </div>
          }
          tooltipText="Total number of SOP violations detected by AI across all beds in the selected category. Each violation represents a non-compliance event that requires review."
        />
        
        <KPICard
          title="SOPs Monitored"
          value={filteredSops.length}
          icon={
            <div className="h-full w-12 rounded-lg bg-gray-100 flex items-center justify-center">
              <Activity className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
            </div>
          }
          tooltipText="Number of individual Standard Operating Procedures being actively monitored in the selected category using AI-powered event detection."
        />
      </div>

      {/* SOP Details Table */}
      <Card className="bg-white border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-gray-900">Detailed SOP Breakdown</h3>
        </div>
        <div className="px-6 pb-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SOP</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Total Events</TableHead>
                <TableHead className="text-right">Compliant</TableHead>
                <TableHead className="text-right">Violations</TableHead>
                <TableHead className="text-right">Compliance %</TableHead>
                <TableHead className="text-center">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSops.map((sop, index) => (
                <TableRow key={sop.id} className="h-16">
                  <TableCell className="py-4">{sop.name}</TableCell>
                  <TableCell className="text-gray-600 py-4">{sop.category}</TableCell>
                  <TableCell className="text-right py-4">{sop.totalEvents}</TableCell>
                  <TableCell className="text-right py-4">{sop.compliantEvents}</TableCell>
                  <TableCell className="text-right py-4">{sop.violations}</TableCell>
                  <TableCell className="text-right py-4">
                    <span
                      className={`px-2 py-1 rounded ${
                        sop.compliance >= 85
                          ? 'bg-green-100 text-green-800'
                          : sop.compliance >= 70
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {sop.compliance}%
                    </span>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex justify-center items-center">
                      {getTrendIcon(index)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}