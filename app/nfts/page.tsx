import type { Metadata } from "next";
import { NftsView } from "@/components/NftsView";

export const metadata: Metadata = {
  title: "All NFTs — Browse the NOVA Collection",
  description: "Browse all NFTs in the NOVA marketplace. Filter by category and discover trending digital art.",
};

export default function NftsPage() {
  return <NftsView />;
}
