"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  targetDate: string | Date | null;
  onComplete?: () => void;
}

export function CountdownTimer({ targetDate, onComplete }: CountdownTimerProps) {
  const [countdown, setCountdown] = useState<number>(0);

  useEffect(() => {
    if (!targetDate) return;

    const tick = () => {
      const remaining = new Date(targetDate).getTime() - Date.now();
      const value = Math.max(0, remaining);
      setCountdown(value);
      if (value === 0 && remaining < 1000) {
        onComplete?.();
      }
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate, onComplete]);

  if (!targetDate) return null;

  const totalSecs = Math.floor(countdown / 1000);
  const h = Math.floor(totalSecs / 3600);
  const m = Math.floor((totalSecs % 3600) / 60);
  const s = totalSecs % 60;
  
  const formatted = [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");

  return (
    <div 
      className="text-center"
      role="timer"
      aria-live="off" // Turn off continuous reading, it's annoying for screen readers
      aria-label={`Time remaining: ${h} hours, ${m} minutes, ${s} seconds`}
    >
      <span className="font-mono text-lg font-bold tabular-nums" aria-hidden="true">
        {formatted}
      </span>
      <div className="flex items-center justify-center gap-1 mt-0.5 text-muted-foreground opacity-75">
        <Clock className="w-3 h-3" />
        <span className="text-[10px] uppercase tracking-wider">
          until next window
        </span>
      </div>
    </div>
  );
}
