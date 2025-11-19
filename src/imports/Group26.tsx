import svgPaths from "./svg-leqvy07lhx";

function Group() {
  return (
    <div className="relative size-full" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 26">
        <g id="Group">
          <path d={svgPaths.p24ecc80} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-blue-600 h-[33.553px] left-[4.47px] rounded-[2.237px] top-[4.47px] w-[50.329px]">
      <div className="absolute flex inset-[13.33%_15.33%_11.91%_15.56%] items-center justify-center">
        <div className="flex-none h-[25.083px] scale-y-[-100%] w-[34.785px]">
          <Group />
        </div>
      </div>
    </div>
  );
}

function AinaLogo() {
  return (
    <div className="absolute h-[42.5px] left-0 rounded-[4.474px] top-0 w-[175.592px]" data-name="AINA Logo">
      <div className="h-[42.5px] overflow-clip relative rounded-[inherit] w-[175.592px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[59.28px] not-italic text-[#212121] text-[0px] text-[19.013px] text-nowrap top-[8.95px] whitespace-pre">
          <span className="font-['Inter:Medium',sans-serif] font-medium">AINA</span> <span className="font-['Inter:Light',sans-serif] font-light">SIGHT</span>
        </p>
        <Frame />
      </div>
      <div aria-hidden="true" className="absolute border-[2.237px] border-blue-600 border-solid inset-0 pointer-events-none rounded-[4.474px]" />
    </div>
  );
}

export default function Group1() {
  return (
    <div className="relative size-full">
      <AinaLogo />
      <p className="absolute bottom-[11px] font-['Inter:Extra_Light',sans-serif] font-extralight leading-[normal] left-[calc(50%-57.796px)] not-italic text-[#3d3d3d] text-[9px] text-nowrap translate-y-[100%] whitespace-pre">Powered by Cloudphysician</p>
    </div>
  );
}