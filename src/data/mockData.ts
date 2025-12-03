// Mock data for NephroPlus Centre Intelligence Console

export interface SOP {
  id: string;
  name: string;
  category: string;
  compliance: number;
  totalEvents: number;
  compliantEvents: number;
  violations: number;
  actualValue?: string; // For SOPs without % - stores the numeric value with unit (e.g., "48", "240 min", "1:4")
  comingSoon?: boolean;
  expected?: number;
  detected?: number;
  trend?: number[];
  hourlyData?: { hour: string; compliance: number; expected: number; detected: number }[];
}

export interface Violation {
  id: string;
  timestamp: string;
  bed: string;
  sop: string;
  category: string;
  status: 'Missed' | 'Violation' | 'Uncertain';
  patientId?: string;
  thumbnail?: string;
}

export interface BedSession {
  bedId: string;
  patientId: string;
  startTime: string;
  endTime: string;
  compliance: number;
  events: SessionEvent[];
}

export interface SessionEvent {
  id: string;
  sopId: string;
  sopName: string;
  timestamp: string;
  status: 'Compliant' | 'Missed' | 'Uncertain' | 'Violation';
  icon: string;
  aiConfidence?: number;
}

export interface PatientJourney {
  patientId: string;
  bedId: string;
  entryTime: string;
  dialysisStart: string;
  dialysisEnd: string;
  exitTime: string;
  compliance: number;
  events: SessionEvent[];
}

export const sopCategories = [
  'Clinical Care Quality Metrics',
  'Security & Vigilance Metrics',
  'Stock Audit Metrics',
  'Operational Performance Metrics',
  'Staff Efficiency Metrics'
];

export const sops: SOP[] = [
  // Operational Performance Metrics (6 SOPs)
  { id: 'SOP001', name: 'Total Number of Completed Dialysis Sessions', category: 'Operational Performance Metrics', compliance: 100, totalEvents: 48, compliantEvents: 48, violations: 0, actualValue: '48' },
  { id: 'SOP002', name: 'Occupancy Rate (% of sessions conducted vs. total possible sessions)', category: 'Operational Performance Metrics', compliance: 85, totalEvents: 72, compliantEvents: 61, violations: 11 },
  { id: 'SOP003', name: 'Average Dialysis Session Duration', category: 'Operational Performance Metrics', compliance: 92, totalEvents: 48, compliantEvents: 44, violations: 4, actualValue: '242 min' },
  { id: 'SOP004', name: 'Average Duration the Patient Spends in the Center', category: 'Operational Performance Metrics', compliance: 88, totalEvents: 48, compliantEvents: 42, violations: 6, actualValue: '285 min' },
  { id: 'SOP005', name: 'Average Staff-to-Patient Ratio', category: 'Operational Performance Metrics', compliance: 95, totalEvents: 48, compliantEvents: 46, violations: 2, actualValue: '1:4.2' },
  { id: 'SOP006', name: 'SOP Violations', category: 'Operational Performance Metrics', compliance: 83, totalEvents: 214, compliantEvents: 178, violations: 36, actualValue: '36' },

  // Clinical Care Quality Metrics (12 SOPs)
  { id: 'SOP007', name: 'Overall Clinical Compliance %', category: 'Clinical Care Quality Metrics', compliance: 82, totalEvents: 214, compliantEvents: 175, violations: 39 },
  { id: 'SOP008', name: 'Hand Hygiene Compliance %', category: 'Clinical Care Quality Metrics', compliance: 85, totalEvents: 84, compliantEvents: 71, violations: 13 },
  { id: 'SOP009', name: 'Patient on Cleaned Bed Compliance %', category: 'Clinical Care Quality Metrics', compliance: 76, totalEvents: 40, compliantEvents: 30, violations: 10 },
  { id: 'SOP010', name: 'Dialysis Machine Rinsing Compliance %', category: 'Clinical Care Quality Metrics', compliance: 88, totalEvents: 40, compliantEvents: 35, violations: 5 },
  { id: 'SOP011', name: 'Dialysis Machine Hot Disinfection Compliance %', category: 'Clinical Care Quality Metrics', compliance: 92, totalEvents: 40, compliantEvents: 37, violations: 3 },
  { id: 'SOP012', name: 'BP Monitoring Frequency Compliance %', category: 'Clinical Care Quality Metrics', compliance: 91, totalEvents: 160, compliantEvents: 146, violations: 14 },
  { id: 'SOP013', name: 'Unique Blood Spillages Identified', category: 'Clinical Care Quality Metrics', compliance: 100, totalEvents: 3, compliantEvents: 3, violations: 0, actualValue: '3', comingSoon: true },
  { id: 'SOP014', name: 'Number of Unique Dialysis Machine Alerts', category: 'Clinical Care Quality Metrics', compliance: 100, totalEvents: 12, compliantEvents: 12, violations: 0, actualValue: '12', comingSoon: true },
  { id: 'SOP015', name: 'Average Alert Resolution Time', category: 'Clinical Care Quality Metrics', compliance: 87, totalEvents: 12, compliantEvents: 10, violations: 2, actualValue: '8.5 min', comingSoon: true },
  { id: 'SOP016', name: 'AVF Access – % & Count', category: 'Clinical Care Quality Metrics', compliance: 70, totalEvents: 40, compliantEvents: 28, violations: 12, actualValue: '70% (28)', comingSoon: true },
  { id: 'SOP017', name: 'CVC Access – % & Count', category: 'Clinical Care Quality Metrics', compliance: 30, totalEvents: 40, compliantEvents: 12, violations: 28, actualValue: '30% (12)', comingSoon: true },
  { id: 'SOP018', name: 'Pre & Post Dialysis Weight Measurement Compliance %', category: 'Clinical Care Quality Metrics', compliance: 87, totalEvents: 80, compliantEvents: 70, violations: 10 },

  // Staff Efficiency Metrics (3 SOPs)
  { id: 'SOP028', name: 'Avg. Nurse Work Distribution', category: 'Staff Efficiency Metrics', compliance: 85, totalEvents: 144, compliantEvents: 122, violations: 22, actualValue: '6.2 beds' },
  { id: 'SOP029', name: 'Avg. Maintenance Personnel Work Distribution', category: 'Staff Efficiency Metrics', compliance: 78, totalEvents: 96, compliantEvents: 75, violations: 21, actualValue: '8 beds' },
  { id: 'SOP030', name: 'Avg. Duration of Staff on Mobile per Day', category: 'Staff Efficiency Metrics', compliance: 72, totalEvents: 240, compliantEvents: 173, violations: 67, actualValue: '45 min' },

  // Security & Vigilance Metrics (4 SOPs)
  { id: 'SOP024', name: 'Cameras Uptime %', category: 'Security & Vigilance Metrics', compliance: 96, totalEvents: 144, compliantEvents: 138, violations: 6 },
  { id: 'SOP025', name: 'Tampering of Cameras', category: 'Security & Vigilance Metrics', compliance: 100, totalEvents: 0, compliantEvents: 0, violations: 0, actualValue: '0' },
  { id: 'SOP026', name: 'Large Equipment Moved', category: 'Security & Vigilance Metrics', compliance: 100, totalEvents: 2, compliantEvents: 2, violations: 0, actualValue: '2' },
  { id: 'SOP027', name: 'Tampering of Electrical Circuit Panel', category: 'Security & Vigilance Metrics', compliance: 100, totalEvents: 0, compliantEvents: 0, violations: 0, actualValue: '0' },

  // Stock Audit Metrics (5 SOPs)
  { id: 'SOP019', name: 'Total Hours Spent in Stock Audit', category: 'Stock Audit Metrics', compliance: 95, totalEvents: 24, compliantEvents: 23, violations: 1, actualValue: '23 hrs' },
  { id: 'SOP020', name: 'Stock Audits Done', category: 'Stock Audit Metrics', compliance: 100, totalEvents: 12, compliantEvents: 12, violations: 0, actualValue: '12' },
  { id: 'SOP021', name: 'SKUs Moved In', category: 'Stock Audit Metrics', compliance: 98, totalEvents: 45, compliantEvents: 44, violations: 1, actualValue: '45' },
  { id: 'SOP022', name: 'SKUs Moved Out', category: 'Stock Audit Metrics', compliance: 97, totalEvents: 38, compliantEvents: 37, violations: 1, actualValue: '38' },
  { id: 'SOP023', name: 'Late Night Check-Ins', category: 'Stock Audit Metrics', compliance: 100, totalEvents: 3, compliantEvents: 3, violations: 0, actualValue: '3' },
];

export const violations: Violation[] = [
  // Clinical Care Quality Metrics - Hand Hygiene Compliance %
  { id: 'V001', timestamp: '10:45 AM', bed: 'Bed 4', sop: 'Hand Hygiene Compliance %', category: 'Clinical Care Quality Metrics', status: 'Missed', patientId: 'Guest-104', thumbnail: 'https://images.unsplash.com/photo-1758653500328-1c4474a8adfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGhhbmQlMjB3YXNoaW5nfGVufDF8fHx8MTc2Mjc1Njg0Mnww&ixlib=rb-4.1.0&q=80&w=400' },
  { id: 'V002', timestamp: '7:15 AM', bed: 'Bed 3', sop: 'Hand Hygiene Compliance %', category: 'Clinical Care Quality Metrics', status: 'Violation', patientId: 'Guest-103', thumbnail: 'https://images.unsplash.com/photo-1758653500328-1c4474a8adfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGhhbmQlMjB3YXNoaW5nfGVufDF8fHx8MTc2Mjc1Njg0Mnww&ixlib=rb-4.1.0&q=80&w=400' },
  { id: 'V003', timestamp: '2:30 PM', bed: 'Bed 2', sop: 'Hand Hygiene Compliance %', category: 'Clinical Care Quality Metrics', status: 'Uncertain', patientId: 'Guest-102', thumbnail: 'https://images.unsplash.com/photo-1758653500328-1c4474a8adfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGhhbmQlMjB3YXNoaW5nfGVufDF8fHx8MTc2Mjc1Njg0Mnww&ixlib=rb-4.1.0&q=80&w=400' },

  // Clinical Care Quality Metrics - Patient on Cleaned Bed Compliance %
  { id: 'V004', timestamp: '8:30 AM', bed: 'Bed 1', sop: 'Patient on Cleaned Bed Compliance %', category: 'Clinical Care Quality Metrics', status: 'Missed', patientId: 'Guest-101', thumbnail: 'https://images.unsplash.com/photo-1676286168358-9b4ce60384d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGJlZCUyMGNsZWFuaW5nfGVufDF8fHx8MTc2Mjc1Njg0M3ww&ixlib=rb-4.1.0&q=80&w=400' },
  { id: 'V005', timestamp: '11:20 AM', bed: 'Bed 5', sop: 'Patient on Cleaned Bed Compliance %', category: 'Clinical Care Quality Metrics', status: 'Violation', patientId: 'Guest-105', thumbnail: 'https://images.unsplash.com/photo-1676286168358-9b4ce60384d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGJlZCUyMGNsZWFuaW5nfGVufDF8fHx8MTc2Mjc1Njg0M3ww&ixlib=rb-4.1.0&q=80&w=400' },
  { id: 'V006', timestamp: '3:10 PM', bed: 'Bed 6', sop: 'Patient on Cleaned Bed Compliance %', category: 'Clinical Care Quality Metrics', status: 'Uncertain', patientId: 'Guest-106', thumbnail: 'https://images.unsplash.com/photo-1676286168358-9b4ce60384d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGJlZCUyMGNsZWFuaW5nfGVufDF8fHx8MTc2Mjc1Njg0M3ww&ixlib=rb-4.1.0&q=80&w=400' },

  // Clinical Care Quality Metrics - Dialysis Machine Rinsing Compliance %
  { id: 'V007', timestamp: '7:45 AM', bed: 'Bed 8', sop: 'Dialysis Machine Rinsing Compliance %', category: 'Clinical Care Quality Metrics', status: 'Missed', patientId: 'Guest-108', thumbnail: 'https://images.unsplash.com/photo-1630128295920-627fb9aff5a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFseXNpcyUyMG1hY2hpbmV8ZW58MXx8fHwxNzYyNzU2ODQyfDA&ixlib=rb-4.1.0&q=80&w=400' },
  { id: 'V008', timestamp: '1:20 PM', bed: 'Bed 3', sop: 'Dialysis Machine Rinsing Compliance %', category: 'Clinical Care Quality Metrics', status: 'Violation', patientId: 'Guest-103', thumbnail: 'https://images.unsplash.com/photo-1630128295920-627fb9aff5a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFseXNpcyUyMG1hY2hpbmV8ZW58MXx8fHwxNzYyNzU2ODQyfDA&ixlib=rb-4.1.0&q=80&w=400' },

  // Clinical Care Quality Metrics - Dialysis Machine Hot Disinfection Compliance %
  { id: 'V009', timestamp: '9:30 AM', bed: 'Bed 7', sop: 'Dialysis Machine Hot Disinfection Compliance %', category: 'Clinical Care Quality Metrics', status: 'Uncertain', patientId: 'Guest-107', thumbnail: 'https://images.unsplash.com/photo-1630128295920-627fb9aff5a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFseXNpcyUyMG1hY2hpbmV8ZW58MXx8fHwxNzYyNzU2ODQyfDA&ixlib=rb-4.1.0&q=80&w=400' },
  { id: 'V010', timestamp: '4:15 PM', bed: 'Bed 2', sop: 'Dialysis Machine Hot Disinfection Compliance %', category: 'Clinical Care Quality Metrics', status: 'Missed', patientId: 'Guest-102', thumbnail: 'https://images.unsplash.com/photo-1630128295920-627fb9aff5a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFseXNpcyUyMG1hY2hpbmV8ZW58MXx8fHwxNzYyNzU2ODQyfDA&ixlib=rb-4.1.0&q=80&w=400' },

  // Clinical Care Quality Metrics - BP Monitoring Frequency Compliance %
  { id: 'V011', timestamp: '10:05 AM', bed: 'Bed 2', sop: 'BP Monitoring Frequency Compliance %', category: 'Clinical Care Quality Metrics', status: 'Missed', patientId: 'Guest-102', thumbnail: 'https://images.unsplash.com/photo-1630128295920-627fb9aff5a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFseXNpcyUyMG1hY2hpbmV8ZW58MXx8fHwxNzYyNzU2ODQyfDA&ixlib=rb-4.1.0&q=80&w=400' },
  { id: 'V012', timestamp: '2:25 PM', bed: 'Bed 1', sop: 'BP Monitoring Frequency Compliance %', category: 'Clinical Care Quality Metrics', status: 'Violation', patientId: 'Guest-101', thumbnail: 'https://images.unsplash.com/photo-1630128295920-627fb9aff5a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFseXNpcyUyMG1hY2hpbmV8ZW58MXx8fHwxNzYyNzU2ODQyfDA&ixlib=rb-4.1.0&q=80&w=400' },

  // Clinical Care Quality Metrics - Pre & Post Dialysis Weight Measurement Compliance %
  { id: 'V013', timestamp: '8:15 AM', bed: 'Bed 4', sop: 'Pre & Post Dialysis Weight Measurement Compliance %', category: 'Clinical Care Quality Metrics', status: 'Missed', patientId: 'Guest-104', thumbnail: 'https://images.unsplash.com/photo-1630128295920-627fb9aff5a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFseXNpcyUyMG1hY2hpbmV8ZW58MXx8fHwxNzYyNzU2ODQyfDA&ixlib=rb-4.1.0&q=80&w=400' },
  { id: 'V014', timestamp: '12:45 PM', bed: 'Bed 6', sop: 'Pre & Post Dialysis Weight Measurement Compliance %', category: 'Clinical Care Quality Metrics', status: 'Uncertain', patientId: 'Guest-106', thumbnail: 'https://images.unsplash.com/photo-1630128295920-627fb9aff5a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFseXNpcyUyMG1hY2hpbmV8ZW58MXx8fHwxNzYyNzU2ODQyfDA&ixlib=rb-4.1.0&q=80&w=400' },

  // Operational Performance Metrics - Total Number of Completed Dialysis Sessions
  { id: 'V015', timestamp: '9:00 AM', bed: 'Bed 1', sop: 'Total Number of Completed Dialysis Sessions', category: 'Operational Performance Metrics', status: 'Violation', patientId: 'Guest-101' },
  { id: 'V016', timestamp: '3:30 PM', bed: 'Bed 5', sop: 'Total Number of Completed Dialysis Sessions', category: 'Operational Performance Metrics', status: 'Missed', patientId: 'Guest-105' },

  // Operational Performance Metrics - Occupancy Rate
  { id: 'V017', timestamp: '7:00 AM', bed: 'Bed 3', sop: 'Occupancy Rate (% of sessions conducted vs. total possible sessions)', category: 'Operational Performance Metrics', status: 'Uncertain', patientId: 'Guest-103' },
  { id: 'V018', timestamp: '1:45 PM', bed: 'Bed 7', sop: 'Occupancy Rate (% of sessions conducted vs. total possible sessions)', category: 'Operational Performance Metrics', status: 'Missed', patientId: 'Guest-107' },

  // Operational Performance Metrics - Average Dialysis Session Duration
  { id: 'V019', timestamp: '11:30 AM', bed: 'Bed 2', sop: 'Average Dialysis Session Duration', category: 'Operational Performance Metrics', status: 'Violation', patientId: 'Guest-102', thumbnail: 'https://images.unsplash.com/photo-1630128295920-627fb9aff5a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFseXNpcyUyMG1hY2hpbmV8ZW58MXx8fHwxNzYyNzU2ODQyfDA&ixlib=rb-4.1.0&q=80&w=400' },
  { id: 'V020', timestamp: '4:20 PM', bed: 'Bed 8', sop: 'Average Dialysis Session Duration', category: 'Operational Performance Metrics', status: 'Missed', patientId: 'Guest-108' },

  // Operational Performance Metrics - Average Duration the Patient Spends in the Center
  { id: 'V021', timestamp: '10:15 AM', bed: 'Bed 4', sop: 'Average Duration the Patient Spends in the Center', category: 'Operational Performance Metrics', status: 'Uncertain', patientId: 'Guest-104' },
  { id: 'V022', timestamp: '2:50 PM', bed: 'Bed 6', sop: 'Average Duration the Patient Spends in the Center', category: 'Operational Performance Metrics', status: 'Violation', patientId: 'Guest-106' },

  // Operational Performance Metrics - Average Staff-to-Patient Ratio
  { id: 'V023', timestamp: '8:40 AM', bed: 'Bed 5', sop: 'Average Staff-to-Patient Ratio', category: 'Operational Performance Metrics', status: 'Missed', patientId: 'Guest-105' },

  // Security & Vigilance Metrics - Cameras Uptime %
  { id: 'V024', timestamp: '6:30 AM', bed: 'Bed 1', sop: 'Cameras Uptime %', category: 'Security & Vigilance Metrics', status: 'Violation', patientId: 'Guest-101', thumbnail: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMGNhbWVyYXxlbnwxfHx8fDE3NjI3NTY4NDN8MA&ixlib=rb-4.1.0&q=80&w=400' },
  { id: 'V025', timestamp: '12:15 PM', bed: 'Bed 3', sop: 'Cameras Uptime %', category: 'Security & Vigilance Metrics', status: 'Missed', patientId: 'Guest-103', thumbnail: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMGNhbWVyYXxlbnwxfHx8fDE3NjI3NTY4NDN8MA&ixlib=rb-4.1.0&q=80&w=400' },
  { id: 'V026', timestamp: '4:45 PM', bed: 'Bed 7', sop: 'Cameras Uptime %', category: 'Security & Vigilance Metrics', status: 'Uncertain', patientId: 'Guest-107', thumbnail: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMGNhbWVyYXxlbnwxfHx8fDE3NjI3NTY4NDN8MA&ixlib=rb-4.1.0&q=80&w=400' },

  // Security & Vigilance Metrics - Tampering of Cameras
  { id: 'V027', timestamp: '9:20 AM', bed: 'Bed 2', sop: 'Tampering of Cameras', category: 'Security & Vigilance Metrics', status: 'Violation', patientId: 'Guest-102', thumbnail: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMGNhbWVyYXxlbnwxfHx8fDE3NjI3NTY4NDN8MA&ixlib=rb-4.1.0&q=80&w=400' },

  // Security & Vigilance Metrics - Large Equipment Moved
  { id: 'V028', timestamp: '10:50 AM', bed: 'Bed 4', sop: 'Large Equipment Moved', category: 'Security & Vigilance Metrics', status: 'Uncertain', patientId: 'Guest-104', thumbnail: 'https://images.unsplash.com/photo-1648224394467-651071f36385?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZXF1aXBtZW50JTIwYWxhcm18ZW58MXx8fHwxNzYyNzU2ODQyfDA&ixlib=rb-4.1.0&q=80&w=400' },
  { id: 'V029', timestamp: '3:25 PM', bed: 'Bed 6', sop: 'Large Equipment Moved', category: 'Security & Vigilance Metrics', status: 'Missed', patientId: 'Guest-106', thumbnail: 'https://images.unsplash.com/photo-1648224394467-651071f36385?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZXF1aXBtZW50JTIwYWxhcm18ZW58MXx8fHwxNzYyNzU2ODQyfDA&ixlib=rb-4.1.0&q=80&w=400' },

  // Security & Vigilance Metrics - Tampering of Electrical Circuit Panel
  { id: 'V030', timestamp: '1:30 PM', bed: 'Bed 8', sop: 'Tampering of Electrical Circuit Panel', category: 'Security & Vigilance Metrics', status: 'Violation', patientId: 'Guest-108' },

  // Stock Audit Metrics - Total Hours Spent in Stock Audit
  { id: 'V031', timestamp: '7:20 AM', bed: 'Bed 5', sop: 'Total Hours Spent in Stock Audit', category: 'Stock Audit Metrics', status: 'Missed', patientId: 'Guest-105', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlbnRvcnklMjBhdWRpdHxlbnwxfHx8fDE3NjI3NTY4NDR8MA&ixlib=rb-4.1.0&q=80&w=400' },
  { id: 'V032', timestamp: '11:55 AM', bed: 'Bed 1', sop: 'Total Hours Spent in Stock Audit', category: 'Stock Audit Metrics', status: 'Violation', patientId: 'Guest-101', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlbnRvcnklMjBhdWRpdHxlbnwxfHx8fDE3NjI3NTY4NDR8MA&ixlib=rb-4.1.0&q=80&w=400' },

  // Stock Audit Metrics - Stock Audits Done
  { id: 'V033', timestamp: '8:55 AM', bed: 'Bed 3', sop: 'Stock Audits Done', category: 'Stock Audit Metrics', status: 'Uncertain', patientId: 'Guest-103', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlbnRvcnklMjBhdWRpdHxlbnwxfHx8fDE3NjI3NTY4NDR8MA&ixlib=rb-4.1.0&q=80&w=400' },
  { id: 'V034', timestamp: '2:10 PM', bed: 'Bed 7', sop: 'Stock Audits Done', category: 'Stock Audit Metrics', status: 'Missed', patientId: 'Guest-107' },

  // Stock Audit Metrics - SKUs Moved In
  { id: 'V035', timestamp: '9:40 AM', bed: 'Bed 2', sop: 'SKUs Moved In', category: 'Stock Audit Metrics', status: 'Violation', patientId: 'Guest-102', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlbnRvcnklMjBhdWRpdHxlbnwxfHx8fDE3NjI3NTY4NDR8MA&ixlib=rb-4.1.0&q=80&w=400' },
  { id: 'V036', timestamp: '1:25 PM', bed: 'Bed 4', sop: 'SKUs Moved In', category: 'Stock Audit Metrics', status: 'Uncertain', patientId: 'Guest-104', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlbnRvcnklMjBhdWRpdHxlbnwxfHx8fDE3NjI3NTY4NDR8MA&ixlib=rb-4.1.0&q=80&w=400' },

  // Stock Audit Metrics - SKUs Moved Out
  { id: 'V037', timestamp: '10:35 AM', bed: 'Bed 6', sop: 'SKUs Moved Out', category: 'Stock Audit Metrics', status: 'Missed', patientId: 'Guest-106', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlbnRvcnklMjBhdWRpdHxlbnwxfHx8fDE3NjI3NTY4NDR8MA&ixlib=rb-4.1.0&q=80&w=400' },
  { id: 'V038', timestamp: '3:50 PM', bed: 'Bed 8', sop: 'SKUs Moved Out', category: 'Stock Audit Metrics', status: 'Violation', patientId: 'Guest-108', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlbnRvcnklMjBhdWRpdHxlbnwxfHx8fDE3NjI3NTY4NDR8MA&ixlib=rb-4.1.0&q=80&w=400' },

  // Stock Audit Metrics - Late Night Check-Ins
  { id: 'V039', timestamp: '11:10 PM', bed: 'Bed 1', sop: 'Late Night Check-Ins', category: 'Stock Audit Metrics', status: 'Uncertain', patientId: 'Guest-101' },

  // Staff Efficiency Metrics - Avg. Nurse Work Distribution
  { id: 'V040', timestamp: '8:25 AM', bed: 'Bed 2', sop: 'Avg. Nurse Work Distribution', category: 'Staff Efficiency Metrics', status: 'Violation', patientId: 'Guest-102', thumbnail: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXJzZSUyMHdvcmtpbmd8ZW58MXx8fHwxNzYyNzU2ODQ0fDA&ixlib=rb-4.1.0&q=80&w=400' },
  { id: 'V041', timestamp: '12:40 PM', bed: 'Bed 5', sop: 'Avg. Nurse Work Distribution', category: 'Staff Efficiency Metrics', status: 'Missed', patientId: 'Guest-105', thumbnail: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXJzZSUyMHdvcmtpbmd8ZW58MXx8fHwxNzYyNzU2ODQ0fDA&ixlib=rb-4.1.0&q=80&w=400' },
  { id: 'V042', timestamp: '3:15 PM', bed: 'Bed 7', sop: 'Avg. Nurse Work Distribution', category: 'Staff Efficiency Metrics', status: 'Uncertain', patientId: 'Guest-107', thumbnail: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXJzZSUyMHdvcmtpbmd8ZW58MXx8fHwxNzYyNzU2ODQ0fDA&ixlib=rb-4.1.0&q=80&w=400' },

  // Staff Efficiency Metrics - Avg. Maintenance Personnel Work Distribution
  { id: 'V043', timestamp: '9:10 AM', bed: 'Bed 3', sop: 'Avg. Maintenance Personnel Work Distribution', category: 'Staff Efficiency Metrics', status: 'Missed', patientId: 'Guest-103' },
  { id: 'V044', timestamp: '1:55 PM', bed: 'Bed 6', sop: 'Avg. Maintenance Personnel Work Distribution', category: 'Staff Efficiency Metrics', status: 'Violation', patientId: 'Guest-106' },

  // Staff Efficiency Metrics - Avg. Duration of Staff on Mobile per Day
  { id: 'V045', timestamp: '10:20 AM', bed: 'Bed 4', sop: 'Avg. Duration of Staff on Mobile per Day', category: 'Staff Efficiency Metrics', status: 'Uncertain', patientId: 'Guest-104', thumbnail: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXJzZSUyMHdvcmtpbmd8ZW58MXx8fHwxNzYyNzU2ODQ0fDA&ixlib=rb-4.1.0&q=80&w=400' },
  { id: 'V046', timestamp: '2:35 PM', bed: 'Bed 8', sop: 'Avg. Duration of Staff on Mobile per Day', category: 'Staff Efficiency Metrics', status: 'Violation', patientId: 'Guest-108', thumbnail: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXJzZSUyMHdvcmtpbmd8ZW58MXx8fHwxNzYyNzU2ODQ0fDA&ixlib=rb-4.1.0&q=80&w=400' },
  { id: 'V047', timestamp: '4:05 PM', bed: 'Bed 1', sop: 'Avg. Duration of Staff on Mobile per Day', category: 'Staff Efficiency Metrics', status: 'Missed', patientId: 'Guest-101' },
];

export const bedSessions: BedSession[] = [
  {
    bedId: 'Bed 1',
    patientId: 'Guest-101',
    startTime: '07:00',
    endTime: '11:30',
    compliance: 85,
    events: [
      { id: 'E101', sopId: 'SOP001', sopName: 'Hand Hygiene Before Patient Contact', timestamp: '07:00', status: 'Compliant', icon: '🧼' },
      { id: 'E102', sopId: 'SOP002', sopName: 'Patient Identity Verification', timestamp: '07:02', status: 'Compliant', icon: '🆔' },
      { id: 'E103', sopId: 'SOP003', sopName: 'Pre-Dialysis BP Monitoring', timestamp: '07:05', status: 'Compliant', icon: '💉' },
      { id: 'E104', sopId: 'SOP004', sopName: 'Access Site Inspection', timestamp: '07:08', status: 'Missed', icon: '🔍' },
      { id: 'E105', sopId: 'SOP008', sopName: 'Needling Site Disinfection', timestamp: '07:15', status: 'Compliant', icon: '💧' },
      { id: 'E106', sopId: 'SOP009', sopName: 'Hourly BP Monitoring', timestamp: '08:00', status: 'Compliant', icon: '💉' },
      { id: 'E107', sopId: 'SOP009', sopName: 'Hourly BP Monitoring', timestamp: '09:00', status: 'Compliant', icon: '💉' },
      { id: 'E108', sopId: 'SOP014', sopName: 'Safe Needle Removal', timestamp: '11:20', status: 'Compliant', icon: '💉' },
      { id: 'E109', sopId: 'SOP018', sopName: 'Bed Area Disinfection', timestamp: '11:28', status: 'Compliant', icon: '🧹' },
    ]
  },
  {
    bedId: 'Bed 2',
    patientId: 'Guest-102',
    startTime: '08:00',
    endTime: '12:30',
    compliance: 72,
    events: [
      { id: 'E201', sopId: 'SOP001', sopName: 'Hand Hygiene Before Patient Contact', timestamp: '08:00', status: 'Compliant', icon: '🧼' },
      { id: 'E202', sopId: 'SOP003', sopName: 'Pre-Dialysis BP Monitoring', timestamp: '08:05', status: 'Compliant', icon: '💉' },
      { id: 'E203', sopId: 'SOP005', sopName: 'Machine Preparation & Priming', timestamp: '08:10', status: 'Uncertain', icon: '⚙️' },
      { id: 'E204', sopId: 'SOP011', sopName: 'Machine Alarm Response', timestamp: '09:22', status: 'Violation', icon: '🔔' },
      { id: 'E205', sopId: 'SOP009', sopName: 'Hourly BP Monitoring', timestamp: '10:00', status: 'Missed', icon: '💉' },
      { id: 'E206', sopId: 'SOP014', sopName: 'Safe Needle Removal', timestamp: '12:20', status: 'Compliant', icon: '💉' },
    ]
  },
  {
    bedId: 'Bed 3',
    patientId: 'Guest-103',
    startTime: '09:00',
    endTime: '13:30',
    compliance: 88,
    events: [
      { id: 'E301', sopId: 'SOP001', sopName: 'Hand Hygiene Before Patient Contact', timestamp: '09:00', status: 'Compliant', icon: '🧼' },
      { id: 'E302', sopId: 'SOP003', sopName: 'Pre-Dialysis BP Monitoring', timestamp: '09:05', status: 'Compliant', icon: '💉' },
      { id: 'E303', sopId: 'SOP007', sopName: 'Sterile Glove Usage', timestamp: '09:15', status: 'Compliant', icon: '🧤' },
      { id: 'E304', sopId: 'SOP009', sopName: 'Hourly BP Monitoring', timestamp: '10:00', status: 'Compliant', icon: '💉' },
      { id: 'E305', sopId: 'SOP009', sopName: 'Hourly BP Monitoring', timestamp: '11:00', status: 'Compliant', icon: '💉' },
      { id: 'E306', sopId: 'SOP027', sopName: 'Post-Session Machine Disinfection', timestamp: '13:20', status: 'Missed', icon: '🧹' },
    ]
  },
  {
    bedId: 'Bed 4',
    patientId: 'Guest-104',
    startTime: '07:30',
    endTime: '12:00',
    compliance: 76,
    events: [
      { id: 'E401', sopId: 'SOP001', sopName: 'Hand Hygiene Before Patient Contact', timestamp: '07:30', status: 'Compliant', icon: '🧼' },
      { id: 'E402', sopId: 'SOP003', sopName: 'Pre-Dialysis BP Monitoring', timestamp: '07:35', status: 'Compliant', icon: '💉' },
      { id: 'E403', sopId: 'SOP007', sopName: 'Sterile Glove Usage', timestamp: '09:45', status: 'Violation', icon: '🧤' },
      { id: 'E404', sopId: 'SOP020', sopName: 'Hand Hygiene After Patient Contact', timestamp: '10:45', status: 'Missed', icon: '🧼' },
      { id: 'E405', sopId: 'SOP014', sopName: 'Safe Needle Removal', timestamp: '11:50', status: 'Compliant', icon: '💉' },
    ]
  },
  {
    bedId: 'Bed 5',
    patientId: 'Guest-105',
    startTime: '10:00',
    endTime: '14:30',
    compliance: 68,
    events: [
      { id: 'E501', sopId: 'SOP001', sopName: 'Hand Hygiene Before Patient Contact', timestamp: '10:00', status: 'Compliant', icon: '🧼' },
      { id: 'E502', sopId: 'SOP003', sopName: 'Pre-Dialysis BP Monitoring', timestamp: '10:05', status: 'Compliant', icon: '💉' },
      { id: 'E503', sopId: 'SOP010', sopName: 'Patient Comfort Check', timestamp: '11:30', status: 'Missed', icon: '✓' },
      { id: 'E504', sopId: 'SOP023', sopName: 'Surface Disinfection', timestamp: '14:45', status: 'Violation', icon: '🧹' },
      { id: 'E505', sopId: 'SOP022', sopName: 'PPE Doffing After Procedure', timestamp: '16:20', status: 'Violation', icon: '🥼' },
    ]
  },
  {
    bedId: 'Bed 6',
    patientId: 'Guest-106',
    startTime: '11:00',
    endTime: '15:30',
    compliance: 82,
    events: [
      { id: 'E601', sopId: 'SOP001', sopName: 'Hand Hygiene Before Patient Contact', timestamp: '11:00', status: 'Compliant', icon: '🧼' },
      { id: 'E602', sopId: 'SOP003', sopName: 'Pre-Dialysis BP Monitoring', timestamp: '11:05', status: 'Compliant', icon: '💉' },
      { id: 'E603', sopId: 'SOP009', sopName: 'Hourly BP Monitoring', timestamp: '12:00', status: 'Compliant', icon: '💉' },
      { id: 'E604', sopId: 'SOP018', sopName: 'Bed Area Disinfection', timestamp: '15:10', status: 'Missed', icon: '🧹' },
    ]
  },
  {
    bedId: 'Bed 7',
    patientId: 'Guest-107',
    startTime: '08:30',
    endTime: '13:00',
    compliance: 79,
    events: [
      { id: 'E701', sopId: 'SOP001', sopName: 'Hand Hygiene Before Patient Contact', timestamp: '08:30', status: 'Compliant', icon: '🧼' },
      { id: 'E702', sopId: 'SOP003', sopName: 'Pre-Dialysis BP Monitoring', timestamp: '08:35', status: 'Compliant', icon: '💉' },
      { id: 'E703', sopId: 'SOP010', sopName: 'Patient Comfort Check', timestamp: '11:15', status: 'Missed', icon: '✓' },
      { id: 'E704', sopId: 'SOP016', sopName: 'Post-Dialysis BP Check', timestamp: '12:50', status: 'Compliant', icon: '💉' },
    ]
  },
  {
    bedId: 'Bed 8',
    patientId: 'Guest-108',
    startTime: '07:00',
    endTime: '11:30',
    compliance: 84,
    events: [
      { id: 'E801', sopId: 'SOP001', sopName: 'Hand Hygiene Before Patient Contact', timestamp: '07:00', status: 'Compliant', icon: '🧼' },
      { id: 'E802', sopId: 'SOP005', sopName: 'Machine Preparation & Priming', timestamp: '07:45', status: 'Uncertain', icon: '⚙️' },
      { id: 'E803', sopId: 'SOP003', sopName: 'Pre-Dialysis BP Monitoring', timestamp: '07:05', status: 'Compliant', icon: '💉' },
      { id: 'E804', sopId: 'SOP009', sopName: 'Hourly BP Monitoring', timestamp: '08:00', status: 'Compliant', icon: '💉' },
      { id: 'E805', sopId: 'SOP014', sopName: 'Safe Needle Removal', timestamp: '11:20', status: 'Compliant', icon: '💉' },
    ]
  },
];

export const patientJourneys: PatientJourney[] = bedSessions.map((session) => ({
  patientId: session.patientId,
  bedId: session.bedId,
  entryTime: session.startTime,
  dialysisStart: addMinutes(session.startTime, 15),
  dialysisEnd: subtractMinutes(session.endTime, 15),
  exitTime: session.endTime,
  compliance: session.compliance,
  events: session.events,
}));

// Compliance trend data (7 days)
export const complianceTrend = [
  { date: 'Oct 28', compliance: 79 },
  { date: 'Oct 29', compliance: 81 },
  { date: 'Oct 30', compliance: 78 },
  { date: 'Oct 31', compliance: 80 },
  { date: 'Nov 1', compliance: 83 },
  { date: 'Nov 2', compliance: 79 },
  { date: 'Nov 3', compliance: 82 },
];

// Top issues for dashboard
export const topIssues = [
  { item: 'Machine Alarm Response', compliance: 68, type: 'SOP' },
  { item: 'Linen Change Protocol', compliance: 72, type: 'SOP' },
  { item: 'Post-Session Machine Disinfection', compliance: 75, type: 'SOP' },
];

// Function to get date-specific bed sessions
export function getBedSessionsForDate(date: string): BedSession[] {
  // Use the date to create variations in the data
  const dateNum = parseInt(date) || 30;
  const seed = dateNum % 3; // Create 3 different variations

  // Base pattern - default is date "30"
  if (seed === 0) {
    return bedSessions; // Use original data for dates 30, 3, 6, etc.
  }

  // Variation 1 - for dates 28, 31, 1, 4, etc.
  if (seed === 1) {
    return bedSessions.map((session, index) => ({
      ...session,
      compliance: Math.max(70, Math.min(95, session.compliance + (index % 2 === 0 ? 5 : -3))),
      startTime: index % 2 === 0 ? session.startTime : addMinutes(session.startTime, 30),
      endTime: index % 2 === 0 ? session.endTime : addMinutes(session.endTime, 30),
    }));
  }

  // Variation 2 - for dates 29, 2, 5, etc.
  return bedSessions.map((session, index) => ({
    ...session,
    compliance: Math.max(70, Math.min(95, session.compliance - (index % 3 === 0 ? 8 : 2))),
    startTime: index % 3 === 0 ? addMinutes(session.startTime, -15) : session.startTime,
    endTime: index % 3 === 0 ? addMinutes(session.endTime, -15) : session.endTime,
  }));
}

// Function to get date-specific patient journeys
export function getPatientJourneysForDate(date: string): PatientJourney[] {
  const sessions = getBedSessionsForDate(date);
  return sessions.map((session) => ({
    patientId: session.patientId,
    bedId: session.bedId,
    entryTime: session.startTime,
    dialysisStart: addMinutes(session.startTime, 15),
    dialysisEnd: subtractMinutes(session.endTime, 15),
    exitTime: session.endTime,
    compliance: session.compliance,
    events: session.events,
  }));
}

// Helper functions
function addMinutes(time: string, minutes: number): string {
  const [hours, mins] = time.split(':').map(Number);
  const totalMins = hours * 60 + mins + minutes;
  const newHours = Math.floor(totalMins / 60) % 24;
  const newMins = totalMins % 60;
  return `${String(newHours).padStart(2, '0')}:${String(newMins).padStart(2, '0')}`;
}

function subtractMinutes(time: string, minutes: number): string {
  const [hours, mins] = time.split(':').map(Number);
  const totalMins = hours * 60 + mins - minutes;
  const newHours = Math.floor(totalMins / 60);
  const newMins = totalMins % 60;
  return `${String(newHours).padStart(2, '0')}:${String(newMins).padStart(2, '0')}`;
}