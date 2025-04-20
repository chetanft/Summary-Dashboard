Consignor views of the Control Tower. It's detailed, organized, and ready to be shared with your design, product, or engineering teams.



Consignor View – for consignors who want end-to-end visibility into trip performance and exception insights from Indent to ePOD.


 Consignor View
:compass: Overview Tab
Summary Cards showing negative KPIs across:
Indent Issues: Delayed placement, RC/PAN mismatch, unapproved 3rd-party vehicle
In-Transit Alerts (see full list below)
ePOD Issues: Late POD upload, rejected POD, missing proof, disputes
Trends Graph: Show 7-day or 30-day view of issue counts by stage
KPI Metrics:
% Trips with Exceptions
Avg Delay Duration
Escalation Rate
On-time Delivery %
:page_facing_up: Transactions Tab
List of trips with alert(s)
Columns:
Trip ID
Indent Issue (Y/N)
In-Transit Alerts (count + hover to preview type)
ePOD Issue (Y/N)
Escalation Status
Delay Duration
Current Status
Action Taken
Filters: Date, Alert Type, Trip Type, Lane, Vehicle, LSP
:mag: Trip-Level Detail View
Show for each trip:
Vehicle Number
Trip ID
LSP Name
Timeline View: Markers for alerts with timestamps
Complete list of exceptions raised (by stage)
Actions taken, comments, escalation trail
:warning: In-Transit Alert Types (Negative KPIs)
Long stoppage
Route deviation
Diversion
GPS tracking failure
Detention at origin
Detention at destination
E-Waybill expiry
SIM consent failure
Driver unreachable
All alerts must be timestamped, with current status and action log.
:memo: Notes:
All views should support real-time data refresh, have consistent filtering, and provide an easy way to export reports or share trip status.
Design for hierarchical access – Business Executives get full operational control, Consignors see summarized insights.

KPIs:
Here’s a focused list of only the failing KPIs — the ones that complain to the consignor about what went wrong in their shipments. These KPIs highlight inefficiencies, compliance issues, or failed control tower interventions. Perfect for a “What Went Wrong” dashboard view:
:x: Consignor Dashboard – Failing KPIs (What Went Wrong)
:red_circle: Delayed Execution
% of Trips Delayed In Transit
 Trips that exceeded expected transit time.
% of Trips with Detention at Origin
 Delays before dispatch due to loading hold-ups or coordination failure.
% of Trips with Detention at Destination
 Unloading delays causing vehicle idle time.
% of Trips with Long Stoppage (>6/12/24 hrs)
 Unexpected halts en route affecting delivery timelines.
:red_circle: Non-Compliant or Untracked Movement
% of Trips with Route Deviation
 Driver left the planned route without approval.
% of Trips with Diversion
 Trips went to an unintended location, posing compliance risk.
% of Trips with E-Waybill Expiry
 Shipments moved with expired documents.
% of Trips Not Tracked (GPS/SIM Failure)
 No visibility during the journey, increasing risk.
% of Trips with Driver Change Not Captured
 Driver changed mid-trip but not updated in system, impacting tracking.
:red_circle: Failure in Closure & Compliance
% of Trips Not Auto Closed
 System failed to recognize delivery, possibly due to tracking or geo issues.
% of PODs Delayed or Rejected
 Proof of delivery not submitted on time or with errors.
% of Trips with Multiple Escalations
 Trips that faced 2 or more issues: delays, stoppages, FO non-response.
% of Critical Incidents (Breakdowns / Accidents / Seizures)
 Operational emergencies causing delays and risk exposure.
Each of these KPIs should be:
Highlighted in red/yellow in the dashboard
Accompanied with count + percentage trend
