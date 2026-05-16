"use client";
import { useEffect, useState } from "react";
import { Coins, Check, Loader2, Wallet } from "lucide-react";
import { useWallet } from "@/hooks/use-wallet";

export function ClaimToken() {
  const { address, connect, connecting } = useWallet();
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [addressInput, setAddressInput] = useState("");
  const [claimed, setClaimed] = useState(0);

  useEffect(() => { if (address) setAddressInput(address); }, [address]);

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressInput.trim()) return;
    setStatus("loading");
    setTimeout(() => { setClaimed(500); setStatus("done"); }, 1800);
  };

  return (
    <section id="claim" className="px-6 py-24 relative">
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: "var(--gradient-radial)" }} />
      <div className="max-w-5xl mx-auto relative">
        <div className="rounded-4xl p-8 md:p-14 border border-white/10 relative overflow-hidden"
          style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-glow)" }}>
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-40" style={{ background: "var(--gradient-primary)" }} />
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs uppercase tracking-widest text-secondary mb-6">
                <Coins className="w-4 h-4" /> Token claim
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Claim your <span className="text-gradient">$DRAVO</span> tokens
              </h2>
              <p className="text-muted-foreground mb-6">
                Get 500 $DRAVO free for joining the genesis community. Use them to bid, stake, and unlock exclusive drops.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["Instant on-chain delivery", "Zero gas fees", "Stake to earn rewards"].map(t => (
                  <li key={t} className="flex items-center gap-2"><Check className="w-4 h-4 text-secondary" />{t}</li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleClaim} className="space-y-4 glass rounded-2xl p-6">
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Wallet address</label>
                <input value={addressInput} onChange={(e) => setAddressInput(e.target.value)}
                  placeholder="0x1a2b...e9f0"
                  className="mt-2 w-full bg-input/60 rounded-xl px-4 py-3 outline-none border border-white/5 focus:border-primary/60 transition font-mono text-sm"
                  disabled={status !== "idle"} />
                {!address && (
                  <button type="button" onClick={connect} disabled={connecting}
                    className="mt-2 cursor-pointer inline-flex items-center gap-1.5 text-xs text-secondary hover:underline disabled:opacity-60">
                    <Wallet className="w-3 h-3" />
                    {connecting ? "Connecting..." : "Use connected wallet"}
                  </button>
                )}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Reward</span>
                <span className="font-bold text-gradient text-lg">500 $DRAVO</span>
              </div>
              <button type="submit" disabled={status === "loading" || status === "done"}
                className="w-full cursor-pointer py-4 rounded-xl font-bold text-primary-foreground transition hover:scale-[1.02] disabled:opacity-80 disabled:hover:scale-100 flex items-center justify-center gap-2 animate-pulse-glow"
                style={{ background: "var(--gradient-primary)" }}>
                {status === "idle" && "Claim tokens"}
                {status === "loading" && (<><Loader2 className="w-4 h-4 animate-spin" /> Minting...</>)}
                {status === "done" && (<><Check className="w-4 h-4" /> {claimed} $DRAVO claimed</>)}
              </button>
              <p className="text-[10px] text-muted-foreground text-center">By claiming you agree to the protocol terms. Demo only.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
