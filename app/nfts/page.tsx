import type { Metadata } from "next";
import { NftsView } from "@/components/NftsView";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "All NFTs — Browse the Dravo Collection",
  description: "Browse all NFTs in the Dravo marketplace. Filter by category and discover trending digital art.",
};

export default function NftsPage() {
  return (
    <>
      <Navbar />
      <NftsView />
      <Footer />
    </>
  );
}
