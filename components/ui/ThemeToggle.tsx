"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-muted/50 border border-border/50 opacity-50 cursor-not-allowed">
        <Sun className="h-[1.2rem] w-[1.2rem] text-transparent" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative cursor-pointer w-9 h-9 flex items-center justify-center rounded-xl bg-muted/30 border border-border/50 hover:bg-muted hover:border-border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      aria-label="Toggle theme"
    >
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-all text-foreground ${isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`}
      />
      <Moon
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all text-foreground ${isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"}`}
      />
    </button>
  );
}
