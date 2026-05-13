import type { Metadata } from "next";
import "./globals.css";
import { WalletProvider } from "@/hooks/use-wallet";

export const metadata: Metadata = {
  title: "NOVA — Collect the Future of Digital Art",
  description: "Discover, collect and trade NFTs. Claim free $NOVA tokens and join the genesis drop.",
  openGraph: {
    title: "NOVA — NFT Marketplace",
    description: "Premium NFTs and free $NOVA token claims.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
