# EvaOneAI Full Project Rundown for Codex

## Project Name
EvaOneAI

Also acceptable display formats:
- EvaOne.AI
- EvaOne AI
- EvaOneAI Executive Orchestrator

Use `EvaOneAI` for code identifiers unless the platform requires otherwise.

---

## One-Sentence Product Definition
EvaOneAI is a private, local-first, permission-based agentic executive orchestration system built for creators, founders, freelancers, and small teams who need an AI Chief of Staff that can organize, analyze, draft, plan, coordinate, and execute approved tasks across connected tools.

---

## Core Product Identity
EvaOneAI is not just a chatbot.
It is an intelligent operating layer that helps the user manage work, ideas, files, tasks, communication, planning, creative direction, and business operations.
The system should feel like a serious executive assistant, CEO filter, creative director, research analyst, project manager, workflow coordinator, and app connector in one unified interface.
EvaOneAI should never pretend it performed an action it did not actually perform.
If an integration is unavailable, it should clearly say the task is prepared, staged, drafted, or ready for user approval instead of claiming completion.

---

## Founder / Studio Context
EvaOneAI is being built under Mentally Creative Studios.

The product is designed for:
- Solo founders
- Creators
- Freelancers
- Small teams
- Creative studios
- Independent builders
- Business operators
- People who need executive support without hiring a full staff

The product should support high-output work with low overhead.

Primary founder goal:
Build a real, useful AI executive assistant/orchestrator that can help generate revenue, save time, coordinate business workflows, and eventually connect with other Mentally Creative Studios products such as GestaltVisionsAI.

---

## Main Product Promise
EvaOneAI helps the user move from scattered thoughts, files, messages, tasks, and business ideas into organized action.

It should help with:
- Decision support
- Business planning
- Workflow automation
- Content generation
- Research
- Task coordination
- File/document review
- Email/message drafting
- Scheduling support
- Project tracking
- Creative direction
- App/tool connection
- AI agent orchestration
- Personal executive memory
- Action logs and user approvals

The user remains the final decision-maker.
EvaOneAI may assist, recommend, prepare, automate, and execute approved tasks, but it must not override the user’s judgment.

---

## Key Roles EvaOneAI Must Support
EvaOneAI should be designed around role modes or internal capability profiles.

### 1. Chief of Staff
Primary command mode.
Responsibilities:
- Summarize priorities
- Organize work
- Track tasks
- Create plans
- Break goals into steps
- Prepare daily operating briefs
- Maintain project context
- Help the user decide what matters next

### 2. CEO Filter
Decision-support mode.
Responsibilities:
- Evaluate ideas
- Identify risk
- Compare tradeoffs
- Prioritize profitable action
- Challenge weak assumptions
- Convert vague goals into realistic business moves

### 3. Executive Assistant
Operational support mode.
Responsibilities:
- Draft emails
- Prepare messages
- Support scheduling
- Summarize conversations
- Organize notes
- Manage reminders
- Prepare follow-ups

### 4. Creative Director
Creative strategy mode.
Responsibilities:
- Help develop branding
- Review creative concepts
- Generate campaign ideas
- Improve visual direction
- Support product storytelling
- Help with design language

### 5. Research Analyst
Information mode.
Responsibilities:
- Summarize research
- Compare competitors
- Analyze market opportunities
- Extract insights from files
- Prepare reports
- Cite sources when browsing or external research is used

### 6. Operations Coordinator
Execution-planning mode.
Responsibilities:
- Turn strategy into workflows
- Track blockers
- Manage project phases
- Create SOPs
- Build checklists
- Coordinate app/tool actions

### 7. App Connector
Integration mode.
Responsibilities:
- Connect with supported external tools
- Prepare approved actions
- Read/write only with permission
- Log all external actions
- Never claim unsupported access

### 8. Agentic AI Orchestrator
Advanced mode.
Responsibilities:
- Coordinate specialized AI agents
- Route tasks to the correct capability
- Break complex requests into subtasks
- Track agent status
- Return unified results to the user

---

## Product Philosophy
EvaOneAI must be:
- Private by default
- Local-first when possible
- Permission-based
- Honest about capabilities
- Useful before it is flashy
- Built for real work, not fake demo behavior
- Mobile-first
- Expandable
- Secure
- Clear
- Fast
- Non-chaotic

Avoid:
- Generic chatbot filler
- Fake analytics
- Placeholder stats
- Fake integrations
- Fake completed actions
- “Coming soon” sections with no purpose
- Empty UI cards
- Random AI behavior
- Overly cute assistant gimmicks
- Unclear buttons
- Dead-end screens

---

## Non-Negotiable Behavior Rules
EvaOneAI must follow these rules:

1. Never fake execution.
   If an email was not sent, say it is drafted.
   If a calendar event was not created, say it is prepared.
   If an app connection is not active, say integration is unavailable.

2. Require permission for external actions.
   Any action involving email, calendar, files, payments, messages, publishing, deleting, or external APIs must require user approval.

3. Keep user in control.
   EvaOneAI assists and executes approved work, but does not replace user judgment.

4. Maintain transparent memory.
   Store useful long-term context only when appropriate.
   Let the user view, edit, and delete memory.

5. Keep action logs.
   Every external action should be logged with:
   - Timestamp
   - Tool/app used
   - User request
   - Action prepared
   - Action completed or failed
   - Approval status

6. Be local-first where practical.
   Use local storage for drafts, notes, settings, and offline fallback.
   Use cloud sync only when configured.

7. Use graceful degradation.
   If internet or APIs are unavailable, the app should still support offline notes, planning, drafts, tasks, and local memory.

---

## Target Platforms
Primary:
- Mobile web
- Progressive Web App
- Expo / React Native version
- iPhone-friendly design

Secondary:
- Desktop web
- Future native iOS app
- Future macOS or desktop command center

The first build should be realistic and runnable.

Recommended practical stack:
- React
- TypeScript
- Vite or Expo depending on build target
- Tailwind CSS or NativeWind
- Supabase for auth, database, and storage
- OpenAI-compatible AI gateway
- Optional Stripe billing later
- Optional GitHub integration later
- Optional Gmail/Calendar/task integrations later

---

## Recommended MVP Scope
Build EvaOneAI as a real usable V1, not a fake assistant shell.

### V1 Must Include
1. Dashboard
   - Today’s priorities
   - Active projects
   - Recent AI sessions
   - Pending approvals
   - Quick actions
   - System status

2. AI Command Center
   - Chat-style interface
   - Role selector
   - Task type selector
   - Streaming response-ready architecture
   - Saved sessions
   - Clear distinction between advice, draft, and executed action

3. Task Manager
   - Create tasks
   - Assign priority
   - Set status
   - Add notes
   - Connect tasks to projects
   - AI can convert chat into tasks

4. Projects
   - Project list
   - Project detail pages
   - Goals
   - Milestones
   - Notes
   - Linked files
   - AI summaries

5. Memory
   - User preferences
   - Business context
   - Project context
   - Editable memory records
   - Memory enabled/disabled setting

6. Files / Knowledge
   - Upload or attach text files where supported
   - Summarize documents
   - Extract tasks
   - Extract risks
   - Convert notes into plans

7. Approvals
   - Queue for actions that need user approval
   - Draft email approval
   - Calendar event approval
   - External action approval
   - Action status tracking

8. Settings
   - Profile
   - AI provider settings
   - API key handling through environment variables only
   - Privacy controls
   - Memory controls
   - Connected apps placeholder only if not actually implemented

9. Action Log
   - Show what EvaOneAI did, drafted, suggested, failed, or needs permission for

---

## Suggested App Navigation
Use mobile-first bottom navigation:
1. Home
2. Command
3. Tasks
4. Projects
5. Memory
6. Settings

If bottom nav becomes crowded, use:
- Home
- Command
- Work
- Memory
- Settings

Then place Tasks and Projects inside Work.

---

## UI / Visual Direction
EvaOneAI should feel premium, focused, intelligent, and serious.

Style:
- Dark interface
- Glassmorphism panels
- Neon cyan / violet / blue accents
- Executive dashboard feel
- Clean cards
- Smooth mobile layout
- Minimal clutter
- Strong typography
- Clear action hierarchy

Avoid:
- Random gradients everywhere
- Generic SaaS landing page look
- Cartoon assistant style
- Fake “AI magic” visuals
- Overdesigned screens that hurt usability

The design should feel like:
- AI Chief of Staff
- Mission control
- Private executive operating system
- Founder command center

---

## Core Data Models
Use these entities as the foundation.

### UserProfile
Fields:
- id
- email
- display_name
- studio_name
- role
- plan
- created_at
- updated_at

### Project
Fields:
- id
- user_id
- name
- description
- status
- priority
- goals
- created_at
- updated_at

### Task
Fields:
- id
- user_id
- project_id
- title
- description
- status
- priority
- due_date
- source
- created_at
- updated_at

### AISession
Fields:
- id
- user_id
- role_mode
- title
- summary
- created_at
- updated_at

### AIMessage
Fields:
- id
- session_id
- user_id
- role
- content
- metadata
- created_at

### MemoryItem
Fields:
- id
- user_id
- title
- content
- category
- source
- importance
- is_active
- created_at
- updated_at

### ApprovalRequest
Fields:
- id
- user_id
- action_type
- title
- description
- payload
- status
- created_at
- approved_at
- rejected_at

### ActionLog
Fields:
- id
- user_id
- action_type
- app_name
- status
- summary
- request_payload
- response_payload
- created_at

### Integration
Fields:
- id
- user_id
- provider
- status
- scopes
- connected_at
- updated_at

---

## AI Gateway Requirements
The app should not call AI providers directly from the frontend using exposed secret keys.
Use a backend API layer.

Required backend behavior:
- Keep API keys server-side
- Accept user prompt
- Accept role mode
- Accept project/task context
- Return AI response
- Save session and messages
- Log usage
- Support future model switching
- Support future streaming
- Support future billing hooks

Suggested endpoints:

```txt
POST /api/ai/chat
POST /api/ai/summarize
POST /api/ai/extract-tasks
POST /api/ai/project-plan
POST /api/ai/draft-email
GET  /api/sessions
GET  /api/sessions/:id
POST /api/tasks
GET  /api/tasks
POST /api/projects
GET  /api/projects
POST /api/memory
GET  /api/memory
POST /api/approvals
GET  /api/approvals
POST /api/approvals/:id/approve
POST /api/approvals/:id/reject
GET  /api/action-log
```

---

## Environment Variables
Use environment variables.

Do not hardcode secrets.

Suggested variables:

```txt
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
AI_GATEWAY_BASE_URL=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
APP_ENV=development
APP_PUBLIC_URL=
```

For frontend-only prototypes, never expose OPENAI_API_KEY.
Use a backend or serverless function.

---

## Security Requirements
EvaOneAI must:
- Never store raw API keys in unsafe frontend storage
- Use environment variables
- Use Supabase Row Level Security if Supabase is used
- Keep user data separated by user_id
- Log external actions
- Require approvals for risky actions
- Protect memory records
- Avoid leaking private user context into unrelated sessions
- Avoid fake admin controls

---

## Supabase Table Direction
If Supabase is used, create tables for:
- profiles
- projects
- tasks
- ai_sessions
- ai_messages
- memory_items
- approval_requests
- action_logs
- integrations
- usage_logs
- subscriptions later

Enable Row Level Security.

Policies should ensure:
- Users can only read their own rows
- Users can only update their own rows
- Service role handles backend-only operations

---

## AI Role Prompt Structure
The app should generate system prompts dynamically based on selected mode.

Base system behavior:

> You are EvaOneAI, a private AI Chief of Staff and executive orchestration assistant.
> You help the user organize, analyze, plan, draft, coordinate, and execute approved work.
> You must never claim to have completed an external action unless the required integration is active and the action has actually been completed.
> When an action requires permission, prepare it as an approval request.
> When information is missing, make the best safe assumption and continue, unless the task would be unsafe, destructive, or impossible without confirmation.
> Always distinguish between:
> - Recommendation
> - Draft
> - Prepared action
> - Completed action
> - Failed action
> - Needs approval
> Be clear, useful, and execution-focused.

---

## Output Status Labels
EvaOneAI should use consistent status labels:
- Done
- Drafted
- Prepared
- Needs Approval
- Needs Human Step
- Blocked
- Failed
- In Progress
- Saved
- Synced

Avoid vague statuses.

---

## Example User Workflows
### Workflow 1: Convert idea into project
User says: “Turn EvaOneAI into a real app.”

EvaOneAI should:
- Create a project
- Break it into milestones
- Create tasks
- Identify required files
- Suggest architecture
- Save plan
- Ask for approval only when external action is required

### Workflow 2: Draft CEO outreach
User says: “Write a cold message to a CEO for my AI service.”

EvaOneAI should:
- Draft the message
- Store it as a draft
- Offer variants
- Mark as not sent unless email integration actually sends it

### Workflow 3: Review uploaded file
User uploads a file.

EvaOneAI should:
- Summarize it
- Extract tasks
- Identify risks
- Link insights to a project
- Save useful context with permission

### Workflow 4: Daily command brief
User opens Home.

EvaOneAI should show:
- Top 3 priorities
- Overdue tasks
- Upcoming deadlines
- Suggested next action
- Pending approvals

### Workflow 5: App connection
User connects Gmail, Calendar, GitHub, Supabase, or other tool.

EvaOneAI should:
- Explain scopes
- Request permission
- Store integration status
- Log connected state
- Use only approved actions

---

## Integration Strategy
Build integrations in layers.

Layer 1: Internal app actions
- Create task
- Create project
- Save note
- Save memory
- Generate plan
- Draft message
- Log action

Layer 2: File intelligence
- Upload file
- Summarize file
- Extract tasks
- Extract project context

Layer 3: Communication
- Draft email
- Draft message
- Prepare follow-up
- User approves before send

Layer 4: Calendar / scheduling
- Suggest event
- Prepare calendar payload
- User approves before creation

Layer 5: Business systems
- CRM
- Stripe
- Supabase
- GitHub
- Project tools

Layer 6: Agent orchestration
- Create specialized agents
- Assign subtasks
- Track status
- Merge outputs

---

## Monetization Direction
EvaOneAI should support future billing but does not need full billing in V1.

Possible plans:
- Free
- Founder
- Studio
- Pro
- Enterprise

Billing-ready fields:
- plan
- usage_count
- token_usage
- monthly_limit
- stripe_customer_id
- stripe_subscription_id
- subscription_status

Do not build fake billing screens that pretend payment works.
Only build Stripe when keys and webhook are configured.

---

## Relationship to GestaltVisionsAI
EvaOneAI is separate from GestaltVisionsAI but may later connect to it.

GestaltVisionsAI is the creative immersive platform.
EvaOneAI is the executive orchestration system.

Future connection:
- EvaOneAI can help manage GestaltVisionsAI projects
- EvaOneAI can plan creative campaigns
- EvaOneAI can coordinate assets
- EvaOneAI can draft marketplace listings
- EvaOneAI can help run creator workflows
- EvaOneAI can route tasks to creative agents

Keep the systems modular.
Do not merge the apps into one unless explicitly requested.

---

## Build Quality Requirements
The codebase should be:
- Clean
- Modular
- Typed
- Easy to extend
- Mobile-first
- Production-minded
- Free of dead placeholder content
- Free of fake claims
- Easy to deploy
- Easy to connect to Supabase
- Easy to connect to an AI backend

Use real component names.
Use clear file structure.
Use reusable UI components.
Avoid stuffing everything into one giant file unless the user specifically asks for a single-file prototype.

---

## Suggested File Structure for React / Vite
```txt
src/
  app/
    App.tsx
    routes.tsx
  components/
    layout/
      AppShell.tsx
      BottomNav.tsx
      Header.tsx
    ui/
      Button.tsx
      Card.tsx
      Badge.tsx
      Input.tsx
      Textarea.tsx
      Modal.tsx
    eva/
      RoleSelector.tsx
      CommandInput.tsx
      ApprovalCard.tsx
      ActionLogItem.tsx
  pages/
    HomePage.tsx
    CommandPage.tsx
    TasksPage.tsx
    ProjectsPage.tsx
    MemoryPage.tsx
    SettingsPage.tsx
  services/
    aiService.ts
    taskService.ts
    projectService.ts
    memoryService.ts
    approvalService.ts
    actionLogService.ts
    supabaseClient.ts
  types/
    index.ts
    eva.ts
    database.ts
  styles/
    index.css
```

## Suggested File Structure for Expo / React Native
```txt
app/
  _layout.tsx
  index.tsx
  command.tsx
  work.tsx
  memory.tsx
  settings.tsx
src/
  components/
    AppShell.tsx
    EvaCard.tsx
    CommandInput.tsx
    RoleSelector.tsx
    TaskCard.tsx
    ProjectCard.tsx
    ApprovalCard.tsx
  services/
    aiService.ts
    storageService.ts
    taskService.ts
    projectService.ts
    memoryService.ts
  types/
    eva.ts
  theme/
    colors.ts
    spacing.ts
    typography.ts
```

---

## V1 Screens Detail
### Home Screen
Purpose: Show the user what matters right now.

Must include:
- Greeting
- Current operating mode
- Top priorities
- Active projects
- Pending approvals
- Recent sessions
- Quick action buttons

Quick actions:
- Start command
- Create task
- Create project
- Draft message
- Analyze file
- Generate plan

### Command Screen
Purpose: Main AI interaction area.

Must include:
- Role mode selector
- Prompt input
- Response area
- Save to project button
- Convert to tasks button
- Create approval request button where needed

### Tasks Screen
Purpose: Manage execution.

Must include:
- Task list
- Status filter
- Priority filter
- Add task
- Edit task
- AI task extraction support

### Projects Screen
Purpose: Manage larger goals.

Must include:
- Project cards
- Project detail
- Goals
- Milestones
- Linked tasks
- AI project summary

### Memory Screen
Purpose: User-controlled long-term context.

Must include:
- Memory list
- Add memory
- Edit memory
- Delete memory
- Toggle memory active/inactive
- Memory categories

Categories:
- User preference
- Business context
- Project context
- Writing style
- Creative direction
- Contact/context note
- System instruction

### Settings Screen
Purpose: Control the system.

Must include:
- Profile
- Privacy
- Memory controls
- AI provider status
- Connected apps status
- Export data
- Clear local data
- App version

---

## Required UX Copy Principles
Use direct, useful labels.

Good labels:
- “Draft email”
- “Prepare action”
- “Approve and send”
- “Save to memory”
- “Convert to tasks”
- “Create project plan”
- “View action log”

Bad labels:
- “Magic”
- “Do everything”
- “Auto run”
- “AI power”
- “Launch chaos”
- “Coming soon”

---

## Error Handling
All errors should be readable.

Examples:
- Instead of: “Error 500”
  Use: “EvaOneAI could not complete this request because the AI service failed. Your draft was not sent or saved.”

- Instead of: “Integration missing”
  Use: “Gmail is not connected. I prepared the email draft, but it has not been sent.”

---

## Offline Behavior
If offline:
- Allow notes
- Allow tasks
- Allow project edits
- Allow draft creation
- Queue sync actions
- Show offline banner
- Disable external actions
- Do not lose user work

---

## Performance Requirements
The app should:
- Load quickly on mobile
- Avoid heavy animations
- Avoid blocking the UI during AI calls
- Use loading states
- Use optimistic UI only for safe local actions
- Keep forms responsive
- Avoid giant dependency bloat

---

## First Codex Task
Start by building or refactoring the app into a clean V1 foundation.

Priority order:
1. Create clean file structure
2. Build mobile-first shell
3. Build Home, Command, Tasks, Projects, Memory, Settings screens
4. Add typed data models
5. Add local mock storage only as temporary development storage
6. Clearly mark local-only functions
7. Add AI service abstraction
8. Add approval system abstraction
9. Add action log system
10. Prepare Supabase integration layer
11. Remove fake/demo claims
12. Make the app runnable

Important:
Temporary local demo data is acceptable only for development, but it must not pretend to be real user analytics, real integrations, real revenue, or completed external actions.

---

## Acceptance Criteria
The V1 is acceptable when:
- The app runs without build errors
- The UI is mobile-first
- The navigation works
- The Command screen can accept a prompt
- AI service is abstracted cleanly
- Tasks can be created locally
- Projects can be created locally
- Memory items can be created, edited, and deleted locally
- Approval requests can be created and marked approved/rejected
- Action logs display real app events
- Settings explain what is connected and what is not
- No fake external actions are claimed
- Environment variables are documented
- Code is organized and easy to extend

---

## Codex Build Instruction
When modifying this repo:
- Do not remove the EvaOneAI product identity.
- Do not turn this into a generic chatbot.
- Do not use fake completed integrations.
- Do not hardcode secrets.
- Do not invent backend access that does not exist.
- Do not add placeholder marketing fluff.
- Prioritize a working app foundation over decorative filler.
- Use TypeScript types.
- Keep components reusable.
- Keep logic separated from UI.
- Build with future Supabase, AI gateway, Stripe, Gmail, Calendar, GitHub, and agent orchestration support in mind.
- Make the smallest complete implementation that supports the full product direction.
- If something cannot be completed because keys or external services are missing, create a safe abstraction and document the required configuration.

---

## Final Product Summary
EvaOneAI is a private AI Chief of Staff and agentic operating system for creators, founders, freelancers, and small teams.

It organizes work, remembers useful context, prepares actions, drafts communications, supports planning, tracks projects, coordinates tasks, analyzes files, and eventually connects to external apps with permission.

The main difference between EvaOneAI and a normal chatbot is that EvaOneAI is structured around real workflows, user approval, transparent memory, action logs, and tool orchestration.

Build the app like a real executive command center, not like a toy assistant wearing a productivity costume.

Use that as Codex’s north star.
