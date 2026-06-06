const phases = [
  {
    q: "Phase 1",
    t: "Foundation",
    d: "Current state: Web2 auth, off-chain gamified rewards, and initial Web3 wallet connection.",
    icon: "✅",
  },
  {
    q: "Phase 2",
    t: "Smart Contract",
    d: "Develop the ERC-20 Token using Hardhat/Foundry, including secure EIP-712 claiming logic.",
    icon: "🛠️",
  },
  {
    q: "Phase 3",
    t: "Testnet Launch",
    d: "Deploy to Sepolia testnet and build the 'Claim to Wallet' UI for off-chain to on-chain conversion.",
    icon: "🔗",
  },
  {
    q: "Phase 4",
    t: "Security & Audit",
    d: "Perform rigorous security audits, verify tokenomics, and optimize gas fees.",
    icon: "🛡️",
  },
  {
    q: "Phase 5",
    t: "Mainnet Release",
    d: "Deploy to an L2 Mainnet (like Base or Arbitrum), provide initial liquidity, and go live!",
    icon: "🚀",
  },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="text-sm text-secondary uppercase tracking-widest mb-3">
            The Journey to Web3
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Publishing the{" "}
            <span className="text-gradient">Nova Token</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm">
            From an off-chain gamified system to a fully decentralized on-chain token. Here is our roadmap to Mainnet.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {phases.map((p, i) => (
            <div
              key={p.q}
              className="rounded-2xl p-6 border border-white/5 relative overflow-hidden flex flex-col gap-3 transition-transform hover:-translate-y-1 hover:shadow-xl"
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
