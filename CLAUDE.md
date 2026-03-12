# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **vision prototype** for **SC Ops**, a labor optimization platform for South Coast Terminals. It demonstrates how supervisors can efficiently plan and assign labor against fixed production and shipment schedules.

**Client:** South Coast Terminals (100% toll chemical manufacturer)

### Related Documentation

- **`SITE_OVERVIEW.md`** - Project overview and site structure
- **`docs/scope.md`** - Complete Phase 1 scope (SOURCE OF TRUTH for features)
- **`docs/transcript-travis-wilson-2026-01-09.md`** - Discovery call transcript

**When in doubt about feature requirements, business logic, or priorities, refer to `docs/scope.md`.**

## Development Commands

**Always use `bun` instead of `npm` for this project.**

```sh
# Install dependencies
bun install

# Run development server (localhost:8080)
bun run dev

# Build for production
bun run build

# Build for development mode
bun run build:dev

# Lint code
bun run lint

# Preview production build
bun run preview
```

## Architecture

### Tech Stack
- **React 18** + **TypeScript** (with relaxed type checking)
- **Vite** for build tooling and dev server
- **React Router** for client-side routing
- **Tailwind CSS** for styling with custom design system
- **shadcn/ui** for UI component library (Radix UI primitives)
- **TanStack Query** for state management

### Path Aliases
Use `@/` to import from `src/`:
```tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

### TypeScript Configuration
The project uses relaxed TypeScript settings:
- `noImplicitAny: false`
- `strictNullChecks: false`
- `noUnusedParameters: false`
- `noUnusedLocals: false`

## Directory Structure

```
src/
├── pages/
│   ├── Index.tsx           # Landing page (/)
│   ├── LaborDemo.tsx       # Platform shell (/platform-shell/*)
│   └── NotFound.tsx        # 404 page
│
├── pages/demo/             # Platform shell views
│   ├── DemoDashboard.tsx   # Main dashboard
│   ├── DemoPlanning.tsx    # Labor planning calendar
│   ├── DemoPersonnel.tsx   # Personnel list
│   ├── DemoPersonnelProfile.tsx  # Individual employee profile
│   ├── DemoReports.tsx     # Reports overview
│   ├── DemoReportDetail.tsx # Report drill-down
│   ├── DemoSettings.tsx    # Settings overview
│   └── DemoSettingsDetail.tsx # Settings detail
│
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── southcoast/         # Landing page sections (SC Ops specific)
│   └── labor-demo/         # Platform demo components
│
├── hooks/                  # Custom React hooks
└── lib/                    # Utilities (cn() for className merging)
```

## Routing

All routes are defined in `src/App.tsx`:

| Route | Purpose |
|-------|---------|
| `/` | Landing page with problem/solution narrative |
| `/platform-shell/*` | Primary demo - supervisor labor planning tool |
| `*` | 404 catch-all |

## Key Features (Phase 1 Scope)

### 1. System of Record for Labor
- Employee schedules
- Assignments
- Labor utilization by day and week
- Qualification status by role and task type

### 2. Personnel & Qualifications
Three qualification levels per task:
- Not qualified
- Qualified with supervision
- Qualified independently

### 3. Production & Shipment Visibility (Read-Only)
- Calendar view of batches and shipments
- Data from Harvest ERP via SQL Server
- View only — no editing in this app

### 4. Labor Assignment
Core workflow for supervisors:
- View workload by plant, team, day, week
- Assign personnel to activities
- Save assignments (persisted in app)

### 5. Overtime Forecasting
- Flag overtime drivers before execution
- Identify red ticket candidates (out-of-window shipments)

### 6. Cost-Aware Suggestions
- Rank qualified workers by cost and overtime exposure
- Advisory recommendations for supervisors

### 7. Cross-Training Visibility
- Underutilization detection
- Overtime concentration analysis
- Single points of failure identification

## Plants in Scope

| Plant | Team Structure |
|-------|----------------|
| **String Road** | Board Operators, Area Operators, Press Operators, Bulk/Blending, Plant Techs |
| **Wallisville** | TTP, Bulk, Blenders, VM Team, Keystone Team, Plant Techs |
| **Port** | 1 Lead + 5 Operators (all cross-trained) |

## User Roles

| Role | Usage | Access |
|------|-------|--------|
| **Operations Supervisor** | Primary — plans labor monthly, reviews weekly | Full |
| **Plant Manager** | Secondary — oversight, reporting | Read + Reports |

## Planning Cadence

| When | Activity |
|------|----------|
| Last week of month | Plan next month's labor against known production + shipments |
| Every Monday | Review changes, adjust assignments for the week |

**Phase 1 is not designed for real-time intraday optimization.**

## Out of Scope (Phase 2)

- Production/shipment planning optimization
- MRP integration
- Planner-facing tools
- Automated schedule changes
- Real-time payroll integration
- Operator personal calendar view

## Domain Language & Terminology

- **Toll manufacturing** — Manufacturing on behalf of customers who own raw materials and finished products
- **Red ticket** — Overtime charge for shipments outside standard operating window (6am-2pm)
- **Board operator** — Runs reactor consoles
- **Area operator** — Covers reactor area, can sub for press and bulk
- **Press operator** — Dedicated to filter press area
- **Plant tech** — General maintenance and support
- **Qualification levels** — Not qualified → Qualified with supervision → Qualified independently

## Sample Data

The demo uses fictional but realistic scenarios based on South Coast Terminals' actual operations:

- **Facilities:** String Road, Wallisville, Port
- **Shift patterns:** 10-hour shifts (Wallisville), 12-hour shifts (String Road)
- **Operating window:** 6am-2pm standard, red tickets for out-of-window
- **Employee count:** ~65-68 total across all plants

## Success Criteria

Phase 1 is successful when:
- Supervisors can clearly see labor demand vs availability
- Overtime drivers are visible before execution
- Labor is allocated more efficiently without changing planning inputs
- The system replaces ad hoc spreadsheets and mental reasoning

---

## The Core Question

> "Given the plan we already have, are we using our people as efficiently as possible?"

Phase 1 answers this question. Phase 2 enables production planning optimization.
