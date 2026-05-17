const phases = [
  {
    q: "Phase 1",
    t: "6-Hour Engine",
    d: "Log in every 6 hours, complete a challenge, and earn a unique reward token.",
    icon: "⚡",
  },
  {
    q: "Phase 2",
    t: "Streak System",
    d: "Build daily streaks. Miss a window and your streak resets — stay consistent.",
    icon: "🔥",
  },
  {
    q: "Phase 3",
    t: "Achievements",
    d: "Unlock badges and titles for milestone streaks: 7 days, 30 days, 100 days.",
    icon: "🏆",
  },
  {
    q: "Phase 4",
    t: "Community Leaderboard",
    d: "Compete with others on a global leaderboard. See who's most consistent.",
    icon: "🌍",
  },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="text-sm text-secondary uppercase tracking-widest mb-3">
            What&apos;s coming
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Building the{" "}
            <span className="text-gradient">6-hour habit</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm">
            Dravo is more than a countdown — it&apos;s a consistency engine. Here&apos;s where we&apos;re headed.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((p, i) => (
            <div
              key={p.q}
              className="rounded-2xl p-6 border border-white/5 relative overflow-hidden flex flex-col gap-3"
              style={{ background: "var(--gradient-card)" }}
            >
              <div className="text-6xl font-black opacity-10 absolute -top-2 -right-2">
                {i + 1}
              </div>
              <div className="text-3xl">{p.icon}</div>
              <div className="text-xs text-secondary font-mono">{p.q}</div>
              <h3 className="text-xl font-bold">{p.t}</h3>
              <p className="text-sm text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
