import Link from "next/link";
import { auth } from "@/auth";
import { UserDropdown } from "./UserDropdown";
import { Zap } from "lucide-react";

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-gradient tracking-tighter"
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Zap className="w-4 h-4 text-white" />
          </div>
          DRAVO
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            Challenges
          </Link>
          <Link
            href="#claim"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            Claim
          </Link>
          <Link
            href="#roadmap"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            Roadmap
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {session ? (
            <UserDropdown user={session.user} />
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-4 py-2"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-primary text-primary-foreground text-sm font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
