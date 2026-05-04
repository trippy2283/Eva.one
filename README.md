# Eva.one

EvaOneAI includes a runnable web foundation for a local-first executive orchestration interface.

## Web App (V1 Foundation)

Path: `web/`

### Features included
- EvaOneAI branded hero/landing section
- Mobile-first bottom navigation (Home, Command, Tasks, Projects, Memory, Settings)
- AI Command Center with role selector and prompt input
- Local-only task, project, memory, and approval creation
- Approval queue with Approve/Reject actions
- Action log showing real local app events and statuses
- Gestalt Visions integration bridge flow:
  - Request connection approval
  - Mark connection state only after user approval
  - Prepare approved project handoff packages
  - Log sync timestamps after approved handoff
- Basic Video Game Development agent mode:
  - Turns game ideas into build-ready plans
  - Structures gameplay loops, mechanics, HUD, input support, save systems, QA tasks, and prototype tasks
  - Keeps IP-safe rules for fictional vehicles, fictional brands, and original assets
  - Supports planning for touch, keyboard, and controller-ready gameplay
- Honest integration status messaging (no fake completion claims)

### Run locally
```bash
cd web
npm install
npm run dev
```

### Build
```bash
cd web
npm run build
```

## EvaOneAI Strategy Notes
- `AGENTS.md` contains the full Codex / builder operating guide for EvaOneAI.
- `docs/evaone-ai-reach-and-game-agent.md` contains the updated direction for EvaOneAI outreach, enterprise workflow support, and the new basic Video Game Development agent.

## iOS App
Legacy iOS Swift files remain under `GoodThenIm/`.
