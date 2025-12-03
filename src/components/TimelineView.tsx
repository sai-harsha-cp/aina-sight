import { useState, useMemo } from "react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { getBedSessionsForDate, getPatientJourneysForDate, SessionEvent, Violation } from "../data/mockData";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import Frame2 from "../imports/Frame3";
import { PatientJourneyModal } from "./PatientJourneyModal";
import { KPICard } from "./KPICard";
import { Users, Clock, Bed, Activity } from "lucide-react";
import { StorageRoomTimeline } from "./StorageRoomTimeline";
import { DialysisUnitTimeline } from "./DialysisUnitTimeline";

interface TimelineViewProps {
  dateRange: string;
  dateFrom?: Date;
  dateTo?: Date;
  selectedDate?: string;
  onViewEvidence: (violation: Violation) => void;
}

export function TimelineView({ dateRange, dateFrom, dateTo, selectedDate, onViewEvidence }: TimelineViewProps) {
  const [activeTab, setActiveTab] = useState<"bed" | "patient">("bed");
  const [activeSubView, setActiveSubView] = useState<"bed-machine" | "storage-room" | "dialysis-unit">("bed-machine");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBed, setSelectedBed] = useState<string>("");
  const [selectedPatient, setSelectedPatient] = useState<string>("");

  // Get date-specific data
  const bedSessions = useMemo(() => getBedSessionsForDate(selectedDate || "30"), [selectedDate]);
  const patientJourneys = useMemo(() => getPatientJourneysForDate(selectedDate || "30"), [selectedDate]);

  // Calculate stats
  const totalBeds = 8; // Total beds available
  const activeSessions = bedSessions.filter(session => session.compliance > 0).length;
  const bedOccupancy = Math.round((activeSessions / totalBeds) * 100);

  // Calculate average session duration (in hours) using startTime and endTime
  const avgDuration = bedSessions.reduce((acc, session) => {
    const startTime = session.startTime.split(':');
    const endTime = session.endTime.split(':');
    const duration = (parseInt(endTime[0]) * 60 + parseInt(endTime[1])) - (parseInt(startTime[0]) * 60 + parseInt(startTime[1]));
    return acc + duration;
  }, 0) / bedSessions.length;
  const avgDurationHours = (avgDuration / 60).toFixed(1);

  const patientsServed = bedSessions.length;
  const totalSessions = bedSessions.length;

  // Timeline from 5 AM to 5 PM (12 hours)
  const startHour = 5;
  const endHour = 17;
  const totalHours = endHour - startHour;

  const timeToPosition = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = (hours - startHour) * 60 + minutes;
    const totalTimelineMinutes = totalHours * 60;
    return (totalMinutes / totalTimelineMinutes) * 100;
  };

  const getComplianceColor = (compliance: number): string => {
    if (compliance >= 85) return 'bg-green-500';
    if (compliance >= 70) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getEventStatusColor = (status: string): string => {
    switch (status) {
      case 'Compliant':
        return 'bg-green-500';
      case 'Missed':
        return 'bg-red-500';
      case 'Uncertain':
        return 'bg-amber-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handlePillClick = (bedNumber: string, patientId: string) => {
    setSelectedBed(bedNumber);
    setSelectedPatient(patientId);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Sub-view Chip Selector */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveSubView("bed-machine")}
          className={`px-4 py-2 rounded-lg border transition-all text-sm ${activeSubView === "bed-machine"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
        >
          Dialysis Unit Level
        </button>
        <button
          onClick={() => setActiveSubView("storage-room")}
          className={`px-4 py-2 rounded-lg border transition-all text-sm ${activeSubView === "storage-room"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
        >
          Stock Room
        </button>
      </div>

      {/* Dialysis Unit Level View */}
      {activeSubView === "bed-machine" && (
        <Frame2
          selectedDate={selectedDate}
          onPillClick={handlePillClick}
          onEvidenceClick={onViewEvidence}
        />
      )}

      {/* Storage Room View */}
      {activeSubView === "storage-room" && (
        <StorageRoomTimeline selectedDate={selectedDate} />
      )}

      {/* Dialysis Unit View */}
      {activeSubView === "dialysis-unit" && (
        <DialysisUnitTimeline selectedDate={selectedDate} />
      )}

      <PatientJourneyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bedNumber={selectedBed}
        patientId={selectedPatient}
      />
    </div>
  );
}