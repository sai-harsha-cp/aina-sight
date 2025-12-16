import svgPaths from "./svg-g77hg177wi";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { Bed, Clock, Users, Activity, XCircle, Settings, HelpCircle, Info, Building2, Camera, Zap, Cog, BedDouble, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Card as UICard } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";

// New exported component for Timeline View date filter
export function TimelineDateFilter({ 
  selectedDate, 
  onDateChange 
}: { 
  selectedDate?: string; 
  onDateChange?: (date: string) => void;
}) {
  const days = [
    { day: "Tue", date: "28" },
    { day: "Wed", date: "29" },
    { day: "Thu", date: "30" },
    { day: "Fri", date: "31" },
    { day: "Sat", date: "1" },
    { day: "Sun", date: "2" },
    { day: "Mon", date: "3" },
  ];

  return (
    <div className="flex items-center gap-2">
      {/* Month Selector */}
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg border border-gray-200">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 20 20">
          <path d="M6.66667 1.66667V5" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 1.66667V5" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1da67b80} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M2.5 8.33333H17.5" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </svg>
        <span className="text-sm text-gray-700">Nov 2025</span>
        <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 16 16">
          <path d="M4 6L8 10L12 6" stroke="#718096" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </svg>
      </div>

      {/* Navigation Arrow Left */}
      <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors opacity-50">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
          <path d="M10 12L6 8L10 4" stroke="#4A5565" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </svg>
      </button>

      {/* Date Chips - Horizontal Layout */}
      <div className="flex items-center gap-2">
        {days.map((day, index) => {
          const isSelected = selectedDate === day.date || (!selectedDate && index === 2); // Default to Thursday (30)
          return (
            <button
              key={index}
              onClick={() => onDateChange?.(day.date)}
              className={`px-3 py-2 rounded-lg text-sm transition-all border ${
                isSelected
                  ? 'bg-[#2563EB] text-white border-[#2563EB]'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <span className={isSelected ? 'text-white' : 'text-gray-600'}>{day.day}</span>
                <span>{day.date}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Navigation Arrow Right */}
      <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
          <path d="M6 12L10 8L6 4" stroke="#4A5565" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </svg>
      </button>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <Bed className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
    </div>
  );
}

function DashboardView() {
  return (
    <div className="bg-gray-100 relative rounded-[10px] shrink-0 size-[40px]" data-name="DashboardView">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <Icon4 />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[21px] relative shrink-0 w-[222.75px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[222.75px]">
        <div className="absolute left-0 top-[0.5px] flex items-center gap-1.5">
          <p className="font-['Zoho_Puvi:Regular',sans-serif] leading-[21px] not-italic text-[#4a5565] text-[14px] text-nowrap whitespace-pre">Bed Occupancy</p>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="flex items-center">
                <Info className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">Percentage of beds currently occupied by patients receiving dialysis treatment.</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[32px] left-0 top-0 w-[47.086px]" data-name="Paragraph">
      <p className="absolute font-['Zoho_Puvi:Regular',sans-serif] leading-[32px] left-0 not-italic text-[#101828] text-nowrap top-0 whitespace-pre text-[20px]">58%</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[32px] relative shrink-0 w-[222.75px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[222.75px]">
        <Paragraph1 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="basis-0 grow h-[57px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[57px] items-start justify-center relative w-full">
        <Paragraph />
        <Container32 />
      </div>
    </div>
  );
}

function KpiCard() {
  return (
    <div className="h-[73px] relative shrink-0 w-[278.75px]" data-name="KPICard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[73px] items-center relative w-[278.75px]">
        <DashboardView />
        <Container33 />
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="[grid-area:1_/_1] bg-white relative rounded-[14px] self-start shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start pl-[25px] pr-px py-[9px] relative w-full">
          <KpiCard />
        </div>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <Clock className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
    </div>
  );
}

function DashboardView1() {
  return (
    <div className="bg-gray-100 relative rounded-[10px] shrink-0 size-[40px]" data-name="DashboardView">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <Icon5 />
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[21px] relative shrink-0 w-[222.75px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[222.75px]">
        <div className="absolute left-0 top-[0.5px] flex items-center gap-1.5">
          <p className="font-['Zoho_Puvi:Regular',sans-serif] leading-[21px] not-italic text-[#4a5565] text-[14px] text-nowrap whitespace-pre">Avg. Session Duration</p>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="flex items-center">
                <Info className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">Average duration of dialysis sessions across all active beds for the selected time period.</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[32px] left-0 top-0 w-[23.18px]" data-name="Paragraph">
      <p className="absolute font-['Zoho_Puvi:Regular',sans-serif] leading-[32px] left-0 not-italic text-[#101828] text-[20px] text-nowrap top-0 whitespace-pre">3h 58min</p>
    </div>
  );
}

function Container34() {
  return (
    <div className="h-[32px] relative shrink-0 w-[222.75px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[222.75px]">
        <Paragraph3 />
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="basis-0 grow h-[57px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[57px] items-start justify-center relative w-full">
        <Paragraph2 />
        <Container34 />
      </div>
    </div>
  );
}

function KpiCard1() {
  return (
    <div className="h-[73px] relative shrink-0 w-[278.75px]" data-name="KPICard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[73px] items-center relative w-[278.75px]">
        <DashboardView1 />
        <Container35 />
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div className="[grid-area:1_/_2] bg-white relative rounded-[14px] self-start shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start pl-[25px] pr-px py-[9px] relative w-full">
          <KpiCard1 />
        </div>
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <Users className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
    </div>
  );
}

function DashboardView2() {
  return (
    <div className="bg-gray-100 relative rounded-[10px] shrink-0 size-[40px]" data-name="DashboardView">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <Icon6 />
      </div>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[21px] relative shrink-0 w-[222.75px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[222.75px]">
        <div className="absolute left-0 top-[0.5px] flex items-center gap-1.5">
          <p className="font-['Zoho_Puvi:Regular',sans-serif] leading-[21px] not-italic text-[#4a5565] text-[14px] text-nowrap whitespace-pre">Patients Served</p>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="flex items-center">
                <Info className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">Total number of unique patients who received dialysis treatment during the selected time period.</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute h-[32px] left-0 top-0 w-[14.242px]" data-name="Paragraph">
      <p className="absolute font-['Zoho_Puvi:Regular',sans-serif] leading-[32px] left-0 not-italic text-[#101828] text-[20px] text-nowrap top-0 whitespace-pre">11</p>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[32px] relative shrink-0 w-[222.75px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[222.75px]">
        <Paragraph5 />
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="basis-0 grow h-[57px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[57px] items-start justify-center relative w-full">
        <Paragraph4 />
        <Container36 />
      </div>
    </div>
  );
}

function KpiCard2() {
  return (
    <div className="h-[73px] relative shrink-0 w-[278.75px]" data-name="KPICard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[73px] items-center relative w-[278.75px]">
        <DashboardView2 />
        <Container37 />
      </div>
    </div>
  );
}

function Card2() {
  return (
    <div className="[grid-area:1_/_3] bg-white relative rounded-[14px] self-start shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start pl-[25px] pr-px py-[9px] relative w-full">
          <KpiCard2 />
        </div>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <Activity className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
    </div>
  );
}

function DashboardView3() {
  return (
    <div className="bg-gray-100 relative rounded-[10px] shrink-0 size-[40px]" data-name="DashboardView">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <Icon7 />
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[21px] relative shrink-0 w-[222.75px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[222.75px]">
        <div className="absolute left-0 top-[0.5px] flex items-center gap-1.5">
          <p className="font-['Zoho_Puvi:Regular',sans-serif] leading-[21px] not-italic text-[#4a5565] text-[14px] text-nowrap whitespace-pre">Total Sessions</p>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="flex items-center">
                <Info className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">Total number of dialysis sessions completed across all beds during the selected time period.</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[32px] relative shrink-0 w-[93.438px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[93.438px]">
        <p className="absolute font-['Zoho_Puvi:Regular',sans-serif] leading-[32px] left-0 not-italic text-[#101828] text-[20px] text-nowrap top-0 whitespace-pre">11</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="basis-0 grow h-[57px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[57px] items-start justify-center relative w-full">
        <Paragraph6 />
        <Paragraph7 />
      </div>
    </div>
  );
}

function KpiCard3() {
  return (
    <div className="h-[73px] relative shrink-0 w-[278.75px]" data-name="KPICard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[73px] items-center relative w-[278.75px]">
        <DashboardView3 />
        <Container38 />
      </div>
    </div>
  );
}

function Card3() {
  return (
    <div className="[grid-area:1_/_4] bg-white relative rounded-[14px] self-start shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start pl-[25px] pr-px py-[9px] relative w-full">
          <KpiCard3 />
        </div>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <TooltipProvider>
      <div className="gap-[24px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[91px] relative shrink-0 w-full" data-name="Container">
        <Card />
        <Card1 />
        <Card2 />
        <Card3 />
      </div>
    </TooltipProvider>
  );
}

function Container40() {
  return (
    <div className="h-[16px] relative shrink-0 w-[64px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] w-[64px]" />
    </div>
  );
}

function Container41() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[47.9px] not-italic text-[#6a7282] text-[12px] text-center text-nowrap top-px translate-x-[-50%] whitespace-pre">05:00</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[47.79px] not-italic text-[#6a7282] text-[12px] text-center text-nowrap top-px translate-x-[-50%] whitespace-pre">06:00</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[47.87px] not-italic text-[#6a7282] text-[12px] text-center text-nowrap top-px translate-x-[-50%] whitespace-pre">07:00</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[47.77px] not-italic text-[#6a7282] text-[12px] text-center text-nowrap top-px translate-x-[-50%] whitespace-pre">08:00</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[47.79px] not-italic text-[#6a7282] text-[12px] text-center text-nowrap top-px translate-x-[-50%] whitespace-pre">09:00</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[47.83px] not-italic text-[#6a7282] text-[12px] text-center text-nowrap top-px translate-x-[-50%] whitespace-pre">10:00</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[47.82px] not-italic text-[#6a7282] text-[12px] text-center text-nowrap top-px translate-x-[-50%] whitespace-pre">11:00</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[47.98px] not-italic text-[#6a7282] text-[12px] text-center text-nowrap top-px translate-x-[-50%] whitespace-pre">12:00</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[47.84px] not-italic text-[#6a7282] text-[12px] text-center text-nowrap top-px translate-x-[-50%] whitespace-pre">13:00</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[47.74px] not-italic text-[#6a7282] text-[12px] text-center text-nowrap top-px translate-x-[-50%] whitespace-pre">14:00</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[47.9px] not-italic text-[#6a7282] text-[12px] text-center text-nowrap top-px translate-x-[-50%] whitespace-pre">15:00</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[47.78px] not-italic text-[#6a7282] text-[12px] text-center text-nowrap top-px translate-x-[-50%] whitespace-pre">16:00</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[47.75px] not-italic text-[#6a7282] text-[12px] text-center text-nowrap top-px translate-x-[-50%] whitespace-pre">17:00</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start justify-between pl-0 pr-[0.008px] py-0 relative w-full">
          <Container41 />
          <Container42 />
          <Container43 />
          <Container44 />
          <Container45 />
          <Container46 />
          <Container47 />
          <Container48 />
          <Container49 />
          <Container50 />
          <Container51 />
          <Container52 />
          <Container53 />
        </div>
      </div>
    </div>
  );
}

function MultiBedTimeline() {
  return (
    <div className="sticky top-[140px] z-40 bg-white rounded-t-[16px] content-stretch flex items-start px-[24px] pt-[16px] pb-[12px] border-b border-gray-100" data-name="MultiBedTimeline" style={{ boxShadow: '0 2px 8px -2px rgba(0,0,0,0.08)' }}>
      <Container40 />
      <Container54 />
    </div>
  );
}

function Text() {
  return (
    <div className="h-[16px] relative shrink-0 w-[70.203px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#364153] text-[12px] text-nowrap top-px whitespace-pre">Compliance:</p>
    </div>
  );
}

function Container55() {
  return (
    <div className="bg-[#d0fae5] relative rounded-[4px] shrink-0 size-[16px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#5ee9b5] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[16px]" />
    </div>
  );
}

function Text1() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-px whitespace-pre">High (≥85%)</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex gap-[8px] h-[16px] items-center relative shrink-0 w-[96.531px]" data-name="Container">
      <Container55 />
      <Text1 />
    </div>
  );
}

function Container57() {
  return (
    <div className="bg-[#ffedd4] relative rounded-[4px] shrink-0 size-[16px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#ffb86a] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[16px]" />
    </div>
  );
}

function Text2() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-px whitespace-pre">Moderate (75-84%)</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex gap-[8px] h-[16px] items-center relative shrink-0 w-[136.945px]" data-name="Container">
      <Container57 />
      <Text2 />
    </div>
  );
}

function Container59() {
  return (
    <div className="bg-[#ffe2e2] relative rounded-[4px] shrink-0 size-[16px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#ffa2a2] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[16px]" />
    </div>
  );
}

function Text3() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-px whitespace-pre">{`Low (<75%)`}</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex gap-[8px] h-[16px] items-center relative shrink-0 w-[92.008px]" data-name="Container">
      <Container59 />
      <Text3 />
    </div>
  );
}

function Container61() {
  return <div className="bg-[#d1d5dc] h-[16px] shrink-0 w-px" data-name="Container" />;
}

function Container62() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 size-[16px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[16px]" />
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[16px] relative shrink-0 w-[85px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[85px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-px whitespace-pre">Patient Waiting</p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex gap-[8px] h-[16px] items-center relative shrink-0" data-name="Container">
      <Container62 />
      <Text4 />
    </div>
  );
}

function Container64() {
  return (
    <div className="bg-[#e6e6e6] relative rounded-[4px] shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[16px]" />
    </div>
  );
}

function Text5() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-px whitespace-pre">Patient on Bed</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex gap-[8px] h-[16px] items-center relative shrink-0 w-[92.008px]" data-name="Container">
      <Container64 />
      <Text5 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex gap-[35px] items-center left-0 top-[17px]">
      <Text />
      <Container56 />
      <Container58 />
      <Container60 />
      <Container61 />
      <Container63 />
      <Container65 />
    </div>
  );
}

function MultiBedTimeline1() {
  return (
    <div className="h-[33px] px-[24px]" data-name="MultiBedTimeline">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame1 />
    </div>
  );
}

function Container66() {
  return (
    <div className="absolute h-[20px] left-0 top-[22px] w-[64px]" data-name="Container">
      <p className="absolute font-['Zoho_Puvi:Regular',sans-serif] leading-[21px] left-0 not-italic text-[#4a5565] text-[14px] top-[32.5px] w-auto">Bed 1</p>
    </div>
  );
}

function Container67() {
  return <div className="absolute h-0 left-px top-px right-px" data-name="Container" />;
}

function Container68() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-full" />
    </div>
  );
}

function Container69() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-full" />
    </div>
  );
}

function Container70() {
  return (
    <div className="absolute box-border content-stretch flex h-[129px] items-start left-px pl-0 pr-[0.031px] py-0 top-px right-px" data-name="Container">
      {[...Array(12).keys()].map((_, i) => (
        <Container68 key={i} />
      ))}
      <Container69 />
    </div>
  );
}

function SlotClone() {
  return <div className="absolute bg-[#dedede] h-[42px] left-[99px] top-[2px] w-[36px]" data-name="SlotClone" />;
}

function MultiBedTimeline2() {
  return (
    <div className="relative shrink-0" data-name="MultiBedTimeline">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] items-center justify-center overflow-clip relative rounded-[inherit]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] not-italic relative shrink-0 text-[#364153] text-[12px] text-nowrap tracking-[0.167px] whitespace-pre">3h 48min</p>
      </div>
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-[#00bc7d] h-[14px] relative rounded-[10px] shrink-0 w-[28.609px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[14px] items-center justify-center overflow-clip px-[5px] py-px relative rounded-[inherit] w-[28.609px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[8px] text-nowrap text-white tracking-[0.2057px] whitespace-pre">95%</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function SlotClone1() {
  return (
    <div className="absolute bg-[#d0fae5] box-border content-stretch flex gap-[6px] h-[42px] items-center justify-center left-[135.06px] px-[2px] py-0 top-[2px] w-[398.844px]" data-name="SlotClone">
      <div aria-hidden="true" className="absolute border-[#5ee9b5] border-[0px_2px] border-solid inset-0 pointer-events-none" />
      <MultiBedTimeline2 />
      <Badge />
    </div>
  );
}

function SlotClone2() {
  return <div className="absolute bg-[#e6e6e6] h-[42px] left-[534px] top-[2px] w-[52px]" data-name="SlotClone" />;
}

function Container71({ onPillClick }: { onPillClick?: (bedNumber: string, patientId: string) => void }) {
  return (
    <div className="absolute bg-white h-[46px] left-[108px] rounded-[12px] top-[9px] w-[664px]" data-name="Container">
      <TooltipProvider>
        <div className="h-[46px] overflow-clip relative rounded-[inherit] w-[664px]">
          <SlotClone />
          <SlotClone1 />
          <SlotClone2 />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div onClick={() => onPillClick?.('Bed 01', 'P-0001')} className="absolute h-[42px] left-[2px] top-[2px] w-[97px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Patient Waiting</p>
                <p className="text-gray-500">Status: Off Bed</p>
                <p className="text-gray-500">Duration: ~1h 39min</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div onClick={() => onPillClick?.('Bed 01', 'P-0001')} className="absolute h-[42px] left-[99px] top-[2px] w-[36px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Patient on Bed</p>
                <p className="text-gray-500">Status: Pre-Dialysis</p>
                <p className="text-gray-500">Duration: ~36 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div onClick={() => onPillClick?.('Bed 01', 'P-0001')} className="absolute h-[42px] left-[135.06px] top-[2px] w-[398.844px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Dialysis Session</p>
                <p className="text-gray-500">Duration: 3h 48min</p>
                <p className="text-gray-500">Compliance: 95%</p>
                <p className="text-gray-500">Status: High Compliance</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div onClick={() => onPillClick?.('Bed 01', 'P-0001')} className="absolute h-[42px] left-[534px] top-[2px] w-[52px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Patient on Bed</p>
                <p className="text-gray-500">Status: Post-Dialysis</p>
                <p className="text-gray-500">Duration: ~52 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function SlotClone3() {
  return <div className="absolute bg-[#e6e6e6] h-[42px] left-[99px] top-[2px] w-[36px]" data-name="SlotClone" />;
}

function MultiBedTimeline3() {
  return (
    <div className="relative shrink-0" data-name="MultiBedTimeline">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] items-center justify-center overflow-clip relative rounded-[inherit]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] not-italic relative shrink-0 text-[#364153] text-[12px] text-nowrap tracking-[0.167px] whitespace-pre">4h 02min</p>
      </div>
    </div>
  );
}

function Badge1() {
  return (
    <div className="bg-[#00bc7d] h-[14px] relative rounded-[10px] shrink-0 w-[28.609px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[14px] items-center justify-center overflow-clip px-[5px] py-px relative rounded-[inherit] w-[28.609px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[8px] text-nowrap text-white tracking-[0.2057px] whitespace-pre">92%</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function SlotClone4() {
  return (
    <div className="absolute bg-[#d0fae5] box-border content-stretch flex gap-[6px] h-[42px] items-center justify-center left-[135.06px] px-[2px] py-0 top-[2px] w-[398.844px]" data-name="SlotClone">
      <div aria-hidden="true" className="absolute border-[#5ee9b5] border-[0px_2px] border-solid inset-0 pointer-events-none" />
      <MultiBedTimeline3 />
      <Badge1 />
    </div>
  );
}

function SlotClone5() {
  return <div className="absolute bg-[#e6e6e6] h-[42px] left-[534px] top-[2px] w-[52px]" data-name="SlotClone" />;
}

function Container72() {
  return (
    <div className="absolute bg-white h-[46px] left-[661px] rounded-[12px] top-[77px] w-[664px]" data-name="Container">
      <TooltipProvider>
        <div className="h-[46px] overflow-clip relative rounded-[inherit] w-[664px]">
          <SlotClone3 />
          <SlotClone4 />
          <SlotClone5 />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[2px] top-[2px] w-[97px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Patient Waiting</p>
                <p className="text-gray-500">Status: Off Bed</p>
                <p className="text-gray-500">Duration: ~1h 39min</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[99px] top-[2px] w-[36px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Patient on Bed</p>
                <p className="text-gray-500">Status: Pre-Dialysis</p>
                <p className="text-gray-500">Duration: ~36 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[135.06px] top-[2px] w-[398.844px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Dialysis Session</p>
                <p className="text-gray-500">Duration: 4h 02min</p>
                <p className="text-gray-500">Compliance: 92%</p>
                <p className="text-gray-500">Status: High Compliance</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[534px] top-[2px] w-[52px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Patient on Bed</p>
                <p className="text-gray-500">Status: Post-Dialysis</p>
                <p className="text-gray-500">Duration: ~52 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[586px] top-[2px] w-[76px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Bed Empty</p>
                <p className="text-gray-500">Status: Available</p>
                <p className="text-gray-500">Duration: ~1h 16min</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container73({ onPillClick }: { onPillClick?: (bedNumber: string, patientId: string) => void }) {
  return (
    <div className="absolute bg-[rgba(249,250,251,0.5)] h-[131px] left-[64px] rounded-[12px] top-0 right-0" data-name="Container">
      <div className="h-[131px] overflow-clip relative rounded-[inherit] w-full">
        <Container67 />
        <Container70 />
        <Container71 onPillClick={onPillClick} />
        <Container72 />
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container74({ onPillClick, onEvidenceClick }: { onPillClick?: (bedNumber: string, patientId: string) => void; onEvidenceClick?: (violation: any) => void }) {
  // Sample violation data for markers
  const marker1Evidence = {
    id: 'V001',
    timestamp: '10:15 AM',
    bed: 'Bed 1',
    sop: 'Hand Hygiene Before Patient Contact',
    category: 'Pre-Dialysis Preparation',
    status: 'Compliant' as const,
    patientId: 'Guest-101',
    thumbnail: 'https://images.unsplash.com/photo-1758653500328-1c4474a8adfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGhhbmQlMjB3YXNoaW5nfGVufDF8fHx8MTc2Mjc1Njg0Mnww&ixlib=rb-4.1.0&q=80&w=400'
  };
  
  const marker2Evidence = {
    id: 'V002',
    timestamp: '11:45 AM',
    bed: 'Bed 1',
    sop: 'Machine Preparation & Priming',
    category: 'Pre-Dialysis Preparation',
    status: 'Uncertain' as const,
    patientId: 'Guest-101',
    thumbnail: 'https://images.unsplash.com/photo-1630128295920-627fb9aff5a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFseXNpcyUyMG1hY2hpbmV8ZW58MXx8fHwxNzYyNzU2ODQyfDA&ixlib=rb-4.1.0&q=80&w=400'
  };
  
  return (
    <div className="h-[131px] relative shrink-0 w-full min-w-0" data-name="Container">
      <Container66 />
      <Container73 onPillClick={onPillClick} />
      
      {/* Bed 1: Compliant - Hand Hygiene Verified */}
      <div className="absolute left-[20.3%] top-0 bottom-0 w-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="relative flex items-center justify-center h-full">
          <div className="absolute top-0 bottom-0 w-0.5 bg-[#5ee9b5]"></div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-6 h-6 bg-[#5ee9b5] rounded-full flex items-center justify-center border-2 border-white shadow-md pointer-events-auto relative z-10 cursor-pointer">
                  <Settings className="w-3 h-3 text-white" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="p-0 border-0 shadow-lg">
                <div className="text-[12px]">
                  <div 
                    className="w-[200px] h-[150px] rounded-t-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => onEvidenceClick?.(marker1Evidence)}
                  >
                    <img 
                      src={marker1Evidence.thumbnail} 
                      alt="Evidence thumbnail" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 bg-white rounded-b-md">
                    <p className="font-medium text-[#00bc7d]">✓ Hand Hygiene Compliant</p>
                    <p className="text-gray-500 mt-1">Time: 10:15 AM</p>
                    <p className="text-gray-400 text-[10px] mt-2">Click thumbnail to view evidence</p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Bed 1: Warning - Dialyzer Priming Delayed */}
      <div className="absolute left-[50%] top-0 bottom-0 w-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="relative flex items-center justify-center h-full">
          <div className="absolute top-0 bottom-0 w-0.5 bg-[#ffb86a]"></div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-6 h-6 bg-[#ffb86a] rounded-full flex items-center justify-center border-2 border-white shadow-md pointer-events-auto relative z-10 cursor-pointer">
                  <Clock className="w-3 h-3 text-white" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="p-0 border-0 shadow-lg">
                <div className="text-[12px]">
                  <div 
                    className="w-[200px] h-[150px] rounded-t-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => onEvidenceClick?.(marker2Evidence)}
                  >
                    <img 
                      src={marker2Evidence.thumbnail} 
                      alt="Evidence thumbnail" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 bg-white rounded-b-md">
                    <p className="font-medium text-[#ff8c00]">⚠ Dialyzer Priming Delayed</p>
                    <p className="text-gray-500 mt-1">Expected: 11:45 AM</p>
                    <p className="text-gray-500">Actual: 11:52 AM (7 min delay)</p>
                    <p className="text-gray-400 text-[10px] mt-2">Click thumbnail to view evidence</p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="absolute h-[20px] left-0 top-[22px] w-[64px]" data-name="Container">
      <p className="absolute font-['Zoho_Puvi:Regular',sans-serif] leading-[21px] left-0 not-italic text-[#4a5565] text-[14px] top-[3.5px] w-[38px]">Bed 2</p>
    </div>
  );
}

function Container76() {
  return <div className="absolute h-0 left-px top-px right-px" data-name="Container" />;
}

function Container77() {
  return (
    <div className="basis-0 grow h-[62px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[62px] w-full" />
    </div>
  );
}

function Container78() {
  return (
    <div className="basis-0 grow h-[62px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[62px] w-full" />
    </div>
  );
}

function Container79() {
  return (
    <div className="absolute box-border content-stretch flex h-[62px] items-start left-px pl-0 pr-[0.031px] py-0 top-px right-px" data-name="Container">
      {[...Array(12).keys()].map((_, i) => (
        <Container77 key={i} />
      ))}
      <Container78 />
    </div>
  );
}

function SlotClone6() {
  return <div className="absolute bg-[#e6e6e6] h-[42px] left-[57px] top-[2px] w-[29px]" data-name="SlotClone" />;
}

function MultiBedTimeline4() {
  return (
    <div className="relative shrink-0" data-name="MultiBedTimeline">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] items-center justify-center overflow-clip relative rounded-[inherit]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] not-italic relative shrink-0 text-[#364153] text-[12px] text-nowrap tracking-[0.167px] whitespace-pre">3h 45min</p>
      </div>
    </div>
  );
}

function Badge2() {
  return (
    <div className="bg-[#00bc7d] h-[14px] relative rounded-[10px] shrink-0 w-[28.836px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[14px] items-center justify-center overflow-clip px-[5px] py-px relative rounded-[inherit] w-[28.836px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[8px] text-nowrap text-white tracking-[0.2057px] whitespace-pre">88%</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function SlotClone7() {
  return (
    <div className="absolute bg-[#d0fae5] box-border content-stretch flex gap-[6px] h-[42px] items-center justify-center left-[85.58px] px-[2px] py-0 top-[2px] w-[402.352px]" data-name="SlotClone">
      <div aria-hidden="true" className="absolute border-[#5ee9b5] border-[0px_2px] border-solid inset-0 pointer-events-none" />
      <MultiBedTimeline4 />
      <Badge2 />
    </div>
  );
}

function SlotClone8() {
  return <div className="absolute bg-[#e6e6e6] left-[488px] size-[42px] top-[2px]" data-name="SlotClone" />;
}

function Container80({ onPillClick }: { onPillClick?: (bedNumber: string, patientId: string) => void }) {
  return (
    <div className="absolute bg-white h-[46px] left-[341px] rounded-[12px] top-[9px] w-[564px]" data-name="Container">
      <TooltipProvider>
        <div className="h-[46px] overflow-clip relative rounded-[inherit] w-[564px]">
          <SlotClone6 />
          <SlotClone7 />
          <SlotClone8 />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div onClick={() => onPillClick?.('Bed 02', 'P-0002')} className="absolute h-[42px] left-[2px] top-[2px] w-[55px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Patient Waiting</p>
                <p className="text-gray-500">Status: Off Bed</p>
                <p className="text-gray-500">Duration: ~57 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div onClick={() => onPillClick?.('Bed 02', 'P-0002')} className="absolute h-[42px] left-[57px] top-[2px] w-[29px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Patient on Bed</p>
                <p className="text-gray-500">Status: Pre-Dialysis</p>
                <p className="text-gray-500">Duration: ~29 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div onClick={() => onPillClick?.('Bed 02', 'P-0002')} className="absolute h-[42px] left-[85.58px] top-[2px] w-[402.352px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Dialysis Session</p>
                <p className="text-gray-500">Duration: 3h 45min</p>
                <p className="text-gray-500">Compliance: 88%</p>
                <p className="text-gray-500">Status: High Compliance</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div onClick={() => onPillClick?.('Bed 02', 'P-0002')} className="absolute h-[42px] left-[488px] top-[2px] w-[42px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Patient on Bed</p>
                <p className="text-gray-500">Status: Post-Dialysis</p>
                <p className="text-gray-500">Duration: ~42 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div onClick={() => onPillClick?.('Bed 02', 'P-0002')} className="absolute h-[42px] left-[530px] top-[2px] w-[32px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Bed Empty</p>
                <p className="text-gray-500">Status: Available</p>
                <p className="text-gray-500">Duration: ~32 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container81({ onPillClick }: { onPillClick?: (bedNumber: string, patientId: string) => void }) {
  return (
    <div className="absolute bg-[rgba(249,250,251,0.5)] h-[64px] left-[64px] rounded-[12px] top-0 right-0" data-name="Container">
      <div className="h-[64px] overflow-clip relative rounded-[inherit] w-full">
        <Container76 />
        <Container79 />
        <Container80 onPillClick={onPillClick} />
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container82({ onPillClick, onEvidenceClick }: { onPillClick?: (bedNumber: string, patientId: string) => void; onEvidenceClick?: (violation: any) => void }) {
  const markerEvidence = {
    id: 'V005',
    timestamp: '09:32 AM',
    bed: 'Bed 2',
    sop: 'Patient Identity Verification',
    category: 'Pre-Dialysis Preparation',
    status: 'Compliant' as const,
    patientId: 'Guest-102',
    thumbnail: 'https://images.unsplash.com/photo-1739185069005-8cb46fef2702?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXRpZW50JTIwaWRlbnRpZmljYXRpb24lMjBob3NwaXRhbHxlbnwxfHx8fDE3NjI3NjI5Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  };

  return (
    <div className="h-[64px] relative shrink-0 w-full min-w-0" data-name="Container">
      <Container75 />
      <Container81 onPillClick={onPillClick} />
      
      {/* Bed 2: Compliant - Patient Identity Verified */}
      <div className="absolute left-[25%] top-0 bottom-0 w-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="relative flex items-center justify-center h-full">
          <div className="absolute top-0 bottom-0 w-0.5 bg-[#5ee9b5]"></div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-6 h-6 bg-[#5ee9b5] rounded-full flex items-center justify-center border-2 border-white shadow-md pointer-events-auto relative z-10 cursor-pointer">
                  <Users className="w-3 h-3 text-white" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="p-0 border-0 shadow-lg">
                <div className="text-[12px]">
                  <div 
                    className="w-[200px] h-[150px] rounded-t-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => onEvidenceClick?.(markerEvidence)}
                  >
                    <img 
                      src={markerEvidence.thumbnail} 
                      alt="Evidence thumbnail" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 bg-white rounded-b-md">
                    <p className="font-medium text-[#00bc7d]">✓ Patient Identity Verified</p>
                    <p className="text-gray-500 mt-1">Time: 09:32 AM</p>
                    <p className="text-gray-400 text-[10px] mt-2">Click thumbnail to view evidence</p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="absolute h-[20px] left-0 top-[22px] w-[64px]" data-name="Container">
      <p className="absolute font-['Zoho_Puvi:Regular',sans-serif] leading-[21px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[39.5px] whitespace-pre">Bed 3</p>
    </div>
  );
}

function Container84() {
  return <div className="absolute h-0 left-px top-px right-px" data-name="Container" />;
}

function Container85() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-full" />
    </div>
  );
}

function Container86() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-full" />
    </div>
  );
}

function Container87() {
  return (
    <div className="absolute box-border content-stretch flex h-[129px] items-start left-px pl-0 pr-[0.031px] py-0 top-px right-px" data-name="Container">
      {[...Array(12).keys()].map((_, i) => (
        <Container85 key={i} />
      ))}
      <Container86 />
    </div>
  );
}

function SlotClone9() {
  return <div className="absolute bg-[#e6e6e6] h-[42px] left-[70px] top-[2px] w-[36px]" data-name="SlotClone" />;
}

function MultiBedTimeline5() {
  return (
    <div className="relative shrink-0" data-name="MultiBedTimeline">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] items-center justify-center overflow-clip relative rounded-[inherit]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] not-italic relative shrink-0 text-[#364153] text-[12px] text-nowrap tracking-[0.167px] whitespace-pre">3h 52min</p>
      </div>
    </div>
  );
}

function Badge3() {
  return (
    <div className="bg-[#ff8904] h-[14px] relative rounded-[10px] shrink-0 w-[28.117px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[14px] items-center justify-center overflow-clip px-[5px] py-px relative rounded-[inherit] w-[28.117px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[8px] text-nowrap text-white tracking-[0.2057px] whitespace-pre">78%</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function SlotClone10() {
  return (
    <div className="absolute bg-[#ffedd4] box-border content-stretch flex gap-[6px] h-[42px] items-center justify-center left-[106.06px] pl-[2px] pr-[2.008px] py-0 top-[2px] w-[398.844px]" data-name="SlotClone">
      <div aria-hidden="true" className="absolute border-[#ffb86a] border-[0px_2px] border-solid inset-0 pointer-events-none" />
      <MultiBedTimeline5 />
      <Badge3 />
    </div>
  );
}

function SlotClone11() {
  return <div className="absolute bg-[#e6e6e6] h-[42px] left-[505px] top-[2px] w-[52px]" data-name="SlotClone" />;
}

function Container88() {
  return (
    <div className="absolute bg-white h-[46px] left-[207px] rounded-[12px] top-[9px] w-[635px]" data-name="Container">
      <TooltipProvider>
        <div className="h-[46px] overflow-clip relative rounded-[inherit] w-[635px]">
          <SlotClone9 />
          <SlotClone10 />
          <SlotClone11 />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[2px] top-[2px] w-[68px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Patient Waiting</p>
                <p className="text-gray-500">Status: Off Bed</p>
                <p className="text-gray-500">Duration: ~1h 8min</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[70px] top-[2px] w-[36px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Patient on Bed</p>
                <p className="text-gray-500">Status: Pre-Dialysis</p>
                <p className="text-gray-500">Duration: ~36 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[106.06px] top-[2px] w-[398.844px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Dialysis Session</p>
                <p className="text-gray-500">Duration: 3h 52min</p>
                <p className="text-gray-500">Compliance: 78%</p>
                <p className="text-gray-500">Status: Medium Compliance</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[505px] top-[2px] w-[52px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Patient on Bed</p>
                <p className="text-gray-500">Status: Post-Dialysis</p>
                <p className="text-gray-500">Duration: ~52 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[557px] top-[2px] w-[76px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Bed Empty</p>
                <p className="text-gray-500">Status: Available</p>
                <p className="text-gray-500">Duration: ~1h 16min</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function SlotClone12() {
  return <div className="absolute bg-[#e6e6e6] h-[42px] left-[50px] top-[2px] w-[24px]" data-name="SlotClone" />;
}

function MultiBedTimeline6() {
  return (
    <div className="relative shrink-0" data-name="MultiBedTimeline">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] items-center justify-center overflow-clip relative rounded-[inherit]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] not-italic relative shrink-0 text-[#364153] text-[12px] text-nowrap tracking-[0.167px] whitespace-pre">4h 02min</p>
      </div>
    </div>
  );
}

function Badge4() {
  return (
    <div className="bg-[#00bc7d] h-[14px] relative rounded-[10px] shrink-0 w-[28.609px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[14px] items-center justify-center overflow-clip px-[5px] py-px relative rounded-[inherit] w-[28.609px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[8px] text-nowrap text-white tracking-[0.2057px] whitespace-pre">92%</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function SlotClone13() {
  return (
    <div className="absolute bg-[#d0fae5] box-border content-stretch flex gap-[6px] h-[42px] items-center justify-center left-[74.06px] px-[2px] py-0 top-[2px] w-[398.844px]" data-name="SlotClone">
      <div aria-hidden="true" className="absolute border-[#5ee9b5] border-[0px_2px] border-solid inset-0 pointer-events-none" />
      <MultiBedTimeline6 />
      <Badge4 />
    </div>
  );
}

function SlotClone14() {
  return <div className="absolute bg-[#e6e6e6] h-[42px] left-[473px] top-[2px] w-[52px]" data-name="SlotClone" />;
}

function Container89() {
  return (
    <div className="absolute bg-white h-[46px] left-[842px] rounded-[12px] top-[77px] w-[542px]" data-name="Container">
      <TooltipProvider>
        <div className="h-[46px] overflow-clip relative rounded-[inherit] w-[542px]">
          <SlotClone12 />
          <SlotClone13 />
          <SlotClone14 />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[2px] top-[2px] w-[48px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Patient Waiting</p>
                <p className="text-gray-500">Status: Off Bed</p>
                <p className="text-gray-500">Duration: ~48 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[50px] top-[2px] w-[24px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Patient on Bed</p>
                <p className="text-gray-500">Status: Pre-Dialysis</p>
                <p className="text-gray-500">Duration: ~24 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[74.06px] top-[2px] w-[398.844px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Dialysis Session</p>
                <p className="text-gray-500">Duration: 4h 02min</p>
                <p className="text-gray-500">Compliance: 92%</p>
                <p className="text-gray-500">Status: High Compliance</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[473px] top-[2px] w-[52px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Patient on Bed</p>
                <p className="text-gray-500">Status: Post-Dialysis</p>
                <p className="text-gray-500">Duration: ~52 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[525px] top-[2px] w-[15px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Bed Empty</p>
                <p className="text-gray-500">Status: Available</p>
                <p className="text-gray-500">Duration: ~15 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container90() {
  return (
    <div className="absolute bg-[rgba(249,250,251,0.5)] h-[131px] left-[64px] rounded-[12px] top-0 right-0" data-name="Container">
      <div className="h-[131px] overflow-clip relative rounded-[inherit] w-full">
        <Container84 />
        <Container87 />
        <Container88 />
        <Container89 />
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container91({ onEvidenceClick }: { onEvidenceClick?: (violation: any) => void }) {
  const marker3Evidence = {
    id: 'V003',
    timestamp: '08:50 AM',
    bed: 'Bed 3',
    sop: 'Hourly BP Monitoring',
    category: 'During Dialysis Procedures',
    status: 'Missed' as const,
    patientId: 'Guest-103',
    thumbnail: 'https://images.unsplash.com/photo-1630128295920-627fb9aff5a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFseXNpcyUyMG1hY2hpbmV8ZW58MXx8fHwxNzYyNzU2ODQyfDA&ixlib=rb-4.1.0&q=80&w=400'
  };
  
  const marker4Evidence = {
    id: 'V006',
    timestamp: '1:20 PM',
    bed: 'Bed 3',
    sop: 'Post-Session Machine Disinfection',
    category: 'Machine & Equipment Maintenance',
    status: 'Missed' as const,
    patientId: 'Guest-103',
    thumbnail: 'https://images.unsplash.com/photo-1599756345342-dd118c3c3f96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZGlzaW5mZWN0aW9ufGVufDF8fHx8MTc2Mjc1Njg0M3ww&ixlib=rb-4.1.0&q=80&w=400'
  };
  
  return (
    <div className="h-[131px] relative shrink-0 w-full min-w-0" data-name="Container">
      <Container83 />
      <Container90 />
      
      {/* Bed 3: Warning - Vitals Check Delayed */}
      <div className="absolute left-[16%] top-0 bottom-0 w-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="relative flex items-center justify-center h-full">
          <div className="absolute top-0 bottom-0 w-0.5 bg-[#ffb86a]"></div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-6 h-6 bg-[#ffb86a] rounded-full flex items-center justify-center border-2 border-white shadow-md pointer-events-auto relative z-10 cursor-pointer">
                  <Clock className="w-3 h-3 text-white" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="p-0 border-0 shadow-lg">
                <div className="text-[12px]">
                  <div 
                    className="w-[200px] h-[150px] rounded-t-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => onEvidenceClick?.(marker3Evidence)}
                  >
                    <img 
                      src={marker3Evidence.thumbnail} 
                      alt="Evidence thumbnail" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 bg-white rounded-b-md">
                    <p className="font-medium text-[#ff8c00]">⚠ Vitals Check Delayed</p>
                    <p className="text-gray-500 mt-1">Expected: 08:50 AM</p>
                    <p className="text-gray-500">Actual: 09:05 AM (15 min delay)</p>
                    <p className="text-gray-400 text-[10px] mt-2">Click thumbnail to view evidence</p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Bed 3: Violation - Medication Record Missing */}
      <div className="absolute left-[55%] top-0 bottom-0 w-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="relative flex items-center justify-center h-full">
          <div className="absolute top-0 bottom-0 w-0.5 bg-[#ffa2a2]"></div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-6 h-6 bg-[#ffa2a2] rounded-full flex items-center justify-center border-2 border-white shadow-md pointer-events-auto relative z-10 cursor-pointer">
                  <XCircle className="w-3 h-3 text-white" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="p-0 border-0 shadow-lg">
                <div className="text-[12px]">
                  <div 
                    className="w-[200px] h-[150px] rounded-t-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => onEvidenceClick?.(marker4Evidence)}
                  >
                    <img 
                      src={marker4Evidence.thumbnail} 
                      alt="Evidence thumbnail" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 bg-white rounded-b-md">
                    <p className="font-medium text-[#ff4444]">✗ Medication Record Missing</p>
                    <p className="text-gray-500 mt-1">Event: Heparin Administration</p>
                    <p className="text-gray-500">Status: Not Documented</p>
                    <p className="text-gray-400 text-[10px] mt-2">Click thumbnail to view evidence</p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="absolute h-[20px] left-0 top-[22px] w-[64px]" data-name="Container">
      <p className="absolute font-['Zoho_Puvi:Regular',sans-serif] leading-[21px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.5px] whitespace-pre">Bed 4</p>
    </div>
  );
}

function Container93() {
  return <div className="absolute h-0 left-px top-px right-px" data-name="Container" />;
}

function Container94() {
  return (
    <div className="basis-0 grow h-[62px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[62px] w-full" />
    </div>
  );
}

function Container95() {
  return (
    <div className="basis-0 grow h-[62px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[62px] w-full" />
    </div>
  );
}

function Container96() {
  return (
    <div className="absolute box-border content-stretch flex h-[62px] items-start left-px pl-0 pr-[0.031px] py-0 top-px right-px" data-name="Container">
      {[...Array(12).keys()].map((_, i) => (
        <Container94 key={i} />
      ))}
      <Container95 />
    </div>
  );
}

function SlotClone15() {
  return <div className="absolute bg-[#e6e6e6] h-[42px] left-[65.96px] top-[2px] w-[36px]" data-name="SlotClone" />;
}

function MultiBedTimeline7() {
  return (
    <div className="relative shrink-0" data-name="MultiBedTimeline">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] items-center justify-center overflow-clip relative rounded-[inherit]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] not-italic relative shrink-0 text-[#364153] text-[12px] text-nowrap tracking-[0.167px] whitespace-pre">4h 10min</p>
      </div>
    </div>
  );
}

function Badge5() {
  return (
    <div className="bg-[#ff8904] h-[14px] relative rounded-[10px] shrink-0 w-[28.117px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[14px] items-center justify-center overflow-clip px-[5px] py-px relative rounded-[inherit] w-[28.117px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[8px] text-nowrap text-white tracking-[0.2057px] whitespace-pre">72%</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function SlotClone16() {
  return (
    <div className="absolute bg-[#ffedd4] box-border content-stretch flex gap-[6px] h-[42px] items-center justify-center left-[100.7px] pl-[2px] pr-[2.008px] py-0 top-[2px] w-[432.094px]" data-name="SlotClone">
      <div aria-hidden="true" className="absolute border-[#ffb86a] border-[0px_2px] border-solid inset-0 pointer-events-none" />
      <MultiBedTimeline7 />
      <Badge5 />
    </div>
  );
}

function SlotClone17() {
  return <div className="absolute bg-[#e6e6e6] h-[42px] left-[532.55px] top-[2px] w-[36px]" data-name="SlotClone" />;
}

function Container97() {
  return (
    <div className="absolute bg-gray-100 h-[46px] left-[167px] rounded-[12px] top-[9px] w-[593px]" data-name="Container">
      <div className="h-[46px] overflow-clip relative rounded-[inherit] w-[593px]">
        <SlotClone15 />
        <SlotClone16 />
        <SlotClone17 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function SlotClone18() {
  return <div className="absolute bg-[#e6e6e6] h-[42px] left-[60.68px] top-[2px] w-[24px]" data-name="SlotClone" />;
}

function MultiBedTimeline8() {
  return (
    <div className="relative shrink-0" data-name="MultiBedTimeline">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] items-center justify-center overflow-clip relative rounded-[inherit]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] not-italic relative shrink-0 text-[#364153] text-[12px] text-nowrap tracking-[0.167px] whitespace-pre">3h 55min</p>
      </div>
    </div>
  );
}

function Badge6() {
  return (
    <div className="bg-[#00bc7d] h-[14px] relative rounded-[10px] shrink-0 w-[28.648px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[14px] items-center justify-center overflow-clip px-[5px] py-px relative rounded-[inherit] w-[28.648px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[8px] text-nowrap text-white tracking-[0.2057px] whitespace-pre">85%</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function SlotClone19() {
  return (
    <div className="absolute bg-[#d0fae5] box-border content-stretch flex gap-[6px] h-[42px] items-center justify-center left-[84.38px] px-[2px] py-0 top-[2px] w-[344.352px]" data-name="SlotClone">
      <div aria-hidden="true" className="absolute border-[#5ee9b5] border-[0px_2px] border-solid inset-0 pointer-events-none" />
      <MultiBedTimeline8 />
      <Badge6 />
    </div>
  );
}

function SlotClone20() {
  return <div className="absolute bg-[#e6e6e6] h-[42px] left-[428.73px] top-[2px] w-[24px]" data-name="SlotClone" />;
}

function Container98() {
  return (
    <div className="absolute bg-white h-[46px] left-[792px] rounded-[12px] top-[9px] w-[487px]" data-name="Container">
      <TooltipProvider>
        <div className="h-[46px] overflow-clip relative rounded-[inherit] w-[487px]">
          <SlotClone18 />
          <SlotClone19 />
          <SlotClone20 />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[2px] top-[2px] w-[59px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Patient Waiting</p>
                <p className="text-gray-500">Status: Off Bed</p>
                <p className="text-gray-500">Duration: ~59 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[60.68px] top-[2px] w-[24px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Patient on Bed</p>
                <p className="text-gray-500">Status: Pre-Dialysis</p>
                <p className="text-gray-500">Duration: ~24 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[84.38px] top-[2px] w-[344.352px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Dialysis Session</p>
                <p className="text-gray-500">Duration: 3h 55min</p>
                <p className="text-gray-500">Compliance: 85%</p>
                <p className="text-gray-500">Status: High Compliance</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[428.73px] top-[2px] w-[24px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Patient on Bed</p>
                <p className="text-gray-500">Status: Post-Dialysis</p>
                <p className="text-gray-500">Duration: ~24 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[452.73px] top-[2px] w-[32px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Bed Empty</p>
                <p className="text-gray-500">Status: Available</p>
                <p className="text-gray-500">Duration: ~32 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container99() {
  return (
    <div className="absolute bg-[rgba(249,250,251,0.5)] h-[64px] left-[64px] rounded-[12px] top-0 right-0" data-name="Container">
      <div className="h-[64px] overflow-clip relative rounded-[inherit] w-full">
        {[...Array(2).keys()].map((_, i) => (
          <Container93 key={i} />
        ))}
        <Container96 />
        <Container97 />
        <Container98 />
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container100({ onEvidenceClick }: { onEvidenceClick?: (violation: any) => void }) {
  const marker1Evidence = {
    id: 'V007',
    timestamp: '11:20 AM',
    bed: 'Bed 4',
    sop: 'Machine Setup Verification',
    category: 'Pre-Dialysis Preparation',
    status: 'Compliant' as const,
    patientId: 'Guest-104',
    thumbnail: 'https://images.unsplash.com/photo-1664902265139-934219cee42f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZXF1aXBtZW50JTIwc2V0dXB8ZW58MXx8fHwxNzYyNzYyOTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  };
  
  const marker2Evidence = {
    id: 'V008',
    timestamp: '02:15 PM',
    bed: 'Bed 4',
    sop: 'Post-Dialysis Complete',
    category: 'Post-Dialysis Care',
    status: 'Compliant' as const,
    patientId: 'Guest-104',
    thumbnail: 'https://images.unsplash.com/photo-1635717850365-b2f7de8f61e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGJlZCUyMHByZXBhcmF0aW9ufGVufDF8fHx8MTc2Mjc2MjkyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  };

  return (
    <div className="h-[64px] relative shrink-0 w-full min-w-0" data-name="Container">
      <Container92 />
      <Container99 />
      
      {/* Bed 4: Compliant - Setup Verified */}
      <div className="absolute left-[35%] top-0 bottom-0 w-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="relative flex items-center justify-center h-full">
          <div className="absolute top-0 bottom-0 w-0.5 bg-[#5ee9b5]"></div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-6 h-6 bg-[#5ee9b5] rounded-full flex items-center justify-center border-2 border-white shadow-md pointer-events-auto relative z-10 cursor-pointer">
                  <Settings className="w-3 h-3 text-white" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="p-0 border-0 shadow-lg">
                <div className="text-[12px]">
                  <div 
                    className="w-[200px] h-[150px] rounded-t-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => onEvidenceClick?.(marker1Evidence)}
                  >
                    <img 
                      src={marker1Evidence.thumbnail} 
                      alt="Evidence thumbnail" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 bg-white rounded-b-md">
                    <p className="font-medium text-[#00bc7d]">✓ Machine Setup Verified</p>
                    <p className="text-gray-500 mt-1">Time: 11:20 AM</p>
                    <p className="text-gray-400 text-[10px] mt-2">Click thumbnail to view evidence</p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Bed 4: Compliant - Session Complete */}
      <div className="absolute left-[71.2%] top-0 bottom-0 w-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="relative flex items-center justify-center h-full">
          <div className="absolute top-0 bottom-0 w-0.5 bg-[#5ee9b5]"></div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-6 h-6 bg-[#5ee9b5] rounded-full flex items-center justify-center border-2 border-white shadow-md pointer-events-auto relative z-10 cursor-pointer">
                  <Bed className="w-3 h-3 text-white" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="p-0 border-0 shadow-lg">
                <div className="text-[12px]">
                  <div 
                    className="w-[200px] h-[150px] rounded-t-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => onEvidenceClick?.(marker2Evidence)}
                  >
                    <img 
                      src={marker2Evidence.thumbnail} 
                      alt="Evidence thumbnail" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 bg-white rounded-b-md">
                    <p className="font-medium text-[#00bc7d]">✓ Post-Dialysis Complete</p>
                    <p className="text-gray-500 mt-1">Time: 02:15 PM</p>
                    <p className="text-gray-400 text-[10px] mt-2">Click thumbnail to view evidence</p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}

function Container101() {
  return (
    <div className="absolute h-[20px] left-0 top-[22px] w-[64px]" data-name="Container">
      <p className="absolute font-['Zoho_Puvi:Regular',sans-serif] leading-[21px] left-0 not-italic text-[#4a5565] text-[14px] top-[0.5px] w-[38px]">Bed 5</p>
    </div>
  );
}

function Container102() {
  return <div className="absolute h-0 left-px top-px right-px" data-name="Container" />;
}

function Container103() {
  return (
    <div className="basis-0 grow h-[62px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[62px] w-full" />
    </div>
  );
}

function Container104() {
  return (
    <div className="basis-0 grow h-[62px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[62px] w-full" />
    </div>
  );
}

function Container105() {
  return (
    <div className="absolute box-border content-stretch flex h-[62px] items-start left-px pl-0 pr-[0.031px] py-0 top-px right-px" data-name="Container">
      {[...Array(12).keys()].map((_, i) => (
        <Container103 key={i} />
      ))}
      <Container104 />
    </div>
  );
}

function SlotClone21() {
  return <div className="absolute bg-[#e6e6e6] h-[42px] left-[60.68px] top-[2px] w-[24px]" data-name="SlotClone" />;
}

function MultiBedTimeline9() {
  return (
    <div className="relative shrink-0" data-name="MultiBedTimeline">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] items-center justify-center overflow-clip relative rounded-[inherit]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] not-italic relative shrink-0 text-[#364153] text-[12px] text-nowrap tracking-[0.167px] whitespace-pre">3h 55min</p>
      </div>
    </div>
  );
}

function Badge7() {
  return (
    <div className="bg-[#00bc7d] h-[14px] relative rounded-[10px] shrink-0 w-[28.648px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[14px] items-center justify-center overflow-clip px-[5px] py-px relative rounded-[inherit] w-[28.648px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[8px] text-nowrap text-white tracking-[0.2057px] whitespace-pre">85%</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function SlotClone22() {
  return (
    <div className="absolute bg-[#d0fae5] box-border content-stretch flex gap-[6px] h-[42px] items-center justify-center left-[84.38px] px-[2px] py-0 top-[2px] w-[344.352px]" data-name="SlotClone">
      <div aria-hidden="true" className="absolute border-[#5ee9b5] border-[0px_2px] border-solid inset-0 pointer-events-none" />
      <MultiBedTimeline9 />
      <Badge7 />
    </div>
  );
}

function SlotClone23() {
  return <div className="absolute bg-[#e6e6e6] h-[42px] left-[428.73px] top-[2px] w-[24px]" data-name="SlotClone" />;
}

function Container106() {
  return (
    <div className="absolute bg-white h-[46px] left-[380.53px] rounded-[12px] top-[9px] w-[487px]" data-name="Container">
      <TooltipProvider>
        <div className="h-[46px] overflow-clip relative rounded-[inherit] w-[487px]">
          <SlotClone21 />
          <SlotClone22 />
          <SlotClone23 />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[2px] top-[2px] w-[59px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Patient Waiting</p>
                <p className="text-gray-500">Status: Off Bed</p>
                <p className="text-gray-500">Duration: ~59 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[60.68px] top-[2px] w-[24px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Patient on Bed</p>
                <p className="text-gray-500">Status: Pre-Dialysis</p>
                <p className="text-gray-500">Duration: ~24 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[84.38px] top-[2px] w-[344.352px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Dialysis Session</p>
                <p className="text-gray-500">Duration: 3h 55min</p>
                <p className="text-gray-500">Compliance: 85%</p>
                <p className="text-gray-500">Status: High Compliance</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[428.73px] top-[2px] w-[24px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Patient on Bed</p>
                <p className="text-gray-500">Status: Post-Dialysis</p>
                <p className="text-gray-500">Duration: ~24 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[452.73px] top-[2px] w-[32px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Bed Empty</p>
                <p className="text-gray-500">Status: Available</p>
                <p className="text-gray-500">Duration: ~32 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container107() {
  return (
    <div className="absolute bg-[rgba(249,250,251,0.5)] h-[64px] left-[64px] rounded-[12px] top-0 right-0" data-name="Container">
      <div className="h-[64px] overflow-clip relative rounded-[inherit] w-full">
        <Container102 />
        <Container105 />
        <Container106 />
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container108({ onEvidenceClick }: { onEvidenceClick?: (violation: any) => void }) {
  const markerEvidence = {
    id: 'V009',
    timestamp: '12:42 PM',
    bed: 'Bed 5',
    sop: 'Access Site Check',
    category: 'Intra-Dialysis Monitoring',
    status: 'Uncertain' as const,
    patientId: 'Guest-105',
    thumbnail: 'https://images.unsplash.com/photo-1630128295920-627fb9aff5a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFseXNpcyUyMG1vbml0b3Jpbmd8ZW58MXx8fHwxNzYyNzYyOTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  };

  return (
    <div className="h-[64px] relative shrink-0 w-full min-w-0" data-name="Container">
      <Container101 />
      <Container107 />
      
      {/* Bed 5: Warning - Access Site Check Delayed */}
      <div className="absolute left-[40%] top-0 bottom-0 w-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="relative flex items-center justify-center h-full">
          <div className="absolute top-0 bottom-0 w-0.5 bg-[#ffb86a]"></div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-6 h-6 bg-[#ffb86a] rounded-full flex items-center justify-center border-2 border-white shadow-md pointer-events-auto relative z-10 cursor-pointer">
                  <Clock className="w-3 h-3 text-white" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="p-0 border-0 shadow-lg">
                <div className="text-[12px]">
                  <div 
                    className="w-[200px] h-[150px] rounded-t-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => onEvidenceClick?.(markerEvidence)}
                  >
                    <img 
                      src={markerEvidence.thumbnail} 
                      alt="Evidence thumbnail" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 bg-white rounded-b-md">
                    <p className="font-medium text-[#ff8c00]">⚠ Access Site Check Delayed</p>
                    <p className="text-gray-500 mt-1">Expected: 12:30 PM</p>
                    <p className="text-gray-500">Actual: 12:42 PM (12 min delay)</p>
                    <p className="text-gray-400 text-[10px] mt-2">Click thumbnail to view evidence</p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}

function Container109() {
  return (
    <div className="absolute h-[20px] left-0 top-[22px] w-[64px]" data-name="Container">
      <p className="absolute font-['Zoho_Puvi:Regular',sans-serif] leading-[21px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.5px] whitespace-pre">Bed 6</p>
    </div>
  );
}

function Container110() {
  return <div className="absolute h-0 left-px top-px right-px" data-name="Container" />;
}

function Container111() {
  return (
    <div className="basis-0 grow h-[62px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[62px] w-full" />
    </div>
  );
}

function Container112() {
  return (
    <div className="basis-0 grow h-[62px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[62px] w-full" />
    </div>
  );
}

function Container113() {
  return (
    <div className="absolute box-border content-stretch flex h-[62px] items-start left-px pl-0 pr-[0.031px] py-0 top-px right-px" data-name="Container">
      {[...Array(12).keys()].map((_, i) => (
        <Container111 key={i} />
      ))}
      <Container112 />
    </div>
  );
}

function SlotClone24() {
  return <div className="absolute bg-[#e6e6e6] h-[42px] left-[60.68px] top-[2px] w-[24px]" data-name="SlotClone" />;
}

function MultiBedTimeline10() {
  return (
    <div className="relative shrink-0" data-name="MultiBedTimeline">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] items-center justify-center overflow-clip relative rounded-[inherit]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] not-italic relative shrink-0 text-[#364153] text-[12px] text-nowrap tracking-[0.167px] whitespace-pre">3h 55min</p>
      </div>
    </div>
  );
}

function Badge8() {
  return (
    <div className="bg-[#00bc7d] h-[14px] relative rounded-[10px] shrink-0 w-[28.648px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[14px] items-center justify-center overflow-clip px-[5px] py-px relative rounded-[inherit] w-[28.648px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[8px] text-nowrap text-white tracking-[0.2057px] whitespace-pre">85%</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function SlotClone25() {
  return (
    <div className="absolute bg-[#d0fae5] box-border content-stretch flex gap-[6px] h-[42px] items-center justify-center left-[84.38px] px-[2px] py-0 top-[2px] w-[344.352px]" data-name="SlotClone">
      <div aria-hidden="true" className="absolute border-[#5ee9b5] border-[0px_2px] border-solid inset-0 pointer-events-none" />
      <MultiBedTimeline10 />
      <Badge8 />
    </div>
  );
}

function SlotClone26() {
  return <div className="absolute bg-[#e6e6e6] h-[42px] left-[428.73px] top-[2px] w-[24px]" data-name="SlotClone" />;
}

function Container114() {
  return (
    <div className="absolute bg-white h-[46px] left-[486.44px] rounded-[12px] top-[9px] w-[487px]" data-name="Container">
      <TooltipProvider>
        <div className="h-[46px] overflow-clip relative rounded-[inherit] w-[487px]">
          <SlotClone24 />
          <SlotClone25 />
          <SlotClone26 />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[2px] top-[2px] w-[59px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Patient Waiting</p>
                <p className="text-gray-500">Status: Off Bed</p>
                <p className="text-gray-500">Duration: ~59 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[60.68px] top-[2px] w-[24px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Patient on Bed</p>
                <p className="text-gray-500">Status: Pre-Dialysis</p>
                <p className="text-gray-500">Duration: ~24 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[84.38px] top-[2px] w-[344.352px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Dialysis Session</p>
                <p className="text-gray-500">Duration: 3h 55min</p>
                <p className="text-gray-500">Compliance: 85%</p>
                <p className="text-gray-500">Status: High Compliance</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[428.73px] top-[2px] w-[24px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Patient on Bed</p>
                <p className="text-gray-500">Status: Post-Dialysis</p>
                <p className="text-gray-500">Duration: ~24 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[452.73px] top-[2px] w-[32px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Bed Empty</p>
                <p className="text-gray-500">Status: Available</p>
                <p className="text-gray-500">Duration: ~32 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container115() {
  return (
    <div className="absolute bg-[rgba(249,250,251,0.5)] h-[64px] left-[64px] rounded-[12px] top-0 right-0" data-name="Container">
      <div className="h-[64px] overflow-clip relative rounded-[inherit] w-full">
        <Container110 />
        <Container113 />
        <Container114 />
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container116({ onEvidenceClick }: { onEvidenceClick?: (violation: any) => void }) {
  const markerEvidence = {
    id: 'V010',
    timestamp: '01:15 PM',
    bed: 'Bed 6',
    sop: 'Blood Pressure Monitoring',
    category: 'Intra-Dialysis Monitoring',
    status: 'Missed' as const,
    patientId: 'Guest-106',
    thumbnail: 'https://images.unsplash.com/photo-1758656476354-a644d7e82f0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdW1lbnRhdGlvbnxlbnwxfHx8fDE3NjI3NjI5Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  };

  return (
    <div className="h-[64px] relative shrink-0 w-full min-w-0" data-name="Container">
      <Container109 />
      <Container115 />
      
      {/* Bed 6: Violation - Blood Pressure Not Recorded */}
      <div className="absolute left-[30%] top-0 bottom-0 w-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="relative flex items-center justify-center h-full">
          <div className="absolute top-0 bottom-0 w-0.5 bg-[#ffa2a2]"></div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-6 h-6 bg-[#ffa2a2] rounded-full flex items-center justify-center border-2 border-white shadow-md pointer-events-auto relative z-10 cursor-pointer">
                  <XCircle className="w-3 h-3 text-white" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="p-0 border-0 shadow-lg">
                <div className="text-[12px]">
                  <div 
                    className="w-[200px] h-[150px] rounded-t-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => onEvidenceClick?.(markerEvidence)}
                  >
                    <img 
                      src={markerEvidence.thumbnail} 
                      alt="Evidence thumbnail" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 bg-white rounded-b-md">
                    <p className="font-medium text-[#ff4444]">✗ Blood Pressure Not Recorded</p>
                    <p className="text-gray-500 mt-1">Time: 01:15 PM</p>
                    <p className="text-gray-500">Status: Critical SOP Violation</p>
                    <p className="text-gray-400 text-[10px] mt-2">Click thumbnail to view evidence</p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}

function Container117() {
  return (
    <div className="absolute h-[20px] left-0 top-[22px] w-[64px]" data-name="Container">
      <p className="absolute font-['Zoho_Puvi:Regular',sans-serif] leading-[21px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.5px] whitespace-pre">Bed 7</p>
    </div>
  );
}

function Container118() {
  return <div className="absolute h-0 left-px top-px right-px" data-name="Container" />;
}

function Container119() {
  return (
    <div className="basis-0 grow h-[62px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[62px] w-full" />
    </div>
  );
}

function Container120() {
  return (
    <div className="basis-0 grow h-[62px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[62px] w-full" />
    </div>
  );
}

function Container121() {
  return (
    <div className="absolute box-border content-stretch flex h-[62px] items-start left-px pl-0 pr-[0.031px] py-0 top-px right-px" data-name="Container">
      {[...Array(12).keys()].map((_, i) => (
        <Container119 key={i} />
      ))}
      <Container120 />
    </div>
  );
}

function SlotClone27() {
  return <div className="absolute bg-[#e6e6e6] h-[42px] left-[535.38px] top-[2px] w-[24px]" data-name="SlotClone" />;
}

function SlotClone28() {
  return <div className="absolute bg-[#e6e6e6] h-[42px] left-[80.05px] top-[2px] w-[24px]" data-name="SlotClone" />;
}

function MultiBedTimeline11() {
  return (
    <div className="relative shrink-0" data-name="MultiBedTimeline">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] items-center justify-center overflow-clip relative rounded-[inherit]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] not-italic relative shrink-0 text-[#364153] text-[12px] text-nowrap tracking-[0.167px] whitespace-pre">3h 45min</p>
      </div>
    </div>
  );
}

function Badge9() {
  return (
    <div className="bg-[#fb2c36] h-[14px] relative rounded-[10px] shrink-0 w-[27.906px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[14px] items-center justify-center overflow-clip px-[5px] py-px relative rounded-[inherit] w-[27.906px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[8px] text-nowrap text-white tracking-[0.2057px] whitespace-pre">68%</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function SlotClone29() {
  return (
    <div className="absolute bg-[#ffe2e2] box-border content-stretch flex gap-[6px] h-[42px] items-center justify-center left-[103.79px] px-[2px] py-0 top-[2px] w-[432.094px]" data-name="SlotClone">
      <div aria-hidden="true" className="absolute border-[#ffa2a2] border-[0px_2px] border-solid inset-0 pointer-events-none" />
      <MultiBedTimeline11 />
      <Badge9 />
    </div>
  );
}

function Container122() {
  return (
    <div className="absolute bg-white h-[46px] left-[58px] rounded-[12px] top-[9px] w-[600px]" data-name="Container">
      <TooltipProvider>
        <div className="h-[46px] overflow-clip relative rounded-[inherit] w-[600px]">
          <SlotClone27 />
          <SlotClone28 />
          <SlotClone29 />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[2px] top-[2px] w-[78px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Patient Waiting</p>
                <p className="text-gray-500">Status: Off Bed</p>
                <p className="text-gray-500">Duration: ~1h 18min</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[80.05px] top-[2px] w-[24px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Patient on Bed</p>
                <p className="text-gray-500">Status: Pre-Dialysis</p>
                <p className="text-gray-500">Duration: ~24 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[103.79px] top-[2px] w-[432.094px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Dialysis Session</p>
                <p className="text-gray-500">Duration: 3h 45min</p>
                <p className="text-gray-500">Compliance: 68%</p>
                <p className="text-gray-500">Status: Low Compliance</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[535.38px] top-[2px] w-[24px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Patient on Bed</p>
                <p className="text-gray-500">Status: Post-Dialysis</p>
                <p className="text-gray-500">Duration: ~24 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[559.38px] top-[2px] w-[38px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Bed Empty</p>
                <p className="text-gray-500">Status: Available</p>
                <p className="text-gray-500">Duration: ~38 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container123() {
  return (
    <div className="absolute bg-[rgba(249,250,251,0.5)] h-[64px] left-[64px] rounded-[12px] top-0 right-0" data-name="Container">
      <div className="h-[64px] overflow-clip relative rounded-[inherit] w-full">
        {[...Array(2).keys()].map((_, i) => (
          <Container118 key={i} />
        ))}
        <Container121 />
        <Container122 />
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container124({ onEvidenceClick }: { onEvidenceClick?: (violation: any) => void }) {
  const marker1Evidence = {
    id: 'V011',
    timestamp: '07:45 AM',
    bed: 'Bed 7',
    sop: 'Hand Hygiene Before Patient Contact',
    category: 'Pre-Dialysis Preparation',
    status: 'Missed' as const,
    patientId: 'Guest-107',
    thumbnail: 'https://images.unsplash.com/photo-1758653500328-1c4474a8adfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGhhbmQlMjB3YXNoaW5nfGVufDF8fHx8MTc2Mjc1Njg0Mnww&ixlib=rb-4.1.0&q=80&w=400'
  };
  
  const marker2Evidence = {
    id: 'V012',
    timestamp: '03:40 PM',
    bed: 'Bed 7',
    sop: 'Discharge Checklist',
    category: 'Post-Dialysis Care',
    status: 'Missed' as const,
    patientId: 'Guest-107',
    thumbnail: 'https://images.unsplash.com/photo-1758691462493-120a069304e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMHNhZmV0eSUyMGNoZWNrfGVufDF8fHx8MTc2Mjc2MjkyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  };

  return (
    <div className="h-[64px] relative shrink-0 w-full min-w-0" data-name="Container">
      <Container117 />
      <Container123 />
      
      {/* Bed 7: Violation - Hand Hygiene Not Verified */}
      <div className="absolute left-[15.6%] top-0 bottom-0 w-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="relative flex items-center justify-center h-full">
          <div className="absolute top-0 bottom-0 w-0.5 bg-[#ffa2a2]"></div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-6 h-6 bg-[#ffa2a2] rounded-full flex items-center justify-center border-2 border-white shadow-md pointer-events-auto relative z-10 cursor-pointer">
                  <XCircle className="w-3 h-3 text-white" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="p-0 border-0 shadow-lg">
                <div className="text-[12px]">
                  <div 
                    className="w-[200px] h-[150px] rounded-t-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => onEvidenceClick?.(marker1Evidence)}
                  >
                    <img 
                      src={marker1Evidence.thumbnail} 
                      alt="Evidence thumbnail" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 bg-white rounded-b-md">
                    <p className="font-medium text-[#ff4444]">✗ Hand Hygiene Not Verified</p>
                    <p className="text-gray-500 mt-1">Time: 07:45 AM</p>
                    <p className="text-gray-500">Status: Critical SOP Violation</p>
                    <p className="text-gray-400 text-[10px] mt-2">Click thumbnail to view evidence</p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Bed 7: Violation - Discharge Checklist Incomplete */}
      <div className="absolute left-[80.7%] top-0 bottom-0 w-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="relative flex items-center justify-center h-full">
          <div className="absolute top-0 bottom-0 w-0.5 bg-[#ffa2a2]"></div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-6 h-6 bg-[#ffa2a2] rounded-full flex items-center justify-center border-2 border-white shadow-md pointer-events-auto relative z-10 cursor-pointer">
                  <XCircle className="w-3 h-3 text-white" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="p-0 border-0 shadow-lg">
                <div className="text-[12px]">
                  <div 
                    className="w-[200px] h-[150px] rounded-t-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => onEvidenceClick?.(marker2Evidence)}
                  >
                    <img 
                      src={marker2Evidence.thumbnail} 
                      alt="Evidence thumbnail" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 bg-white rounded-b-md">
                    <p className="font-medium text-[#ff4444]">✗ Discharge Checklist Incomplete</p>
                    <p className="text-gray-500 mt-1">Time: 03:40 PM</p>
                    <p className="text-gray-500">Status: 2 items missing</p>
                    <p className="text-gray-400 text-[10px] mt-2">Click thumbnail to view evidence</p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}

function Container125() {
  return (
    <div className="absolute h-[20px] left-0 top-[22px] w-[64px]" data-name="Container">
      <p className="absolute font-['Zoho_Puvi:Regular',sans-serif] leading-[21px] left-0 not-italic text-[#4a5565] text-[14px] top-[0.5px] w-[38px]">Bed 8</p>
    </div>
  );
}

function Container126() {
  return <div className="absolute h-0 left-px top-px right-px" data-name="Container" />;
}

function Container127() {
  return (
    <div className="basis-0 grow h-[62px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[62px] w-full" />
    </div>
  );
}

function Container128() {
  return (
    <div className="basis-0 grow h-[62px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[62px] w-full" />
    </div>
  );
}

function Container129() {
  return (
    <div className="absolute box-border content-stretch flex h-[62px] items-start left-px pl-0 pr-[0.031px] py-0 top-px right-px" data-name="Container">
      {[...Array(12).keys()].map((_, i) => (
        <Container127 key={i} />
      ))}
      <Container128 />
    </div>
  );
}

function SlotClone30() {
  return <div className="absolute bg-[#e6e6e6] h-[42px] left-[57px] top-[2px] w-[29px]" data-name="SlotClone" />;
}

function MultiBedTimeline12() {
  return (
    <div className="relative shrink-0" data-name="MultiBedTimeline">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] items-center justify-center overflow-clip relative rounded-[inherit]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] not-italic relative shrink-0 text-[#364153] text-[12px] text-nowrap tracking-[0.167px] whitespace-pre">3h 45min</p>
      </div>
    </div>
  );
}

function Badge10() {
  return (
    <div className="bg-[#00bc7d] h-[14px] relative rounded-[10px] shrink-0 w-[28.836px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[14px] items-center justify-center overflow-clip px-[5px] py-px relative rounded-[inherit] w-[28.836px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[8px] text-nowrap text-white tracking-[0.2057px] whitespace-pre">88%</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function SlotClone31() {
  return (
    <div className="absolute bg-[#d0fae5] box-border content-stretch flex gap-[6px] h-[42px] items-center justify-center left-[85.58px] px-[2px] py-0 top-[2px] w-[402.352px]" data-name="SlotClone">
      <div aria-hidden="true" className="absolute border-[#5ee9b5] border-[0px_2px] border-solid inset-0 pointer-events-none" />
      <MultiBedTimeline12 />
      <Badge10 />
    </div>
  );
}

function SlotClone32() {
  return <div className="absolute bg-[#e6e6e6] left-[488px] size-[42px] top-[2px]" data-name="SlotClone" />;
}

function Container130() {
  return (
    <div className="absolute bg-white h-[46px] left-[603.49px] rounded-[12px] top-[9px] w-[564px]" data-name="Container">
      <TooltipProvider>
        <div className="h-[46px] overflow-clip relative rounded-[inherit] w-[564px]">
          <SlotClone30 />
          <SlotClone31 />
          <SlotClone32 />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[2px] top-[2px] w-[55px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Patient Waiting</p>
                <p className="text-gray-500">Status: Off Bed</p>
                <p className="text-gray-500">Duration: ~55 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[57px] top-[2px] w-[29px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Patient on Bed</p>
                <p className="text-gray-500">Status: Pre-Dialysis</p>
                <p className="text-gray-500">Duration: ~29 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[85.58px] top-[2px] w-[402.352px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Dialysis Session</p>
                <p className="text-gray-500">Duration: 3h 45min</p>
                <p className="text-gray-500">Compliance: 88%</p>
                <p className="text-gray-500">Status: High Compliance</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[488px] top-[2px] w-[42px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Patient on Bed</p>
                <p className="text-gray-500">Status: Post-Dialysis</p>
                <p className="text-gray-500">Duration: ~42 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute h-[42px] left-[530px] top-[2px] w-[32px] z-10 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[12px]">
                <p className="font-medium">Bed Empty</p>
                <p className="text-gray-500">Status: Available</p>
                <p className="text-gray-500">Duration: ~32 min</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container131() {
  return (
    <div className="absolute bg-[rgba(249,250,251,0.5)] h-[64px] left-[64px] rounded-[12px] top-0 right-0" data-name="Container">
      <div className="h-[64px] overflow-clip relative rounded-[inherit] w-full">
        <Container126 />
        <Container129 />
        <Container130 />
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container132() {
  return (
    <div className="h-[64px] relative shrink-0 w-full min-w-0" data-name="Container">
      <Container125 />
      <Container131 />
      
      {/* Bed 8: Compliant - Equipment Check Complete */}
      <div className="absolute left-[12.9%] top-0 bottom-0 w-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="relative flex items-center justify-center h-full">
          <div className="absolute top-0 bottom-0 w-0.5 bg-[#5ee9b5]"></div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-6 h-6 bg-[#5ee9b5] rounded-full flex items-center justify-center border-2 border-white shadow-md pointer-events-auto relative z-10 cursor-pointer">
                  <Settings className="w-3 h-3 text-white" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-[12px]">
                  <p className="font-medium text-[#00bc7d]">✓ Equipment Check Complete</p>
                  <p className="text-gray-500">Event: Machine Calibration</p>
                  <p className="text-gray-500">Time: 07:45 AM</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Bed 8: Warning - Documentation Delay */}
      <div className="absolute left-[50%] top-0 bottom-0 w-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="relative flex items-center justify-center h-full">
          <div className="absolute top-0 bottom-0 w-0.5 bg-[#ffb86a]"></div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-6 h-6 bg-[#ffb86a] rounded-full flex items-center justify-center border-2 border-white shadow-md pointer-events-auto relative z-10 cursor-pointer">
                  <Clock className="w-3 h-3 text-white" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-[12px]">
                  <p className="font-medium text-[#ff8c00]">⚠ Documentation Delay</p>
                  <p className="text-gray-500">Event: Session Notes</p>
                  <p className="text-gray-500">Actual: 10:18 AM (8 min delay)</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}

function Frame({ onPillClick, onEvidenceClick }: { onPillClick?: (bedNumber: string, patientId: string) => void; onEvidenceClick?: (violation: any) => void }) {
  return (
    <div className="content-stretch flex flex-col gap-3 md:gap-[12px] items-start relative shrink-0 w-full overflow-x-auto">
      <div className="flex flex-col gap-3 md:gap-[12px] w-full min-w-[1273px]">
        <Container74 onPillClick={onPillClick} onEvidenceClick={onEvidenceClick} />
        <Container82 onPillClick={onPillClick} onEvidenceClick={onEvidenceClick} />
        <Container91 onPillClick={onPillClick} onEvidenceClick={onEvidenceClick} />
        <Container100 onPillClick={onPillClick} onEvidenceClick={onEvidenceClick} />
        <Container108 onPillClick={onPillClick} onEvidenceClick={onEvidenceClick} />
        <Container116 onPillClick={onPillClick} onEvidenceClick={onEvidenceClick} />
        <Container124 onPillClick={onPillClick} onEvidenceClick={onEvidenceClick} />
        <Container132 onPillClick={onPillClick} onEvidenceClick={onEvidenceClick} />
      </div>
    </div>
  );
}

function MultiBedTimeline13({ onPillClick, onEvidenceClick }: { onPillClick?: (bedNumber: string, patientId: string) => void; onEvidenceClick?: (violation: any) => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start px-[24px] pb-[24px]" data-name="MultiBedTimeline">
      <Frame onPillClick={onPillClick} onEvidenceClick={onEvidenceClick} />
    </div>
  );
}

function CardContent({ onPillClick, onEvidenceClick }: { onPillClick?: (bedNumber: string, patientId: string) => void; onEvidenceClick?: (violation: any) => void }) {
  return (
    <div className="relative shrink-0 w-full" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border relative w-full min-w-0">
        <MultiBedTimeline onPillClick={onPillClick} onEvidenceClick={onEvidenceClick} />
        <MultiBedTimeline1 onPillClick={onPillClick} onEvidenceClick={onEvidenceClick} />
        <MultiBedTimeline13 onPillClick={onPillClick} onEvidenceClick={onEvidenceClick} />
      </div>
    </div>
  );
}

function Card4({ onPillClick, onEvidenceClick }: { onPillClick?: (bedNumber: string, patientId: string) => void; onEvidenceClick?: (violation: any) => void }) {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-start p-px relative rounded-[16px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <CardContent onPillClick={onPillClick} onEvidenceClick={onEvidenceClick} />
    </div>
  );
}

// Helper functions for Dialysis Unit Timeline
const getUnitEventsForDate = (date: string) => {
  return [
    {
      id: "event-1",
      type: "machine-moved" as const,
      time: "06:30",
      details: "Dialysis Machine #3 repositioned from Bed 5 to Bed 6",
    },
    {
      id: "event-2",
      type: "camera-tampered" as const,
      time: "08:15",
      details: "Camera #2 (Storage Room entrance) angle changed",
    },
    {
      id: "event-3",
      type: "bed-moved" as const,
      time: "09:45",
      details: "Bed #4 moved for cleaning",
    },
    {
      id: "event-4",
      type: "machine-moved" as const,
      time: "11:20",
      details: "Dialysis Machine #1 moved to maintenance area",
    },
    {
      id: "event-5",
      type: "electrical-tampered" as const,
      time: "13:00",
      details: "Electrical duct cover opened near Bed 7",
    },
    {
      id: "event-6",
      type: "bed-moved" as const,
      time: "14:30",
      details: "Bed #2 repositioned",
    },
    {
      id: "event-7",
      type: "camera-tampered" as const,
      time: "16:00",
      details: "Camera #4 (Main entrance) lens obstruction detected",
    },
  ];
};

function DialysisUnitTimelineCard({ selectedDate }: { selectedDate?: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
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
        return null;
    }
  };

  const getEventColor = (type: string): string => {
    switch (type) {
      case "machine-moved":
        return "bg-gray-400 border-gray-500";
      case "bed-moved":
        return "bg-gray-400 border-gray-500";
      case "camera-tampered":
        return "bg-red-500 border-red-600";
      case "electrical-tampered":
        return "bg-gray-400 border-gray-500";
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

  return (
    <UICard className="w-full p-6 border-gray-200">
      <div className="space-y-4">
        {/* Dialysis Unit Row */}
        <div className="space-y-4">
          <div className="flex items-stretch">
            <div className="w-16 shrink-0 flex items-center">
              <span className="text-sm text-gray-700 text-[12px]">Vigilance</span>
            </div>
            <div className="flex-1 relative h-16 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
              {/* Flex grid matching bed timeline structure */}
              <div className="absolute inset-0 flex">
                {[...Array(12).keys()].map((i) => (
                  <div 
                    key={i} 
                    className="basis-0 grow h-full min-h-px min-w-px relative shrink-0"
                  >
                    <div 
                      aria-hidden="true" 
                      className="absolute border-[0px_1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" 
                    />
                  </div>
                ))}
                <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" />
              </div>

              {/* Event markers */}
              {events.map((event) => {
                const position = timeToPosition(event.time);

                return (
                  <Tooltip key={event.id}>
                    <TooltipTrigger asChild>
                      <div
                        className="absolute top-0 bottom-0 flex flex-col items-center justify-center cursor-pointer group z-20"
                        style={{
                          left: `${position}%`,
                          transform: 'translateX(-50%)',
                        }}
                      >
                        {/* Vertical line spanning full height */}
                        <div className="absolute top-0 bottom-0 w-0.5 bg-gray-300 group-hover:bg-gray-400 transition-colors" />
                        
                        {/* Circular icon centered on the line */}
                        <div
                          className={`relative w-6 h-6 rounded-full border-2 ${getEventColor(
                            event.type
                          )} flex items-center justify-center text-white hover:scale-125 transition-transform shadow-md z-10`}
                        >
                          {getEventIcon(event.type)}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <div className="space-y-1">
                        <p className="font-medium">{getEventLabel(event.type)}</p>
                        <p className="text-sm">Time: {event.time}</p>
                        <p className="text-sm text-gray-300">{event.details}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[10px] text-gray-500 pt-3 border-t border-gray-100">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
            Machine Moved
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
            Bed Moved
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-white rounded-full border border-red-500"></span>
            Camera Tampered
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
            Electrical Tampered
          </span>
        </div>

        {/* View Event Log - Collapsible Section */}
        <div className="border-t border-gray-200 pt-4">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-left hover:bg-gray-50 p-2 rounded-lg transition-colors"
          >
            <h3 className="text-base text-gray-900">View Event Log</h3>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>
          
          {isExpanded && (
            <div className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Event Type</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.time}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-5 h-5 rounded-full border-2 ${getEventColor(
                              event.type
                            )} flex items-center justify-center text-white`}
                          >
                            {getEventIcon(event.type)}
                          </span>
                          <span>{getEventLabel(event.type)}</span>
                        </div>
                      </TableCell>
                      <TableCell>{event.details}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </UICard>
  );
}

export default function Frame2({ 
  selectedDate,
  onPillClick, 
  onEvidenceClick 
}: { 
  selectedDate?: string;
  onPillClick?: (bedNumber: string, patientId: string) => void; 
  onEvidenceClick?: (violation: any) => void;
}) {
  return (
    <TooltipProvider>
      <div className="content-stretch flex flex-col gap-[24px] items-start relative size-full">
        <Container39 />
        <Card4 onPillClick={onPillClick} onEvidenceClick={onEvidenceClick} />
        <DialysisUnitTimelineCard selectedDate={selectedDate} />
      </div>
    </TooltipProvider>
  );
}