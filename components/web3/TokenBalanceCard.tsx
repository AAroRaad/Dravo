"use client";

import { useWeb3Store } from "@/lib/store/useWeb3Store";
import { Star } from "lucide-react";

interface TokenBalanceCardProps {
  // Optional override if not using the global state directly (e.g. initial server state)
  initialBalance?: number; 
}

export function TokenBalanceCard({ initialBalance }: TokenBalanceCardProps) {
  const { walletAddress, tokenBalance } = useWeb3Store();
  
  // Use global state if wallet is connected, otherwise fallback to server provided balance
  const displayBalance = walletAddress ? tokenBalance : (initialBalance || 0);

  return (
    <div 
      className="p-6 rounded-2xl glass border border-primary/20 relative overflow-hidden group" 
      style={{ boxShadow: "0 0 40px rgba(168,85,247,0.1)" }}
      role="region"
      aria-labelledby="balance-card-title"
    >
      <div className="absolute top-0 right-0 p-4 opacity-50 pointer-events-none" aria-hidden="true">
        <Star className="w-16 h-16 text-primary blur-md" />
      </div>
      
      <h3 id="balance-card-title" className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
        Total Tokens
      </h3>
      
      <div className="flex items-baseline gap-2">
        <span className="text-5xl font-bold text-gradient">
          {displayBalance}
        </span>
        <span className="text-sm text-primary font-medium">Tokens</span>
      </div>

      {walletAddress && (
        <div className="mt-4 pt-4 border-t border-white/5">
          <p className="text-xs text-muted-foreground">Connected Wallet</p>
          <p className="text-sm font-mono mt-1 opacity-90">
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </p>
        </div>
      )}
    </div>
  );
}
