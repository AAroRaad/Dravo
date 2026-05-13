"use client";
import Link from "next/link";
import { Sparkles, Wallet, LogOut, Loader2 } from "lucide-react";
import { useState } from "react";
import { useWallet, shortAddress } from "@/hooks/use-wallet";

export function Navbar() {
  const { address, connect, disconnect, connecting } = useWallet();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
            <Sparkles className="w-5 h-5 text-background" />
          </div>
          <span className="text-gradient">NOVA</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="/#explore" className="hover:text-foreground transition">Explore</a>
          <a href="/#collection" className="hover:text-foreground transition">Collection</a>
          <a href="/#claim" className="hover:text-foreground transition">Token</a>
          <a href="/#roadmap" className="hover:text-foreground transition">Roadmap</a>
        </div>

        {address ? (
          <div className="relative">
            <button onClick={() => setOpen(o => !o)} className="flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm glass border border-white/10 hover:border-primary/50 transition">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="font-mono">{shortAddress(address)}</span>
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl glass border border-white/10 p-2 text-sm">
                <div className="px-3 py-2 text-xs text-muted-foreground uppercase tracking-widest">Connected</div>
                <div className="px-3 py-2 font-mono text-xs break-all">{address}</div>
                <button onClick={() => { disconnect(); setOpen(false); }} className="mt-1 w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition text-left">
                  <LogOut className="w-4 h-4" /> Disconnect
                </button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={connect} disabled={connecting}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full cursor-pointer font-semibold text-sm text-primary-foreground transition hover:scale-105 disabled:opacity-70"
            style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
            {connecting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wallet className="w-4 h-4" />}
            {connecting ? "Connecting..." : "Connect Wallet"}
          </button>
        )}
      </nav>
    </header>
  );
}
