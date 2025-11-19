import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SOPTimeTrendModalProps {
  isOpen: boolean;
  onClose: () => void;
  sopName: string;
  currentValue: number; // in minutes
  unit: string; // "min" or "hrs"
}

type Timeline = '7days' | '30days' | '90days' | 'all';

const timelineLabels = {
  '7days': 'Last 7 Days',
  '30days': 'Last 30 Days',
  '90days': 'Last 90 Days',
  'all': 'All Time'
};

// Generate mock trend data for time-based metrics
const generateTrendData = (timeline: Timeline, currentValue: number) => {
  let dataPoints: { date: string; value: number }[] = [];
  const variation = Math.max(5, Math.round(currentValue * 0.1)); // 10% variation

  switch (timeline) {
    case '7days':
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const variance = Math.round((Math.random() - 0.5) * variation * 2);
        const value = Math.max(0, currentValue + variance);
        dataPoints.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          value: Math.round(value)
        });
      }
      break;
    
    case '30days':
      for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const variance = Math.round((Math.random() - 0.5) * variation * 2);
        const value = Math.max(0, currentValue + variance);
        dataPoints.push({
          date: i % 5 === 0 ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '',
          value: Math.round(value)
        });
      }
      break;
    
    case '90days':
      for (let i = 89; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const variance = Math.round((Math.random() - 0.5) * variation * 2);
        const value = Math.max(0, currentValue + variance);
        dataPoints.push({
          date: i % 15 === 0 ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '',
          value: Math.round(value)
        });
      }
      break;
    
    case 'all':
      for (let i = 11; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const variance = Math.round((Math.random() - 0.5) * variation * 2);
        const value = Math.max(0, currentValue + variance);
        dataPoints.push({
          date: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
          value: Math.round(value)
        });
      }
      break;
  }

  return dataPoints;
};

export function SOPTimeTrendModal({ isOpen, onClose, sopName, currentValue, unit }: SOPTimeTrendModalProps) {
  const [selectedTimeline, setSelectedTimeline] = useState<Timeline>('7days');

  const trendData = generateTrendData(selectedTimeline, currentValue);

  // Calculate trend statistics
  const avgValue = Math.round(trendData.reduce((acc, d) => acc + d.value, 0) / trendData.length);
  const maxValue = Math.max(...trendData.map(d => d.value));
  const minValue = Math.min(...trendData.map(d => d.value));

  // Determine appropriate Y-axis domain
  const yAxisMax = Math.ceil(maxValue * 1.2);

  // Format time display
  const formatTime = (minutes: number, displayUnit: string) => {
    if (displayUnit === 'hrs') {
      const hours = (minutes / 60).toFixed(1);
      return `${hours} hrs`;
    }
    return `${minutes} min`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-gray-900 mb-1">{sopName}</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Duration Trend Analysis
          </DialogDescription>
        </DialogHeader>

        {/* Timeline Selector */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {Object.keys(timelineLabels).map((timeline) => (
              <button
                key={timeline}
                onClick={() => setSelectedTimeline(timeline as Timeline)}
                className={`px-3 py-1.5 text-sm rounded-lg border-2 transition-all ${
                  selectedTimeline === timeline
                    ? 'bg-[#2563EB] text-white border-[#2563EB]'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                }`}
              >
                {timelineLabels[timeline]}
              </button>
            ))}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm mb-1">Current</p>
            <p className="text-gray-900">{formatTime(currentValue, unit)}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm mb-1">Average</p>
            <p className="text-gray-900">{formatTime(avgValue, unit)}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm mb-1">Range</p>
            <p className="text-gray-900">{formatTime(minValue, unit)} - {formatTime(maxValue, unit)}</p>
          </div>
        </div>

        {/* Line Chart */}
        <div className="mt-6">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                dataKey="date" 
                stroke="#d1d5db" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                domain={[0, yAxisMax]}
                stroke="#d1d5db" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  padding: '12px 16px',
                }}
                labelStyle={{ color: '#374151', fontWeight: 600, marginBottom: '4px' }}
                formatter={(value: number) => [formatTime(value, unit), 'Duration']}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#000000" 
                strokeWidth={2}
                dot={{ fill: '#000000', r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </DialogContent>
    </Dialog>
  );
}