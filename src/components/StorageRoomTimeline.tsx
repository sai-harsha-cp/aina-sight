import { Card } from "./ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { User, LogIn, LogOut, Users } from "lucide-react";

interface StorageActivity {
  type: "stock-in" | "stock-out" | "idle";
  startTime: string;
  endTime: string;
}

interface PersonEntry {
  id: string;
  personLabel: string; // "Person 1", "Person 2", etc.
  entryTime: string;
  exitTime: string;
  staffName?: string; // Optional staff name for tooltip
  activities: StorageActivity[];
}

// Helper function to convert time string to minutes since start of day
const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

// Helper function to check if two time ranges overlap
const hasOverlap = (entry1: PersonEntry, entry2: PersonEntry): boolean => {
  const start1 = timeToMinutes(entry1.entryTime);
  const end1 = timeToMinutes(entry1.exitTime);
  const start2 = timeToMinutes(entry2.entryTime);
  const end2 = timeToMinutes(entry2.exitTime);
  
  return start1 < end2 && start2 < end1;
};

// Mock data for storage room person entries with overlaps and activities
const getPersonEntriesForDate = (date: string): PersonEntry[] => {
  return [
    {
      id: "entry-1",
      personLabel: "Person 1",
      entryTime: "06:15",
      exitTime: "07:00",
      staffName: "Nurse Priya",
      activities: [
        { type: "stock-in", startTime: "06:15", endTime: "06:35" },
        { type: "idle", startTime: "06:35", endTime: "06:40" },
        { type: "stock-out", startTime: "06:40", endTime: "07:00" },
      ],
    },
    {
      id: "entry-2",
      personLabel: "Person 2",
      entryTime: "06:45",
      exitTime: "07:20",
      staffName: "Tech Rajesh",
      activities: [
        { type: "stock-out", startTime: "06:45", endTime: "07:20" },
      ],
    },
    {
      id: "entry-3",
      personLabel: "Person 1",
      entryTime: "08:20",
      exitTime: "08:50",
      staffName: "Nurse Anjali",
      activities: [
        { type: "stock-in", startTime: "08:20", endTime: "08:50" },
      ],
    },
    {
      id: "entry-4",
      personLabel: "Person 2",
      entryTime: "08:30",
      exitTime: "09:00",
      staffName: "Tech Kumar",
      activities: [
        { type: "stock-in", startTime: "08:30", endTime: "08:45" },
        { type: "stock-out", startTime: "08:45", endTime: "09:00" },
      ],
    },
    {
      id: "entry-5",
      personLabel: "Person 3",
      entryTime: "08:40",
      exitTime: "09:10",
      staffName: "Dr. Sharma",
      activities: [
        { type: "idle", startTime: "08:40", endTime: "08:50" },
        { type: "stock-in", startTime: "08:50", endTime: "09:10" },
      ],
    },
    {
      id: "entry-6",
      personLabel: "Person 1",
      entryTime: "10:00",
      exitTime: "10:30",
      staffName: "Nurse Meera",
      activities: [
        { type: "stock-out", startTime: "10:00", endTime: "10:30" },
      ],
    },
    {
      id: "entry-7",
      personLabel: "Person 1",
      entryTime: "12:30",
      exitTime: "13:00",
      staffName: "Tech Amit",
      activities: [
        { type: "stock-in", startTime: "12:30", endTime: "12:50" },
        { type: "idle", startTime: "12:50", endTime: "13:00" },
      ],
    },
    {
      id: "entry-8",
      personLabel: "Person 2",
      entryTime: "12:45",
      exitTime: "13:20",
      staffName: "Nurse Kavita",
      activities: [
        { type: "stock-out", startTime: "12:45", endTime: "13:05" },
        { type: "stock-in", startTime: "13:05", endTime: "13:20" },
      ],
    },
    {
      id: "entry-9",
      personLabel: "Person 1",
      entryTime: "15:00",
      exitTime: "15:40",
      staffName: "Tech Sunil",
      activities: [
        { type: "stock-in", startTime: "15:00", endTime: "15:20" },
        { type: "stock-out", startTime: "15:20", endTime: "15:40" },
      ],
    },
  ];
};

interface StorageRoomTimelineProps {
  selectedDate?: string;
}

export function StorageRoomTimeline({ selectedDate }: StorageRoomTimelineProps) {
  const entries = getPersonEntriesForDate(selectedDate || "30");

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

  const getActivityColor = (type: string): string => {
    switch (type) {
      case "stock-in":
        return "bg-green-500";
      case "stock-out":
        return "bg-blue-500";
      case "idle":
        return "bg-gray-300";
      default:
        return "bg-gray-300";
    }
  };

  const getActivityLabel = (type: string): string => {
    switch (type) {
      case "stock-in":
        return "Material In";
      case "stock-out":
        return "Material Out";
      case "idle":
        return "Idle";
      default:
        return "Unknown";
    }
  };

  // Calculate max concurrent people
  const calculateMaxConcurrent = (): number => {
    const timePoints: { time: number; delta: number }[] = [];
    
    entries.forEach(entry => {
      timePoints.push({ time: timeToMinutes(entry.entryTime), delta: 1 });
      timePoints.push({ time: timeToMinutes(entry.exitTime), delta: -1 });
    });
    
    timePoints.sort((a, b) => a.time - b.time);
    
    let current = 0;
    let max = 0;
    
    timePoints.forEach(point => {
      current += point.delta;
      max = Math.max(max, current);
    });
    
    return max;
  };

  // Assign entries to rows based on overlaps
  const assignToRows = (): { row: number; entry: PersonEntry }[] => {
    const sortedEntries = [...entries].sort((a, b) => 
      timeToMinutes(a.entryTime) - timeToMinutes(b.entryTime)
    );
    
    const rows: PersonEntry[][] = [];
    
    sortedEntries.forEach(entry => {
      let assigned = false;
      
      // Try to find a row where this entry doesn't overlap
      for (let i = 0; i < rows.length; i++) {
        const hasConflict = rows[i].some(existingEntry => hasOverlap(entry, existingEntry));
        
        if (!hasConflict) {
          rows[i].push(entry);
          assigned = true;
          break;
        }
      }
      
      // If no suitable row found, create a new row
      if (!assigned) {
        rows.push([entry]);
      }
    });
    
    // Flatten rows with row index
    const result: { row: number; entry: PersonEntry }[] = [];
    rows.forEach((row, rowIndex) => {
      row.forEach(entry => {
        result.push({ row: rowIndex, entry });
      });
    });
    
    return result;
  };

  const rowAssignments = assignToRows();
  const maxRows = Math.max(...rowAssignments.map(r => r.row)) + 1;

  // Calculate average duration
  const avgDuration = entries.reduce((acc, entry) => {
    const duration = timeToMinutes(entry.exitTime) - timeToMinutes(entry.entryTime);
    return acc + duration;
  }, 0) / entries.length;

  const maxConcurrent = calculateMaxConcurrent();

  // Count activities
  const stockInCount = entries.reduce(
    (acc, entry) => acc + entry.activities.filter((a) => a.type === "stock-in").length,
    0
  );
  const stockOutCount = entries.reduce(
    (acc, entry) => acc + entry.activities.filter((a) => a.type === "stock-out").length,
    0
  );

  const hours = Array.from({ length: totalHours }, (_, i) => startHour + i);

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-6">
          <Card className="p-6 border-gray-200">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 rounded-lg p-2.5">
                <LogIn className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Entries</p>
                <p className="text-xl">{entries.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 border-gray-200">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 rounded-lg p-2.5">
                <Users className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Material In Events</p>
                <p className="text-xl">{stockInCount}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 border-gray-200">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 rounded-lg p-2.5">
                <User className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Material Out Events</p>
                <p className="text-xl">{stockOutCount}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 border-gray-200">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 rounded-lg p-2.5">
                <LogOut className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg. Duration</p>
                <p className="text-xl">{Math.round(avgDuration)} min</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Timeline Card */}
        <Card className="p-6 border-gray-200">
          <div className="space-y-4">
            {/* Time ruler */}
            <div className="flex items-start">
              <div className="w-24 shrink-0"></div>
              <div className="flex-1 relative">
                <div className="flex justify-between text-xs text-gray-500">
                  {hours.map((hour) => (
                    <span key={hour} className="text-center" style={{ width: `${100 / totalHours}%` }}>
                      {hour.toString().padStart(2, "0")}:00
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 text-xs text-gray-600 pb-2 border-b border-gray-200">
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 bg-green-500 rounded"></span>
                Material In
              </span>
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 bg-blue-500 rounded"></span>
                Material Out
              </span>
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 bg-gray-300 rounded"></span>
                Idle
              </span>
            </div>

            {/* Storage Room Rows - Dynamic based on max concurrent */}
            <div className="space-y-2">
              {Array.from({ length: maxRows }).map((_, rowIndex) => {
                const rowEntries = rowAssignments.filter(ra => ra.row === rowIndex);
                
                return (
                  <div key={rowIndex} className="flex items-center">
                    <div className="w-24 shrink-0">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">Person {rowIndex + 1}</span>
                      </div>
                    </div>
                    <div className="flex-1 relative h-12 border-l border-gray-200">
                      {/* Time grid lines */}
                      {hours.slice(1).map((hour, index) => (
                        <div
                          key={hour}
                          className="absolute top-0 bottom-0 border-l border-gray-100"
                          style={{ left: `${((index + 1) / totalHours) * 100}%` }}
                        />
                      ))}

                      {/* Entry pills */}
                      {rowEntries.map(({ entry }) => {
                        const startPos = timeToPosition(entry.entryTime);
                        const endPos = timeToPosition(entry.exitTime);
                        const width = endPos - startPos;

                        return (
                          <Tooltip key={entry.id}>
                            <TooltipTrigger asChild>
                              <div
                                className="absolute top-1 h-10 rounded-lg cursor-pointer border-2 border-gray-400 bg-gray-50 overflow-hidden hover:shadow-lg transition-shadow"
                                style={{
                                  left: `${startPos}%`,
                                  width: `${width}%`,
                                }}
                              >
                                {/* Activity segments inside pill */}
                                <div className="flex h-full">
                                  {entry.activities.map((activity, idx) => {
                                    const actStartPos = timeToPosition(activity.startTime);
                                    const actEndPos = timeToPosition(activity.endTime);
                                    const actWidth = ((actEndPos - actStartPos) / width) * 100;
                                    
                                    return (
                                      <div
                                        key={idx}
                                        className={`h-full ${getActivityColor(activity.type)}`}
                                        style={{ width: `${actWidth}%` }}
                                      />
                                    );
                                  })}
                                </div>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <div className="space-y-2">
                                <p className="font-medium">{entry.staffName}</p>
                                <p className="text-sm">
                                  Entry: {entry.entryTime} | Exit: {entry.exitTime}
                                </p>
                                <div className="text-sm space-y-1">
                                  <p className="font-medium">Activities:</p>
                                  {entry.activities.map((activity, idx) => (
                                    <p key={idx} className="text-xs text-gray-300">
                                      • {getActivityLabel(activity.type)}: {activity.startTime} - {activity.endTime}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Events Table */}
        <Card className="p-6 border-gray-200">
          <h3 className="text-base mb-4">Storage Room Entry Log</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff Name</TableHead>
                <TableHead>Entry Time</TableHead>
                <TableHead>Exit Time</TableHead>
                <TableHead>Duration (min)</TableHead>
                <TableHead>Activities</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => {
                const duration = timeToMinutes(entry.exitTime) - timeToMinutes(entry.entryTime);
                return (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">{entry.staffName}</TableCell>
                    <TableCell>{entry.entryTime}</TableCell>
                    <TableCell>{entry.exitTime}</TableCell>
                    <TableCell>{duration}</TableCell>
                    <TableCell>
                      <div className="flex gap-1.5">
                        {entry.activities.map((activity, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-0.5 rounded text-xs text-white ${
                              activity.type === 'stock-in'
                                ? 'bg-green-500'
                                : activity.type === 'stock-out'
                                ? 'bg-blue-500'
                                : 'bg-gray-300 text-gray-700'
                            }`}
                          >
                            {getActivityLabel(activity.type)}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </div>
    </TooltipProvider>
  );
}