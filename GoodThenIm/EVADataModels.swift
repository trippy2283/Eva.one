import Foundation

enum EvaRoleMode: String, Codable, CaseIterable, Identifiable {
    case chiefOfStaff = "Chief of Staff"
    case ceoFilter = "CEO Filter"
    case executiveAssistant = "Executive Assistant"
    case creativeDirector = "Creative Director"
    case researchAnalyst = "Research Analyst"
    case operationsCoordinator = "Operations Coordinator"
    case appConnector = "App Connector"
    case agenticOrchestrator = "Agentic AI Orchestrator"

    var id: String { rawValue }
}

enum EvaTaskStatus: String, Codable, CaseIterable, Identifiable {
    case open = "Open"
    case inProgress = "In Progress"
    case done = "Done"

    var id: String { rawValue }
}

enum EvaPriority: String, Codable, CaseIterable, Identifiable {
    case low = "Low"
    case medium = "Medium"
    case high = "High"
    case urgent = "Urgent"

    var id: String { rawValue }
}

enum EvaApprovalStatus: String, Codable, CaseIterable, Identifiable {
    case pending = "Pending"
    case approved = "Approved"
    case rejected = "Rejected"

    var id: String { rawValue }
}

enum EvaLogStatus: String, Codable, CaseIterable, Identifiable {
    case done = "Done"
    case drafted = "Drafted"
    case prepared = "Prepared"
    case needsApproval = "Needs Approval"
    case blocked = "Blocked"
    case failed = "Failed"
    case saved = "Saved"

    var id: String { rawValue }
}

enum EvaMemoryCategory: String, Codable, CaseIterable, Identifiable {
    case userPreference = "User preference"
    case businessContext = "Business context"
    case projectContext = "Project context"
    case writingStyle = "Writing style"
    case creativeDirection = "Creative direction"
    case contactContext = "Contact/context note"
    case systemInstruction = "System instruction"

    var id: String { rawValue }
}

struct EvaTask: Codable, Identifiable {
    let id: UUID
    var title: String
    var notes: String
    var status: EvaTaskStatus
    var priority: EvaPriority
    var projectID: UUID?
    var createdAt: Date
}

struct EvaProject: Codable, Identifiable {
    let id: UUID
    var name: String
    var description: String
    var status: String
    var goals: [String]
    var createdAt: Date
}

struct EvaMemoryItem: Codable, Identifiable {
    let id: UUID
    var title: String
    var content: String
    var category: EvaMemoryCategory
    var isActive: Bool
    var createdAt: Date
}

struct EvaApprovalRequest: Codable, Identifiable {
    let id: UUID
    var title: String
    var description: String
    var status: EvaApprovalStatus
    var createdAt: Date
}

struct EvaActionLog: Codable, Identifiable {
    let id: UUID
    var summary: String
    var status: EvaLogStatus
    var createdAt: Date
}

struct EvaSession: Codable, Identifiable {
    let id: UUID
    var roleMode: EvaRoleMode
    var prompt: String
    var response: String
    var createdAt: Date
}

struct EvaLocalState: Codable {
    var roleMode: EvaRoleMode
    var tasks: [EvaTask]
    var projects: [EvaProject]
    var memoryItems: [EvaMemoryItem]
    var approvals: [EvaApprovalRequest]
    var actionLogs: [EvaActionLog]
    var sessions: [EvaSession]

    init(
        roleMode: EvaRoleMode = .chiefOfStaff,
        tasks: [EvaTask],
        projects: [EvaProject],
        memoryItems: [EvaMemoryItem],
        approvals: [EvaApprovalRequest],
        actionLogs: [EvaActionLog],
        sessions: [EvaSession]
    ) {
        self.roleMode = roleMode
        self.tasks = tasks
        self.projects = projects
        self.memoryItems = memoryItems
        self.approvals = approvals
        self.actionLogs = actionLogs
        self.sessions = sessions
    }

    private enum CodingKeys: String, CodingKey {
        case roleMode
        case tasks
        case projects
        case memoryItems
        case approvals
        case actionLogs
        case sessions
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)

        roleMode = try container.decodeIfPresent(EvaRoleMode.self, forKey: .roleMode) ?? .chiefOfStaff
        tasks = try container.decodeIfPresent([EvaTask].self, forKey: .tasks) ?? []
        projects = try container.decodeIfPresent([EvaProject].self, forKey: .projects) ?? []
        memoryItems = try container.decodeIfPresent([EvaMemoryItem].self, forKey: .memoryItems) ?? []
        approvals = try container.decodeIfPresent([EvaApprovalRequest].self, forKey: .approvals) ?? []
        actionLogs = try container.decodeIfPresent([EvaActionLog].self, forKey: .actionLogs) ?? []
        sessions = try container.decodeIfPresent([EvaSession].self, forKey: .sessions) ?? []
    }
}
