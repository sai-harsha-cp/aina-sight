import { Card } from "./ui/card";
import { TrendingUp, TrendingDown, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useCountAnimation } from "../hooks/useCountAnimation";
import { useState, useEffect } from "react";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  tintColor?: string;
  tooltipText?: string;
  onTrendClick?: () => void;
}

export function KPICard({ title, value, change, icon, tintColor = 'bg-white', tooltipText, onTrendClick }: KPICardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;
  
  // Check if value is a ratio (contains ":")
  const isRatio = typeof value === 'string' && value.includes(':');
  
  // Parse numeric value for animation
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]/g, '')) : value;
  const isNumeric = !isNaN(numericValue) && !isRatio;
  
  // Animate the numeric value
  const animatedValue = useCountAnimation(isNumeric ? numericValue : 0, 1000);
  
  // Animate the change percentage
  const rawAnimatedChange = useCountAnimation(change || 0, 800);
  const animatedChange = Math.round(rawAnimatedChange);
  
  // For displaying the value with original formatting
  const displayValue = isNumeric 
    ? (typeof value === 'string' && value.includes('%') 
        ? `${animatedValue}%` 
        : animatedValue)
    : value;

  return (
    <Card 
      className={`p-6 ${tintColor} border-gray-200 transition-all duration-300 hover:shadow-md ${onTrendClick ? 'cursor-pointer hover:shadow-lg' : ''}`}
      onClick={onTrendClick}
    >
      <div className="flex items-stretch gap-4">
        {icon && (
          <div className="flex-shrink-0 flex items-center animate-in fade-in slide-in-from-left-3 duration-500">
            {icon}
          </div>
        )}
        <div className="flex-1 min-h-[2.5rem] flex flex-col justify-center">
          <div className="flex items-center gap-1.5 mb-1 animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="text-gray-600 text-[14px]">{title}</p>
            {tooltipText && (
              <TooltipProvider>
                <Tooltip delayDuration={200}>
                  <TooltipTrigger asChild>
                    <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-sm">{tooltipText}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="flex items-baseline gap-3">
            <p className="text-2xl text-gray-900 font-bold font-normal animate-in fade-in slide-in-from-bottom-2 duration-500 text-[24px]">
              {displayValue}
            </p>
            {change !== undefined && change !== 0 && (
              <div className="flex items-center gap-1 animate-in fade-in slide-in-from-right-2 duration-700">
                {isPositive && <TrendingUp className="w-3.5 h-3.5 text-green-600" />}
                {isNegative && <TrendingDown className="w-3.5 h-3.5 text-red-600" />}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}