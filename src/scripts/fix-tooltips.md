# Tooltip Fix Script

This documents the changes needed for Frame3.tsx tooltips:

## Changes Required:
1. Replace all `text-[7px]` with `text-[12px]` (45 instances)
2. Replace tooltip labels based on position:
   - First white area (leftmost): "Bed Empty" → "Patient Waiting"
   - Gray areas: "Patient Waiting" → "Patient on Bed" 
   - Keep "Dialysis Session" as is
   - Keep post-dialysis "Patient on Bed" as is
   - Keep final "Bed Empty" as is

## Pattern:
- White (start) = "Patient Waiting" + "Off Bed"
- Gray (pre-dialysis) = "Patient on Bed" + "Pre-Dialysis"
- Colored (dialysis) = "Dialysis Session" 
- Gray (post-dialysis) = "Patient on Bed" + "Post-Dialysis"
- White (end) = "Bed Empty" + "Available"
