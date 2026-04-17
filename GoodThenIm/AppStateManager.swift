import SwiftUI

enum EVAMode: String {
    case sleep, observe, assist, execute
}

class AppStateManager: ObservableObject {
    @Published var currentMode: EVAMode = .sleep
    @Published var isWebEnabled: Bool = false
    
    func deactivate() {
        currentMode = .sleep
        isWebEnabled = false
        // Logic to clear volatile session memory
    }
    
    func requestReactivation() {
        // Trigger Biometric Auth (LocalAuthentication)
    }
}