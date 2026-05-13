import { ArrowRight, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
            <Zap className="w-4 h-4 text-secondary" />
            <span className="text-muted-foreground">Genesis drop is live</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            Collect the <span className="text-gradient">future</span> of digital art
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg">
            Discover, collect, and trade extraordinary NFTs from world-class creators. Earn $NOVA tokens with every interaction.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#collection" className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-primary-foreground transition hover:scale-105"
              style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
              Explore drops
              <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
            </a>
            <a href="#claim" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold glass hover:bg-white/5 transition">
              Claim $NOVA
            </a>
          </div>
          <div className="grid grid-cols-3 gap-6 pt-8 max-w-md">
            {[["240K+", "Artworks"], ["98K+", "Artists"], ["12M+", "Volume"]].map(([v, l]) => (
              <div key={l}>
                <div className="text-2xl md:text-3xl font-bold text-gradient">{v}</div>
                <div className="text-xs text-muted-foreground mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 blur-3xl opacity-60" style={{ background: "var(--gradient-primary)" }} />
          <div className="relative animate-float">
            <img src="/assets/hero-nft.jpg" alt="Featured NFT" width={1536} height={1536}
              className="rounded-3xl w-full aspect-square object-cover border border-white/10"
              style={{ boxShadow: "var(--shadow-glow)" }} />
            <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 backdrop-blur-xl">
              <div className="text-xs text-muted-foreground">Highest bid</div>
              <div className="text-xl font-bold text-gradient">4.21 ETH</div>
            </div>
            <div className="absolute -top-6 -right-6 glass rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">Ends in</div>
              <div className="text-xl font-bold">12:34:08</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
