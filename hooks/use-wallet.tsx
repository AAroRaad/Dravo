"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, handler: (...args: any[]) => void) => void;
  removeListener?: (event: string, handler: (...args: any[]) => void) => void;
  isMetaMask?: boolean;
};

declare global {
  interface Window { ethereum?: EthereumProvider }
}

type WalletContextValue = {
  address: string | null;
  chainId: string | null;
  connecting: boolean;
  error: string | null;
  hasProvider: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
};

const WalletContext = createContext<WalletContextValue | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasProvider, setHasProvider] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const eth = window.ethereum;
    setHasProvider(!!eth);
    if (!eth) return;

    eth.request({ method: "eth_accounts" })
      .then((accs) => { const list = accs as string[]; if (list?.[0]) setAddress(list[0]); })
      .catch(() => {});
    eth.request({ method: "eth_chainId" }).then((id) => setChainId(id as string)).catch(() => {});

    const onAccounts = (accs: string[]) => setAddress(accs?.[0] ?? null);
    const onChain = (id: string) => setChainId(id);
    eth.on?.("accountsChanged", onAccounts);
    eth.on?.("chainChanged", onChain);
    return () => {
      eth.removeListener?.("accountsChanged", onAccounts);
      eth.removeListener?.("chainChanged", onChain);
    };
  }, []);

  const connect = useCallback(async () => {
    setError(null);
    const eth = typeof window !== "undefined" ? window.ethereum : undefined;
    if (!eth) {
      setError("No wallet detected. Install MetaMask to continue.");
      window.open("https://metamask.io/download/", "_blank");
      return;
    }
    try {
      setConnecting(true);
      const accs = (await eth.request({ method: "eth_requestAccounts" })) as string[];
      if (accs?.[0]) setAddress(accs[0]);
      const id = (await eth.request({ method: "eth_chainId" })) as string;
      setChainId(id);
    } catch (e: any) {
      setError(e?.message ?? "Failed to connect wallet");
    } finally {
      setConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => setAddress(null), []);

  const value = useMemo(
    () => ({ address, chainId, connecting, error, hasProvider, connect, disconnect }),
    [address, chainId, connecting, error, hasProvider, connect, disconnect],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}

export function shortAddress(addr: string | null | undefined) {
  if (!addr) return "";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}
