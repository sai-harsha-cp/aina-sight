import { useState } from "react";
import { 
  MapPin, 
  TrendingUp, 
  TrendingDown, 
  Building2,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ChevronRight
} from "lucide-react";

interface ZonalDashboardViewProps {
  onDrillDownToCluster: (zoneId: string) => void;
}

export function ZonalDashboardView({ onDrillDownToCluster }: ZonalDashboardViewProps) {
  const zones = [
    {
      id: "south",
      name: "South Zone",
      region: "Southern India",
      clusters: 3,
      totalCentres: 12,
      totalBeds: 96,
      avgCompliance: 84,
      sessionsToday: 542,
      avgOccupancy: 78,
      compliantCentres: 8,
      warningCentres: 3,
      attentionCentres: 1,
      totalViolations: 18,
      trend: "up",
      clusterBreakdown: [
        { name: "Hyderabad Cluster", centres: 5, compliance: 82 },
        { name: "Bangalore Cluster", centres: 4, compliance: 88 },
        { name: "Chennai Cluster", centres: 3, compliance: 81 }
      ]
    },
    {
      id: "north",
      name: "North Zone",
      region: "Northern India",
      clusters: 4,
      totalCentres: 15,
      totalBeds: 128,
      avgCompliance: 91,
      sessionsToday: 698,
      avgOccupancy: 85,
      compliantCentres: 13,
      warningCentres: 2,
      attentionCentres: 0,
      totalViolations: 8,
      trend: "up",
      clusterBreakdown: [
        { name: "Delhi NCR Cluster", centres: 6, compliance: 92 },
        { name: "Chandigarh Cluster", centres: 3, compliance: 90 },
        { name: "Jaipur Cluster", centres: 4, compliance: 89 },
        { name: "Lucknow Cluster", centres: 2, compliance: 93 }
      ]
    },
    {
      id: "west",
      name: "West Zone",
      region: "Western India",
      clusters: 3,
      totalCentres: 14,
      totalBeds: 118,
      avgCompliance: 76,
      sessionsToday: 612,
      avgOccupancy: 74,
      compliantCentres: 7,
      warningCentres: 5,
      attentionCentres: 2,
      totalViolations: 28,
      trend: "down",
      clusterBreakdown: [
        { name: "Mumbai Cluster", centres: 6, compliance: 79 },
        { name: "Pune Cluster", centres: 5, compliance: 72 },
        { name: "Ahmedabad Cluster", centres: 3, compliance: 78 }
      ]
    },
    {
      id: "east",
      name: "East Zone",
      region: "Eastern India",
      clusters: 2,
      totalCentres: 9,
      totalBeds: 76,
      avgCompliance: 88,
      sessionsToday: 428,
      avgOccupancy: 81,
      compliantCentres: 7,
      warningCentres: 2,
      attentionCentres: 0,
      totalViolations: 11,
      trend: "up",
      clusterBreakdown: [
        { name: "Kolkata Cluster", centres: 5, compliance: 90 },
        { name: "Bhubaneswar Cluster", centres: 4, compliance: 85 }
      ]
    }
  ];

  const zonalStats = {
    totalZones: zones.length,
    totalClusters: zones.reduce((sum, z) => sum + z.clusters, 0),
    totalCentres: zones.reduce((sum, z) => sum + z.totalCentres, 0),
    totalBeds: zones.reduce((sum, z) => sum + z.totalBeds, 0),
    totalSessionsToday: zones.reduce((sum, z) => sum + z.sessionsToday, 0),
    avgCompliance: Math.round(zones.reduce((sum, z) => sum + z.avgCompliance, 0) / zones.length),
    avgOccupancy: Math.round(zones.reduce((sum, z) => sum + z.avgOccupancy, 0) / zones.length),
    compliantCentres: zones.reduce((sum, z) => sum + z.compliantCentres, 0),
    warningCentres: zones.reduce((sum, z) => sum + z.warningCentres, 0),
    attentionCentres: zones.reduce((sum, z) => sum + z.attentionCentres, 0),
    totalViolations: zones.reduce((sum, z) => sum + z.totalViolations, 0)
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
      {/* Zonal Overview Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-gray-900 mb-1">Zonal Overview</h2>
            <p className="text-sm text-gray-600">
              Managing {zonalStats.totalZones} zones • {zonalStats.totalClusters} clusters • {zonalStats.totalCentres} dialysis centres
            </p>
          </div>
          <div className={`px-3 py-1 rounded-lg ${getComplianceBg(zonalStats.avgCompliance)}`}>
            <span className={`text-sm ${getComplianceColor(zonalStats.avgCompliance)}`}>
              {zonalStats.avgCompliance}% Avg Compliance
            </span>
          </div>
        </div>

        {/* Zonal KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600 mb-1">Total Zones</div>
            <div className="text-gray-900">{zonalStats.totalZones}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600 mb-1">Total Clusters</div>
            <div className="text-gray-900">{zonalStats.totalClusters}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600 mb-1">Total Centres</div>
            <div className="text-gray-900">{zonalStats.totalCentres}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600 mb-1">Sessions Today</div>
            <div className="text-gray-900">{zonalStats.totalSessionsToday}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600 mb-1">Avg Occupancy</div>
            <div className={getComplianceColor(zonalStats.avgOccupancy)}>
              {zonalStats.avgOccupancy}%
            </div>
          </div>
        </div>

        {/* Status Summary */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700">
                <span className="text-green-700">{zonalStats.compliantCentres}</span> {zonalStats.compliantCentres === 1 ? 'Centre' : 'Centres'} Compliant
              </span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span className="text-sm text-gray-700">
                <span className="text-amber-700">{zonalStats.warningCentres}</span> {zonalStats.warningCentres === 1 ? 'Centre' : 'Centres'} Warning
              </span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm text-gray-700">
                <span className="text-red-700">{zonalStats.attentionCentres}</span> {zonalStats.attentionCentres === 1 ? 'Centre' : 'Centres'} Needs Attention
              </span>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-gray-600">Total Violations:</span>
              <span className="text-sm text-red-700">{zonalStats.totalViolations}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Zone Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {zones.map((zone, index) => (
          <div 
            key={zone.id}
            className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer group animate-in fade-in slide-in-from-bottom-4 duration-600"
            style={{ animationDelay: `${index * 80}ms` }}
            onClick={() => onDrillDownToCluster(zone.id)}
          >
            {/* Zone Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                      {zone.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {zone.clusters} clusters • {zone.totalCentres} centres • {zone.totalBeds} beds
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                  <div className={`px-2 py-0.5 rounded text-xs ${
                    zone.avgCompliance >= 85 ? 'bg-green-100 text-green-800' :
                    zone.avgCompliance >= 70 ? 'bg-amber-100 text-amber-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {zone.avgCompliance}%
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </div>
            </div>

            {/* Zone Metrics */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Sessions Today */}
                <div className="space-y-1">
                  <div className="text-xs text-gray-600">Sessions Today</div>
                  <div className="text-gray-900">{zone.sessionsToday}</div>
                </div>

                {/* Occupancy Rate */}
                <div className="space-y-1">
                  <div className="text-xs text-gray-600">Avg Occupancy</div>
                  <div className={`inline-flex px-2 py-0.5 rounded ${getComplianceBg(zone.avgOccupancy)}`}>
                    <span className={`text-sm ${getComplianceColor(zone.avgOccupancy)}`}>
                      {zone.avgOccupancy}%
                    </span>
                  </div>
                </div>

                {/* Violations */}
                <div className="space-y-1">
                  <div className="text-xs text-gray-600">Total Violations</div>
                  <div className={`inline-flex px-2 py-0.5 rounded ${
                    zone.totalViolations === 0 ? 'bg-green-50' :
                    zone.totalViolations <= 10 ? 'bg-amber-50' :
                    'bg-red-50'
                  }`}>
                    <span className={`text-sm ${
                      zone.totalViolations === 0 ? 'text-green-700' :
                      zone.totalViolations <= 10 ? 'text-amber-700' :
                      'text-red-700'
                    }`}>
                      {zone.totalViolations}
                    </span>
                  </div>
                </div>

                {/* Centre Status */}
                <div className="space-y-1">
                  <div className="text-xs text-gray-600">Centre Status</div>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-green-700">{zone.compliantCentres}</span>
                    <span className="text-gray-400">/</span>
                    <span className="text-amber-700">{zone.warningCentres}</span>
                    <span className="text-gray-400">/</span>
                    <span className="text-red-700">{zone.attentionCentres}</span>
                  </div>
                </div>
              </div>

              {/* Cluster Breakdown */}
              <div className="pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-600 mb-2">Cluster Breakdown</div>
                <div className="space-y-2">
                  {zone.clusterBreakdown.map((cluster, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <Building2 className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-700 truncate">{cluster.name}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-gray-500">{cluster.centres} centres</span>
                        <span className={`px-1.5 py-0.5 rounded ${getComplianceBg(cluster.compliance)}`}>
                          <span className={getComplianceColor(cluster.compliance)}>
                            {cluster.compliance}%
                          </span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Zone Footer - Trend */}
            <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs">
                  {zone.trend === "up" ? (
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
                  View Clusters →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}