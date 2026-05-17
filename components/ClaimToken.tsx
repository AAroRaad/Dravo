"use client";

import { useEffect, useState, useCallback, useTransition } from "react";
import {
  Check,
  Loader2,
  Copy,
  Zap,
  Clock,
  Shield,
  ChevronRight,
  Terminal,
  LogIn,
  Star,
  History,
  Trophy,
  Flame,
  Target,
} from "lucide-react";
import Link from "next/link";
import {
  getClaimStatus,
  executeSixHourAction,
} from "@/lib/actions/token-actions";

// ─── Types ──────────────────────────────────────────────────────────────────

type ClaimStatus = Awaited<ReturnType<typeof getClaimStatus>>;
type TokenEntry = {
  id: string;
  token: string;
  actionType: string;
  createdAt: string;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatCountdown(ms: number): string {
  if (ms <= 0) return "00:00:00";
  const totalSecs = Math.floor(ms / 1000);
  const h = Math.floor(totalSecs / 3600);
  const m = Math.floor((totalSecs % 3600) / 60);
  const s = totalSecs % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Progress ring — 0 = cooldown full, 1 = ready
function ProgressRing({
  progress,
  isReady,
}: {
  progress: number;
  isReady: boolean;
}) {
  const R = 54;
  const circ = 2 * Math.PI * R;
  const dash = circ * Math.min(progress, 1);

  return (
    <svg
      width="140"
      height="140"
      viewBox="0 0 140 140"
      className="drop-shadow-lg"
    >
      {/* Track */}
      <circle
        cx="70"
        cy="70"
        r={R}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="10"
      />
      {/* Fill */}
      <circle
        cx="70"
        cy="70"
        r={R}
        fill="none"
        stroke={isReady ? "url(#readyGrad)" : "url(#cooldownGrad)"}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
        transform="rotate(-90 70 70)"
        style={{ transition: "stroke-dasharray 1s linear" }}
      />
      <defs>
        <linearGradient id="readyGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="cooldownGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function LoggedOutCard() {
  return (
    <div className="flex flex-col items-center text-center py-8 gap-6">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{
          background: "var(--gradient-primary)",
          boxShadow: "0 0 40px rgba(168,85,247,0.3)",
        }}
      >
        <LogIn className="w-9 h-9 text-white" />
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-2">
          Sign In to Start Your Streak
        </h3>
        <p className="text-muted-foreground max-w-sm mx-auto text-sm leading-relaxed">
          Every 6 hours the Dravo engine unlocks a new action window. Log in to
          participate, complete the action, and earn your unique{" "}
          <span className="text-gradient font-semibold">reward token</span>.
        </p>
      </div>

      <ul className="space-y-2 text-sm text-left w-full max-w-xs">
        {[
          "6-hour action windows, 4× per day",
          "Complete mini-game to claim",
          "Unique token generated per action",
          "Full history dashboard",
        ].map((b) => (
          <li key={b} className="flex items-center gap-2 text-muted-foreground">
            <Star className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
            {b}
          </li>
        ))}
      </ul>

      <div className="flex gap-3 mt-2">
        <Link
          href="/login"
          className="px-6 py-2.5 rounded-xl text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          style={{ background: "var(--gradient-primary)" }}
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          className="px-6 py-2.5 rounded-xl text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/10 transition"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}

function TokenRevealCard({
  tokens,
  onDismiss,
}: {
  tokens: TokenEntry[];
  onDismiss: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const text = tokens.map((t) => t.token).join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const firstToken = tokens[0];

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-purple-500/30 p-6 text-center animate-in fade-in zoom-in duration-500"
      style={{
        background:
          "linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(6,182,212,0.1) 100%)",
      }}
    >
      {/* Shimmer layer */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none rounded-2xl"
        style={{
          background:
            "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)",
          animation: "shimmer 3s infinite",
        }}
      />

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(168,85,247,0.4); }
          50% { box-shadow: 0 0 40px rgba(168,85,247,0.8), 0 0 80px rgba(6,182,212,0.3); }
        }
      `}</style>

      <div className="relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs mb-4">
          <Check className="w-3 h-3" />
          Extraction Complete — {tokens.length} Tokens Earned!
        </div>

        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-widest">
          {firstToken.actionType}
        </p>

        <div
          className="my-4 px-4 py-4 rounded-xl border border-purple-500/30 bg-black/30"
          style={{ animation: "glow-pulse 2s ease-in-out infinite" }}
        >
          <div className="flex flex-col gap-1 max-h-32 overflow-y-auto custom-scrollbar">
            {tokens.map((t) => (
              <span
                key={t.id}
                className="font-mono text-sm md:text-base font-bold text-gradient tracking-widest"
              >
                {t.token}
              </span>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground mb-4">
          These are your unique proof-of-action tokens. Save them or just admire
          them — you earned them.
        </p>

        <div className="flex gap-2 justify-center">
          <button
            onClick={copy}
            className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-400" /> Copied All!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Copy All
              </>
            )}
          </button>
          <button
            onClick={onDismiss}
            className="cursor-pointer px-4 py-2 rounded-xl text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
          >
            Dismiss
          </button>
        </div>

        <p className="mt-4 text-[10px] text-muted-foreground">
          Earned {formatDate(firstToken.createdAt)}
        </p>
      </div>
    </div>
  );
}

function ActionLog({ steps }: { steps: string[] }) {
  return (
    <div className="rounded-xl bg-black/50 border border-white/5 p-4 font-mono text-xs space-y-1.5">
      <div className="flex items-center gap-2 text-muted-foreground mb-2">
        <Terminal className="w-3.5 h-3.5" />
        <span className="text-[11px] uppercase tracking-widest">
          Action Engine Log
        </span>
      </div>
      {steps.map((step, i) => (
        <div
          key={i}
          className="flex items-start gap-2 text-green-400 animate-in fade-in duration-300"
        >
          <ChevronRight className="w-3 h-3 flex-shrink-0 mt-0.5 text-green-500" />
          <span>{step}</span>
        </div>
      ))}
      <div className="flex items-center gap-1.5 text-purple-400 pt-1">
        <Loader2 className="w-3 h-3 animate-spin" />
        <span>Processing...</span>
      </div>
    </div>
  );
}

function TokenHistoryTable({ tokens }: { tokens: TokenEntry[] }) {
  if (tokens.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
        <History className="w-4 h-4" />
        <span className="uppercase tracking-widest text-xs">
          Action History
        </span>
      </div>
      <div className="rounded-2xl border border-white/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium">
                Token
              </th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium hidden sm:table-cell">
                Action
              </th>
              <th className="text-right px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium">
                Earned
              </th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((t) => (
              <tr
                key={t.id}
                className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-4 py-3 font-mono text-xs text-gradient font-semibold">
                  {t.token}
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground hidden sm:table-cell">
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300">
                    {t.actionType}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground text-right whitespace-nowrap">
                  {formatDate(t.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

const ACTION_LOG_STEPS = [
  "Verifying session identity...",
  "Confirming extraction integrity...",
  "Generating unique action token...",
  "Logging action to history...",
  "Computing streak update...",
  "Token ready — action complete!",
];

export function ClaimToken() {
  const [claimStatus, setClaimStatus] = useState<ClaimStatus | null>(null);
  const [tokens, setTokens] = useState<TokenEntry[]>([]);
  const [newTokens, setNewTokens] = useState<TokenEntry[] | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const [bypassCooldown, setBypassCooldown] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [logSteps, setLogSteps] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  // Mini-game state
  const [playingGame, setPlayingGame] = useState(false);
  const [gameClicks, setGameClicks] = useState(0);
  const TARGET_CLICKS = 50; // Required taps to get the token

  // Initial fetch
  const fetchStatus = useCallback(async () => {
    const result = await getClaimStatus();
    setClaimStatus(result);
    if (result.status === "authenticated") {
      setTokens(result.tokens);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  // Live countdown ticker
  useEffect(() => {
    if (claimStatus?.status !== "authenticated" || !claimStatus.nextAvailableAt)
      return;

    const tick = () => {
      const remaining =
        new Date(claimStatus.nextAvailableAt!).getTime() - Date.now();
      setCountdown(Math.max(0, remaining));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [claimStatus]);

  const handleExecute = () => {
    setExecuting(true);
    setLogSteps([]);

    ACTION_LOG_STEPS.forEach((step, i) => {
      setTimeout(() => {
        setLogSteps((prev) => [...prev, step]);
      }, i * 600);
    });

    const totalDelay = ACTION_LOG_STEPS.length * 600 + 400;
    setTimeout(() => {
      startTransition(async () => {
        const result = await executeSixHourAction(bypassCooldown);
        setExecuting(false);
        setLogSteps([]);
        if ("error" in result) {
          alert(result.error);
          return;
        }
        setNewTokens(result.newTokens);
        setTokens(result.tokens);
        await fetchStatus();
      });
    }, totalDelay);
  };

  // ── Derived state ──
  const isAuthenticated = claimStatus?.status === "authenticated";
  const isReady =
    isAuthenticated && (bypassCooldown || (claimStatus as any).isReady);

  const progress = (() => {
    if (!isAuthenticated) return 0;
    const s = claimStatus as Extract<ClaimStatus, { status: "authenticated" }>;
    if (!s.nextAvailableAt) return 1;
    const total = s.cooldownMs;
    const elapsed = total - countdown;
    return Math.min(elapsed / total, 1);
  })();

  const passedCheckpoints = isReady ? 6 : Math.floor(progress * 6);

  return (
    <section id="claim" className="px-6 py-24 relative">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ background: "var(--gradient-radial)" }}
      />

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs uppercase tracking-widest text-secondary mb-4">
            <Zap className="w-4 h-4" />
            6-Hour Action Engine
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Complete your <span className="text-gradient">6-hour action</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm">
            Every 6 hours a new window opens. Complete the mini-game to earn
            your unique token as proof. No selling, no crypto — just
            consistency.
          </p>
        </div>

        <div
          className="rounded-3xl border border-white/10 overflow-hidden relative"
          style={{
            background: "var(--gradient-card)",
            boxShadow: "var(--shadow-glow)",
          }}
        >
          {/* Ambient glow blobs */}
          <div
            className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ background: "var(--gradient-primary)" }}
          />
          <div
            className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ background: "linear-gradient(135deg,#06b6d4,#6366f1)" }}
          />

          <div className="relative p-8 md:p-12">
            {/* ── UNAUTHENTICATED ── */}
            {!isAuthenticated && <LoggedOutCard />}

            {/* ── AUTHENTICATED ── */}
            {isAuthenticated &&
              !executing &&
              !newTokens &&
              (() => {
                const s = claimStatus as Extract<
                  ClaimStatus,
                  { status: "authenticated" }
                >;

                // If playing game, render the active clicker mode
                if (playingGame) {
                  const gameProgressPercent =
                    (gameClicks / TARGET_CLICKS) * 100;
                  return (
                    <div className="flex flex-col items-center gap-8 py-10 animate-in fade-in zoom-in duration-500">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold mb-2 text-purple-400">
                          Extracting Core Energy
                        </h3>
                        <p className="text-sm text-muted-foreground max-w-sm">
                          Tap the core rapidly to stabilize the matrix and
                          extract your reward token.
                        </p>
                      </div>

                      <div className="relative w-48 h-48 mx-auto">
                        <button
                          onClick={() => {
                            const next = gameClicks + 1;
                            setGameClicks(next);
                            if (next >= TARGET_CLICKS) {
                              setPlayingGame(false);
                              handleExecute();
                            }
                          }}
                          className="w-full h-full rounded-full flex items-center justify-center transition-all duration-75 active:scale-95 cursor-pointer bg-purple-500/10 hover:bg-purple-500/20 select-none"
                          style={{
                            boxShadow: `0 0 ${20 + gameProgressPercent}px rgba(168,85,247,0.5), inset 0 0 20px rgba(255,255,255,0.1)`,
                          }}
                        >
                          <Zap
                            className="w-16 h-16 text-purple-400 drop-shadow-md transition-transform"
                            style={{
                              transform: `scale(${1 + gameProgressPercent / 150})`,
                            }}
                          />
                        </button>

                        <svg
                          className="absolute inset-0 w-full h-full pointer-events-none -m-4"
                          style={{
                            width: "calc(100% + 32px)",
                            height: "calc(100% + 32px)",
                          }}
                          viewBox="0 0 100 100"
                        >
                          <circle
                            cx="50"
                            cy="50"
                            r="48"
                            fill="none"
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="4"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="48"
                            fill="none"
                            stroke="url(#readyGrad)"
                            strokeWidth="4"
                            strokeDasharray="301.59"
                            strokeDashoffset={
                              301.59 - 301.59 * (gameClicks / TARGET_CLICKS)
                            }
                            strokeLinecap="round"
                            transform="rotate(-90 50 50)"
                            style={{
                              transition: "stroke-dashoffset 0.1s ease",
                            }}
                          />
                        </svg>
                      </div>

                      <div className="w-full max-w-xs text-center">
                        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2 flex justify-between">
                          <span>Extraction Progress</span>
                          <span className="font-bold text-white">
                            {gameClicks} / {TARGET_CLICKS} TAPS
                          </span>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-100"
                            style={{ width: `${gameProgressPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                }

                // Normal view (Waiting or Ready)
                return (
                  <div className="grid md:grid-cols-2 gap-10 items-center animate-in fade-in">
                    {/* Left: info panel */}
                    <div className="space-y-6">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                          Logged in as
                        </p>
                        <p className="font-semibold">
                          {s.user.name || s.user.email}
                        </p>
                      </div>

                      <div className="space-y-3 text-sm">
                        {[
                          {
                            icon: Shield,
                            label: "Unique token per action completed",
                            color: "text-secondary",
                          },
                          {
                            icon: Clock,
                            label: "6-hour cooldown between actions",
                            color: "text-purple-400",
                          },
                          {
                            icon: Target,
                            label: "Complete mini-game to extract token",
                            color: "text-cyan-400",
                          },
                          {
                            icon: Trophy,
                            label: "Build streaks and earn achievements",
                            color: "text-yellow-400",
                          },
                          {
                            icon: Flame,
                            label: "Stay consistent — don't break your streak",
                            color: "text-orange-400",
                          },
                        ].map(({ icon: Icon, label, color }) => (
                          <div
                            key={label}
                            className="flex items-center gap-3 text-muted-foreground"
                          >
                            <Icon
                              className={`w-4 h-4 ${color} flex-shrink-0`}
                            />
                            {label}
                          </div>
                        ))}
                      </div>

                      {/* Demo bypass toggle */}
                      <label className="flex items-center gap-3 cursor-pointer group select-none">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={bypassCooldown}
                            onChange={(e) =>
                              setBypassCooldown(e.target.checked)
                            }
                            className="sr-only"
                            id="bypass-toggle"
                          />
                          <div
                            className={`w-11 h-6 rounded-full transition-all duration-300 ${bypassCooldown ? "bg-purple-600" : "bg-white/10"}`}
                          />
                          <div
                            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${bypassCooldown ? "translate-x-5" : ""}`}
                          />
                        </div>
                        <div>
                          <span className="text-sm font-medium">
                            🧪 Demo: Skip 6h cooldown
                          </span>
                          <p className="text-[11px] text-muted-foreground">
                            Unlock mini-game instantly
                          </p>
                        </div>
                      </label>
                    </div>

                    {/* Right: progress ring + action */}
                    <div className="flex flex-col items-center gap-6">
                      <div className="relative">
                        <ProgressRing
                          progress={isReady ? 1 : progress}
                          isReady={isReady}
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          {isReady ? (
                            <>
                              <Zap className="w-6 h-6 text-purple-400 mb-1" />
                              <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                                Ready!
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="font-mono text-lg font-bold tabular-nums">
                                {formatCountdown(countdown)}
                              </span>
                              <span className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                                until next window
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Hourly Checkpoints Tracker */}
                      <div className="flex gap-3 justify-center w-full px-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div
                            key={i}
                            className="flex flex-col items-center gap-1.5 flex-1"
                          >
                            <div
                              className={`w-full h-1.5 rounded-full transition-all duration-1000 ${i < passedCheckpoints ? "bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" : "bg-white/10"}`}
                            />
                            <div
                              className={`text-[9px] font-mono ${i < passedCheckpoints ? "text-purple-300" : "text-muted-foreground/50"}`}
                            >
                              {i + 1}H
                            </div>
                          </div>
                        ))}
                      </div>

                      {isReady && (
                        <button
                          onClick={() => {
                            setGameClicks(0);
                            setPlayingGame(true);
                          }}
                          disabled={isPending}
                          className="w-full cursor-pointer py-4 px-6 rounded-2xl font-bold text-white text-sm transition-all hover:scale-[1.03] hover:opacity-90 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
                          style={{
                            background: "var(--gradient-primary)",
                            boxShadow: "0 0 30px rgba(168,85,247,0.4)",
                          }}
                        >
                          <Target className="w-4 h-4" />
                          Start Extraction Sequence
                        </button>
                      )}

                      {!isReady && (
                        <div className="w-full text-center text-xs text-muted-foreground px-4">
                          <Clock className="w-4 h-4 mx-auto mb-1 opacity-50" />
                          Next window opens in {formatCountdown(countdown)}
                        </div>
                      )}

                      {s.lastClaimedAt && (
                        <p className="text-[11px] text-muted-foreground">
                          Last action: {formatDate(s.lastClaimedAt)}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })()}

            {/* ── EXECUTING ── */}
            {executing && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
                  <span className="font-semibold">
                    Running action engine...
                  </span>
                </div>
                <ActionLog steps={logSteps} />
              </div>
            )}

            {/* ── SUCCESS TOKEN REVEAL ── */}
            {newTokens && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <TokenRevealCard
                  tokens={newTokens}
                  onDismiss={() => setNewTokens(null)}
                />
              </div>
            )}

            {/* ── TOKEN HISTORY ── */}
            {isAuthenticated &&
              tokens.length > 0 &&
              !executing &&
              !playingGame && <TokenHistoryTable tokens={tokens} />}
          </div>
        </div>
      </div>
    </section>
  );
}
