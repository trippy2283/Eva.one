import Foundation
import SwiftUI

@MainActor
final class AppStateManager: ObservableObject {
    @Published var roleMode: EvaRoleMode = .chiefOfStaff
    @Published private(set) var tasks: [EvaTask] = []
    @Published private(set) var projects: [EvaProject] = []
    @Published private(set) var memoryItems: [EvaMemoryItem] = []
    @Published private(set) var approvals: [EvaApprovalRequest] = []
    @Published private(set) var actionLogs: [EvaActionLog] = []
    @Published private(set) var sessions: [EvaSession] = []

    private let storageKey = "evaoneai-ios-v1"

    init() {
        loadState()

        if tasks.isEmpty, projects.isEmpty, memoryItems.isEmpty {
            seedIfNeeded()
        }
    }

    var pendingApprovalsCount: Int {
        approvals.filter { $0.status == .pending }.count
    }

    func runCommand(prompt: String) -> String {
        let cleaned = prompt.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !cleaned.isEmpty else {
            return "Please enter a prompt so EvaOneAI can prepare a response."
        }

        let response = "Recommendation (\(roleMode.rawValue)): \(cleaned)\n\nPrepared action: I created a local draft and logged it. External actions still require explicit approval."

        sessions.insert(
            EvaSession(
                id: UUID(),
                roleMode: roleMode,
                prompt: cleaned,
                response: response,
                createdAt: Date()
            ),
            at: 0
        )

        addLog("Command processed in \(roleMode.rawValue) mode.", status: .drafted)
        persistState()
        return response
    }

    func createTask(title: String) {
        let cleaned = title.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !cleaned.isEmpty else { return }

        let task = EvaTask(
            id: UUID(),
            title: cleaned,
            notes: "Local task created on iOS.",
            status: .open,
            priority: .medium,
            projectID: nil,
            createdAt: Date()
        )
        tasks.insert(task, at: 0)
        addLog("Task created: \(cleaned)", status: .saved)
        persistState()
    }

    func updateTaskStatus(taskID: UUID, status: EvaTaskStatus) {
        guard let index = tasks.firstIndex(where: { $0.id == taskID }) else { return }
        tasks[index].status = status
        addLog("Task status updated to \(status.rawValue): \(tasks[index].title)", status: .saved)
        persistState()
    }

    func createProject(name: String) {
        let cleaned = name.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !cleaned.isEmpty else { return }

        let project = EvaProject(
            id: UUID(),
            name: cleaned,
            description: "Project created locally on iOS.",
            status: "Planning",
            goals: ["Define milestones", "Create linked tasks"],
            createdAt: Date()
        )
        projects.insert(project, at: 0)
        addLog("Project created: \(cleaned)", status: .saved)
        persistState()
    }

    func createMemory(title: String, content: String, category: EvaMemoryCategory) {
        let cleanTitle = title.trimmingCharacters(in: .whitespacesAndNewlines)
        let cleanContent = content.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !cleanTitle.isEmpty, !cleanContent.isEmpty else { return }

        let memoryItem = EvaMemoryItem(
            id: UUID(),
            title: cleanTitle,
            content: cleanContent,
            category: category,
            isActive: true,
            createdAt: Date()
        )
        memoryItems.insert(memoryItem, at: 0)
        addLog("Memory saved: \(cleanTitle)", status: .saved)
        persistState()
    }

    func toggleMemory(id: UUID) {
        guard let index = memoryItems.firstIndex(where: { $0.id == id }) else { return }
        memoryItems[index].isActive.toggle()
        addLog("Memory \(memoryItems[index].isActive ? "activated" : "paused"): \(memoryItems[index].title)", status: .saved)
        persistState()
    }

    func createApprovalRequest(title: String, description: String) {
        let approval = EvaApprovalRequest(
            id: UUID(),
            title: title,
            description: description,
            status: .pending,
            createdAt: Date()
        )
        approvals.insert(approval, at: 0)
        addLog("Approval request prepared: \(title)", status: .needsApproval)
        persistState()
    }

    func setApprovalStatus(id: UUID, status: EvaApprovalStatus) {
        guard let index = approvals.firstIndex(where: { $0.id == id }) else { return }
        approvals[index].status = status
        addLog("Approval \(status.rawValue.lowercased()): \(approvals[index].title)", status: status == .approved ? .done : .blocked)
        persistState()
    }

    private func addLog(_ summary: String, status: EvaLogStatus) {
        actionLogs.insert(
            EvaActionLog(id: UUID(), summary: summary, status: status, createdAt: Date()),
            at: 0
        )
    }

    private func persistState() {
        let state = EvaLocalState(
            tasks: tasks,
            projects: projects,
            memoryItems: memoryItems,
            approvals: approvals,
            actionLogs: actionLogs,
            sessions: sessions
        )

        guard let data = try? JSONEncoder().encode(state) else { return }
        UserDefaults.standard.set(data, forKey: storageKey)
    }

    private func loadState() {
        guard
            let data = UserDefaults.standard.data(forKey: storageKey),
            let state = try? JSONDecoder().decode(EvaLocalState.self, from: data)
        else {
            return
        }

        tasks = state.tasks
        projects = state.projects
        memoryItems = state.memoryItems
        approvals = state.approvals
        actionLogs = state.actionLogs
        sessions = state.sessions
    }

    private func seedIfNeeded() {
        createProject(name: "Launch EvaOneAI iOS Foundation")
        createTask(title: "Define V1 command workflow")
        createMemory(
            title: "Writing style",
            content: "Prefer direct and concise executive summaries.",
            category: .writingStyle
        )
        createApprovalRequest(
            title: "Draft CEO outreach email",
            description: "Prepared only. Gmail integration is not connected, so this has not been sent."
        )
    }
}
