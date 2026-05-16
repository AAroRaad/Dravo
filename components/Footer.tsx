import { Sparkles, Twitter, Github, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="px-6 pt-16 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 justify-between items-start">
        <div>
          <div className="flex items-center gap-2 font-bold text-xl mb-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
              <Sparkles className="w-5 h-5 text-background" />
            </div>
            <span className="text-gradient">DRAVO</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">The home of digital collectibles. Made by creators, for creators.</p>
        </div>
        <div className="flex gap-3">
          {[Twitter, Github, Send].map((Icon, i) => (
            <a key={i} href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition">
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/5 text-xs text-muted-foreground flex justify-between flex-wrap gap-2">
        <span>© 2026 Dravo Labs</span>
        <span>Built with ✦ on-chain</span>
      </div>
    </footer>
  );
}
