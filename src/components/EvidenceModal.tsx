import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Violation } from "../data/mockData";
import { AlertCircle, CheckCircle2, HelpCircle } from "lucide-react";

interface EvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  violation: Violation | null;
}

export function EvidenceModal({ isOpen, onClose, violation }: EvidenceModalProps) {
  if (!violation) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Compliant':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Missed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Violation':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Uncertain':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Compliant':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'Missed':
      case 'Violation':
        return <AlertCircle className="w-4 h-4" />;
      case 'Uncertain':
        return <HelpCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Evidence Review</DialogTitle>
          <DialogDescription>
            Review the evidence and take appropriate action.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Video/Image placeholder */}
          {violation.thumbnail ? (
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <img 
                src={violation.thumbnail} 
                alt="Evidence" 
                className="w-full h-[600px] object-cover"
              />
            </div>
          ) : (
            <div className="bg-gray-900 rounded-lg h-[600px] flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="mb-2">🎥</div>
                <p>Video Evidence</p>
                <p className="text-sm">20-second clip</p>
              </div>
            </div>
          )}

          {/* AI Confidence */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600 mb-2">AI Confidence Level</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-[#2563EB] h-2 rounded-full" style={{ width: '87%' }} />
              </div>
              <span className="text-gray-900">87%</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="outline" className="text-red-600 hover:text-red-700">
            Flag Incorrect
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}