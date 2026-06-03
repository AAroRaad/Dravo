import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BrowserProvider } from 'ethers';
import { toast } from 'react-toastify';

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
            toast.error("No wallet detected. Install MetaMask to continue.", { autoClose: 2000 });
          }
        } catch (error: any) {
          if (error?.code === 4001 || error?.code === 'ACTION_REJECTED' || error?.message?.includes('User rejected')) {
            toast.error("Connection request was rejected by the user.", { autoClose: 2000 });
          } else {
            console.error("Failed to connect wallet:", error);
            toast.error(error?.message || "Failed to connect wallet.", { autoClose: 2000 });
          }
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
