import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface EvidenceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: any;
}

export function EvidenceDetailModal({ isOpen, onClose, event }: EvidenceDetailModalProps) {
  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[60vw] sm:max-w-[60vw] w-full p-0 gap-0 overflow-hidden">
        <DialogTitle className="sr-only">Evidence Detail for {event.name}</DialogTitle>
        <DialogDescription className="sr-only">
          Detailed evidence information including AI detection data and visual proof
        </DialogDescription>
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200 bg-[#f7fafc]">
          <h2 className="text-gray-900 mb-1">{event.name}</h2>
          <div className="flex items-center gap-3 text-[13px] text-gray-600">
            <span>{event.time}</span>
            <span>•</span>
            <span>{event.phase}</span>
            <span>•</span>
            <span className={`inline-flex items-center px-2 py-0.5 ${
              event.status === "Compliant" ? "bg-green-100 text-green-800 border-green-200" :
              event.status === "Violated" ? "bg-red-100 text-red-800 border-red-200" :
              "bg-gray-100 text-gray-800 border-gray-200"
            } text-[11px] rounded border`}>
              {event.status}
            </span>
          </div>
        </div>

        <div className="bg-[#f7fafc] max-h-[calc(80vh-80px)] overflow-y-auto">
          {/* Evidence Image */}
          <div className="px-5 py-4">
            <h3 className="text-[13px] text-gray-700 mb-3">Visual Evidence</h3>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <ImageWithFallback
                src={event.thumbnail}
                alt={event.name}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* AI Detection Details */}
          <div className="px-5 pb-4">
            <h3 className="text-[13px] text-gray-700 mb-3">AI Detection Details</h3>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[11px] text-gray-600 mb-1">Confidence Score</div>
                  <div className="text-[15px] text-gray-900">
                    {event.status === "Violated" ? "87%" : "94%"}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-gray-600 mb-1">Detection Model</div>
                  <div className="text-[15px] text-gray-900">YOLOv8-Medical v2.3</div>
                </div>
                <div>
                  <div className="text-[11px] text-gray-600 mb-1">Frame Timestamp</div>
                  <div className="text-[15px] text-gray-900">{event.time}:24</div>
                </div>
                <div>
                  <div className="text-[11px] text-gray-600 mb-1">Camera Source</div>
                  <div className="text-[15px] text-gray-900">Bed-01-Overhead</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-[11px] text-gray-600 mb-2">Detection Notes</div>
                <p className="text-[13px] text-gray-900 leading-relaxed">
                  {event.status === "Violated" 
                    ? "AI detected potential non-compliance. Staff member's hand position did not match expected protocol requirements. Manual review recommended."
                    : "AI confirmed full compliance with SOP protocol. All required steps detected and validated within acceptable parameters."}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-5 pb-5">
            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-[#2563EB] text-white text-[13px] rounded hover:bg-[#1d4ed8] transition-colors">
                Download Evidence
              </button>
              <button className="flex-1 px-4 py-2 bg-white text-gray-900 text-[13px] border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                Report Issue
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}