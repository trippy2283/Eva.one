import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  ActionLog,
  ApprovalRequest,
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

const localId = () => Math.random().toString(36).slice(2, 10);
const STORAGE_KEY = 'evaoneai-web-v1-state';

type AppLocalState = {
  tasks: Task[];
  projects: Project[];
  memory: MemoryItem[];
  approvals: ApprovalRequest[];
  logs: ActionLog[];
};

const defaultLocalState: AppLocalState = {
  tasks: [],
  projects: [],
  memory: [],
  approvals: [],
  logs: []
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
      logs: parsed.logs ?? []
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

  const pendingApprovals = useMemo(() => approvals.filter((a) => a.status === 'Pending').length, [approvals]);

  useEffect(() => {
    const stateToPersist: AppLocalState = { tasks, projects, memory, approvals, logs };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist));
  }, [tasks, projects, memory, approvals, logs]);

  const addLog = (summary: string, status: ActionLog['status']) => {
    setLogs((prev) => [{ id: localId(), summary, status, createdAt: new Date().toISOString() }, ...prev]);
  };

  const submitPrompt = (event: FormEvent) => {
    event.preventDefault();
    if (!prompt.trim()) return;
    const drafted = `Recommendation (${role}): ${prompt.trim()}\n\nPrepared action: I created a draft plan locally. External execution needs approval.`;
    setResponse(drafted);
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
      category: 'User preference',
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
      status: 'Pending'
    };
    setApprovals((prev) => [approval, ...prev]);
    addLog('Approval request created for external action', 'Needs Approval');
  };

  const setApprovalStatus = (id: string, status: 'Approved' | 'Rejected') => {
    setApprovals((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    addLog(`Approval ${status.toLowerCase()} by user`, status === 'Approved' ? 'Done' : 'Blocked');
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">EvaOneAI</div>
        <button className="ghost">Launch App</button>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">The next-generation AI executive orchestration system</p>
          <h1>EVA ONE</h1>
          <h2>ORGANIZE • PLAN • EXECUTE</h2>
          <p>
            Private, local-first, permission-based AI Chief of Staff for creators, founders, freelancers, and small teams.
          </p>
          <div className="actions">
            <button onClick={() => setActiveView('Command')}>Start Command</button>
            <button className="ghost" onClick={createApproval}>Prepare External Action</button>
          </div>
        </div>
        <div className="heroCard">
          <p><strong>Mode:</strong> {role}</p>
          <p><strong>Pending approvals:</strong> {pendingApprovals}</p>
          <p><strong>System status:</strong> Local-only development mode</p>
          <p><strong>Integrations:</strong> Not connected</p>
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
                <li>Advance active projects ({projects.length})</li>
                <li>Close open tasks ({tasks.filter((t) => t.status !== 'Done').length})</li>
              </ul>
            </article>
            <article>
              <h3>Quick Actions</h3>
              <div className="stack">
                <button onClick={createTask}>Create task</button>
                <button onClick={createProject}>Create project</button>
                <button onClick={createMemory}>Save to memory</button>
              </div>
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
              <button type="submit">Run Command</button>
            </form>
            {response && <pre>{response}</pre>}
          </section>
        )}

        {activeView === 'Tasks' && (
          <section>
            <h3>Tasks</h3>
            <button onClick={createTask}>Add task</button>
            <ul>{tasks.map((t) => <li key={t.id}>{t.title} · {t.priority} · {t.status}</li>)}</ul>
          </section>
        )}

        {activeView === 'Projects' && (
          <section>
            <h3>Projects</h3>
            <button onClick={createProject}>Add project</button>
            <ul>{projects.map((p) => <li key={p.id}>{p.name} · {p.status}</li>)}</ul>
          </section>
        )}

        {activeView === 'Memory' && (
          <section>
            <h3>Memory</h3>
            <button onClick={createMemory}>Add memory item</button>
            <ul>{memory.map((m) => <li key={m.id}>{m.title} · {m.category} · {m.isActive ? 'active' : 'inactive'}</li>)}</ul>
          </section>
        )}

        {activeView === 'Settings' && (
          <section>
            <h3>Settings</h3>
            <p>AI provider status: configured through backend gateway only.</p>
            <p>Connected apps: none connected.</p>
            <p>Privacy: local-only demo data, no external actions executed.</p>
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
