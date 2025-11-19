import { Card } from "./ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Building2, Camera, Zap, AlertTriangle, Cog, BedDouble, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface UnitEvent {
  id: string;
  type: "machine-moved" | "bed-moved" | "camera-tampered" | "electrical-tampered";
  time: string;
  details: string;
}

// Mock data for dialysis unit events
const getUnitEventsForDate = (date: string): UnitEvent[] => {
  return [
    {
      id: "event-1",
      type: "machine-moved",
      time: "06:30",
      details: "Dialysis Machine #3 repositioned from Bed 5 to Bed 6",
    },
    {
      id: "event-2",
      type: "camera-tampered",
      time: "08:15",
      details: "Camera #2 (Storage Room entrance) angle changed",
    },
    {
      id: "event-3",
      type: "bed-moved",
      time: "09:45",
      details: "Bed #4 moved for cleaning",
    },
    {
      id: "event-4",
      type: "machine-moved",
      time: "11:20",
      details: "Dialysis Machine #1 moved to maintenance area",
    },
    {
      id: "event-5",
      type: "electrical-tampered",
      time: "13:00",
      details: "Electrical duct cover opened near Bed 7",
    },
    {
      id: "event-6",
      type: "bed-moved",
      time: "14:30",
      details: "Bed #2 repositioned",
    },
    {
      id: "event-7",
      type: "camera-tampered",
      time: "16:00",
      details: "Camera #4 (Main entrance) lens obstruction detected",
    },
  ];
};

interface DialysisUnitTimelineProps {
  selectedDate?: string;
}

export function DialysisUnitTimeline({ selectedDate }: DialysisUnitTimelineProps) {
  const events = getUnitEventsForDate(selectedDate || "30");

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

  const getEventIcon = (type: string) => {
    switch (type) {
      case "machine-moved":
        return <Cog className="w-3.5 h-3.5" />;
      case "bed-moved":
        return <BedDouble className="w-3.5 h-3.5" />;
      case "camera-tampered":
        return <Camera className="w-3.5 h-3.5" />;
      case "electrical-tampered":
        return <Zap className="w-3.5 h-3.5" />;
      default:
        return <AlertTriangle className="w-3.5 h-3.5" />;
    }
  };

  const getEventColor = (type: string): string => {
    switch (type) {
      case "machine-moved":
        return "bg-blue-500 border-blue-600";
      case "bed-moved":
        return "bg-green-500 border-green-600";
      case "camera-tampered":
        return "bg-red-500 border-red-600";
      case "electrical-tampered":
        return "bg-amber-500 border-amber-600";
      default:
        return "bg-gray-500 border-gray-600";
    }
  };

  const getEventLabel = (type: string): string => {
    switch (type) {
      case "machine-moved":
        return "Machine Moved";
      case "bed-moved":
        return "Bed Moved";
      case "camera-tampered":
        return "Camera Tampered";
      case "electrical-tampered":
        return "Electrical Duct Tampered";
      default:
        return "Unknown Event";
    }
  };

  const hours = Array.from({ length: totalHours }, (_, i) => startHour + i);

  // Group events by type for counts
  const eventCounts = events.reduce((acc, event) => {
    acc[event.type] = (acc[event.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-6">
          <Card className="p-6 border-gray-200">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 rounded-lg p-2.5">
                <Cog className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Machines Moved</p>
                <p className="text-xl">{eventCounts["machine-moved"] || 0}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 border-gray-200">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 rounded-lg p-2.5">
                <BedDouble className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Beds Moved</p>
                <p className="text-xl">{eventCounts["bed-moved"] || 0}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 border-gray-200">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 rounded-lg p-2.5">
                <Camera className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Camera Tampering</p>
                <p className="text-xl">{eventCounts["camera-tampered"] || 0}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 border-gray-200">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 rounded-lg p-2.5">
                <Zap className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Electrical Tampering</p>
                <p className="text-xl">{eventCounts["electrical-tampered"] || 0}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Timeline Card */}
        {/* Moved to Bed and Machine Level tab */}
      </div>
    </TooltipProvider>
  );
}