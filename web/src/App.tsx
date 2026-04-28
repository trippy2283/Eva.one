import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  ActionLog,
  AISession,
  ApprovalRequest,
  Integration,
  MemoryItem,
  Project,
  RoleMode,
  Task
} from './types';

const roles: RoleMode[] = [
  'Chief of Staff',
  'CEO Filter',
  'Executive Assistant',
  'Creative Director',
  'Research Analyst',
  'Operations Coordinator',
  'App Connector',
  'Agentic AI Orchestrator'
];

const memoryCategories: MemoryItem['category'][] = [
  'User preference',
  'Business context',
  'Project context',
  'Writing style',
  'Creative direction',
  'Contact/context note',
  'System instruction'
];

const localId = () => Math.random().toString(36).slice(2, 10);
const STORAGE_KEY = 'evaoneai-web-v2-state';

const defaultIntegrations: Integration[] = [
  {
    id: 'gestalt-visions',
    provider: 'Gestalt Visions',
    status: 'Disconnected',
    scopes: ['Read project plan handoff', 'Write approved campaign brief', 'Read approved asset checklist']
  }
];

type AppLocalState = {
  tasks: Task[];
  projects: Project[];
  memory: MemoryItem[];
  approvals: ApprovalRequest[];
  logs: ActionLog[];
  sessions: AISession[];
  integrations: Integration[];
};

const defaultLocalState: AppLocalState = {
  tasks: [],
  projects: [],
  memory: [],
  approvals: [],
  logs: [],
  sessions: [],
  integrations: defaultIntegrations
};

const loadLocalState = (): AppLocalState => {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultLocalState;

  try {
    const parsed = JSON.parse(raw) as Partial<AppLocalState>;
    return {
      tasks: parsed.tasks ?? [],
      projects: parsed.projects ?? [],
      memory: parsed.memory ?? [],
      approvals: parsed.approvals ?? [],
      logs: parsed.logs ?? [],
      sessions: parsed.sessions ?? [],
      integrations: parsed.integrations?.length ? parsed.integrations : defaultIntegrations
    };
  } catch {
    return defaultLocalState;
  }
};

export default function App() {
  const hydratedState = useMemo(loadLocalState, []);
  const [activeView, setActiveView] = useState<'Home' | 'Command' | 'Tasks' | 'Projects' | 'Memory' | 'Settings'>('Home');
  const [role, setRole] = useState<RoleMode>('Chief of Staff');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [tasks, setTasks] = useState<Task[]>(hydratedState.tasks);
  const [projects, setProjects] = useState<Project[]>(hydratedState.projects);
  const [memory, setMemory] = useState<MemoryItem[]>(hydratedState.memory);
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(hydratedState.approvals);
  const [logs, setLogs] = useState<ActionLog[]>(hydratedState.logs);
  const [sessions, setSessions] = useState<AISession[]>(hydratedState.sessions);
  const [integrations, setIntegrations] = useState<Integration[]>(hydratedState.integrations);

  const pendingApprovals = useMemo(() => approvals.filter((a) => a.status === 'Pending').length, [approvals]);
  const openTasks = useMemo(() => tasks.filter((t) => t.status !== 'Done').length, [tasks]);
  const activeProjects = useMemo(() => projects.filter((p) => p.status !== 'Paused').length, [projects]);

  const gestaltConnection = useMemo(
    () => integrations.find((integration) => integration.provider === 'Gestalt Visions'),
    [integrations]
  );

  useEffect(() => {
    const stateToPersist: AppLocalState = { tasks, projects, memory, approvals, logs, sessions, integrations };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist));
  }, [tasks, projects, memory, approvals, logs, sessions, integrations]);

  const addLog = (summary: string, status: ActionLog['status']) => {
    setLogs((prev) => [{ id: localId(), summary, status, createdAt: new Date().toISOString() }, ...prev]);
  };

  const submitPrompt = (event: FormEvent) => {
    event.preventDefault();
    if (!prompt.trim()) return;

    const cleanPrompt = prompt.trim();
    const drafted = [
      `Recommendation (${role}): ${cleanPrompt}`,
      '',
      'Draft: I outlined your next steps and saved this command as a local session.',
      'Prepared action: External execution is not performed in local-only mode and needs approval.',
      gestaltConnection?.status === 'Connected'
        ? 'Integration note: Gestalt Visions is connected for approved handoffs.'
        : 'Integration note: Gestalt Visions is not connected yet. I can prepare the connection request.'
    ].join('\n');

    setResponse(drafted);
    setSessions((prev) => [{
      id: localId(),
      role,
      title: cleanPrompt.slice(0, 54),
      summary: `Drafted recommendation in ${role} mode.`,
      createdAt: new Date().toISOString()
    }, ...prev].slice(0, 10));
    addLog(`Prompt processed in ${role} mode`, 'Drafted');
    setPrompt('');
  };

  const createTask = () => {
    const task: Task = { id: localId(), title: `New task ${tasks.length + 1}`, priority: 'Medium', status: 'Open' };
    setTasks((prev) => [task, ...prev]);
    addLog(`Task created: ${task.title}`, 'Saved');
  };

  const createProject = () => {
    const project: Project = { id: localId(), name: `Project ${projects.length + 1}`, status: 'Planning' };
    setProjects((prev) => [project, ...prev]);
    addLog(`Project created: ${project.name}`, 'Saved');
  };

  const createMemory = () => {
    const item: MemoryItem = {
      id: localId(),
      title: `Memory ${memory.length + 1}`,
      content: 'User prefers concise executive summaries.',
      category: memoryCategories[memory.length % memoryCategories.length],
      isActive: true
    };
    setMemory((prev) => [item, ...prev]);
    addLog(`Memory saved: ${item.title}`, 'Saved');
  };

  const createApproval = () => {
    const approval: ApprovalRequest = {
      id: localId(),
      title: 'Draft CEO outreach email',
      description: 'Prepared only. Gmail integration is not connected, so this has not been sent.',
      status: 'Pending',
      actionType: 'External Send'
    };
    setApprovals((prev) => [approval, ...prev]);
    addLog('Approval request created for external action', 'Needs Approval');
  };

  const requestGestaltConnection = () => {
    const existingPending = approvals.some(
      (approval) => approval.actionType === 'Integration Connect' && approval.status === 'Pending'
    );

    if (existingPending) {
      addLog('Gestalt Visions connection request already pending approval', 'Needs Human Step');
      return;
    }

    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.provider === 'Gestalt Visions' ? { ...integration, status: 'Pending Approval' } : integration
      )
    );

    const approval: ApprovalRequest = {
      id: localId(),
      title: 'Connect Gestalt Visions app',
      description:
        'Prepared connection request only. Approval is required before EvaOneAI marks Gestalt Visions as connected.',
      status: 'Pending',
      actionType: 'Integration Connect',
      integrationId: 'gestalt-visions',
      payload: JSON.stringify({ provider: 'Gestalt Visions', requestedScopes: gestaltConnection?.scopes ?? [] })
    };
    setApprovals((prev) => [approval, ...prev]);
    addLog('Prepared Gestalt Visions integration approval request', 'Needs Approval');
  };

  const prepareGestaltHandoff = () => {
    if (gestaltConnection?.status !== 'Connected') {
      addLog('Gestalt Visions handoff blocked because app is not connected', 'Blocked');
      return;
    }

    const approval: ApprovalRequest = {
      id: localId(),
      title: 'Send project brief to Gestalt Visions',
      description:
        'Prepared handoff package from active projects. This request is staged and requires approval before sync.',
      status: 'Pending',
      actionType: 'Integration Handoff',
      integrationId: 'gestalt-visions',
      payload: JSON.stringify({ projectCount: projects.length, exportedAt: new Date().toISOString() })
    };

    setApprovals((prev) => [approval, ...prev]);
    addLog('Prepared Gestalt Visions project handoff request', 'Needs Approval');
  };

  const setApprovalStatus = (id: string, status: 'Approved' | 'Rejected') => {
    const approval = approvals.find((item) => item.id === id);

    setApprovals((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));

    if (approval?.actionType === 'Integration Connect' && approval.integrationId) {
      setIntegrations((prev) =>
        prev.map((integration) => {
          if (integration.id !== approval.integrationId) return integration;
          if (status === 'Approved') {
            return { ...integration, status: 'Connected', lastSyncAt: new Date().toISOString() };
          }
          return { ...integration, status: 'Disconnected' };
        })
      );
    }

    if (approval?.actionType === 'Integration Handoff' && approval.integrationId && status === 'Approved') {
      setIntegrations((prev) =>
        prev.map((integration) =>
          integration.id === approval.integrationId ? { ...integration, lastSyncAt: new Date().toISOString() } : integration
        )
      );
      addLog('Gestalt Visions handoff approved and synced', 'Synced');
    } else {
      addLog(`Approval ${status.toLowerCase()} by user`, status === 'Approved' ? 'Done' : 'Blocked');
    }
  };

  const cycleTaskStatus = (id: string) => {
    const nextStatusByCurrent: Record<Task['status'], Task['status']> = {
      Open: 'In Progress',
      'In Progress': 'Done',
      Done: 'Open'
    };

    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, status: nextStatusByCurrent[task.status] } : task)));
    addLog('Task status updated', 'In Progress');
  };

  const toggleMemoryActive = (id: string) => {
    setMemory((prev) => prev.map((m) => (m.id === id ? { ...m, isActive: !m.isActive } : m)));
    addLog('Memory status toggled', 'Saved');
  };

  const clearLocalState = () => {
    setTasks([]);
    setProjects([]);
    setMemory([]);
    setApprovals([]);
    setLogs([]);
    setSessions([]);
    setIntegrations(defaultIntegrations);
    setResponse('');
    window.localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">EvaOneAI</div>
        <button className="ghost" onClick={() => setActiveView('Command')}>Open Command Center</button>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">Private, permission-based executive orchestration</p>
          <h1>EvaOneAI</h1>
          <h2>ORGANIZE • PLAN • COORDINATE</h2>
          <p>
            A local-first executive operating layer for founders, creators, and teams. Advice is drafted locally,
            and external actions are prepared for approval before execution.
          </p>
          <div className="actions">
            <button onClick={() => setActiveView('Command')}>Start Command</button>
            <button className="ghost" onClick={createApproval}>Prepare External Action</button>
            <button className="ghost" onClick={requestGestaltConnection}>Connect Gestalt Visions</button>
          </div>
        </div>
        <div className="heroCard">
          <p><strong>Mode:</strong> {role}</p>
          <p><strong>Open tasks:</strong> {openTasks}</p>
          <p><strong>Active projects:</strong> {activeProjects}</p>
          <p><strong>Pending approvals:</strong> {pendingApprovals}</p>
          <p><strong>Gestalt Visions:</strong> {gestaltConnection?.status ?? 'Unavailable'}</p>
          <p><strong>System status:</strong> Local-only development mode</p>
        </div>
      </section>

      <nav className="bottomNav">
        {['Home', 'Command', 'Tasks', 'Projects', 'Memory', 'Settings'].map((item) => (
          <button
            key={item}
            onClick={() => setActiveView(item as typeof activeView)}
            className={activeView === item ? 'active' : ''}
          >
            {item}
          </button>
        ))}
      </nav>

      <main className="panel">
        {activeView === 'Home' && (
          <div className="grid2">
            <article>
              <h3>Today’s Priorities</h3>
              <ul>
                <li>Review pending approvals ({pendingApprovals})</li>
                <li>Advance active projects ({activeProjects})</li>
                <li>Close open tasks ({openTasks})</li>
                <li>
                  {gestaltConnection?.status === 'Connected'
                    ? 'Prepare approved project handoff to Gestalt Visions'
                    : 'Approve Gestalt Visions connection request'}
                </li>
              </ul>
            </article>
            <article>
              <h3>Recent AI Sessions</h3>
              <ul>
                {sessions.slice(0, 3).map((session) => (
                  <li key={session.id}>{session.title} · {session.role}</li>
                ))}
                {sessions.length === 0 && <li>No sessions yet.</li>}
              </ul>
            </article>
          </div>
        )}

        {activeView === 'Command' && (
          <section>
            <h3>AI Command Center</h3>
            <form onSubmit={submitPrompt} className="stack">
              <label>
                Role Mode
                <select value={role} onChange={(e) => setRole(e.target.value as RoleMode)}>
                  {roles.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label>
                Prompt
                <textarea
                  placeholder="Describe what you need..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </label>
              <div className="actions">
                <button type="submit">Run Command</button>
                <button type="button" className="ghost" onClick={prepareGestaltHandoff}>
                  Prepare Gestalt Handoff
                </button>
              </div>
            </form>
            {response && <pre>{response}</pre>}
          </section>
        )}

        {activeView === 'Tasks' && (
          <section>
            <h3>Tasks</h3>
            <button onClick={createTask}>Add task</button>
            <ul>
              {tasks.map((t) => (
                <li key={t.id}>
                  {t.title} · {t.priority} · {t.status}{' '}
                  <button className="ghost" onClick={() => cycleTaskStatus(t.id)}>Next status</button>
                </li>
              ))}
              {tasks.length === 0 && <li>No tasks yet.</li>}
            </ul>
          </section>
        )}

        {activeView === 'Projects' && (
          <section>
            <h3>Projects</h3>
            <div className="actions">
              <button onClick={createProject}>Add project</button>
              <button className="ghost" onClick={prepareGestaltHandoff}>Prepare handoff to Gestalt Visions</button>
            </div>
            <ul>
              {projects.map((p) => <li key={p.id}>{p.name} · {p.status}</li>)}
              {projects.length === 0 && <li>No projects yet.</li>}
            </ul>
          </section>
        )}

        {activeView === 'Memory' && (
          <section>
            <h3>Memory</h3>
            <button onClick={createMemory}>Add memory item</button>
            <ul>
              {memory.map((m) => (
                <li key={m.id}>
                  {m.title} · {m.category} · {m.isActive ? 'active' : 'inactive'}{' '}
                  <button className="ghost" onClick={() => toggleMemoryActive(m.id)}>Toggle</button>
                </li>
              ))}
              {memory.length === 0 && <li>No memory items yet.</li>}
            </ul>
          </section>
        )}

        {activeView === 'Settings' && (
          <section>
            <h3>Settings</h3>
            <p>AI provider status: configured through backend gateway only.</p>
            <p>Privacy: local-only data. External actions remain drafted or prepared.</p>
            <h4>Connected apps</h4>
            <ul>
              {integrations.map((integration) => (
                <li key={integration.id}>
                  <strong>{integration.provider}</strong> — {integration.status}
                  {integration.lastSyncAt && <> · Last sync: {new Date(integration.lastSyncAt).toLocaleString()}</>}
                  <br />
                  Scopes: {integration.scopes.join(', ')}
                </li>
              ))}
            </ul>
            <div className="actions">
              <button onClick={requestGestaltConnection}>Request Gestalt Visions Connection</button>
              <button className="ghost" onClick={clearLocalState}>Clear local data</button>
            </div>
            <h4>Approvals</h4>
            <ul>
              {approvals.map((a) => (
                <li key={a.id}>
                  <strong>{a.title}</strong> — {a.description} [{a.status}] {' '}
                  {a.status === 'Pending' && (
                    <>
                      <button onClick={() => setApprovalStatus(a.id, 'Approved')}>Approve</button>
                      <button onClick={() => setApprovalStatus(a.id, 'Rejected')}>Reject</button>
                    </>
                  )}
                </li>
              ))}
              {approvals.length === 0 && <li>No approval requests yet.</li>}
            </ul>
          </section>
        )}
      </main>

      <section className="panel">
        <h3>Action Log</h3>
        <ul>
          {logs.map((log) => (
            <li key={log.id}>{new Date(log.createdAt).toLocaleString()} · {log.status} · {log.summary}</li>
          ))}
          {logs.length === 0 && <li>No actions yet.</li>}
        </ul>
      </section>
    </div>
  );
}
