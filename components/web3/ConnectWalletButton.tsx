"use client";

import { useEffect } from "react";
import { useWeb3Store } from "@/lib/store/useWeb3Store";
import { Loader2, Wallet } from "lucide-react";

export function ConnectWalletButton() {
  const { walletAddress, isConnecting, walletError, connectWallet, disconnectWallet, clearWalletError } = useWeb3Store();

  useEffect(() => {
    if (typeof window === "undefined" || !(window as any).ethereum) return;
    const eth = (window as any).ethereum;
    
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        useWeb3Store.setState({ walletAddress: accounts[0] });
      }
    };
    
    eth.on?.("accountsChanged", handleAccountsChanged);
    return () => {
      eth.removeListener?.("accountsChanged", handleAccountsChanged);
    };
  }, [disconnectWallet]);

  return (
    <>
      {walletAddress ? (
        <button
          onClick={disconnectWallet}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={`Disconnect wallet ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
        >
          <Wallet className="w-4 h-4" />
          <span>{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
        </button>
      ) : (
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="Connect Web3 Wallet"
        >
          {isConnecting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <Wallet className="w-4 h-4" aria-hidden="true" />
              <span>Connect Wallet</span>
            </>
          )}
        </button>
      )}
    </>
  );
}
