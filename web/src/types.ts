export type RoleMode =
  | 'Chief of Staff'
  | 'CEO Filter'
  | 'Executive Assistant'
  | 'Creative Director'
  | 'Research Analyst'
  | 'Operations Coordinator'
  | 'App Connector'
  | 'Agentic AI Orchestrator';

export type ActionStatus =
  | 'Done'
  | 'Drafted'
  | 'Prepared'
  | 'Needs Approval'
  | 'Needs Human Step'
  | 'Blocked'
  | 'Failed'
  | 'In Progress'
  | 'Saved'
  | 'Synced';

export interface Project {
  id: string;
  name: string;
  status: 'Active' | 'Planning' | 'Paused';
}

export interface Task {
  id: string;
  title: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Done';
  projectId?: string;
}

export interface MemoryItem {
  id: string;
  title: string;
  content: string;
  category:
    | 'User preference'
    | 'Business context'
    | 'Project context'
    | 'Writing style'
    | 'Creative direction'
    | 'Contact/context note'
    | 'System instruction';
  isActive: boolean;
}

export interface ApprovalRequest {
  id: string;
  title: string;
  description: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface ActionLog {
  id: string;
  summary: string;
  status: ActionStatus;
  createdAt: string;
}

export interface AISession {
  id: string;
  role: RoleMode;
  title: string;
  summary: string;
  createdAt: string;
}
