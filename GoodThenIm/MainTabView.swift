import SwiftUI

@main
struct EvaOneAIiOSApp: App {
    @StateObject private var state = AppStateManager()

    var body: some Scene {
        WindowGroup {
            MainTabView()
                .environmentObject(state)
                .preferredColorScheme(.dark)
        }
    }
}

struct MainTabView: View {
    var body: some View {
        TabView {
            NavigationStack { HomeView() }
                .tabItem { Label("Home", systemImage: "house.fill") }

            NavigationStack { CommandView() }
                .tabItem { Label("Command", systemImage: "bubble.left.and.bubble.right.fill") }

            NavigationStack { TasksView() }
                .tabItem { Label("Tasks", systemImage: "checklist") }

            NavigationStack { ProjectsView() }
                .tabItem { Label("Projects", systemImage: "folder.fill") }

            NavigationStack { MemoryView() }
                .tabItem { Label("Memory", systemImage: "brain") }

            NavigationStack { ControlView() }
                .tabItem { Label("Settings", systemImage: "gearshape.fill") }
        }
        .tint(.cyan)
    }
}

struct HomeView: View {
    @EnvironmentObject var state: AppStateManager

    var body: some View {
        List {
            Section("EvaOneAI Status") {
                Label("Role Mode: \(state.roleMode.rawValue)", systemImage: "person.crop.circle.badge.checkmark")
                Label("Pending approvals: \(state.pendingApprovalsCount)", systemImage: "checkmark.shield")
                Label("Integrations: Not connected", systemImage: "lock.shield")
            }

            Section("Top Priorities") {
                Text("Review pending approvals")
                Text("Advance active projects (\(state.projects.count))")
                Text("Close open tasks (\(state.tasks.filter { $0.status != .done }.count))")
            }

            Section("Quick Actions") {
                Button("Create task") { state.createTask(title: "New task \(state.tasks.count + 1)") }
                Button("Create project") { state.createProject(name: "Project \(state.projects.count + 1)") }
                Button("Save to memory") {
                    state.createMemory(
                        title: "Preference \(state.memoryItems.count + 1)",
                        content: "User prefers staged execution and clear status labels.",
                        category: .userPreference
                    )
                }
                Button("Prepare external action") {
                    state.createApprovalRequest(
                        title: "Prepare calendar event",
                        description: "Prepared only. Calendar integration is unavailable, so no event was created."
                    )
                }
            }
        }
        .navigationTitle("EvaOneAI")
    }
}

struct CommandView: View {
    @EnvironmentObject var state: AppStateManager
    @State private var prompt = ""
    @State private var response = ""

    var body: some View {
        Form {
            Section("Role Mode") {
                Picker("Role", selection: $state.roleMode) {
                    ForEach(EvaRoleMode.allCases) { role in
                        Text(role.rawValue).tag(role)
                    }
                }
            }

            Section("Prompt") {
                TextField("Describe what you need", text: $prompt, axis: .vertical)
                    .lineLimit(4...8)
                Button("Run Command") {
                    response = state.runCommand(prompt: prompt)
                    prompt = ""
                }
            }

            if !response.isEmpty {
                Section("Response") {
                    Text(response)
                        .font(.subheadline)
                }
            }
        }
        .navigationTitle("Command")
    }
}

struct TasksView: View {
    @EnvironmentObject var state: AppStateManager
    @State private var title = ""

    var body: some View {
        List {
            Section("Create Task") {
                TextField("Task title", text: $title)
                Button("Add Task") {
                    state.createTask(title: title)
                    title = ""
                }
            }

            Section("Task List") {
                ForEach(state.tasks) { task in
                    VStack(alignment: .leading, spacing: 6) {
                        Text(task.title).bold()
                        Text("Priority: \(task.priority.rawValue) • Status: \(task.status.rawValue)")
                            .font(.footnote)
                            .foregroundStyle(.secondary)

                        Picker("Status", selection: Binding(
                            get: { task.status },
                            set: { state.updateTaskStatus(taskID: task.id, status: $0) }
                        )) {
                            ForEach(EvaTaskStatus.allCases) { status in
                                Text(status.rawValue).tag(status)
                            }
                        }
                        .pickerStyle(.segmented)
                    }
                    .padding(.vertical, 4)
                }
            }
        }
        .navigationTitle("Tasks")
    }
}

struct ProjectsView: View {
    @EnvironmentObject var state: AppStateManager
    @State private var projectName = ""

    var body: some View {
        List {
            Section("Create Project") {
                TextField("Project name", text: $projectName)
                Button("Create Project") {
                    state.createProject(name: projectName)
                    projectName = ""
                }
            }

            Section("Projects") {
                ForEach(state.projects) { project in
                    VStack(alignment: .leading, spacing: 6) {
                        Text(project.name).bold()
                        Text(project.description).font(.subheadline)
                        Text("Status: \(project.status)").font(.footnote).foregroundStyle(.secondary)
                    }
                    .padding(.vertical, 4)
                }
            }
        }
        .navigationTitle("Projects")
    }
}

struct MemoryView: View {
    @EnvironmentObject var state: AppStateManager
    @State private var title = ""
    @State private var content = ""
    @State private var category: EvaMemoryCategory = .userPreference

    var body: some View {
        List {
            Section("Add Memory") {
                TextField("Title", text: $title)
                TextField("Content", text: $content, axis: .vertical)
                    .lineLimit(3...6)

                Picker("Category", selection: $category) {
                    ForEach(EvaMemoryCategory.allCases) { item in
                        Text(item.rawValue).tag(item)
                    }
                }

                Button("Save to Memory") {
                    state.createMemory(title: title, content: content, category: category)
                    title = ""
                    content = ""
                }
            }

            Section("Memory Records") {
                ForEach(state.memoryItems) { item in
                    VStack(alignment: .leading, spacing: 4) {
                        HStack {
                            Text(item.title).bold()
                            Spacer()
                            Text(item.isActive ? "Active" : "Paused")
                                .font(.caption)
                                .foregroundStyle(item.isActive ? .green : .orange)
                        }
                        Text(item.content)
                            .font(.subheadline)
                            .foregroundStyle(.secondary)
                        Text(item.category.rawValue)
                            .font(.caption)

                        Button(item.isActive ? "Pause Memory" : "Activate Memory") {
                            state.toggleMemory(id: item.id)
                        }
                        .font(.footnote)
                    }
                    .padding(.vertical, 4)
                }
            }
        }
        .navigationTitle("Memory")
    }
}
