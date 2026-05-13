import Link from "next/link";
import { Heart } from "lucide-react";
import { featuredNfts } from "@/data/nfts";

export function Collection() {
  return (
    <section id="collection" className="px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end               justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="text-sm text-secondary uppercase tracking-widest mb-3">
              Trending now
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Featured <span className="text-gradient">collection</span>
            </h2>
          </div>
          <Link
            href="/nfts"
            className="text-sm text-muted-foreground hover:text-foreground transition"
          >
            View all →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredNfts.map((it) => (
            <article
              key={it.name}
              className="group rounded-3xl overflow-hidden border border-white/5 transition hover:-translate-y-2 hover:border-white/20"
              style={{
                background: "var(--gradient-card)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={it.img}
                  alt={it.name}
                  loading="lazy"
                  width={768}
                  height={768}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />
                <button className="absolute top-3 right-3 glass rounded-full px-3 py-1.5 flex items-center gap-1.5 text-xs">
                  <Heart className="w-3.5 h-3.5" /> {it.likes}
                </button>
              </div>
              <div className="p-5 space-y-3">
                <div>
                  <h3 className="font-bold truncate">{it.name}</h3>
                  <p className="text-xs text-muted-foreground">{it.artist}</p>
                </div>
                <div className="flex items-end justify-between pt-2 border-t border-white/5">
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase">
                      Price
                    </div>
                    <div className="font-bold text-gradient">
                      {it.price} ETH
                    </div>
                  </div>
                  <button className="px-4 py-2 rounded-full text-xs font-semibold bg-white/5 hover:bg-white hover:text-black transition cursor-pointer">
                    Place bid
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
