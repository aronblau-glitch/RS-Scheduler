# RS Scheduler — Excel VBA Source Code

Extracted from `RS_Schedule_Summer_26.xlsm`.

## File Overview

| File | Description | Lines |
|------|-------------|-------|
| `Module1_Scheduler.bas` | **Main scheduling engine.** `run_prog()` is the entry point. Reads student mandates, provider availability, and restrictions, then auto-assigns sessions to timeslots. | 1091 |
| `Module3_RuleProcessor.bas` | **Rule re-processor.** `process_new_rule()` re-runs the scheduler with updated constraints without rebuilding from scratch. | 385 |
| `Sheet5_TimeslotView.cls` | **Timeslot sheet logic.** Handles row highlighting, cell selection, and visual feedback on the main schedule grid. | 316 |
| `SwapPanel_Form.frm` | **Swap Panel UserForm.** UI for manually swapping a student between two providers/timeslots. | 226 |
| `Module2_Helpers.bas` | **Shared utility functions** used across the other modules. | 29 |
| `ProviderSchedule_Form.frm` | **Provider schedule viewer.** Shows a single provider's full weekly schedule in a popup. | 66 |
| `StudentSchedule_Form.frm` | **Student schedule viewer.** Shows a single student's sessions across all providers. | 60 |
| `ClassSchedule_Form.frm` | **Class/group schedule viewer.** Shows sessions for a class or group. | 60 |
| `ThisWorkbook.cls` | **Workbook-level events** (open/close hooks). | 8 |

## Key Excel Sheets Referenced in Code

| Sheet Name | Purpose |
|------------|---------|
| `Student Mandates List` | Input — list of students with required session counts per service type |
| `Providers Config` | Input — provider names, availability, and capacity per timeslot |
| `Student Restrictions` | Input — students who cannot be scheduled at certain times |
| `Allowed Students` | Input — optional per-provider student allowlists |
| `Timeslot` | Output — the generated schedule grid (provider columns × time rows) |
| `Draft` | Intermediate working sheet used during scheduling |
| `Remaining Sessions` | Auto-generated temp sheet tracking unfilled mandates |

## How the Scheduler Works (high level)

1. `run_prog()` in `Module1_Scheduler.bas` copies `Student Mandates List` into a temp sheet called `Remaining Sessions`.
2. It iterates over every timeslot defined in `Providers Config`, attempting to assign students to providers.
3. Student restrictions (`Student Restrictions`) and duplicate-session policy (prompted at start) are enforced on each assignment attempt.
4. Results are written to the `Timeslot` output sheet.
5. `process_new_rule()` in `Module3_RuleProcessor.bas` can re-run this process after constraint changes without a full reset.

## How to Open in Excel

1. Open `RS_Schedule_Summer_26.xlsm` in Excel.
2. Press `Alt + F11` to open the VBA editor.
3. All modules listed above appear in the Project Explorer on the left.
