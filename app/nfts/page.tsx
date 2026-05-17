import { redirect } from "next/navigation";

// The marketplace has been replaced with the 6-hour challenge engine.
// Redirect any old /nfts links back to home.
export default function NftsPage() {
  redirect("/");
}
