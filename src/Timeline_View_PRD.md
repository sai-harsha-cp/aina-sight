# Product Requirements Document: Timeline View
## NephroPlus Centre Intelligence Console

**Version:** 1.0  
**Date:** November 11, 2025  
**Product:** Centre Manager Dashboard  
**Feature:** Timeline View

---

## 1. Executive Summary

The Timeline View provides dialysis centre managers with a comprehensive chronological visualization of all operational activities across the dialysis facility. It enables managers to track patient dialysis sessions, bed utilization, storage room activities, and facility-level security events throughout the operational day (5 AM to 5 PM), offering both macro and micro-level visibility into centre operations.

---

## 2. Problem Statement

Centre managers need to:
- Understand when and where clinical activities occur throughout the day
- Track patient flow and bed occupancy patterns across different time periods
- Monitor stock movement and storage room access patterns
- Identify security and equipment tampering incidents
- Investigate specific patient sessions to understand compliance violations
- Compare operational patterns across different days to identify trends

Current challenges include:
- No centralized time-based view of all centre activities
- Difficulty correlating events that happen simultaneously across different areas
- Limited ability to drill down from high-level timelines to specific event details
- No way to track historical patient session patterns over multiple days

---

## 3. Goals and Success Metrics

### Goals
1. Provide complete temporal visibility into centre operations
2. Enable rapid investigation of compliance issues through time-based navigation
3. Support pattern recognition across different operational areas
4. Facilitate historical analysis of patient sessions and facility events

### Success Metrics
- Time to investigate compliance violations reduced by 60%
- 100% coverage of all operational areas in timeline views
- Ability to navigate through 7+ days of historical data
- Center managers can identify time-based patterns within 2 minutes of opening Timeline View

---

## 4. User Personas

### Primary: Dialysis Centre Manager
- **Needs:** Monitor real-time and historical operations, investigate compliance issues, optimize resource allocation
- **Pain Points:** Too much data scattered across different systems, difficult to understand temporal patterns
- **Usage Pattern:** Checks Timeline View multiple times daily, especially after shift changes or when investigating violations

### Secondary: Operations Supervisor
- **Needs:** Track staff efficiency, monitor storage room activities, ensure security protocols
- **Pain Points:** Cannot see who accessed storage room and when, difficult to correlate events
- **Usage Pattern:** Reviews timeline weekly to identify operational bottlenecks

---

## 5. Feature Overview

Timeline View is organized into three distinct sub-views, each focusing on different aspects of centre operations:

1. **Bed and Machine Level** - Patient dialysis sessions and bed occupancy
2. **Storage Room** - Staff access and inventory movement tracking
3. **Dialysis Unit** - Facility-level events (equipment movement, security incidents)

Users switch between these views using prominent chip-style navigation tabs positioned at the top of the screen.

---

## 6. Detailed Feature Requirements

### 6.1 Date Navigation System

**Purpose:** Allow managers to view timeline data for any day within the operational week.

**Functionality:**
- Display current month and year with a dropdown selector
- Show 7-day horizontal date picker with day names (Tue, Wed, Thu, etc.) and dates
- Highlight currently selected date with blue background
- Provide left/right arrow buttons to navigate to previous/next weeks
- Default to current date (or most recent operational date) on initial load
- All three sub-views respond to date selection changes

**Visual Design:**
- Month selector appears as a gray chip with calendar icon
- Date chips arranged horizontally in a row
- Selected date chip uses blue (#2563EB) background with white text
- Unselected dates use light gray background with dark text
- Navigation arrows positioned on left and right ends

---

### 6.2 Bed and Machine Level View

**Purpose:** Track all patient dialysis sessions across 8 beds throughout the operational day.

#### 6.2.1 KPI Summary Cards
Display four key metrics at the top of the view:
- **Total Sessions:** Count of completed dialysis sessions for the selected day
- **Bed Occupancy:** Percentage of utilized bed capacity
- **Average Duration:** Mean duration of dialysis sessions in hours (e.g., "4.5h")
- **Patients Served:** Total unique patients who received treatment

Each KPI card shows:
- Icon representing the metric (in gray background circle)
- Metric label in gray text
- Metric value in large, bold text
- Optional trend indicator vs. previous day

#### 6.2.2 Timeline Visualization

**Structure:**
- Horizontal time ruler spanning 5 AM to 5 PM (12-hour window)
- 8 rows representing each bed (Bed 1 through Bed 8)
- Each bed row shows patient session(s) as colored horizontal bars (pills)

**Session Pills:**
- Position: Placed horizontally based on session start and end times
- Length: Width represents session duration (proportional to timeline)
- Color: Indicates compliance level
  - Green: 85% or higher compliance (excellent)
  - Amber: 70-84% compliance (needs attention)
  - Red: Below 70% compliance (critical)
- Content: Displays patient ID (e.g., "Guest-101")
- Interaction: Clicking a pill opens the detailed Patient Journey Modal

**Timeline Features:**
- Hour markers at each hour interval (05:00, 06:00, etc.)
- Vertical grid lines to aid time reading
- Visual alignment of concurrent sessions across different beds
- Hover state on pills shows brief session summary

**Use Cases:**
1. Manager sees all beds occupied from 8-11 AM (peak period identification)
2. Notice Bed 4 has red compliance bar - clicks to investigate specific violations
3. Compare session lengths across beds to identify efficiency issues
4. Track when specific patient IDs received treatment

---

### 6.3 Storage Room Timeline View

**Purpose:** Monitor and audit all personnel access to the storage room, tracking stock movements and time spent.

#### 6.3.1 KPI Summary Cards
Display four metrics:
- **Total Entries:** Number of times anyone entered storage room
- **Stock In Events:** Count of inventory addition activities
- **Stock Out Events:** Count of inventory removal activities  
- **Average Duration:** Mean time spent per storage room visit (in minutes)

#### 6.3.2 Person-Based Timeline

**Structure:**
- Horizontal time ruler (5 AM to 5 PM)
- Dynamic rows labeled "Person 1", "Person 2", "Person 3", etc.
- Number of rows adapts based on maximum concurrent people in storage room

**Entry Pills:**
- Represent each storage room visit with horizontal bars
- Position and width based on entry and exit times
- Multi-colored segments within each pill showing different activities:
  - **Green segments:** Stock In activities (adding inventory)
  - **Blue segments:** Stock Out activities (removing inventory)
  - **Gray segments:** Idle time (present but no activity detected)

**Overlap Handling:**
- When multiple people are in storage room simultaneously, entries appear in different rows
- System automatically assigns entries to rows to avoid visual overlap
- Maximum concurrent occupancy determines number of visible rows

**Tooltip Information:**
Hovering over an entry pill displays:
- Staff member name (e.g., "Nurse Priya", "Tech Rajesh")
- Entry time and exit time
- Duration of visit
- Breakdown of activities with timestamps:
  - "Stock In: 06:15 - 06:35"
  - "Idle: 06:35 - 06:40"
  - "Stock Out: 06:40 - 07:00"

**Legend:**
- Visual legend showing color meanings (Stock In = green, Stock Out = blue, Idle = gray)
- Positioned above the timeline for easy reference

#### 6.3.3 Storage Room Entry Log Table

A detailed tabular view below the timeline showing:
- Staff Name
- Entry Time
- Exit Time  
- Duration (in minutes)
- Activity badges (color-coded chips showing Stock In, Stock Out, Idle)

**Sorting:** Default chronological order by entry time
**Use Case:** Export or detailed audit review

---

### 6.4 Dialysis Unit Timeline View

**Purpose:** Track facility-level events including equipment movements and security incidents.

#### 6.4.1 KPI Summary Cards
Display counts of:
- **Machines Moved:** Dialysis machines repositioned
- **Beds Moved:** Patient beds relocated
- **Camera Tampering:** Security camera interference detected
- **Electrical Tampering:** Electrical duct or panel access detected

#### 6.4.2 Event Timeline

**Structure:**
- Horizontal time ruler (5 AM to 5 PM)
- Single timeline track where all unit events are plotted
- Events appear as colored markers/badges at their occurrence time

**Event Markers:**
- **Blue:** Machine moved events (with gear icon)
- **Green:** Bed moved events (with bed icon)
- **Red:** Camera tampering (with camera icon)
- **Amber:** Electrical tampering (with lightning bolt icon)

**Event Details:**
Clicking or hovering on a marker shows:
- Event type label
- Exact time of occurrence
- Detailed description (e.g., "Dialysis Machine #3 repositioned from Bed 5 to Bed 6")

#### 6.4.3 Events Detail Table

Below the timeline, comprehensive table showing:
- Event Type (with icon)
- Time
- Details/Description
- Optional: Triggered camera footage link

**Use Cases:**
1. Security audit - track all camera tampering incidents for the week
2. Equipment tracking - verify when and why machines were moved
3. Compliance review - ensure electrical duct access was authorized maintenance
4. Incident investigation - correlate facility events with patient session issues

---

### 6.5 Patient Journey Modal (Deep Dive)

**Trigger:** Opens when user clicks on any bed session pill in Bed and Machine Level view.

**Purpose:** Provide detailed, chronological view of all SOPs and events during a specific patient's dialysis session, with ability to navigate through historical sessions for the same patient.

#### 6.5.1 Modal Header

**Session Navigation:**
- Left arrow button: Load previous session (earlier date)
- Right arrow button: Load next session (later date)
- Current session date badge (e.g., "7th Nov")
- Loading state animation during session switches
- Arrows disabled when at earliest/latest available session

**Session Summary Metrics:**
- **Time Range:** Session start and end times (e.g., "08:50 - 14:00")
- **Compliance Score:** Overall compliance percentage with trend indicator
  - Example: "92%" with "+3% vs yest" in green
- **Violations Count:** Number of SOP violations with trend
  - Example: "5" with "-1 vs yest" in green/red
- **Coverage:** SOPs completed vs total SOPs
  - Example: "178 / 214"

**Bed and Patient Information:**
- Bed number prominently displayed (e.g., "Bed 4")
- Patient ID (e.g., "Guest-104")
- Close button (X) in top-right corner

#### 6.5.2 Patient Journey Timeline

**Visual Structure:**
- Horizontal time ruler spanning session duration plus buffer
- Session phases indicated by background color zones:
  - **Waiting Phase:** Patient arrival to pre-dialysis start
  - **Pre-Dialysis Phase:** Preparation activities
  - **During Dialysis Phase:** Active dialysis treatment (largest segment)
  - **Post-Dialysis Phase:** Treatment completion activities
  - **Post-Session Phase:** Bed cleanup and turnover

**Phase Visualization:**
- Each phase has subtle background color differentiation
- Phase boundary markers with time labels
- Phase names displayed in timeline header

#### 6.5.3 SOP Events List

**Chronological Table:**
Each row represents one SOP checkpoint with:

1. **Timestamp:** Exact time the SOP should occur/occurred (e.g., "08:52")

2. **SOP Name:** Full SOP description
   - Examples: "Hand Hygiene Protocol", "BP Monitoring (Hourly)", "Vascular Access Inspection"

3. **Phase Indicator:** Which session phase this SOP belongs to
   - Displayed as chip/badge with phase color

4. **Status Indicator:**
   - **Compliant:** Green circle with checkmark icon
   - **Violated:** Red circle with X icon  
   - **Missed:** Red circle with exclamation icon
   - **Uncertain:** Amber circle with question icon

5. **Thumbnail Preview:** Small image showing AI-detected frame from camera footage

6. **Evidence Button:** "View Evidence" button to open detailed evidence modal
   - Shows full camera footage, AI confidence scores, detection details

**Row Interactions:**
- Hover: Row highlights with subtle background change
- Click on thumbnail: Opens evidence detail modal
- Click "View Evidence": Opens evidence detail modal
- Scrollable list if many SOPs

**Row Visual Design:**
- Status icon and color-coding make compliance visible at a glance
- Violated/Missed rows draw more attention with red indicators
- Icons help with quick pattern recognition

#### 6.5.4 Historical Session Comparison

**Navigation Flow:**
1. User clicks left/right arrows to navigate between dates
2. Brief loading state (1 second) with skeleton or spinner
3. All data refreshes: session metrics, timeline, SOP list
4. Same bed and patient maintained across navigation
5. User can compare compliance trends day-over-day

**Trend Indicators:**
- Compliance changes: "+3% vs yest" in green or "-2% vs prev" in red
- Violation changes: "-1 vs yest" in green or "+2 vs prev" in red
- Visual arrow indicators (↑ ↓) accompanying trends

**Use Cases:**
1. **Violation Investigation:** Click red pill → see exact SOP missed with evidence photo → review camera footage
2. **Trend Analysis:** Navigate through patient's last 3 sessions → notice declining compliance → identify recurring problem SOP
3. **Audit Trail:** Provide detailed session report with all timestamps and statuses for regulatory compliance
4. **Pattern Recognition:** Notice "BP Monitoring" frequently missed around 10 AM → adjust nurse scheduling
5. **Staff Training:** Use evidence photos from violated SOPs as training materials

---

## 7. User Workflows

### Workflow 1: Investigating a Compliance Violation

**Scenario:** Manager receives alert that Bed 4 had low compliance on Nov 7.

**Steps:**
1. Navigate to Timeline View
2. Select "Bed and Machine Level" sub-view
3. Use date picker to select Nov 7
4. Observe Bed 4 has red compliance bar (68% compliance)
5. Click on Bed 4's red pill for Guest-104
6. Patient Journey Modal opens showing session timeline
7. Scan SOP list - notice 3 violations:
   - Pre-Session Weight Recording (Violated at 08:48)
   - Vascular Access Inspection (Violated at 08:55)
   - Machine Safety Check (Violated at 09:05)
8. Click on first violation thumbnail
9. Evidence Detail Modal opens showing camera footage and AI detection details
10. Identify root cause: New nurse on duty unfamiliar with pre-session protocols
11. Document finding and schedule training session

**Time to Complete:** 2-3 minutes

---

### Workflow 2: Auditing Storage Room Access

**Scenario:** Operations supervisor needs to verify that late-night storage room access on Nov 6 was authorized.

**Steps:**
1. Navigate to Timeline View
2. Click "Storage Room" sub-view chip
3. Select Nov 6 from date picker
4. Scroll to evening hours (around 16:00-17:00 on timeline)
5. No entries visible in evening - check if any entries near closing
6. Review Entry Log Table below timeline
7. Scroll table to see all entries - last entry at 15:40 by Tech Sunil
8. Confirm: No late-night unauthorized access occurred
9. Export table data for compliance report

**Time to Complete:** 1-2 minutes

---

### Workflow 3: Analyzing Bed Utilization Patterns

**Scenario:** Centre manager wants to optimize appointment scheduling based on occupancy patterns.

**Steps:**
1. Open Timeline View → Bed and Machine Level
2. Navigate through Mon-Fri using date picker
3. Observe patterns for each day:
   - Mon: All 8 beds occupied 8 AM - 12 PM (peak)
   - Tue-Thu: Similar pattern, peak 8-11 AM
   - Fri: Lower utilization, only 6 beds used
4. Note KPI cards show 85% average occupancy Mon-Thu, 65% on Friday
5. Identify opportunity: Schedule elective cases on Friday afternoons
6. Notice Bed 8 consistently has shorter sessions (3.5h vs 4.5h average)
7. Investigate Bed 8 sessions → find equipment running faster than optimal
8. Document findings for maintenance review

**Time to Complete:** 5-7 minutes

---

### Workflow 4: Tracking Equipment Movement

**Scenario:** Maintenance manager needs to verify dialysis machine relocation history.

**Steps:**
1. Navigate to Timeline View
2. Select "Dialysis Unit" sub-view
3. Select Nov 5 from date picker
4. Review KPI card: "2" machines moved
5. Scan timeline for blue "Machine Moved" markers
6. Find markers at 06:30 and 11:20
7. Click first marker → see details: "Dialysis Machine #3 repositioned from Bed 5 to Bed 6"
8. Click second marker → see details: "Dialysis Machine #1 moved to maintenance area"
9. Cross-reference with maintenance logs to verify authorization
10. Note: Machine #1 movement at 11:20 correlates with session gap on Bed 3
11. Scroll to Events Table to export complete movement log

**Time to Complete:** 2-3 minutes

---

### Workflow 5: Comparing Patient Session Performance Over Time

**Scenario:** Clinical supervisor wants to track improvement in a patient's treatment compliance over multiple sessions.

**Steps:**
1. Go to Timeline View → Bed and Machine Level
2. Select Nov 7 (most recent session)
3. Identify patient Guest-101 on Bed 1
4. Click session pill → Patient Journey Modal opens
5. Note: 92% compliance, 5 violations
6. Click left arrow to load Nov 6 session
7. Wait for 1-second loading transition
8. Note: 90% compliance, 6 violations
9. Click left arrow again for Nov 5 session
10. Note: 88% compliance, 7 violations
11. Observe positive trend: Compliance improving, violations decreasing
12. Review specific SOPs - notice "Hand Hygiene Protocol" was violated on Nov 5-6 but compliant on Nov 7
13. Conclude: Staff training on hand hygiene is showing results
14. Document trend for weekly clinical quality meeting

**Time to Complete:** 3-4 minutes

---

## 8. Design Principles

### 8.1 Temporal Clarity
- Time always flows left-to-right
- Consistent 5 AM - 5 PM timeline across all sub-views
- Hour markers clearly visible and aligned
- Timeline scales proportionally (1 hour = same width everywhere)

### 8.2 Color-Coded Compliance
- Green = Compliant/Good (85%+)
- Amber = Warning (70-84%)
- Red = Critical/Violated (<70%)
- Consistent color meaning across all views

### 8.3 Information Hierarchy
- KPI cards at top provide quick summary
- Timeline provides mid-level overview
- Modals and tables provide deep detail
- Users can drill down progressively

### 8.4 Visual Density Management
- Clean whitespace in timelines
- Overlapping events handled by row separation (Storage Room)
- Pills/bars sized proportionally to duration
- Tables for detail, timelines for patterns

### 8.5 Contextual Details
- Tooltips for hover-state quick info
- Modals for deep investigation
- Persistent legends for color meanings
- Trend indicators show change over time

---

## 9. Accessibility Requirements

### Visual
- Color is not the only compliance indicator (icons and text labels included)
- High contrast ratios for text on backgrounds
- Minimum 14px font size for readability
- Clear visual focus states for keyboard navigation

### Interaction
- All interactive elements (pills, markers, chips) are keyboard accessible
- Tab order follows logical left-to-right, top-to-bottom flow
- Escape key closes modals
- Arrow keys navigate between date chips

### Screen Readers
- Semantic HTML structure for timeline elements
- ARIA labels for time markers and session pills
- Status announcements when navigating between sessions
- Alt text for thumbnails and icons

---

## 10. Edge Cases and Error Handling

### No Data Scenarios
- **No sessions for selected date:** Display empty timeline with message "No dialysis sessions scheduled for [date]"
- **No storage entries:** Show timeline with message "No storage room activity recorded for [date]"
- **No unit events:** Display "No facility events detected for [date]"

### Data Loading
- Show skeleton loaders during initial data fetch
- Display "Loading..." state during session navigation in Patient Journey Modal
- Timeout after 5 seconds with error message and retry button

### Concurrent Overlaps
- Storage Room: Dynamically create new rows to prevent visual overlap
- Bed and Machine Level: Each bed has dedicated row, so no overlap possible
- Dialysis Unit: Stack events vertically if occurring at same time

### Historical Data Limits
- Date picker shows 30 days of historical data
- Older data accessible through "View More History" option
- Clear messaging when reaching earliest available date

### Partial Data
- If some SOPs missing timestamps, show in table without timeline position
- If thumbnail image fails to load, show placeholder icon
- If compliance score cannot be calculated, show "N/A" instead of percentage

---

## 11. Future Enhancements (Out of Scope for V1)

### Phase 2 Considerations
- Export timeline as PDF report
- Custom time range selection (not limited to 5 AM - 5 PM)
- Real-time updates (live mode) for current day
- Multi-bed comparison view (compare same patient across different beds)
- Predictive analytics highlighting (AI predictions of future violations)
- Filter timeline by specific SOP categories
- Staff member timeline (track individual nurse activities across all beds)
- Integration with scheduling system to show planned vs actual sessions
- Mobile-responsive timeline views
- Video playback directly in timeline (not just evidence modal)

---

## 12. Dependencies and Assumptions

### Dependencies
- AI detection system must provide SOP event timestamps
- Camera footage storage must retain 30 days of data minimum
- Patient session data must include start/end times
- Storage room access logs must capture entry/exit events
- Equipment sensors must detect movement and tampering

### Assumptions
- Users have desktop/laptop screen (minimum 1366x768 resolution)
- Network bandwidth supports thumbnail image loading
- Users understand basic dialysis terminology
- Centre operates consistent daily hours (5 AM - 5 PM)
- Maximum 8 beds per centre
- Maximum 3 concurrent people in storage room

---

## 13. Open Questions

1. **Data Retention:** How long should timeline data be accessible? (Current assumption: 30 days)

2. **Offline Access:** Should timeline data be cached for offline review?

3. **Permissions:** Should different user roles have access to different sub-views? (e.g., storage managers only see Storage Room timeline)

4. **Alerts Integration:** Should critical events in timeline trigger real-time notifications?

5. **Customization:** Should managers be able to customize which KPIs appear in summary cards?

6. **Export Formats:** What export options are needed? (PDF, Excel, CSV?)

7. **Multi-Centre:** How should timeline work for managers overseeing multiple centres?

---

## 14. Success Criteria for Launch

### Must Have (V1 Launch)
- All three sub-views functional (Bed & Machine, Storage Room, Dialysis Unit)
- Date navigation working for current week ± 2 weeks
- Patient Journey Modal opens and displays SOP events correctly
- Compliance color-coding accurate across all views
- KPI cards calculate and display correct metrics
- Timeline scales and positions events accurately
- Tooltips show detailed information on hover

### Should Have (V1.1)
- Historical session navigation (7+ days backward)
- Entry Log table with export capability
- Loading states for all async operations
- Error handling for network failures
- Evidence Detail Modal integration

### Nice to Have (V2)
- Custom date range selection
- PDF export of timeline reports
- Real-time updates
- Staff member activity tracking

---

## 15. Stakeholder Sign-off

**Product Owner:** ___________________________ Date: ___________

**Centre Manager Representative:** ___________________________ Date: ___________

**Operations Lead:** ___________________________ Date: ___________

**Engineering Lead:** ___________________________ Date: ___________

---

## Appendix A: Terminology

- **SOP (Standard Operating Procedure):** Clinical or operational protocol that must be followed
- **Compliance:** Percentage of SOPs correctly completed during a session/period
- **Violation:** SOP that was performed incorrectly or not per protocol
- **Missed:** SOP that was not performed at all
- **Session:** Single dialysis treatment period for one patient
- **Bed Journey:** Timeline view of all sessions occurring on a specific bed
- **Patient Journey:** Detailed view of all SOPs during a patient's session
- **Stock In:** Inventory items added to storage room
- **Stock Out:** Inventory items removed from storage room
- **Tampering:** Unauthorized interference with equipment or cameras

---

## Appendix B: Visual Reference

*[Note: In actual PRD, this section would include screenshots, mockups, and wireframes of each sub-view, modals, and key interactions]*

**Included Visuals:**
1. Timeline View - Bed and Machine Level (full page)
2. Storage Room Timeline with overlapping entries
3. Dialysis Unit Timeline with event markers
4. Patient Journey Modal - session detail view
5. Date picker and navigation controls
6. KPI card examples
7. Evidence Detail Modal preview
8. Color-coded compliance legend

---

**End of Document**
