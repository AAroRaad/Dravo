import React from "react";
import Link from "next/link";
import { Home, ChevronLeft } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-background">
      {/* Back to Home Button */}
      <Link
        href="/"
        className="absolute top-8 left-8 z-20 flex items-center gap-2 text-sm font-medium text-foreground/60 hover:text-primary transition-all group"
      >
        <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
          <ChevronLeft className="w-4 h-4" />
        </div>
        Back to Home
      </Link>

      {/* Animated background elements */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px] animate-pulse-glow" />

      <div className="w-full max-w-md relative z-10">{children}</div>
    </div>
  );
}
