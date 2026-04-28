# Eva.One
Eva.One is a private, local-first AI executive orchestration app built for creators, founders, freelancers, and small teams.
It is designed to act as an AI Chief of Staff that helps organize information, manage workflows, prepare actions, support creative direction, coordinate approvals, and assist with business execution while keeping the user in control.
Eva.One is not just a chatbot. It is the foundation for a controlled agentic operating layer where actions require the right mode, permissions, and user approval.
## Current Build
This repository currently contains an early SwiftUI iOS app with:
- Home landing experience
- Chat section
- Workflow section
- Inbox section
- Control/security section
- Local state management
- Biometric reactivation
- Hard lock / sleep mode
- Session-only web access toggle
- EVA modes:
  - Sleep
  - Observe
  - Assist
  - Execute
- SwiftData models for:
  - Memory items
  - Action logs
  - Workflow presets
  - App settings
## Brand Naming
Public brand:
Eva.One
Internal Swift/module-safe naming:
EvaOne
Avoid using `Eva.One` as a Swift module name because dots can create build and import issues.
## Core Philosophy
Eva.One should never pretend to perform unsupported actions.
The system should clearly separate:
- What Eva can do locally
- What Eva can prepare
- What Eva can only do with permission
- What requires integrations
- What requires the user to approve manually
## Security Model
Eva.One uses a hard-lock model.
By default, Eva starts locked and inactive. Reactivation requires device owner authentication through iOS LocalAuthentication.
Web access is session-only and expires automatically.
Execution should always follow permission rules and approval levels.
## Main Files
- `EvaOneApp.swift`  
  Main SwiftUI app entry point.
- `MainTabView.swift`  
  Main tab navigation.
- `AppStateManager.swift`  
  State, lock mode, biometric authentication, and web session control.
- `ControlView.swift`  
  User-facing control panel for activation, modes, permissions, and reset.
- `EVADataModels.swift`  
  SwiftData models for memory, actions, workflow presets, and settings.
- `LandingViews.swift`  
  Home, chat, workflow, and inbox views.
## Development Priorities
1. Complete internal rename from GoodThenIm to EvaOne.
2. Add real app entry file.
3. Remove README from Xcode build sources.
4. Replace placeholder landing metrics with honest early-stage messaging.
5. Add real chat input and local session memory.
6. Add action approval queue.
7. Add workflow preset creation.
8. Add local action log viewer.
9. Add settings screen.
10. Add secure connector layer for future integrations.
## Bundle Identifier
Recommended bundle identifier:
`com.mentallycreativestudios.evaone`
## Product Direction
Eva.One should become a private executive control system for:
- Founders
- Creators
- Freelancers
- Small teams
- Studio operators
- AI-assisted business workflows
The goal is not chaos, fake automation, or empty “AI magic” branding.
The goal is controlled execution, clear permissions, useful memory, workflow support, and a system that helps the user move from idea to action.
