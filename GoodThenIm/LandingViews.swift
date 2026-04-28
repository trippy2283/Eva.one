import SwiftUI

struct HomeView: View {
    @EnvironmentObject var state: AppStateManager

    private let highlights: [StatItem] = [
        .init(value: "50K+", label: "Creators"),
        .init(value: "1.2M+", label: "AI Assets"),
        .init(value: "$12M+", label: "Creator Payouts"),
        .init(value: "99.9%", label: "Uptime")
    ]

    private let partnerMarks: [String] = [
        "Nova Engine", "Photon Compute", "ChainSphere", "OrbitX", "Lattice AI"
    ]

    var body: some View {
        ZStack {
            LinearGradient(
                colors: [Color.black, Color(red: 0.04, green: 0.03, blue: 0.18), Color(red: 0.1, green: 0.0, blue: 0.22)],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            .ignoresSafeArea()

            VStack(alignment: .leading, spacing: 20) {
                header

                Spacer(minLength: 10)

                Text("THE NEXT GENERATION AI PLATFORM")
                    .font(.caption)
                    .tracking(3)
                    .foregroundStyle(.cyan.opacity(0.85))

                Text("EVA ONE")
                    .font(.system(size: 56, weight: .black, design: .rounded))
                    .foregroundStyle(
                        LinearGradient(colors: [.purple, .cyan], startPoint: .leading, endPoint: .trailing)
                    )

                Text("CREATE • EXPLORE • EARN")
                    .font(.title2.weight(.bold))
                    .foregroundStyle(.white)

                Text("A legally safe, original brand experience for creators, teams, and businesses to build, orchestrate, and monetize AI workflows.")
                    .foregroundStyle(.white.opacity(0.82))
                    .frame(maxWidth: 520, alignment: .leading)

                Text("No-code agentic orchestration: design assistants, automate handoffs, and deploy secure multi-agent systems without writing code.")
                    .foregroundStyle(.white.opacity(0.75))
                    .frame(maxWidth: 560, alignment: .leading)

                HStack(spacing: 14) {
                    Button(action: {}) {
                        Label("Launch App", systemImage: "arrow.up.right")
                            .fontWeight(.semibold)
                            .padding(.horizontal, 24)
                            .padding(.vertical, 12)
                            .background(
                                LinearGradient(colors: [.purple, .blue], startPoint: .leading, endPoint: .trailing),
                                in: Capsule()
                            )
                    }
                    .buttonStyle(.plain)

                    Button(action: {}) {
                        Label("Watch Demo", systemImage: "play.circle")
                            .fontWeight(.medium)
                            .padding(.horizontal, 20)
                            .padding(.vertical, 12)
                            .background(.white.opacity(0.08), in: Capsule())
                    }
                    .buttonStyle(.plain)
                }
                .foregroundStyle(.white)

                HStack(spacing: 22) {
                    ForEach(highlights) { item in
                        VStack(alignment: .leading, spacing: 4) {
                            Text(item.value)
                                .font(.title3.weight(.bold))
                                .foregroundStyle(.cyan)
                            Text(item.label)
                                .font(.footnote)
                                .foregroundStyle(.white.opacity(0.75))
                        }
                    }
                }

                Spacer()

                VStack(alignment: .leading, spacing: 10) {
                    Text("TRUSTED BY INNOVATORS WORLDWIDE")
                        .font(.caption2)
                        .tracking(2)
                        .foregroundStyle(.white.opacity(0.55))

                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 16) {
                            ForEach(partnerMarks, id: \.self) { mark in
                                Text(mark)
                                    .font(.subheadline.weight(.semibold))
                                    .padding(.horizontal, 14)
                                    .padding(.vertical, 8)
                                    .background(.white.opacity(0.08), in: Capsule())
                                    .foregroundStyle(.white.opacity(0.8))
                            }
                        }
                    }
                }
            }
            .padding(.horizontal, 24)
            .padding(.vertical, 20)

            VStack {
                HStack {
                    Spacer()
                    ZStack {
                        Circle()
                            .fill(
                                RadialGradient(
                                    colors: [.purple.opacity(0.45), .blue.opacity(0.1), .clear],
                                    center: .center,
                                    startRadius: 5,
                                    endRadius: 180
                                )
                            )
                            .frame(width: 280, height: 280)

                        Image(systemName: "aqi.medium")
                            .font(.system(size: 110, weight: .thin))
                            .foregroundStyle(.white.opacity(0.75))
                    }
                    .padding(.top, 90)
                    .padding(.trailing, 25)
                }
                Spacer()
            }
            .allowsHitTesting(false)
        }
        .navigationBarHidden(true)
    }

    private var header: some View {
        HStack {
            Label("EVA ONE", systemImage: "circle.hexagongrid.fill")
                .font(.headline.weight(.semibold))
                .foregroundStyle(.white)

            Spacer()

            HStack(spacing: 18) {
                ForEach(["Platform", "Marketplace", "Studio", "Docs", "About"], id: \.self) { item in
                    Text(item)
                        .font(.subheadline)
                        .foregroundStyle(.white.opacity(0.8))
                }
            }

            Button("Launch App") {}
                .font(.subheadline.weight(.semibold))
                .padding(.horizontal, 12)
                .padding(.vertical, 8)
                .overlay(RoundedRectangle(cornerRadius: 10).stroke(.cyan.opacity(0.7), lineWidth: 1))
                .foregroundStyle(.white)
        }
    }
}

private struct StatItem: Identifiable {
    let id = UUID()
    let value: String
    let label: String
}

struct ChatView: View {
    var body: some View {
        ContentUnavailableView("Chat", systemImage: "bubble.left.and.bubble.right", description: Text("No-code orchestration chat console."))
            .navigationTitle("Chat")
    }
}

struct WorkflowView: View {
    var body: some View {
        ContentUnavailableView("Workflows", systemImage: "square.stack.3d.up", description: Text("Visual multi-agent flow builder."))
            .navigationTitle("Workflows")
    }
}

struct InboxView: View {
    var body: some View {
        ContentUnavailableView("Inbox", systemImage: "tray", description: Text("Approvals, events, and system alerts."))
            .navigationTitle("Inbox")
    }
}
