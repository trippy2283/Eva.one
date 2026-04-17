import SwiftUI

struct MainTabView: View {
    @StateObject var state = AppStateManager()
    
    var body: some View {
        TabView {
            HomeView().tabItem { Label("Home", systemImage: "house.fill") }
            ChatView().tabItem { Label("Chat", systemImage: "bubble.left.and.bubble.right") }
            WorkflowView().tabItem { Label("Workflows", systemImage: "square.stack.3d.up") }
            InboxView().tabItem { Label("Inbox", systemImage: "tray.full") }
            ControlView().tabItem { Label("Control", systemImage: "gearshape.shield") }
        }
        .environmentObject(state)
    }
}