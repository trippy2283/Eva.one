import SwiftUI
import SwiftData

@main
struct EvaOneApp: App {
    var body: some Scene {
        WindowGroup {
            MainTabView()
        }
        .modelContainer(for: [
            MemoryItem.self,
            ActionLog.self,
            WorkflowPreset.self,
            AppSettings.self
        ])
    }
}
