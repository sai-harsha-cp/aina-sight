import { X, Activity, AlertTriangle, CheckCircle2, Eye, Droplet, ThermometerSun, Shield, UserCheck, Radio, Syringe, Waves, HandMetal, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useRef, useEffect } from "react";
import { EvidenceDetailModal } from "./EvidenceDetailModal";

interface PatientJourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  bedNumber?: string;
  patientId?: string;
}

export function PatientJourneyModal({ isOpen, onClose, bedNumber = "Bed 01", patientId = "P-0001" }: PatientJourneyModalProps) {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [hoveredEventIndex, setHoveredEventIndex] = useState<number | null>(null);
  const [currentSessionIndex, setCurrentSessionIndex] = useState(2); // Start with latest session (Nov 7)
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedRowIndex, setHighlightedRowIndex] = useState<number | null>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mock session data for multiple days
  const sessions = [
    {
      date: "5th Nov",
      timeRange: "08:30 - 13:45",
      compliance: "88%",
      complianceTrend: "-2% vs prev",
      violations: 7,
      violationsTrend: "+2 vs prev",
      coverage: "165 / 214"
    },
    {
      date: "6th Nov",
      timeRange: "09:00 - 14:15",
      compliance: "90%",
      complianceTrend: "+2% vs prev",
      violations: 6,
      violationsTrend: "-1 vs prev",
      coverage: "172 / 214"
    },
    {
      date: "7th Nov",
      timeRange: "08:50 - 14:00",
      compliance: "92%",
      complianceTrend: "+3% vs yest",
      violations: 5,
      violationsTrend: "-1% vs yest",
      coverage: "178 / 214"
    }
  ];

  const currentSession = sessions[currentSessionIndex];

  const navigateToPrevious = () => {
    if (currentSessionIndex > 0 && !isLoading) {
      setIsLoading(true);
      setHoveredEventIndex(null);
      setTimeout(() => {
        setCurrentSessionIndex(currentSessionIndex - 1);
        setIsLoading(false);
      }, 1000);
    }
  };

  const navigateToNext = () => {
    if (currentSessionIndex < sessions.length - 1 && !isLoading) {
      setIsLoading(true);
      setHoveredEventIndex(null);
      setTimeout(() => {
        setCurrentSessionIndex(currentSessionIndex + 1);
        setIsLoading(false);
      }, 1000);
    }
  };

  // Mock SOP events data for each session
  const allSessionEvents = [
    // Nov 5 - 88% compliance (more violations)
    [
      { name: "Patient Check-in Verification", time: "08:30", phase: "Waiting", status: "Compliant", icon: "userCheck", thumbnail: "https://images.unsplash.com/photo-1576089275776-b6cd5deabdad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMHBhdGllbnQlMjBjaGVja3xlbnwxfHx8fDE3NjI1MTM3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Pre-Session Weight Recording", time: "08:48", phase: "Pre-Dialysis", status: "Violated", icon: "waves", thumbnail: "https://images.unsplash.com/photo-1646829873498-e874cfa27933?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwd2VpZ2h0JTIwc2NhbGV8ZW58MXx8fHwxNzYyNTEzNzg0fDA&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Hand Hygiene Protocol", time: "08:52", phase: "Pre-Dialysis", status: "Missed", icon: "hand", thumbnail: "https://images.unsplash.com/photo-1586534136833-ee4ba8a66ebd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3RhZmYlMjBoYW5kc3xlbnwxfHx8fDE3NjI1MTM3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Vascular Access Inspection", time: "08:55", phase: "Pre-Dialysis", status: "Violated", icon: "droplet", thumbnail: "https://images.unsplash.com/photo-1630128295920-627fb9aff5a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFseXNpcyUyMG1hY2hpbmUlMjBtZWRpY2FsfGVufDF8fHx8MTc2MjUxMzI0NXww&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Dialysate Temperature Check", time: "09:00", phase: "During Dialysis", status: "Compliant", icon: "thermometer", thumbnail: "https://images.unsplash.com/photo-1630128295920-627fb9aff5a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFseXNpcyUyMG1hY2hpbmUlMjBtZWRpY2FsfGVufDF8fHx8MTc2MjUxMzI0NXww&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Machine Safety Check", time: "09:05", phase: "During Dialysis", status: "Violated", icon: "shield", thumbnail: "https://images.unsplash.com/photo-1762161916712-09592fa05b20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZXF1aXBtZW50JTIwc2FmZXR5fGVufDF8fHx8MTc2MjUxMzI0Nnww&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "BP Monitoring (Hourly)", time: "10:10", phase: "During Dialysis", status: "Violated", icon: "activity", thumbnail: "https://images.unsplash.com/photo-1649877510851-10effb9a59b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9vZCUyMHByZXNzdXJlJTIwbW9uaXRvcnxlbnwxfHx8fDE3NjI0MjkxNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Air Detector Test", time: "11:20", phase: "During Dialysis", status: "Violated", icon: "radio", thumbnail: "https://images.unsplash.com/photo-1762161916712-09592fa05b20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZXF1aXBtZW50JTIwc2FmZXR5fGVufDF8fHx8MTc2MjUxMzI0Nnww&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Heparin Administration", time: "11:55", phase: "During Dialysis", status: "Compliant", icon: "syringe", thumbnail: "https://images.unsplash.com/photo-1586534136833-ee4ba8a66ebd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3RhZmYlMjBoYW5kc3xlbnwxfHx8fDE3NjI1MTM3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Needle Removal Protocol", time: "13:15", phase: "Post-Dialysis", status: "Compliant", icon: "handMetal", thumbnail: "https://images.unsplash.com/photo-1586534136833-ee4ba8a66ebd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3RhZmYlMjBoYW5kc3xlbnwxfHx8fDE3NjI1MTM3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Post-Dialysis Assessment", time: "13:22", phase: "Post-Dialysis", status: "Missed", icon: "waves", thumbnail: "https://images.unsplash.com/photo-1576089275776-b6cd5deabdad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMHBhdGllbnQlMjBjaGVja3xlbnwxfHx8fDE3NjI1MTM3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Bed Cleaning & Sanitization", time: "13:40", phase: "Post-Session", status: "Compliant", icon: "shield", thumbnail: "https://images.unsplash.com/photo-1580615633399-a69c661568c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMHJvb20lMjBjbGVhbnxlbnwxfHx8fDE3NjI1MDIxMDF8MA&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Equipment Disinfection Check", time: "13:45", phase: "Post-Session", status: "Violated", icon: "droplet", thumbnail: "https://images.unsplash.com/photo-1580615633399-a69c661568c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMHJvb20lMjBjbGVhbnxlbnwxfHx8fDE3NjI1MDIxMDF8MA&ixlib=rb-4.1.0&q=80&w=1080" }
    ],
    // Nov 6 - 90% compliance (moderate)
    [
      { name: "Patient Check-in Verification", time: "09:00", phase: "Waiting", status: "Compliant", icon: "userCheck", thumbnail: "https://images.unsplash.com/photo-1576089275776-b6cd5deabdad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMHBhdGllbnQlMjBjaGVja3xlbnwxfHx8fDE3NjI1MTM3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Pre-Session Weight Recording", time: "09:18", phase: "Pre-Dialysis", status: "Compliant", icon: "waves", thumbnail: "https://images.unsplash.com/photo-1646829873498-e874cfa27933?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwd2VpZ2h0JTIwc2NhbGV8ZW58MXx8fHwxNzYyNTEzNzg0fDA&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Hand Hygiene Protocol", time: "09:22", phase: "Pre-Dialysis", status: "Compliant", icon: "hand", thumbnail: "https://images.unsplash.com/photo-1586534136833-ee4ba8a66ebd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3RhZmYlMjBoYW5kc3xlbnwxfHx8fDE3NjI1MTM3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Vascular Access Inspection", time: "09:25", phase: "Pre-Dialysis", status: "Violated", icon: "droplet", thumbnail: "https://images.unsplash.com/photo-1630128295920-627fb9aff5a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFseXNpcyUyMG1hY2hpbmUlMjBtZWRpY2FsfGVufDF8fHx8MTc2MjUxMzI0NXww&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Dialysate Temperature Check", time: "09:30", phase: "During Dialysis", status: "Compliant", icon: "thermometer", thumbnail: "https://images.unsplash.com/photo-1630128295920-627fb9aff5a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFseXNpcyUyMG1hY2hpbmUlMjBtZWRpY2FsfGVufDF8fHx8MTc2MjUxMzI0NXww&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Machine Safety Check", time: "09:35", phase: "During Dialysis", status: "Compliant", icon: "shield", thumbnail: "https://images.unsplash.com/photo-1762161916712-09592fa05b20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZXF1aXBtZW50JTIwc2FmZXR5fGVufDF8fHx8MTc2MjUxMzI0Nnww&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "BP Monitoring (Hourly)", time: "10:40", phase: "During Dialysis", status: "Compliant", icon: "activity", thumbnail: "https://images.unsplash.com/photo-1649877510851-10effb9a59b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9vZCUyMHByZXNzdXJlJTIwbW9uaXRvcnxlbnwxfHx8fDE3NjI0MjkxNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Air Detector Test", time: "11:45", phase: "During Dialysis", status: "Violated", icon: "radio", thumbnail: "https://images.unsplash.com/photo-1762161916712-09592fa05b20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZXF1aXBtZW50JTIwc2FmZXR5fGVufDF8fHx8MTc2MjUxMzI0Nnww&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Heparin Administration", time: "12:30", phase: "During Dialysis", status: "Compliant", icon: "syringe", thumbnail: "https://images.unsplash.com/photo-1586534136833-ee4ba8a66ebd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3RhZmYlMjBoYW5kc3xlbnwxfHx8fDE3NjI1MTM3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Needle Removal Protocol", time: "13:50", phase: "Post-Dialysis", status: "Compliant", icon: "handMetal", thumbnail: "https://images.unsplash.com/photo-1586534136833-ee4ba8a66ebd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3RhZmYlMjBoYW5kc3xlbnwxfHx8fDE3NjI1MTM3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Post-Dialysis Assessment", time: "13:55", phase: "Post-Dialysis", status: "Violated", icon: "waves", thumbnail: "https://images.unsplash.com/photo-1576089275776-b6cd5deabdad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMHBhdGllbnQlMjBjaGVja3xlbnwxfHx8fDE3NjI1MTM3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Bed Cleaning & Sanitization", time: "14:10", phase: "Post-Session", status: "Compliant", icon: "shield", thumbnail: "https://images.unsplash.com/photo-1580615633399-a69c661568c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMHJvb20lMjBjbGVhbnxlbnwxfHx8fDE3NjI1MDIxMDF8MA&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Equipment Disinfection Check", time: "14:15", phase: "Post-Session", status: "Violated", icon: "droplet", thumbnail: "https://images.unsplash.com/photo-1580615633399-a69c661568c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMHJvb20lMjBjbGVhbnxlbnwxfHx8fDE3NjI1MDIxMDF8MA&ixlib=rb-4.1.0&q=80&w=1080" }
    ],
    // Nov 7 - 92% compliance (best performance)
    [
      { name: "Patient Check-in Verification", time: "08:35", phase: "Waiting", status: "Compliant", icon: "userCheck", thumbnail: "https://images.unsplash.com/photo-1576089275776-b6cd5deabdad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMHBhdGllbnQlMjBjaGVja3xlbnwxfHx8fDE3NjI1MTM3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Pre-Session Weight Recording", time: "08:52", phase: "Pre-Dialysis", status: "Compliant", icon: "waves", thumbnail: "https://images.unsplash.com/photo-1646829873498-e874cfa27933?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwd2VpZ2h0JTIwc2NhbGV8ZW58MXx8fHwxNzYyNTEzNzg0fDA&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Hand Hygiene Protocol", time: "08:55", phase: "Pre-Dialysis", status: "Compliant", icon: "hand", thumbnail: "https://images.unsplash.com/photo-1586534136833-ee4ba8a66ebd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3RhZmYlMjBoYW5kc3xlbnwxfHx8fDE3NjI1MTM3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Vascular Access Inspection", time: "08:57", phase: "Pre-Dialysis", status: "Violated", icon: "droplet", thumbnail: "https://images.unsplash.com/photo-1630128295920-627fb9aff5a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFseXNpcyUyMG1hY2hpbmUlMjBtZWRpY2FsfGVufDF8fHx8MTc2MjUxMzI0NXww&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Dialysate Temperature Check", time: "09:02", phase: "During Dialysis", status: "Compliant", icon: "thermometer", thumbnail: "https://images.unsplash.com/photo-1630128295920-627fb9aff5a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFseXNpcyUyMG1hY2hpbmUlMjBtZWRpY2FsfGVufDF8fHx8MTc2MjUxMzI0NXww&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Machine Safety Check", time: "09:05", phase: "During Dialysis", status: "Missed", icon: "shield", thumbnail: "https://images.unsplash.com/photo-1762161916712-09592fa05b20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZXF1aXBtZW50JTIwc2FmZXR5fGVufDF8fHx8MTc2MjUxMzI0Nnww&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "BP Monitoring (Hourly)", time: "10:15", phase: "During Dialysis", status: "Compliant", icon: "activity", thumbnail: "https://images.unsplash.com/photo-1649877510851-10effb9a59b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9vZCUyMHByZXNzdXJlJTIwbW9uaXRvcnxlbnwxfHx8fDE3NjI0MjkxNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Air Detector Test", time: "11:22", phase: "During Dialysis", status: "Violated", icon: "radio", thumbnail: "https://images.unsplash.com/photo-1762161916712-09592fa05b20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZXF1aXBtZW50JTIwc2FmZXR5fGVufDF8fHx8MTc2MjUxMzI0Nnww&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Heparin Administration", time: "12:00", phase: "During Dialysis", status: "Compliant", icon: "syringe", thumbnail: "https://images.unsplash.com/photo-1586534136833-ee4ba8a66ebd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3RhZmYlMjBoYW5kc3xlbnwxfHx8fDE3NjI1MTM3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Needle Removal Protocol", time: "13:20", phase: "Post-Dialysis", status: "Compliant", icon: "handMetal", thumbnail: "https://images.unsplash.com/photo-1586534136833-ee4ba8a66ebd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3RhZmYlMjBoYW5kc3xlbnwxfHx8fDE3NjI1MTM3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Post-Dialysis Assessment", time: "13:25", phase: "Post-Dialysis", status: "Missed", icon: "waves", thumbnail: "https://images.unsplash.com/photo-1576089275776-b6cd5deabdad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMHBhdGllbnQlMjBjaGVja3xlbnwxfHx8fDE3NjI1MTM3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Bed Cleaning & Sanitization", time: "13:42", phase: "Post-Session", status: "Compliant", icon: "shield", thumbnail: "https://images.unsplash.com/photo-1580615633399-a69c661568c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMHJvb20lMjBjbGVhbnxlbnwxfHx8fDE3NjI1MDIxMDF8MA&ixlib=rb-4.1.0&q=80&w=1080" },
      { name: "Equipment Disinfection Check", time: "13:50", phase: "Post-Session", status: "Compliant", icon: "droplet", thumbnail: "https://images.unsplash.com/photo-1580615633399-a69c661568c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMHJvb20lMjBjbGVhbnxlbnwxfHx8fDE3NjI1MDIxMDF8MA&ixlib=rb-4.1.0&q=80&w=1080" }
    ]
  ];

  // Get current session's SOP events
  const sopEvents = allSessionEvents[currentSessionIndex];

  // Function to scroll to and highlight a table row
  const scrollToRow = (index: number) => {
    setHighlightedRowIndex(index);
    setTimeout(() => {
      if (rowRefs.current[index]) {
        rowRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
    
    // Remove highlight after 3 seconds
    setTimeout(() => {
      setHighlightedRowIndex(null);
    }, 3000);
  };

  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, any> = {
      hand: HandMetal,
      userCheck: UserCheck,
      droplet: Droplet,
      thermometer: ThermometerSun,
      shield: Shield,
      activity: Activity,
      radio: Radio,
      syringe: Syringe,
      waves: Waves,
      handMetal: HandMetal
    };
    return iconMap[iconName] || Activity;
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Compliant":
        return {
          iconBg: "bg-[#5ee9b5]",
          badgeBg: "bg-green-100",
          badgeText: "text-green-800",
          badgeBorder: "border-green-200"
        };
      case "Violated":
        return {
          iconBg: "bg-[#ff9b9b]",
          badgeBg: "bg-red-100",
          badgeText: "text-red-800",
          badgeBorder: "border-red-200"
        };
      case "Expected":
        return {
          iconBg: "bg-gray-400",
          badgeBg: "bg-gray-100",
          badgeText: "text-gray-800",
          badgeBorder: "border-gray-200"
        };
      case "Missed":
        return {
          iconBg: "bg-gray-400",
          badgeBg: "bg-gray-100",
          badgeText: "text-gray-800",
          badgeBorder: "border-gray-200"
        };
      default:
        return {
          iconBg: "bg-gray-400",
          badgeBg: "bg-gray-100",
          badgeText: "text-gray-800",
          badgeBorder: "border-gray-200"
        };
    }
  };

  const timeMarkers = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[70vw] sm:max-w-[70vw] w-full p-0 gap-0 overflow-hidden">
          <DialogTitle className="sr-only">Patient Journey Timeline for {bedNumber} - Patient {patientId}</DialogTitle>
          <DialogDescription className="sr-only">
            Detailed view of patient journey with timeline, compliance metrics, and SOP event evidence
          </DialogDescription>
          
          {/* Header */}
          <div className="px-5 py-4 border-b border-gray-200 bg-[#f7fafc]">
            <div className="mb-2">
              <h2 className="text-gray-900">Patient Journey Timeline</h2>
            </div>
            
            <div className="flex items-center justify-between gap-4">
              <div className="text-[13px] text-gray-600">
                <span>{currentSession.date} • {currentSession.timeRange} • Patient {patientId}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className={`w-5 h-5 transition-colors ${currentSessionIndex === 0 || isLoading ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={navigateToPrevious}
                  disabled={currentSessionIndex === 0 || isLoading}
                >
                  <ChevronLeft />
                </button>
                <button
                  className={`w-5 h-5 transition-colors ${currentSessionIndex === sessions.length - 1 || isLoading ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={navigateToNext}
                  disabled={currentSessionIndex === sessions.length - 1 || isLoading}
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#f7fafc] max-h-[calc(90vh-80px)] overflow-y-auto">
            {/* Timeline Visualization */}
            <div className="px-5 py-4 sticky top-0 z-20 bg-white border-b border-gray-200">
              <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-3 relative">
                {/* Left Chevron - Half outside, half inside */}
                <button
                  onClick={navigateToPrevious}
                  disabled={currentSessionIndex === 0 || isLoading}
                  className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center shadow-md transition-all ${
                    currentSessionIndex === 0 || isLoading
                      ? 'opacity-40 cursor-not-allowed' 
                      : 'hover:bg-gray-100 hover:border-gray-400 cursor-pointer'
                  }`}
                  aria-label="Previous session"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-700" />
                </button>

                {/* Right Chevron - Half outside, half inside */}
                <button
                  onClick={navigateToNext}
                  disabled={currentSessionIndex === sessions.length - 1 || isLoading}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center shadow-md transition-all ${
                    currentSessionIndex === sessions.length - 1 || isLoading
                      ? 'opacity-40 cursor-not-allowed' 
                      : 'hover:bg-gray-100 hover:border-gray-400 cursor-pointer'
                  }`}
                  aria-label="Next session"
                >
                  <ChevronRight className="w-4 h-4 text-gray-700" />
                </button>

                {isLoading ? (
                  <>
                    {/* Skeleton Time markers */}
                    <div className="flex justify-between mb-10 px-2">
                      {[...Array(7)].map((_, idx) => (
                        <div key={idx} className="w-10 h-3 bg-gray-200 rounded animate-pulse"></div>
                      ))}
                    </div>

                    {/* Skeleton Timeline bar */}
                    <div className="relative bg-white border-2 border-gray-300 rounded-lg h-[90px] mx-2">
                      <div className="absolute inset-2 flex items-center justify-center gap-4">
                        {[...Array(12)].map((_, idx) => (
                          <div key={idx} className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Time markers */}
                    <div className="flex justify-between mb-10 px-2">
                      {timeMarkers.map((time, idx) => (
                        <span key={idx} className="text-[11px] text-gray-400">{time}</span>
                      ))}
                    </div>

                    {/* Timeline bar */}
                    <div className="relative bg-white border-2 border-gray-300 rounded-lg h-[90px] mx-2">
                  {/* Patient waiting - Waiting Phase */}
                  <div className="absolute left-[2px] top-[2px] bottom-[2px] w-[calc(10%-2px)] flex flex-col items-center">
                    <div className="flex gap-1 pt-2 pb-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div onClick={() => scrollToRow(0)} className={`w-5 h-5 bg-[#5ee9b5] rounded-full flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all ${hoveredEventIndex === 0 ? 'ring-4 ring-blue-500 scale-110' : ''}`}>
                            <UserCheck className="w-2.5 h-2.5 text-white" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="p-0 overflow-hidden max-w-[250px]">
                          <div className="text-[11px]">
                            <div className="px-3 py-2 bg-gray-50 border-b border-gray-200">
                              <div className="text-gray-900 mb-0.5">{sopEvents[0].name}</div>
                              <div className="text-gray-600">{sopEvents[0].time} • {sopEvents[0].phase}</div>
                              <div className="inline-flex items-center px-2 py-0.5 mt-1 bg-green-100 text-green-800 border-green-200 text-[10px] rounded border">
                                {sopEvents[0].status}
                              </div>
                            </div>
                            <div className="p-2">
                              <ImageWithFallback
                                src={sopEvents[0].thumbnail}
                                alt={sopEvents[0].name}
                                className="w-full h-32 rounded object-cover border border-gray-200"
                              />
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="flex-1" />
                    <span className="text-[11px] text-gray-700 pb-1.5">36min</span>
                  </div>

                  {/* Pre-Dialysis */}
                  <div className="absolute left-[10%] top-[2px] bottom-[2px] w-[8%] bg-[#e6e6e6] flex flex-col items-center">
                    <div className="flex gap-1 pt-2 pb-1 flex-wrap justify-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div onClick={() => scrollToRow(1)} className={`w-5 h-5 bg-[#5ee9b5] rounded-full flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all ${hoveredEventIndex === 1 ? 'ring-4 ring-blue-500 scale-110' : ''}`}>
                            <Waves className="w-2.5 h-2.5 text-white" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="p-0 overflow-hidden max-w-[250px]">
                          <div className="text-[11px]">
                            <div className="px-3 py-2 bg-gray-50 border-b border-gray-200">
                              <div className="text-gray-900 mb-0.5">{sopEvents[1].name}</div>
                              <div className="text-gray-600">{sopEvents[1].time} • {sopEvents[1].phase}</div>
                              <div className="inline-flex items-center px-2 py-0.5 mt-1 bg-green-100 text-green-800 border-green-200 text-[10px] rounded border">
                                {sopEvents[1].status}
                              </div>
                            </div>
                            <div className="p-2">
                              <ImageWithFallback
                                src={sopEvents[1].thumbnail}
                                alt={sopEvents[1].name}
                                className="w-full h-32 rounded object-cover border border-gray-200"
                              />
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                      
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div onClick={() => scrollToRow(2)} className={`w-5 h-5 bg-[#5ee9b5] rounded-full flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all ${hoveredEventIndex === 2 ? 'ring-4 ring-blue-500 scale-110' : ''}`}>
                            <HandMetal className="w-2.5 h-2.5 text-white" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="p-0 overflow-hidden max-w-[250px]">
                          <div className="text-[11px]">
                            <div className="px-3 py-2 bg-gray-50 border-b border-gray-200">
                              <div className="text-gray-900 mb-0.5">{sopEvents[2].name}</div>
                              <div className="text-gray-600">{sopEvents[2].time} • {sopEvents[2].phase}</div>
                              <div className="inline-flex items-center px-2 py-0.5 mt-1 bg-green-100 text-green-800 border-green-200 text-[10px] rounded border">
                                {sopEvents[2].status}
                              </div>
                            </div>
                            <div className="p-2">
                              <ImageWithFallback
                                src={sopEvents[2].thumbnail}
                                alt={sopEvents[2].name}
                                className="w-full h-32 rounded object-cover border border-gray-200"
                              />
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                      
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div onClick={() => scrollToRow(3)} className={`w-5 h-5 bg-[#ff9b9b] rounded-full flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-red-400 transition-all ${hoveredEventIndex === 3 ? 'ring-4 ring-red-500 scale-110' : ''}`}>
                            <Droplet className="w-2.5 h-2.5 text-white" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="p-0 overflow-hidden max-w-[250px]">
                          <div className="text-[11px]">
                            <div className="px-3 py-2 bg-gray-50 border-b border-gray-200">
                              <div className="text-gray-900 mb-0.5">{sopEvents[3].name}</div>
                              <div className="text-gray-600">{sopEvents[3].time} • {sopEvents[3].phase}</div>
                              <div className="inline-flex items-center px-2 py-0.5 mt-1 bg-red-100 text-red-800 border-red-200 text-[10px] rounded border">
                                {sopEvents[3].status}
                              </div>
                            </div>
                            <div className="p-2">
                              <ImageWithFallback
                                src={sopEvents[3].thumbnail}
                                alt={sopEvents[3].name}
                                className="w-full h-32 rounded object-cover border border-gray-200"
                              />
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="flex-1" />
                    <span className="text-[11px] text-gray-700 pb-1.5">29min</span>
                  </div>

                  {/* During Dialysis session */}
                  <div className="absolute left-[18%] top-[2px] bottom-[2px] w-[62%] bg-[#d0fae5] border-[#5ee9b5] border-x-2 flex flex-col items-center">
                    <div className="flex gap-1 pt-2 pb-1 flex-wrap justify-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div onClick={() => scrollToRow(4)} className={`w-5 h-5 bg-[#5ee9b5] rounded-full flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all ${hoveredEventIndex === 4 ? 'ring-4 ring-blue-500 scale-110' : ''}`}>
                            <ThermometerSun className="w-2.5 h-2.5 text-white" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="p-0 overflow-hidden max-w-[250px]">
                          <div className="text-[11px]">
                            <div className="px-3 py-2 bg-gray-50 border-b border-gray-200">
                              <div className="text-gray-900 mb-0.5">{sopEvents[4].name}</div>
                              <div className="text-gray-600">{sopEvents[4].time} • {sopEvents[4].phase}</div>
                              <div className="inline-flex items-center px-2 py-0.5 mt-1 bg-green-100 text-green-800 border-green-200 text-[10px] rounded border">
                                {sopEvents[4].status}
                              </div>
                            </div>
                            <div className="p-2">
                              <ImageWithFallback
                                src={sopEvents[4].thumbnail}
                                alt={sopEvents[4].name}
                                className="w-full h-32 rounded object-cover border border-gray-200"
                              />
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                      
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div onClick={() => scrollToRow(5)} className={`w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-gray-500 transition-all ${hoveredEventIndex === 5 ? 'ring-4 ring-gray-600 scale-110' : ''}`}>
                            <Shield className="w-2.5 h-2.5 text-white" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="p-0 overflow-hidden max-w-[250px]">
                          <div className="text-[11px]">
                            <div className="px-3 py-2 bg-gray-50 border-b border-gray-200">
                              <div className="text-gray-900 mb-0.5">{sopEvents[5].name}</div>
                              <div className="text-gray-600">{sopEvents[5].time} • {sopEvents[5].phase}</div>
                              <div className="inline-flex items-center px-2 py-0.5 mt-1 bg-gray-100 text-gray-800 border-gray-200 text-[10px] rounded border">
                                {sopEvents[5].status}
                              </div>
                            </div>
                            <div className="p-2">
                              <ImageWithFallback
                                src={sopEvents[5].thumbnail}
                                alt={sopEvents[5].name}
                                className="w-full h-32 rounded object-cover border border-gray-200"
                              />
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                      
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div onClick={() => scrollToRow(6)} className={`w-5 h-5 bg-[#5ee9b5] rounded-full flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all ${hoveredEventIndex === 6 ? 'ring-4 ring-blue-500 scale-110' : ''}`}>
                            <Activity className="w-2.5 h-2.5 text-white" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="p-0 overflow-hidden max-w-[250px]">
                          <div className="text-[11px]">
                            <div className="px-3 py-2 bg-gray-50 border-b border-gray-200">
                              <div className="text-gray-900 mb-0.5">{sopEvents[6].name}</div>
                              <div className="text-gray-600">{sopEvents[6].time} • {sopEvents[6].phase}</div>
                              <div className="inline-flex items-center px-2 py-0.5 mt-1 bg-green-100 text-green-800 border-green-200 text-[10px] rounded border">
                                {sopEvents[6].status}
                              </div>
                            </div>
                            <div className="p-2">
                              <ImageWithFallback
                                src={sopEvents[6].thumbnail}
                                alt={sopEvents[6].name}
                                className="w-full h-32 rounded object-cover border border-gray-200"
                              />
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                      
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div onClick={() => scrollToRow(7)} className={`w-5 h-5 bg-[#ff9b9b] rounded-full flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-red-400 transition-all ${hoveredEventIndex === 7 ? 'ring-4 ring-red-500 scale-110' : ''}`}>
                            <Radio className="w-2.5 h-2.5 text-white" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="p-0 overflow-hidden max-w-[250px]">
                          <div className="text-[11px]">
                            <div className="px-3 py-2 bg-gray-50 border-b border-gray-200">
                              <div className="text-gray-900 mb-0.5">{sopEvents[7].name}</div>
                              <div className="text-gray-600">{sopEvents[7].time} • {sopEvents[7].phase}</div>
                              <div className="inline-flex items-center px-2 py-0.5 mt-1 bg-red-100 text-red-800 border-red-200 text-[10px] rounded border">
                                {sopEvents[7].status}
                              </div>
                            </div>
                            <div className="p-2">
                              <ImageWithFallback
                                src={sopEvents[7].thumbnail}
                                alt={sopEvents[7].name}
                                className="w-full h-32 rounded object-cover border border-gray-200"
                              />
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                      
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div onClick={() => scrollToRow(8)} className={`w-5 h-5 bg-[#5ee9b5] rounded-full flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all ${hoveredEventIndex === 8 ? 'ring-4 ring-blue-500 scale-110' : ''}`}>
                            <Syringe className="w-2.5 h-2.5 text-white" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="p-0 overflow-hidden max-w-[250px]">
                          <div className="text-[11px]">
                            <div className="px-3 py-2 bg-gray-50 border-b border-gray-200">
                              <div className="text-gray-900 mb-0.5">{sopEvents[8].name}</div>
                              <div className="text-gray-600">{sopEvents[8].time} • {sopEvents[8].phase}</div>
                              <div className="inline-flex items-center px-2 py-0.5 mt-1 bg-green-100 text-green-800 border-green-200 text-[10px] rounded border">
                                {sopEvents[8].status}
                              </div>
                            </div>
                            <div className="p-2">
                              <ImageWithFallback
                                src={sopEvents[8].thumbnail}
                                alt={sopEvents[8].name}
                                className="w-full h-32 rounded object-cover border border-gray-200"
                              />
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="flex-1" />
                    <span className="text-[11px] text-gray-700 pb-1.5">4h 18min</span>
                  </div>

                  {/* Post-dialysis */}
                  <div className="absolute left-[80%] top-[2px] bottom-[2px] w-[10%] bg-[#e6e6e6] flex flex-col items-center">
                    <div className="flex gap-1 pt-2 pb-1 flex-wrap justify-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div onClick={() => scrollToRow(9)} className={`w-5 h-5 bg-[#5ee9b5] rounded-full flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all ${hoveredEventIndex === 9 ? 'ring-4 ring-blue-500 scale-110' : ''}`}>
                            <HandMetal className="w-2.5 h-2.5 text-white" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="p-0 overflow-hidden max-w-[250px]">
                          <div className="text-[11px]">
                            <div className="px-3 py-2 bg-gray-50 border-b border-gray-200">
                              <div className="text-gray-900 mb-0.5">{sopEvents[9].name}</div>
                              <div className="text-gray-600">{sopEvents[9].time} • {sopEvents[9].phase}</div>
                              <div className="inline-flex items-center px-2 py-0.5 mt-1 bg-green-100 text-green-800 border-green-200 text-[10px] rounded border">
                                {sopEvents[9].status}
                              </div>
                            </div>
                            <div className="p-2">
                              <ImageWithFallback
                                src={sopEvents[9].thumbnail}
                                alt={sopEvents[9].name}
                                className="w-full h-32 rounded object-cover border border-gray-200"
                              />
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                      
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div onClick={() => scrollToRow(10)} className={`w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-gray-500 transition-all ${hoveredEventIndex === 10 ? 'ring-4 ring-gray-600 scale-110' : ''}`}>
                            <Waves className="w-2.5 h-2.5 text-white" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="p-0 overflow-hidden max-w-[250px]">
                          <div className="text-[11px]">
                            <div className="px-3 py-2 bg-gray-50 border-b border-gray-200">
                              <div className="text-gray-900 mb-0.5">{sopEvents[10].name}</div>
                              <div className="text-gray-600">{sopEvents[10].time} • {sopEvents[10].phase}</div>
                              <div className="inline-flex items-center px-2 py-0.5 mt-1 bg-gray-100 text-gray-800 border-gray-200 text-[10px] rounded border">
                                {sopEvents[10].status}
                              </div>
                            </div>
                            <div className="p-2">
                              <ImageWithFallback
                                src={sopEvents[10].thumbnail}
                                alt={sopEvents[10].name}
                                className="w-full h-32 rounded object-cover border border-gray-200"
                              />
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="flex-1" />
                    <span className="text-[11px] text-gray-700 pb-1.5">18min</span>
                  </div>

                  {/* After patient departure - Post-Session */}
                  <div className="absolute left-[90%] top-[2px] bottom-[2px] right-[2px] flex flex-col items-center">
                    <div className="flex gap-1 pt-2 pb-1 flex-wrap justify-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div onClick={() => scrollToRow(11)} className={`w-5 h-5 bg-[#5ee9b5] rounded-full flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all ${hoveredEventIndex === 11 ? 'ring-4 ring-blue-500 scale-110' : ''}`}>
                            <Shield className="w-2.5 h-2.5 text-white" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="p-0 overflow-hidden max-w-[250px]">
                          <div className="text-[11px]">
                            <div className="px-3 py-2 bg-gray-50 border-b border-gray-200">
                              <div className="text-gray-900 mb-0.5">{sopEvents[11].name}</div>
                              <div className="text-gray-600">{sopEvents[11].time} • {sopEvents[11].phase}</div>
                              <div className="inline-flex items-center px-2 py-0.5 mt-1 bg-green-100 text-green-800 border-green-200 text-[10px] rounded border">
                                {sopEvents[11].status}
                              </div>
                            </div>
                            <div className="p-2">
                              <ImageWithFallback
                                src={sopEvents[11].thumbnail}
                                alt={sopEvents[11].name}
                                className="w-full h-32 rounded object-cover border border-gray-200"
                              />
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                      
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div onClick={() => scrollToRow(12)} className={`w-5 h-5 bg-[#5ee9b5] rounded-full flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all ${hoveredEventIndex === 12 ? 'ring-4 ring-blue-500 scale-110' : ''}`}>
                            <Droplet className="w-2.5 h-2.5 text-white" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="p-0 overflow-hidden max-w-[250px]">
                          <div className="text-[11px]">
                            <div className="px-3 py-2 bg-gray-50 border-b border-gray-200">
                              <div className="text-gray-900 mb-0.5">{sopEvents[12].name}</div>
                              <div className="text-gray-600">{sopEvents[12].time} • {sopEvents[12].phase}</div>
                              <div className="inline-flex items-center px-2 py-0.5 mt-1 bg-green-100 text-green-800 border-green-200 text-[10px] rounded border">
                                {sopEvents[12].status}
                              </div>
                            </div>
                            <div className="p-2">
                              <ImageWithFallback
                                src={sopEvents[12].thumbnail}
                                alt={sopEvents[12].name}
                                className="w-full h-32 rounded object-cover border border-gray-200"
                              />
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="flex-1" />
                    <span className="text-[11px] text-gray-700 pb-1.5">36min</span>
                  </div>
                </div>
                  </>
                )}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="px-5 pb-4">
              {isLoading ? (
                <div className="grid grid-cols-3 gap-3">
                  {[...Array(3)].map((_, idx) => (
                    <div key={idx} className="bg-white border border-gray-200 rounded-lg p-3">
                      <div className="flex items-start gap-2 mb-2">
                        <div className="w-7 h-7 bg-gray-200 rounded-lg animate-pulse"></div>
                        <div className="w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <div className="w-12 h-6 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                {/* Compliance */}
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Activity className="w-3.5 h-3.5 text-gray-600" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[11px] text-gray-600 leading-tight mb-1">Compliance</p>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-[18px] text-gray-900">{currentSession.compliance}</span>
                        <span className="text-[11px] text-green-600">{currentSession.complianceTrend}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* High-Risk Violations */}
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-3.5 h-3.5 text-gray-600" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[11px] text-gray-600 leading-tight mb-1">High-Risk Violations</p>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-[18px] text-gray-900">{currentSession.violations}</span>
                        <span className="text-[11px] text-red-600">{currentSession.violationsTrend}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SOP Execution Coverage */}
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gray-600" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[11px] text-gray-600 leading-tight mb-1">SOP Execution Coverage</p>
                      <span className="text-[18px] text-gray-900">{currentSession.coverage}</span>
                    </div>
                  </div>
                </div>
                </div>
              )}
            </div>

            {/* SOP Event Evidence Table */}
            <div className="px-5 pb-5">
              <h3 className="text-[13px] text-gray-700 mb-3">SOP Event Evidence</h3>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {/* Table Header */}
                <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 grid grid-cols-[2fr_0.8fr_1.2fr_1fr_auto] gap-3">
                  <div className="text-[11px] text-gray-600">Event</div>
                  <div className="text-[11px] text-gray-600">Time</div>
                  <div className="text-[11px] text-gray-600">Phase</div>
                  <div className="text-[11px] text-gray-600">Status</div>
                  <div className="text-[11px] text-gray-600">Evidence</div>
                </div>

                {isLoading ? (
                  <>
                    {/* Skeleton Table Rows */}
                    {[...Array(13)].map((_, idx) => (
                      <div key={idx} className="border-b border-gray-200 last:border-b-0 px-4 py-2.5 grid grid-cols-[2fr_0.8fr_1.2fr_1fr_auto] gap-3 items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-gray-200 rounded-full animate-pulse flex-shrink-0"></div>
                          <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-16 h-5 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-12 h-12 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {/* Table Rows */}
                    {sopEvents.map((event, idx) => {
                  const IconComponent = getIconComponent(event.icon);
                  const styles = getStatusStyles(event.status);
                  
                  return (
                    <div 
                      key={idx}
                      ref={(el) => (rowRefs.current[idx] = el)}
                      onClick={() => setSelectedEvent(event)}
                      onMouseEnter={() => setHoveredEventIndex(idx)}
                      onMouseLeave={() => setHoveredEventIndex(null)}
                      className={`border-b border-gray-200 last:border-b-0 px-4 py-2.5 grid grid-cols-[2fr_0.8fr_1.2fr_1fr_auto] gap-3 items-center hover:bg-gray-50 cursor-pointer transition-all ${
                        highlightedRowIndex === idx ? 'bg-blue-50 ring-2 ring-blue-400 ring-inset' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 ${styles.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-[13px] text-gray-900">{event.name}</span>
                      </div>
                      <div className="text-[13px] text-gray-600">{event.time}</div>
                      <div className="text-[11px] text-gray-600">{event.phase}</div>
                      <div>
                        <span className={`inline-flex items-center px-2 py-0.5 ${styles.badgeBg} ${styles.badgeText} text-[11px] rounded border ${styles.badgeBorder}`}>
                          {event.status}
                        </span>
                      </div>
                      <div onClick={(e) => e.stopPropagation()}>
                        <ImageWithFallback
                          src={event.thumbnail}
                          alt={event.name}
                          className="w-12 h-12 rounded border border-gray-300 object-cover cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                          onClick={() => setSelectedEvent(event)}
                        />
                      </div>
                    </div>
                  );
                })}
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Evidence Detail Modal */}
      <EvidenceDetailModal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        event={selectedEvent}
      />
    </>
  );
}