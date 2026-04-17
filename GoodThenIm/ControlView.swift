import SwiftUI

struct ControlView: View {
    @EnvironmentObject var state: AppStateManager
    
    var body: some View {
        List {
            Section("System State") {
                Toggle("EVA Active", isOn: Binding(
                    get: { state.currentMode != .sleep },
                    set: { if !$0 { state.deactivate() } }
                ))
                .tint(.red)
            }
            
            Section("Permissions") {
                Toggle("Web Access (Session Only)", isOn: $state.isWebEnabled)
                    .disabled(state.currentMode == .sleep)
            }
            
            Section("Security") {
                Button("Force Reset & Lock") {
                    state.deactivate()
                }
                .foregroundColor(.red)
            }
        }
        .navigationTitle("Control")
    }
}