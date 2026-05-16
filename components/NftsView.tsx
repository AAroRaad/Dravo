"use client";

import Link from "next/link";
import { Heart, ArrowLeft, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { allNfts, type Nft } from "@/data/nfts";

const categories = [
  "All",
  "Art",
  "Gaming",
  "Photography",
  "Collectibles",
] as const;
type Category = (typeof categories)[number];

export function NftsView() {
  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return allNfts.filter((n) => {
      const matchCat = category === "All" || n.category === category;
      const q = query.trim().toLowerCase();
      const matchQ =
        !q ||
        n.name.toLowerCase().includes(q) ||
        n.artist.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [category, query]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <div>
              <div className="text-sm text-secondary uppercase tracking-widest mb-3">
                Marketplace
              </div>
              <h1 className="text-4xl md:text-6xl font-bold">
                Explore all <span className="text-gradient">NFTs</span>
              </h1>
              <p className="text-muted-foreground mt-3 max-w-xl">
                {filtered.length}{" "}
                {filtered.length === 1 ? "artwork" : "artworks"} from the Dravo
                universe.
              </p>
            </div>

            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or artist"
                className="w-full bg-input/60 rounded-full pl-11 pr-4 py-3 outline-none border border-white/5 focus:border-primary/60 transition text-sm"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((c) => {
              const active = c === category;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition border ${active ? "text-primary-foreground border-transparent" : "text-muted-foreground border-white/10 hover:text-foreground hover:border-white/20"}`}
                  style={
                    active
                      ? {
                          background: "var(--gradient-primary)",
                          boxShadow: "var(--shadow-glow)",
                        }
                      : undefined
                  }
                >
                  {c}
                </button>
              );
            })}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">
              No NFTs match your search.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((it) => (
                <NftCard key={it.id} item={it} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function NftCard({ item }: { item: Nft }) {
  return (
    <article
      className="group rounded-3xl overflow-hidden border border-white/5 transition hover:-translate-y-2 hover:border-white/20"
      style={{
        background: "var(--gradient-card)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={item.img}
          alt={item.name}
          loading="lazy"
          width={768}
          height={768}
          className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
        />
        <button className="absolute top-3 right-3 glass rounded-full px-3 py-1.5 flex items-center gap-1.5 text-xs">
          <Heart className="w-3.5 h-3.5" /> {item.likes}
        </button>
        <span className="absolute top-3 left-3 glass rounded-full px-3 py-1.5 text-[10px] uppercase tracking-widest">
          {item.category}
        </span>
      </div>
      <div className="p-5 space-y-3">
        <div>
          <h3 className="font-bold truncate">{item.name}</h3>
          <p className="text-xs text-muted-foreground">{item.artist}</p>
        </div>
        <div className="flex items-end justify-between pt-2 border-t border-white/5">
          <div>
            <div className="text-[10px] text-muted-foreground uppercase">
              Price
            </div>
            <div className="font-bold text-gradient">{item.price} ETH</div>
          </div>
          <button className="px-4 py-2 rounded-full cursor-pointer text-xs font-semibold bg-white/5 hover:bg-white hover:text-black transition">
            Place bid
          </button>
        </div>
      </div>
    </article>
  );
}
