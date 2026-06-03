"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { UserDropdown } from "./UserDropdown";
import { Zap, Menu, X } from "lucide-react";
import { ConnectWalletButton } from "./web3/ConnectWalletButton";
import { ThemeToggle } from "./ui/ThemeToggle";
import { useState, useEffect } from "react";

export function Navbar() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          href="/"
          aria-label="DRAVO — go to homepage"
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
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            Challenges
          </Link>
          <Link
            href="#claim"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            Claim
          </Link>
          <Link
            href="#roadmap"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            Roadmap
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <ConnectWalletButton />
          {session ? (
            <UserDropdown user={session.user} />
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-primary text-primary-foreground text-sm font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 -mr-2 text-foreground/80 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="md:hidden absolute top-20 left-0 right-0 glass border-b border-white/5 bg-background/95 backdrop-blur-xl p-6 flex flex-col gap-6 animate-in slide-in-from-top-4 duration-300 motion-reduce:transition-none motion-reduce:animate-none shadow-2xl"
        >
          <div className="flex flex-col gap-4">
            <Link href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">Challenges</Link>
            <Link href="#claim" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">Claim</Link>
            <Link href="#roadmap" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">Roadmap</Link>
          </div>
          
          <div className="h-px w-full bg-white/10" />
          
          <div className="flex flex-col gap-4 items-start">
            <ConnectWalletButton />
            {session ? (
              <UserDropdown user={session.user} />
            ) : (
              <div className="flex flex-col gap-4 w-full">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center text-sm font-medium border border-white/10 bg-white/5 px-4 py-2.5 rounded-xl hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Login</Link>
                <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center bg-primary text-primary-foreground text-sm font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
