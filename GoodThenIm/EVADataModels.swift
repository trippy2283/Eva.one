import Foundation
import SwiftData

@Model
final class MemoryItem {
    var timestamp: Date
    var content: String
    var category: String // "Preference", "Workflow", "ForbiddenZone"
    
    init(content: String, category: String) {
        self.timestamp = Date()
        self.content = content
        self.category = category
    }
}

@Model
final class ActionLog {
    var timestamp: Date
    var actionDescription: String
    var status: String // "Executed", "Blocked", "PendingApproval"
    
    init(description: String, status: String) {
        self.timestamp = Date()
        self.actionDescription = description
        self.status = status
    }
}