import { create } from 'zustand';
import { BrowserProvider } from 'ethers';

interface Web3State {
  walletAddress: string | null;
  tokenBalance: number;
  claimEligibilityTimer: number; // timestamp of next claim in ms
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  setTokenBalance: (balance: number) => void;
  setClaimEligibilityTimer: (timer: number) => void;
}

export const useWeb3Store = create<Web3State>((set) => ({
  walletAddress: null,
  tokenBalance: 0,
  claimEligibilityTimer: 0,
  isConnecting: false,
  connectWallet: async () => {
    set({ isConnecting: true });
    try {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        const provider = new BrowserProvider((window as any).ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        if (accounts.length > 0) {
          set({ walletAddress: accounts[0] });
          // Note: In a fully decentralized app, fetch token balance from a smart contract here.
          // For UI purposes without an ABI, we keep the initial store state or mock it.
        }
      } else {
        alert("Please install MetaMask!");
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      set({ isConnecting: false });
    }
  },
  disconnectWallet: () => set({ walletAddress: null, tokenBalance: 0, claimEligibilityTimer: 0 }),
  setTokenBalance: (balance) => set({ tokenBalance: balance }),
  setClaimEligibilityTimer: (timer) => set({ claimEligibilityTimer: timer }),
}));
