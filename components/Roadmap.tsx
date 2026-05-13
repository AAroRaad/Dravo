const phases = [
  { q: "Q1", t: "Genesis Launch", d: "Mint 10K founding NFTs and seed liquidity for $NOVA." },
  { q: "Q2", t: "Marketplace v2", d: "Cross-chain trading, lazy minting, and creator royalties." },
  { q: "Q3", t: "Staking Vaults", d: "Stake NFTs to earn $NOVA and unlock tiered drops." },
  { q: "Q4", t: "Creator DAO", d: "Community governance and an artist grants treasury." },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="text-sm text-secondary uppercase tracking-widest mb-3">Roadmap</div>
          <h2 className="text-4xl md:text-5xl font-bold">Building the <span className="text-gradient">open metaverse</span></h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((p, i) => (
            <div key={p.q} className="rounded-2xl p-6 border border-white/5 relative overflow-hidden" style={{ background: "var(--gradient-card)" }}>
              <div className="text-6xl font-black opacity-10 absolute -top-2 -right-2">{i + 1}</div>
              <div className="text-xs text-secondary font-mono mb-2">{p.q} · 2026</div>
              <h3 className="text-xl font-bold mb-2">{p.t}</h3>
              <p className="text-sm text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
