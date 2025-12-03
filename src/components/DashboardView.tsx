import { KPICard } from "./KPICard";
import { CategoryComplianceCard } from "./CategoryComplianceCard";
import { SOPTrendModal } from "./SOPTrendModal";
import { SOPCountTrendModal } from "./SOPCountTrendModal";
import { SOPTimeTrendModal } from "./SOPTimeTrendModal";
import { SOPRatioTrendModal } from "./SOPRatioTrendModal";
import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  ClipboardCheck,
  Stethoscope,
  ClipboardList,
  ShieldCheck,
  Settings,
  FileText,
  XCircle,
  Calendar,
  Percent,
  Clock,
  Timer,
  Users,
  BarChart3,
  Package,
  Video,
  UserCheck,
  Droplet,
  Bed,
  Gauge,
  Home,
  Heart,
  Thermometer,
  Scale,
  Syringe,
  Activity as Pulse,
  TrendingUp,
  Smartphone,
  ClipboardList as Clipboard,
  Eye,
  Shield,
  Zap,
  Moon,
  ArrowDown,
  ArrowUp,
  Wrench
} from "lucide-react";
import {
  sops,
  sopCategories,
  SOP
} from "../data/mockData";
import { Violation } from "../data/mockData";

interface DashboardViewProps {
  onNavigateToEvidence: (category: string, sopName: string) => void;
  onViewEvidence: (violation: Violation) => void;
  dateRange: string;
  dateFrom?: Date;
  dateTo?: Date;
  layout?: "bento" | "cards";
}

export function DashboardView({ onNavigateToEvidence, onViewEvidence, dateRange, dateFrom, dateTo, layout = "bento" }: DashboardViewProps) {
  const [trendModalOpen, setTrendModalOpen] = useState(false);
  const [selectedSOPForTrend, setSelectedSOPForTrend] = useState<SOP | null>(null);
  const [selectedKPIForTrend, setSelectedKPIForTrend] = useState<{ name: string; category: string } | null>(null);
  const [modalType, setModalType] = useState<'percentage' | 'count' | 'time' | 'ratio'>('percentage');
  const [collapsedCategories, setCollapsedCategories] = useState<{ [key: string]: boolean }>({});

  const handleSOPTrendClick = (sop: SOP) => {
    setSelectedSOPForTrend(sop);
    setSelectedKPIForTrend(null);

    // Determine modal type based on SOP
    if (sop.name.includes('%')) {
      setModalType('percentage');
    } else if (sop.actualValue) {
      // Parse the actualValue to determine type
      if (sop.actualValue.includes('min') || sop.actualValue.includes('hrs')) {
        setModalType('time');
      } else if (sop.actualValue.includes(':')) {
        setModalType('ratio');
      } else {
        setModalType('count');
      }
    } else {
      setModalType('percentage');
    }

    setTrendModalOpen(true);
  };

  const handleKPITrendClick = (kpiName: string, category: string) => {
    setSelectedKPIForTrend({ name: kpiName, category });
    setSelectedSOPForTrend(null);
    setTrendModalOpen(true);
  };

  const totalExpected = 214;
  const totalDetected = 178;
  const overallCompliance = 82;
  const missedEvents = 12;
  const highRiskViolations = 5;

  // Mock KPI data for trends
  const kpiMockData: { [key: string]: SOP } = {
    'Overall Clinical Compliance': {
      id: 'kpi-1',
      name: 'Overall Clinical Compliance',
      category: 'Dashboard Metrics',
      compliance: overallCompliance,
      expected: 214,
      detected: 178,
      violations: 36,
      trend: [78, 79, 81, 80, 82, 83, 82],
      hourlyData: [
        { hour: '06:00', compliance: 85, expected: 28, detected: 24 },
        { hour: '08:00', compliance: 80, expected: 32, detected: 26 },
        { hour: '10:00', compliance: 78, expected: 30, detected: 23 },
        { hour: '12:00', compliance: 82, expected: 34, detected: 28 },
        { hour: '14:00', compliance: 84, expected: 30, detected: 25 },
        { hour: '16:00', compliance: 81, expected: 32, detected: 26 },
        { hour: '18:00', compliance: 83, expected: 28, detected: 23 },
      ]
    },
    'Missed SOP Events': {
      id: 'kpi-2',
      name: 'Missed SOP Events',
      category: 'Dashboard Metrics',
      compliance: 100 - Math.round((missedEvents / totalExpected) * 100),
      expected: totalExpected,
      detected: totalExpected - missedEvents,
      violations: missedEvents,
      trend: [14, 15, 13, 14, 12, 13, 12],
      hourlyData: [
        { hour: '06:00', compliance: 95, expected: 28, detected: 27 },
        { hour: '08:00', compliance: 91, expected: 32, detected: 29 },
        { hour: '10:00', compliance: 93, expected: 30, detected: 28 },
        { hour: '12:00', compliance: 94, expected: 34, detected: 32 },
        { hour: '14:00', compliance: 96, expected: 30, detected: 29 },
        { hour: '16:00', compliance: 92, expected: 32, detected: 30 },
        { hour: '18:00', compliance: 95, expected: 28, detected: 27 },
      ]
    },
    'High-Risk Violations': {
      id: 'kpi-3',
      name: 'High-Risk Violations',
      category: 'Dashboard Metrics',
      compliance: 100 - Math.round((highRiskViolations / totalExpected) * 100),
      expected: totalExpected,
      detected: totalExpected - highRiskViolations,
      violations: highRiskViolations,
      trend: [7, 6, 5, 6, 5, 6, 5],
      hourlyData: [
        { hour: '06:00', compliance: 98, expected: 28, detected: 27 },
        { hour: '08:00', compliance: 97, expected: 32, detected: 31 },
        { hour: '10:00', compliance: 96, expected: 30, detected: 29 },
        { hour: '12:00', compliance: 98, expected: 34, detected: 33 },
        { hour: '14:00', compliance: 99, expected: 30, detected: 30 },
        { hour: '16:00', compliance: 97, expected: 32, detected: 31 },
        { hour: '18:00', compliance: 98, expected: 28, detected: 28 },
      ]
    },
    'Violations': {
      id: 'kpi-4',
      name: 'Total Violations',
      category: 'Dashboard Metrics',
      compliance: Math.round((totalDetected / totalExpected) * 100),
      expected: totalExpected,
      detected: totalDetected,
      violations: totalExpected - totalDetected,
      trend: [75, 78, 80, 79, 83, 81, 83],
      hourlyData: [
        { hour: '06:00', compliance: 85, expected: 28, detected: 24 },
        { hour: '08:00', compliance: 81, expected: 32, detected: 26 },
        { hour: '10:00', compliance: 77, expected: 30, detected: 23 },
        { hour: '12:00', compliance: 82, expected: 34, detected: 28 },
        { hour: '14:00', compliance: 83, expected: 30, detected: 25 },
        { hour: '16:00', compliance: 81, expected: 32, detected: 26 },
        { hour: '18:00', compliance: 82, expected: 28, detected: 23 },
      ]
    },
    'Total Dialysis Sessions': {
      id: 'kpi-5',
      name: 'Total Dialysis Sessions',
      category: 'Dashboard Metrics',
      compliance: 100,
      expected: 24,
      detected: 24,
      violations: 0,
      trend: [22, 24, 23, 25, 24, 23, 24],
      hourlyData: [
        { hour: '06:00', compliance: 100, expected: 4, detected: 4 },
        { hour: '08:00', compliance: 100, expected: 4, detected: 4 },
        { hour: '10:00', compliance: 100, expected: 4, detected: 4 },
        { hour: '12:00', compliance: 100, expected: 4, detected: 4 },
        { hour: '14:00', compliance: 100, expected: 4, detected: 4 },
        { hour: '16:00', compliance: 100, expected: 4, detected: 4 },
      ]
    },
    'Occupancy Rate': {
      id: 'kpi-6',
      name: 'Occupancy Rate',
      category: 'Dashboard Metrics',
      compliance: 88,
      expected: 8,
      detected: 7,
      violations: 1,
      trend: [85, 87, 88, 86, 89, 88, 88],
      hourlyData: [
        { hour: '06:00', compliance: 88, expected: 8, detected: 7 },
        { hour: '08:00', compliance: 88, expected: 8, detected: 7 },
        { hour: '10:00', compliance: 88, expected: 8, detected: 7 },
        { hour: '12:00', compliance: 88, expected: 8, detected: 7 },
        { hour: '14:00', compliance: 88, expected: 8, detected: 7 },
        { hour: '16:00', compliance: 88, expected: 8, detected: 7 },
      ]
    },
    'Avg Dialysis Session Duration': {
      id: 'kpi-7',
      name: 'Avg Dialysis Session Duration',
      category: 'Dashboard Metrics',
      compliance: 95,
      expected: 240,
      detected: 228,
      violations: 12,
      trend: [230, 232, 228, 235, 228, 230, 228],
      hourlyData: [
        { hour: '06:00', compliance: 95, expected: 240, detected: 228 },
        { hour: '08:00', compliance: 95, expected: 240, detected: 228 },
        { hour: '10:00', compliance: 95, expected: 240, detected: 228 },
        { hour: '12:00', compliance: 95, expected: 240, detected: 228 },
        { hour: '14:00', compliance: 95, expected: 240, detected: 228 },
        { hour: '16:00', compliance: 95, expected: 240, detected: 228 },
      ]
    },
    'Avg Patient Center Duration': {
      id: 'kpi-8',
      name: 'Avg Patient Center Duration',
      category: 'Dashboard Metrics',
      compliance: 92,
      expected: 300,
      detected: 276,
      violations: 24,
      trend: [275, 280, 276, 285, 276, 278, 276],
      hourlyData: [
        { hour: '06:00', compliance: 92, expected: 300, detected: 276 },
        { hour: '08:00', compliance: 92, expected: 300, detected: 276 },
        { hour: '10:00', compliance: 92, expected: 300, detected: 276 },
        { hour: '12:00', compliance: 92, expected: 300, detected: 276 },
        { hour: '14:00', compliance: 92, expected: 300, detected: 276 },
        { hour: '16:00', compliance: 92, expected: 300, detected: 276 },
      ]
    },
    'Staff-to-Patient Ratio': {
      id: 'kpi-9',
      name: 'Staff-to-Patient Ratio',
      category: 'Dashboard Metrics',
      compliance: 100,
      expected: 4,
      detected: 4,
      violations: 0,
      trend: [4.2, 4.1, 4.0, 4.1, 4.0, 4.0, 4.0],
      hourlyData: [
        { hour: '06:00', compliance: 100, expected: 4, detected: 4 },
        { hour: '08:00', compliance: 100, expected: 4, detected: 4 },
        { hour: '10:00', compliance: 100, expected: 4, detected: 4 },
        { hour: '12:00', compliance: 100, expected: 4, detected: 4 },
        { hour: '14:00', compliance: 100, expected: 4, detected: 4 },
        { hour: '16:00', compliance: 100, expected: 4, detected: 4 },
      ]
    },
    'Total SOP Violations': {
      id: 'kpi-10',
      name: 'Total SOP Violations',
      category: 'Dashboard Metrics',
      compliance: Math.round((totalDetected / totalExpected) * 100),
      expected: totalExpected,
      detected: totalDetected,
      violations: totalExpected - totalDetected,
      trend: [38, 36, 35, 37, 36, 35, 36],
      hourlyData: [
        { hour: '06:00', compliance: 85, expected: 28, detected: 24 },
        { hour: '08:00', compliance: 81, expected: 32, detected: 26 },
        { hour: '10:00', compliance: 77, expected: 30, detected: 23 },
        { hour: '12:00', compliance: 82, expected: 34, detected: 28 },
        { hour: '14:00', compliance: 83, expected: 30, detected: 25 },
        { hour: '16:00', compliance: 81, expected: 32, detected: 26 },
        { hour: '18:00', compliance: 82, expected: 28, detected: 23 },
      ]
    }
  };

  // KPI tooltips
  const kpiTooltips = {
    compliance: "Percentage of all SOP events completed correctly across all categories today",
    missed: "Number of required clinical procedures that were not performed during patient sessions",
    highRisk: "Critical safety violations that could directly impact patient health and safety",
    violations: "Total SOP events detected vs expected across all beds and sessions today"
  };

  // Category tooltips
  const categoryTooltips: { [key: string]: string } = {
    'Operational Performance Metrics': 'Key operational indicators tracking dialysis sessions, occupancy, staff ratios, and overall performance',
    'Clinical Care Quality Metrics': 'Comprehensive metrics tracking clinical compliance, hygiene standards, patient safety, and quality of care',
    'Stock Audit Metrics': 'Inventory management metrics tracking stock audits, SKU movements, and supply chain activities',
    'Security & Vigilance Metrics': 'Security monitoring indicators including camera uptime, tampering detection, and facility security',
    'Staff Efficiency Metrics': 'Workforce productivity metrics tracking staff work distribution, time management, and operational efficiency'
  };

  // SOP tooltips
  const sopTooltips: { [key: string]: string } = {
    // Operational Performance Metrics
    'Total Number of Completed Dialysis Sessions': 'Total count of dialysis treatment sessions successfully completed today',
    'Occupancy Rate (% of sessions conducted vs. total possible sessions)': 'Percentage of available bed capacity utilized across all shifts',
    'Average Dialysis Session Duration': 'Mean duration of dialysis treatment sessions from start to finish',
    'Average Duration the Patient Spends in the Center': 'Mean total time patients spend in the center from arrival to departure',
    'Average Staff-to-Patient Ratio': 'Mean ratio of healthcare staff members to patients during treatment sessions',
    'SOP Violations': 'Total number of Standard Operating Procedure violations detected across all categories',

    // Clinical Care Quality Metrics
    'Overall Clinical Compliance %': 'Aggregate compliance percentage across all SOPs and clinical procedures',
    'Hand Hygiene Compliance %': 'Percentage of hand hygiene events performed correctly before and after patient contact',
    'Patient on Cleaned Bed Compliance %': 'Percentage of patients placed on properly cleaned and disinfected beds',
    'Dialysis Machine Rinsing Compliance %': 'Percentage of machines properly rinsed after each dialysis session',
    'Dialysis Machine Hot Disinfection Compliance %': 'Percentage of machines that underwent hot disinfection as per protocol',
    'BP Monitoring Frequency Compliance %': 'Percentage of blood pressure monitoring events performed at required intervals',
    'Unique Blood Spillages Identified': 'Total count of blood spillage incidents detected and documented',
    'Number of Unique Dialysis Machine Alerts': 'Total count of unique machine alerts triggered during operations',
    'Average Alert Resolution Time': 'Mean time taken to resolve dialysis machine alerts and restore normal operation',
    'AVF Access – % & Count': 'Arteriovenous Fistula access: Percentage and count of patients using AVF for dialysis',
    'CVC Access – % & Count': 'Central Venous Catheter access: Percentage and count of patients using CVC for dialysis',
    'Pre & Post Dialysis Weight Measurement Compliance %': 'Percentage of patients with both pre and post-dialysis weight measurements recorded',

    // Stock Audit Metrics
    'Total Hours Spent in Stock Audit': 'Cumulative time spent conducting inventory audits and stock verification',
    'Stock Audits Done': 'Total number of stock audits completed for medical supplies and equipment',
    'SKUs Moved In': 'Number of unique stock keeping units received into inventory',
    'SKUs Moved Out': 'Number of unique stock keeping units issued from inventory',
    'Late Night Check-Ins': 'Number of after-hours inventory deliveries or stock verifications',

    // Security & Vigilance Metrics
    'Cameras Uptime %': 'Percentage of time all security cameras were operational and recording',
    'Tampering of Cameras': 'Number of incidents where security cameras were tampered with or obstructed',
    'Large Equipment Moved': 'Number of instances where large medical equipment was moved or relocated',
    'Tampering of Electrical Circuit Panel': 'Number of unauthorized access or tampering incidents with electrical panels',

    // Staff Efficiency Metrics
    'Avg. Nurse Work Distribution': 'Distribution of nurse time across patient care, idle, mobile usage, and machine preparation activities',
    'Avg. Maintenance Personnel Work Distribution': 'Distribution of maintenance staff time across idle, mobile usage, machine preparation, and hygiene maintenance',
    'Avg. Duration of Staff on Mobile per Day': 'Average time staff members spend on mobile devices during work hours'
  };

  return (
    <div className="space-y-6">
      {/* SOP Categories - Conditional Layout */}
      <div className={layout === "bento"
        ? "grid grid-cols-1 xl:grid-cols-6 gap-6 auto-rows-auto"
        : "space-y-8"
      }>
        {sopCategories
          .sort((a, b) => {
            // Define custom order
            const order = layout === "bento" ? [
              'Clinical Care Quality Metrics',      // Large card - spans 3 cols
              'Operational Performance Metrics',     // Medium card - spans 3 cols
              'Security & Vigilance Metrics',        // Compact card - spans 2 cols
              'Staff Efficiency Metrics',            // Compact card - spans 2 cols
              'Stock Audit Metrics'                  // Medium card - spans 2 cols
            ] : [
              'Clinical Care Quality Metrics',
              'Operational Performance Metrics',
              'Staff Efficiency Metrics',
              'Security & Vigilance Metrics',
              'Stock Audit Metrics'
            ];
            return order.indexOf(a) - order.indexOf(b);
          })
          .map((category, index) => {
            const categorySops = sops.filter((sop) => sop.category === category);

            // Define bento grid spans for each category
            const getBentoSpan = (category: string) => {
              if (layout === "cards") return ""; // No special spans for cards layout

              switch (category) {
                case 'Clinical Care Quality Metrics':
                  return 'xl:col-span-3 xl:row-span-2'; // Large card - left side
                case 'Operational Performance Metrics':
                  return 'xl:col-span-3'; // Medium card - top right
                case 'Security & Vigilance Metrics':
                  return 'xl:col-span-3'; // Compact card - below Operational
                case 'Staff Efficiency Metrics':
                  return 'xl:col-span-3'; // Compact card
                case 'Stock Audit Metrics':
                  return 'xl:col-span-3'; // Medium card
                default:
                  return 'xl:col-span-3';
              }
            };

            // Calculate category-level stats
            const categoryCompliance = Math.round(
              categorySops.reduce((acc, sop) => acc + sop.compliance, 0) / categorySops.length
            );
            const compliantCount = categorySops.filter(sop => sop.compliance >= 85).length;
            const warningCount = categorySops.filter(sop => sop.compliance >= 70 && sop.compliance < 85).length;
            const needsAttentionCount = categorySops.filter(sop => sop.compliance < 70).length;

            // Map SOPs to relevant icons
            const sopIcons: { [key: string]: React.ReactNode } = {
              // Operational Performance Metrics
              'Total Number of Completed Dialysis Sessions': (
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4.5 h-4.5 text-gray-500" strokeWidth={2} />
                </div>
              ),
              'Occupancy Rate (% of sessions conducted vs. total possible sessions)': (
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Gauge className="w-4.5 h-4.5 text-gray-500" strokeWidth={2} />
                </div>
              ),
              'Average Dialysis Session Duration': (
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4.5 h-4.5 text-gray-500" strokeWidth={2} />
                </div>
              ),
              'Average Duration the Patient Spends in the Center': (
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Home className="w-4.5 h-4.5 text-gray-500" strokeWidth={2} />
                </div>
              ),
              'Average Staff-to-Patient Ratio': (
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Users className="w-4.5 h-4.5 text-gray-500" strokeWidth={2} />
                </div>
              ),
              'SOP Violations': (
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-4.5 h-4.5 text-gray-500" strokeWidth={2} />
                </div>
              ),

              // Clinical Care Quality Metrics
              'Overall Clinical Compliance %': (
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Activity className="w-4.5 h-4.5 text-gray-500" strokeWidth={2} />
                </div>
              ),
              'Hand Hygiene Compliance %': (
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Droplet className="w-4.5 h-4.5 text-gray-500" strokeWidth={2} />
                </div>
              ),
              'Patient on Cleaned Bed Compliance %': (
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Bed className="w-4.5 h-4.5 text-gray-500" strokeWidth={2} />
                </div>
              ),
              'Dialysis Machine Rinsing Compliance %': (
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Droplet className="w-4.5 h-4.5 text-gray-500" strokeWidth={2} />
                </div>
              ),
              'Dialysis Machine Hot Disinfection Compliance %': (
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Thermometer className="w-4.5 h-4.5 text-gray-500" strokeWidth={2} />
                </div>
              ),
              'BP Monitoring Frequency Compliance %': (
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-4.5 h-4.5 text-gray-500" strokeWidth={2} />
                </div>
              ),
              'Unique Blood Spillages Identified': (
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-4.5 h-4.5 text-gray-500" strokeWidth={2} />
                </div>
              ),
              'Number of Unique Dialysis Machine Alerts': (
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-4.5 h-4.5 text-gray-500" strokeWidth={2} />
                </div>
              ),
              'Average Alert Resolution Time': (
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Timer className="w-4.5 h-4.5 text-gray-500" strokeWidth={2} />
                </div>
              ),
              'AVF Access – % & Count': (
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Syringe className="w-4.5 h-4.5 text-gray-500" strokeWidth={2} />
                </div>
              ),
              'CVC Access – % & Count': (
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Syringe className="w-4.5 h-4.5 text-gray-500" strokeWidth={2} />
                </div>
              ),
              'Pre & Post Dialysis Weight Measurement Compliance %': (
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Scale className="w-4.5 h-4.5 text-gray-500" strokeWidth={2} />
                </div>
              ),

              // Staff Efficiency Metrics
              'Avg. Nurse Work Distribution': (
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-4.5 h-4.5 text-gray-500" strokeWidth={2} />
                </div>
              ),
              'Avg. Maintenance Personnel Work Distribution': (
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-4.5 h-4.5 text-gray-500" strokeWidth={2} />
                </div>
              ),
              'Avg. Duration of Staff on Mobile per Day': (
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-4.5 h-4.5 text-gray-500" strokeWidth={2} />
                </div>
              ),

              // Security & Vigilance Metrics
              'Cameras Uptime %': (
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Video className="w-4.5 h-4.5 text-gray-500" strokeWidth={2} />
                </div>
              ),
              'Tampering of Cameras': (
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4.5 h-4.5 text-gray-500" strokeWidth={2} />
                </div>
              ),
              'Large Equipment Moved': (
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Package className="w-4.5 h-4.5 text-gray-500" strokeWidth={2} />
                </div>
              ),
              'Tampering of Electrical Circuit Panel': (
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4.5 h-4.5 text-gray-500" strokeWidth={2} />
                </div>
              ),

              // Stock Audit Metrics
              'Total Hours Spent in Stock Audit': (
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4.5 h-4.5 text-gray-500" strokeWidth={2} />
                </div>
              ),
              'Stock Audits Done': (
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <ClipboardCheck className="w-4.5 h-4.5 text-gray-500" strokeWidth={2} />
                </div>
              ),
              'SKUs Moved In': (
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <ArrowDown className="w-4.5 h-4.5 text-gray-500" strokeWidth={2} />
                </div>
              ),
              'SKUs Moved Out': (
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <ArrowUp className="w-4.5 h-4.5 text-gray-500" strokeWidth={2} />
                </div>
              ),
              'Late Night Check-Ins': (
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Moon className="w-4.5 h-4.5 text-gray-500" strokeWidth={2} />
                </div>
              ),
            };

            const isCollapsed = collapsedCategories[category] || false;

            // Bento Layout
            if (layout === "bento") {
              return (
                <div
                  key={category}
                  className={`animate-in fade-in slide-in-from-bottom-4 duration-600 bg-white rounded-xl border border-gray-200 overflow-hidden ${getBentoSpan(category)}`}
                  style={{ animationDelay: `${500 + (index * 80)}ms` }}
                >
                  {/* Category Header */}
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <h3 className="text-gray-900 truncate">{category}</h3>
                        <div className="flex items-center gap-2">
                          <div className={`px-2 py-0.5 rounded text-xs ${categoryCompliance >= 85 ? 'bg-green-100 text-green-800' :
                              categoryCompliance >= 70 ? 'bg-amber-100 text-amber-800' :
                                'bg-red-100 text-red-800'
                            }`}>
                            {categoryCompliance}%
                          </div>
                          {compliantCount > 0 && (
                            <div className="flex items-center gap-1 text-xs text-green-700">
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>{compliantCount}</span>
                            </div>
                          )}
                          {warningCount > 0 && (
                            <div className="flex items-center gap-1 text-xs text-amber-700">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              <span>{warningCount}</span>
                            </div>
                          )}
                          {needsAttentionCount > 0 && (
                            <div className="flex items-center gap-1 text-xs text-red-700">
                              <XCircle className="w-3.5 h-3.5" />
                              <span>{needsAttentionCount}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => setCollapsedCategories(prev => ({
                          ...prev,
                          [category]: !prev[category]
                        }))}
                        className="ml-4 p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        {isCollapsed ? (
                          <ArrowDown className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ArrowUp className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Metrics Table */}
                  {!isCollapsed && (
                    <div className="divide-y divide-gray-100">
                      {categorySops.map((sop) => {
                        const getComplianceColor = (compliance: number) => {
                          if (compliance >= 85) return 'text-green-700';
                          if (compliance >= 70) return 'text-amber-700';
                          return 'text-red-700';
                        };

                        const getComplianceBg = (compliance: number) => {
                          if (compliance >= 85) return 'bg-green-50';
                          if (compliance >= 70) return 'bg-amber-50';
                          return 'bg-red-50';
                        };

                        return (
                          <div
                            key={sop.id}
                            className={`px-6 py-3 transition-colors ${sop.comingSoon ? 'cursor-not-allowed opacity-75' : 'hover:bg-gray-50 cursor-pointer group'}`}
                            onClick={() => !sop.comingSoon && onNavigateToEvidence(category, sop.name)}
                          >
                            <div className="flex items-center gap-3">
                              {sopIcons[sop.name]}
                              <div className="flex-1 min-w-0">
                                <div className={`text-sm truncate transition-colors ${sop.comingSoon ? 'text-gray-500' : 'text-gray-900 group-hover:text-blue-600'}`}>
                                  {sop.name}
                                </div>
                                <div className="text-xs text-gray-500 mt-0.5">
                                  {sop.comingSoon ? (
                                    <span className="italic">Metric under development</span>
                                  ) : (
                                    <>
                                      {sop.compliantEvents}/{sop.totalEvents} events
                                      {sop.violations > 0 && (
                                        <span className="text-red-600 ml-2">• {sop.violations} violations</span>
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-3 flex-shrink-0">
                                {sop.comingSoon ? (
                                  <div className="px-3 py-1 rounded-lg bg-gray-100 border border-gray-200">
                                    <span className="text-xs font-medium text-gray-500">Coming Soon</span>
                                  </div>
                                ) : sop.actualValue ? (
                                  <div className={`px-3 py-1 rounded-lg ${getComplianceBg(sop.compliance)}`}>
                                    <span className={`text-sm ${getComplianceColor(sop.compliance)}`}>{sop.actualValue}</span>
                                  </div>
                                ) : (
                                  <div className={`px-3 py-1 rounded-lg ${getComplianceBg(sop.compliance)}`}>
                                    <span className={`text-sm ${getComplianceColor(sop.compliance)}`}>
                                      {sop.compliance}%
                                    </span>
                                  </div>
                                )}
                                {!sop.comingSoon && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSOPTrendClick(sop);
                                    }}
                                    className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                  >
                                    <TrendingUp className="w-4 h-4 text-gray-500" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            // Cards Layout
            return (
              <div
                key={category}
                className="animate-in fade-in slide-in-from-bottom-4 duration-600"
                style={{ animationDelay: `${500 + (index * 80)}ms` }}
              >
                {/* Category Header - Simple row */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <h3 className="text-gray-900">{category}</h3>
                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-0.5 rounded text-xs ${categoryCompliance >= 85 ? 'bg-green-100 text-green-800' :
                          categoryCompliance >= 70 ? 'bg-amber-100 text-amber-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                        {categoryCompliance}%
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        {compliantCount > 0 && (
                          <>
                            <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                            <span className="text-green-700">{compliantCount}</span>
                          </>
                        )}
                        <span className="text-gray-400">|</span>
                        {warningCount > 0 && (
                          <>
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                            <span className="text-amber-700">{warningCount}</span>
                          </>
                        )}
                        <span className="text-gray-400">|</span>
                        {needsAttentionCount > 0 && (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-red-600" />
                            <span className="text-red-700">{needsAttentionCount}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setCollapsedCategories(prev => ({
                      ...prev,
                      [category]: !prev[category]
                    }))}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {isCollapsed ? (
                      <ArrowDown className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ArrowUp className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                </div>

                {/* Metrics Cards Grid */}
                {!isCollapsed && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categorySops.map((sop) => {
                      const getComplianceColor = (compliance: number) => {
                        if (compliance >= 85) return 'text-green-600';
                        if (compliance >= 70) return 'text-amber-600';
                        return 'text-red-600';
                      };

                      return (
                        <div
                          key={sop.id}
                          className={`p-4 bg-white border border-gray-200 rounded-lg transition-all ${sop.comingSoon ? 'cursor-not-allowed opacity-75' : 'hover:border-gray-300 hover:shadow-sm cursor-pointer group'}`}
                          onClick={() => !sop.comingSoon && onNavigateToEvidence(category, sop.name)}
                        >
                          <div className="flex items-start gap-3">
                            {sopIcons[sop.name]}
                            <div className="flex-1 min-w-0">
                              <div className="text-xs text-gray-700 leading-tight mb-2">
                                {sop.name}
                              </div>
                              {sop.comingSoon ? (
                                <div className="inline-flex px-2 py-0.5 rounded bg-gray-100 border border-gray-200">
                                  <span className="text-xs font-medium text-gray-500">Coming Soon</span>
                                </div>
                              ) : sop.actualValue ? (
                                <div className={`${getComplianceColor(sop.compliance)}`}>
                                  {sop.actualValue}
                                </div>
                              ) : (
                                <div className={`${getComplianceColor(sop.compliance)}`}>
                                  {sop.compliance}%
                                </div>
                              )}
                            </div>
                            {!sop.comingSoon && (
                              <button
                                className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSOPTrendClick(sop);
                                }}
                              >
                                <TrendingUp className="w-4 h-4 text-gray-500" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* SOP Trend Modal */}
      {trendModalOpen && selectedSOPForTrend && (
        <>
          {modalType === 'percentage' && (
            <SOPTrendModal
              isOpen={trendModalOpen}
              onClose={() => setTrendModalOpen(false)}
              sopName={selectedSOPForTrend.name}
              sopCompliance={selectedSOPForTrend.compliance}
            />
          )}

          {modalType === 'count' && selectedSOPForTrend.actualValue && (
            <SOPCountTrendModal
              isOpen={trendModalOpen}
              onClose={() => setTrendModalOpen(false)}
              sopName={selectedSOPForTrend.name}
              currentValue={parseInt(selectedSOPForTrend.actualValue.replace(/[^0-9]/g, ''))}
              unit={selectedSOPForTrend.actualValue.replace(/[0-9]/g, '').trim()}
            />
          )}

          {modalType === 'time' && selectedSOPForTrend.actualValue && (
            <SOPTimeTrendModal
              isOpen={trendModalOpen}
              onClose={() => setTrendModalOpen(false)}
              sopName={selectedSOPForTrend.name}
              currentValue={parseInt(selectedSOPForTrend.actualValue.replace(/[^0-9]/g, ''))}
              unit={selectedSOPForTrend.actualValue.includes('hrs') ? 'hrs' : 'min'}
            />
          )}

          {modalType === 'ratio' && selectedSOPForTrend.actualValue && (
            <SOPRatioTrendModal
              isOpen={trendModalOpen}
              onClose={() => setTrendModalOpen(false)}
              sopName={selectedSOPForTrend.name}
              currentValue={selectedSOPForTrend.actualValue}
            />
          )}
        </>
      )}

      {/* KPI Modal */}
      {trendModalOpen && selectedKPIForTrend && (
        <SOPTrendModal
          isOpen={trendModalOpen}
          onClose={() => setTrendModalOpen(false)}
          sopName={selectedKPIForTrend.name}
          sopCompliance={kpiMockData[selectedKPIForTrend.name].compliance}
        />
      )}
    </div>
  );
}