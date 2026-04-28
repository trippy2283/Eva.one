# Eva.one

EvaOneAI now includes a runnable web foundation for a local-first executive orchestration interface.

## Web App (V1 Foundation)

Path: `web/`

### Features included
- EvaOneAI branded hero/landing section
- Mobile-first bottom navigation (Home, Command, Tasks, Projects, Memory, Settings)
- AI Command Center with role selector and prompt input
- Local-only task, project, memory, and approval creation
- Approval queue with Approve/Reject actions
- Action log showing real local app events and statuses
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

## iOS App
Legacy iOS Swift files remain under `GoodThenIm/`.
