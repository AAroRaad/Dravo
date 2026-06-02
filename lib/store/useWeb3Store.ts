import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BrowserProvider } from 'ethers';

interface Web3State {
  walletAddress: string | null;
  tokenBalance: number;
  claimEligibilityTimer: number; // timestamp of next claim in ms
  isConnecting: boolean;
  walletError: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  setTokenBalance: (balance: number) => void;
  setClaimEligibilityTimer: (timer: number) => void;
  clearWalletError: () => void;
}

export const useWeb3Store = create<Web3State>()(
  persist(
    (set) => ({
      walletAddress: null,
      tokenBalance: 0,
      claimEligibilityTimer: 0,
      isConnecting: false,
      walletError: null,
      connectWallet: async () => {
        set({ isConnecting: true, walletError: null });
        try {
          if (typeof window !== 'undefined' && (window as any).ethereum) {
            const provider = new BrowserProvider((window as any).ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);
            if (accounts.length > 0) {
              set({ walletAddress: accounts[0] });
            }
          } else {
            set({ walletError: "No wallet detected. Install MetaMask to continue." });
          }
        } catch (error: any) {
          console.error("Failed to connect wallet:", error);
          set({ walletError: error?.message || "Failed to connect wallet." });
        } finally {
          set({ isConnecting: false });
        }
      },
      disconnectWallet: () => set({ walletAddress: null, tokenBalance: 0, claimEligibilityTimer: 0 }),
      setTokenBalance: (balance) => set({ tokenBalance: balance }),
      setClaimEligibilityTimer: (timer) => set({ claimEligibilityTimer: timer }),
      clearWalletError: () => set({ walletError: null }),
    }),
    {
      name: 'web3-storage',
      partialize: (state) => ({ walletAddress: state.walletAddress }),
    }
  )
);
