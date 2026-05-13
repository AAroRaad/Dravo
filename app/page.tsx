import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Collection } from "@/components/Collection";
import { ClaimToken } from "@/components/ClaimToken";
import { Roadmap } from "@/components/Roadmap";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Collection />
      <ClaimToken />
      <Roadmap />
      <Footer />
    </main>
  );
}
