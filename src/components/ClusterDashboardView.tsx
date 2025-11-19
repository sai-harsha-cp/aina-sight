import { useState } from "react";
import { 
  Building2, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ChevronRight,
  ArrowLeft
} from "lucide-react";

interface ClusterDashboardViewProps {
  onDrillDown: (centreId: string) => void;
}

export function ClusterDashboardView({ onDrillDown }: ClusterDashboardViewProps) {
  const centres = [
    {
      id: "kukatpally",
      name: "NephroPlus – Kukatpally",
      location: "Hyderabad",
      beds: 8,
      overallCompliance: 87,
      sessionsToday: 48,
      occupancyRate: 75,
      clinicalCompliance: 85,
      operationalCompliance: 92,
      staffEfficiency: 88,
      securityCompliance: 90,
      stockAuditCompliance: 84,
      violations: 3,
      trend: "up",
      status: "compliant"
    },
    {
      id: "hitech",
      name: "NephroPlus – Hi-Tech City",
      location: "Hyderabad",
      beds: 10,
      overallCompliance: 92,
      sessionsToday: 58,
      occupancyRate: 82,
      clinicalCompliance: 94,
      operationalCompliance: 91,
      staffEfficiency: 93,
      securityCompliance: 89,
      stockAuditCompliance: 92,
      violations: 1,
      trend: "up",
      status: "compliant"
    },
    {
      id: "ameerpet",
      name: "NephroPlus – Ameerpet",
      location: "Hyderabad",
      beds: 6,
      overallCompliance: 76,
      sessionsToday: 34,
      occupancyRate: 71,
      clinicalCompliance: 78,
      operationalCompliance: 82,
      staffEfficiency: 74,
      securityCompliance: 73,
      stockAuditCompliance: 71,
      violations: 7,
      trend: "down",
      status: "warning"
    },
    {
      id: "banjara",
      name: "NephroPlus – Banjara Hills",
      location: "Hyderabad",
      beds: 12,
      overallCompliance: 65,
      sessionsToday: 52,
      occupancyRate: 65,
      clinicalCompliance: 67,
      operationalCompliance: 71,
      staffEfficiency: 62,
      securityCompliance: 68,
      stockAuditCompliance: 58,
      violations: 12,
      trend: "down",
      status: "attention"
    },
    {
      id: "secunderabad",
      name: "NephroPlus – Secunderabad",
      location: "Hyderabad",
      beds: 8,
      overallCompliance: 89,
      sessionsToday: 46,
      occupancyRate: 78,
      clinicalCompliance: 91,
      operationalCompliance: 88,
      staffEfficiency: 87,
      securityCompliance: 90,
      stockAuditCompliance: 89,
      violations: 2,
      trend: "up",
      status: "compliant"
    }
  ];

  const clusterStats = {
    totalCentres: centres.length,
    totalBeds: centres.reduce((sum, c) => sum + c.beds, 0),
    totalSessionsToday: centres.reduce((sum, c) => sum + c.sessionsToday, 0),
    avgCompliance: Math.round(centres.reduce((sum, c) => sum + c.overallCompliance, 0) / centres.length),
    avgOccupancy: Math.round(centres.reduce((sum, c) => sum + c.occupancyRate, 0) / centres.length),
    compliantCentres: centres.filter(c => c.overallCompliance >= 85).length,
    warningCentres: centres.filter(c => c.overallCompliance >= 70 && c.overallCompliance < 85).length,
    attentionCentres: centres.filter(c => c.overallCompliance < 70).length,
    totalViolations: centres.reduce((sum, c) => sum + c.violations, 0)
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "compliant": return "text-green-700";
      case "warning": return "text-amber-700";
      case "attention": return "text-red-700";
      default: return "text-gray-700";
    }
  };

  const getStatusBg = (status: string) => {
    switch(status) {
      case "compliant": return "bg-green-50";
      case "warning": return "bg-amber-50";
      case "attention": return "bg-red-50";
      default: return "bg-gray-50";
    }
  };

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
    <div className="space-y-6">
      {/* Cluster Overview Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-gray-900 mb-1">Cluster Overview</h2>
            <p className="text-sm text-gray-600">Managing {clusterStats.totalCentres} dialysis centres</p>
          </div>
          <div className={`px-3 py-1 rounded-lg ${getComplianceBg(clusterStats.avgCompliance)}`}>
            <span className={`text-sm ${getComplianceColor(clusterStats.avgCompliance)}`}>
              {clusterStats.avgCompliance}% Avg Compliance
            </span>
          </div>
        </div>

        {/* Cluster KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600 mb-1">Total Centres</div>
            <div className="text-gray-900">{clusterStats.totalCentres}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600 mb-1">Total Beds</div>
            <div className="text-gray-900">{clusterStats.totalBeds}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600 mb-1">Sessions Today</div>
            <div className="text-gray-900">{clusterStats.totalSessionsToday}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600 mb-1">Avg Occupancy</div>
            <div className={getComplianceColor(clusterStats.avgOccupancy)}>
              {clusterStats.avgOccupancy}%
            </div>
          </div>
        </div>

        {/* Status Summary */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700">
                <span className="text-green-700">{clusterStats.compliantCentres}</span> {clusterStats.compliantCentres === 1 ? 'Centre' : 'Centres'} Compliant
              </span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span className="text-sm text-gray-700">
                <span className="text-amber-700">{clusterStats.warningCentres}</span> {clusterStats.warningCentres === 1 ? 'Centre' : 'Centres'} Warning
              </span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm text-gray-700">
                <span className="text-red-700">{clusterStats.attentionCentres}</span> {clusterStats.attentionCentres === 1 ? 'Centre' : 'Centres'} Needs Attention
              </span>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-gray-600">Total Violations:</span>
              <span className="text-sm text-red-700">{clusterStats.totalViolations}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Centre Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {centres.map((centre, index) => (
          <div 
            key={centre.id}
            className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer group animate-in fade-in slide-in-from-bottom-4 duration-600"
            style={{ animationDelay: `${index * 80}ms` }}
            onClick={() => onDrillDown(centre.id)}
          >
            {/* Centre Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                      {centre.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {centre.location} • {centre.beds} beds • {centre.sessionsToday} sessions today
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                  <div className={`px-2 py-0.5 rounded text-xs ${
                    centre.overallCompliance >= 85 ? 'bg-green-100 text-green-800' :
                    centre.overallCompliance >= 70 ? 'bg-amber-100 text-amber-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {centre.overallCompliance}%
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </div>
            </div>

            {/* Centre Metrics */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {/* Clinical Compliance */}
                <div className="space-y-1">
                  <div className="text-xs text-gray-600">Clinical Compliance</div>
                  <div className={`inline-flex px-2 py-0.5 rounded ${getComplianceBg(centre.clinicalCompliance)}`}>
                    <span className={`text-sm ${getComplianceColor(centre.clinicalCompliance)}`}>
                      {centre.clinicalCompliance}%
                    </span>
                  </div>
                </div>

                {/* Operational Performance */}
                <div className="space-y-1">
                  <div className="text-xs text-gray-600">Operational</div>
                  <div className={`inline-flex px-2 py-0.5 rounded ${getComplianceBg(centre.operationalCompliance)}`}>
                    <span className={`text-sm ${getComplianceColor(centre.operationalCompliance)}`}>
                      {centre.operationalCompliance}%
                    </span>
                  </div>
                </div>

                {/* Staff Efficiency */}
                <div className="space-y-1">
                  <div className="text-xs text-gray-600">Staff Efficiency</div>
                  <div className={`inline-flex px-2 py-0.5 rounded ${getComplianceBg(centre.staffEfficiency)}`}>
                    <span className={`text-sm ${getComplianceColor(centre.staffEfficiency)}`}>
                      {centre.staffEfficiency}%
                    </span>
                  </div>
                </div>

                {/* Security & Vigilance */}
                <div className="space-y-1">
                  <div className="text-xs text-gray-600">Security</div>
                  <div className={`inline-flex px-2 py-0.5 rounded ${getComplianceBg(centre.securityCompliance)}`}>
                    <span className={`text-sm ${getComplianceColor(centre.securityCompliance)}`}>
                      {centre.securityCompliance}%
                    </span>
                  </div>
                </div>

                {/* Occupancy Rate */}
                <div className="space-y-1">
                  <div className="text-xs text-gray-600">Occupancy Rate</div>
                  <div className={`inline-flex px-2 py-0.5 rounded ${getComplianceBg(centre.occupancyRate)}`}>
                    <span className={`text-sm ${getComplianceColor(centre.occupancyRate)}`}>
                      {centre.occupancyRate}%
                    </span>
                  </div>
                </div>

                {/* Violations */}
                <div className="space-y-1">
                  <div className="text-xs text-gray-600">Violations</div>
                  <div className={`inline-flex px-2 py-0.5 rounded ${
                    centre.violations === 0 ? 'bg-green-50' :
                    centre.violations <= 3 ? 'bg-amber-50' :
                    'bg-red-50'
                  }`}>
                    <span className={`text-sm ${
                      centre.violations === 0 ? 'text-green-700' :
                      centre.violations <= 3 ? 'text-amber-700' :
                      'text-red-700'
                    }`}>
                      {centre.violations}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Centre Footer - Trend */}
            <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs">
                  {centre.trend === "up" ? (
                    <>
                      <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-green-700">Improving</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="w-3.5 h-3.5 text-red-600" />
                      <span className="text-red-700">Declining</span>
                    </>
                  )}
                </div>
                <span className="text-xs text-gray-500 group-hover:text-blue-600 transition-colors">
                  View Details →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}