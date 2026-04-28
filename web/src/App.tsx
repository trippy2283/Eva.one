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

const views = ['Home', 'Command', 'Tasks', 'Projects', 'Memory', 'Settings'] as const;
type ActiveView = (typeof views)[number];

const localId = () => Math.random().toString(36).slice(2, 10);
const STORAGE_KEY = 'evaoneai-web-v3-state';

const defaultIntegrations: Integration[] = [
  {
    id: 'gestalt-visions',
    provider: 'Gestalt Visions',
    status: 'Disconnected',
    scopes: ['Read approved project brief', 'Prepare campaign handoff', 'Log approved sync request']
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

const getLocalStorage = (): Storage | null => {
  if (typeof window === 'undefined') return null;

  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

const toArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

const loadLocalState = (): AppLocalState => {
  const storage = getLocalStorage();
  if (!storage) return defaultLocalState;

  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return defaultLocalState;

    const parsed = JSON.parse(raw) as Partial<AppLocalState>;
    const integrations = toArray<Integration>(parsed.integrations);

    return {
      tasks: toArray<Task>(parsed.tasks),
      projects: toArray<Project>(parsed.projects),
      memory: toArray<MemoryItem>(parsed.memory),
      approvals: toArray<ApprovalRequest>(parsed.approvals),
      logs: toArray<ActionLog>(parsed.logs),
      sessions: toArray<AISession>(parsed.sessions),
      integrations: integrations.length ? integrations : defaultIntegrations
    };
  } catch {
    return defaultLocalState;
  }
};

export default function App() {
  const [initialLocalState] = useState<AppLocalState>(loadLocalState);
  const [activeView, setActiveView] = useState<ActiveView>('Home');
  const [role, setRole] = useState<RoleMode>('Chief of Staff');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [projectName, setProjectName] = useState('');
  const [memoryTitle, setMemoryTitle] = useState('');
  const [memoryContent, setMemoryContent] = useState('');
  const [actionTitle, setActionTitle] = useState('');
  const [tasks, setTasks] = useState<Task[]>(initialLocalState.tasks);
  const [projects, setProjects] = useState<Project[]>(initialLocalState.projects);
  const [memory, setMemory] = useState<MemoryItem[]>(initialLocalState.memory);
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(initialLocalState.approvals);
  const [logs, setLogs] = useState<ActionLog[]>(initialLocalState.logs);
  const [sessions, setSessions] = useState<AISession[]>(initialLocalState.sessions);
  const [integrations, setIntegrations] = useState<Integration[]>(initialLocalState.integrations);

  const pendingApprovals = useMemo(() => approvals.filter((a) => a.status === 'Pending').length, [approvals]);
  const openTasks = useMemo(() => tasks.filter((t) => t.status !== 'Done').length, [tasks]);
  const activeProjects = useMemo(() => projects.filter((p) => p.status !== 'Paused').length, [projects]);

  const gestaltConnection = useMemo(
    () => integrations.find((integration) => integration.provider === 'Gestalt Visions'),
    [integrations]
  );

  useEffect(() => {
    const storage = getLocalStorage();
    if (!storage) return;

    try {
      const stateToPersist: AppLocalState = { tasks, projects, memory, approvals, logs, sessions, integrations };
      storage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist));
    } catch {
      // Graceful fallback when storage is unavailable, blocked, or full.
    }
  }, [tasks, projects, memory, approvals, logs, sessions, integrations]);

  const addLog = (summary: string, status: ActionLog['status']) => {
    setLogs((prev) => [{ id: localId(), summary, status, createdAt: new Date().toISOString() }, ...prev]);
  };

  const submitPrompt = (event: FormEvent) => {
    event.preventDefault();
    if (!prompt.trim()) {
      addLog('Command ignored because the prompt was empty', 'Needs Human Step');
      return;
    }

    const cleanPrompt = prompt.trim();
    const drafted = [
      `Eva response mode: ${role}`,
      '',
      `Request: ${cleanPrompt}`,
      '',
      'Drafted output:',
      '- Clarify the immediate outcome needed.',
      '- Break the request into execution steps.',
      '- Queue any external send, publish, sync, billing, or account-changing action for approval first.',
      '- Keep local memory private unless the user exports or connects a backend.',
      '',
      gestaltConnection?.status === 'Connected'
        ? 'Gestalt Visions is locally approved for staged handoffs. No external sync is performed from this prototype.'
        : 'Gestalt Visions is not connected. Use the approval queue before marking it connected.'
    ].join('\n');

    setResponse(drafted);
    setSessions((prev) => [{
      id: localId(),
      role,
      title: cleanPrompt.slice(0, 54),
      summary: `Drafted a local recommendation in ${role} mode.`,
      createdAt: new Date().toISOString()
    }, ...prev].slice(0, 10));
    addLog(`Local command drafted in ${role} mode`, 'Drafted');
    setPrompt('');
  };

  const createTask = () => {
    const title = taskTitle.trim();
    if (!title) {
      addLog('Task was not created because it needs a real title', 'Needs Human Step');
      return;
    }

    const task: Task = { id: localId(), title, priority: 'Medium', status: 'Open' };
    setTasks((prev) => [task, ...prev]);
    setTaskTitle('');
    addLog(`Task created: ${task.title}`, 'Saved');
  };

  const createProject = () => {
    const name = projectName.trim();
    if (!name) {
      addLog('Project was not created because it needs a real name', 'Needs Human Step');
      return;
    }

    const project: Project = { id: localId(), name, status: 'Planning' };
    setProjects((prev) => [project, ...prev]);
    setProjectName('');
    addLog(`Project created: ${project.name}`, 'Saved');
  };

  const createMemory = () => {
    const title = memoryTitle.trim();
    const content = memoryContent.trim();
    if (!title || !content) {
      addLog('Memory was not saved because title and content are required', 'Needs Human Step');
      return;
    }

    const item: MemoryItem = {
      id: localId(),
      title,
      content,
      category: memoryCategories[memory.length % memoryCategories.length],
      isActive: true
    };
    setMemory((prev) => [item, ...prev]);
    setMemoryTitle('');
    setMemoryContent('');
    addLog(`Memory saved: ${item.title}`, 'Saved');
  };

  const createApproval = () => {
    const title = actionTitle.trim() || 'Prepared external action';
    const approval: ApprovalRequest = {
      id: localId(),
      title,
      description: 'Prepared only. This prototype does not send, publish, bill, sync, or modify external accounts.',
      status: 'Pending',
      actionType: 'External Send'
    };
    setApprovals((prev) => [approval, ...prev]);
    setActionTitle('');
    addLog(`Approval queued: ${approval.title}`, 'Needs Approval');
  };

  const requestGestaltConnection = () => {
    if (gestaltConnection?.status === 'Connected') {
      addLog('Gestalt Visions is already locally approved', 'Done');
      return;
    }

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
      title: 'Approve Gestalt Visions local connection',
      description:
        'This only marks Gestalt Visions as locally approved inside Eva One. It does not connect to an external API.',
      status: 'Pending',
      actionType: 'Integration Connect',
      integrationId: 'gestalt-visions',
      payload: JSON.stringify({ provider: 'Gestalt Visions', requestedScopes: gestaltConnection?.scopes ?? [] })
    };
    setApprovals((prev) => [approval, ...prev]);
    addLog('Gestalt Visions connection approval queued', 'Needs Approval');
  };

  const prepareGestaltHandoff = () => {
    if (gestaltConnection?.status !== 'Connected') {
      addLog('Gestalt handoff blocked until the local connection is approved', 'Blocked');
      return;
    }

    const approval: ApprovalRequest = {
      id: localId(),
      title: 'Approve Gestalt Visions handoff package',
      description:
        'Prepared a local handoff request from active projects. External syncing is not executed by this prototype.',
      status: 'Pending',
      actionType: 'Integration Handoff',
      integrationId: 'gestalt-visions',
      payload: JSON.stringify({ projectCount: projects.length, preparedAt: new Date().toISOString() })
    };

    setApprovals((prev) => [approval, ...prev]);
    addLog('Gestalt handoff approval queued', 'Needs Approval');
  };

  const setApprovalStatus = (id: string, status: 'Approved' | 'Rejected') => {
    const approval = approvals.find((item) => item.id === id);
    setApprovals((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));

    if (approval?.actionType === 'Integration Connect' && approval.integrationId) {
      setIntegrations((prev) =>
        prev.map((integration) => {
          if (integration.id !== approval.integrationId) return integration;
          if (status === 'Approved') return { ...integration, status: 'Connected', lastSyncAt: new Date().toISOString() };
          return { ...integration, status: 'Disconnected' };
        })
      );
    }

    if (approval?.actionType === 'Integration Handoff' && status === 'Approved') {
      addLog('Handoff approved locally. No external sync was executed.', 'Prepared');
      return;
    }

    addLog(`Approval ${status.toLowerCase()} by user`, status === 'Approved' ? 'Done' : 'Blocked');
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

    const storage = getLocalStorage();
    if (!storage) return;

    try {
      storage.removeItem(STORAGE_KEY);
    } catch {
      // Graceful fallback when storage is unavailable or blocked.
    }
  };

  const pendingItems = approvals.filter((item) => item.status === 'Pending');

  return (
    <div className="appShell">
      <header className="siteNav">
        <button className="brandLockup" onClick={() => setActiveView('Home')} type="button">
          <span className="brandOrb" />
          <span>EVA ONE</span>
        </button>
        <nav className="desktopLinks" aria-label="Primary navigation">
          {views.map((view) => (
            <button key={view} onClick={() => setActiveView(view)} type="button">
              {view}
            </button>
          ))}
        </nav>
        <button className="launchButton" onClick={() => setActiveView('Command')} type="button">Launch App</button>
      </header>

      <section className="cinemaHero">
        <div className="heroCopy">
          <p className="eyebrow">Private AI command layer</p>
          <h1>EVA ONE</h1>
          <h2>PLAN • ORGANIZE • APPROVE</h2>
          <p className="heroText">
            A local-first executive operating system for creators, founders, freelancers, and small teams.
            Eva drafts decisions, structures work, stores local memory, and queues risky actions for approval.
          </p>
          <div className="heroActions">
            <button className="primaryGlow" onClick={() => setActiveView('Command')} type="button">Start Command</button>
            <button className="ghostGlow" onClick={createApproval} type="button">Queue Approval</button>
            <button className="ghostGlow" onClick={requestGestaltConnection} type="button">Request Gestalt Link</button>
          </div>
          <div className="metricRow" aria-label="Live local app state">
            <div><strong>{openTasks}</strong><span>Open Tasks</span></div>
            <div><strong>{activeProjects}</strong><span>Projects</span></div>
            <div><strong>{pendingApprovals}</strong><span>Approvals</span></div>
            <div><strong>{sessions.length}</strong><span>Sessions</span></div>
          </div>
        </div>

        <div className="holoStage" aria-label="Eva One visual identity preview">
          <div className="evaHead" />
          <div className="evaCore" />
          <div className="scanCard topScan">
            <strong>LOCAL MODE</strong>
            <span>No external execution</span>
            <span>Approval gates active</span>
          </div>
          <div className="scanCard bottomScan">
            <strong>{gestaltConnection?.status ?? 'Unavailable'}</strong>
            <span>Gestalt Visions</span>
          </div>
        </div>
      </section>

      <section className="truthStrip" aria-label="System rules">
        <span>Local memory</span>
        <span>Approval-first actions</span>
        <span>No fake sends</span>
        <span>No fake revenue</span>
        <span>No hidden sync</span>
      </section>

      <nav className="appTabs" aria-label="App sections">
        {views.map((item) => (
          <button
            key={item}
            onClick={() => setActiveView(item)}
            className={activeView === item ? 'active' : ''}
            type="button"
          >
            {item}
          </button>
        ))}
      </nav>

      <main className="controlPanel">
        {activeView === 'Home' && (
          <div className="grid2">
            <article>
              <h3>Priority Queue</h3>
              <ul>
                <li>Review pending approvals ({pendingApprovals})</li>
                <li>Advance active projects ({activeProjects})</li>
                <li>Close open tasks ({openTasks})</li>
                <li>{gestaltConnection?.status === 'Connected' ? 'Prepare approved Gestalt handoff' : 'Approve or reject Gestalt connection'}</li>
              </ul>
            </article>
            <article>
              <h3>Pending Approvals</h3>
              {pendingItems.length === 0 && <p className="muted">No pending approvals.</p>}
              <div className="approvalList">
                {pendingItems.slice(0, 4).map((approval) => (
                  <div className="approvalCard" key={approval.id}>
                    <strong>{approval.title}</strong>
                    <span>{approval.description}</span>
                    <div className="cardActions">
                      <button onClick={() => setApprovalStatus(approval.id, 'Approved')} type="button">Approve</button>
                      <button onClick={() => setApprovalStatus(approval.id, 'Rejected')} type="button">Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            </article>
            <article>
              <h3>Recent AI Sessions</h3>
              <ul>
                {sessions.slice(0, 3).map((session) => (
                  <li key={session.id}>{session.title} - {session.role}</li>
                ))}
                {sessions.length === 0 && <li>No sessions yet.</li>}
              </ul>
            </article>
            <article>
              <h3>Action Log</h3>
              <ul>
                {logs.slice(0, 5).map((log) => (
                  <li key={log.id}>{log.status} - {log.summary}</li>
                ))}
                {logs.length === 0 && <li>No actions yet.</li>}
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
                Command
                <textarea
                  placeholder="Ask Eva to plan, draft, organize, research, or prepare an approval."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </label>
              <div className="heroActions compact">
                <button type="submit" className="primaryGlow">Run Local Command</button>
                <button type="button" className="ghostGlow" onClick={prepareGestaltHandoff}>Prepare Gestalt Handoff</button>
              </div>
            </form>
            {response && <pre>{response}</pre>}
            <div className="inlineTool">
              <label>
                Approval title
                <input value={actionTitle} onChange={(e) => setActionTitle(e.target.value)} placeholder="Example: Draft client outreach email" />
              </label>
              <button className="ghostGlow" onClick={createApproval} type="button">Queue External Action</button>
            </div>
          </section>
        )}

        {activeView === 'Tasks' && (
          <section>
            <h3>Tasks</h3>
            <div className="inlineTool">
              <input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder="Task title" />
              <button className="primaryGlow" onClick={createTask} type="button">Add Task</button>
            </div>
            <div className="itemList">
              {tasks.map((task) => (
                <div className="listItem" key={task.id}>
                  <strong>{task.title}</strong>
                  <span>{task.priority} - {task.status}</span>
                  <button className="miniButton" onClick={() => cycleTaskStatus(task.id)} type="button">Next status</button>
                </div>
              ))}
              {tasks.length === 0 && <p className="muted">No tasks yet.</p>}
            </div>
          </section>
        )}

        {activeView === 'Projects' && (
          <section>
            <h3>Projects</h3>
            <div className="inlineTool">
              <input value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Project name" />
              <button className="primaryGlow" onClick={createProject} type="button">Add Project</button>
              <button className="ghostGlow" onClick={prepareGestaltHandoff} type="button">Prepare Handoff</button>
            </div>
            <div className="itemList">
              {projects.map((project) => (
                <div className="listItem" key={project.id}>
                  <strong>{project.name}</strong>
                  <span>{project.status}</span>
                </div>
              ))}
              {projects.length === 0 && <p className="muted">No projects yet.</p>}
            </div>
          </section>
        )}

        {activeView === 'Memory' && (
          <section>
            <h3>Memory Vault</h3>
            <div className="stack">
              <input value={memoryTitle} onChange={(e) => setMemoryTitle(e.target.value)} placeholder="Memory title" />
              <textarea value={memoryContent} onChange={(e) => setMemoryContent(e.target.value)} placeholder="Memory content" />
              <button className="primaryGlow" onClick={createMemory} type="button">Save Memory</button>
            </div>
            <div className="itemList">
              {memory.map((item) => (
                <div className="listItem" key={item.id}>
                  <strong>{item.title}</strong>
                  <span>{item.category} - {item.isActive ? 'active' : 'inactive'}</span>
                  <p>{item.content}</p>
                  <button className="miniButton" onClick={() => toggleMemoryActive(item.id)} type="button">Toggle</button>
                </div>
              ))}
              {memory.length === 0 && <p className="muted">No memory items yet.</p>}
            </div>
          </section>
        )}

        {activeView === 'Settings' && (
          <section>
            <h3>Settings & Approvals</h3>
            <div className="grid2">
              <article>
                <h4>Connected Apps</h4>
                {integrations.map((integration) => (
                  <div className="listItem" key={integration.id}>
                    <strong>{integration.provider}</strong>
                    <span>{integration.status}</span>
                    <p>Scopes: {integration.scopes.join(', ')}</p>
                    {integration.lastSyncAt && <p>Last local approval: {new Date(integration.lastSyncAt).toLocaleString()}</p>}
                  </div>
                ))}
                <div className="heroActions compact">
                  <button className="primaryGlow" onClick={requestGestaltConnection} type="button">Request Gestalt Approval</button>
                  <button className="ghostGlow" onClick={clearLocalState} type="button">Clear Local Data</button>
                </div>
              </article>
              <article>
                <h4>All Approvals</h4>
                <div className="approvalList">
                  {approvals.map((approval) => (
                    <div className="approvalCard" key={approval.id}>
                      <strong>{approval.title}</strong>
                      <span>{approval.description}</span>
                      <em>{approval.status}</em>
                      {approval.status === 'Pending' && (
                        <div className="cardActions">
                          <button onClick={() => setApprovalStatus(approval.id, 'Approved')} type="button">Approve</button>
                          <button onClick={() => setApprovalStatus(approval.id, 'Rejected')} type="button">Reject</button>
                        </div>
                      )}
                    </div>
                  ))}
                  {approvals.length === 0 && <p className="muted">No approval requests yet.</p>}
                </div>
              </article>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
