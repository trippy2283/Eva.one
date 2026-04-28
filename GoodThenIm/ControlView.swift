import SwiftUI

struct ControlView: View {
    @EnvironmentObject var state: AppStateManager

    var body: some View {
        List {
            Section("Approvals") {
                if state.approvals.isEmpty {
                    Text("No approval requests yet.")
                        .foregroundStyle(.secondary)
                }

                ForEach(state.approvals) { item in
                    VStack(alignment: .leading, spacing: 6) {
                        Text(item.title).bold()
                        Text(item.description).font(.subheadline)
                        Text("Status: \(item.status.rawValue)")
                            .font(.footnote)
                            .foregroundStyle(.secondary)

                        if item.status == .pending {
                            HStack {
                                Button("Approve") {
                                    state.setApprovalStatus(id: item.id, status: .approved)
                                }
                                .buttonStyle(.borderedProminent)

                                Button("Reject", role: .destructive) {
                                    state.setApprovalStatus(id: item.id, status: .rejected)
                                }
                                .buttonStyle(.bordered)
                            }
                        }
                    }
                    .padding(.vertical, 4)
                }
            }

            Section("Recent Sessions") {
                if state.sessions.isEmpty {
                    Text("No command sessions yet.")
                        .foregroundStyle(.secondary)
                }

                ForEach(state.sessions.prefix(5)) { session in
                    VStack(alignment: .leading, spacing: 4) {
                        Text(session.roleMode.rawValue).bold()
                        Text(session.prompt).font(.subheadline)
                        Text(session.createdAt.formatted(date: .abbreviated, time: .shortened))
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                }
            }

            Section("Action Log") {
                if state.actionLogs.isEmpty {
                    Text("Action log is empty.")
                        .foregroundStyle(.secondary)
                }

                ForEach(state.actionLogs.prefix(15)) { log in
                    VStack(alignment: .leading, spacing: 4) {
                        Text(log.summary)
                        Text("\(log.status.rawValue) • \(log.createdAt.formatted(date: .abbreviated, time: .shortened))")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                    .padding(.vertical, 2)
                }
            }

            Section("System") {
                Text("App mode: Local-first iOS foundation")
                Text("AI provider: Not connected")
                Text("Integrations: Not connected")
                Text("External actions require approval and configured integrations.")
                    .font(.footnote)
                    .foregroundStyle(.secondary)
            }
        }
        .navigationTitle("Settings")
    }
}
