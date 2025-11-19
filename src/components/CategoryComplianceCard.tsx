import { Card } from "./ui/card";
import { SOP } from "../data/mockData";
import { Progress } from "./ui/progress";
import { Info, LineChart, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useCountAnimation } from "../hooks/useCountAnimation";
import { useState, useEffect } from "react";
import { AnimatedProgressBar } from "./AnimatedProgressBar";

interface CategoryComplianceCardProps {
  category: string;
  sops: SOP[];
  icon?: React.ReactNode;
  onSOPClick?: (sopName: string) => void;
  categoryTooltip?: string;
  sopTooltips?: { [sopName: string]: string };
  sopIcons?: { [sopName: string]: React.ReactNode };
  onSOPTrendClick?: (sop: SOP) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function CategoryComplianceCard({ category, sops, icon, onSOPClick, categoryTooltip, sopTooltips, sopIcons, onSOPTrendClick, isCollapsed, onToggleCollapse }: CategoryComplianceCardProps) {
  const categoryCompliance = Math.round(
    sops.reduce((acc, sop) => acc + sop.compliance, 0) / sops.length
  );

  // Calculate counts by status
  const compliantCount = sops.filter(sop => sop.compliance >= 85).length;
  const warningCount = sops.filter(sop => sop.compliance >= 70 && sop.compliance < 85).length;
  const needsAttentionCount = sops.filter(sop => sop.compliance < 70).length;

  // Animation states
  const [animatedCompliance, setAnimatedCompliance] = useState(0);
  const [animatedCompliantCount, setAnimatedCompliantCount] = useState(0);
  const [animatedWarningCount, setAnimatedWarningCount] = useState(0);
  const [animatedNeedsAttentionCount, setAnimatedNeedsAttentionCount] = useState(0);

  useEffect(() => {
    setAnimatedCompliance(categoryCompliance);
    setAnimatedCompliantCount(compliantCount);
    setAnimatedWarningCount(warningCount);
    setAnimatedNeedsAttentionCount(needsAttentionCount);
  }, [categoryCompliance, compliantCount, warningCount, needsAttentionCount]);

  return (
    <div className="space-y-6">
      {/* Category Header - Clickable for collapse */}
      <div 
        className="cursor-pointer hover:bg-gray-50 p-2 -m-2 rounded-lg transition-colors"
        onClick={onToggleCollapse}
      >
        {/* Single Row: Title, Compliance %, Status counts, Info, Chevron */}
        <div className="flex items-center gap-2">
          <h3 className="text-gray-900">{category}</h3>
          <span className={`px-2.5 py-0.5 rounded-full text-sm font-medium ${categoryCompliance >= 85 ? 'bg-emerald-50 text-emerald-700' : categoryCompliance >= 70 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'}`}>
            {categoryCompliance}%
          </span>
          
          {/* Status counts */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="h-3 bg-green-500" style={{ width: '2px' }}></div>
              <span className="text-gray-600">{useCountAnimation(animatedCompliantCount)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 bg-amber-500" style={{ width: '2px' }}></div>
              <span className="text-gray-600">{useCountAnimation(animatedWarningCount)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 bg-red-500" style={{ width: '2px' }}></div>
              <span className="text-gray-600">{useCountAnimation(animatedNeedsAttentionCount)}</span>
            </div>
          </div>
          
          {categoryTooltip && (
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Info className="w-3.5 h-3.5 text-gray-400 cursor-help flex-shrink-0" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-sm">{categoryTooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          
          <div className="flex-1"></div>
          
          {onToggleCollapse && (
            <div className="text-gray-500">
              {isCollapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
            </div>
          )}
        </div>
      </div>

      {/* SOP Cards Grid - 4 per row */}
      {!isCollapsed && (
        <div className="grid grid-cols-5 gap-3 mt-4">
          {sops.map((sop) => {
            // Determine color based on compliance
            const getComplianceColor = (compliance: number) => {
              if (compliance >= 85) return 'text-green-600';
              if (compliance >= 70) return 'text-amber-600';
              return 'text-red-600';
            };
            
            // Parse value and unit
            const getValueAndUnit = () => {
              let displayValue = sop.name.includes('%') ? `${sop.compliance}%` : (sop.actualValue || sop.totalEvents);
              const valueStr = String(displayValue);
              
              // Match number (including decimals and ratios) and unit separately
              const match = valueStr.match(/^([\d.:]+)\s*(.*)$/);
              
              if (match) {
                return { value: match[1], unit: match[2] };
              }
              
              return { value: valueStr, unit: '' };
            };
            
            const { value, unit } = getValueAndUnit();
            
            // Extract bracketed content for tooltip
            const getBracketContentAndCleanName = (name: string) => {
              const bracketMatch = name.match(/\(([^)]+)\)/);
              const bracketContent = bracketMatch ? bracketMatch[1] : null;
              const cleanName = name.replace(/\s*\([^)]+\)\s*/g, '').replace(/number of /gi, '').trim();
              return { cleanName, bracketContent };
            };
            
            const { cleanName, bracketContent } = getBracketContentAndCleanName(sop.name);
            
            // Get tooltip text - use bracketed content if available, otherwise use sopTooltips
            const tooltipText = bracketContent || sopTooltips?.[sop.name] || sopTooltips?.[cleanName];
            
            // Get icon for this SOP
            const sopIcon = sopIcons?.[sop.name];
            
            return (
              <Card 
                key={sop.id} 
                className="p-3 bg-white border-gray-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
                onClick={() => onSOPClick?.(sop.name)}
              >
                <div className="flex flex-col gap-2">
                  {/* SOP Name with Icon */}
                  <div className="flex items-start gap-1.5 min-h-[40px]">
                    {sopIcon && (
                      <div className="flex-shrink-0">
                        {sopIcon}
                      </div>
                    )}
                    <span className="text-sm text-gray-700 flex-1 text-[13px]">
                      {cleanName}
                    </span>
                    {tooltipText && (
                      <TooltipProvider>
                        <Tooltip delayDuration={200}>
                          <TooltipTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Info className="w-3.5 h-3.5 text-gray-400 cursor-help flex-shrink-0 mt-0.5" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs text-sm">{tooltipText}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  
                  {/* Value and Trend Button Container */}
                  <div className="flex items-center justify-between">
                    {/* Color-coded Value - hidden on hover */}
                    <span className={`group-hover:opacity-0 transition-opacity ${getComplianceColor(sop.compliance)} flex items-baseline gap-0.5`}>
                      <span style={{ fontSize: '24px', fontWeight: '400' }}>{value}</span>
                      {unit && <span style={{ fontSize: '12px', fontWeight: '400' }}>{unit}</span>}
                    </span>
                    
                    {/* View Trend Button - visible on hover */}
                    {onSOPTrendClick && (
                      <Button 
                        variant="outline"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-xs h-auto py-1 absolute"
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          onSOPTrendClick(sop); 
                        }}
                      >
                        View Trend
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}