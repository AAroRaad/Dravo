import { Zap, Twitter, Github, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="px-6 pt-16 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 justify-between items-start">
        <div>
          <div className="flex items-center gap-2 font-bold text-xl mb-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Zap className="w-5 h-5 text-background" />
            </div>
            <span className="text-gradient">DRAVO</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            The 6-hour consistency engine. Build habits, earn tokens, stay accountable.
          </p>
        </div>
        <div className="flex gap-6 items-center">
          <div className="flex gap-4 mr-4 text-sm font-medium text-muted-foreground">
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
            <a href="#terms" className="hover:text-primary transition-colors">Terms</a>
          </div>
          <div className="flex gap-3">
            <a
              href="#"
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Telegram"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/5 text-xs text-muted-foreground flex justify-between flex-wrap gap-2" role="contentinfo">
        <span>© 2026 Dravo Labs</span>
        <span>Built with ✦ consistency</span>
      </div>
    </footer>
  );
}
