"use client";

import { ArrowRight, Zap, Clock, Trophy, Flame } from "lucide-react";
import { useEffect, useState } from "react";

function LiveClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="font-mono tabular-nums">{time}</span>;
}

export function Hero() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden">
      {/* Animated background orbs */}
      <div
        className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: "var(--gradient-primary)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10 pointer-events-none"
        style={{ background: "linear-gradient(135deg,#06b6d4,#6366f1)" }}
      />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — copy */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
            <Flame className="w-4 h-4 text-secondary" />
            <span className="text-muted-foreground">6-hour action engine · live</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            Extract the Core{" "}
            <span className="text-gradient">every&nbsp;6&nbsp;hours</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-lg">
            Wait for the engine to charge, complete the extraction mini-game, and earn 10 unique proof-of-action tokens per cycle.
            Stay consistent, build streaks, and unlock achievements.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#claim"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-primary-foreground transition hover:scale-105"
              style={{
                background: "var(--gradient-primary)",
                boxShadow: "var(--shadow-glow)",
              }}
            >
              Start your streak
              <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold glass hover:bg-white/5 transition"
            >
              How it works
            </a>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 max-w-md">
            {[
              ["4×", "Actions / day"],
              ["48h", "Max streak"],
              ["∞", "Tokens earned"],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="text-2xl md:text-3xl font-bold text-gradient">{v}</div>
                <div className="text-xs text-muted-foreground mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — live dashboard card */}
        <div className="relative flex justify-center">
          <div
            className="absolute inset-0 blur-3xl opacity-40 pointer-events-none rounded-3xl"
            style={{ background: "var(--gradient-primary)" }}
          />
          <div
            className="relative animate-float w-full max-w-sm rounded-3xl border border-white/10 overflow-hidden"
            style={{
              background: "var(--gradient-card)",
              boxShadow: "var(--shadow-glow)",
            }}
          >
            {/* Card header */}
            <div className="px-6 pt-6 pb-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-sm">DRAVO Engine</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-green-400">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                LIVE
              </div>
            </div>

            {/* Live clock */}
            <div className="px-6 py-6 text-center border-b border-white/5">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                Current time
              </p>
              <div className="text-3xl font-bold text-gradient">
                <LiveClock />
              </div>
            </div>

            {/* Action slots */}
            <div className="p-6 space-y-3">
              {[
                { label: "Cycle 1 Extraction", time: "06:00", done: true },
                { label: "Cycle 2 Extraction", time: "12:00", done: true },
                { label: "Cycle 3 Extraction", time: "18:00", done: false, active: true },
                { label: "Cycle 4 Extraction", time: "00:00", done: false },
              ].map((slot) => (
                <div
                  key={slot.label}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border transition ${
                    slot.active
                      ? "border-purple-500/50 bg-purple-500/10"
                      : slot.done
                      ? "border-green-500/20 bg-green-500/5"
                      : "border-white/5 bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {slot.done ? (
                      <Trophy className="w-4 h-4 text-green-400" />
                    ) : slot.active ? (
                      <Zap className="w-4 h-4 text-purple-400 animate-pulse" />
                    ) : (
                      <Clock className="w-4 h-4 text-muted-foreground opacity-40" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        slot.done
                          ? "text-green-400"
                          : slot.active
                          ? "text-purple-300"
                          : "text-muted-foreground opacity-40"
                      }`}
                    >
                      {slot.label}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    {slot.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer streak badge */}
            <div className="px-6 pb-6">
              <div
                className="w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-white"
                style={{ background: "var(--gradient-primary)" }}
              >
                <Flame className="w-4 h-4" />
                Current streak: 7 days 🔥
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
