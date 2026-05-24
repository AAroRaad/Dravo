"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ClaimPanelProps {
  onComplete: () => void;
  targetClicks?: number;
}

export function ClaimPanel({ onComplete, targetClicks = 50 }: ClaimPanelProps) {
  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    const next = clicks + 1;
    setClicks(next);
    if (next >= targetClicks) {
      onComplete();
    }
  };

  const progressPercent = Math.min((clicks / targetClicks) * 100, 100);

  return (
    <div className="flex flex-col items-center gap-8 py-10">
      <div className="text-center" role="region" aria-live="polite">
        <h3 className="text-2xl font-bold mb-2 text-purple-400">
          Extracting Core Energy
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Tap the core {targetClicks} times to stabilize the matrix and extract your reward token.
        </p>
      </div>

      <div className="relative w-48 h-48 mx-auto">
        <button
          onClick={handleClick}
          aria-label={`Tap to extract token. ${clicks} out of ${targetClicks} taps.`}
          className="w-full h-full rounded-full flex items-center justify-center cursor-pointer bg-purple-500/10 hover:bg-purple-500/20 select-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-400 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          style={{
            boxShadow: `0 0 ${20 + progressPercent}px rgba(168,85,247,0.5), inset 0 0 20px rgba(255,255,255,0.1)`,
            touchAction: 'manipulation' // optimize for mobile double tap zoom
          }}
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={clicks}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1 + progressPercent / 150, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Zap className="w-16 h-16 text-purple-400 drop-shadow-md" />
            </motion.div>
          </AnimatePresence>
        </button>

        {/* Progress Ring */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none -m-4"
          style={{
            width: "calc(100% + 32px)",
            height: "calc(100% + 32px)",
          }}
          viewBox="0 0 100 100"
          aria-hidden="true"
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
            stroke="url(#gameRingGrad)"
            strokeWidth="4"
            strokeDasharray="301.59"
            strokeDashoffset={301.59 - (301.59 * progressPercent) / 100}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            style={{
              transition: "stroke-dashoffset 0.1s ease",
            }}
          />
          <defs>
            <linearGradient id="gameRingGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="w-full max-w-xs text-center">
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2 flex justify-between">
          <span>Extraction Progress</span>
          <span className="font-bold text-white">
            {clicks} / {targetClicks} TAPS
          </span>
        </div>
        <div 
          className="w-full h-2 bg-white/5 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-100"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
