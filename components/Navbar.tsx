import Link from "next/link";
import { auth } from "@/auth";
import { logout } from "@/lib/actions/auth-actions";
import { User, LogOut } from "lucide-react";

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-gradient tracking-tighter"
        >
          DRAVO
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/nfts"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            Marketplace
          </Link>
          <Link
            href="/#collection"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            Collections
          </Link>
          <Link
            href="/#claim"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            Claim
          </Link>
          <Link
            href="/#roadmap"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            Roadmap
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {session ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-xs font-medium text-foreground/80 hidden sm:block">
                  {session.user?.name || session.user?.email}
                </span>
              </div>
              <form action={logout}>
                <button className="cursor-pointer p-2 rounded-xl bg-white/5 hover:bg-red-500/10 hover:text-red-500 transition-all border border-white/10 group">
                  <LogOut className="w-4 h-4" />
                </button>
              </form>
            </div>
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
